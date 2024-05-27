import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

export const configureCloudinary = (config) => {
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  });
};

export const uploadFileToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

export const uploadFileToCloudinaryFrontend = async (
  file,
  folder,
  uploadPreset
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        cloudinary.config().cloud_name
      }/image/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};
