import { createRouter, createWebHashHistory } from "vue-router";
import home from "@views/home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  return true;
});

export default router;
