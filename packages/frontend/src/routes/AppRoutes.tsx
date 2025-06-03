import HomeLayout from '@/layouts/HomeLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import About from '@/pages/About'
import AllJobPostingsComponent from '@/pages/AllJobPostingsComponent'
import AppliedJobsComponent from '@/pages/AppliedJobs'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import NonAuthHome from '@/pages/NonAuthHome'
import { Route, Routes } from 'react-router-dom'

import { useSyncUser } from '@/hooks/useSyncUser'
import { useEffect } from 'react'
import ProtectedRoutes from './ProtectedRoutes'

const AppRoutes = () => {
  const { error } = useSyncUser()

  useEffect(() => {
    if (error) {
      console.error('Error syncing user:', error)
    }
  }, [error])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeLayout>
            <NonAuthHome />
          </HomeLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <HomeLayout>
            <Contact />
          </HomeLayout>
        }
      />
      <Route
        path="/about"
        element={
          <HomeLayout>
            <About />
          </HomeLayout>
        }
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/profile"
          element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
          }
        />
        <Route
          path="/jobs/:company"
          element={
            <ProtectedLayout>
              <AllJobPostingsComponent />
            </ProtectedLayout>
          }
        />
        <Route
          path="/profile/applied-jobs"
          element={
            <ProtectedLayout>
              <AppliedJobsComponent />
            </ProtectedLayout>
          }
        />
        <Route
          path="/jobs/todays-jobs"
          element={
            <ProtectedLayout>
              <AllJobPostingsComponent isTodaysJobs={true} />
            </ProtectedLayout>
          }
        />
      </Route>
      <Route path="/*" element={<div> Error 404</div>} />
    </Routes>
  )
}

export default AppRoutes
