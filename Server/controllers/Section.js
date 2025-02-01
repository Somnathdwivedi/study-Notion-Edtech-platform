const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   


// const Section = required("../models/Section");
// const Course = required("../models/Course");

// exports.createSection = async (req,res) => {
//   try{
//      //data fetch 
//      const (sectionName,courseId) = req.body;
  
//      //data validation
//      if(!sectionName || !courseId) {
//        return res.status(400).json({
//          success:false,
//          message:"Missing Propertiese"
//        })
//      }  
//      //create section 
//      const newSection   = await Section.create({sectionName});
//      //update course with section objectionID
//      const updatedCourseDetails = await Course.findByIdAndUpdated(
//        courseId,{
//          $push:{
//            courseContent:newSection.IdleDeadline,
//          }
//        },
//        {new:true},
//      )
//      //HW : use populate to replace section /subsection both in the updatedCOurseDetails

//      //return response
//      return res.status(200).json({
//        success:true,
//        message:'Section',
//        updatedCourseDetails,
//       })
//   }
//   catch(error) {
//    console.log(error)
//    return res.status(500).json({
//     success:false,
//     message:"Unable to create section to try again",
//     error:error,
//    })
//   }
// }


// exports.updateSection  = async (req,res) => {
//   try{
//     //fetch data 
//     const {sectionName,sectionId} = req.body
//     //validate
//     if(!sectionId || !sectionName) {
//       return res.status(400).json({
//         success:false,
//         message:"Missing Something.",
//       })
//     }
//     //updte data
//     const section = await Section.findByIdAndUpdated(sectionId,{sectionName},{new:true});
//     //return response
//     return res.statu(200).json({
//       success:true,
//       message:'Section Updated Successfully',
//     });

//   }
//   catch(error){
//     console.log(error)
//     return res.status(500).json({
//      success:false,
//      message:"Unable to update section to try again",
//      error:error,
//     })
//   }
// }



// exports.deleteSection = async (req,res) => {
//   try{
//     //get id - assuming  that are we are sending ID in params
//     const {sectionId} = req.params
//     //use findbyIDanddelete
//     await Section.findByIdAndDelete(sectionId);
//     //TODO{build in testing}: do we need to delete the entry for from the course schema
     
//     //return response
//     return res.status(200).json({
//       success:true,
//       message:"Section Deleted Successfully."
//     })
//   }
//   catch(error){
//     console.log(error)
//     return res.status(500).json({
//      success:false,
//      message:"Unable to delete section to try again",
//      error:error,
//     })
//   }
// }