import { Company, Job, JobSource } from '../../db';

/**
 * Base interface for all job service implementations
 */
export interface JobServiceInterface {
  /**
   * Fetch jobs from the source and save them to the database
   */
  fetchAndSaveJobs(company: any): Promise<void>;
  
  /**
   * Get the name of the job source
   */
  getSourceName(): string;
}

/**
 * Abstract base class for job services that implements common functionality
 */
export abstract class BaseJobService implements JobServiceInterface {
  /**
   * Constructor for BaseJobService
   */
  constructor() {}

  /**
   * Abstract method to be implemented by specific job sources
   * @param company The company to fetch jobs for
   */
  abstract fetchAndSaveJobs(company: any): Promise<void>;

  /**
   * Abstract method to get the name of the job source
   */
  abstract getSourceName(): string;

  /**
   * Helper method to get or create a job source
   * @param sourceName The name of the job source
   */
  protected async getOrCreateJobSource(sourceName: string): Promise<any> {
    const [jobSource] = await JobSource.findOrCreate({
      where: { name: sourceName },
    });
    return jobSource;
  }

  /**
   * Helper method to get or create a company
   * @param companyData Company data
   * @param jobSourceId The ID of the job source
   */
  protected async getOrCreateCompany(companyData: any, jobSourceId: number): Promise<any> {
    const { name, slug, frontendUrl, apiEndpoint } = companyData;
    
    const [company] = await Company.findOrCreate({
      where: {
        name,
        slug,
        frontendUrl,
        apiEndpoint,
        jobSourceId,
      },
    });
    
    return company;
  }

  /**
   * Helper method to save a job to the database
   * @param jobData Job data
   * @param companyId The ID of the company
   * @param jobSourceId The ID of the job source
   */
  protected async saveJob(jobData: any, companyId: number, jobSourceId: number): Promise<void> {
    await Job.upsert(
      {
        ...jobData,
        companyId,
        jobSourceId,
      },
      {
        conflictFields: ['jobId', 'jobSourceId'],
      }
    );
  }

  /**
   * Helper method to validate company data
   * @param company Company data
   */
  protected validateCompanyData(company: any): void {
    const { name, apiEndpoint } = company;
    
    if (!apiEndpoint) {
      throw new Error(`No apiEndpoint found for company: ${name}`);
    }
  }
}