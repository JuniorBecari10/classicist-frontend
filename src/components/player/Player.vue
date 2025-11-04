<script setup lang="ts">
    import { ref, watchEffect, computed } from "vue";
    import { getRecsForWork, useFetch } from "@/util/fetch.ts";
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";
    import { workToDisplayWork } from "@/util/convert.ts";
    import { BACKEND_URL } from "@/util/consts.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    import Current from "./Current.vue";
    import Progress from "./Progress.vue";
    import Controls from "./Controls.vue";

    const audio = ref<HTMLAudioElement | null>(null);
    const store = usePlayerStore();

    const { data: recs, loading: loadingRecs, error: errorRecs } =
        useFetch(() => getRecsForWork(props.workId));
    
    const recData = computed(() => {
        if (!recs.value || recs.value.length === 0)
            return null;

        const recIndex = store.currentWorkIndex;
        const rec = recs.value[recIndex];

        return {
            perfs: rec.performers?.map(p => p.performer) ?? [],
            movs: rec.movements ?? [],
            imagePath: rec.photo_path ?? null,
        };
    });

    const movementNum = computed(() => store.currentMovementIndex + 1);
    const displayWork = computed(() => workToDisplayWork(store.currentWork, movementNum.value));
    const composer = computed(() => store.currentWork.composer);

    const isPlaying = ref(false);

    // --- document.title reactive update ---
    watchEffect(() => {
        if (!store.hasNext || !displayWork.value) {
            document.title = "Classicist";
            return;
        }

        const prefix = isPlaying.value ? "▶ " : "";
        const performers = recData.value?.perfs ?? [];
        document.title = `${prefix}${formatDisplayWork(displayWork.value)} • ${formatDisplayAuthors(composer.value, performers)} ― Classicist`;
    });

    // --- controls ---
    function handlePlay() {
        if (!audio.value) return;
        audio.value.play();
        isPlaying.value = true;
    }

    function handlePause() {
        if (!audio.value) return;
        audio.value.pause();
        isPlaying.value = false;
    }

    function handleSeek(progress: number) {
        if (audio.value)
            audio.value.currentTime = progress;
    }

    function handleRewind() {
        if (audio.value)
            audio.value.currentTime = 0;
    }

    function handlePrevious() {
        store.previous();
    }

    function handleNext() {
        store.next();
    }

    function handleVolume(percent: number) {
        if (audio.value)
            audio.value.volume = percent;
    }

    function getAudio(name: string): string {
        return `${BACKEND_URL}/public/audio/${name}`;
    }
</script>

<template>
    <div v-if="!store.hasNext" class="w-full mt-2 h-22 bg-fg-dimmed rounded-lg flex flex-col justify-center items-center">
        <h1 class="text-xl font-semibold">No pieces to play!</h1>
        <p>Select a movement to start listening.</p>
    </div>
    
    <div v-else>
        <audio ref="audio" :src="getAudio(store.current.sheet.path)" />

        <div class="w-full mt-2">
            <div class="w-full h-22 bg-fg rounded-lg flex items-center">
                <Current
                    :work="displayWork"
                    :composer="composer"
                    :performers="recData?.perfs ?? []"
                    :imageName="recData?.imagePath ?? ''"
                />
                <Progress
                    :length="433"
                    :hasPrevious="store.hasPrevious"
                    :hasNext="store.hasNext"

                    @pause="handlePause"
                    @play="handlePlay"
                    @seek="handleSeek"
                    @rewind="handleRewind"
                    @previous="handlePrevious"
                    @next="handleNext"
                />
                <Controls @volume="handleVolume" />
            </div>
        </div>
    </div>
</template>
