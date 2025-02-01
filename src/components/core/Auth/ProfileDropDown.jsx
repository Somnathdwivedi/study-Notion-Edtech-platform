import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../Services/operations/AuthAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button
      className="relative flex items-center gap-x-1"
      onClick={() => setOpen((prev) => !prev)}
    >
      {/* Profile and Dropdown Toggle */}
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full z-[1000] mt-2 w-[200px] divide-y divide-richblack-700 rounded-md border border-richblack-700 bg-richblack-800 shadow-lg"
          ref={ref}
        >
          {/* Dashboard Link */}
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>

          {/* Logout Option */}
          <button
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </button>

  )
}