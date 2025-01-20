import { Cookie } from '@/types/payment';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCookies = (cookies: Cookie[]) => {
  return cookies.reduce((acc, { name, value }) => {
    return acc + (name + '=' + value + '; ');
  }, '');
};
