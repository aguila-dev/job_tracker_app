import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchBackendUser, setToken, setUser } from '@/redux/slices/auth0Slice';
import { fetchApplicationsWithAuth0 } from '@/redux/slices/applicationSlice';

/**
 * Hook to synchronize Auth0 user with Redux store and backend
 */
export const useAuth0Sync = () => {
  const { isAuthenticated, user, getAccessTokenSilently, isLoading: isAuth0Loading } = useAuth0();
  const dispatch = useAppDispatch();
  const { user: storeUser, isLoading, error } = useAppSelector(state => state.auth0);

  useEffect(() => {
    // Clear state if not authenticated
    if (!isAuthenticated && !isAuth0Loading && storeUser) {
      dispatch(setUser(null));
      dispatch(setToken(null));
      return;
    }

    // Skip if still loading or no user
    if (isAuth0Loading || !isAuthenticated || !user || !user.email) {
      return;
    }

    // Get token and fetch user data
    const syncUser = async () => {
      try {
        console.log('Getting token for user sync');
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: 'openid profile email',
          },
        });

        // Store token in Redux
        dispatch(setToken(token));

        // Fetch backend user
        console.log('Fetching backend user');
        dispatch(fetchBackendUser({ 
          email: user.email, 
          token, 
          sub: user.sub 
        })).then((action) => {
          if (action.meta.requestStatus === 'fulfilled' && action.payload?.id) {
            // If successful and user has an ID, fetch applications
            dispatch(fetchApplicationsWithAuth0({ 
              token, 
              userId: action.payload.id 
            }));
          }
        });
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    // Only sync if we don't have a user yet or if the email changed
    if (!storeUser || storeUser.email !== user.email) {
      syncUser();
    }
  }, [isAuthenticated, isAuth0Loading, user, storeUser, dispatch, getAccessTokenSilently]);

  return {
    isLoading: isLoading || isAuth0Loading,
    user: storeUser,
    error
  };
};