import { uploadToCloudinary } from "../lib/cloudinary";

export const useCloudinaryUpload = () => {
  const uploadImage = async (file: File) => {
    const response = await uploadToCloudinary(file);
    return {
      url: response.secure_url as string,
      publicId: response.public_id as string,
    };
  };

  return {
    uploadImage,
  };
};
