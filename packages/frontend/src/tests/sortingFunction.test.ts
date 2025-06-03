import sortJobsByPostedDate from '../utils/sortingFunction'
const jobs = [
  { title: 'Job A', postedOn: 'Posted 2 days ago' },
  { title: 'Job B', postedOn: 'Posted Today' },
  { title: 'Job C', postedOn: 'Posted Yesterday' },
  { title: 'Job D', postedOn: 'Posted 12 days ago' },
  { title: 'Job E', postedOn: 'Posted 30+ days ago' },
  { title: 'Job F', postedOn: 'Posted 2 days ago' },
]
describe('sortJobsByPostedDate', () => {
  it('should sort jobs by newest first', () => {
    const sortedJobs = jobs.sort((a, b) => sortJobsByPostedDate(a, b, 'newest'))
    expect(sortedJobs[0].title).toBe('Job B')
    expect(sortedJobs[5].title).toBe('Job E')
  })

  it('should sort jobs by oldest first', () => {
    const sortedJobs = jobs.sort((a, b) => sortJobsByPostedDate(a, b, 'oldest'))
    expect(sortedJobs[0].title).toBe('Job E')
    expect(sortedJobs[5].title).toBe('Job B')
  })
})
