<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from "vue";
    import { convertFormatTime } from "@/util/format.ts";
    import ProgressBar from "./ProgressBar.vue";

    const props = defineProps<{ length: number }>();

    const current = ref(0);
    const paused = ref(false);

    const percentage = computed(() => (current.value / props.length) * 100);
    const progressBarRef = ref<HTMLElement | null>(null);

    let interval: number | undefined;

    onMounted(() => {
        addInterval();
        window.addEventListener("keydown", handleKey);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
    });

    onUnmounted(() => {
        removeInterval();
        window.removeEventListener("keydown", handleKey);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
    });
    
    function handleMouseDown(e: MouseEvent) {
        const el = progressBarRef.value;
        if (el && el.contains(e.target as Node))
            paused.value = true;
    }

    function handleMouseUp() {
        paused.value = false;
    }

    function addInterval() {
        interval = window.setInterval(() => {
            if (current.value < props.length && !paused.value)
                current.value++;
        }, 1000);
    }

    function removeInterval() {
        if (interval)
            clearInterval(interval);
    }

    function handleSeek(percent: number) {
        current.value = Math.round((percent / 100) * props.length);
    }

    const rewind = () => (current.value = 0);
    const togglePause = () => (paused.value = !paused.value);

    function handleKey(e: KeyboardEvent) {
        switch (e.key) {
            case " ":
            case "Spacebar":
                e.preventDefault();
                togglePause();
                break;
            case "ArrowRight":
                current.value = Math.min(current.value + 5, props.length);
                break;
            case "ArrowLeft":
                current.value = Math.max(current.value - 5, 0);
                break;
        }
    }
</script>

<template>
    <div class="flex-1 h-full flex flex-col justify-center items-center mx-4">
        <div class="w-full h-1/2 flex justify-center">
            <div class="flex w-1/5 h-full justify-evenly items-center">
                <button
                    class="hover:bg-fg-lighter p-1.5 rounded-md"
                    @click="rewind">
                    <img class="relative left-0.5" src="@/assets/images/back.png" />
                </button>

                <button
                    class="hover:bg-fg-lighter p-1.5 rounded-md"
                    @click="togglePause">
                    <img v-show="paused" src="@/assets/images/play.png" />
                    <img v-show="!paused" src="@/assets/images/pause.png" />
                </button>

                <button class="hover:bg-fg-lighter p-1.5 rounded-md">
                    <img class="relative right-0.5" src="@/assets/images/forward.png" />
                </button>
            </div>
        </div>

        <div class="w-full h-1/3 flex items-center">
            <span class="text-fgray font-jetbrains text-sm">
                {{ convertFormatTime(current) }}
            </span>

        <div class="w-full mr-3" ref="progressBarRef">
            <ProgressBar :percentage="percentage" @seek="handleSeek" />
        </div>

            <span class="text-fgray font-jetbrains text-sm">
                {{ convertFormatTime(props.length) }}
            </span>
        </div>
    </div>
</template>
