<script setup lang="ts">
    import { ref, computed, watchEffect } from "vue";
    import { getRecsForWork, useFetch } from "@/util/fetch.ts";
    import { BACKEND_URL } from "@/util/consts.ts";

    import WorkHeader from "../util/WorkHeader.vue";
    import WorkControls from "../util/WorkControls.vue";
    import MovementSelector from "../util/MovementSelector.vue";

    const props = defineProps<{
        work: Work;
        recId?: number;
    }>();

    const selectedRecId = ref(props.recId ? props.recId : -1);

    const { data: recs, loading: loading, error: error } =
        useFetch(() => getRecsForWork(props.work.id));
    
    const recData = computed(() => {
        if (!recs.value || recs.value.length === 0)
            return null;

        if (selectedRecId.value < 0)
            selectedRecId.value = recs.value[0].id;

        const rec = recs.value.filter(rec => rec.id === selectedRecId.value)[0];

        return {
            rec: rec,
            imagePath: `${BACKEND_URL}/public/images/covers/${rec.photo_path}`,
        };
    });
</script>

<template>
    <div v-if="loading" class="flex-1 bg-fg rounded-xl overflow-y-auto h-full animate-pulse" />
    <div v-else-if="error" class="flex-1 bg-red-300 rounded-xl overflow-y-auto h-full animate-pulse" />

    <section v-else class="flex-1 bg-fg rounded-xl overflow-y-auto h-full">
        <WorkHeader :work="props.work" :imagePath="recData.imagePath" />
        <WorkControls :recs="recs" v-model="selectedRecId" />
        <MovementSelector :work="props.work" :rec="recData.rec" />
    </section>
</template>
