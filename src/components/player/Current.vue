<script setup lang="ts">
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";

    const props = defineProps<{
        work: DisplayWork;
        composer: string;
        performers: Performer[];
    }>();
</script>

<template>
    <div class="h-full flex items-center ml-5">
        <img src="https://github.com/JuniorBecari10/classicist-public/blob/main/files/images/covers/symp5.jpg?raw=true"
            class="size-15 mr-5 rounded-lg">

        <div class="flex flex-col justify-center items-start w-1/6 truncate">
            <span class="font-fredoka font-semibold text-lg">{{ formatDisplayWork(props.work) }}</span>
            <span class="font-fredoka text-fgray text-sm">{{ formatDisplayAuthors() }}</span>
        </div>

        <div class="relative right-12 size-12 bg-linear-to-r from-transparent to-fg"></div>
    </div>
</template>
