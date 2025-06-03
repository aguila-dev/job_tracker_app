import { useState } from 'react'

import DEFAULT_LOGO from '../../assets/image.png'

const CompanyNameCard = ({ company, onClick }: any) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-2 text-sm shadow-md hover:bg-gray-100 dark:bg-slate-500 dark:hover:bg-slate-400"
    >
      <img
        src={DEFAULT_LOGO}
        alt={company.title}
        className="h-6 w-6 rounded-full"
      />

      <div className="text-blue-500 dark:text-slate-200">{company.name}</div>
      <span
        onClick={handleFavoriteClick}
        className="self-center p-2 hover:text-red-500 focus:outline-none dark:checked:text-red-300"
        aria-label="Favorite"
        aria-checked={isFavorite}
        role="checkbox"
      >
        {isFavorite ? '❤️' : '🤍'}
      </span>
    </div>
  )
}

export default CompanyNameCard
