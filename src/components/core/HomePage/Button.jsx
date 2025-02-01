import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({children,active, linkto}) {
  return (
    <Link to={linkto}>
      <div className={`text-center font-inter text-[16px] leading-6 px-6 py-3 rounded-md ${active ? "bg-yellow-50 text-black" :" bg-richblack-800 text-white border-b border-r border-richblack-400"} hover:scale-95 transition duration-200`}>
        {children}
      </div>
    </Link>
    
  )
}
