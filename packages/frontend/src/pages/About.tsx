import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center sm:mb-12">
        <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:mb-4 sm:text-4xl">About Job Tracker</h1>
        <p className="text-lg text-gray-600 sm:text-xl">Simplifying your job search, one application at a time.</p>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow-card sm:mb-12 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">Our Mission</h2>
        <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
          Job Tracker was created with a simple mission: to help job seekers organize and manage their job applications effectively. 
          We understand that the job search process can be overwhelming, with numerous applications to track, interviews to prepare for, 
          and follow-ups to remember.
        </p>
        <p className="text-base text-gray-600 sm:text-lg">
          Our platform provides a centralized location to keep track of all your job applications, helping you stay organized 
          and focused on landing your dream job. Whether you're a recent graduate or a seasoned professional, Job Tracker is 
          designed to simplify your job search journey.
        </p>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow-card sm:mb-12 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">Key Benefits</h2>
        <ul className="space-y-4 text-base text-gray-600 sm:text-lg">
          <li className="flex items-start">
            <div className="mr-3 mt-1 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong>Organization:</strong> Keep all your job applications in one place, with detailed information on each one.
            </div>
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-1 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong>Time Management:</strong> Never miss a deadline or follow-up with our intuitive tracking system.
            </div>
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-1 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong>Insights:</strong> Gain valuable insights into your job search progress with our analytics.
            </div>
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-1 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <strong>Peace of Mind:</strong> Reduce the stress of your job search by having everything organized and accessible.
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow-card sm:mb-12 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">Our Team</h2>
        <p className="mb-4 text-base text-gray-600 sm:mb-6 sm:text-lg">
          Job Tracker was developed by a team of passionate individuals who understand the challenges of the job search process. 
          Our team combines expertise in software development, user experience design, and career counseling to create a platform 
          that truly meets the needs of job seekers.
        </p>
        <p className="text-base text-gray-600 sm:text-lg">
          We're constantly working to improve Job Tracker based on user feedback and evolving job market trends. Our goal is to 
          make your job search as smooth and successful as possible.
        </p>
      </div>
      
      {/* CTA Section */}
      <div className="mt-8 rounded-xl bg-primary p-6 text-center text-white shadow-lg sm:p-8">
        <h3 className="mb-2 text-xl font-bold sm:mb-4">Ready to streamline your job search?</h3>
        <p className="mb-6 text-base sm:text-lg">Join thousands of job seekers who have simplified their job application process.</p>
        <button 
          onClick={handleGetStarted}
          className="w-full rounded-xl bg-white px-6 py-3 text-lg font-semibold text-primary shadow-lg transition-all hover:bg-neutral sm:w-auto"
        >
          Get Started Now
        </button>
      </div>
    </div>
  )
}

export default About
