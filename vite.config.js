
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

export default defineConfig({
  define: {
    'import.meta.env.VITE_BASE_URL_API': JSON.stringify(process.env.VITE_BASE_URL_API),
    'import.meta.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL),
    'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_API_KEY),


  }
});
