<script setup lang="ts">
    import { ref, watchEffect, computed } from "vue";
    import { getWork, useFetch } from "@/util/fetch.ts";
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";
    import { workToDisplayWork } from "@/util/convert.ts";
    import { BACKEND_URL } from "@/util/consts.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    import Current from "./Current.vue";
    import Progress from "./Progress.vue";
    import Controls from "./Controls.vue";
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";

    const store = usePlayerStore();

    const composer = { name: 'Ludwig van Beethoven' };

    const composer = { name: 'Ludwig van Beethoven' };

    const audio = ref<HTMLAudioElement | null>(null);
    const isPlaying = ref(false);

    const rec = computed(() => store.currentRecording);
    const movement = computed(() => store.currentMovement);

    const { data: work, loading, error } = useFetch(() => {
        if (!rec.value?.work_id)
            return null;
        
        return getWork(rec.value.work_id);
    });

    const displayWork = computed(() => {
        if (!work.value)
            return null;
        
        const movementNum = store.currentMovementIndex + 1;
        return workToDisplayWork(work.value, movementNum);
    });

    const composer = computed(() => work.value?.composer ?? null);
    const performers = computed(() => rec.value?.performers?.map(p => p.performer) ?? []);
    const imagePath = computed(() => rec.value?.photo_path ?? "");

    watchEffect(() => {
        if (!rec.value || !movement.value || !work.value) {
            document.title = "Classicist";
            return;
        }

        const prefix = isPlaying.value ? "▶ " : "";
        const title = formatDisplayWork(displayWork.value);
        const authors = formatDisplayAuthors(composer.value, performers.value);

        document.title = `${prefix}${title} • ${authors} ― Classicist`;
    });

    // --- controls ---
    function handlePlay() {
        if (!audio.value)
            return;
        
        audio.value.play();
        isPlaying.value = true;
    }

    function handlePause() {
        if (!audio.value)
            return;
        
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
        audio.value.currentTime = 0;
    }

    function handleNext() {
        store.next();
        audio.value.currentTime = 0;
    }

    function handleVolume(percent: number) {
        if (audio.value)
            audio.value.volume = percent;
    }

    function getAudio(): string {
        const path = movement.value?.audio_file?.path;
        return path ? `${BACKEND_URL}/public/audio/${path}` : "";
    }

    // reload audio when recording or movement changes
    watchEffect(() => {
        if (audio.value && movement.value) {
            audio.value.src = getAudio();
            
            if (isPlaying.value)
                audio.value.play();
        }
    });
</script>

<template>
    <div
        v-if="!rec || !movement"
        class="w-full mt-2 h-22 bg-fg-dimmed flex flex-col justify-center items-center rounded-lg">
        <h1 class="text-xl font-semibold">No recordings to play!</h1>
        <p class="text-fgray">Select a movement to start listening.</p>
    </div>

    <div
        v-else-if="loading || !work"
        class="w-full mt-2 h-22 bg-fg-dimmed rounded-lg flex flex-col justify-center items-center animate-pulse">
        <h1 class="text-xl font-semibold">Loading work...</h1>
        <p>Please wait a moment.</p>
    </div>

    <div v-else>
        <audio ref="audio" :src="getAudio()" />

        <div class="w-full mt-2">
            <div class="w-full h-22 bg-fg rounded-lg flex items-center">
                <Current
                    :work="displayWork"
                    :composer="composer"
                    :performers="performers"
                    :imageName="imagePath"
                />

                <Progress
                    :length="movement?.audio_file?.duration ?? 0"
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
