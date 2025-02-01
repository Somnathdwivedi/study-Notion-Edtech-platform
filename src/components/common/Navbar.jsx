import React, { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import apiConnector from "../../Services/ApiConnecter";
import { categories } from "../../Services/apis";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [sublinks, setSubLinks] = useState([]);
  const location = useLocation();

  // Fetch sublinks for the "Catalog" dropdown
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Printing Sublinks result:", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.error("Could not fetch data from catalog list:", error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  // Check if a route matches the current location
  const matchRoute = (Route) => {
    return matchPath(Route, location.pathname);
  };

  const [menuOpen, setMenuOpen] = useState(false); // Define the state for menu toggle
  //const [menuClose, setMenuClose] = useState(false); // Define the state for menu close toggle
  const [catalogOpen, setCatalogOpen] = useState(false);


  return (

    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            width={160}
            height={42}
            loading="lazy"
            className="w-auto"
          />
        </Link>

        {/* Navbar Links */}
        <nav className="hidden md:flex">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks?.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className="relative flex flex-row items-center gap-2 group"
                    onMouseEnter={() => setCatalogOpen(true)}
                    onMouseLeave={() => setCatalogOpen(false)}
                  >
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    {catalogOpen && (
                      <div className="absolute top-[120%] left-[50%] translate-x-[-50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 lg:w-[300px]">
                        {sublinks.length ? (
                          sublinks.map((sublink, index) => (
                            <Link to={sublink.link} key={index}>
                              <p>{sublink.title}</p>
                            </Link>
                          ))
                        ) : (
                          <p>No categories available</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/Signup or Dashboard */}
        <div className="flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {!token && (
            <div className="hidden md:flex gap-x-2">
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
          {token && <ProfileDropDown />}
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-richblack-25"
          >
            {menuOpen ? <IoMdClose size={24} /> : <IoIosMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-richblue-900 transition duration-200 ease-out z-50 md:hidden">
          <ul className="flex flex-col items-start gap-y-4 p-4 text-richblack-25">
            {NavbarLinks?.map((link, index) => (
              <li key={index} className="w-full">
                {link.title === "Catalog" ? (
                  <div className="relative group">
                    <div className="flex items-center justify-between w-full">
                      <p>{link.title}</p>
                      <IoIosArrowDropdownCircle />
                    </div>
                    <div className="mt-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900">
                      {sublinks.length ? (
                        sublinks.map((sublink, index) => (
                          <Link
                            to={sublink.link}
                            key={index}
                            onClick={() => setMenuOpen(false)}
                          >
                            <p>{sublink.title}</p>
                          </Link>
                        ))
                      ) : (
                        <p>No categories available</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                  >
                    <p
                      className={`${matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
            {!token && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="w-full border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                    Log in
                  </button>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="w-full border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
  //   <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
  //     <div className="flex w-11/12 max-w-maxContent items-center justify-between">
  //       {/* Logo */}
  //       <Link to="/">
  //         <img
  //           src={logo}
  //           alt="Logo"
  //           width={160}
  //           height={42}
  //           loading="lazy"
  //           className="w-auto"
  //         />
  //       </Link>

  //       {/* Navbar Links */}
  //       <nav className="hidden md:flex">
  //         <ul className="flex gap-x-6 text-richblack-25">
  //           {NavbarLinks?.map((link, index) => (
  //             <li key={index}>
  //               {link.title === "Catalog" ? (
  //                 <div className="relative flex flex-row items-center gap-2 group">
  //                   <p>{link.title}</p>
  //                   <IoIosArrowDropdownCircle />
  //                   {/* Dropdown menu */}
  //                   <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
  //                     <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 bg-richblack-5 translate-y-[-45%] translate-x-[80%]"></div>
  //                     {sublinks.length ? (
  //                       sublinks.map((sublink, index) => (
  //                         <Link to={sublink.link} key={index}>
  //                           <p>{sublink.title}</p>
  //                         </Link>
  //                       ))
  //                     ) : (
  //                       <p>No categories available</p>
  //                     )}
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <Link to={link.path}>
  //                   <p
  //                     className={`${matchRoute(link.path)
  //                       ? "text-yellow-25"
  //                       : "text-richblack-25"
  //                       }`}
  //                   >
  //                     {link.title}
  //                   </p>
  //                 </Link>
  //               )}
  //             </li>
  //           ))}
  //         </ul>
  //       </nav>

  //       {/* Login/Signup or Dashboard */}
  //       <div className="flex gap-x-4 items-center">
  //         {user && user.accountType !== "Instructor" && (
  //           <Link to="/dashboard/cart" className="relative">
  //             <AiOutlineShoppingCart />
  //             {totalItems > 0 && <span>{totalItems}</span>}
  //           </Link>
  //         )}
  //         {!token && (
  //           <div className="hidden md:flex gap-x-2">
  //             <Link to="/login">
  //               <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
  //                 Log in
  //               </button>
  //             </Link>
  //             <Link to="/signup">
  //               <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
  //                 Sign Up
  //               </button>
  //             </Link>
  //           </div>
  //         )}
  //         {token && <ProfileDropDown />}
  //       </div>
  //     </div>


  //     {/* Hamburger Menu for Small Screens */}
  //     <div className="md:hidden">
  //       <button
  //         onClick={() => setMenuOpen(!menuOpen)} // Toggle menuOpen state
  //         className="text-richblack-25"
  //       >
  //         {menuOpen ? <IoMdClose size={24} /> : <IoIosMenu size={24} />}
  //       </button>

  //     </div>

  //     {/* Mobile Dropdown Menu */}
  //     {menuOpen && (
  //       <div className="absolute top-14 left-0 w-full sm:bg-white transition duration-200 ease-out z-50 md:hidden">
  //         <ul className="flex flex-col items-start gap-y-4 p-4 text-richblack-25">
  //           {NavbarLinks?.map((link, index) => (
  //             <li key={index} className="w-full">
  //               {link.title === "Catalog" ? (
  //                 <div className="relative group">
  //                   <div className="flex items-center justify-between w-full">
  //                     <p>{link.title}</p>
  //                     <IoIosArrowDropdownCircle />
  //                   </div>
  //                   <div className="mt-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900">
  //                     {sublinks.length ? (
  //                       sublinks.map((sublink, index) => (
  //                         <Link to={sublink.link} key={index} onClick={() => {setMenuOpen(false)}}>
  //                           <p>{sublink.title}</p>
  //                         </Link>
  //                       ))
  //                     ) : (
  //                       <p>No categories available</p>
  //                     )}
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <Link to={link.path} onClick={() => {setMenuOpen(false)}}>
  //                   <p
  //                     className={`${matchRoute(link.path)
  //                       ? "text-yellow-25"
  //                       : "text-richblack-25"
  //                       }`}
  //                 >
  //                     {link.title}
  //                   </p>
  //                 </Link>
  //               )}
  //             </li>
  //           ))}
  //           {!token && (
  //             <>
  //               <Link to="/login" onClick={() => {setMenuOpen(false)}}>
  //                 <button className="w-full border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
  //                   Log in
  //                 </button>
  //               </Link>
  //               <Link to="/signup" onClick={() => {setMenuOpen(false)}}>
  //                 <button className="w-full border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
  //                   Sign Up
  //                 </button>
  //               </Link>
  //             </>
  //           )}
  //         </ul>
  //       </div>
  //     )}
  //   </div>
  // );


  // <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
  //   <div className="flex w-11/12 max-w-maxContent items-center justify-between">
  //     {/* Logo */}
  //     <Link to="/">
  //       <img
  //         src={logo}
  //         alt="Logo"
  //         width={160}
  //         height={42}
  //         loading="lazy"
  //       />
  //     </Link>

  //     {/* Navbar Links */}
  //     <nav>
  //       <ul className="flex gap-x-6 text-richblack-25">
  //         {NavbarLinks?.map((link, index) => (
  //           <li key={index}>
  //             {link.title === "Catalog" ? (
  //               <div className="relative flex flex-row items-center gap-2 group">
  //                 <p>{link.title}</p>
  //                 <IoIosArrowDropdownCircle />
  //                 {/* Dropdown menu */}
  //                 <div className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
  //                   <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 bg-richblack-5 translate-y-[-45%] translate-x-[80%]"></div>
  //                   {sublinks.length ? (
  //                     sublinks.map((sublink, index) => (
  //                       <Link to={sublink.link} key={index}>
  //                         <p>{sublink.title}</p>
  //                       </Link>
  //                     ))
  //                   ) : (
  //                     <p>No categories available</p>
  //                   )}
  //                 </div>
  //               </div>
  //             ) : (
  //               <Link to={link.path}>
  //                 <p
  //                   className={`${
  //                     matchRoute(link.path)
  //                       ? "text-yellow-25"
  //                       : "text-richblack-25"
  //                   }`}
  //                 >
  //                   {link.title}
  //                 </p>
  //               </Link>
  //             )}
  //           </li>
  //         ))}
  //       </ul>
  //     </nav>

  //     {/* Login/Signup or Dashboard */}
  //     <div className="flex gap-x-4 items-center">
  //       {user && user.accountType !== "Instructor" && (
  //         <Link to="/dashboard/cart" className="relative">
  //           <AiOutlineShoppingCart />
  //           {totalItems > 0 && <span>{totalItems}</span>}
  //         </Link>
  //       )}
  //       {!token && (
  //         <>
  //           <Link to="/login">
  //             <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
  //               Log in
  //             </button>
  //           </Link>
  //           <Link to="/signup">
  //             <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
  //               Sign Up
  //             </button>
  //           </Link>
  //         </>
  //       )}
  //       {token && <ProfileDropDown />}
  //     </div>
  //   </div>
  // </div>

}
