<script setup lang="ts">
    import type { LibraryItem } from "@/stores/library.ts";
    import { formatTitleDisplay } from "@/util/format.ts";
    
    const props = defineProps<{
        item: LibraryItem;
    }>();
</script>

<template>
    <button class="
            hover:bg-fg-more-lighter transition-[background] duration-200 flex-1 h-15 rounded-md cursor-pointer text-left w-[96%] p-3 ml-2
            flex flex-col justify-center items-start" v-ripple>
        <div v-if="props.item.type === 'work'">
            <p class="text-[1.15rem] font-semibold font-fredoka">{{ formatTitleDisplay(props.item.value.title) }}</p>
            <p class="text-sm text-fgray font-fredoka">Work • {{ props.item.value.composer.name }}</p>
        </div>

        <div v-else-if="props.item.type === 'composer'">
            <p class="text-[1.15rem] font-semibold font-fredoka">{{ props.item.value.name }}</p>
            <p class="text-sm text-fgray font-fredoka">Composer</p>
        </div>

        <div v-else-if="props.item.type === 'performer'">
            <p class="text-[1.15rem] font-semibold font-fredoka">{{ props.item.value.name }}</p>
            <p class="text-sm text-fgray font-fredoka">Performer</p>
        </div>

        <div v-else>
            what kind of thing is this? {{ props.item }}
        </div>
    </button>
</template>
