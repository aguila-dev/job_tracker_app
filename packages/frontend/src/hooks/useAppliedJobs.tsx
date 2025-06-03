import { AppliedJobs, JobData } from '@/interface/IJobs'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { getBackendUrl } from '@/utils/getBackendUrl'
import { useSyncUser } from './useSyncUser'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Get the backend URL
const BACKEND_URL = getBackendUrl();

type JobIdExtractor = (job: JobData) => string

/**
 * This hook manages job applications with both local storage and backend persistence
 */
export const useAppliedJobs = (
  company: string,
  extractJobId: JobIdExtractor
): [AppliedJobs, (job: JobData) => void, boolean, Error | null] => {
  const [localAppliedJobs, setLocalAppliedJobs] = useState<AppliedJobs>({})
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { data: user } = useSyncUser()
  const queryClient = useQueryClient()
  const [error, setError] = useState<Error | null>(null)
  
  // Load from local storage initially
  useEffect(() => {
    const storedAppliedJobs = JSON.parse(
      localStorage.getItem('appliedJobs') || '{}'
    )
    if (storedAppliedJobs[company]) {
      setLocalAppliedJobs(storedAppliedJobs[company])
    }
  }, [company])

  // Fetch applied jobs from backend if authenticated
  const { data: backendJobs, isLoading } = useQuery({
    queryKey: ['appliedJobs', user?.id],
    queryFn: async () => {
      if (!isAuthenticated || !user?.id) {
        return null;
      }

      try {
        console.log('Fetching applied jobs for user:', user.id);
        
        // Get token for API request
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: 'openid profile email',
          },
        });

        // Make request to get user's applied jobs
        const { data } = await axios.get(
          `${BACKEND_URL}/v1/api/applications`, 
          {
            params: { userId: user.id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        console.log('Applied jobs fetched from backend:', data);
        
        // Convert backend jobs to the same format as local jobs
        const formattedJobs: AppliedJobs = {};
        data.forEach((job: any) => {
          const jobId = job.jobId || job.externalJobId;
          if (jobId) {
            formattedJobs[jobId] = {
              ...job.job,
              id: jobId,
              applied: true,
              appliedDate: job.appliedDate || job.createdAt,
              status: job.status || 'applied',
              notes: job.notes || ''
            };
          }
        });
        
        return formattedJobs;
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setError(error instanceof Error ? error : new Error('Error fetching jobs'));
        return null;
      }
    },
    enabled: isAuthenticated && !!user?.id,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });

  // Create mutation for saving job applications to backend
  const createApplicationMutation = useMutation({
    mutationFn: async (job: JobData) => {
      if (!isAuthenticated || !user?.id) {
        throw new Error('Not authenticated');
      }
      
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: 'openid profile email',
        },
      });
      
      return axios.post(
        `${BACKEND_URL}/v1/api/applications/active`,
        {
          userId: user.id,
          jobId: extractJobId(job),
          status: 'applied',
          notes: '',
          job: {
            title: job.title || job.position,
            company: job.company || company,
            location: job.location,
            description: job.description || '',
            url: job.url || '',
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appliedJobs'] });
    },
    onError: (error) => {
      console.error('Error saving application:', error);
      setError(error instanceof Error ? error : new Error('Error saving application'));
    },
  });

  // Delete mutation for removing job applications from backend
  const deleteApplicationMutation = useMutation({
    mutationFn: async (jobId: string) => {
      if (!isAuthenticated || !user?.id) {
        throw new Error('Not authenticated');
      }
      
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: 'openid profile email',
        },
      });
      
      // Find the application ID for this job
      const applications = await axios.get(
        `${BACKEND_URL}/v1/api/applications`,
        {
          params: { userId: user.id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const application = applications.data.find((app: any) => 
        app.jobId === jobId || app.externalJobId === jobId
      );
      
      if (!application) {
        throw new Error('Application not found');
      }
      
      return axios.put(
        `${BACKEND_URL}/v1/api/applications/${application.id}`,
        {
          status: 'not_considering',
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appliedJobs'] });
    },
    onError: (error) => {
      console.error('Error removing application:', error);
      setError(error instanceof Error ? error : new Error('Error removing application'));
    },
  });

  // Combine local and backend jobs
  const combinedJobs = {
    ...localAppliedJobs,
    ...(backendJobs || {}),
  };

  // Toggle job application both locally and in backend if authenticated
  const toggleJobApplication = (job: JobData): void => {
    const jobId = extractJobId(job);
    console.log('Toggling application for job:', jobId);
    
    // Update local storage regardless of authentication
    const updatedLocalJobs = { ...localAppliedJobs };
    
    if (updatedLocalJobs[jobId]) {
      delete updatedLocalJobs[jobId];
    } else {
      updatedLocalJobs[jobId] = { ...job, applied: true };
    }
    
    setLocalAppliedJobs(updatedLocalJobs);
    const allLocalJobs = JSON.parse(
      localStorage.getItem('appliedJobs') || '{}'
    );
    allLocalJobs[company] = updatedLocalJobs;
    localStorage.setItem('appliedJobs', JSON.stringify(allLocalJobs));
    
    // If authenticated, also update in backend
    if (isAuthenticated && user?.id) {
      if (combinedJobs[jobId]) {
        // Job exists, remove it
        deleteApplicationMutation.mutate(jobId);
      } else {
        // Job doesn't exist, add it
        createApplicationMutation.mutate(job);
      }
    }
  };

  return [combinedJobs, toggleJobApplication, isLoading, error];
}
