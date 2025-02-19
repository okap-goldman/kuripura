import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    hmr: {
      overlay: true,
      clientPort: 443,
      protocol: 'wss'
    }
  },
  plugins: [
    react(),
    process.env.NODE_ENV === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
