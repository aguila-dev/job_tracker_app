import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode
}

export const Auth0ProviderWithNavigate = ({
  children,
}: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL

  console.log({
    domain,
    clientId,
    redirectUri,
  })

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
