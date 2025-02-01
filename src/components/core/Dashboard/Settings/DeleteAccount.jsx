import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../Services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
    <div className="my-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-6 sm:p-8 md:px-12">
      {/* Icon Container */}
      <div className="flex aspect-square h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-pink-700">
        <FiTrash2 className="text-2xl sm:text-3xl text-pink-200" />
      </div>
  
      {/* Content */}
      <div className="flex flex-col space-y-4 text-center sm:text-left">
        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>
        {/* Description */}
        <div className="text-sm sm:text-base text-pink-25">
          <p>Would you like to delete your account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the content associated with it.
          </p>
        </div>
        {/* Action Button */}
        <button
          type="button"
          className="w-fit cursor-pointer italic text-pink-300 hover:underline"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  </>
  
  )
}