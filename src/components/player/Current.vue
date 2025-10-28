<script setup lang="ts">
    import { formatDisplayWork, formatDisplayAuthors } from "@/util/format.ts";
    import { computed, ref } from "vue";
    import { BACKEND_URL } from "@/util/consts.ts";

    import ImageFullScreen from "../util/ImageFullScreen.vue";

    const props = defineProps<{
        work: DisplayWork;
        composer: Composer;
        performers: Performer[];
        imageName: string;
    }>();

    const showImage = ref(false);

    const name = computed(() => formatDisplayWork(props.work));
    const authors = computed(() => formatDisplayAuthors(props.composer, props.performers));
    const imagePath = computed(() => `${BACKEND_URL}/public/images/covers/${props.imageName}`);

    const disappear = () => showImage.value = false;
</script>

<template>
    <div class="w-1/4 h-full flex items-center ml-5">
        <img
            :src="imagePath"
            @click="showImage = true"
            class="size-15 mr-5 rounded-lg cursor-pointer hover:scale-105 transition-[scale] duration-200">

        <div class="flex flex-col justify-center items-start w-full truncate">
            <span class="font-fredoka font-semibold text-lg" :title="name">{{ name }}</span>
            <span class="font-fredoka text-fgray text-sm" :title="authors">{{ authors }}</span>
        </div>

        <div class="relative right-7 size-12 bg-linear-to-r from-transparent to-fg"></div>
        <div class="relative right-7 bg-fg size-12"></div>
    </div>

    <ImageFullScreen v-show="showImage" :imageName="props.imageName" @disappear="disappear" />
</template>
