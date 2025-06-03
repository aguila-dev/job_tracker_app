// // import { format } from 'date-fns';
// import { formatInTimeZone } from 'date-fns-tz';

import { applyForJob } from '@/redux/slices/applicationSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import cn from 'classnames'
// Single posting component (table row)

const SinglePostingRow: React.FC<{
  job: any
  onRowClick?: () => void
  // onToggleApply: (id: number) => void;
  baseUrl?: string
  workday?: boolean
}> = ({ job, onRowClick }) => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.auth)

  const formatDateToLocalTimeZone = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)
  }

  const formattedDate = formatDateToLocalTimeZone(job.lastUpdatedAt)
  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
    // need to post this to applied jobs endpoint
    // /v1/api/jobs/active ==> userId and jobId
    console.log(`Checkbox clicked on job id: ${job.id}`)
    const userId = data?.auth?.id
    const jobId = job.id
    if (!userId) {
      console.error('User not logged in')
      return
    }
    dispatch(applyForJob({ jobId, userId }))
  }
  return (
    <tr
      onClick={onRowClick}
      className={cn('cursor-pointer', {
        'bg-green-200': job?.applied,
        'hover:bg-gray-100 dark:hover:bg-gray-700': !job?.applied,
      })}
    >
      {job?.company ? (
        <td className="border-[1px] border-solid border-[#ddd] p-2">
          {job.company.name}
        </td>
      ) : null}
      <td className="border-[1px] border-solid border-[#ddd] p-2">
        {job.title}
      </td>
      <td className="border-[1px] border-solid border-[#ddd] p-2">
        {formattedDate}
      </td>
      <td className="border-[1px] border-solid border-[#ddd] p-2">
        {job?.location}
      </td>
      <td className="border-[1px] border-solid border-[#ddd] p-2">
        <a
          href={job.absoluteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Link
        </a>
      </td>
      <td className="border-[1px] border-solid border-[#ddd] p-2">
        <label className="flex items-center space-x-2" />
        <input
          type="checkbox"
          title="Applied"
          checked={job.applied}
          onClick={handleCheckboxClick}
          className="form-checkbox h-5 w-5 text-blue-600"
          readOnly // might need another solution
        />
      </td>
    </tr>
  )
}

export default SinglePostingRow
