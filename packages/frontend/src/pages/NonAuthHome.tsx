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
      <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-neutral to-white px-4 py-16 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 md:text-5xl lg:text-6xl">
          Track Your Job Applications <br />
          <span className="text-primary">All in One Place</span>
        </h1>
        <p className="mb-10 max-w-2xl text-xl text-gray-600">
          Simplify your job search with our comprehensive tracking tool. Never lose track of applications, interviews, and offers again.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button 
            onClick={handleGetStarted}
            className="rounded-xl bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-opacity-90"
          >
            Get Started
          </button>
          <Link 
            to="/about" 
            className="rounded-xl bg-white px-8 py-3 text-lg font-semibold text-primary shadow-lg transition-all hover:bg-neutral"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-neutral p-6 shadow-card">
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Track Applications</h3>
              <p className="text-gray-600">Keep all your job applications organized in one place, never lose track of where you applied.</p>
            </div>
            
            <div className="rounded-xl bg-neutral p-6 shadow-card">
              <div className="mb-4 inline-flex rounded-full bg-secondary/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Daily Job Updates</h3>
              <p className="text-gray-600">Get daily updates on new job postings from top companies, all tailored to your preferences.</p>
            </div>
            
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
    </div>
  )
}

export default NonAuthHome
