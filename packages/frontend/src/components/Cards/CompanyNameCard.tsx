import { useState } from 'react'
import DEFAULT_LOGO from '../../assets/image.png'

interface Company {
  name: string
  slug: string
  id?: string
  logo?: string
}

interface CompanyNameCardProps {
  company: Company
  onClick: () => void
}

const CompanyNameCard = ({ company, onClick }: CompanyNameCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 text-sm shadow-card transition-all duration-200 hover:shadow-hover"
    >
      <div className="flex items-center space-x-3">
        <div className="overflow-hidden rounded-full bg-neutral p-1">
          <img
            src={company.logo || DEFAULT_LOGO}
            alt={`${company.name} logo`}
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
        <div className="font-medium text-gray-800 group-hover:text-primary">
          {company.name}
        </div>
      </div>
      
      <span
        onClick={handleFavoriteClick}
        className="self-center p-2 text-gray-400 transition-colors hover:text-red-500 focus:outline-none group-hover:opacity-100"
        aria-label="Favorite"
        aria-checked={isFavorite}
        role="checkbox"
      >
        {isFavorite ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )}
      </span>
    </div>
  )
}

export default CompanyNameCard
