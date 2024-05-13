import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  process.env = { ...process.env, ...env }; // required to express as it uses process.env

  const serverOptions = getServerOptions();

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: serverOptions,
    preview: serverOptions,
  };
});

function getServerOptions() {
  return {
    host: "0.0.0.0",
    strictPort: true,
    port: 3000,
  };
}
