<script setup lang="ts">
    import type { LibraryItem } from "@/stores/library.ts";
    import { formatTitleDisplay } from "@/util/format.ts";
    import { useCenterStore } from "@/stores/center.ts";
    import { useLibraryStore } from "@/stores/library.ts";

    const center = useCenterStore();
    const library = useLibraryStore();
    
    const props = defineProps<{
        item: LibraryItem;
        index: number;
    }>();

    function showThis() {
        center.setRaw(props.item);
    }

    function removeThis() {
        library.removeItem(props.index);
    }
</script>

<template>
    <div class="relative group flex-1 w-[96%] h-15">
        <!-- Main clickable item -->
        <button
            class="hover:bg-fg-more-lighter transition-[background] duration-200 h-full rounded-md cursor-pointer text-left w-full p-3 ml-2
                   flex"
            v-ripple
            @click="showThis">
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
            <div class="w-10 h-full flex justify-center items-center">
                <button
                    class="size-7 p-1.5 rounded-md hover:bg-fg-even-more-lighter opacity-0
                           group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    v-ripple
                    @click.stop="removeThis">
                    <img src="@/assets/images/close.png" class="w-full" />
                </button>
            </div>
        </button>
    </div>
</template>
