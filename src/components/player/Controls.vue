<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from "vue";
    import ProgressBar from "./ProgressBar.vue";
    import Tooltip from "../util/Tooltip.vue";

    const volume = ref(100);
    const dragging = ref(false);

    const progressBarRef = ref<HTMLElement | null>(null);

    function handleVolume(percent: number) {
        volume.value = percent;
    }

    function handleMouseDown(e: MouseEvent) {
        const el = progressBarRef.value;
        if (el && el.contains(e.target as Node))
            dragging.value = true;
    }

    function handleMouseUp() {
        dragging.value = false;
    }

    onMounted(() => {
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
    });

    onUnmounted(() => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
    });
</script>

<template>
    <div class="w-1/4 h-full flex justify-center items-center p-4 pl-6">
        <div class="w-1/2 flex justify-end items-center mr-1">
            <button class="mr-3">
                <img src="@/assets/images/lyrics.png">
            </button>
            <button class="mr-3">
                <img src="@/assets/images/sheet.png">
            </button>
            <button>
                <img src="@/assets/images/volume.png">
            </button>
        </div>

        <div class="w-full mr-3" ref="progressBarRef">
            <ProgressBar :percentage="volume" @seek="handleVolume" />
        </div>

        <div v-show="dragging">
            <Tooltip>{{ `${Math.round(volume)}%` }}</Tooltip>
        </div>
    </div>
</template>
