<script setup lang="ts">
    import { ref, watch } from "vue";
    import { BACKEND_URL } from "@/util/consts.ts";
    import WorkDisplay from "../util/WorkDisplay.vue";
    import { getWork, getRecsByPerformer, useFetch } from "@/util/fetch.ts";

    const props = defineProps<{
        performer: Performer;
    }>();

    const { data: recs, loading: loadingRecs, error: errorRecs } =
        useFetch(() => getRecsByPerformer(props.performer.id));

    const work = ref<Work | null>(null);

    async function loadRandomWork() {
        if (!recs.value || recs.value.length === 0) {
            work.value = null;
            return;
        }

        const randomRec = recs.value[Math.floor(Math.random() * recs.value.length)];

        try {
            const data = await getWork(randomRec.work_id);
            work.value = data;
        } catch (err) {
            console.error("Failed to load work:", err);
            work.value = null;
        }
    }

    watch(recs, (newRecs) => {
        if (newRecs && newRecs.length > 0) {
            loadRandomWork();
        }
    }, { immediate: true });

    function randomHexColor(): string {
        const randomInt = Math.floor(Math.random() * 0xffffff);
        return `#${randomInt.toString(16).padStart(6, "0")}`;
    }
</script>

<template>
    <template v-if="loadingRecs">
        <div class="size-40 bg-gray-300 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="errorRecs">
        <div class="size-40 bg-red-500 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="work">
        <section class="flex-1 h-full bg-fg rounded-lg">
            <div class="h-50 bg-cover bg-center bg-fixed rounded-lg">
                <div
                    class="h-full rounded-lg"
                    :style="{
                        background: `linear-gradient(0deg, #252525 0%, ${randomHexColor()} 100%)`,
                    }">
                    <div class="pt-5 pl-8">
                        <p class="font-semibold text-4xl mb-2">{{ props.performer.name }}</p>
                        <p class="text-xl text-fgray">Performer</p>
                    </div>
                </div>
            </div>

            <div class="p-3 w-full">
                <WorkDisplay :work="work" :showComposer="true" />
            </div>
        </section>
    </template>
</template>
