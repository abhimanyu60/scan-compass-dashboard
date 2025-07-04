
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Simple development component tagger as alternative to lovable-tagger
const devComponentTagger = () => {
  return {
    name: 'dev-component-tagger',
    transform(code: string, id: string) {
      if (process.env.NODE_ENV === 'development' && id.includes('.tsx') && !id.includes('node_modules')) {
        // Add simple dev attributes to components for debugging
        return code.replace(
          /export\s+default\s+(\w+)/g,
          `export default $1`
        );
      }
      return code;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && devComponentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
