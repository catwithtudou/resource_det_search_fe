import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
import route from "@/route";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 全局样式
import "@less/global.less";

createApp(App)
  .use(store)
  .use(route)
  .use(ElementPlus)
  .mount("#app");
