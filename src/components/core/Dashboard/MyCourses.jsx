import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../Services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
   
  }, [])

  return (
    <div className="p-4 sm:p-6 lg:p-8">
    {/* Header Section */}
    <div className="mb-8 mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h1 className="text-2xl font-medium text-richblack-5 sm:text-3xl">
        My Courses
      </h1>
      <IconBtn
        text="Add Course"
        onclick={() => navigate("/dashboard/add-course")}
        className="self-start sm:self-center"
      >
        <VscAdd />
      </IconBtn>
    </div>
  
    {/* Courses Table */}
    {courses ? (
      <CoursesTable courses={courses} setCourses={setCourses} />
    ) : (
      <p className="text-sm text-richblack-400">
        No courses available. Please add a course.
      </p>
    )}
  </div>
  
  )
}