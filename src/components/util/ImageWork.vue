<script setup lang="ts">
    import { computed } from "vue";
    
    import { getRecsForWork, getWork, useFetch } from "@/util/fetch.ts";
    import { formatTitleDisplayKey, formatDisplayAuthors } from "@/util/format.ts";
    import { BACKEND_URL } from "@/util/consts.ts";
    
    import Button from "../util/Button.vue";

    const props = defineProps<{
        workId: number;
    }>();

    const { data: recs, loading: loadingRecs, error: errorRecs } =
        useFetch(() => getRecsForWork(props.workId));

    const { data: work, loading: loadingWork, error: errorWork } =
        useFetch(() => getWork(props.workId));

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

    function click() {
        // TODO
    }
</script>

<template>
    <template v-if="loadingRecs || loadingWork">
        <div class="size-40 bg-gray-300 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="errorRecs || errorWork">
        <div class="size-40 bg-red-500 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="workData && recData">
        <Button :action="click">
            <img
                class="rounded-sm size-40 object-cover"
                :src="recData.imagePath"
                :title="`${formatTitleDisplayKey(workData.title, workData.key.note, workData.key.mode)}\n${formatDisplayAuthors(workData.composer, recData.perfs)}`"
                 crossorigin="anonymous" />
        </Button>
    </template>
</template>
