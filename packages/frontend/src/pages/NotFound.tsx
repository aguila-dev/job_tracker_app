import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const NotFound: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-neutral px-4 py-16 text-center">
      <div className="mb-8 text-9xl font-bold text-primary">404</div>
      <h1 className="mb-6 text-4xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mb-8 max-w-md text-lg text-gray-600">
        Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
      </p>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link 
          to={isAuthenticated ? "/profile" : "/"} 
          className="rounded-xl bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-opacity-90"
        >
          Back to Home
        </Link>
        <Link 
          to="/contact" 
          className="rounded-xl bg-white px-8 py-3 text-lg font-semibold text-primary shadow-lg transition-all hover:bg-neutral"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}

export default NotFound