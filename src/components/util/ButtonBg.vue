<script setup lang="ts">
    import { defineProps } from "vue";
    const props = defineProps<{
        action: () => void,
    }>();
</script>

<template>
    <button
        class="
            bg-fg-lighter hover:bg-fg-more-lighter size-10 flex items-center justify-center
            rounded-md transition-[background] duration-200 flex-shrink-0 mr-2 cursor-pointer"
        @click="props.action" v-ripple>
        <slot />
    </button>
</template>
