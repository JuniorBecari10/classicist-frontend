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
                   flex flex-col justify-center items-start"
            v-ripple
            @click="showThis"
        >
            <div v-if="props.item.type === 'work'" class="w-full">
                <p class="text-[1.15rem] font-semibold font-fredoka truncate w-[80%]">
                    {{ formatTitleDisplay(props.item.value.title) }}
                </p>
                <p class="text-sm text-fgray font-fredoka">
                    Work • {{ props.item.value.composer.name }}
                </p>
            </div>

            <div v-else-if="props.item.type === 'composer'" class="w-full">
                <p class="text-[1.15rem] font-semibold font-fredoka truncate w-[80%]">
                    {{ props.item.value.name }}
                </p>
                <p class="text-sm text-fgray font-fredoka">Composer</p>
            </div>

            <div v-else-if="props.item.type === 'performer'" class="w-full">
                <p class="text-[1.15rem] font-semibold font-fredoka truncate w-[80%]">
                    {{ props.item.value.name }}
                </p>
                <p class="text-sm text-fgray font-fredoka">Performer</p>
            </div>

            <div v-else>
                what kind of thing is this? {{ props.item }}
            </div>
        </button>

        <!-- Close button, absolutely positioned -->
        <button
            class="absolute bottom-11 left-86 size-7 p-1.5 rounded-md hover:bg-fg-more-lighter opacity-0
                   group-hover:opacity-100 transition-opacity duration-200"
            v-ripple
            @click.stop="removeThis"
        >
            <img src="@/assets/images/close.png" class="w-full" />
        </button>
    </div>
</template>
