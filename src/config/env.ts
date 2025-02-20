export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiAuthUrl: import.meta.env.VITE_API_AUTH_URL,
  environment: import.meta.env.VITE_ENV,
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  isProduction: import.meta.env.VITE_ENV === 'production',
} as const;
