const cloudName = (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME as string;
const uploadPreset = (import.meta as any).env
  .VITE_CLOUDINARY_UPLOAD_PRESET as string;
const MAX_UPLOAD_SIZE_BYTES = 2_800_000; // 2.8MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

if (!cloudName || !uploadPreset) {
  throw new Error("Missing required Cloudinary environment variables.");
}

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export const buildCloudinaryImageUrl = (
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
    effect?: string;
  },
) => {
  const transforms = [];

  if (options?.width) transforms.push(`w_${options.width}`);
  if (options?.height) transforms.push(`h_${options.height}`);
  if (options?.quality) transforms.push(`q_${options.quality}`);
  if (options?.effect) transforms.push(`e_${options.effect}`);
  transforms.push("f_auto");
  transforms.push("q_auto:good");

  const transformString = transforms.join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
};

export const isValidImageFile = (file: File): string | null => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Unsupported file type. Use JPG, PNG, WEBP or AVIF.";
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return "Image too large. Maximum size is 2.8MB.";
  }

  return null;
};

const compressImage = async (file: File): Promise<Blob> => {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const imageBitmap = await createImageBitmap(file);
  const maxDimension = 1600;
  const ratio = Math.min(
    1,
    maxDimension / Math.max(imageBitmap.width, imageBitmap.height),
  );
  const width = Math.round(imageBitmap.width * ratio);
  const height = Math.round(imageBitmap.height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return file;
  }

  ctx.drawImage(imageBitmap, 0, 0, width, height);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Image compression failed."));
          return;
        }
        resolve(blob);
      },
      file.type === "image/png" ? "image/png" : "image/jpeg",
      0.78,
    );
  });
};

export const uploadToCloudinary = async (file: File) => {
  const validationError = isValidImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const compressedBlob = await compressImage(file);
  const uploadFile =
    compressedBlob instanceof File
      ? compressedBlob
      : new File([compressedBlob], file.name, { type: file.type });

  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cloudinary upload failed: ${error}`);
  }

  return await response.json();
};
