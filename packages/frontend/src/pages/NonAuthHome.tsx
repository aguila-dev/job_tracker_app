import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NonAuthHome: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = '/profile'
    } else {
      loginWithRedirect({
        appState: { targetUrl: '/profile' },
      })
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-neutral to-white px-4 py-12 text-center sm:py-16">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-800 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
          Track Your Job Applications 
          <span className="block text-primary">All in One Place</span>
        </h1>
        <p className="mb-8 max-w-2xl px-2 text-lg text-gray-600 sm:mb-10 sm:text-xl">
          Simplify your job search with our comprehensive tracking tool. Never lose track of applications, interviews, and offers again.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button 
            onClick={handleGetStarted}
            className="w-full rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-opacity-90 sm:w-auto sm:px-8"
          >
            Get Started
          </button>
          <Link 
            to="/about" 
            className="w-full rounded-xl bg-white px-6 py-3 text-lg font-semibold text-primary shadow-lg transition-all hover:bg-neutral sm:w-auto sm:px-8"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 sm:mb-12 sm:text-3xl">Key Features</h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl bg-neutral p-6 shadow-card">
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Track Applications</h3>
              <p className="text-gray-600">Keep all your job applications organized in one place, never lose track of where you applied.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="rounded-xl bg-neutral p-6 shadow-card">
              <div className="mb-4 inline-flex rounded-full bg-secondary/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Daily Job Updates</h3>
              <p className="text-gray-600">Get daily updates on new job postings from top companies, all tailored to your preferences.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="rounded-xl bg-neutral p-6 shadow-card">
              <div className="mb-4 inline-flex rounded-full bg-accent/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Application Status</h3>
              <p className="text-gray-600">Easily update and track the status of each application, from applied to hired.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Mobile Only */}
      <section className="bg-primary px-4 py-8 text-center text-white md:hidden">
        <h3 className="mb-4 text-xl font-bold">Ready to get started?</h3>
        <button 
          onClick={handleGetStarted}
          className="w-full rounded-xl bg-white px-6 py-3 text-lg font-semibold text-primary shadow-lg transition-all hover:bg-opacity-90"
        >
          Sign Up Now
        </button>
      </section>
    </div>
  )
}

export default NonAuthHome
