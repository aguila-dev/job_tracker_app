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
    <select
      title="Select a company"
      onChange={(e) => onCompanySelect(Number(e.target.value))}
      className="min-h-8 w-full rounded-lg bg-slate-100 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:w-1/2"
    >
      <option value="">Select a company</option>
      {companies?.companies?.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  )
}

export default CompanyFilterComponent
