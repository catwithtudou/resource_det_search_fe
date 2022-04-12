import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import banner from "vite-plugin-banner";
import pkg from "./package.json";
const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig({
  base: "/",

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  resolve: {
    alias: {
      // 兼容webpack的习惯
      "@": resolve("src"),
      "@img": resolve("src/assets/img"),
      "@less": resolve("src/assets/less"),
      "@libs": resolve("src/libs"),
      "@cp": resolve("src/components"),
      "@views": resolve("src/views"),
      "@store": resolve("src/store"),
    },
  },

  plugins: [
    vue(),

    components({
      dirs: [resolve("src/components")],
      extensions: ["vue"],
      deep: true,
      dts: false,
    }),

    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author}\n */`,
    ),
  ],
});
