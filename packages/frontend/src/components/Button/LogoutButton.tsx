import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({ 
      logoutParams: { returnTo: window.location.origin } 
    })
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center justify-center rounded-xl bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
      aria-label="Log out"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Log Out
    </button>
  )
}

export default LogoutButton
