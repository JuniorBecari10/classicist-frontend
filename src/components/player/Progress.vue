<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted, defineEmits, watch } from "vue";
    import { convertFormatTime } from "@/util/format.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    import ProgressBar from "../util/ProgressBar.vue";
    import Button from "../util/Button.vue";

    const props = defineProps<{
        length: number,
        hasPrevious: boolean,
        hasNext: boolean,
    }>();
    
    const emit = defineEmits<{
        (e: "pause"): void;
        (e: "play"): void;
        (e: "seek", progress: number): void;
        (e: "rewind"): void;
        (e: "previous"): void;
        (e: "next"): void;
    }>();
    
    const store = usePlayerStore();

    const current = ref(0);
    const paused = computed(() => !store.isPlaying);

    const percentage = computed(() => (current.value / props.length) * 100);
    const progressBar = ref<HTMLElement | null>(null);

    const hasPrevious = computed(() => current.value >= 1 || props.hasPrevious);

    let interval: number | undefined;

    watch(
        () => [store.currentRecording?.id, store.currentMovement?.id],
        () => {
            current.value = 0;
        }
    );

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

    function next() {
        emit("next");
    }

    function togglePause() {
        if (paused.value)
            emit("play");
        else
            emit("pause");
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
                    <img v-show="hasPrevious" src="@/assets/images/back.png" />
                    <img v-show="!hasPrevious" src="@/assets/images/back-dimmed.png" />
                </Button>

                <Button :action="togglePause">
                    <img v-show="paused" src="@/assets/images/play.png" />
                    <img v-show="!paused" src="@/assets/images/pause.png" />
                </Button>

                <Button :action="next">
                    <img v-show="props.hasNext" src="@/assets/images/next.png" />
                    <img v-show="!props.hasNext" src="@/assets/images/next-dimmed.png" />
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
