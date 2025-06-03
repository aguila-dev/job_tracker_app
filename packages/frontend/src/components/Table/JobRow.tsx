import { ApplicationStatus, JobRowProps } from '@/interface/IJobs'
import { useState } from 'react'

// JobRow Component
const JobRow: React.FC<JobRowProps> = ({
  job,
  handleAppliedDateChange,
  handleStatusChange,
  handleJobConsideration,
}) => {
  const [consideringStatus, setConsideringStatus] = useState<boolean>(
    job.noLongerConsidering ?? true
  )
  const [status, setStatus] = useState<ApplicationStatus>(
    job.status || ApplicationStatus.ACTIVE
  )
  const handleStatusChangeLocal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ApplicationStatus
    setStatus(newStatus)
    handleStatusChange(job.job.company.name, job.job.id, newStatus)
  }

  const handleConsiderationChange = () => {
    const newConsideringStatus = !consideringStatus
    setConsideringStatus(newConsideringStatus)
    handleJobConsideration(job.job.company.name, job.id, newConsideringStatus)
  }

  const {
    job: { company, id, title, location, absolute_url },
  } = job

  const date = new Date()

  const applicationDate =
    job.applicationDate instanceof Date
      ? job.applicationDate.toISOString().split('T')[0]
      : job.applicationDate || date.toISOString().split('T')[0]

  return (
    <tr className="transition-colors hover:bg-neutral">
      <td className="border-b p-3 font-medium">{company.name}</td>
      <td className="border-b p-3">
        <a
          href={absolute_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          {title}
        </a>
      </td>
      <td className="border-b p-3 text-gray-600">{location || ''}</td>
      <td className="border-b p-3">
        <input
          title="Applied Date"
          type="date"
          value={applicationDate}
          onChange={(e) =>
            handleAppliedDateChange(company.name, id, e.target.value)
          }
          className="rounded-lg border-none bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        />
      </td>
      <td className="border-b p-3">
        <input
          type="text"
          placeholder="Add notes..."
          className="w-full rounded-lg border-none bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        />
      </td>
      <td className="border-b p-3">
        <select
          title="Application Status"
          className="w-full rounded-lg border-none bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          onChange={handleStatusChangeLocal}
          value={status}
        >
          <option value={ApplicationStatus.ACTIVE}>Active</option>
          <option value={ApplicationStatus.PENDING}>Pending</option>
          <option value={ApplicationStatus.REJECTED}>Rejected</option>
          <option value={ApplicationStatus.INTERVIEW}>Interviewing</option>
        </select>
      </td>
      <td className="border-b p-3 text-center">
        <input
          title="No Longer Considering"
          type="checkbox"
          checked={!consideringStatus}
          onChange={handleConsiderationChange}
          className="h-5 w-5 rounded text-primary focus:ring-primary"
        />
      </td>
    </tr>
  )
}

export default JobRow
