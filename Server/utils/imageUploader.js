const cloudinary = require('cloudinary').v2;


const { uploader } = require('cloudinary').v2;

const uploadImageToCloudinary = async (file, folder, width, height) => {
  try {
    const options = {
      folder: folder,
      resource_type: "image",
      transformation: [
        { width: width, height: height, crop: "limit" },
      ],
    };
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};



module.exports = { uploadImageToCloudinary };