import { JobSourceEnum } from '@interfaces/IModels';
import { JobServiceRegistry } from './JobServiceRegistry';
import { GreenhouseJobService } from './GreenhouseJobService';
import { WorkdayJobService } from './WorkdayJobService';

// Initialize and register all job services
export function initializeJobServices(): void {
  // Register Greenhouse job service
  JobServiceRegistry.register(new GreenhouseJobService());
  
  // Register Workday job service
  JobServiceRegistry.register(new WorkdayJobService());
  
  // Additional job services can be registered here
  
  console.log('Job services initialized');
}

// Export job service classes
export { JobServiceRegistry } from './JobServiceRegistry';
export { BaseJobService } from './BaseJobService';
export { GreenhouseJobService } from './GreenhouseJobService';
export { WorkdayJobService } from './WorkdayJobService';

// Export types
export type { JobServiceInterface } from './BaseJobService';