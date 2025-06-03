import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { targetUrl: window.location.pathname },
    })
  }

  return <button onClick={handleLogin}>Log In</button>
}

export default LoginButton
