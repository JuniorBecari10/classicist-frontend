<script setup lang="ts">
    import { ref, watch, computed, onMounted, onUnmounted } from "vue";
    import { getWork, useFetch } from "@/util/fetch.ts";
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";
    import { workToDisplayWork } from "@/util/convert.ts";
    import { BACKEND_URL } from "@/util/consts.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    import Current from "./Current.vue";
    import Progress from "./Progress.vue";
    import Controls from "./Controls.vue";

    const store = usePlayerStore();
    const audio = ref<HTMLAudioElement | null>(null);
    const fadeInterval = ref<number | null>(null);

    const rec = computed(() => store.currentRecording);
    const movement = computed(() => store.currentMovement);

    const { data: work, loading, error, reload } = useFetch(() => {
        if (!rec.value?.work_id) return null;
        return getWork(rec.value.work_id);
    });

    watch(() => rec.value?.work_id, (newId, oldId) => {
        if (newId && newId !== oldId) reload();
    });

    const displayWork = computed(() => {
        if (!work.value) return null;
        const movementNum = store.currentMovementIndex + 1;
        return workToDisplayWork(work.value, movementNum);
    });

    const composer = computed(() => work.value?.composer ?? null);
    const performers = computed(() => rec.value?.performers?.map(p => p.performer) ?? []);
    const imagePath = computed(() => rec.value?.photo_path ?? "");
    const workMovement = computed(() => {
        const w = work.value;
        const mov = movement.value;
        if (!w || !Array.isArray(w.movements) || !mov) return null;

        const idx = mov.movement_index;
        if (idx == null || idx < 0 || idx >= w.movements.length) return null;

        return w.movements[idx];
    });

    // --- Sheet path reactive sync ---
    const sheetPath = ref<string | null>(null);

    watch(
        () => [work.value, movement.value],
        ([newWork, newMovement]) => {
            if (!newWork || !Array.isArray(newWork.movements) || !newMovement) {
                sheetPath.value = null;
                return;
            }

            const idx = newMovement.movement_index;
            const mv = newWork.movements[idx];
            sheetPath.value = mv?.sheet?.path ?? null;
        },
        { immediate: true }
    );

    // --- Update document title ---
    watch(
        [rec, movement, work, () => store.isPlaying.value],
        () => {
            if (!rec.value || !movement.value || !work.value) {
                document.title = "Classicist";
                return;
            }

            const prefix = store.isPlaying.value ? "▶ " : "";
            const title = formatDisplayWork(displayWork.value);
            const authors = formatDisplayAuthors(composer.value, performers.value);

            document.title = `${prefix}${title} • ${authors} ― Classicist`;
        },
        { immediate: true }
    );

    // --- Audio controls ---
    function handlePlay() {
        if (!audio.value) return;
        audio.value.play();
        store.setPlaying(true);
    }

    function handlePause() {
        if (!audio.value) return;
        audio.value.pause();
        store.setPlaying(false);
    }

    function handleSeek(progress: number) {
        if (audio.value) audio.value.currentTime = progress;
    }

    function handleRewind() {
        if (audio.value) audio.value.currentTime = 0;
    }

    function handlePrevious() {
        crossfadeTo(() => {
            store.previous();
        });
    }

    function handleNext() {
        crossfadeTo(() => {
            store.next();
        });
    }

    function handleVolume(percent: number) {
        if (audio.value) audio.value.volume = percent;
    }

    function getAudio(): string {
        const path = movement.value?.audio_file?.path;
        return path ? `${BACKEND_URL}/public/audio/${path}` : "";
    }

    // --- Crossfade logic ---
    async function crossfadeTo(action: () => void) {
        if (!audio.value) {
            action();
            return;
        }

        const fadeTime = 500; // ms for crossfade out
        const steps = 20;
        const stepTime = fadeTime / steps;
        const initialVolume = audio.value.volume;

        if (fadeInterval.value) {
            clearInterval(fadeInterval.value);
            fadeInterval.value = null;
        }

        let step = 0;
        fadeInterval.value = window.setInterval(() => {
            if (!audio.value) return;
            step++;
            audio.value.volume = initialVolume * (1 - step / steps);
            if (step >= steps) {
                clearInterval(fadeInterval.value);
                fadeInterval.value = null;
                audio.value.volume = initialVolume;
                action(); // trigger next/previous
            }
        }, stepTime);
    }

    // --- Reactively reload audio on movement/recording change ---
    watch(
        () => [rec.value?.id, movement.value?.id],
        async ([newRecId, newMovId], [oldRecId, oldMovId]) => {
            if (!audio.value) return;

            const newSrc = getAudio();
            if (!newSrc) return;

            // Stop old playback, reload source
            audio.value.pause();
            audio.value.src = newSrc;
            audio.value.load();

            if (store.isPlaying.value) {
                try {
                    await audio.value.play();
                } catch (err) {
                    console.warn("Autoplay prevented:", err);
                }
            }
        },
        { immediate: true }
    );

    // --- Keep store in sync with actual audio events ---
    onMounted(() => {
        if (!audio.value) return;

        const onPlay = () => store.setPlaying(true);
        const onPause = () => store.setPlaying(false);

        // NEW: advance automatically when track ends
        const onEnded = () => {
            if (store.hasNext) {
                crossfadeTo(() => store.next());
            } else {
                store.setPlaying(false);
                audio.value!.currentTime = 0;
            }
        };

        audio.value.addEventListener("play", onPlay);
        audio.value.addEventListener("pause", onPause);
        audio.value.addEventListener("ended", onEnded);

        onUnmounted(() => {
            audio.value?.removeEventListener("play", onPlay);
            audio.value?.removeEventListener("pause", onPause);
            audio.value?.removeEventListener("ended", onEnded);
        });
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

                <Controls
                    @volume="handleVolume"
                    :lyrics="workMovement?.lyrics ?? null"
                    :sheet="sheetPath"
                />
            </div>
        </div>
    </div>
</template>
