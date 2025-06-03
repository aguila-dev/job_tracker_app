import { UserAppliedJobs } from './IJobs'

export type AuthResponse = { accessToken: string }

export interface AuthUserProps {
  email: string
  password: string
  method: string
  firstName?: string
  lastName?: string
}

export interface UserState {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
  authenticated: boolean
}
export interface AuthTokenState {
  token: string
  auth: UserState | null
}
export interface AuthReduxState {
  data: AuthTokenState | null
  loading: boolean
  error: string | null
}

interface ApplicationSliceStateData {
  count: number
  jobs: UserAppliedJobs[]
  page: number
  totalPages: number
}

export interface ApplicationsReduxState {
  loading: boolean
  error: string | null
  data: ApplicationSliceStateData | null
}
