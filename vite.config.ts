import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig(({ command }) => ({
  base: "/tut-v-ssg/",

  plugins: [vue(), command === "serve" ? vueDevTools() : null],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    cssCodeSplit: false,
  },

  ssgOptions: {
    formatting: "prettify",

    beastiesOptions: {
      reduceInlineStyles: false,
      preload: "none",

      publicPath: "/tut-v-ssg/",
      inlineThreshold: 90000,
    },
  } as never,
}));
