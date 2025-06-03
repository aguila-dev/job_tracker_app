export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  postedOn: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: number;
  userId: number;
  jobId: number;
  status: JobApplicationStatus;
  appliedDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export enum JobApplicationStatus {
  APPLIED = 'applied',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected'
}