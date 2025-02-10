import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      clientPort: 443,
      protocol: 'wss',
      host: "google-login-app-tunnel-iru0eesc.devinapps.com",
      path: "/@vite/client",
      timeout: 30000
    },
    allowedHosts: [
      "google-login-app-tunnel-iru0eesc.devinapps.com"
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
