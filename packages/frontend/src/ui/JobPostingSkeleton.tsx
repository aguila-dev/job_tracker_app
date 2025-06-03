const JobPostingSkeleton = () => {
  return (
    <div className="flex min-w-[205px] max-w-[430px] animate-pulse flex-col items-center justify-center rounded-xl bg-slate-800 p-4 text-center">
      <div className="mb-2 h-6 w-3/4 rounded-md bg-slate-300"></div>
      <div className="mb-2 h-8 w-3/4 rounded-md bg-slate-300"></div>
      <div className="mb-2 h-6 w-1/2 rounded-md bg-slate-300"></div>
      <div className="mb-2 h-6 w-1/2 rounded-md bg-slate-300"></div>
      <div className="h-6 w-1/4 rounded-md bg-slate-300"></div>
    </div>
  )
}

export const SingleJobPostingSkeletonRow = ({ cols }: { cols: number }) => (
  <tr className="w-full animate-pulse">
    {Array.from({ length: cols }, (_, index) => (
      <td key={index} className="bg-slate-200 p-4">
        <div className="mb-2 h-4 w-3/4 rounded bg-slate-300"></div>
      </td>
    ))}
  </tr>
)

export const SkeletonCardLoader = () => (
  <div className="flex animate-pulse items-center justify-between rounded-lg bg-gray-300 p-2 text-sm shadow-md">
    <div className="h-6 w-6 rounded-full bg-gray-400"></div>
    <div className="h-4 w-24 rounded bg-gray-400"></div>
    <div className="h-6 w-6 rounded bg-gray-400"></div>
  </div>
)

export default JobPostingSkeleton
