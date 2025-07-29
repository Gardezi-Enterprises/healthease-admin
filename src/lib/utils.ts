import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get image source for team members
export function getImageSource(image: string | File | undefined, fallback?: string): string {
  if (!image) {
    return fallback || '';
  }
  
  if (typeof image === 'string') {
    return image;
  }
  
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  
  return fallback || '';
}
