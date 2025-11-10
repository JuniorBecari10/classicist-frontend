import { createRouter, createWebHistory } from "vue-router";

import Landing from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import App from "@/views/App.vue";

const routes = [
    {
        path: "/",
        name: "Landing",
        component: Landing,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/app/:username",
        name: "App",
        component: App,
        props: true,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
