import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <div className="flex w-full flex-col xl:flex-row gap-y-6 xl:gap-x-6 mt-5">
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <h1 className="mb-8 text-2xl font-medium text-richblack-5 sm:text-3xl">
          Add Course
        </h1>
        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>

      {/* Course Upload Tips */}
      <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:sticky xl:top-10 xl:max-w-[400px]">
        <p className="mb-6 text-lg font-bold text-richblack-5">⚡ Course Upload Tips</p>
        <ul className="ml-5 list-disc space-y-4 text-xs text-richblack-200 sm:text-sm">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important updates.</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>

  )
}