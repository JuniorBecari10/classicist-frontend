<script setup lang="ts">
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";
    import { computed } from "vue";

    const props = defineProps<{
        work: DisplayWork;
        composer: Composer;
        performers: Performer[];
        imageName: string;
    }>();

    const name = computed(() => formatDisplayWork(props.work));
    const authors = computed(() => formatDisplayAuthors(props.composer, props.performers));
</script>

<template>
    <div class="h-full w-1/4 flex items-center ml-5">
        <img src="https://github.com/JuniorBecari10/classicist-public/blob/main/files/images/covers/symp5.jpg?raw=true"
            class="size-15 mr-5 rounded-lg">

        <div class="flex flex-col justify-center items-start w-full truncate">
            <span class="font-fredoka font-semibold text-lg" :title="name">{{ name }}</span>
            <span class="font-fredoka text-fgray text-sm" :title="authors">{{ authors }}</span>
        </div>

        <div class="relative right-8 size-12 bg-linear-to-r from-transparent to-fg"></div>
    </div>
</template>
