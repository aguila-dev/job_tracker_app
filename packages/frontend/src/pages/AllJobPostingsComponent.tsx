import CompanyFilterComponent from '@/components/Dropdown/CompanyFilterDropdown'
import SelectedJobModal from '@/components/Modal/SelectedJobModal'
import Search from '@/components/Search'
import SinglePostingRow from '@/components/Table/SinglePostingRow'
import { SelectedJob } from '@/interface/IJobs'
import { LoadingSpinner } from '@/ui'
import { SingleJobPostingSkeletonRow } from '@/ui/JobPostingSkeleton'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import fetchJobs, { fetchTodayJobs, fetchTodaysCompanies } from '../api/jobsAPI'
import { JobSourceEnum } from '../constants'

interface TodayCompany {
  id: number
  name: string
}
interface CompanyData {
  count: number
  companies: TodayCompany[]
}
interface Props {
  isTodaysJobs?: boolean
}

// Main component
const AllJobPostingsComponent = ({ isTodaysJobs = false }: Props) => {
  const { company } = useParams<{ company: string }>()
  const [jobs, setJobs] = useState<any[]>([])
  const [data, setData] = useState<any>({})
  const [url, setUrl] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [selectedJob, setSelectedJob] = useState<SelectedJob | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [companies, setCompanies] = useState<CompanyData>({
    count: 0,
    companies: [],
  })
  const [todayCompanySelect, setTodayCompanySelect] = useState<string | null>(
    null
  )
  const { getAccessTokenSilently } = useAuth0()
  console.log('SELECTED JOB\n', selectedJob)

  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true)
      setIsError(false)

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: 'openid profile email',
            prompt: 'consent',
          },
        })
        let jobsData
        let companiesData = companies
        if (isTodaysJobs) {
          jobsData = await fetchTodayJobs(
            currentPage,
            searchQuery,
            token,
            todayCompanySelect ? Number(todayCompanySelect) : undefined
          )
          if (companies.companies?.length === 0) {
            companiesData = await fetchTodaysCompanies(token)
            setCompanies(companiesData)
          }
        } else if (company && !isTodaysJobs) {
          jobsData = await fetchJobs(company, currentPage, searchQuery, token)
        }
        if (!jobsData) {
          setIsError(true)
          throw new Error('Network response errored out')
        }

        const jobs = jobsData.jobs
        const totalNumPages = Math.ceil(jobsData.count / 20)
        setData(jobsData)
        setJobs(jobs)
        setTotalPages(totalNumPages)
      } catch (error) {
        console.error('Error fetching jobs:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    getJobs()
  }, [company, isTodaysJobs, currentPage, searchQuery, todayCompanySelect])

  useEffect(() => {
    if (selectedJob) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [selectedJob])

  function extractJobPath(url: string): string {
    const regex = /\/job\/(.*)/
    const match = url.match(regex)
    return match ? match[1] : ''
  }

  const fetchJobDetails = async (job: any) => {
    const jobCompany = company || job.company.slug
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: 'openid profile email',
        prompt: 'consent',
      },
    })
    if (
      jobCompany &&
      job.jobId &&
      job.jobSource.name === JobSourceEnum.GREENHOUSE
    ) {
      const response = await axios.get(
        `${job.company.apiEndpoint}/${job.jobId}`,
        { withCredentials: false }
      )

      setSelectedJob(response.data)
    } else if (
      jobCompany &&
      job.jobId &&
      job.jobSource.name === JobSourceEnum.WORKDAY
    ) {
      console.log('workday job to be implemented')
      // console.log('Job endpoint:', job.company.apiEndpoint);
      const jobPath = extractJobPath(job.absoluteUrl)
      console.log('Job path:', jobPath)
      const fullBackendUrl = `${job.company.apiEndpoint.replace(
        '/jobs',
        '/job'
      )}/${jobPath}`

      const response = await axios.get(
        'http://localhost:8000/v1/api/jobs/workday/individualJob',
        {
          params: { fullBackendUrl },
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setSelectedJob(response.data)
      console.log('make api call to get job details from workday')
    } else {
      console.error(`No job details found for ${job.title} in ${company}...`)
    }
    setUrl(job.absoluteUrl)
  }

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page on new search
  }

  function handleClickOutside(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      setSelectedJob(null)
      setUrl('')
    }
  }
  const handlePaginatedPage = (direction: string) => {
    if (direction === 'next') {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
  }
  const handleCompanySelect = (selectedCompanyId: number) => {
    setTodayCompanySelect(
      selectedCompanyId ? selectedCompanyId.toString() : null
    )
  }
  console.log({ isLoading, isError, isTodaysJobs })
  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-card">
      <h2 className="mb-6 flex items-center justify-center text-center text-3xl font-bold text-gray-800">
        Job Listings
        {' '}
        <span className="ml-2 text-primary">
          {isTodaysJobs
            ? 'Today'
            : jobs[0]?.company.name
              ? jobs[0]?.company.name
              : ''}
        </span>
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-neutral px-3 py-1 text-sm font-medium text-gray-700">
          {jobs?.length ? (
            data?.count
          ) : isLoading ? (
            <LoadingSpinner height="6" width="6" />
          ) : isError ? (
            ''
          ) : (
            0
          )}
        </span>
      </h2>

      {isError ? (
        <div className="flex items-start justify-center pt-4">
          <div className="rounded-xl bg-red-50 p-6 text-red-600 shadow-card">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium">Network error. Please try again later.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Search onSubmitSearch={handleSearchSubmit} />
          {isTodaysJobs && (
            <CompanyFilterComponent
              companies={companies}
              onCompanySelect={handleCompanySelect}
            />
          )}
        </>
      )}
      <div className="jobs-list-container overflow-x-auto">
        <table className="mt-6 min-w-full overflow-hidden rounded-xl border-collapse text-xs shadow-card sm:text-base">
          <thead>
            <tr className="bg-neutral">
              <th className="border-b p-3 text-left font-semibold text-gray-700">Company</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Title</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Last Updated</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Location</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Job Link</th>
              <th className="border-b p-3 text-left font-semibold text-gray-700">Applied</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 12 }, (_, index) => (
                  <SingleJobPostingSkeletonRow key={index} cols={6} />
                ))
              : jobs.map((job: any, jobIndex: number) => (
                  <SinglePostingRow
                    key={jobIndex}
                    job={job}
                    onRowClick={() => fetchJobDetails(job)}
                  />
                ))}
          </tbody>
        </table>
      </div>
      {/* Pagination section for company postings */}
      <section className="mt-6 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="flex items-center rounded-xl bg-white px-5 py-3 font-medium text-primary shadow-sm transition-all hover:bg-neutral disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            disabled={currentPage === 1}
            onClick={() => handlePaginatedPage('prev')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Previous
          </button>
          <div className="rounded-xl bg-white px-4 py-2 font-medium shadow-sm">
            Page {currentPage} of {totalPages}
          </div>
          <button
            type="button"
            className="flex items-center rounded-xl bg-white px-5 py-3 font-medium text-primary shadow-sm transition-all hover:bg-neutral disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            disabled={currentPage === totalPages}
            onClick={() => handlePaginatedPage('next')}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

      {selectedJob && (
        <SelectedJobModal
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          url={url}
          setUrl={setUrl}
        />
      )}
    </div>
  )
}

export default AllJobPostingsComponent
