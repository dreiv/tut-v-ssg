import { ViteSSG } from "vite-ssg";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Home.vue"),
  },
  {
    path: "/about",
    component: () => import("./pages/About.vue"),
  },
];

export const createApp = ViteSSG(App, {
  routes,
  base: import.meta.env.BASE_URL,
});
