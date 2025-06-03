import { JobServiceInterface } from './BaseJobService';

/**
 * Registry for job services to support extensibility
 */
export class JobServiceRegistry {
  private static services = new Map<string, JobServiceInterface>();

  /**
   * Register a job service
   * @param service The job service to register
   */
  static register(service: JobServiceInterface): void {
    const sourceName = service.getSourceName();
    this.services.set(sourceName, service);
    console.log(`Registered job service for source: ${sourceName}`);
  }

  /**
   * Get a job service by source name
   * @param sourceName The name of the job source
   */
  static getService(sourceName: string): JobServiceInterface | undefined {
    return this.services.get(sourceName);
  }

  /**
   * Get all registered job services
   */
  static getAllServices(): JobServiceInterface[] {
    return Array.from(this.services.values());
  }

  /**
   * Check if a job service is registered
   * @param sourceName The name of the job source
   */
  static hasService(sourceName: string): boolean {
    return this.services.has(sourceName);
  }
}