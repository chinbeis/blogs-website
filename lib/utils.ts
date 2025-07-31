import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

//deploy
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}