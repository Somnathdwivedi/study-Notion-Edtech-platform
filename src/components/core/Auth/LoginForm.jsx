
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../Services/operations/AuthAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      {/* Email Field */}
      <label className="w-full">
        <p className="mb-1 text-sm leading-5 text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder-richblack-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </label>

      {/* Password Field */}
      <label className="relative w-full">
        <p className="mb-1 text-sm leading-5 text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-md bg-richblack-800 p-3 pr-10 text-richblack-5 placeholder-richblack-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {/* Password Toggle */}
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer text-richblack-300"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={20} />
          ) : (
            <AiOutlineEye fontSize={20} />
          )}
        </span>
        {/* Forgot Password Link */}
        <Link to="/forgot-password">
          <p className="mt-2 text-xs text-blue-200 hover:underline">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-yellow-50 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Sign In
      </button>
    </form>

  )
}

export default LoginForm
