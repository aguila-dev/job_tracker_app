export const MagnifyingGlassLogo = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="40" r="30" fill="#FF5733" />
    <rect
      x="60"
      y="60"
      width="20"
      height="40"
      fill="#FF5733"
      transform="rotate(45 60 60)"
    />
  </svg>
)
import logo from '../../assets/image.png'
export const MagnifyingGlassArrowLogo = () => (
  <div className="item-center h-10 w-10 justify-center rounded-full p-2 text-center">
    <img
      src={logo}
      alt=""
      className="m-auto h-full w-full rounded-full object-cover"
    />
  </div>
)
