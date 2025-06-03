import { UserAppliedJobs } from '@/interface/IJobs'
import { ApplicationsReduxState } from '@/interface/redux'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { getBackendUrl } from '@/utils/getBackendUrl'

import { RootState } from '../store'

// Get the backend URL
const BACKEND_URL = getBackendUrl();

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
        `${BACKEND_URL}/v1/api/applications`,
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
        `${BACKEND_URL}/v1/api/applications/active`,
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

// Modern version of applyForJob that uses Auth0 token
export const applyForJobWithAuth0 = createAsyncThunk(
  'application/applyForJobWithAuth0',
  async (
    {
      job,
      token,
      userId
    }: {
      job: any
      token: string
      userId: number
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      console.log('Applying for job with Auth0 token:', {
        jobId: job.id,
        userId: userId,
        tokenPrefix: token.substring(0, 20) + '...'
      });
      
      // Enhanced logging for debugging
      console.log('Job data being sent:', {
        id: job.id,
        title: job.title || job.position,
        company: job.company?.name || 'Unknown',
        location: job.location
      });
      
      const response = await axios.post(
        `${BACKEND_URL}/v1/api/applications/active`,
        { 
          jobId: job.id,
          userId: userId,
          job: {
            title: job.title || job.position,
            company: job.company?.name || 'Unknown',
            location: job.location,
            description: job.description || '',
            url: job.absoluteUrl || '',
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      
      console.log('Response from applyForJobWithAuth0:', response.data);
      
      // After successful application, refresh the list of applications
      dispatch(fetchApplicationsWithAuth0({ token, userId }));
      
      return response.data;
    } catch (error: any) {
      console.error('Error applying for job with Auth0 token:', error);
      
      // Enhanced error handling with more detail
      if (error.response) {
        const errorData = error.response.data;
        console.error('Server response error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: errorData
        });
        
        // If the error is because the user already applied, don't treat it as an error
        if (errorData.message && errorData.message.includes('already applied')) {
          return { 
            alreadyApplied: true,
            message: errorData.message,
            jobId: job.id
          };
        }
        
        return rejectWithValue({
          status: error.response.status,
          message: errorData.message || 'Server error',
          data: errorData
        });
      }
      
      // Network errors or other issues
      return rejectWithValue({
        message: error.message || 'Unknown error',
        name: error.name
      });
    }
  }
);

// Fetch applications using Auth0 token
export const fetchApplicationsWithAuth0 = createAsyncThunk(
  'application/fetchApplicationsWithAuth0',
  async (
    {
      token,
      userId
    }: {
      token: string
      userId: number
    }
  ) => {
    try {
      console.log('Fetching applications with Auth0 token for user:', userId);
      
      const response = await axios.get(
        `${BACKEND_URL}/v1/api/applications`,
        {
          params: { userId },
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      
      console.log('Applications fetched successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching applications with Auth0 token:', error);
      if (error.response) {
        return error.response.data;
      }
      return { error: error.message };
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
      // Handle the new Auth0 thunk
      .addCase(applyForJobWithAuth0.pending, (state) => {
        state.loading = true
      })
      .addCase(
        applyForJobWithAuth0.fulfilled,
        (state, action: PayloadAction<UserAppliedJobs>) => {
          const newJob = action.payload
          if (state.data) {
            state.data.jobs = [...(state.data.jobs || []), newJob]
          } else {
            state.data = { jobs: [newJob] }
          }
          state.loading = false
          state.error = null
        }
      )
      .addCase(applyForJobWithAuth0.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      // Handle fetchApplicationsWithAuth0
      .addCase(fetchApplicationsWithAuth0.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchApplicationsWithAuth0.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchApplicationsWithAuth0.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  },
})

export default applicationSlice.reducer
