import jobBackends from '../constants/jobUrls'

const getBackEndUrl = (companyName: string) => {
  // Find the backend object where the name matches companyName
  const backend = jobBackends.find(
    (backend: any) => backend?.name === companyName
  )

  // If found, return the url; otherwise, return null or a default URL
  return backend ? backend.url : null
}

export default getBackEndUrl
