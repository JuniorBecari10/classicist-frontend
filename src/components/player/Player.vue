<script setup lang="ts">
    import { ref } from "vue";
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";
    import { BACKEND_URL } from "@/util/consts.ts";
    
    import Current from "./Current.vue";
    import Progress from "./Progress.vue";
    import Controls from "./Controls.vue";

    const workTitle = ref({
        kind: "Symphony",
        number: 5,
        nickname: "Fate",
    } satisfies WorkTitle);

    const displayWork = ref({
        title: workTitle.value,
        tempos: [{form: null, name: "Allegro con brio"}],
        movementNumber: 1,
    } satisfies DisplayWork);

    const performers = ref<Performer[]>([
        {
            name: "Herbert von Karajan",
        },
    ]);

    const composer = { name: 'Ludwig van Beethoven' };

    const audio = ref<HTMLAudioElement | null>(null);

    function handlePlay() {
        audio.value?.play();
        document.title = `▶ ${formatDisplayWork(displayWork.value)} • ${formatDisplayAuthors(composer, performers.value)} ― Classicist`;
    }

    function handlePause() {
        audio.value?.pause();
        document.title = `${formatDisplayWork(displayWork.value)} • ${formatDisplayAuthors(composer, performers.value)} ― Classicist`;
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

    document.title = `${formatDisplayWork(displayWork.value)} • ${formatDisplayAuthors(composer, performers.value)} ― Classicist`;
</script>

<template>
    <audio ref="audio" :src="`${BACKEND_URL}/public/audio/symp5-1.mp3`"></audio>

    <div class="w-full p-5">
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
</template>
