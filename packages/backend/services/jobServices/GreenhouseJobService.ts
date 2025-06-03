import { JobSourceEnum } from '@interfaces/IModels';
import axios from 'axios';
import { companyConfig } from 'config/companyConfig';
import { BaseJobService } from './BaseJobService';
import { Job } from '../../db';

/**
 * Implementation for fetching and saving Greenhouse jobs
 */
export class GreenhouseJobService extends BaseJobService {
  /**
   * Get the name of the job source
   */
  getSourceName(): string {
    return JobSourceEnum.GREENHOUSE;
  }

  /**
   * Fetch jobs from Greenhouse and save them to the database
   * @param company The company to fetch jobs for
   */
  async fetchAndSaveJobs(company: any): Promise<void> {
    const { name, slug, frontendUrl, apiEndpoint } = company;
    
    // Get company config data
    const companyConfigData = companyConfig.greenhouse[slug.toLowerCase()];
    
    if (!companyConfigData || !companyConfigData.backendApi) {
      throw new Error(`No API endpoint found in companyConfig for: ${name}`);
    }
    
    // Get or create job source
    const jobSource = await this.getOrCreateJobSource(this.getSourceName());
    
    // Get or create company
    const companyRecord = await this.getOrCreateCompany(
      { name, slug, frontendUrl, apiEndpoint },
      jobSource.id
    );

    // Use config backendApi or the provided apiEndpoint
    let backendUrl = apiEndpoint;

    // Update API endpoint if needed
    if (companyConfigData.backendApi !== backendUrl) {
      const updatedCompanyBackendUrl = companyConfigData.backendApi;
      await companyRecord.update({ apiEndpoint: updatedCompanyBackendUrl });
      console.log(`Updated API endpoint for company: ${name}`);
      backendUrl = updatedCompanyBackendUrl;
    }

    this.validateCompanyData({ name, apiEndpoint: backendUrl });

    try {
      // Fetch jobs from Greenhouse API
      const response = await axios.get(backendUrl);

      if (response.status !== 200) {
        console.warn(
          `Invalid API response for ${name}: Received status ${response.status}`
        );
        return;
      }

      const jobs = response.data.jobs;

      if (!jobs || jobs.length === 0) {
        console.warn(`No jobs found for Greenhouse company: ${name}`);
        return;
      }

      // Process and save each job
      for (const jobData of jobs) {
        let absoluteUrl = jobData.absolute_url;

        // Sanitize the URL if the company name is "airbnb"
        if (slug.toLowerCase() === 'airbnb') {
          absoluteUrl = absoluteUrl.split('?')[0];
        }
        
        const jobValues = {
          companyId: companyRecord.id,
          jobSourceId: jobSource.id,
          title: jobData.title,
          absoluteUrl: absoluteUrl,
          location: jobData?.location.name,
          jobId: jobData.id.toString(),
          requisitionId: jobData?.id.toString(),
          dataCompliance: jobData.data_compliance,
          metadata: jobData.metadata,
          lastUpdatedAt: jobData.updated_at,
        };
        
        await Job.upsert(jobValues, {
          conflictFields: ['jobId', 'jobSourceId'],
        });
      }
      
      console.log(`Successfully fetched and saved ${jobs.length} Greenhouse jobs for ${name}`);
    } catch (error: any) {
      this.handleApiError(error, name, backendUrl, companyRecord.id);
    }
  }

  /**
   * Handle API errors when fetching jobs
   * @param error The error object
   * @param companyName The name of the company
   * @param backendUrl The API endpoint URL
   * @param companyId The ID of the company
   */
  private async handleApiError(
    error: any,
    companyName: string,
    backendUrl: string,
    companyId: number
  ): Promise<void> {
    if (error.response && error.response.status === 404) {
      console.error(
        `API endpoint not found (404) for Greenhouse company: ${companyName}, URL: ${backendUrl}`
      );
      
      // Mark the company as inactive
      await this.updateCompanyStatus(companyId, false);
    } else {
      console.error(`Failed to fetch jobs for Greenhouse company: ${companyName}`, error);
    }
  }

  /**
   * Update a company's active status
   * @param companyId The ID of the company
   * @param isActive Whether the company is active
   */
  private async updateCompanyStatus(
    companyId: number,
    isActive: boolean
  ): Promise<void> {
    await this.updateCompany(
      companyId,
      { active: isActive }
    );
  }

  /**
   * Update a company's properties
   * @param companyId The ID of the company
   * @param updateData The data to update
   */
  private async updateCompany(
    companyId: number,
    updateData: any
  ): Promise<void> {
    const { Company } = require('../../db');
    await Company.update(
      updateData,
      { where: { id: companyId } }
    );
  }
}