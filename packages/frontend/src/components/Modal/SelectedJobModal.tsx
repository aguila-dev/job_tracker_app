import he from 'he'
interface SelectedJobModalProps {
  selectedJob: any
  setSelectedJob: any
  url: string
  setUrl: any
}
const SelectedJobModal = ({
  selectedJob,
  setSelectedJob,
  url,
  setUrl,
}: SelectedJobModalProps) => {
  console.log({ selectedJob })
  const handleNavigationClick = () => {
    setSelectedJob(null)
    setUrl('')
  }
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="relative h-full w-5/6 overflow-y-auto bg-white p-4 shadow-lg md:w-2/3">
        <button
          type="button"
          onClick={() => setSelectedJob(null)}
          className="fixed right-6 top-6 h-12 w-12 rounded-full bg-red-500 p-2 text-white opacity-50 hover:opacity-90"
          aria-label="Close"
        >
          &times;
        </button>
        <div
          className="job-details-content prose"
          dangerouslySetInnerHTML={{
            __html: he.decode(
              selectedJob && selectedJob.content
                ? selectedJob.content
                : selectedJob.jobPostingInfo
                  ? selectedJob.jobPostingInfo?.jobDescription
                  : 'No content found'
            ),
          }}
        ></div>
        <button
          type="button"
          onClick={() => setSelectedJob(null)}
          className="mt-4 rounded-lg bg-red-500 p-2 text-white"
        >
          Close
        </button>
        <a
          id="selectedJob-apply"
          type="button"
          href={url}
          target="_blank"
          onClick={handleNavigationClick}
          className="ml-4 mt-4 rounded-lg bg-blue-500 p-2 text-white transition-all duration-300 ease-in-out hover:text-black hover:opacity-75"
          rel="noreferrer"
        >
          Apply
        </a>
      </div>
    </div>
  )
}

export default SelectedJobModal
