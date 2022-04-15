import { createRouter, createWebHashHistory } from "vue-router";
import home from "@views/home.vue";
import register from "@views/register.vue";
import personal from "@views/personal.vue";
import personalResource from "@views/personalResource.vue";
import personalTags from "@views/personalTags.vue";
import personalCategories from "@views/personalCategories.vue";

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
  {
    path: "/personal",
    name: "personal",
    component: personal,
    children: [
      {
        path: "resource",
        component: personalResource,
      },
      {
        path: "tags",
        component: personalTags,
      },
      {
        path: "categories",
        component: personalCategories,
      },
    ],
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
