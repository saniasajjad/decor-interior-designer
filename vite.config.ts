import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/decor-interior-designer/', // ⭐ IMPORTANT for GitHub Pages ⭐

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
    postcss: './postcss.config.js', // Ensure PostCSS is used
  }
});
