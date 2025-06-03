import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

import LoginButton from '../Button/LoginButton'
import LogoutButton from '../Button/LogoutButton'

const NonAuthNavbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary">Job Tracker</span>
        </div>
        
        <ul className="flex items-center space-x-1 md:space-x-4">
          <li>
            <NavLink 
              to="/" 
              end={true}
              className={({ isActive }) => 
                `rounded-xl px-3 py-2 font-medium transition-all duration-200 md:px-4 md:py-2 ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-neutral'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about"
              className={({ isActive }) => 
                `rounded-xl px-3 py-2 font-medium transition-all duration-200 md:px-4 md:py-2 ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-neutral'
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact"
              className={({ isActive }) => 
                `rounded-xl px-3 py-2 font-medium transition-all duration-200 md:px-4 md:py-2 ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-neutral'
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          {isLoading ? (
            <li className="ml-4 animate-pulse">
              <div className="h-10 w-24 rounded-xl bg-gray-200"></div>
            </li>
          ) : (
            <>
              {isAuthenticated && (
                <li>
                  <NavLink 
                    to="/profile"
                    className={({ isActive }) => 
                      `rounded-xl px-3 py-2 font-medium transition-all duration-200 md:px-4 md:py-2 ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'text-gray-700 hover:bg-neutral'
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li className="ml-2">{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default NonAuthNavbar
