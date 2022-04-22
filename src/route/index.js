import { createRouter, createWebHashHistory } from "vue-router";
import home from "@views/home.vue";
import register from "@views/register.vue";
import personal from "@views/personal.vue";
import personalResource from "@views/personalResource.vue";
import personalTags from "@views/personalTags.vue";
import personalCategories from "@views/personalCategories.vue";
import resourceInfo from "@views/resourceInfo.vue";
import uploadResource from "@views/uploadResource.vue";
import resourceHome from "@views/resourceHome.vue";
import resourceSearch from "@views/resourceSearch.vue";
import resourceHomePart from "@views/resourceHomePart.vue";
import resourceSearchPart from "@views/resourceSearchPart.vue";

import store from "@/store";

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
  {
    path: "/resource/info/:id",
    name: "resourceInfo",
    component: resourceInfo,
  },
  {
    path:"/resource/upload",
    name:"uploadResource",
    component: uploadResource,
  },
  {
    path:"/resource/home",
    name:"resourceHome",
    component: resourceHome,
    children: [
      {
        path: "part/:partId",
        component: resourceHomePart,
      }
    ],
  },
  {
    path:"/resource/search",
    name:"resourceSearch",
    component: resourceSearch,
    children: [
      {
        path: "part/:partId",
        name: "resourceSearchPart",
        component: resourceSearchPart,
      }
    ],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.path === "/" || to.path === "/register") {
    return true;
  }

  if (store.getters["home/isUserLogin"]) {
    return true;
  }

  let res = await store.dispatch("home/localUserInfo");
  if (!res) {
    router.push("/");
    return false;
  }

  return true;
});

export default router;
