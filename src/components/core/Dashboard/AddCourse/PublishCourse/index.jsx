import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../Services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleCoursePublish()
  }

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-8">
        {/* Checkbox */}
        <div>
          <label
            htmlFor="public"
            className="flex items-center text-lg text-richblack-400"
          >
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="h-4 w-4 rounded border-gray-300 bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2">Make this course as public</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={goBack}
            className="flex items-center justify-center gap-2 rounded-md bg-richblack-300 px-4 py-2 font-semibold text-richblack-900 transition hover:bg-richblack-400 disabled:opacity-50"
          >
            Back
          </button>
          <IconBtn
            disabled={loading}
            text="Save Changes"
            className="transition disabled:opacity-50"
          />
        </div>
      </form>
    </div>

  )
} 