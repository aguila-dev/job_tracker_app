import { useState } from 'react'

// Search and sort component
interface SearchProps {
  onSubmitSearch?: (searchQuery: string) => void
  setSortOrder?: React.Dispatch<React.SetStateAction<string>>
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>
  searchQuery?: string
}

const Search: React.FC<SearchProps> = ({ onSubmitSearch, searchQuery: externalSearchQuery }) => {
  const [inputQuery, setInputQuery] = useState<string>(externalSearchQuery || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmitSearch) {
      onSubmitSearch(inputQuery)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-between gap-2 py-2 sm:flex-row sm:gap-4"
    >
      <div className="relative w-full sm:w-2/3 md:w-1/2">
        <input
          type="text"
          placeholder="Search jobs..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="w-full rounded-xl border-none bg-neutral px-4 py-3 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        />
        {inputQuery && (
          <button
            type="button"
            onClick={() => setInputQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:w-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </button>
    </form>
  )
}

export default Search
