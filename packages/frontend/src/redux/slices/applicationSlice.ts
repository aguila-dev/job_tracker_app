import { UserAppliedJobs } from '@/interface/IJobs'
import { ApplicationsReduxState } from '@/interface/redux'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../store'

const initialState: ApplicationsReduxState = {
  loading: false,
  error: null,
  data: null,
}

// create an asyn thunk that fetches all users applications
export const fetchApplications = createAsyncThunk(
  'application/fetchApplications',
  async (userId: string | number, { getState }) => {
    const state = getState() as RootState
    const accessToken = state.auth.data?.token

    console.log('Access token in fetchApplications:', accessToken)
    try {
      const response = await axios.get(
        `http://localhost:8000/v1/api/applications`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
          params: {
            userId,
          },
        }
      )
      console.log('Response from fetchApplications:', response.data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }
)

// create an async thunk post request to apply for a job using job id and user id
export const applyForJob = createAsyncThunk(
  'application/applyForJob',
  async (
    {
      jobId,
      userId,
    }: {
      jobId: string | number
      userId: string | number
    },
    { getState }
  ) => {
    const state = getState() as RootState
    const accessToken = state.auth.data?.token
    try {
      const response = await axios.post(
        'http://localhost:8000/v1/api/applications/active',
        { jobId, userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      console.log('Response from applyForJob:', response.data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }
)

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      .addCase(applyForJob.pending, (state) => {
        state.loading = true
      })
      .addCase(
        applyForJob.fulfilled,
        (state, action: PayloadAction<UserAppliedJobs>) => {
          const newJob = action.payload
          if (state.data) {
            state.data.jobs = [...state.data.jobs, newJob]
          }
          state.loading = false
          state.error = null
        }
      )
      .addCase(applyForJob.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  },
})

export default applicationSlice.reducer
