<script setup lang="ts">
    import { ref, computed } from "vue";
    import { formatKey } from "@/util/format.ts";
    import { useLibraryStore } from "@/stores/library.ts";
    import { useCenterStore } from "@/stores/center.ts";

    import ButtonBg from "../util/ButtonBg.vue";
    import ButtonText from "../util/ButtonText.vue";
    import ButtonFilter from "../util/ButtonFilter.vue";
    import SearchBar from "../util/SearchBar.vue";
    import SidebarWork from "../util/SidebarWork.vue";

    const store = useLibraryStore();
    const center = useCenterStore();

    const search = ref("");

    const filterWorks = ref(false);
    const filterComposers = ref(false);
    const filterPerformers = ref(false);

    function workSearchString(work: any): string {
        const parts: string[] = [];

        // title and nickname
        parts.push(work.title.kind);
        if (work.title.number) parts.push(`No. ${work.title.number}`);
        if (work.title.nickname) parts.push(work.title.nickname);

        // composer
        if (work.composer?.name) parts.push(work.composer.name);

        // catalog
        if (work.catalog?.prefix) parts.push(work.catalog.prefix);
        if (work.catalog?.number) parts.push(work.catalog.number);
        if (work.catalog?.subnumber) parts.push(work.catalog.subnumber);

        // key
        if (work.key) parts.push(formatKey(work.key.note, work.key.mode));

        // composition years
        if (work.year?.start_year) parts.push(String(work.year.start_year));
        if (work.year?.end_year) parts.push(String(work.year.end_year));

        // movements, tempo markings, etc.
        if (work.movements?.length) {
            for (const m of work.movements) {
                if (m.nickname) parts.push(m.nickname);
                if (m.form) parts.push(m.form);
                if (m.tempo_markings?.length) {
                    for (const t of m.tempo_markings) {
                        if (t.name) parts.push(t.name);
                        if (t.form) parts.push(t.form);
                    }
                }
            }
        }

        return parts.join(" ").toLowerCase();
    }

    const filteredList = computed(() => {
        let list = store.list;

        // collect active filters
        const activeFilters = [
            filterWorks.value ? "work" : null,
            filterComposers.value ? "composer" : null,
            filterPerformers.value ? "performer" : null,
        ].filter(Boolean) as string[];

        if (activeFilters.length > 0)
            list = list.filter(item => activeFilters.includes(item.type));

        const term = search.value.trim().toLowerCase();
        if (!term) return list;

        // split into multiple words
        const terms = term.split(/\s+/).filter(Boolean);

        return list.filter(item => {
            const value = item.value;
            let text = "";

            switch (item.type) {
                case "work":
                    text = workSearchString(value);
                    break;
                case "composer":
                    text = value.name.toLowerCase();
                    break;
                case "performer":
                    text = value.name.toLowerCase();
                    break;
                default:
                    return false;
            }

            // match only if all search terms are found
            return terms.every(t => text.includes(t));
        });
    });

    function home() {
        center.home();
    }
</script>

<template>
    <div class="flex flex-col items-center justify-start bg-fg rounded-xl h-full">
        <div v-if="store.list.length === 0" class="flex p-2 w-full">
            <button
                class="
                    flex items-center justify-center flex-shrink-0 rounded-md transition duration-200 filter
                    hover:bg-fg-more-lighter cursor-pointer p-2 w-full box-border bg-fg-lighter
                "
                @click="home" v-ripple>
                    <img class="w-4 mr-2" src="@/assets/images/home.png" />
                    <span>Home</span>
            </button>
        </div>

        <div v-else class="flex p-2 w-full">
            <ButtonBg :action="home"> <img class="w-4" src="@/assets/images/home.png" /> </ButtonBg>
            <SearchBar v-model="search">Search your library</SearchBar>
        </div>

        <div v-if="store.list.length !== 0" class="grid grid-rows-1 grid-cols-3 w-full py-1 px-2">
            <ButtonFilter v-model="filterWorks">Works</ButtonFilter>
            <ButtonFilter v-model="filterComposers">Composers</ButtonFilter>
            <ButtonFilter v-model="filterPerformers" :noMr="true">Performers</ButtonFilter>
        </div>

        <div class="w-full h-full mt-2">
            <SidebarWork
                v-for="(item, index) in filteredList"
                :key="item.type + '-' + item.value.id"
                :item="item"
                :index="index"
            />

            <div v-if="store.list.length === 0" class="flex flex-col items-center justify-center w-full h-[80%]">
                <img src="@/assets/images/note.png" />
                <p class="text-[1.15rem] font-semibold font-fredoka">Your library is empty!</p>
                <p class="text-sm text-fgray font-fredoka">Add some items here for easier access.</p>
            </div>
        </div>
    </div>
</template>
