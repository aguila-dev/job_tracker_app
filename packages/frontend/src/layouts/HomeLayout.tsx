import AppNavbar from '@/components/Navbar/AppNavbar'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral">
      <AppNavbar />
      <main className="flex w-full flex-1 flex-col">{children}</main>
      
      {/* Footer */}
      <footer className="bg-white py-8 shadow-inner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and tagline */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-bold text-primary">Job Tracker</h3>
              <p className="text-sm text-gray-600">Simplifying your job search, one application at a time.</p>
            </div>
            
            {/* Company links */}
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium text-gray-800">Company</h4>
              <div className="flex flex-col space-y-2 text-sm">
                <Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link>
                <Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link>
                <Link to="#" className="text-gray-600 hover:text-primary">Careers</Link>
              </div>
            </div>
            
            {/* Resources links */}
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium text-gray-800">Resources</h4>
              <div className="flex flex-col space-y-2 text-sm">
                <Link to="#" className="text-gray-600 hover:text-primary">Blog</Link>
                <Link to="#" className="text-gray-600 hover:text-primary">Help Center</Link>
                <Link to="#" className="text-gray-600 hover:text-primary">Privacy Policy</Link>
              </div>
            </div>
            
            {/* Social media links */}
            <div className="flex flex-col space-y-2">
              <h4 className="font-medium text-gray-800">Stay Connected</h4>
              <div className="mt-2 flex space-x-3">
                <a href="#" className="rounded-full bg-neutral p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-neutral p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="rounded-full bg-neutral p-2 text-gray-600 transition-colors hover:bg-primary hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-600">© 2023 Job Tracker. All rights reserved.</p>
            </div>
          </div>
          
          {/* Mobile footer - simplified version for small screens */}
          <div className="mt-8 border-t border-gray-200 pt-8 text-center md:hidden">
            <div className="mb-4 space-x-4">
              <Link to="/about" className="text-sm text-gray-600 hover:text-primary">About</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">Contact</Link>
              <Link to="/profile" className="text-sm text-gray-600 hover:text-primary">Dashboard</Link>
            </div>
            <p className="text-sm text-gray-600">© 2023 Job Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomeLayout
