import { GreenhouseSelectedJob, WorkdayJobPostingInfo } from '@/interface/IJobs'

export const extractWorkdayJobId = (job: WorkdayJobPostingInfo): string => {
  return job?.bulletFields.length > 1
    ? job.bulletFields[1]
    : job.bulletFields[0]
}
export const extractGreenhouseJobId = (job: GreenhouseSelectedJob): string => {
  return job.id.toString() // Assuming ID is directly accessible and needs to be stringified
}
