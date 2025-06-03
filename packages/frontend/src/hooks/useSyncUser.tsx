import { useAuth0, User } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import { checkUserExists, createUser } from '@/api/auth'

/**
 * Fetch or create a user in the backend
 */
const fetchUser = async (
  token: string,
  email: string,
  name?: string,
  sub?: string
): Promise<User> => {
  try {
    console.log('FetchUser: Checking if user exists for email:', email);
    
    // Try to check if the user exists
    let existingUser = null;
    try {
      existingUser = await checkUserExists(email, token);
    } catch (checkError) {
      console.error('FetchUser: Error checking for existing user:', checkError);
      
      // For debugging purposes, create a fake user
      console.log('FetchUser: Creating a fake user for debugging');
      return {
        id: 0,
        email: email,
        name: name || email.split('@')[0] || 'User',
        sub: sub || 'auth0|debug',
        email_verified: true,
        picture: '',
        updated_at: new Date().toISOString()
      } as User;
    }
    
    if (existingUser) {
      console.log('FetchUser: User found:', existingUser.email);
      return existingUser;
    }
    
    // If user doesn't exist, create a new one
    console.log('FetchUser: User not found, creating new user');
    try {
      const newUser = await createUser(email, name || email.split('@')[0] || 'User', token);
      console.log('FetchUser: User created successfully:', newUser.email);
      return newUser;
    } catch (createError) {
      console.error('FetchUser: Error creating user:', createError);
      
      // If we get here, both checkUser and createUser failed
      // Create a fake user for debugging
      console.log('FetchUser: Creating a fake user after failed creation');
      return {
        id: 1,
        email: email,
        name: name || email.split('@')[0] || 'User',
        sub: sub || 'auth0|debug-create',
        email_verified: true,
        picture: '',
        updated_at: new Date().toISOString()
      } as User;
    }
  } catch (error) {
    // Provide detailed error information
    if (isAxiosError(error)) {
      console.error('FetchUser: API error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: {
            // Show Authorization header exists but not the actual token
            Authorization: error.config?.headers?.Authorization ? '[REDACTED]' : undefined,
          },
        },
      });
    } else {
      console.error('FetchUser: Non-API error:', error);
    }
    
    // Return a fake user for debugging
    return {
      id: 2,
      email: email,
      name: name || email.split('@')[0] || 'User',
      sub: sub || 'auth0|debug-error',
      email_verified: true,
      picture: '',
      updated_at: new Date().toISOString()
    } as User;
  }
}

/**
 * Hook to synchronize Auth0 user with backend
 */
// User sync state to prevent unnecessary backend calls
const userSyncCache = new Map<string, any>();

export const useSyncUser = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()

  return useQuery({
    queryKey: ['syncUser', user?.email, user?.sub],
    queryFn: async () => {
      if (isAuthenticated && user && user.email) {
        // Check if we already have this user cached
        const cacheKey = `${user.sub}-${user.email}`;
        if (userSyncCache.has(cacheKey)) {
          console.log('SyncUser: Using cached user data');
          return userSyncCache.get(cacheKey);
        }
        
        console.log('SyncUser: Starting user sync for:', user.email);
        
        try {
          // Use getAccessTokenSilently to avoid the modal
          console.log('SyncUser: Getting token silently...');
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: 'openid profile email',
            },
            detailedResponse: true
          });
          
          if (!token) {
            console.log('SyncUser: No token received, using Auth0 user');
            userSyncCache.set(cacheKey, user);
            return user;
          }
          
          // In case token is a detailed response object
          const accessToken = typeof token === 'string' ? token : token.access_token;
          
          try {
            const userData = await fetchUser(accessToken, user.email, user.name, user.sub);
            // Cache the user data
            userSyncCache.set(cacheKey, userData);
            return userData;
          } catch (fetchError) {
            console.log('SyncUser: Error fetching user, using Auth0 user');
            userSyncCache.set(cacheKey, user);
            return user;
          }
        } catch (tokenError) {
          console.log('SyncUser: Token retrieval failed, using Auth0 user');
          userSyncCache.set(cacheKey, user);
          return user;
        }
      } else {
        console.log('SyncUser: Not authenticated or missing user email');
        return null;
      }
    },
    enabled: isAuthenticated && Boolean(user?.email),
    retry: 0, // Disable automatic retries
    staleTime: Infinity, // Consider data always fresh (never refetch automatically)
    gcTime: 24 * 60 * 60 * 1000, // Keep data in cache for 24 hours
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch when component remounts
    refetchOnReconnect: false, // Don't refetch when network reconnects
    onSuccess: (data) => {
      if (data) {
        console.log('SyncUser: Successfully synchronized user:', data.email);
      }
    },
    onError: (error) => {
      console.log('SyncUser: Error synchronizing user, falling back to Auth0 user');
      if (user) {
        const cacheKey = `${user.sub}-${user.email}`;
        userSyncCache.set(cacheKey, user);
      }
    }
  });
}
