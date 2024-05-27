const cloudinary = require("cloudinary").v2;
const axios = require("axios");

// Configure your Cloudinary credentials
const configureCloudinary = config => {
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
  });
};

// Upload function for Node.js backend
const uploadFileToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

// Upload function for React frontend
const uploadFileToCloudinaryFrontend = async (file, folder, uploadPreset) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

module.exports = {
  configureCloudinary,
  uploadFileToCloudinary,
  uploadFileToCloudinaryFrontend
};