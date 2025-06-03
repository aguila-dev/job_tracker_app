import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import LoginButton from '../Button/LoginButton';
import LogoutButton from '../Button/LogoutButton';
import { NAVBAR_LINKS } from '@/constants/navbarLinks';

const AppNavbar: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location.pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  // Determine if we're on a public page or protected page
  const isPublicPage = ['/', '/about', '/contact'].includes(location.pathname);

  // Determine which links to show
  const publicLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const protectedLinks = NAVBAR_LINKS.filter(
    (link) => link.active && (isAuthenticated ? true : !link.requiresAuth)
  );

  const links = isPublicPage ? publicLinks : protectedLinks;

  // Render different navbar styles for public/protected pages
  return isPublicPage ? (
    // Horizontal navbar for public pages
    <nav className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <div className='flex items-center'>
          <NavLink to='/' className='text-2xl font-bold text-primary'>
            Job Tracker
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className='flex md:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='rounded-lg p-2 text-gray-600 hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary'
            aria-expanded={isMobileMenuOpen}
            aria-label='Toggle navigation menu'
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation - public pages */}
        <ul className='hidden items-center space-x-1 md:flex md:space-x-4'>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                end={true}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 font-medium transition-all duration-200 md:px-4 md:py-2 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-neutral'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* Show Dashboard link when authenticated */}
          {isAuthenticated && (
            <li>
              <NavLink
                to='/profile'
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

          {/* Auth buttons */}
          {isLoading ? (
            <li className='ml-4 animate-pulse'>
              <div className='h-10 w-24 rounded-xl bg-gray-200'></div>
            </li>
          ) : (
            <li className='ml-2'>
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </li>
          )}
        </ul>
      </div>

      {/* Mobile menu - fullscreen overlay */}
      <div
        className={`fixed inset-0 z-50 transform bg-white transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex h-full flex-col'>
          {/* Mobile menu header with close button */}
          <div className='flex items-center justify-between p-4'>
            <span className='text-2xl font-bold text-primary'>Job Tracker</span>
            <button
              onClick={toggleMobileMenu}
              className='rounded-lg p-2 text-gray-600 hover:bg-neutral focus:outline-none'
              aria-label='Close menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu links */}
          <div className='flex flex-1 flex-col items-center justify-center space-y-4 p-4'>
            {/* Public links */}
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={true}
                className={({ isActive }) =>
                  `w-full rounded-xl px-6 py-3 text-center text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-neutral'
                  }`
                }
                onClick={toggleMobileMenu}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Dashboard link (when authenticated) */}
            {isAuthenticated && isPublicPage && (
              <NavLink
                to='/profile'
                end={true}
                className={({ isActive }) =>
                  `w-full rounded-xl px-6 py-3 text-center text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-neutral'
                  }`
                }
                onClick={toggleMobileMenu}
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Mobile menu footer with auth buttons */}
          <div className='p-4 text-center'>
            {isLoading ? (
              <div className='mx-auto h-10 w-32 animate-pulse rounded-xl bg-gray-200'></div>
            ) : (
              <div className='w-full'>
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  ) : (
    // Sidebar navbar for protected pages
    <nav className='z-50 bg-white shadow-card md:h-screen md:w-64 md:rounded-r-xl'>
      {/* Mobile header with menu button */}
      <div className='flex items-center justify-between p-4 md:hidden'>
        <span className='text-xl font-bold text-primary'>Job Tracker</span>
        <button
          onClick={toggleMobileMenu}
          className='rounded-lg p-2 text-gray-600 hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary'
          aria-expanded={isMobileMenuOpen}
          aria-label='Toggle navigation menu'
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu - fullscreen overlay */}
      <div
        className={`fixed inset-0 z-50 transform bg-white transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex h-full flex-col'>
          {/* Mobile menu header with close button */}
          <div className='flex items-center justify-between p-4'>
            <span className='text-2xl font-bold text-primary'>Job Tracker</span>
            <button
              onClick={toggleMobileMenu}
              className='rounded-lg p-2 text-gray-600 hover:bg-neutral focus:outline-none'
              aria-label='Close menu'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>

          {/* User info if authenticated */}
          {isAuthenticated && user && (
            <div className='mx-4 mb-6 flex items-center rounded-xl bg-neutral p-4'>
              <div className='mr-3 h-12 w-12 overflow-hidden rounded-full bg-primary'>
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name || 'User'}
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center text-white'>
                    {(user.name?.charAt(0) || 'U').toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className='font-medium text-gray-800'>{user.name}</p>
                <p className='text-sm text-gray-600'>{user.email}</p>
              </div>
            </div>
          )}

          {/* Mobile menu links - Protected routes */}
          <div className='flex flex-1 flex-col items-center justify-center space-y-4 p-4'>
            {/* Protected links */}
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={true}
                className={({ isActive }) =>
                  `w-full rounded-xl px-6 py-3 text-center text-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-neutral'
                  }`
                }
                onClick={toggleMobileMenu}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Public links when on protected pages */}
            <div className='my-4 w-full border-t border-gray-200 pt-4'>
              <p className='mb-2 text-center text-sm font-medium text-gray-500'>
                Public Pages
              </p>
              {publicLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={true}
                  className={({ isActive }) =>
                    `my-1 block w-full rounded-xl px-6 py-3 text-center text-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-neutral'
                    }`
                  }
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile menu footer with logout button */}
          <div className='p-4 text-center'>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Desktop sidebar menu */}
      <div className='hidden h-full p-6 md:block'>
        <div className='flex h-full flex-col'>
          <div className='mb-8 text-xl font-bold text-primary'>Job Tracker</div>

          {/* User info if authenticated */}
          {isAuthenticated && user && (
            <div className='mb-6 rounded-xl bg-neutral p-4'>
              <div className='mb-3 flex items-center'>
                <div className='mr-3 h-10 w-10 overflow-hidden rounded-full bg-primary'>
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || 'User'}
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center text-white'>
                      {(user.name?.charAt(0) || 'U').toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className='font-medium text-gray-800'>{user.name}</p>
                  <p className='text-sm text-gray-600'>{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Protected links */}
          <div className='flex flex-col space-y-2'>
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={true}
                className={({ isActive }) =>
                  `w-full rounded-xl px-4 py-3 text-center font-medium transition-all duration-200 ease-in-out hover:cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-neutral'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Public links when on protected pages */}
          <div className='mt-auto'>
            <div className='mb-4 mt-8 border-t border-gray-200 pt-4'>
              <p className='mb-2 text-sm font-medium text-gray-500'>
                Public Pages
              </p>
              {publicLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={true}
                  className={({ isActive }) =>
                    `my-1 block w-full rounded-xl px-4 py-2 text-center font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-neutral'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
