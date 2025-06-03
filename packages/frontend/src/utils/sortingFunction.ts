// Utility function to convert 'postedOn' text to days ago as a number
const postedOnToDaysAgo = (postedOn: string): number => {
  if (postedOn.includes('Today')) return 0
  if (postedOn.includes('Yesterday')) return 1

  const match = postedOn.match(/Posted (\d+) Days? Ago/)
  return match ? parseInt(match[1], 10) : Infinity
}

// Sorting function for job postings
const sortJobsByPostedDate = (
  jobA: any,
  jobB: any,
  order: string = 'newest'
) => {
  const daysAgoA = postedOnToDaysAgo(jobA.postedOn)
  const daysAgoB = postedOnToDaysAgo(jobB.postedOn)

  if (order === 'newest') {
    return daysAgoA - daysAgoB // For newest first
  } else if (order === 'oldest') {
    return daysAgoB - daysAgoA // For oldest first
  }
  // If no sort order specified or recognized, return 0 to keep original order
  return 0
}

export default sortJobsByPostedDate
