<script setup lang="ts">
import { computed } from "vue";

const model = defineModel<boolean>({ default: false });
const props = defineProps<{ noMr?: boolean }>();

const buttonClass = computed(() =>
    model.value
        ? "bg-fg-more-lighter hover:bg-fg-even-more-lighter"
        : "bg-fg-lighter text-bg hover:bg-fg-more-lighter"
);

function handleClick() {
    model.value = !model.value;
}
</script>

<template>
    <button
        :class="`${buttonClass} px-5 h-9 flex items-center justify-center rounded-md transition-all duration-200 flex-shrink-0 cursor-pointer`"
        :style="{ marginRight: props.noMr ? 0 : 'calc(0.125rem * 4)' }"
        @click="handleClick" v-ripple>
        <slot />
    </button>
</template>
