import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function mergeClasses(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}