<script setup lang="ts">
    import { ref, onMounted, onUnmounted, defineEmits } from "vue";
    import { BACKEND_URL } from "@/util/consts.ts";

    import ProgressBar from "../util/ProgressBar.vue";
    import Button from "../util/Button.vue";
    import Tooltip from "../util/Tooltip.vue";

    const volume = ref(100);
    const muted = ref(false);
    const dragging = ref(false);

    const progressBarRef = ref<HTMLElement | null>(null);
    const dropdown = ref<HTMLElement | null>(null);
    const dropdownl = ref<HTMLElement | null>(null);
    const lyricsBtn = ref<HTMLElement | null>(null);
    const sheetBtn = ref<HTMLElement | null>(null);

    const showSheet = ref(false);
    const showLyrics = ref(false);

    const props = defineProps<{
        lyrics: string[] | null;
        sheet: string;
    }>();

    const emit = defineEmits<{
        (e: "volume", percent: number): void;
    }>();

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
        const target = event.target as Node;

        const sheetEl = sheetBtn.value?.$el ?? sheetBtn.value;
        const lyricsEl = lyricsBtn.value?.$el ?? lyricsBtn.value;

        if (
            showSheet.value &&
            dropdown.value &&
            sheetEl &&
            !dropdown.value.contains(target) &&
            !sheetEl.contains(target)
        ) {
            showSheet.value = false;
        }

        if (
            showLyrics.value &&
            dropdownl.value &&
            lyricsEl &&
            !dropdownl.value.contains(target) &&
            !lyricsEl.contains(target)
        ) {
            showLyrics.value = false;
        }
    }

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener("click", handleClickOutside);
    });

    function lyrics() {
        showLyrics.value = !showLyrics.value;
    }

    function sheet() {
        showSheet.value = !showSheet.value;
    }

    function toggleMute() {
        if (!muted.value && volume.value === 0) {
            volume.value = 50;
            muted.value = false;
        } else {
            muted.value = !muted.value;
        }

        emit("volume", muted.value ? 0 : volume.value / 100);
    }

    function getSheet(): string {
        return `${BACKEND_URL}/public/sheet/${props.sheet}`;
    }
</script>

<template>
    <div class="w-[18%] h-full flex justify-center items-center p-4 ml-15">
        <div class="w-1/2 flex justify-end items-center">
            <Button ref="lyricsBtn" :action="lyrics" :disabled="props.lyrics === null">
                <img v-if="props.lyrics" src="@/assets/images/lyrics.png" />
                <img v-else src="@/assets/images/lyrics-dimmed.png" />
            </Button>

            <Button ref="sheetBtn" :action="sheet">
                <img src="@/assets/images/sheet.png" />
            </Button>

            <Button :action="toggleMute">
                <img v-show="muted || volume === 0" src="@/assets/images/mute.png" />
                <img v-show="!(muted || volume === 0)" src="@/assets/images/volume.png" />
            </Button>
        </div>

        <div
            v-show="false"
            class="w-5 h-1.5 rounded-full bg-[#18A0E4] absolute right-[14.25rem] bottom-[1.75rem]"
        ></div>

        <div class="w-full mr-3" ref="progressBarRef">
            <ProgressBar
                :percentage="volume"
                @seek="handleVolume"
                :disabled="muted"
            />
        </div>

        <div
            class="transition-opacity duration-100 ease-in"
            :style="{ opacity: dragging ? 1 : 0 }"
        >
            <Tooltip>{{ `${Math.round(volume)}%` }}</Tooltip>
        </div>
    </div>

    <!-- Sheet Modal -->
    <div
        ref="dropdown"
        v-if="showSheet"
        class="absolute left-1/2 bottom-[7.5rem] w-[50rem] h-[80vh] -translate-x-1/2 bg-fg-lighter shadow-xl z-50 rounded-lg p-4 overflow-auto"
    >
        <img :src="getSheet()" class="w-full filter invert rounded-md" />
    </div>

    <!-- Lyrics Modal -->
    <div
        ref="dropdownl"
        v-if="showLyrics"
        class="absolute left-1/2 bottom-[7.5rem] w-140 h-[80vh] -translate-x-1/2 bg-fg-lighter shadow-xl z-50 rounded-lg p-4 overflow-auto"
    >
        <p v-for="(lyric, i) in props.lyrics" :key="i" class="mb-3 text-2xl">
            {{ lyric }}
        </p>
    </div>
</template>
