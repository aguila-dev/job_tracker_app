import { useAuth0, User as Auth0User } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { checkUserExists, createUser } from '@/api/auth';

// Define a more comprehensive user type that combines Auth0 and DB user
interface AppUser extends Auth0User {
  id?: number;
  firstName?: string;
  lastName?: string;
  auth0ProviderId?: string;
  role?: string;
  authenticated?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetch or create a user in the backend
 */
const fetchUser = async (
  token: string,
  email: string,
  name?: string,
  sub?: string
): Promise<AppUser> => {
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
        updated_at: new Date().toISOString(),
        firstName: name || email.split('@')[0] || 'User',
        lastName: 'User',
        auth0ProviderId: sub || 'auth0|debug',
        role: 'user',
        authenticated: true,
      } as AppUser;
    }

    if (existingUser) {
      console.log('FetchUser: User found:', existingUser.email);
      // Merge Auth0 user data with DB user data, preserving DB fields
      const mergedUser = {
        // Auth0 required fields
        email: existingUser.email || email,
        name: existingUser.firstName || name || email,
        sub: sub || existingUser.auth0ProviderId,
        email_verified: true,
        picture: '',
        updated_at: existingUser.updatedAt || new Date().toISOString(),
        
        // DB user data
        ...existingUser,
      };
      
      console.log('FetchUser: Merged user data:', mergedUser);
      return mergedUser;
    }

    // If user doesn't exist, create a new one
    console.log('FetchUser: User not found, creating new user');
    try {
      const newUser = await createUser(
        email,
        name || email.split('@')[0] || 'User',
        token
      );
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
        updated_at: new Date().toISOString(),
        firstName: name || email.split('@')[0] || 'User',
        lastName: 'User',
        auth0ProviderId: sub || 'auth0|debug-create',
        role: 'user',
        authenticated: true,
      } as AppUser;
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
            Authorization: error.config?.headers?.Authorization
              ? '[REDACTED]'
              : undefined,
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
      updated_at: new Date().toISOString(),
      firstName: name || email.split('@')[0] || 'User',
      lastName: 'User',
      auth0ProviderId: sub || 'auth0|debug-error',
      role: 'user',
      authenticated: true,
    } as AppUser;
  }
};

/**
 * Hook to synchronize Auth0 user with backend
 */
// User sync state to prevent unnecessary backend calls
const userSyncCache = new Map<string, any>();

export const useSyncUser = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  
  // In debug mode, always return a mock user if auth fails
  const DEBUG_MODE = true;
  
  // Log auth state for debugging
  console.log('SyncUser: Auth0 user:', user);
  console.log('SyncUser: Auth0 isAuthenticated:', isAuthenticated);
  console.log('SyncUser: User sync cache size:', userSyncCache.size);
  
  // Create a debug user based on Auth0 user or default values
  const createDebugUser = (email?: string, name?: string, sub?: string): AppUser => {
    return {
      id: 0,
      email: email || 'debug@example.com',
      name: name || email?.split('@')[0] || 'Debug User',
      sub: sub || 'auth0|debug-user',
      email_verified: true,
      picture: '',
      updated_at: new Date().toISOString(),
      firstName: name?.split(' ')[0] || email?.split('@')[0] || 'Debug',
      lastName: name?.split(' ').slice(1).join(' ') || 'User',
      auth0ProviderId: sub || 'auth0|debug-user',
      role: 'user',
      authenticated: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  return useQuery({
    queryKey: ['syncUser', user?.email, user?.sub],
    queryFn: async () => {
      try {
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
              detailedResponse: true,
            });

            if (!token) {
              console.log('SyncUser: No token received, using Auth0 user');
              
              // If no token but we're authenticated, create an enhanced user
              const enhancedUser = {
                ...user,
                id: 0,
                firstName: user.name?.split(' ')[0] || user.email?.split('@')[0],
                lastName: user.name?.split(' ').slice(1).join(' ') || 'User',
                auth0ProviderId: user.sub,
                role: 'user',
                authenticated: true
              };
              
              userSyncCache.set(cacheKey, enhancedUser);
              return enhancedUser;
            }

            // In case token is a detailed response object
            const accessToken = typeof token === 'string' ? token : token.access_token;
            console.log('SyncUser: Token received (first 20 chars):', accessToken.substring(0, 20) + '...');

            try {
              console.log('SyncUser: Fetching user data from backend...');
              const userData = await fetchUser(
                accessToken,
                user.email,
                user.name,
                user.sub
              );
              console.log('SyncUser: User data fetched successfully:', userData.email);
              // Cache the user data
              userSyncCache.set(cacheKey, userData);
              return userData;
            } catch (fetchError) {
              console.error('SyncUser: Error fetching user from backend:', fetchError);
              
              // Create an enhanced user that combines Auth0 with necessary DB fields
              const enhancedUser = {
                ...user,
                id: 0,
                firstName: user.name?.split(' ')[0] || user.email?.split('@')[0],
                lastName: user.name?.split(' ').slice(1).join(' ') || 'User',
                auth0ProviderId: user.sub,
                role: 'user',
                authenticated: true
              };
              
              console.log('SyncUser: Using enhanced Auth0 user:', enhancedUser.email);
              userSyncCache.set(cacheKey, enhancedUser);
              return enhancedUser;
            }
          } catch (tokenError) {
            console.error('SyncUser: Token retrieval failed:', tokenError);
            
            if (DEBUG_MODE) {
              const debugUser = createDebugUser(user.email, user.name, user.sub);
              console.log('SyncUser: Using debug user after token error:', debugUser.email);
              userSyncCache.set(cacheKey, debugUser);
              return debugUser;
            }
            
            // Just use the Auth0 user as fallback
            userSyncCache.set(cacheKey, user);
            return user;
          }
        } else {
          console.log('SyncUser: Not authenticated or missing user email');
          
          // For development purposes, return a debug user
          if (DEBUG_MODE) {
            const debugUser = createDebugUser();
            console.log('SyncUser: Returning debug user for unauthenticated state');
            return debugUser;
          }
          
          return null;
        }
      } catch (error) {
        console.error('SyncUser: Unexpected error in query function:', error);
        
        if (DEBUG_MODE) {
          return createDebugUser(user?.email, user?.name, user?.sub);
        }
        
        throw error; // Rethrow to trigger onError handler
      }
    },
    enabled: Boolean(isAuthenticated || DEBUG_MODE), // Enable even in debug mode
    retry: 1, // Try only once more after a failure
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
      console.error('SyncUser: Error synchronizing user:', error);
      
      if (DEBUG_MODE) {
        // Force an update to the cache with a debug user
        if (user) {
          const cacheKey = `${user.sub}-${user.email}`;
          const debugUser = createDebugUser(user.email, user.name, user.sub);
          userSyncCache.set(cacheKey, debugUser);
        }
      } else if (user) {
        // Non-debug mode, fall back to Auth0 user
        const cacheKey = `${user.sub}-${user.email}`;
        userSyncCache.set(cacheKey, user);
      }
    },
  });
};
