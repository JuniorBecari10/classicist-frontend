import { createApp } from "vue";
import { createPinia } from "pinia";
import { ripple } from "./directives/ripple";

import "./assets/css/index.css";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.directive("ripple", ripple);
app.mount("#app");
