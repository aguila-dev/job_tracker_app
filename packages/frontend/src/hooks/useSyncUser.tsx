import { useAuth0, User } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchUser = async (
  token: string,
  email: string,
  name?: string
): Promise<User> => {
  try {
    const { data: existingUser } = await axios.get(
      `http://localhost:8000/v1/auth/checkUser`,
      {
        params: { email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return existingUser
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log('NO USER FOUND. CREATING USER')

      const { data: newUser } = await axios.post(
        `http://localhost:8000/v1/auth/signup`,
        {
          email,
          firstName: name,
          lastName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('USER CREATED', newUser)
      return newUser
    } else {
      console.error('Error in fetchUser:', error)
      throw error // Re-throw other errors
    }
  }
}

export const useSyncUser = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0()

  return useQuery({
    queryKey: ['syncUser', user?.email],
    queryFn: async () => {
      if (isAuthenticated && user && user.email) {
        const token = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: 'openid profile email',
          },
        })
        if (!token) {
          throw new Error('No token')
        }
        return fetchUser(token, user.email, user.name)
      }
    },
    enabled: isAuthenticated && Boolean(user?.email),
    retry: false,
  })
}
