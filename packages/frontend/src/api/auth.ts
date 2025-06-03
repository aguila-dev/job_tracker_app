import { AuthResponse } from '@/interface/redux'
import { encryptAndSendData } from '@/utils/encryption'
import axios, { AxiosResponse, isAxiosError } from 'axios'

export const loginOrSignup = async (
  email: string,
  password: string,
  method: string,
  firstName?: string,
  lastName?: string
): Promise<AuthResponse> => {
  try {
    // Fetch the server's public key (this should ideally be cached or handled securely)
    const publicKeyResponse = await axios.get(
      'http://localhost:8000/v1/api/public-key',
      { timeout: 5000 }
    )

    if (!publicKeyResponse.data) {
      throw new Error('Public key not found')
    }

    const publicKeyPem = publicKeyResponse.data as string

    // Encrypt the data using the server's public key
    const plainTextData = JSON.stringify({
      email,
      password,
      firstName,
      lastName,
    })

    const encryptedData = await encryptAndSendData(plainTextData, publicKeyPem)

    // Prepare the payload with the encrypted data
    const payload = { encryptedData }
    const { data }: AxiosResponse<AuthResponse> = await axios.post(
      `http://localhost:8000/v1/auth/${method}`,
      payload,
      { withCredentials: true }
    )

    console.log('Data in auth frontend\n:', data)
    return data // { accessToken }
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.message)
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        console.error('Response data:', error.response)
        throw new Error(`${error.response.data.message || error.response.data}`)
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request)
        throw new Error('Please try again later.')
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message)
        throw new Error(`Request setup error: ${error.message}`)
      }
    } else {
      // Handle non-Axios errors
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred. Please try again later.')
    }
  }
}

export const logout = async () => {
  try {
    const { data } = await axios.post<string>(
      'http://localhost:8000/v1/auth/logout',
      null,
      {
        withCredentials: true,
      }
    )
    console.log('Logout response:', data)
    return data
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
