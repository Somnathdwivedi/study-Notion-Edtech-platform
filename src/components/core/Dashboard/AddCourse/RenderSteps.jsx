import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"


export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <div className="mb-2 w-full">
      {/* Stepper Progress */}
      <div className="relative flex items-center justify-center">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center">
            {/* Step Button */}
            <div className="flex flex-col items-center">
              <button
                className={`grid aspect-square w-[34px] place-items-center rounded-full border-[1px] text-sm font-bold ${step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } ${step > item.id ? "bg-yellow-50 text-richblack-900" : ""}`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </button>
            </div>
            {/* Step Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] w-[33%] border-dashed ${step > item.id ? "border-yellow-50" : "border-richblack-500"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="relative mt-4 mb-16 flex justify-evenly">
        {steps.map((item) => (
          <div
            key={item.id}
            className="min-w-[130px] flex flex-col items-center gap-y-2"
          >
            <p
              className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render Specific Component Based on Step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>

  )
}