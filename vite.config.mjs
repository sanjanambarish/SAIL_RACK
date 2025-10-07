import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tagger from "@dhiwise/component-tagger";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the output dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react(), tagger()],
  server: {
    port: 5000,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  // Add this section for path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
