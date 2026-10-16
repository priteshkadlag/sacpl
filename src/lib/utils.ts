import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
}

export function readingTime(words: string) {
  const count = words.trim().split(/\s+/).length;
  return Math.max(1, Math.round(count / 220));
}

export function pad(n: number, width = 2) {
  return String(n).padStart(width, '0');
}
