import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

import { useCompanyList } from '@/hooks/useCompanyList'
import CompanyNameCard from '../components/Cards/CompanyNameCard'
import { SkeletonCardLoader } from '../ui/JobPostingSkeleton'
import LoadingSpinner from '@/ui/LoadingSpinner'

const Home = () => {
  const { data: companyList, isLoading, error, isError } = useCompanyList()
  const { user } = useAuth0()
  const navigate = useNavigate()

  const handleCompanyClick = (company: any) => {
    navigate(`/jobs/${company.slug}`)
  }

  if (isError) {
    console.error('Error fetching company list:', error)
    return (
      <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-red-100 p-3 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">Error Loading Companies</h3>
          <p className="text-gray-600">We encountered an error while fetching the company list. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center justify-start gap-6">
      <div className="w-full rounded-xl bg-white p-6 shadow-card">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Welcome, {user?.name || 'User'}!
        </h2>
        <p className="text-gray-600">
          Browse companies below and click on any of them to explore job listings. You can track your applications and get updates on new positions.
        </p>
      </div>

      <div className="w-full rounded-xl bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            Available Companies {!isLoading && companyList && `(${companyList.length})`}
          </h3>
          {isLoading && <LoadingSpinner width="w-5" height="h-5" />}
        </div>

        <div className="h-[55dvh] overflow-y-auto md:h-[65dvh] lg:h-[70dvh]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 12 }, (_, index) => (
                  <SkeletonCardLoader key={index} />
                ))
              : companyList?.map((company, idx) => (
                  <CompanyNameCard
                    key={idx}
                    company={company}
                    onClick={() => handleCompanyClick(company)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
