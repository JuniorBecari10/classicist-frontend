<script setup lang="ts">
    import { ref, computed, watchEffect } from "vue";
    import SearchBar from "../util/SearchBar.vue";
    import SearchResult from "../util/SearchResult.vue";
    import { search, useFetch } from "@/util/fetch.ts";

    // TODO: recent searches
    const props = defineProps<{ username: string }>();

    const searchText = ref("");
    const searchVisible = ref(false);
    const query = computed(() => searchText.value.trim());

    const userVisible = ref(false);

    const { data: results, loading: loading, error: error, reload } =
        useFetch(() => search(query.value));

    watchEffect(() => {
        reload();
    });

    function clear() {
        searchText.value = "";
        searchVisible.value = false;
        results.value = [];
    }

    function searchClick() {
        setTimeout(clear, 300);
    }
</script>

<template>
    <header class="flex items-center justify-center m-4 h-10">
        <a href="/" v-ripple>
            <img src="@/assets/images/logo.png" />
        </a>
        
        <div class="flex-1"></div>

        <div class="w-80 h-10 flex">
            <SearchBar v-model="searchText" v-model:visible="searchVisible" :blur="clear">Search</SearchBar>
        </div>

        <div class="flex-1"></div>

        <div class="flex items-center justify-center">
            <div class="bg-[#85E014] hover:bg-[#9fed40] size-10 text-lg rounded-full text-white cursor-pointer
                        font-bold flex items-center justify-center transition-[background] duration-200" v-ripple>
                {{ props.username.toUpperCase()[0] }}
            </div>
        </div>
    </header>

    <div v-show="searchVisible"
        class="absolute left-1/2 top-17 -translate-x-1/2 bg-fg-lighter shadow-xl w-100 max-h-100 min-h-15 z-50 rounded-lg py-2 overflow-auto">

        <div v-if="loading"></div>

        <div v-else-if="results.length === 0 && query.length > 0" class="w-full h-15 flex flex-col items-center justify-center">
            <p class="text-[1.15rem] font-semibold font-fredoka">No results found.</p>
            <p class="text-sm text-fgray font-fredoka">Please try a different search term.</p>
        </div>
        
        <div v-else-if="results.length === 0" class="w-full h-15 flex flex-col items-center justify-center">
            <p class="text-[1.15rem] font-semibold font-fredoka">Type to search!</p>
            <p class="text-sm text-fgray font-fredoka">Your results will appear here.</p>
        </div>

        <SearchResult v-else v-for="res in results" :action="searchClick" :item="res" />
    </div>
</template>
