import { useState } from 'react'

// Search and sort component
const Search: React.FC<{
  onSubmitSearch?: (searchQuery: string) => void
  setSortOrder?: React.Dispatch<React.SetStateAction<string>>
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>
  searchQuery?: string
}> = ({ onSubmitSearch }) => {
  const [inputQuery, setInputQuery] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmitSearch) {
      onSubmitSearch(inputQuery)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-between py-2 sm:flex-row"
    >
      <input
        type="text"
        placeholder="Search jobs..."
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        className="min-h-8 w-full rounded-lg bg-slate-100 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 sm:w-1/2 dark:bg-slate-700"
      />
      <button
        type="submit"
        className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white sm:mt-0"
      >
        Search
      </button>
    </form>
  )
}

export default Search
