export interface JobData {
  title: string
  name: string
  url: string
  active?: boolean
  logo?: unknown
  applied?: boolean
}
export interface CompanyNameCardProps {
  company: JobData
  onClick: () => void
}
export interface AppliedJobs {
  [key: string]: JobData
}

export interface BackendJobData {
  id: number
  companyId: number
  company: {
    name: string
  }
  jobSourceId: number
  jobId: string
  title: string
  // absoluteUrl: string
  absolute_url: string
  location: string
  requisitionId: string
  dataCompliance: any
  metadata: any
  lastUpdatedAt: string | Date
  createdAt: string | Date
  updatedAt: string | Date
}

export enum ApplicationStatus {
  ACTIVE = 'active',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
  PENDING = 'pending',
}
export interface UserAppliedJobs {
  id: number
  userId: number
  jobId: number
  notes: string | null
  status: ApplicationStatus | null
  applicationDate: Date | string | null
  noLongerConsidering: boolean
  createdAt: Date
  updatedAt: Date
  job: BackendJobData
}

export interface Job {
  company: string
  title: string
  location: { name?: string }
  locationsText?: string
  updated_at?: any
  absolute_url?: string
  externalPath?: string
  considering?: boolean
  appliedDate?: any
  id: any
  status?: string
}
export interface JobRowProps {
  job: UserAppliedJobs
  handleAppliedDateChange: (
    company: string,
    jobId: number,
    newDate: string
  ) => void
  handleStatusChange: (
    company: string,
    jobId: number,
    status: ApplicationStatus
  ) => void
  handleJobConsideration: (
    company: string,
    jobId: number,
    considering: boolean
  ) => void
}
// Define Props for the JobTable Component
export interface JobTableProps {
  jobs: UserAppliedJobs[]
  handleAppliedDateChange: (
    company: string,
    jobId: number,
    newDate: string
  ) => void
  handleStatusChange: (
    company: string,
    jobId: number,
    status: ApplicationStatus
  ) => void
  handleJobConsideration: (
    company: string,
    jobId: number,
    considering: boolean
  ) => void
  handleAppliedDateSort: () => void
  appliedDateSortOrder: 'asc' | 'desc'
}

/**
 * ***************************************
 * Interface for the Workday Job object
 * ***************************************
 *
 */

// Interface for Country details
export interface WorkdayCountry {
  descriptor: string
  id: string
  alpha2Code: string
}

// Interface for Job Requisition Location
export interface WorkdayJobRequisitionLocation {
  country: WorkdayCountry
  descriptor: string
}

// Interface for Job Posting Information
export interface WorkdayJobPostingInfo {
  additionalLocations: string[]
  canApply: boolean
  country: WorkdayCountry
  id: string
  externalUrl: string
  includeResumeParsing: boolean
  jobDescription: string
  jobPostingId: string
  jobPostingSiteId: string
  jobReqId: string
  jobRequisitionLocation: WorkdayJobRequisitionLocation
  bulletFields: string[]
  location: string
  posted: boolean
  postedOn: string
  questionnaireId: string
  secondaryQuestionnaireId: string
  startDate: string
  timeType: string
  title: string
}

// Interface for Hiring Organization
export interface WorkdayHiringOrganization {
  name: string
  url: string
}

// Interface for a Similar Job (assuming similar structure as JobPostingInfo)
export interface WorkdaySimilarJob {
  title: string
  externalPath: string
  locationsText: string
  postedOn: string
  startDate: string
  timeType: string
}

// Interface for Selected Job
export interface WorkdaySelectedJob {
  hiringOrganization: WorkdayHiringOrganization
  jobPostingInfo: WorkdayJobPostingInfo
  similarJobs: WorkdaySimilarJob[]
  userAuthenticated: boolean
}

/*
 * Interface for Job Posting Information
 */
export interface GreenHouseDataCompliance {
  requires_consent: boolean
  requires_processing_consent: boolean
  requires_retention_consent: boolean
  retention_period: string | null
  type: string
}

// Interface for Location information
export interface GreenHouseLocation {
  name: string
}

export interface GreenHouseMetadata {
  [key: string]: number | string | boolean | null
}

export interface GreenHouseOffice {
  childIds: any[]
  id: string | number
  location: string | null
  name: string | null
  parent_id: string | number | null
}
// Interface for the Greenhouse Job Posting
export interface GreenhouseSelectedJob {
  absolute_url: string
  content: string
  data_compliance: GreenHouseDataCompliance[]
  departments: any[] // Assuming departments data is not provided in this example
  id: string
  internal_job_id: string
  location: GreenHouseLocation
  metadata: {
    [key: string]: number | string | boolean | null
  } | null // Assuming metadata is an unknown structure, or null if not available
  offices: GreenHouseOffice[] // Assuming offices data is not provided in this example
  requisition_id: string
  title: string
  updated_at: string
}

export type SelectedJob = GreenhouseSelectedJob | WorkdaySelectedJob
