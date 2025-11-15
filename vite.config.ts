import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use root path for Vercel, subdirectory path for GitHub Pages
  base: process.env.VERCEL || process.env.VERCEL_URL ? '/' : '/decor-interior-designer/',

  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: { overlay: false },
  },

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },

  css: {
    postcss: './postcss.config.js',
  }
});
