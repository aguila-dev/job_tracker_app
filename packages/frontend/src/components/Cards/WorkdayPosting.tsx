const WorkdayPosting = ({ job, baseUrl, appliedJobs, extractJobId }: any) => {
  const isApplied = appliedJobs[extractJobId(job)]

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-evenly rounded-xl border-2 border-black p-4 text-center ${
        isApplied ? 'bg-green-200' : 'bg-slate-200 shadow-md'
      } transition-shadow duration-200 hover:shadow-lg`}
    >
      <h3 className="bg-slate-300 text-base font-semibold">
        {job?.title ? job.title : 'title here'}
      </h3>
      <p>{job.locationsText ? job.locationsText : ''}</p>
      <p>{job.postedOnDate ? job.postedOnDate : job.postedOn}</p>
      <a
        href={`${baseUrl}${job.externalPath}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Here
      </a>
      {job?.bulletFields.length &&
        job.bulletFields.map((field: any, index: number) => (
          <p key={index} className="text-sm">
            {field}
          </p>
        ))}
    </div>
  )
}

export default WorkdayPosting
