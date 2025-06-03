import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import LogoutButton from '../Button/LogoutButton'
// import NavItem from '../Button/NavItem'

type NavbarLink = {
  name: string
  path: string
  active?: boolean
  requiresAuth?: boolean
}
interface NavbarProps {
  navbarLinks: NavbarLink[]
}

const Navbar = ({ navbarLinks }: NavbarProps) => {
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth0()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
    // Optionally toggle body scroll lock
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden'
  }

  const handleClickLink = (path: string) => {
    setIsMenuOpen(false)
    document.body.style.overflow = 'auto'
    navigate(path)
  }

  return (
    <nav className="z-50 bg-white p-6 shadow-card md:w-64 md:rounded-r-xl">
      {/* Hamburger Icon */}
      <div className="flex max-h-16 justify-end md:hidden">
        <button
          type="button"
          onClick={handleMenuToggle}
          className="z-50 flex h-12 w-12 items-center justify-center rounded-full bg-neutral text-xl text-light-text transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          {isMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
        </button>
      </div>
      {/* Fullscreen Menu for Mobile */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-white transition-all duration-300 ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } z-40`}
      >
        <div className="mb-8 text-2xl font-bold text-primary">Job Tracker</div>
        {navbarLinks
          .filter((link) =>
            user && user.email ? link.active : !link.requiresAuth
          )
          .map(
            (link) =>
              link.active && (
                <p
                  key={link.name}
                  className="my-2 cursor-pointer rounded-xl px-8 py-3 text-lg font-medium text-gray-800 transition-all hover:bg-neutral"
                  onClick={() => handleClickLink(link.path)}
                >
                  {link.name}
                </p>
              )
          )}
        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-full flex-1 justify-between md:flex md:flex-col md:gap-6">
        <div className="flex flex-col gap-2">
          <div className="mb-6 text-xl font-bold text-primary">Job Tracker</div>
          {navbarLinks
            .filter((link) =>
              user && user.email ? link.active : !link.requiresAuth
            )
            .map(
              (link) =>
                link.active && (
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
                )
            )}
        </div>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
