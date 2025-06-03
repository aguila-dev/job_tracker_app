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
        className="min-h-12 w-full rounded-xl border-none bg-neutral px-4 py-3 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:w-1/2"
      />
      <button
        type="submit"
        className="mt-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 sm:mt-0"
      >
        Search
      </button>
    </form>
  )
}

export default Search
