interface LoadingSpinnerProps {
  width: string
  height: string
}
const LoadingSpinner = ({ width, height }: LoadingSpinnerProps) => {
  return (
    <span
      className={`spinner inline-block ${width} ${height} animate-spin rounded-full border-4 border-gray-400 border-t-white`}
    ></span>
  )
}

export default LoadingSpinner
