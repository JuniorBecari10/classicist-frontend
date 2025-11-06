<script setup lang="ts">
    import { computed } from "vue";
    
    import { getRecsForWork, getWork, useFetch } from "@/util/fetch.ts";
    import { formatTitleDisplay, formatDisplayAuthors } from "@/util/format.ts";
    import { BACKEND_URL } from "@/util/consts.ts";
    import { useCenterStore } from "@/stores/center.ts";

    import ButtonText from "../util/ButtonText.vue";

    const center = useCenterStore();

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
        center.work(work);
    }
</script>

<template>
    <template v-if="loadingRecs || loadingWork">
        <div class="bg-gray-300 animate-pulse rounded-md mb-2 h-10 w-full"></div>
    </template>

    <template v-else-if="errorRecs || errorWork">
        <div class="bg-red-500 animate-pulse rounded-md mb-2 h-10 w-full"></div>
    </template>

    <template v-else-if="workData && recData">
        <ButtonText :action="click">
            <img
                class="rounded-md size-10"
                :src="recData.imagePath"
                crossorigin="anonymous" />

            <div class="flex-1 ml-4 flex flex-col items-start justify-center">
                <span class="text-[1rem] font-semibold font-fredoka truncate max-w-[95%]">
                    {{ formatTitleDisplay(workData.title) }}
                </span>

                <span class="text-xs truncate text-fgray max-w-[95%]">
                    {{ formatDisplayAuthors(workData.composer, recData.perfs) }}
                </span>
            </div>
        </ButtonText>
    </template>
</template>
