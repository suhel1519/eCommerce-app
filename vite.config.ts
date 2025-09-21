import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar'],
          'vendor-mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'vendor-utils': ['clsx', 'class-variance-authority', 'tailwind-merge']
        }
      }
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: false, // Disable minification temporarily to debug
  },
});
