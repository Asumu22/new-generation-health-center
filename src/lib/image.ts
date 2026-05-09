import { buildCloudinaryImageUrl } from "./cloudinary";

export const resolveImageUrl = (
  value: string | null | undefined,
  fallback?: string,
  options?: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  },
) => {
  if (!value) return fallback || "";
  if (value.startsWith("http") || value.startsWith("data:")) return value;

  // Use aggressive optimization for production
  return buildCloudinaryImageUrl(value, {
    width: options?.width ?? 800, // Smaller default
    height: options?.height,
    quality: options?.quality ?? "auto:low", // Better compression
    format: options?.format ?? "auto",
  });
};
