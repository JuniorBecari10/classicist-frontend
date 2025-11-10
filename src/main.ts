import { createApp } from "vue";
import { createPinia } from "pinia";
import { ripple } from "./directives/ripple";
import { router } from "./router";

import "./assets/css/index.css";
import Root from "./Root.vue";

createApp(Root)
    .use(createPinia())
    .use(router)

    .directive("ripple", ripple)
    .mount("#app");
