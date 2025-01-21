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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToast = (toast: any, description: string) => {
  toast({
    description,
    duration: 3000,
  });
};
