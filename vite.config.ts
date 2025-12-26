import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' ensures we load all env vars (including API_KEY from Netlify)
  // not just those starting with VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // This ensures process.env.API_KEY works in the browser code by replacing it with the build-time value
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});