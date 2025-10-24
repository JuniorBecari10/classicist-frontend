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
    <div class="w-1/4 h-full flex items-center ml-5">
        <img :src="`http://localhost:8080/public/images/covers/${props.imageName}`"
            class="size-15 mr-5 rounded-lg">

        <div class="flex flex-col justify-center items-start w-full truncate">
            <span class="font-fredoka font-semibold text-lg" :title="name">{{ name }}</span>
            <span class="font-fredoka text-fgray text-sm" :title="authors">{{ authors }}</span>
        </div>

        <div class="relative right-7 size-12 bg-linear-to-r from-transparent to-fg"></div>
        <div class="relative right-7 bg-fg size-12"></div>
    </div>
</template>
