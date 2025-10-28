import { defineStore } from "pinia";
import type { Work } from "@/model/work";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        queue: [] as Work[],
    }),
});
