import {
  ApplicationStatus,
  JobTableProps,
  UserAppliedJobs,
} from '@/interface/IJobs'
import { useAppSelector } from '@/redux/store'
import { useEffect, useState } from 'react'

import Search from '../components/Search'
import JobRow from '../components/Table/JobRow'
import { updateJobProperty } from '../utils/updateJobProperty'

// JobTable Component
const JobTable: React.FC<JobTableProps> = ({
  jobs,
  handleAppliedDateChange,
  handleStatusChange,
  handleJobConsideration,
  handleAppliedDateSort,
  appliedDateSortOrder,
}) => (
  <table className="min-w-full overflow-hidden rounded-xl border-collapse text-sm shadow-card">
    <thead>
      <tr className="bg-neutral">
        <th className="border-b p-3 text-left font-semibold text-gray-700">Company</th>
        <th className="border-b p-3 text-left font-semibold text-gray-700">Job Title</th>
        <th className="border-b p-3 text-left font-semibold text-gray-700">Location</th>
        <th className="border-b p-3 text-left font-semibold text-gray-700">
          <button 
            className="flex items-center font-semibold text-gray-700 focus:outline-none" 
            onClick={handleAppliedDateSort}
          >
            Applied Date
            <span className="ml-1">
              {appliedDateSortOrder === 'desc' ? '↓' : '↑'}
            </span>
          </button>
        </th>
        <th className="border-b p-3 text-left font-semibold text-gray-700">Notes</th>
        <th className="border-b p-3 text-left font-semibold text-gray-700">Status</th>
        <th className="border-b p-3 text-left font-semibold text-gray-700">No Longer Considering</th>
      </tr>
    </thead>
    <tbody>
      {jobs.map((job: UserAppliedJobs, index: number) => (
        <JobRow
          key={job.id + '-' + index}
          job={job}
          handleAppliedDateChange={handleAppliedDateChange}
          handleStatusChange={handleStatusChange}
          handleJobConsideration={handleJobConsideration}
        />
      ))}
    </tbody>
  </table>
)

// Main Component
const AppliedJobsComponent: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<UserAppliedJobs[]>([])
  const [sortOrder, setSortOrder] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedTab, setSelectedTab] = useState<string>('tracking')
  const [appliedDateSortOrder, setAppliedDateSortOrder] = useState<
    'asc' | 'desc'
  >('desc')

  const { data } = useAppSelector((state) => state.applications)

  useEffect(() => {
    const jobsList = data?.jobs ? data.jobs : []
    setAppliedJobs(jobsList)
  }, [])

  const filteredJobs = appliedJobs.filter(
    (appliedJob) =>
      appliedJob.job?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appliedJob.job?.company.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (appliedJob.job?.location &&
        appliedJob.job.location
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  )

  const sortedAndFilteredJobs = filteredJobs.sort((a, b) => {
    const dateA = new Date(a?.updatedAt).getTime()
    const dateB = new Date(b?.updatedAt).getTime()

    const appliedDateSortOrderMultiplier =
      appliedDateSortOrder === 'asc' ? 1 : -1

    if (sortOrder === 'newest') {
      return dateB - dateA
    } else if (sortOrder === 'oldest') {
      return dateA - dateB
    } else if (sortOrder === 'appliedDate') {
      if (a.applicationDate && b.applicationDate) {
        return (
          appliedDateSortOrderMultiplier *
          (new Date(a.applicationDate).getTime() -
            new Date(b.applicationDate).getTime())
        )
      } else if (a.applicationDate) {
        return -1
      } else if (b.applicationDate) {
        return 1
      }
    }
    return 0
  })

  const trackingJobs = sortedAndFilteredJobs.filter(
    (job) => !job.noLongerConsidering
  )
  const noLongerConsideringJobs = sortedAndFilteredJobs.filter(
    (job) => job.noLongerConsidering
  )

  const handleAppliedDateChange = (
    company: string,
    jobId: number,
    newDate: string
  ) => {
    updateJobProperty(company, jobId, 'appliedDate', newDate)
    setAppliedJobs((prevJobs) =>
      prevJobs.map((appliedJob) =>
        appliedJob.job.company.name === company && appliedJob.job.id === jobId
          ? { ...appliedJob, applicationDate: newDate }
          : appliedJob
      )
    )
  }

  const handleStatusChange = (
    company: string,
    jobId: number,
    status: ApplicationStatus
  ) => {
    updateJobProperty(company, jobId, 'status', status)
    setAppliedJobs((prevJobs) =>
      prevJobs.map((appliedJob) =>
        appliedJob.job.company.name === company && appliedJob.job.id === jobId
          ? { ...appliedJob, status }
          : appliedJob
      )
    )
  }

  const handleJobConsideration = (
    company: string,
    jobId: number,
    considering: boolean
  ) => {
    updateJobProperty(company, jobId, 'considering', considering)
    setAppliedJobs((prevJobs) =>
      prevJobs.map((appliedJob) =>
        appliedJob.job.company.name === company && appliedJob.job.id === jobId
          ? { ...appliedJob, noLongerConsidering: !considering }
          : appliedJob
      )
    )
  }

  const handleAppliedDateSort = () => {
    const newSortOrder = appliedDateSortOrder === 'desc' ? 'asc' : 'desc'
    setAppliedDateSortOrder(newSortOrder)
    setSortOrder('appliedDate')
  }

  return (
    <div className="container mx-auto rounded-xl bg-white p-6 shadow-card">
      <h2 className="mb-6 flex items-center justify-center text-center text-3xl font-bold text-gray-800">
        Applied Jobs
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-neutral px-3 py-1 text-sm font-medium text-gray-700">
          {appliedJobs.length}
        </span>
      </h2>
      <Search
        setSortOrder={setSortOrder}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
      <div className="mb-6 mt-6 flex justify-center space-x-2">
        <button
          className={`rounded-xl px-6 py-3 font-medium transition-all ${
            selectedTab === 'tracking'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-gray-600 shadow-sm hover:bg-neutral'
          }`}
          onClick={() => setSelectedTab('tracking')}
        >
          Job Tracking
        </button>
        <button
          className={`rounded-xl px-6 py-3 font-medium transition-all ${
            selectedTab === 'noLongerConsidering'
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-gray-600 shadow-sm hover:bg-neutral'
          }`}
          onClick={() => setSelectedTab('noLongerConsidering')}
        >
          No Longer Considering
        </button>
      </div>
      <div className="tab-content">
        {selectedTab === 'tracking' ? (
          <JobTable
            jobs={trackingJobs}
            handleAppliedDateChange={handleAppliedDateChange}
            handleStatusChange={handleStatusChange}
            handleJobConsideration={handleJobConsideration}
            handleAppliedDateSort={handleAppliedDateSort}
            appliedDateSortOrder={appliedDateSortOrder}
          />
        ) : (
          <JobTable
            jobs={noLongerConsideringJobs}
            handleAppliedDateChange={handleAppliedDateChange}
            handleStatusChange={handleStatusChange}
            handleJobConsideration={handleJobConsideration}
            handleAppliedDateSort={handleAppliedDateSort}
            appliedDateSortOrder={appliedDateSortOrder}
          />
        )}
      </div>
    </div>
  )
}

export default AppliedJobsComponent
