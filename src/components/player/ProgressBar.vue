<script setup lang="ts">
    import { ref } from "vue";

    const props = defineProps<{
        percentage: number;
        handleClick: (MouseEvent) => void;
    }>();

    const isDragging = ref(false);
    
    function handleMouseDown(e: MouseEvent) {
      isDragging.value = true;
      props.handleClick(e);

      const move = (ev: MouseEvent) => props.handleClick(ev);
      const up = () => {
          isDragging.value = false;
          window.removeEventListener('mousemove', move);
          window.removeEventListener('mouseup', up);
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    }
</script>

<template>
    <div class="w-full h-1.5 mx-3 relative group">
        <!-- background -->
        <div class="w-full h-full rounded-full bg-fgray"></div>
        
        <!-- progress bar -->
        <div
            class="h-full rounded-full bg-white relative bottom-1.5 transition-[width] duration-200"
            :style="{ width: `${props.percentage}%` }">
        </div>

        <!-- draggable circle -->
        <div
            class="absolute top-1/2 size-3 bg-white rounded-full origin-center transition-all duration-200
                   transform -translate-y-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            :class="{ 'scale-100 opacity-100': isDragging }"
            :style="{ left: `calc(${props.percentage}% - 0.375rem)` }">
        </div>

        <!-- hitbox for click, which is larger than the actual bar -->
        <div class="relative bottom-6 w-full h-5 cursor-pointer" @click="props.handleClick" @mousedown="handleMouseDown"></div>
    </div>
</template>
