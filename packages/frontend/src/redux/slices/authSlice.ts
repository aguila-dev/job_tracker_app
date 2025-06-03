import { loginOrSignup } from '@/api/auth'
import { AuthReduxState, AuthUserProps, UserState } from '@/interface/redux'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

axios.defaults.withCredentials = true

const initialState: AuthReduxState = {
  data: null,
  loading: false,
  error: null,
}

export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async (
    { email, password, method, firstName, lastName }: AuthUserProps,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await loginOrSignup(
        email,
        password,
        method,
        firstName,
        lastName
      )
      if (!response) {
        return rejectWithValue('Invalid credentials')
      }
      const { accessToken } = response

      console.log(
        'loginOrSignup response from the authenticateUser thunk: \n',
        response,
        accessToken
      )
      await dispatch(me())
      return { accessToken }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('An unexpected error occurred.')
      }
    }
  }
)

export const me = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue, dispatch }) => {
    // const state = getState() as RootState
    // let accessToken = state.auth.data?.token
    let accessToken = Cookies.get('_jAt')

    console.log('Access token in me thunk:', accessToken)
    // console.log('STATE in me thunk:', state)

    try {
      if (!accessToken) {
        console.log('No access token found, attempting to refresh')
        const refreshResults = await dispatch(refreshAccessToken())
        const refreshedAccessToken = refreshResults.payload as
          | string
          | undefined
        if (refreshedAccessToken) {
          accessToken = refreshedAccessToken
          Cookies.set('_jAt', accessToken)
        }
      } else {
        throw new Error('Unable to refresh access token')
      }

      const { data } = await axios.get<{
        tokenValid: boolean
        accessToken: string
      }>('http://localhost:8000/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })

      console.log('Data in me thunk:\n', data)
      if (!data.tokenValid) {
        throw new Error('Token is invalid')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('An unexpected error occurred.')
      }
    }
  }
)

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'http://localhost:8000/v1/auth/refresh-token',
        {
          withCredentials: true,
        }
      )
      return data.accessToken
    } catch (error) {
      return rejectWithValue('Failed to refresh token')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await axios.post('http://localhost:8000/v1/auth/logout', null, {
        withCredentials: true,
      })
      dispatch(logoutCurrentUser())
      Cookies.remove('_jAt')
      window.location.href = '/auth'
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setToken(state, action: PayloadAction<string>) {
    //   state?.data?.token = action.payload;
    // },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
    logoutCurrentUser(state) {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        const { accessToken } = action.payload
        const decodedUser: UserState = jwtDecode(accessToken)
        state.data = {
          token: accessToken,
          auth: decodedUser,
        }
        state.loading = false
        state.error = null
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        if (state.data) state.data.token = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(me.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(me.fulfilled, (state, action) => {
        const token = action.payload.accessToken
        const decodedUser: UserState = jwtDecode(token)
        state.data = {
          token,
          auth: decodedUser,
        }
        state.loading = false
        state.error = null
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null
        state.loading = false
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setLoading, setError, logoutCurrentUser, clearError } =
  authSlice.actions
export default authSlice.reducer
