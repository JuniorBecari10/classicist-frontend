import { defineStore } from "pinia";
import { ref } from "vue";
import type { Work, Composer } from "@/model/work";
import type { Performer } from "@/model/recording";

export type LibraryItem =
    | { type: "work"; value: Work }
    | { type: "composer"; value: Composer }
    | { type: "performer"; value: Performer };

export const useLibraryStore = defineStore("library", () => {
    const list = ref<LibraryItem[]>([]);

    function addItem(item: LibraryItem) {
        const exists = list.value.some(q =>
            q.type === item.type && (q.value as any).id === (item.value as any).id);

        if (!exists)
            list.value.push(item);
    }

    function addWork(work: Work) {
        addItem({ type: "work", value: work });
    }

    function addComposer(composer: Composer) {
        addItem({ type: "composer", value: composer });
    }

    function addPerformer(performer: Performer) {
        addItem({ type: "performer", value: performer });
    }

    function removeItem(index: number) {
        if (index < 0 || index >= list.value.length)
            return;

        list.value.splice(index, 1);
    }

    function clear() {
        list.value = [];
    }

    return {
        list,

        addWork,
        addComposer,
        addPerformer,

        removeItem,
        clear,
    };
});
