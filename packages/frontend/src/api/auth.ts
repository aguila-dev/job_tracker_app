import { AuthResponse } from '@/interface/redux';
import { encryptAndSendData } from '@/utils/encryption';
import { getBackendUrl } from '@/utils/getBackendUrl';
import axios, { AxiosResponse, isAxiosError } from 'axios';

// Get the backend URL
const BACKEND_URL = getBackendUrl();

/**
 * Check if a user exists in the database
 */
export const checkUserExists = async (email: string, token: string) => {
  try {
    console.log('Checking user existence:', { email });
    console.log('Token first 20 chars:', token.substring(0, 20) + '...');
    console.log('Using backend URL:', BACKEND_URL);

    // Normalize email by trimming and lowercasing
    const normalizedEmail = email.trim().toLowerCase();
    console.log('Normalized email:', normalizedEmail);

    const { data } = await axios.get(`${BACKEND_URL}/v1/auth/checkUser`, {
      params: { email: normalizedEmail },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('User check successful:', data);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Error checking user:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        requestParams: { email },
        responseData: error.response?.data,
      });

      if (error.response?.status === 404) {
        return null; // User not found
      }

      if (error.response?.status === 403) {
        console.error(
          '403 Forbidden error. Auth token might be invalid or expired.'
        );
        // Attempt to retry once with a fresh token
        return null;
      }
    }
    throw error; // Re-throw other errors
  }
};

/**
 * Create a new user in the database
 */
export const createUser = async (
  email: string,
  name: string,
  token: string
) => {
  try {
    console.log('Creating user:', { email, name });
    console.log('Token first 20 chars:', token.substring(0, 20) + '...');
    console.log('Using backend URL:', BACKEND_URL);

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    const { data } = await axios.post(
      `${BACKEND_URL}/v1/auth/signup`,
      {
        email: normalizedEmail,
        firstName: name,
        lastName: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('User created successfully:', data);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Error creating user:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        requestBody: { email, firstName: name, lastName: name },
        responseData: error.response?.data,
      });

      // Special handling for 403 forbidden errors
      if (error.response?.status === 403) {
        console.error(
          '403 Forbidden error. Auth token might be invalid or expired.'
        );
      }
    } else {
      console.error('Non-axios error creating user:', error);
    }
    throw error;
  }
};

// export const loginOrSignup = async (
//   email: string,
//   password: string,
//   method: string,
//   firstName?: string,
//   lastName?: string
// ): Promise<AuthResponse> => {
//   try {
//     // Fetch the server's public key (this should ideally be cached or handled securely)
//     const publicKeyResponse = await axios.get(
//       `${BACKEND_URL}/v1/api/public-key`,
//       { timeout: 5000 }
//     );

//     if (!publicKeyResponse.data) {
//       throw new Error('Public key not found');
//     }

//     const publicKeyPem = publicKeyResponse.data as string;

//     // Encrypt the data using the server's public key
//     const plainTextData = JSON.stringify({
//       email: email.trim().toLowerCase(),
//       password,
//       firstName,
//       lastName,
//     });

//     const encryptedData = await encryptAndSendData(plainTextData, publicKeyPem);

//     // Prepare the payload with the encrypted data
//     const payload = { encryptedData };
//     const { data }: AxiosResponse<AuthResponse> = await axios.post(
//       `${BACKEND_URL}/v1/auth/${method}`,
//       payload,
//       { withCredentials: true }
//     );

//     console.log('Data in auth frontend\n:', data);
//     return data; // { accessToken }
//   } catch (error) {
//     if (isAxiosError(error)) {
//       console.error('Axios error:', error.response?.status, error.message);
//       if (error.response) {
//         // The server responded with a status code outside the range of 2xx
//         console.error('Response data:', error.response);
//         throw new Error(
//           `${error.response.data.message || error.response.data}`
//         );
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//         throw new Error('Please try again later.');
//       } else {
//         // Something happened in setting up the request that triggered an error
//         console.error('Request setup error:', error.message);
//         throw new Error(`Request setup error: ${error.message}`);
//       }
//     } else {
//       // Handle non-Axios errors
//       console.error('Unexpected error:', error);
//       throw new Error('An unexpected error occurred. Please try again later.');
//     }
//   }
// };

export const logout = async (token: string) => {
  try {
    const { data } = await axios.post<string>(
      `${BACKEND_URL}/v1/auth/logout`,
      null,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Logout response:', data);
    return data;
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
