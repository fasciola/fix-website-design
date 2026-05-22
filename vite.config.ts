import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // GitHub Pages repo name (change to your actual repo name)
  const base = process.env.GITHUB_PAGES 
    ? '/fix-website-design/'  // ← Your repo name with slashes
    : '/';

  return {
    base, // ✅ Critical for GitHub Pages asset loading
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // ✅ Better: point @ to src/ for cleaner imports
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false, // Optional: reduce size for production
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});