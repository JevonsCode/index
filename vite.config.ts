import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const path = require("path");

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: "./",
  publicDir: "./public",
  server: {
    port: 2333,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@pages": resolve("./src/pages"),
      "@components": resolve("./src/components"),
      "@service": resolve("./src/service"),
      "@store": resolve("./src/store"),
      "@assets": resolve("./src/assets"),
      "@database": resolve("./src/database"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "./src/assets/css/theme.less";`,
        },
      },
    },
  },
});
