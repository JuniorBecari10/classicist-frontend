import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Recording, RecordedMovement } from "@/model/recording";

export const usePlayerStore = defineStore("player", () => {
    // --- State ---
    const queue = ref<Recording[]>([]);
    const currentRecordingIndex = ref(-1);
    const currentMovementIndex = ref(-1);

    const isPlaying = ref(false);

    // --- Computed ---
    const currentRecording = computed<Recording | null>(() =>
        currentRecordingIndex.value >= 0 && currentRecordingIndex.value < queue.value.length
            ? queue.value[currentRecordingIndex.value]
            : null
    );

    const currentMovement = computed<RecordedMovement | null>(() => {
        const rec = currentRecording.value;
        if (!rec) return null;

        if (
            currentMovementIndex.value < 0 ||
            currentMovementIndex.value >= rec.movements.length
        )
            return null;

        return rec.movements[currentMovementIndex.value];
    });

    const hasNextMovement = computed(() =>
        currentRecording.value
            ? currentMovementIndex.value < currentRecording.value.movements.length - 1
            : false
    );

    const hasPreviousMovement = computed(() =>
        currentMovementIndex.value > 0
    );

    const hasNextRecording = computed(() =>
        currentRecordingIndex.value < queue.value.length - 1
    );

    const hasPreviousRecording = computed(() =>
        currentRecordingIndex.value > 0
    );

    // Unified helpers for UI
    const hasNext = computed(() =>
        hasNextMovement.value || hasNextRecording.value
    );

    const hasPrevious = computed(() =>
        hasPreviousMovement.value || hasPreviousRecording.value
    );

    // --- Core Functions ---

    function addRecording(rec: Recording) {
        queue.value.push(rec);
        if (currentRecordingIndex.value === -1) {
            currentRecordingIndex.value = 0;
            currentMovementIndex.value = 0;
        }
    }

    function removeRecording(index: number) {
        if (index < 0 || index >= queue.value.length) return;
        queue.value.splice(index, 1);

        if (index < currentRecordingIndex.value)
            currentRecordingIndex.value--;

        if (queue.value.length === 0) {
            currentRecordingIndex.value = -1;
            currentMovementIndex.value = -1;
        } else if (currentRecordingIndex.value >= queue.value.length) {
            currentRecordingIndex.value = queue.value.length - 1;
            currentMovementIndex.value = 0;
        }
    }

    function clear() {
        queue.value = [];
        currentRecordingIndex.value = -1;
        currentMovementIndex.value = -1;
    }

    // --- Navigation ---

    function next() {
        if (hasNextMovement.value) currentMovementIndex.value++;
        else if (hasNextRecording.value) {
            currentRecordingIndex.value++;
            currentMovementIndex.value = 0;
        }
    }

    function previous() {
        if (hasPreviousMovement.value)
            currentMovementIndex.value--;
        
        else if (hasPreviousRecording.value) {
            currentRecordingIndex.value--;

            const prevRec = queue.value[currentRecordingIndex.value];
            currentMovementIndex.value = prevRec.movements.length - 1;
        }
    }

    function togglePlaying() {
        isPlaying.value = !isPlaying.value;
    }

    function setPlaying(p: boolean) {
        isPlaying.value = p;
    }

    function setMovIndex(index: number) {
        currentMovementIndex.value = index;
    }

    return {
        queue,
        isPlaying,

        currentRecordingIndex,
        currentMovementIndex,
        currentRecording,
        currentMovement,
        hasNext,
        hasPrevious,

        addRecording,
        removeRecording,
        clear,
        next,
        previous,

        togglePlaying,
        setPlaying,
        setMovIndex,
    };
});
