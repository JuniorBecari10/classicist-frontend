<script setup lang="ts">
    import { ref, watchEffect } from "vue";
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";
    import { BACKEND_URL } from "@/util/consts.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    import Current from "./Current.vue";
    import Progress from "./Progress.vue";
    import Controls from "./Controls.vue";

    const audio = ref<HTMLAudioElement | null>(null);
    const store = usePlayerStore();

    const displayWork = ref<any>(null);
    const composer = ref<any>(null);
    const performers = ref<any[]>([]);

    const isPlaying = ref(false);

    watchEffect(() => {
        if (!store.hasNext || !displayWork.value) {
            document.title = "Classicist";
            return;
        }

        const prefix = isPlaying.value ? "▶ " : "";
        document.title = `${prefix}${formatDisplayWork(displayWork.value)} • ${formatDisplayAuthors(composer.value, performers.value)} ― Classicist`;
    });

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
        console.log("TODO!");
    }

    function handleVolume(percent: number) {
        if (audio.value)
            audio.value.volume = percent;
    }

    // ---

    function mp3Link(name: string): string {
        return `${BACKEND_URL}/public/audio/${name}`;
    }
</script>

<template>
    <div v-if="!store.hasNext" class="w-full mt-2 h-22 bg-fg-dimmed rounded-lg flex flex-col justify-center items-center">
        <h1 class="text-xl font-semibold">No pieces to play!</h1>
        <p>Select a movement to start listening.</p>
    </div>
    
    <div v-else>
        <audio ref="audio" :src=""></audio>

        <div class="w-full mt-2">
            <div class="w-full h-22 bg-fg rounded-lg flex items-center">
                <Current
                    :work="displayWork"
                    :composer="composer"
                    :performers="performers"
                     imageName="symp5.jpg"
                />
                <Progress
                    :length="433"
                    @pause="handlePause"
                    @play="handlePlay"
                    @seek="handleSeek"
                    @rewind="handleRewind"
                    @previous="handlePrevious"
                />

                <Controls @volume="handleVolume" />
            </div>
        </div>
    </div>
</template>
