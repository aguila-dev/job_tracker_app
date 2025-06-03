import {
  ApplicationStatus,
  JobTableProps,
  UserAppliedJobs,
} from '@/interface/IJobs';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useAuth0Sync } from '@/hooks/useAuth0Sync';
import { LoadingSpinner } from '@/ui';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchApplicationsWithAuth0 } from '@/redux/slices/applicationSlice';

import Search from '../components/Search';
import JobRow from '../components/Table/JobRow';
import { updateJobProperty } from '../utils/updateJobProperty';

// JobTable Component
const JobTable: React.FC<JobTableProps> = ({
  jobs,
  handleAppliedDateChange,
  handleStatusChange,
  handleJobConsideration,
  handleAppliedDateSort,
  appliedDateSortOrder,
}) => (
  <div className='overflow-x-auto'>
    {/* Desktop/Tablet View */}
    <table className='hidden min-w-full overflow-hidden rounded-xl border-collapse text-sm shadow-card md:table'>
      <thead>
        <tr className='bg-neutral'>
          <th className='border-b p-3 text-left font-semibold text-gray-700'>
            Company
          </th>
          <th className='border-b p-3 text-left font-semibold text-gray-700'>
            Job Title
          </th>
          <th className='border-b p-3 text-left font-semibold text-gray-700'>
            Location
          </th>
          <th className='border-b p-3 text-left font-semibold text-gray-700'>
            <button
              className='flex items-center font-semibold text-gray-700 focus:outline-none'
              onClick={handleAppliedDateSort}
            >
              Applied Date
              <span className='ml-1'>
                {appliedDateSortOrder === 'desc' ? '↓' : '↑'}
              </span>
            </button>
          </th>
          <th className='border-b p-3 text-left font-semibold text-gray-700'>
            Notes
          </th>
          <th className='border-b p-3 text-left font-semibold text-gray-700'>
            Status
          </th>
          <th className='border-b p-3 text-left font-semibold text-gray-700'>
            No Longer Considering
          </th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job: UserAppliedJobs, index: number) => (
          <JobRow
            key={job.id + '-' + index}
            job={job}
            handleAppliedDateChange={handleAppliedDateChange}
            handleStatusChange={handleStatusChange}
            handleJobConsideration={handleJobConsideration}
          />
        ))}
      </tbody>
    </table>

    {/* Mobile View - Card-based layout */}
    <div className='mt-4 grid grid-cols-1 gap-4 md:hidden'>
      {jobs.map((job: UserAppliedJobs, index: number) => (
        <div
          key={job.id + '-' + index}
          className='rounded-xl bg-white p-4 shadow-card'
        >
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='font-bold text-gray-800'>{job.job.company.name}</h3>
            <div className='flex items-center'>
              <span className='mr-2 text-xs text-gray-500'>Considering:</span>
              <input
                type='checkbox'
                checked={!job.noLongerConsidering}
                onChange={() =>
                  handleJobConsideration(
                    job.job.company.name,
                    job.id,
                    !job.noLongerConsidering
                  )
                }
                className='h-5 w-5 rounded text-primary focus:ring-primary'
              />
            </div>
          </div>

          <a
            href={job.job.absolute_url}
            target='_blank'
            rel='noopener noreferrer'
            className='mb-2 block font-medium text-primary hover:underline'
          >
            {job.job.title}
          </a>

          {job.job.location && (
            <div className='mb-2 text-sm text-gray-600'>
              <span className='font-medium'>Location:</span> {job.job.location}
            </div>
          )}

          <div className='mb-3 flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              Applied Date:
            </label>
            <input
              type='date'
              value={
                job.applicationDate || new Date().toISOString().split('T')[0]
              }
              onChange={(e) =>
                handleAppliedDateChange(
                  job.job.company.name,
                  job.job.id,
                  e.target.value
                )
              }
              className='rounded-lg border-none bg-neutral px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'
            />
          </div>

          <div className='mb-3 flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              Status:
            </label>
            <select
              className='rounded-lg border-none bg-neutral px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'
              onChange={(e) =>
                handleStatusChange(
                  job.job.company.name,
                  job.job.id,
                  e.target.value as ApplicationStatus
                )
              }
              value={job.status || ApplicationStatus.ACTIVE}
            >
              <option value={ApplicationStatus.ACTIVE}>Active</option>
              <option value={ApplicationStatus.PENDING}>Pending</option>
              <option value={ApplicationStatus.REJECTED}>Rejected</option>
              <option value={ApplicationStatus.INTERVIEW}>Interviewing</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1 text-sm font-medium text-gray-700'>
              Notes:
            </label>
            <input
              type='text'
              placeholder='Add notes...'
              className='rounded-lg border-none bg-neutral px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Main Component
const AppliedJobsComponent: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<UserAppliedJobs[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('tracking');
  const [appliedDateSortOrder, setAppliedDateSortOrder] = useState<
    'asc' | 'desc'
  >('desc');

  // Get user and auth data
  const { isLoading: isUserLoading } = useAuth0Sync();
  const { user } = useAppSelector(state => state.auth0);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  
  // Get application data from Redux store
  const { data, loading: isJobsLoading } = useAppSelector((state) => state.applications);

  // Refresh applications when the component mounts
  useEffect(() => {
    const refreshApplications = async () => {
      if (user?.id) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: 'openid profile email',
            },
          });
          
          dispatch(fetchApplicationsWithAuth0({ token, userId: user.id }));
        } catch (error) {
          console.error('Error refreshing applications:', error);
        }
      }
    };
    
    refreshApplications();
  }, [user?.id, getAccessTokenSilently, dispatch]);

  // Update local state when Redux data changes
  useEffect(() => {
    const jobsList = data?.jobs ? data.jobs : [];
    setAppliedJobs(jobsList);
    
    if (user) {
      console.log('User data in AppliedJobs:', user);
    }
    
    if (data) {
      console.log('Application data in AppliedJobs:', data);
    }
  }, [data, user]);

  const filteredJobs = appliedJobs.filter(
    (appliedJob) =>
      appliedJob.job?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appliedJob.job?.company.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (appliedJob.job?.location &&
        appliedJob.job.location
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  const sortedAndFilteredJobs = filteredJobs.sort((a, b) => {
    const dateA = new Date(a?.updatedAt).getTime();
    const dateB = new Date(b?.updatedAt).getTime();

    const appliedDateSortOrderMultiplier =
      appliedDateSortOrder === 'asc' ? 1 : -1;

    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else if (sortOrder === 'oldest') {
      return dateA - dateB;
    } else if (sortOrder === 'appliedDate') {
      if (a.applicationDate && b.applicationDate) {
        return (
          appliedDateSortOrderMultiplier *
          (new Date(a.applicationDate).getTime() -
            new Date(b.applicationDate).getTime())
        );
      } else if (a.applicationDate) {
        return -1;
      } else if (b.applicationDate) {
        return 1;
      }
    }
    return 0;
  });

  const trackingJobs = sortedAndFilteredJobs.filter(
    (job) => !job.noLongerConsidering
  );
  const noLongerConsideringJobs = sortedAndFilteredJobs.filter(
    (job) => job.noLongerConsidering
  );

  const handleAppliedDateChange = (
    company: string,
    jobId: number,
    newDate: string
  ) => {
    updateJobProperty(company, jobId, 'appliedDate', newDate);
    setAppliedJobs((prevJobs) =>
      prevJobs.map((appliedJob) =>
        appliedJob.job.company.name === company && appliedJob.job.id === jobId
          ? { ...appliedJob, applicationDate: newDate }
          : appliedJob
      )
    );
  };

  const handleStatusChange = (
    company: string,
    jobId: number,
    status: ApplicationStatus
  ) => {
    updateJobProperty(company, jobId, 'status', status);
    setAppliedJobs((prevJobs) =>
      prevJobs.map((appliedJob) =>
        appliedJob.job.company.name === company && appliedJob.job.id === jobId
          ? { ...appliedJob, status }
          : appliedJob
      )
    );
  };

  const handleJobConsideration = (
    company: string,
    jobId: number,
    considering: boolean
  ) => {
    updateJobProperty(company, jobId, 'considering', considering);
    setAppliedJobs((prevJobs) =>
      prevJobs.map((appliedJob) =>
        appliedJob.job.company.name === company && appliedJob.job.id === jobId
          ? { ...appliedJob, noLongerConsidering: !considering }
          : appliedJob
      )
    );
  };

  const handleAppliedDateSort = () => {
    const newSortOrder = appliedDateSortOrder === 'desc' ? 'asc' : 'desc';
    setAppliedDateSortOrder(newSortOrder);
    setSortOrder('appliedDate');
  };

  return (
    <div className='container mx-auto rounded-xl bg-white p-6 shadow-card'>
      <h2 className='mb-6 flex items-center justify-center text-center text-3xl font-bold text-gray-800'>
        Applied Jobs
        <span className='ml-2 inline-flex items-center justify-center rounded-full bg-neutral px-3 py-1 text-sm font-medium text-gray-700'>
          {appliedJobs.length}
        </span>
      </h2>
      
      {/* Display user info if available */}
      {user && (
        <div className="mb-4 rounded-lg bg-neutral p-4 text-center">
          <p className="text-gray-700">
            <span className="font-medium">Logged in as:</span> {user.email}
            {user.firstName && user.lastName && (
              <span> ({user.firstName} {user.lastName})</span>
            )}
          </p>
          {user.id && (
            <p className="text-sm text-gray-500">User ID: {user.id}</p>
          )}
        </div>
      )}
      
      {isUserLoading || isJobsLoading ? (
        <div className="flex h-40 w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Search
            setSortOrder={setSortOrder}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />
          <div className='mb-6 mt-6 flex justify-center space-x-2'>
            <button
              className={`rounded-xl px-6 py-3 font-medium transition-all ${
                selectedTab === 'tracking'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 shadow-sm hover:bg-neutral'
              }`}
              onClick={() => setSelectedTab('tracking')}
            >
              Job Tracking
            </button>
            <button
              className={`rounded-xl px-6 py-3 font-medium transition-all ${
                selectedTab === 'noLongerConsidering'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 shadow-sm hover:bg-neutral'
              }`}
              onClick={() => setSelectedTab('noLongerConsidering')}
            >
              No Longer Considering
            </button>
          </div>
          <div className='tab-content'>
            {selectedTab === 'tracking' ? (
              <JobTable
                jobs={trackingJobs}
                handleAppliedDateChange={handleAppliedDateChange}
                handleStatusChange={handleStatusChange}
                handleJobConsideration={handleJobConsideration}
                handleAppliedDateSort={handleAppliedDateSort}
                appliedDateSortOrder={appliedDateSortOrder}
              />
            ) : (
              <JobTable
                jobs={noLongerConsideringJobs}
                handleAppliedDateChange={handleAppliedDateChange}
                handleStatusChange={handleStatusChange}
                handleJobConsideration={handleJobConsideration}
                handleAppliedDateSort={handleAppliedDateSort}
                appliedDateSortOrder={appliedDateSortOrder}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedJobsComponent;
