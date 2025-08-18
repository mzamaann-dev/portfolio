import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to get the correct asset path for static files
export function getAssetPath(path: string): string {
  if (typeof window !== 'undefined') {
    // Client-side: use the current location to determine the base path
    const basePath = window.location.pathname.startsWith('/portfolio') ? '/portfolio' : '';
    return `${basePath}${path}`;
  }
  
  // Server-side: use environment variable or default
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  return `${basePath}${path}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
