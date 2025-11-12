<script setup lang="ts">
    import { BACKEND_URL } from "@/util/consts.ts";
    import WorkDisplay from "../util/WorkDisplay.vue";
    import { getWorksByComposer, useFetch } from "@/util/fetch.ts";
    
    const props = defineProps<{
        composer: Composer;
    }>();

    const photo = `${BACKEND_URL}/public/images/composers/${props.composer.photo_path}`;
    const years = `${props.composer.birth_year}${
        props.composer.death_year
            ? ` ― ${props.composer.death_year}`
            : ""
    }`;

    const { data: works, loading: loadingWorks, error: errorWorks } =
        useFetch(() => getWorksByComposer(props.composer.id));
</script>

<template>
    <template v-if="loadingWorks">
        <div class="size-40 bg-gray-300 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="errorWorks">
        <div class="size-40 bg-red-500 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="works">
        <section class="flex-1 h-full bg-fg rounded-lg">
            <div class="h-50 bg-cover bg-center bg-fixed rounded-lg"
                :style="{ backgroundImage: `url('${photo}')` }">
                <div class="h-full bg-gradient-to-t from-fg to-black/30">
                    <div class="pt-5 pl-8">
                        <p class="font-semibold text-4xl mb-2">{{ props.composer.name }}</p>
                        <p class="text-xl text-fgray">
                            Composer • {{ years }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="p-3 w-full">
                <WorkDisplay :work="works[Math.floor(Math.random() * works.length)]" />
            </div>
        </section>
    </template>
</template>
