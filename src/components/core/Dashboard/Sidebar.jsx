import { useState } from "react";
import { VscMenu, VscSignOut } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../Services/operations/AuthAPI";
import SidebarLink from "./SiderbarLinks";
import ConfirmationModal from "../../common/ConfirmationModel";

export default function Sidebar() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for sidebar visibility and button visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(true); // Open the sidebar
    setIsButtonVisible(false); // Hide the toggle button
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false); // Close the sidebar
    setIsButtonVisible(true); // Show the toggle button again
  };

  const handleLinkClick = (path) => {
    navigate(path); // Navigate to the clicked link's path
    setIsSidebarOpen(false); // Close the sidebar
    setIsButtonVisible(true); // Show the toggle button again
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isButtonVisible && (
        <button
          onClick={handleToggleSidebar}
          className="absolute top-2 left-3 z-50 flex items-center p-2 text-white bg-richblack-900 rounded-md lg:hidden"
        >
          {!isSidebarOpen && (
            <>
              <VscMenu className="text-2xl" />
              <span className="ml-2 text-sm font-medium font-inter">Menu</span>
            </>
          )}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full lg:h-auto min-w-[220px] transform bg-richblack-800 py-10 shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:border-r-[1px] lg:border-r-richblack-700`}
      >
        {/* Close Button */}
        <div className="absolute top-3 right-3">
          <IoMdClose
            size={30}
            className="rounded bg-richblack-800 text-white p-1 cursor-pointer lg:hidden"
            onClick={handleCloseSidebar}
          />
        </div>

        <div className="flex flex-col overflow-y-auto">
          {/* Sidebar Links */}
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <button
                key={link.id}
                className="flex items-center p-2 text-white hover:bg-richblack-700 rounded-md"
                onClick={() => handleLinkClick(link.path)}
              >
                <SidebarLink link={link} iconName={link.icon} />
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        {/* Settings and Logout */}
        <div className="flex flex-col">
        <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            onClick={() => handleLinkClick("/dashboard/settings")}
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}


// import { useState } from "react";
// import { VscSignOut, VscMenu } from "react-icons/vsc";
// import { IoMdClose } from "react-icons/io";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { sidebarLinks } from "../../../data/dashboard-links";
// import { logout } from "../../../Services/operations/AuthAPI";
// import ConfirmationModal from "../../common/ConfirmationModel";
// import SidebarLink from "./SiderbarLinks";

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   );
//   const { loading: authLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // State Management
//   const [confirmationModal, setConfirmationModal] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isButtonVisible, setIsButtonVisible] = useState(true);  // Button visibility state


//   // Handle Loading
//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   const handleToggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     setIsButtonVisible(false);  // Hide the button after it's clicked
//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       {isButtonVisible && (
//         <button
//           onClick={handleToggleSidebar}
//           className="absolute top-2 left-3 z-50 flex items-center p-2 text-white bg-richblack-700 rounded-md lg:hidden"
//         >
//           {!isSidebarOpen ? (
//             <>
//               <VscMenu className="text-2xl" />
//               <span className="ml-2 text-sm font-medium font-inter">Menu</span>
//             </>
//           ) : null}
//         </button>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 z-40 h-full min-w-[220px] transform bg-richblack-800 py-10 shadow-lg transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:border-r-[1px] lg:border-r-richblack-700`}
//       >
//         <div><IoMdClose size={24} className="absolute top-0 right-1 rounded bg-white" onClick={() => { setIsSidebarOpen(!isSidebarOpen) }} /></div>
//         <div className="flex flex-col overflow-y-auto">
//           {/* Sidebar Links */}
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null;
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             );
//           })}
//         </div>

//         {/* Divider */}
//         <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

//         {/* Settings and Logout */}
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="px-8 py-2 text-sm font-medium text-richblack-300 hover:bg-richblack-700"
//           >
//             <div className="flex items-center gap-x-2">
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

//       {/* Overlay for Mobile */}
//       {isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
//         />
//       )}
//     </>
//   );
// }
