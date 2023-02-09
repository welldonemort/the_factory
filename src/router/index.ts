import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/photo/:id",
      name: "photo",
      component: () => import("../views/PhotoView/PhotoView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavView/FavView.vue"),
    },
  ],
});

export default router;
