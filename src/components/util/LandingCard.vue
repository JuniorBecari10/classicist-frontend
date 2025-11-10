<script setup lang="ts">
    const props = defineProps<{
        image: string;
        title: string;
        description: string;
    }>();
</script>

<template>
    <div class="flex items-center justify-center mt-20">
        <img :src="props.image" class="size-32 mb-25 mr-15" />
        <div class="text-left">
            <h2 class="text-4xl !font-oldstd w-90 leading-none">{{ props.title }}</h2>
            <p class="text-xl !font-oldstd w-100 mt-5">{{ props.description }}</p>
        </div>
    </div>
</template>
