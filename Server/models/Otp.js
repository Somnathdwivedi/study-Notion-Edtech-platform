const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if(this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const Otp = mongoose.model("Otp", OTPSchema);

module.exports = Otp;


// const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");
// const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// const OTPSchema = new mongoose.Schema({
// 	email: {
// 		type: String,
// 		required: true,
// 	},
// 	otp: {
// 		type: String,
// 		required: true,
// 	},
// 	createdAt: {
// 		type: Date,
// 		default: Date.now,
// 		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
// 	},
// });

// // Function to send verification email
// async function sendVerificationEmail(email, otp) {
// 	try {
// 		const mailResponse = await mailSender(
// 			email,
// 			"Verification Email",
// 			emailTemplate(otp)
// 		);
// 		if (mailResponse && mailResponse.response) {
// 			console.log("Email sent successfully: ", mailResponse.response);
// 		} else {
// 			console.log("Unexpected response from mail sender:", mailResponse);
// 		}
// 	} catch (error) {
// 		console.error("Error occurred while sending email: ", error);
// 		throw error;
// 	}
// 	console.log("Email sent successfully:", mailResponse);
// }

// // Pre-save hook to send email after document save
// OTPSchema.pre("save", async function (next) {
// 	console.log("New document saved to database");

// 	// Only send an email when a new document is created
// 	if (this.isNew) {
// 		try {
// 				await sendVerificationEmail(this.email, this.otp);
// 		} catch (error) {
// 				return next(error); // Passes the error to the next middleware or error handler
// 		}
// }
// 	next();
// });

// const OTP = mongoose.model("OTP", OTPSchema);

// module.exports = OTP;






// const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");

// const otpSchema = new mongoose.Schema({
//   email:{
//     type:String,
//     required:true,
//   },
//   otp:{
//     type:String,
//     required:true,
//   },
//   createdAt:{
//     type:Date,
//     default:Date.now(),
//     expires: 5*60,
//   }
// });

// //a function -> to send an emails
// async function sendVarificationEmail(email,otp) {
//   try{
//     const mailResponce = await mailSender(email,"Varification from Study-Notion",otp);
//     console.log("Email sends successfully", mailResponce);
//   }
//   catch(error){
//     console.error("Error occuring while sending email ->",error);
//   }
// }


// otpSchema.pre("save", async function(next) {
//   await sendVarificationEmail(this.email,this.otp);
//   next();
// })

// module.exports = mongoose.model("OTP", otpSchema);

