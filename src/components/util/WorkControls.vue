<script setup lang="ts">
    import { computed } from "vue";

    import { useLibraryStore } from "@/stores/library.ts";
    import { usePlayerStore } from "@/stores/player.ts";
    
    import RecordingSelect from "../util/RecordingSelect.vue";

    const lib = useLibraryStore();
    const player = usePlayerStore();

    const selectedId = defineModel<number | null>({ default: null });
    const props = defineProps<{
        work: Work;
        recs: Recording[];
    }>();

    const playing = computed(() => {
        const currentRecId = player.currentRecording?.id ?? null;
        const isPlaying = (player.isPlaying as any)?.value ?? player.isPlaying ?? false;

        return currentRecId !== null && selectedId.value !== null && currentRecId === selectedId.value && Boolean(isPlaying);
    });
</script>

<template>
    <div class="ml-6 -mt-12 mb-6 flex items-center gap-4">
        <button
            class="p-3 bg-fg-lighter hover:bg-fg-more-lighter rounded-full transition-[background] duration-200 cursor-pointer"
            v-ripple
            @click="lib.addWork(props.work)">
            <img src="@/assets/images/bookmark.png" />
        </button>

        <RecordingSelect :recs="props.recs" v-model="selectedId" />
    </div>
</template>
