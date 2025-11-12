<script setup lang="ts">
    import { computed } from "vue";
    import RecordingSelect from "../util/RecordingSelect.vue";
    import { useLibraryStore } from "@/stores/library.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    const lib = useLibraryStore();
    const player = usePlayerStore();

    const selectedId = defineModel<number | null>({ default: null });
    const props = defineProps<{
        work: Work;
        recs: Recording[];
    }>();

    // playing is true when the player's current recording matches selectedId and playback is active
    const playing = computed(() => {
        // player.currentRecording might be null, player.isPlaying may be a ref
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
            @click="lib.addWork(props.work)"
        >
            <img src="@/assets/images/bookmark.png" />
        </button>

        <RecordingSelect :recs="props.recs" v-model="selectedId" />
    </div>
</template>

<style scoped>
    .play:before {
        content: "";
        position: absolute;
        right: 15px;
        height: 0;
        border-style: solid;
        border-width: 1em 0 1em 1.75em;
        border-color: transparent transparent transparent white; /* icon color */
        transition: .218s ease;
    }
    
    .pause:before {
        height: 2em;
        border-width: 0 0 0 1.5em;
        right: 18.5px;
    }
    
    .play:after {
        content: "";
        position: absolute;
        background: inherit;
        width: 0;
        height: 2em;
        top: 1.3em;
        left: 2.05em;
        transition: .218s linear;
    }
    
    .pause:after {
        width: .5em;
    }
</style>
