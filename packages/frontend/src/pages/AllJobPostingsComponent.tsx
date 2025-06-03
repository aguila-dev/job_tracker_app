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
    <div className="w-full px-4">
      <h2 className="flex items-center justify-center text-center text-2xl font-semibold">
        Job Listings for{' '}
        {isTodaysJobs
          ? 'Today '
          : jobs[0]?.company.name
            ? jobs[0]?.company.name
            : ''}{' '}
        <span className="inline-flex items-center justify-center">
          &#40;
          {jobs?.length ? (
            data?.count
          ) : isLoading ? (
            <LoadingSpinner height="6" width="6" />
          ) : isError ? (
            ''
          ) : (
            0
          )}
          &#41;
        </span>
      </h2>

      {isError ? (
        <div className="flex items-start justify-center pt-4">
          <div className="rounded-lg bg-white p-4 text-red-600 shadow-lg">
            Network error, sorry. Please try again later.
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
        <table className="mt-4 min-w-full border-collapse text-xs sm:text-base">
          <thead>
            <tr className="bg-[#f4f4f4] dark:bg-slate-700">
              <th className="border p-2">Company</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Last Updated</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Job Link</th>
              <th className="border p-2">Applied</th>
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
      <section className="mt-4 flex flex-col items-center justify-center">
        <div>
          <button
            type="button"
            className="mx-2 rounded bg-gray-200 px-4 py-2 text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-none"
            disabled={currentPage === 1}
            onClick={() => handlePaginatedPage('prev')}
          >
            Previous
          </button>
          <button
            type="button"
            className="mx-2 rounded bg-gray-200 px-4 py-2 text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePaginatedPage('next')}
          >
            Next
          </button>
        </div>
        <div>
          {currentPage}/{totalPages}
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
