<script setup lang="ts">
    import Button from "../util/Button.vue";
    import { getRecsForWork, getWork, useFetch } from "@/util/fetch.ts";
    import { formatTitleDisplay, formatDisplayAuthors } from "@/util/format.ts";
    import { computed } from "vue";
    import { BACKEND_URL } from "@/util/consts.ts";

    const props = defineProps<{
        workId: number,
    }>();

    const { data: recs, loading: loadingRecs, error: errorRecs } =
        useFetch(() => getRecsForWork(props.workId));

    const { data: work, loading: loadingWork, error: errorWork } =
        useFetch(() => getWork(props.workId));

    function click() {
        
    }

    const workData = computed(() => work.value ?? null);

    const recData = computed(() => {
        if (!recs.value || recs.value.length === 0)
            return null;

        const recIndex = Math.floor(Math.random() * recs.value.length);
        const rec = recs.value[recIndex];

        return {
            perfs: rec.performers?.map(p => p.performer) ?? [],
            imagePath: `${BACKEND_URL}/public/images/covers/${rec.photo_path}`,
        };
    });
</script>

<template>
    <Button :action="click">
        <template v-if="loadingRecs || loadingWork">
            <div class="size-40 bg-gray-300 animate-pulse rounded-md mb-2"></div>
        </template>

        <template v-else-if="errorRecs || errorWork">
            <div class="size-40 bg-red-500 animate-pulse rounded-md mb-2"></div>
        </template>

        <template v-else-if="workData && recData">
            <img
                class="rounded-sm size-40 object-cover"
                :src="recData.imagePath"
                :title="`${formatTitleDisplay(workData.title)} • ${formatDisplayAuthors(recData.perfs)}`"
                 crossorigin="anonymous"
            />
        </template>
    </Button>
</template>
