import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import type { ViteSSGOptions } from "vite-ssg";

// https://vite.dev/config/
export default defineConfig({
  base: "/tut-v-ssg/",
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  ssgOptions: {
    formatting: "minify",
    crittersOptions: {
      reduceInlineStyles: false,
      preload: "swap",
      publicPath: "/tut-v-ssg/",
    },
  } as ViteSSGOptions,
});
