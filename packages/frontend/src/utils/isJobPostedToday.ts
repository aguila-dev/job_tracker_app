export const isJobPostedToday = (jobDate: string) => {
  const today = new Date()
  const postedDate = new Date(jobDate)
  return (
    postedDate.getDate() === today.getDate() &&
    postedDate.getMonth() === today.getMonth() &&
    postedDate.getFullYear() === today.getFullYear()
  )
}
