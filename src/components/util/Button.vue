<script setup lang="ts">
    import { defineProps } from "vue";

    const props = defineProps<{
        action: () => void;
        disabled?: boolean;
        noPadding?: boolean;
    }>();
</script>

<template>
    <button
        class="flex items-center justify-center flex-shrink-0 rounded-md transition duration-200 filter"
        :class="{
            'hover:bg-fg-lighter cursor-pointer': !props.disabled,
            'cursor-default': props.disabled,
        }"
        
        :style="{
            padding: props.noPadding ? 0 : 'calc(0.25rem * 1.5)',
            lineHeight: 0,
            boxSizing: 'border-box',
        }"

        @click="!props.disabled && props.action()"
        v-ripple="!props.disabled">
        <slot />
    </button>
</template>
