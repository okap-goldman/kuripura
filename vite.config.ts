import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '',
  server: {
    host: true,
    port: 8080,
    strictPort: false,
    hmr: {
      overlay: true
    },
    allowedHosts: [
      'image-post-app-tunnel-7mtu0whd.devinapps.com',
      'image-post-app-tunnel-58pu1ckr.devinapps.com',
      'image-post-app-tunnel-zq9ylxru.devinapps.com'
    ]
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
