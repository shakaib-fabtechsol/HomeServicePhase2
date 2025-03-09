import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

dotenv.config(); // Load .env variables

export default defineConfig({
  define: {
    "import.meta.env.VITE_BASE_URL_API": JSON.stringify(
      process.env.VITE_BASE_URL_API
    ),
    "import.meta.env.VITE_BASE_URL": JSON.stringify(process.env.VITE_BASE_URL),
    "import.meta.env.VITE_GOOGLE_API_KEY": JSON.stringify(
      process.env.VITE_GOOGLE_API_KEY
    ),
    "import.meta.env.VITE_BASE_URL_NODE": JSON.stringify(
      process.env.VITE_BASE_URL_NODE
    ),
  },
  // // server: {
  // //   proxy: {
  // //     "/socket.io": {
  // //       target: process.env.VITE_BASE_URL_NODE || import.meta.env.VITE_BASE_URL_NODE,
  // //       ws: true,
  // //     },
  // //   },
  // },
  plugins: [react()],
});
