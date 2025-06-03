import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { targetUrl: window.location.pathname },
    })
  }

  return (
    <button
      onClick={handleLogin}
      className="flex items-center rounded-xl bg-primary px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      aria-label="Log in"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
      Log In
    </button>
  )
}

export default LoginButton
