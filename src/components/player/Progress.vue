<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted, defineEmits } from "vue";
    import { convertFormatTime } from "@/util/format.ts";
    import ProgressBar from "../util/ProgressBar.vue";
    import Button from "../util/Button.vue";

    const props = defineProps<{
        length: number,
    }>();
    
    const emit = defineEmits<{
        (e: "pause"): void;
        (e: "play"): void;
        (e: "seek", progress: number): void;
        (e: "rewind"): void;
        (e: "previous"): void;
    }>();

    const current = ref(0);
    const paused = ref(true);

    const percentage = computed(() => (current.value / props.length) * 100);
    const progressBar = ref<HTMLElement | null>(null);

    let interval: number | undefined;

    onMounted(() => {
        addInterval();
        window.addEventListener("keydown", handleKey);
    });

    onUnmounted(() => {
        removeInterval();
        window.removeEventListener("keydown", handleKey);
    });

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
        current.value = Math.floor((percent / 100) * props.length);
        emit("seek", current.value);
    }

    function rewind() {
        const oldCurrent = current.value;
        current.value = 0;

        if (oldCurrent <= 1)
            emit("previous");
        else
            emit("rewind");
    }

    function forward() {
        
    }

    function togglePause() {
        paused.value = !paused.value;

        if (paused.value)
            emit("pause");
        else
            emit("play");
    }

    function handleKey(e: KeyboardEvent) {
        // Prevent triggering if a text field or textarea is focused
        const active = document.activeElement;
        if (
            active &&
            (active.tagName === "INPUT" ||
             active.tagName === "TEXTAREA" ||
             (active as HTMLElement).isContentEditable)
        ) {
            return;
        }

        switch (e.key) {
            case " ":
            case "Spacebar":
                e.preventDefault();
                togglePause();
                break;

            case "ArrowRight":
                current.value = Math.min(current.value + 5, props.length);
                emit("seek", current.value);
                break;

            case "ArrowLeft":
                current.value = Math.max(current.value - 5, 0);
                emit("seek", current.value);
                break;
        }
    }
</script>

<template>
    <div class="flex-1 h-full flex flex-col justify-center items-center mx-4">
        <div class="w-full h-1/2 flex justify-center">
            <div class="flex w-1/5 h-full justify-evenly items-center">
                <Button :action="rewind">
                    <img src="@/assets/images/back.png" />
                </Button>

                <Button :action="togglePause">
                    <img v-show="paused" src="@/assets/images/play.png" />
                    <img v-show="!paused" src="@/assets/images/pause.png" />
                </Button>

                <Button :action="forward">
                    <img src="@/assets/images/forward.png" />
                </Button>
            </div>
        </div>

        <div class="w-full h-1/3 flex items-center">
            <span class="text-fgray !font-jetbrains text-sm">
                {{ convertFormatTime(current) }}
            </span>

            <div class="w-full mr-6" ref="progressBar">
                <ProgressBar :percentage="percentage" @seek="handleSeek" />
            </div>

            <span class="text-fgray !font-jetbrains text-sm">
                {{ convertFormatTime(props.length) }}
            </span>
        </div>
    </div>
</template>
