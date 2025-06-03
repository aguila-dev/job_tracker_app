import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

import LoginButton from '../Button/LoginButton'
import LogoutButton from '../Button/LogoutButton'

const NonAuthNavbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  return (
    <nav className="bg-slate-500">
      <ul className="flex h-full items-center justify-end gap-4 px-4 py-2">
        <li>
          <NavLink to="/" className="text-white">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="text-white">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="text-white">
            About
          </NavLink>
        </li>
        {isLoading ? (
          <li className="animate-pulse">
            <div className="h-6 w-20 rounded bg-gray-300"></div>
          </li>
        ) : (
          <>
            {isAuthenticated && (
              <li>
                <NavLink to="/profile" className="text-white">
                  Profile
                </NavLink>
              </li>
            )}
            <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NonAuthNavbar
