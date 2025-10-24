<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";

// Props for customization
const props = defineProps<{
    offsetX?: number;
    offsetY?: number;
}>();

const offsetX = props.offsetX ?? 20;
const offsetY = props.offsetY ?? 10;

const mouseX = ref(0);
const mouseY = ref(0);
const container = ref<HTMLElement | null>(null);

function handleMouseMove(e: MouseEvent) {
    nextTick(() => {
        if (!container.value) return;

        const rect = container.value.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // clamp x and y to screen bounds
        const clampedX = Math.min(
            Math.max(e.clientX + offsetX, 0),
            window.innerWidth - width
        );

        const clampedY = Math.min(
            Math.max(e.clientY + offsetY, 0),
            window.innerHeight - height
        );

        mouseX.value = clampedX;
        mouseY.value = clampedY;
    });
}

onMounted(() => {
    window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
    <div
        ref="container"
        class="fixed pointer-events-none z-50 p-2 bg-fg-lighter rounded-md"
        :style="{
            left: `${mouseX}px`,
            top: `${mouseY}px`,
            transition: 'left 0.05s linear, top 0.05s linear',
        }">

        <slot />
    </div>
</template>
