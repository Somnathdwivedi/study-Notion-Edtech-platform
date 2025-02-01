import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../Services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../Services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

export default function Instructor() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])
  
    useEffect(() => {
      ;(async () => {
        setLoading(true)
        const instructorApiData = await getInstructorData(token)
        const result = await fetchInstructorCourses(token)
        console.log(instructorApiData)
        if (instructorApiData.length) setInstructorData(instructorApiData)
        if (result) {
          setCourses(result)
        }
        setLoading(false)
      })()
    }, [])
  
    const totalAmount = instructorData?.reduce(
      (acc, curr) => acc + curr.totalAmountGenerated,
      0
    )
  
    const totalStudents = instructorData?.reduce(
      (acc, curr) => acc + curr.totalStudentsEnrolled,
      0
    )
  
    return (
      <div className="mt-5 space-y-4">
      {/* Greeting Section */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5 sm:text-3xl">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-sm font-medium text-richblack-200 sm:text-base">
          Let's start something new
        </p>
      </div>
    
      {loading ? (
        <div className="grid min-h-[200px] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div>
          {/* Visualization and Statistics Section */}
          <div className="my-4 flex flex-col gap-4 lg:flex-row">
            {/* Visualization */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <div className="flex-1">
                <InstructorChart courses={instructorData} />
              </div>
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6 text-center">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
    
            {/* Statistics */}
            <div className="flex flex-col gap-4 min-w-[250px] rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-richblack-200">Total Courses</p>
                  <p className="text-2xl font-semibold text-richblack-50 sm:text-3xl">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-richblack-200">Total Students</p>
                  <p className="text-2xl font-semibold text-richblack-50 sm:text-3xl">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-richblack-200">Total Income</p>
                  <p className="text-2xl font-semibold text-richblack-50 sm:text-3xl">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
    
          {/* Your Courses Section */}
          <div className="rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="flex flex-col">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[150px] w-full rounded-md object-cover lg:h-[201px]"
                  />
                  <div className="mt-3">
                    <p className="text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2 text-xs text-richblack-300">
                      <p>{course.studentsEnroled.length} students</p>
                      <span>|</span>
                      <p>Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-10 text-center">
          <p className="text-2xl font-bold text-richblack-5 sm:text-3xl">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
    
    )
  }