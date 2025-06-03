import { AppliedJobs, JobData } from '@/interface/IJobs'
import { useEffect, useState } from 'react'

type JobIdExtractor = (job: JobData) => string

export const useAppliedJobs = (
  company: string,
  extractJobId: JobIdExtractor
): [AppliedJobs, (job: JobData) => void] => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobs>({})
  // console.log('appliedJobs', appliedJobs);

  useEffect(() => {
    const storedAppliedJobs = JSON.parse(
      localStorage.getItem('appliedJobs') || '{}'
    )
    if (storedAppliedJobs[company]) {
      setAppliedJobs(storedAppliedJobs[company])
    }
  }, [company])

  const toggleJobApplication = (job: JobData): void => {
    const jobId = extractJobId(job)
    console.log('jobId', jobId)
    const updatedAppliedJobs = { ...appliedJobs }

    if (updatedAppliedJobs[jobId]) {
      delete updatedAppliedJobs[jobId]
    } else {
      updatedAppliedJobs[jobId] = { ...job, applied: true }
    }

    setAppliedJobs({ ...updatedAppliedJobs })
    const allAppliedJobs = JSON.parse(
      localStorage.getItem('appliedJobs') || '{}'
    )
    allAppliedJobs[company] = updatedAppliedJobs
    localStorage.setItem('appliedJobs', JSON.stringify(allAppliedJobs))
  }

  return [appliedJobs, toggleJobApplication]
}
