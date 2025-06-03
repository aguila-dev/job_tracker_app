import Navbar from '../components/Navbar/Navbar'
import { NAVBAR_LINKS } from '../constants/navbarLinks'
import { LayoutProps } from '../interface/ILayout'

/**
 * ProtectedLayout.tsx file for handling protected routes
 * and logged in user routes
 */

const ProtectedLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col bg-neutral md:flex-row">
      <Navbar navbarLinks={NAVBAR_LINKS} />
      <main className="flex w-full flex-1 flex-col gap-6 overflow-y-auto p-6">{children}</main>
    </div>
  )
}

export default ProtectedLayout
