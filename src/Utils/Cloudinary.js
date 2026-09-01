import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uplaodOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file on Cloudinary
    const response = cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("File Is Uplaoded on Cloudinary", (await response).url);
    return response;
  } catch (error) {
    console.log("Error while uplaoding file", error);
    fs.unlinkSync(localFilePath); // removes the locally saved temp file as the upload operation got failed
    return null;
  }
};

export { uplaodOnCloudinary };
