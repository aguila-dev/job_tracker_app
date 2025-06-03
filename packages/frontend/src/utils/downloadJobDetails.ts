// Utility function to trigger the download of job application details
const downloadAppliedJobDetails = (content: string, filename: string) => {
  const element = document.createElement('a')
  const file = new Blob([content], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = filename
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
  document.body.removeChild(element) // Clean-up
}

export default downloadAppliedJobDetails
