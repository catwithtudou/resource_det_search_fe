import { createApp } from "vue";
import App from "@/App.vue";
import route from "@/route";
import store from "@/store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 全局样式
import "@less/global.less";

createApp(App)
  .use(route)
  .use(store)
  .use(ElementPlus)
  .mount("#app");
