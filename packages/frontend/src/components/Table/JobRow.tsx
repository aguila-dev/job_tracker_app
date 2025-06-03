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
    <tr>
      <td className="border p-2">{company.name}</td>
      <td className="border p-2">
        <a
          href={absolute_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {title}
        </a>
      </td>
      <td className="border p-2">{location || ''}</td>
      <td className="border p-2">
        <input
          title="Applied Date"
          type="date"
          value={applicationDate}
          onChange={(e) =>
            handleAppliedDateChange(company.name, id, e.target.value)
          }
          className="w-full rounded border px-2 py-1"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          placeholder="Add notes..."
          className="w-full rounded border px-2 py-1"
        />
      </td>
      <td className="border p-2">
        <select
          title="Application Status"
          className="w-full rounded border px-2 py-1"
          onChange={handleStatusChangeLocal}
          value={status}
        >
          <option value={ApplicationStatus.ACTIVE}>Active</option>
          <option value={ApplicationStatus.PENDING}>Pending</option>
          <option value={ApplicationStatus.REJECTED}>Rejected</option>
          <option value={ApplicationStatus.INTERVIEW}>Interviewing</option>
        </select>
      </td>
      <td className="border p-2 text-center">
        <input
          title="No Longer Considering"
          type="checkbox"
          checked={!consideringStatus}
          onChange={handleConsiderationChange}
          className="scale-125 transform"
        />
      </td>
    </tr>
  )
}

export default JobRow
