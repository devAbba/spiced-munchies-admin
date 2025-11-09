import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import Message from "vue-m-message";
import "vue-m-message/dist/style.css";

import "./style.css";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

// inject router in store
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);

app.use(pinia);
app.use(router);

Message.setDefault({
  duration: 3000,
  closable: true,
  stopTimerOnHover: true,
  supportHTML: false,
});
app.use(Message);

app.mount("#app");
