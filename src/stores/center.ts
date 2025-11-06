import { defineStore } from "pinia";
import { ref } from "vue";
import type { Work, Composer } from "@/model/work";
import type { Performer } from "@/model/recording";

export type CenterScreen =
    | { type: "work"; value: Work }
    | { type: "composer"; value: Composer }
    | { type: "performer"; value: Performer }
    | { type: "home" };

const HOME: CenterScreen = { type: "home" };

export const useCenterStore = defineStore("center", () => {
    const screen = ref<CenterScreen>(HOME);

    function home() {
        screen.value = HOME;
    }

    function work(w: Work) {
        screen.value = {
            type: "work",
            value: w,
        };
    }

    function composer(c: Composer) {
        screen.value = {
            type: "composer",
            value: c,
        };
    }

    function performer(p: Performer) {
        screen.value = {
            type: "performer",
            value: p,
        };
    }

    function isHome(): boolean {
        return screen.value.type === "home";
    }

    function isWork(): boolean {
        return screen.value.type === "work";
    }

    function isComposer(): boolean {
        return screen.value.type === "composer";
    }

    function isPerformer(): boolean {
        return screen.value.type === "performer";
    }

    return {
        screen,

        home,
        work,
        composer,
        performer,

        isHome,
        isWork,
        isComposer,
        isPerformer,
    };
});
