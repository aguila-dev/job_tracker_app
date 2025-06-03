import { API } from '@/constants'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface JobSource {
  createdAt: string
  id: number
  name: string
  updatedAt: string
}

interface CompanyInfo {
  active: boolean
  apiEndpoint: string
  createdAt: string
  frontendUrl: string
  id: number
  jobSource: JobSource
  jobSourceId: number
  name: string
  slug: string
  updatedAt: string
}
const fetchCompanyList = async (token: string) => {
  const { data } = await axios.get<CompanyInfo[]>(
    `${API.BASE_URL}/api/${API.COMPANIES}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data
}

export const useCompanyList = () => {
  const { getAccessTokenSilently } = useAuth0()

  return useQuery({
    queryKey: ['companyList'],
    queryFn: async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: 'openid profile email',
          prompt: 'consent',
        },
      })
      return fetchCompanyList(token)
    },
  })
}
