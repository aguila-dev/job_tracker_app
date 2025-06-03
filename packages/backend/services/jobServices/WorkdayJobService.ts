import { JobSourceEnum } from '@interfaces/IModels';
import { extractJobId } from '@utils/extractJobId';
import { BaseJobService } from './BaseJobService';
import { Job } from '../../db';
import { buildApiUrl } from '@utils/apiUtils';
import {
  fetchWorkdayData,
  processResponseDataAndIncludeLocations,
} from '../workdayService';
import { companyConfig } from 'config/companyConfig';

/**
 * Implementation for fetching and saving Workday jobs
 */
export class WorkdayJobService extends BaseJobService {
  /**
   * Get the name of the job source
   */
  getSourceName(): string {
    return JobSourceEnum.WORKDAY;
  }

  /**
   * Fetch jobs from Workday and save them to the database
   * @param company The company to fetch jobs for
   */
  async fetchAndSaveJobs(company: any): Promise<void> {
    const { name, slug, frontendUrl, apiEndpoint } = company;
    
    // Validate company data
    this.validateCompanyData({ name, apiEndpoint });
    
    // Get or create job source
    const jobSource = await this.getOrCreateJobSource(this.getSourceName());
    
    // Get or create company
    const companyRecord = await this.getOrCreateCompany(
      { name, slug, frontendUrl, apiEndpoint },
      jobSource.id
    );

    try {
      // Initialize pagination variables
      let offset = 0;
      const limit = 20;
      let totalJobs = 0;
      let jobsFetched = 0;

      // Fetch jobs in batches
      while (true) {
        // Fetch jobs from Workday API
        const response = await fetchWorkdayData(apiEndpoint, {
          limit,
          offset,
          searchText: '',
          locations: [],
        });
        
        // Process response data
        const processedData = processResponseDataAndIncludeLocations(response.data);
        const jobs = processedData.jobPostings;
        
        // Set total jobs count on first fetch
        if (offset === 0) {
          totalJobs = processedData.total;
        }

        // Break if no jobs returned
        if (jobs.length === 0) {
          break;
        }

        // Process and save each job
        for (const jobData of jobs) {
          const jobId = extractJobId(jobData.externalPath, jobData.bulletFields);
          const absoluteUrl = `${companyRecord.frontendUrl}${jobData.externalPath}`;
          
          // Skip if URL is too long
          if (absoluteUrl.length > 500) {
            console.warn('Absolute URL too long:', absoluteUrl);
            continue;
          }

          const jobValues = {
            companyId: companyRecord.id,
            jobSourceId: jobSource.id,
            title: jobData.title,
            absoluteUrl,
            location: jobData.locationsText
              ? jobData.locationsText
              : jobData.bulletFields[0],
            jobId: jobId?.toString() || '',
            requisitionId: jobId?.toString() || '',
            metadata: {},
            lastUpdatedAt: jobData.postedOnDate,
          };
          
          await Job.upsert(jobValues, {
            conflictFields: ['jobId', 'jobSourceId'],
          });
        }

        // Update job count and check if all jobs fetched
        jobsFetched += jobs.length;
        if (jobsFetched >= totalJobs) {
          break;
        }

        // Increment offset for next batch
        offset += limit;
      }
      
      console.log(`Successfully fetched and saved ${jobsFetched} Workday jobs for ${name}`);
    } catch (error) {
      console.error(`Failed to fetch jobs for Workday company: ${name}`, error);
    }
  }

  /**
   * Create a Workday company from config
   * @param config The company configuration
   */
  async createFromConfig(config: any): Promise<void> {
    if (!config.active) {
      return;
    }
    
    console.log('Creating Workday company from config:', config.title);
    
    await this.fetchAndSaveJobs({
      name: config.title,
      slug: config.name,
      frontendUrl: config.frontendUrl,
      apiEndpoint: buildApiUrl(config.name, config.basePathObject),
    });
  }
}