<script setup lang="ts">
    import type { WorkTitle } from "@/model/work.ts";
    import { formatTitleDisplay } from "@/util/format.ts";
    
    const props = defineProps<{
        work: WorkTitle;
        composer: string;
    }>();
</script>

<template>
    <button class="
            hover:bg-fg-more-lighter transition-[background] duration-200 flex-1 h-15 rounded-md cursor-pointer text-left w-[96%] p-3 m-2
            flex flex-col justify-center items-start" v-ripple>
        <p class="text-[1.15rem] font-semibold font-fredoka">{{ formatTitleDisplay(props.work) }}</p>
        <p class="text-sm text-fgray font-fredoka">{{ props.composer }}</p>
    </button>
</template>
