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
  return buildCloudinaryImageUrl(value, {
    width: options?.width ?? 1200,
    height: options?.height,
    quality: options?.quality,
    format: options?.format,
  });
};
