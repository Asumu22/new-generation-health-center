import { uploadToCloudinary } from "../lib/cloudinary";

export const uploadService = {
  uploadImage: async (file: File) => {
    return uploadToCloudinary(file);
  },
};
