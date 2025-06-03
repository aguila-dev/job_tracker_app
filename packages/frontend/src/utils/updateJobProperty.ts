export const updateJobProperty = (
  company: string,
  jobId: number,
  property: string,
  value: any
) => {
  const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '{}')
  if (appliedJobs[company] && appliedJobs[company][jobId]) {
    appliedJobs[company][jobId][property] = value
  }
  localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs))
  return appliedJobs
}
