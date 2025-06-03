import React from 'react'

const About: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">About Job Tracker</h1>
        <p className="text-xl text-gray-600">Simplifying your job search, one application at a time.</p>
      </div>

      <div className="mb-12 rounded-xl bg-white p-8 shadow-card">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Our Mission</h2>
        <p className="mb-6 text-lg text-gray-600">
          Job Tracker was created with a simple mission: to help job seekers organize and manage their job applications effectively. 
          We understand that the job search process can be overwhelming, with numerous applications to track, interviews to prepare for, 
          and follow-ups to remember.
        </p>
        <p className="text-lg text-gray-600">
          Our platform provides a centralized location to keep track of all your job applications, helping you stay organized 
          and focused on landing your dream job. Whether you're a recent graduate or a seasoned professional, Job Tracker is 
          designed to simplify your job search journey.
        </p>
      </div>

      <div className="mb-12 rounded-xl bg-white p-8 shadow-card">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Key Benefits</h2>
        <ul className="space-y-4 text-lg text-gray-600">
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

      <div className="rounded-xl bg-white p-8 shadow-card">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Our Team</h2>
        <p className="mb-6 text-lg text-gray-600">
          Job Tracker was developed by a team of passionate individuals who understand the challenges of the job search process. 
          Our team combines expertise in software development, user experience design, and career counseling to create a platform 
          that truly meets the needs of job seekers.
        </p>
        <p className="text-lg text-gray-600">
          We're constantly working to improve Job Tracker based on user feedback and evolving job market trends. Our goal is to 
          make your job search as smooth and successful as possible.
        </p>
      </div>
    </div>
  )
}

export default About
