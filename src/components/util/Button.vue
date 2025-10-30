<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
    action: () => void,
    noPadding?: boolean,
}>();
</script>

<template>
    <button
        class="flex items-center justify-center flex-shrink-0 rounded-md transition duration-200 filter hover:bg-fg-lighter cursor-pointer"
        :style="{
            padding: props.noPadding ? 0 : 'calc(0.25rem * 1.5)',
            lineHeight: 0,
            boxSizing: 'border-box',
        }"
        @click="props.action" v-ripple>
        <slot />
    </button>
</template>
