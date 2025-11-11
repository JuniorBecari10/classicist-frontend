<script setup lang="ts">
    import { ref, onMounted, onUnmounted, onBeforeUnmount, defineEmits } from "vue";
    import { BACKEND_URL } from "@/util/consts.ts";
    
    import ProgressBar from "../util/ProgressBar.vue";
    import Button from "../util/Button.vue";
    import Tooltip from "../util/Tooltip.vue";

    const volume = ref(100);
    const muted = ref(false);
    const dragging = ref(false);

    const progressBarRef = ref<HTMLElement | null>(null);
    const dropdown = ref<HTMLElement | null>(null);

    const showSheet = ref(false);

    const props = defineProps<{
        lyrics: string[] | null;
        sheet: string;
    }>();

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

    function handleClickOutside(event: MouseEvent) {
        const el = dropdown.value;
        if (showSheet.value && el && !el.contains(event.target as Node)) {
            showSheet.value = false;
        }
    }

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", handleClickOutside);
    });

    function lyrics() {

    }

    function sheet() {
        showSheet.value = !showSheet.value;
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

    function getSheet(): string {
        return `${BACKEND_URL}/public/sheet/${props.sheet}`;
    }
</script>

<template>
    <div class="w-[18%] h-full flex justify-center items-center p-4 ml-15">
        <div class="w-1/2 flex justify-end items-center">
            <Button :action="lyrics" :disabled="props.lyrics === null">
                <img v-if="props.lyrics" src="@/assets/images/lyrics.png">
                <img src="@/assets/images/lyrics-dimmed.png">
            </Button>
            <Button :action="sheet" @click.stop>
                <img src="@/assets/images/sheet.png">
            </Button>
            <Button :action="toggleMute">
                <img v-show="muted || volume === 0" src="@/assets/images/mute.png">
                <img v-show="!(muted || volume === 0)" src="@/assets/images/volume.png">
            </Button>
        </div>

        <div v-show="showSheet" class="w-5 h-1.5 rounded-full bg-[#18A0E4] absolute right-57 bottom-7" />

        <div class="w-full mr-3" ref="progressBarRef">
            <ProgressBar :percentage="volume" @seek="handleVolume" :disabled="muted" />
        </div>

        <div class="transition-[opacity] duration-100 ease-in" :style="{ opacity: dragging ? 1 : 0}">
            <Tooltip>{{ `${Math.round(volume)}%` }}</Tooltip>
        </div>
    </div>

    {{console.log(props.sheet) }}

    <div ref="dropdown" v-if="showSheet" class="absolute left-1/2 bottom-30 w-200 h-[80vh] -translate-x-1/2 bg-fg-lighter shadow-xl z-50 rounded-lg p-4 overflow-auto">
        <img :src="getSheet()" class="w-full filter invert rounded-md" />
    </div>
</template>
