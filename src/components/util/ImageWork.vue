<script setup lang="ts">
    import Button from "../util/Button.vue";
    import { getRecsForWork, useFetch } from "@/util/fetch.ts";
    import { computed } from "vue";
    import { BACKEND_URL } from "@/util/consts.ts";

    const props = defineProps<{
        workId: number,
    }>();

    const { data: recs, loading, error, reload } =
        useFetch(() => getRecsForWork(props.workId));

    function click() {
        
    }

    const imagePath = computed(() => {
        if (!recs.value || recs.value.length === 0)
            return "";
        
        const recIndex = Math.floor(Math.random() * recs.value.length);
        const imageURL = recs.value[recIndex].photo_path;
        
        return `${BACKEND_URL}/public/images/covers/${imageURL}`;
    });
</script>

<template>
    <Button :action="click">
        <template v-if="loading">
            <div class="size-45 bg-gray-300 animate-pulse rounded-md mb-2"></div>
        </template>

        <template v-else-if="error">
            <div class="size-45 bg-red-500 animate-pulse rounded-md mb-2"></div>
        </template>

        <template v-else>
            <img
                class="rounded-sm size-45 object-cover"
                :src="imagePath"
                 crossorigin="anonymous"
            />
        </template>
    </Button>
</template>
