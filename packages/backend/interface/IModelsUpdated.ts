enum UserRole {
  Admin = 'admin',
  User = 'user',
}

/**
 * Enum for job sources
 * Add new job sources here
 */
enum JobSourceEnum {
  GREENHOUSE = 'greenhouse',
  WORKDAY = 'workday',
  // To add a new job source, add it here
  // Example: LINKEDIN = 'linkedin',
  // Example: INDEED = 'indeed',
}

enum ApplicationStatus {
  ACTIVE = 'active',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export interface WorkdayJob {}

export { ApplicationStatus, JobSourceEnum, UserRole };