import NonAuthNavbar from '@/components/Navbar/NonAuthNavbar'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <NonAuthNavbar />
      <main className="flex w-full flex-1 flex-col gap-4 p-4">{children}</main>
    </div>
  )
}

export default HomeLayout
