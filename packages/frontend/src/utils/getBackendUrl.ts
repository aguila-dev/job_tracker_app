import jobBackends from '../constants/jobUrls'

/**
 * Get backend URL for a specific company API
 */
export const getCompanyBackendUrl = (companyName: string) => {
  // Find the backend object where the name matches companyName
  const backend = jobBackends.find(
    (backend: any) => backend?.name === companyName
  )

  // If found, return the url; otherwise, return null or a default URL
  return backend ? backend.url : null
}

/**
 * Get the main backend API URL
 */
export const getBackendUrl = (): string => {
  // Use environment variable if available
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Default to localhost in development
  return 'http://localhost:8000';
}

export default getCompanyBackendUrl
