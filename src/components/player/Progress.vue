<script setup lang="ts">
    import { convertFormatTime } from "@/util/format.ts";
    const props = defineProps<{
        length: number; // in seconds
    }>();
</script>

<template>
    <span class="font-jetbrains">{{ convertFormatTime(props.length) }}</span>
</template>
