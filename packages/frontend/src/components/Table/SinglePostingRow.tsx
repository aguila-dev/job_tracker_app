// // import { format } from 'date-fns';
// import { formatInTimeZone } from 'date-fns-tz';

import { applyForJob } from '@/redux/slices/applicationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import cn from 'classnames';
// Single posting component (table row)

const SinglePostingRow: React.FC<{
  job: any;
  onRowClick?: () => void;
  // onToggleApply: (id: number) => void;
  baseUrl?: string;
  workday?: boolean;
}> = ({ job, onRowClick }) => {
  const dispatch = useAppDispatch();
  // const { data } = useAppSelector((state) => state.auth)

  const formatDateToLocalTimeZone = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  const formattedDate = formatDateToLocalTimeZone(job.lastUpdatedAt);
  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    // need to post this to applied jobs endpoint
    // /v1/api/jobs/active ==> userId and jobId
    console.log(`Checkbox clicked on job id: ${job.id}`);
    const userId = data?.auth?.id;
    const jobId = job.id;
    if (!userId) {
      console.error('User not logged in');
      return;
    }
    dispatch(applyForJob({ jobId, userId }));
  };
  return (
    <tr
      onClick={onRowClick}
      className={cn('cursor-pointer transition-colors duration-150', {
        'bg-green-100 hover:bg-green-200': job?.applied,
        'hover:bg-neutral': !job?.applied,
      })}
    >
      {job?.company ? (
        <td className='border-b p-3 font-medium'>{job.company.name}</td>
      ) : null}
      <td className='border-b p-3 font-medium'>{job.title}</td>
      <td className='border-b p-3 text-gray-600'>{formattedDate}</td>
      <td className='border-b p-3 text-gray-600'>{job?.location}</td>
      <td className='border-b p-3'>
        <a
          href={job.absoluteUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='rounded bg-primary px-3 py-1 text-white hover:bg-opacity-90 transition-all'
        >
          View
        </a>
      </td>
      <td className='border-b p-3'>
        <label className='flex items-center justify-center' />
        <input
          type='checkbox'
          title='Applied'
          checked={job.applied}
          onClick={handleCheckboxClick}
          className='h-5 w-5 rounded text-primary focus:ring-primary'
          readOnly // might need another solution
        />
      </td>
    </tr>
  );
};

export default SinglePostingRow;
