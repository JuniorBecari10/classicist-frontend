import { defineStore } from "pinia";
import { ref } from "vue";
import type { Work } from "@/model/work";

export const usePlayerStore = defineStore("player", () => {
    const queue = ref<Work[]>([]);

    function addWork(work: Work) {
        queue.value.push(work);
    }

    function removeWork(index: number) {
        if (index < 0 || index >= queue.value.length)
            return;
        
        queue.value.splice(index, 1);
    }

    function clear() {
        queue.value = [];
    }

    return {
        queue,

        addWork,
        removeWork,
        clear,
    };
});
