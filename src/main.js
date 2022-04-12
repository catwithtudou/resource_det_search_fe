import { createApp } from "vue";
import App from "@/App.vue";
import route from "@/route";
import store from "@/store"

createApp(App)
  .use(route)
  .use(store)
  .mount("#app");
