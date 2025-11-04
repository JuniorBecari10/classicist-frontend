import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Work, Movement } from "@/model/work";

export const usePlayerStore = defineStore("player", () => {
    const queue = ref<Work[]>([]);
    const currentWorkIndex = ref<number>(-1); // which work in queue
    const currentMovementIndex = ref<number>(-1); // which movement in current work
    const recordingIndex = ref<number>(-1); // which recording in current movement

    // --- Computed values ---

    const currentWork = computed(() =>
        currentWorkIndex.value >= 0 && currentWorkIndex.value < queue.value.length
            ? queue.value[currentWorkIndex.value]
            : null
    );

    const currentMovement = computed<Movement | null>(() => {
        const work = currentWork.value;
        if (!work) return null;

        const movements = work.movements;
        if (
            currentMovementIndex.value < 0 ||
            currentMovementIndex.value >= movements.length
        )
            return null;

        return movements[currentMovementIndex.value];
    });

    const current = computed(() => ({
        work: currentWork.value,
        movement: currentMovement.value,
        recordingIndex: recordingIndex.value,
    }));

    // --- Recording helpers (optional multiple recordings per movement) ---
    const recordings = computed(() => {
        const movement = currentMovement.value as any;
        return movement?.recordings ?? [];
    });

    const currentRecording = computed(() => {
        if (
            recordingIndex.value >= 0 &&
            recordingIndex.value < recordings.value.length
        )
            return recordings.value[recordingIndex.value];
        return null;
    });

    const hasNextRecording = computed(
        () => recordingIndex.value < recordings.value.length - 1
    );
    const hasPreviousRecording = computed(() => recordingIndex.value > 0);

    // --- Movement / Work navigation ---

    const hasNextMovement = computed(() =>
        currentWork.value
            ? currentMovementIndex.value < currentWork.value.movements.length - 1
            : false
    );
    const hasPreviousMovement = computed(
        () => currentMovementIndex.value > 0
    );

    const hasNextWork = computed(
        () => currentWorkIndex.value < queue.value.length - 1
    );
    const hasPreviousWork = computed(() => currentWorkIndex.value > 0);

    // unified getters for UI (include movement + work transitions)
    const hasNext = computed(
        () =>
            hasNextRecording.value ||
            hasNextMovement.value ||
            hasNextWork.value
    );

    const hasPrevious = computed(
        () =>
            hasPreviousRecording.value ||
            hasPreviousMovement.value ||
            hasPreviousWork.value
    );

    // --- Core functions ---

    function addWork(work: Work) {
        queue.value.push(work);

        // Initialize if nothing is set
        if (currentWorkIndex.value === -1) {
            currentWorkIndex.value = 0;
            currentMovementIndex.value = 0;
            recordingIndex.value = 0;
        }
    }

    function removeWork(index: number) {
        if (index < 0 || index >= queue.value.length) return;

        queue.value.splice(index, 1);

        if (index < currentWorkIndex.value) currentWorkIndex.value--;

        if (queue.value.length === 0) {
            currentWorkIndex.value = -1;
            currentMovementIndex.value = -1;
            recordingIndex.value = -1;
        } else if (currentWorkIndex.value >= queue.value.length) {
            currentWorkIndex.value = queue.value.length - 1;
            currentMovementIndex.value = 0;
            recordingIndex.value = 0;
        }
    }

    function clear() {
        queue.value = [];
        currentWorkIndex.value = -1;
        currentMovementIndex.value = -1;
        recordingIndex.value = -1;
    }

    // --- Navigation ---

    function next() {
        // Next recording
        if (hasNextRecording.value) {
            recordingIndex.value++;
        }
        // Next movement
        else if (hasNextMovement.value) {
            currentMovementIndex.value++;
            recordingIndex.value = 0;
        }
        // Next work
        else if (hasNextWork.value) {
            currentWorkIndex.value++;
            currentMovementIndex.value = 0;
            recordingIndex.value = 0;
        }
    }

    function previous() {
        // Previous recording
        if (hasPreviousRecording.value) {
            recordingIndex.value--;
        }
        // Previous movement
        else if (hasPreviousMovement.value) {
            currentMovementIndex.value--;
            const prevMov = currentWork.value?.movements[currentMovementIndex.value];
            recordingIndex.value = (prevMov?.recordings?.length ?? 1) - 1;
        }
        // Previous work
        else if (hasPreviousWork.value) {
            currentWorkIndex.value--;
            const prevWork = queue.value[currentWorkIndex.value];
            currentMovementIndex.value = prevWork.movements.length - 1;
            const lastMov = prevWork.movements[currentMovementIndex.value] as any;
            recordingIndex.value = (lastMov?.recordings?.length ?? 1) - 1;
        }
    }

    return {
        queue,
        currentWorkIndex,
        currentMovementIndex,
        recordingIndex,

        currentWork,
        currentMovement,
        currentRecording,
        recordings,
        current,

        hasNext,
        hasPrevious,

        addWork,
        removeWork,
        clear,
        next,
        previous,
    };
});
