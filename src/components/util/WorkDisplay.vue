<script setup lang="ts">
    import { ref, onMounted, watch, computed } from "vue";
    import { getRecsForWork, useFetch } from "@/util/fetch.ts";
    import {
        formatTitleDisplayKey,
        formatCatalog,
        joinPerformers,
        toRoman,
        formatMovement,
        convertFormatTime
    } from "@/util/format.ts";

    const props = defineProps<{
        work: Work;
    }>();

    const { data: recs, loading, error } = useFetch(() =>
        getRecsForWork(props.work.id)
    );

    const hidden = ref(false);
    const selectedId = defineModel<number | null>({ default: null });
    const selectedRec = computed(() => {
        if (!recs.value || selectedId.value == null)
            return null;

        return recs.value.find(r => r.id === selectedId.value) ?? null;
    });

    const flipWork = () => (hidden.value = !hidden.value);

    function selectFirst() {
        if (recs.value && recs.value.length > 0) {
            selectedId.value = recs.value[0].id;
        } else {
            selectedId.value = null;
        }
    }

    onMounted(selectFirst);

    watch(
        () => recs.value,
        () => selectFirst(),
        { immediate: true, deep: true }
    );
</script>

<template>
    <template v-if="loading">
        <div class="size-40 bg-gray-300 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="error">
        <div class="size-40 bg-red-500 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="recs">
        <p class="w-full my-3 ml-1 text-[95%] text-fgray">Featured work:</p>

        <div
            class="grid grid-cols-1 rounded-[24px] bg-[#303030] w-full h-auto justify-center justify-items-center transition-all duration-300"
            :class="{ 'pb-2': !hidden }">
            
            <!-- Work Header -->
            <div
                class="inline-flex rounded-[36px] bg-[#3c3c3c] px-8 pr-[1%] w-full h-[3.25rem] items-center justify-between hover:bg-[#404040] transition-colors duration-100 cursor-pointer"
                :class="{ 'mb-3': !hidden }"
                @click.self="flipWork">

                <section class="flex w-full items-center justify-start space-x-4">
                    <svg
                        class="scale-150 mr-8 ml-1 transition-transform duration-300"
                        :class="hidden ? '' : 'rotate-90'"
                        width="7"
                        height="13"
                        viewBox="0 0 7 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        @click="flipWork"
                    >
                        <path
                            d="M1 12L6 6.5L1 1"
                            :stroke="hidden ? 'white' : '#18a0e4'"
                            :stroke-width="hidden ? '1px' : '2px'"
                            stroke-linecap="round"
                        />
                    </svg>

                    <span
                        class="text-[115%] truncate transition-colors duration-150"
                        :class="hidden ? 'font-normal text-white' : 'font-semibold text-[#18a0e4]'"
                        @click.self="flipWork">
                        {{ formatTitleDisplayKey(props.work.title, props.work.key.note, props.work.key.mode) }}
                    </span>

                    <div class="rounded-full bg-fg-more-lighter px-3 py-1.5 truncate">
                        {{ formatCatalog(props.work.catalog) }}
                    </div>

                    <select
                        v-model="selectedId"
                        class="rounded-full bg-fg-more-lighter px-3 py-1.5 text-white cursor-pointer">
                        <option
                            v-for="rec in recs"
                            :key="rec.id"
                            :value="rec.id">
                            {{ joinPerformers(rec.performers.map(p => p.performer)) }} ― {{ rec.year }}
                        </option>
                    </select>
                </section>
            </div>

            <!-- Movements -->
            <section
                class="grid grid-cols-1 w-full justify-items-center transition-all duration-300"
                v-show="!hidden">

                <div
                    v-for="(mov, index) in props.work.movements"
                    :key="mov.id"
                    class="
                        flex rounded-full pl-[19.5px] pr-[1%] w-[98%] cursor-pointer py-2
                        items-center justify-center hover:bg-[#3c3c3c] transition-colors duration-150
                    " v-ripple>
                    <section class="flex-1 space-x-5">
                        <div class="inline-flex w-5 justify-center">
                            <span class="!font-jetbrains">
                                {{ toRoman(index + 1) }}
                            </span>
                        </div>
                        <span>{{ formatMovement(mov) }}</span>
                    </section>

                    <span class="!font-jetbrains text-white font-light">
                        {{ convertFormatTime(selectedRec.movements[index].audio_file.duration) }}
                    </span>
                </div>
            </section>
        </div>
    </template>
</template>
