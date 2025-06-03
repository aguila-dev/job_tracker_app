type NavbarLink = {
  name: string
  path: string
  active?: boolean
}
interface NavItemProps {
  link: NavbarLink
  handleClickLink: (path: string) => void
}
const NavItem = ({ link, handleClickLink }: NavItemProps) => {
  return (
    <button
      type="button"
      className="w-full rounded-xl px-4 py-2 text-black hover:cursor-pointer hover:opacity-90 active:bg-slate-200"
      onClick={() => handleClickLink(link.path)}
    >
      {link.name}
    </button>
  )
}

export default NavItem
