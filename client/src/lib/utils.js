import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("pl-pl", {
  style: 'currency',
  currency: 'PLN'
})