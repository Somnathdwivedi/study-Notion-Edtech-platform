const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key:process.env.API_KEY,
			api_secret:process.env.API_SECRET ,
			timeout: 60000, // Timeout in milliseconds (e.g., 60 seconds)
		});
	} catch (error) {
		console.log(error);
	}
};