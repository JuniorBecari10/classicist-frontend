<script setup lang="ts">
    import { defineProps } from "vue";
    const props = defineProps<{
        action: () => void,
    }>();
</script>

<template>
    <button
        class="hover:bg-fg-lighter p-1.5 rounded-md transition-[background] duration-200 flex-shrink-0"
        @click="props.action" v-ripple>
        <slot />
    </button>
</template>
