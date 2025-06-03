import { BaseJobService } from './BaseJobService';
import { Job } from '../../db';

/**
 * Template for adding a new job source
 * Copy this file and replace 'NewSource' with your job source name
 * Implement the required methods
 */
export class NewSourceJobService extends BaseJobService {
  /**
   * Get the name of the job source
   * This must match an entry in the JobSourceEnum
   */
  getSourceName(): string {
    return 'new-source'; // Replace with your job source name from JobSourceEnum
  }

  /**
   * Fetch jobs from the source and save them to the database
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
      // 1. Fetch jobs from your API
      // const response = await axios.get(apiEndpoint);
      // const jobs = response.data.jobs;
      
      // 2. Process the job data
      // For each job, create a job object with required fields
      
      // 3. Save jobs to the database
      // Example:
      /*
      for (const jobData of jobs) {
        const jobValues = {
          companyId: companyRecord.id,
          jobSourceId: jobSource.id,
          title: jobData.title,
          absoluteUrl: jobData.url,
          location: jobData.location,
          jobId: jobData.id.toString(),
          requisitionId: jobData.id.toString(),
          metadata: jobData.additionalData || {},
          lastUpdatedAt: jobData.updatedAt,
        };
        
        await Job.upsert(jobValues, {
          conflictFields: ['jobId', 'jobSourceId'],
        });
      }
      */
      
      console.log(`Successfully fetched and saved jobs for ${name}`);
    } catch (error) {
      console.error(`Failed to fetch jobs for company: ${name}`, error);
    }
  }

  /**
   * Create a company from config
   * @param config The company configuration
   */
  async createFromConfig(config: any): Promise<void> {
    if (!config.active) {
      return;
    }
    
    console.log('Creating company from config:', config.title);
    
    await this.fetchAndSaveJobs({
      name: config.title,
      slug: config.name,
      frontendUrl: config.frontendUrl,
      apiEndpoint: config.apiEndpoint,
    });
  }
}