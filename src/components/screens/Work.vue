<script setup lang="ts">
    import { ref, computed, watch, watchEffect } from "vue";
    import { getRecsForWork, useFetch } from "@/util/fetch.ts";
    import { BACKEND_URL } from "@/util/consts.ts";

    import WorkHeader from "../util/WorkHeader.vue";
    import WorkControls from "../util/WorkControls.vue";
    import MovementSelector from "../util/MovementSelector.vue";

    const props = defineProps<{
        work: Work;
        recId?: number;
    }>();

    const selectedRecId = ref(props.recId ?? -1);

    const { data: recs, loading, error, reload } =
        useFetch(() => getRecsForWork(props.work.id));

    // Refetch when the work changes
    watch(() => props.work.id, () => reload());

    // Update selected recording when prop changes
    watch(
        () => props.recId,
        (newVal) => {
            if (newVal !== undefined && newVal !== null)
                selectedRecId.value = newVal;
        }
    );

    // Default selection when recordings load
    watchEffect(() => {
        if (recs.value && recs.value.length > 0 && selectedRecId.value < 0)
            selectedRecId.value = recs.value[0].id;
    });

    const recData = computed(() => {
        const rec = recs.value?.find(r => r.id === selectedRecId.value);
        if (!rec) return null;

        return {
            rec,
            imagePath: `${BACKEND_URL}/public/images/covers/${rec.photo_path}`,
        };
    });
</script>

<template>
    <div v-if="loading" class="flex-1 bg-fg rounded-xl overflow-y-auto h-full animate-pulse" />
    <div v-else-if="error" class="flex-1 bg-red-300 rounded-xl overflow-y-auto h-full" />

    <section v-else class="flex-1 bg-fg rounded-xl overflow-y-auto h-full">
        <WorkHeader
            :work="props.work"
            :imagePath="recData?.imagePath" />
        <WorkControls :work="props.work" :recs="recs" v-model="selectedRecId" />
        <MovementSelector
            v-if="recData && recData.rec"
            :work="props.work"
            :rec="recData.rec"
        />
    </section>
</template>
