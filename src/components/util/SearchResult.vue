<script setup lang="ts">
    import type { LibraryItem } from "@/stores/library.ts";
    import { formatTitleDisplay } from "@/util/format.ts";
    import { useCenterStore } from "@/stores/center.ts";

    const center = useCenterStore();
    
    const props = defineProps<{
        item: SearchItem;
        action: () => void;
    }>();

    function click() {
        showThis();
        props.action();
    }

    function showThis() {
        center.setRaw(props.item);
    }
</script>

<template>
    <div class="relative group flex-1 w-[96%] h-15">
        <button
            class="hover:bg-fg-more-lighter transition-[background] duration-200 h-full rounded-md cursor-pointer text-left w-full p-3 ml-2 flex"
            v-ripple
            @click="click">
            <div class="flex-1 flex flex-col items-start justify-center">
                <div v-if="props.item.type === 'work'" class="w-full">
                    <p class="text-[1.15rem] font-semibold font-fredoka truncate w-[95%]">
                        {{ formatTitleDisplay(props.item.value.title) }}
                    </p>
                    <p class="text-sm text-fgray font-fredoka">
                        Work • {{ props.item.value.composer.name }}
                    </p>
                </div>

                <div v-else-if="props.item.type === 'composer'" class="w-full">
                    <p class="text-[1.15rem] font-semibold font-fredoka truncate w-[95%]">
                        {{ props.item.value.name }}
                    </p>
                    <p class="text-sm text-fgray font-fredoka">Composer</p>
                </div>

                <div v-else-if="props.item.type === 'performer'" class="w-full">
                    <p class="text-[1.15rem] font-semibold font-fredoka truncate w-[95%]">
                        {{ props.item.value.name }}
                    </p>
                    <p class="text-sm text-fgray font-fredoka">Performer</p>
                </div>

                <div v-else>
                    what kind of thing is this? {{ props.item }}
                </div>
            </div>
        </button>
    </div>
</template>
