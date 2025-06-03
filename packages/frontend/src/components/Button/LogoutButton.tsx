// src/components/LogoutButton.tsx
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0()

  return (
    <button
      type="button"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  )
}

export default LogoutButton
