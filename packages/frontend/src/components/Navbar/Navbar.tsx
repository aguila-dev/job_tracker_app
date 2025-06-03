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
    <nav className="dark-green z-50 p-4 font-semibold text-slate-50 md:w-64">
      {/* Hamburger Icon */}
      <div className="flex max-h-16 justify-end md:hidden">
        <button
          type="button"
          onClick={handleMenuToggle}
          className="z-50 flex h-12 w-12 items-center justify-center text-3xl text-black focus:outline-none"
        >
          {isMenuOpen ? <span>&times;</span> : <span>&#9776;</span>}
        </button>
      </div>
      {/* Fullscreen Menu for Mobile */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-zinc-700 transition-opacity duration-300 ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        } z-40`}
      >
        {navbarLinks
          .filter((link) =>
            user && user.email ? link.active : !link.requiresAuth
          )
          .map(
            (link) =>
              link.active && (
                <p
                  key={link.name}
                  className="cursor-pointer py-4 text-xl hover:opacity-75"
                  onClick={() => handleClickLink(link.path)}
                >
                  {link.name}
                </p>
              )
          )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden h-full flex-1 justify-between md:flex md:flex-col md:gap-4">
        <div className="flex flex-col gap-4">
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
                    className={({ isActive }) =>
                      `w-full rounded-lg px-4 py-2 text-center text-black transition-all duration-300 ease-in-out hover:cursor-pointer ${
                        isActive
                          ? 'bg-slate-400 bg-opacity-90'
                          : 'hover:bg-slate-300 hover:bg-opacity-65'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
            )}
        </div>
        <LogoutButton />
        {/* <button
          type="button"
          onClick={handleLogout}
          // to='/auth'
          className="w-full rounded-lg px-4 py-2 text-center text-black transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-slate-300 hover:bg-opacity-65"
        >
          Logout
        </button> */}
      </div>
    </nav>
  )
}

export default Navbar
