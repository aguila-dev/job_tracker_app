import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from '@/ui/LoadingSpinner'

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral">
        <LoadingSpinner width="w-12" height="h-12" />
        <p className="mt-4 text-lg font-medium text-gray-700">Loading your profile...</p>
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
