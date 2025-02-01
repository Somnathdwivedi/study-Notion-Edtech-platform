import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../Services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  return (
    <>
    {/* Title Section */}
    <div className="mt-5 text-2xl font-medium text-richblack-50 sm:text-3xl">
      Enrolled Courses
    </div>
  
    {/* Conditional Rendering for Different States */}
    {!enrolledCourses ? (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    ) : !enrolledCourses.length ? (
      <p className="grid h-[10vh] w-full place-content-center text-sm text-richblack-300 sm:text-base">
        You have not enrolled in any course yet.
      </p>
    ) : (
      <div className="my-8">
        {/* Table Headings */}
        <div className="hidden rounded-t-lg bg-richblack-500 sm:flex">
          <p className="w-[45%] px-5 py-3 text-sm text-richblack-5">Course Name</p>
          <p className="w-1/4 px-2 py-3 text-sm text-richblack-5">Duration</p>
          <p className="flex-1 px-2 py-3 text-sm text-richblack-5">Progress</p>
        </div>
  
        {/* Enrolled Courses */}
        {enrolledCourses.map((course, i, arr) => (
          <div
            className={`flex flex-col items-start border border-richblack-700 sm:flex-row sm:items-center ${
              i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
            }`}
            key={i}
          >
            {/* Course Information */}
            <div
              className="flex w-full cursor-pointer items-center gap-4 px-5 py-3 sm:w-[45%]"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                );
              }}
            >
              <img
                src={course.thumbnail}
                alt="course_img"
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div className="flex max-w-xs flex-col gap-2">
                <p className="text-base font-semibold text-richblack-5">
                  {course.courseName}
                </p>
                <p className="text-xs text-richblack-300">
                  {course.courseDescription.length > 50
                    ? `${course.courseDescription.slice(0, 50)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>
  
            {/* Course Duration */}
            <div className="w-full px-5 py-3 text-sm text-richblack-300 sm:w-1/4 sm:px-2 sm:py-3">
              {course?.totalDuration}
            </div>
  
            {/* Progress Section */}
            <div className="w-full flex-col gap-2 px-5 py-3 text-sm text-richblack-300 sm:flex sm:w-1/5 sm:px-2 sm:py-3">
              <p>Progress: {course.progressPercentage || 0}%</p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </>
  
  )
}