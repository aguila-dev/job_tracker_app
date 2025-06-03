import { LayoutProps } from '../interface/ILayout'

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <main className="h-dvh w-dvw">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full items-center justify-evenly">
          <div className="dark-green hidden h-full flex-1 flex-col items-center justify-evenly sm:flex">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to the Auth Layout
            </h2>
            <p>Helping thousands of applicants just like you</p>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthLayout
