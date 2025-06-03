# Adding a New Job Source

This guide explains how to add a new job source to the system.

## Step 1: Update the JobSourceEnum

Add your new job source to the `JobSourceEnum` in `interface/IModels.ts`:

```typescript
enum JobSourceEnum {
  GREENHOUSE = 'greenhouse',
  WORKDAY = 'workday',
  YOUR_NEW_SOURCE = 'your-new-source', // Add your new source here
}
```

## Step 2: Create a New Job Service Implementation

Create a new file in `services/jobServices` for your job source:

```typescript
// services/jobServices/YourNewSourceJobService.ts
import { JobSourceEnum } from '@interfaces/IModels';
import { BaseJobService } from './BaseJobService';
import { Job } from '../../db';

export class YourNewSourceJobService extends BaseJobService {
  /**
   * Get the name of the job source
   */
  getSourceName(): string {
    return JobSourceEnum.YOUR_NEW_SOURCE;
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
      // Implement your job fetching logic here
      // 1. Fetch jobs from the API
      // 2. Process the job data
      // 3. Save jobs to the database
      
      console.log(`Successfully fetched and saved jobs for ${name}`);
    } catch (error) {
      console.error(`Failed to fetch jobs for company: ${name}`, error);
    }
  }
}
```

## Step 3: Register Your Job Service

Update the `services/jobServices/index.ts` file to register your new job service:

```typescript
import { JobSourceEnum } from '@interfaces/IModels';
import { JobServiceRegistry } from './JobServiceRegistry';
import { GreenhouseJobService } from './GreenhouseJobService';
import { WorkdayJobService } from './WorkdayJobService';
import { YourNewSourceJobService } from './YourNewSourceJobService'; // Import your new service

// Initialize and register all job services
export function initializeJobServices(): void {
  // Register existing job services
  JobServiceRegistry.register(new GreenhouseJobService());
  JobServiceRegistry.register(new WorkdayJobService());
  
  // Register your new job service
  JobServiceRegistry.register(new YourNewSourceJobService());
  
  console.log('Job services initialized');
}

// Export job service classes
export { YourNewSourceJobService } from './YourNewSourceJobService'; // Export your new service
```

## Step 4: Update the Configuration (Optional)

If your job source requires configuration, add it to the `companyConfig.ts` file:

```typescript
export const companyConfig = {
  greenhouse: {
    // Greenhouse configs
  },
  workday: {
    // Workday configs
  },
  yourNewSource: {
    // Your new source configs
    companyA: {
      active: true,
      name: 'company-a',
      title: 'Company A',
      frontendUrl: 'https://company-a.com/careers',
      apiEndpoint: 'https://api.company-a.com/jobs',
      // Add any source-specific configuration here
    },
  },
};
```

## Step 5: Test Your Implementation

1. Run the application
2. Check the logs to ensure your job service is registered
3. Verify that jobs are fetched and saved to the database

## Best Practices

1. **Error Handling**: Implement robust error handling to catch and log issues
2. **Pagination**: If the API supports pagination, implement it to handle large job listings
3. **Rate Limiting**: Respect API rate limits to avoid being blocked
4. **Data Validation**: Validate the job data before saving it to the database
5. **Logging**: Add detailed logging to help with debugging

## Example: Adding Indeed Jobs

Here's an example of adding Indeed as a job source:

1. Update `JobSourceEnum`:
```typescript
enum JobSourceEnum {
  GREENHOUSE = 'greenhouse',
  WORKDAY = 'workday',
  INDEED = 'indeed',
}
```

2. Create `IndeedJobService.ts`:
```typescript
import { JobSourceEnum } from '@interfaces/IModels';
import { BaseJobService } from './BaseJobService';
import axios from 'axios';

export class IndeedJobService extends BaseJobService {
  getSourceName(): string {
    return JobSourceEnum.INDEED;
  }

  async fetchAndSaveJobs(company: any): Promise<void> {
    // Implementation for fetching and saving Indeed jobs
  }
}
```

3. Register the service:
```typescript
JobServiceRegistry.register(new IndeedJobService());
```

4. Add configuration:
```typescript
export const companyConfig = {
  // Existing configs
  indeed: {
    microsoft: {
      active: true,
      name: 'microsoft',
      title: 'Microsoft',
      frontendUrl: 'https://www.indeed.com/cmp/Microsoft/jobs',
      apiEndpoint: 'https://api.indeed.com/jobs/microsoft',
    },
  },
};
```