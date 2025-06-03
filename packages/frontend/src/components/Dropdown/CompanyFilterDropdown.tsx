import React from 'react'

interface TodayCompany {
  id: number
  name: string
}

interface CompanyData {
  count: number
  companies: TodayCompany[]
}

interface CompanyFilterProps {
  companies: CompanyData
  onCompanySelect: (companyId: number) => void
}

const CompanyFilterComponent: React.FC<CompanyFilterProps> = ({
  companies,
  onCompanySelect,
}) => {
  return (
    <div className="my-4">
      <label htmlFor="company-filter" className="mb-2 block text-sm font-medium text-gray-700">
        Filter by Company
      </label>
      <div className="relative">
        <select
          id="company-filter"
          onChange={(e) => onCompanySelect(Number(e.target.value))}
          className="w-full appearance-none rounded-xl border-none bg-neutral px-4 py-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:max-w-md"
        >
          <option value="">All Companies</option>
          {companies?.companies?.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {companies?.companies?.length > 0 && (
        <div className="mt-1 text-xs text-gray-500">
          {companies.count} companies available
        </div>
      )}
    </div>
  )
}

export default CompanyFilterComponent
