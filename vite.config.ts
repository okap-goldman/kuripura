import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: '',
    server: {
      host: '0.0.0.0',
      port: 8080,
      strictPort: true,
      hmr: {
        overlay: true,
        clientPort: 8080,
        protocol: 'ws'
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
    envPrefix: 'VITE_',
    define: {
      __VUE_PROD_DEVTOOLS__: false
    }
  };
});
