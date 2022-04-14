import { createRouter, createWebHashHistory } from "vue-router";
import home from "@views/home.vue";
import register from "@views/register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/register",
    name: "register",
    component: register,
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
