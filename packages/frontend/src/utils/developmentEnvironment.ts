export const getCurrentEnvironment = () => {
  const isProduction = import.meta.env.PROD
  const isDevelopment = import.meta.env.DEV
  const isStaging = import.meta.env.MODE === 'staging'

  if (isProduction) return 'production'
  if (isStaging) return 'staging'
  if (isDevelopment) return 'development'

  return 'unknown' // Fallback in case none of the environments match
}

const environment = getCurrentEnvironment()

export const isDevelopment = environment === 'development'
export const isProduction = environment === 'production'
export const isStaging = environment === 'staging'
