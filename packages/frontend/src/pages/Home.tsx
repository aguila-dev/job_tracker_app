// src/components/CompanyComponent.js

import { useNavigate } from 'react-router-dom'

import { useCompanyList } from '@/hooks/useCompanyList'
import CompanyNameCard from '../components/Cards/CompanyNameCard'
import { SkeletonCardLoader } from '../ui/JobPostingSkeleton'

const Home = () => {
  const { data: companyList, isLoading, error, isError } = useCompanyList()
  const navigate = useNavigate()

  const handleCompanyClick = (company: any) => {
    navigate(`/jobs/${company.slug}`)
    console.log('COMPANY CLICKED', company)
  }

  if (isError) {
    console.error('Error fetching company list:', error)
    return <div>Error loading company list</div>
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center justify-start gap-4">
      <h2 className="text-lg font-bold">
        Welcome to the job board! Here you can find job listings for different
        companies.
      </h2>
      {/* <Search onSubmitSearch={handleSearchSubmit} /> */}
      <h3 className="text-center text-xl font-semibold">
        All Companies ({companyList?.length})
      </h3>

      <section className="h-[55dvh] w-full overflow-y-auto p-2 md:h-[65dvh] lg:h-[70dvh]">
        <div className="grid grid-cols-2 flex-wrap gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading
            ? Array.from({ length: 50 }, (_, index) => (
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
      </section>
    </div>
  )
}

export default Home
