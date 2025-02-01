const express = require("express");
const router = express.Router();

//Import Controllers

//Course controllers
const {createCourse,editCourse,getAllCourse,getFullCourseDetails,getInstructorCourses,deleteCourse, getCourseDetails} = require("../controllers/Course");

// Category Controllers
const {createCategoy,showAllCategories,categoryPageDetails, createCategory} = require("../controllers/Category");

//section controllers 
const {createSection,updateSection,deleteSection} = require("../controllers/Section");

// subsection controllers
const {createSubSection,updateSubSection,deleteSubSection} = require("../controllers/Subsection");


//rating ans review controller
const {createRating,getAverageRating,getAllRating}  = require("../controllers/RatingAndReview");

//courseProgress controllers
const {updateCourseProgress} = require("../controllers/CourseProgress");

//Import middlewares
const {auth,isStudent,isAdmin,isInstructor} = require("../middlewares/auth")


router.post("/createCourse",auth,isInstructor,createCategory)
router.post("/createSection",auth,isInstructor,createSection)
router.post("/updatesection",auth,isInstructor,updateSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)
router.post("/getAllCourse",getAllCourse)
router.post("/getCourseDetails",getCourseDetails)
router.post("/getFullCourseDetails",auth,getFullCourseDetails)
router.post("/editCourse",auth,isInstructor,editCourse)
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)
router.delete("/deleteCourse",deleteCourse)
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)



//                          Category routes (Only by Admin)

// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllCategories)
router.post("/getCategoryDetails",categoryPageDetails)

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports =  router;