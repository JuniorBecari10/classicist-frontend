<script setup lang="ts">
    import { convertFormatTime } from "@/util/format.ts";
    import { ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
    import ProgressBar from "./ProgressBar.vue";

    const props = defineProps<{
        length: number; // in seconds
    }>();

    const current = ref(0);
    const paused = ref(false);

    const percentage = computed(() => (current.value / props.length) * 100);

    let interval: number | undefined;

    onMounted(addInterval);
    onUnmounted(removeInterval);

    function addInterval() {
         interval = window.setInterval(() => {
             if (current.value < props.length && !paused.value) {
                 current.value++;
             }
         }, 1000);
    }

    function removeInterval() {
        if (interval)
            clearInterval(interval);
    }
    
    function handleClick(e: MouseEvent) {
        const bar = e.currentTarget as HTMLElement;
        const rect = bar.getBoundingClientRect();

        const x = e.clientX - rect.left; // click position
        const width = rect.width;

        const clickedPercentage = (x / width) * 100;
        const newTime = (clickedPercentage / 100) * props.length;

        current.value = Math.round(newTime);
    }

    const togglePause = () => paused.value = !paused.value;
</script>

<template>
    <div class="flex-1 h-full flex flex-col justify-center items-center mx-4">
        <div class="w-full h-1/2 flex justify-center">
            <div class="flex w-1/5 h-full justify-evenly items-center">
                <button class="hover:bg-fg-lighter p-1.5 transition-[background] duration-200 rounded-md">
                    <img src="@/assets/images/back.png">
                </button>
                <button class="hover:bg-fg-lighter p-1.5 transition-[background] duration-200 rounded-md" @click="togglePause">
                    <img :src="
                        paused
                        ? '@/assets/images/play.png'
                        : '@/assets/images/pause.png'
                    ">
                </button>
                <button class="hover:bg-fg-lighter p-1.5 transition-[background] duration-200 rounded-md">
                    <img src="@/assets/images/forward.png">
                </button>
            </div>
        </div>
        <div class="w-full h-1/3 flex items-center">
            <span class="text-fgray font-jetbrains text-sm">{{ convertFormatTime(current) }}</span>
            <ProgressBar :percentage="percentage" :handleClick="handleClick" /> 
            <span class="text-fgray font-jetbrains text-sm">{{ convertFormatTime(props.length) }}</span>
        </div>
    </div>
</template>
