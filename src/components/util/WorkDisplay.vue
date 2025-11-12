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
    
    import { useLibraryStore } from "@/stores/library.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    const lib = useLibraryStore();
    const player = usePlayerStore();

    const props = defineProps<{
        work: Work;
        showComposer?: boolean;
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

    function play(index: number) {
        player.clear();
        player.addRecording(recs.value.filter(rec => rec.id === selectedId.value)[0]);
        player.setMovIndex(index);
        player.setPlaying(true);
    }

    const composerSplit = props.work.composer.name.split(" ");
    const composerLastName = composerSplit[composerSplit.length - 1];

    const workTitle = computed(
        () => `${
            props.showComposer
                ? `${composerLastName}: `
                : ""
        }${formatTitleDisplayKey(props.work.title, props.work.key.note, props.work.key.mode)}`
    );

    const catalog = computed(() => formatCatalog(props.work.catalog));
</script>

<template>
    <template v-if="loading">
        <div class="size-40 bg-gray-300 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="error">
        <div class="size-40 bg-red-500 animate-pulse rounded-md mb-2"></div>
    </template>

    <template v-else-if="recs">
        <p class="w-full my-3 ml-1 text-[95%] text-fgray">Featured work</p>

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
                            stroke="white"
                            :stroke-width="hidden ? '1px' : '2px'"
                            stroke-linecap="round"
                        />
                    </svg>

                    <span
                        class="text-[115%] truncate transition-colors duration-150"
                        :class="hidden ? 'font-normal text-white' : 'font-semibold'"
                        :title="workTitle"
                        @click.self="flipWork">
                        {{ workTitle }}
                    </span>

                    <div class="rounded-lg bg-fg-more-lighter px-3 py-1.5 truncate" :title="catalog">
                        {{ catalog }}
                    </div>

                    <button class="rounded-full bg-fg-more-lighter hover:bg-fg-even-more-lighter transition-[background] duration-200 p-2 cursor-pointer"
                        v-ripple @click="lib.addWork(props.work)">
                        <img src="@/assets/images/bookmark.png" class="size-5" />
                    </button>

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
                    v-for="mov, index in props.work.movements"
                    :key="mov.id"
                    @click="play(index)"
                    class="
                        flex flex-nowrap rounded-full pl-[19.5px] pr-[1%] w-[98%] cursor-pointer py-2
                        items-center justify-center hover:bg-[#3c3c3c] transition-colors duration-150
                    " v-ripple>
                    <section class="flex-1 flex flex-nowrap space-x-5">
                        <div class="inline-flex w-5 justify-center">
                            <div v-if="props.work.movements.length === 1" class="bg-white rounded-full size-[7px] mt-2 ml-0.5" />

                            <span v-else class="!font-jetbrains">
                                {{ toRoman(index + 1) }}
                            </span>
                        </div>
                        <span class="truncate">{{ formatMovement(mov) }}</span>
                    </section>

                    <span class="!font-jetbrains text-white font-light">
                        {{ convertFormatTime(selectedRec.movements[index].audio_file.duration) }}
                    </span>
                </div>
            </section>
        </div>
    </template>
</template>
