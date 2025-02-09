const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		const url = `http://localhost:3000/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};




// const { response } = require("express");
// const User =require("../models/User");
// //const mailSender = require("../utils/mailSender");
// const bcrypt = require("bcrypt");




// //rset password Token
// exports.resetPasswordToken = async (req,res) => {
//   try{
//     //get email from req body
//     const email = req.body.email;

//     //validation  email
//     const user = await User.findOne(emails);
//     if(!user) {
//       return res.json({successs:false,message:'Your email in not registered us'})
//     }
//     //generate token 
//     const token = crypto.randomUUID();
//     // upfate user by adding token and expiration times
//     const updatedDetails = await User.findByIdAndUpdate({email:email},{
//       token:token,
//       resetPasswordExpires: Date.now() + 5*60*1000;
//     }
//     {new:true});

//     //create url
//     const url = 'http://localhost:3000/update-password/${token}';

//     // send mail containg the url
//     await mailSender(email,"Password reset link",
//       `Password Reset Links:${url}`
//     )

    
//     //return response
//     return res.json({
//       success:true ,
//       message:"Email Sends Successfully and Password has reset successfully."
//     })
//   }
//   catch(error){
//     console.log(error);
//     return res.status(500).json({
//       success:false,
//       message:'Something went wrong while sending pwd mail'
//     })
//   }
// }


// //reset pasword in db

// exports.resetPassword = async (req,res) => {
//  try{
//   //data fetch 
//  const {password,confirmedPassword,token} = req.body;

//  // validation
//  if(password !== confirmedPassword){
//   return res.json({
//     success:false,
//     message:'Password not matching.'
//   });
//  }
//  // get user details from db using token
//  const userDetails = await User.findOne({token:token});
//  //if no entry - invalid token
//  if(!userDetails){
//   return res.json({
//     success:false,
//     message:"Token is invalid"
//   });
//  }
//  //token time
//  if(userDetails.resetPasswordExpires < Date.now()){
//   return res.json({success:false,
//     message:'Token is expired,Please regenerate your token';
//   })
//  } 

//  //hashpassword
//  const  hashedPassword = await bcrypt.hash(password,10);
//  //password ko update do
//  await User.findOne(
//   {token:token},
//   {password:hashedPassword},
//   {new:true}
//  )
//  //return response
//   return res.status(200).json({
//     success:true,
//     message:'Password reset Succesful.'
//   })

//  }
//  catch(error) {
//   console.log(error);
//   return res.json({
//     success:false,
//     message:"Can not reset Password Succesfully."
//   })
//  }
// }