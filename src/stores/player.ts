import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Work } from "@/model/work";

export const usePlayerStore = defineStore("player", () => {
    const queue = ref<Work[]>([]);
    const currentIndex = ref<number>(-1);

    const current = computed(() =>
        currentIndex.value >= 0 && currentIndex.value < queue.value.length
            ? queue.value[currentIndex.value]
            : null
    );

    const hasNext = computed(() => currentIndex.value < queue.value.length - 1);
    const hasPrevious = computed(() => currentIndex.value > 0);

    function addWork(work: Work) {
        queue.value.push(work);
        
        if (currentIndex.value === -1)
            currentIndex.value = 0;
    }

    function removeWork(index: number) {
        if (index < 0 || index >= queue.value.length)
            return;
        
        queue.value.splice(index, 1);
        
        if (index <= currentIndex.value)
            currentIndex.value--;
        
        if (queue.value.length === 0)
            currentIndex.value = -1;
    }

    function clear() {
        queue.value = [];
        currentIndex.value = -1;
    }

    function next() {
        if (hasNext.value)
            currentIndex.value++;
    }

    function previous() {
        if (hasPrevious.value)
            currentIndex.value--;
    }

    return {
        queue,
        currentIndex,

        current,
        hasNext,
        hasPrevious,

        addWork,
        removeWork,

        clear,
        next,
        previous,
    };
});
