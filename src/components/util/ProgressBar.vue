<script setup lang="ts">
    import { ref } from "vue";

    const emit = defineEmits<{
        (e: "seek", percentage: number): void;
    }>();

    const props = defineProps<{
        percentage: number;
    }>();

    const dragging = ref(false);

    function getPercentageFromEvent(e: MouseEvent, bar: HTMLElement) {
        const rect = bar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        const width = rect.width;
        const percent = Math.min(Math.max((x / width) * 100, 0), 100);
        
        return percent;
    }

    function handleMouseDown(e: MouseEvent) {
        const bar = e.currentTarget as HTMLElement;

        dragging.value = true;
        emit("seek", getPercentageFromEvent(e, bar));

        const move = (ev: MouseEvent) => emit("seek", getPercentageFromEvent(ev, bar));
        const up = () => {
            dragging.value = false;
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
    }
</script>

<template>
    <div class="w-full h-1.5 mx-3 relative group">
        <!-- background -->
        <div class="w-full h-full rounded-full bg-fgray"></div>

        <!-- progress bar -->
        <div
            class="h-full rounded-full bg-white relative bottom-1.5"
            :style="{
                width: `${props.percentage}%`,
            }">
        </div>

        <!-- draggable circle -->
        <div
            class="absolute top-1/2 size-3 bg-white rounded-full origin-center transition-[scale,opacity] duration-200
                   transform -translate-y-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            :class="{ 'scale-100 opacity-100': dragging }"
            :style="{ left: `calc(${props.percentage}% - 0.375rem)` }">
        </div>

        <!-- hitbox for click -->
        <div
            class="relative bottom-6 w-full h-5 cursor-pointer"
            @click="(e) => emit('seek', getPercentageFromEvent(e, e.currentTarget as HTMLElement))"
            @mousedown="handleMouseDown">
        </div>
    </div>
</template>
