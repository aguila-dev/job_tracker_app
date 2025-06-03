import { companyConfig } from '../config/companyConfig';
import { buildApiUrl } from '@utils/apiUtils';
import { Company, JobSource, User } from 'db';
import { JobSourceEnum } from '@interfaces/IModels';
import { 
  JobServiceRegistry, 
  initializeJobServices,
  GreenhouseJobService,
  WorkdayJobService
} from './jobServices';

// Initialize job services
initializeJobServices();

/**
 * Seed test users in the database
 */
export const seedTestUsers = async () => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      console.log('Seeding test users...');
      // await User.bulkCreate(testUsers);
      console.log('Test users seeded.');
    } else {
      console.log('Test users already seeded.');
    }
  } catch (error) {
    console.error('Error seeding test users:', error);
  }
};

/**
 * Populate the database with job listings from all active companies in the config
 */
export const populateDatabase = async () => {
  try {
    // Process Greenhouse companies
    for (const companyName in companyConfig.greenhouse) {
      if (companyConfig.greenhouse[companyName].active) {
        const config = companyConfig.greenhouse[companyName];
        console.log('Populating Greenhouse jobs for:', config.title);
        
        const greenhouseService = JobServiceRegistry.getService(JobSourceEnum.GREENHOUSE) as GreenhouseJobService;
        
        if (greenhouseService) {
          await greenhouseService.fetchAndSaveJobs({
            name: config.title,
            slug: config.name,
            frontendUrl: `https://boards.greenhouse.io/${config.name}`,
            apiEndpoint: config.backendApi,
          });
        }
      }
    }
    
    // Process Workday companies
    for (const companyName in companyConfig.workday) {
      if (companyConfig.workday[companyName].active) {
        const config = companyConfig.workday[companyName];
        console.log('Populating Workday jobs for:', config.title);
        
        const workdayService = JobServiceRegistry.getService(JobSourceEnum.WORKDAY) as WorkdayJobService;
        
        if (workdayService) {
          await workdayService.fetchAndSaveJobs({
            name: config.title,
            slug: config.name,
            frontendUrl: config.frontendUrl,
            apiEndpoint: buildApiUrl(config.name, config.basePathObject),
          });
        }
      }
    }
    
    console.log('Database populated with job listings.');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

/**
 * Update job listings for all active companies in the database
 */
export const updateDatabaseJobListings = async () => {
  try {
    const companies = await Company.findAll({
      where: { active: true },
      include: [{ model: JobSource }],
    });
    
    for (const company of companies) {
      console.log('Updating jobs for company:', company.name);
      
      const jobSource = await JobSource.findOne({
        where: { id: company.jobSourceId },
      });
      
      try {
        // Get the appropriate job service
        const jobService = JobServiceRegistry.getService(jobSource.name);
        
        if (jobService) {
          // Use the job service to fetch and save jobs
          await jobService.fetchAndSaveJobs(company);
        } else {
          console.warn(`No service found for job source: ${jobSource.name}`);
        }
      } catch (jobError) {
        console.error(`Error updating jobs for ${company.name}:`, jobError);
      }
    }
    
    console.log('Database job listings updated.');
  } catch (error) {
    console.error('Error updating database job listings:', error);
  }
};