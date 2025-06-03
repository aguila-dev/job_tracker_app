import AppNavbar from '@/components/Navbar/AppNavbar'
import { LayoutProps } from '../interface/ILayout'

/**
 * ProtectedLayout.tsx file for handling protected routes
 * and logged in user routes
 */

const ProtectedLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral md:flex-row">
      <AppNavbar />
      <main className="flex w-full flex-1 flex-col gap-6 overflow-y-auto p-4 md:p-6">{children}</main>
    </div>
  )
}

export default ProtectedLayout
