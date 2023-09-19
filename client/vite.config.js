import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();
// console.log('Environment variables:', process.env);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL),
      // Add more replacements for other environment variables here
    }),
  ],
})

