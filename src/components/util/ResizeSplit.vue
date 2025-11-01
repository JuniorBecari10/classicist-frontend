<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const leftWidth = ref(28); // percentage width of the left panel
const container = ref<HTMLElement | null>(null);
const isDragging = ref(false);

function onMouseDown(e: MouseEvent) {
    e.preventDefault();
    isDragging.value = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
}

function onMouseMove(e: MouseEvent) {
    if (!isDragging.value || !container.value) return;
    const rect = container.value.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    leftWidth.value = Math.min(Math.max((offsetX / rect.width) * 100, 10), 90); // clamp between 10–90%
}

function onMouseUp() {
    if (isDragging.value) {
        isDragging.value = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    }
}

onMounted(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
});
</script>

<template>
    <div ref="container" class="flex flex-1 w-full h-full overflow-hidden">
        <!-- Left panel -->
        <div
            class="flex-shrink-0 min-w-1/6 max-w-2/3"
            :style="{ width: `${leftWidth}%` }"
        >
            <slot name="left" />
        </div>

        <!-- Draggable divider -->
        <div
            class="w-2 hover:bg-fg-light transition-colors duration-150 cursor-col-resize"
            @mousedown="onMouseDown"
        ></div>

        <!-- Right panel -->
        <div class="flex-1">
            <slot name="right" />
        </div>
    </div>
</template>
