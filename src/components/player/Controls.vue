<script setup lang="ts">
    import { ref, onMounted, onUnmounted, defineEmits } from "vue";
    import ProgressBar from "../util/ProgressBar.vue";
    import Button from "../util/Button.vue";
    import Tooltip from "../util/Tooltip.vue";

    const volume = ref(100);
    const muted = ref(false);
    const dragging = ref(false);

    const progressBarRef = ref<HTMLElement | null>(null);

    const emit = defineEmits<{
        (e: "volume", percent: number): void;
    }>()

    function handleVolume(percent: number) {
        volume.value = percent;
        emit("volume", percent / 100);
    }

    function handleMouseDown(e: MouseEvent) {
        const el = progressBarRef.value;
        
        if (el && el.contains(e.target as Node)) {
            dragging.value = true;
            muted.value = false;
        }
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

    function lyrics() {
        
    }

    function sheet() {
        
    }

    function toggleMute() {
        // Remove "bug" of unmutting and still not hearing any sound because 'volume' is 0,
        // and also of double unmutting, because the first click actually unmutes it, and the second one sets the volume to 50.
        if (!muted.value && volume.value === 0) {
            volume.value = 50;
            muted.value = false;
        }

        else muted.value = !muted.value;

        emit("volume",
            muted.value
                ? 0
                : volume.value / 100);
    }
</script>

<template>
    <div class="w-[18%] h-full flex justify-center items-center p-4 ml-15">
        <div class="w-1/2 flex justify-end items-center">
            <Button :action="lyrics">
                <img src="@/assets/images/lyrics.png">
            </Button>
            <Button :action="sheet">
                <img src="@/assets/images/sheet.png">
            </Button>
            <Button :action="toggleMute">
                <img v-show="muted || volume === 0" src="@/assets/images/mute.png">
                <img v-show="!(muted || volume === 0)" src="@/assets/images/volume.png">
            </Button>
        </div>

        <div class="w-full mr-3" ref="progressBarRef">
            <ProgressBar :percentage="volume" @seek="handleVolume" :disabled="muted" />
        </div>

        <div v-show="dragging">
            <Tooltip>{{ `${Math.round(volume)}%` }}</Tooltip>
        </div>
    </div>
</template>
