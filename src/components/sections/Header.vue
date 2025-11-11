<script setup lang="ts">
    import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from "vue";
    import SearchBar from "../util/SearchBar.vue";
    import SearchResult from "../util/SearchResult.vue";
    import { search, useFetch } from "@/util/fetch.ts";

    const props = defineProps<{ username: string }>();

    const searchText = ref("");
    const searchVisible = ref(false);
    const userVisible = ref(false);
    const dropdown = ref<HTMLElement | null>(null);

    const query = computed(() => searchText.value.trim());

    const { data: results, loading, error, reload } =
        useFetch(() => search(query.value));

    watchEffect(() => {
        if (query.value.length > 0)
            reload();
    });

    function handleClickOutside(event: MouseEvent) {
        const el = dropdown.value;
        if (userVisible.value && el && !el.contains(event.target as Node)) {
            userVisible.value = false;
        }
    }

    onMounted(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", handleClickOutside);
    });

    function clear() {
        searchText.value = "";
        searchVisible.value = false;
        results.value = [];
    }

    function searchClick() {
        setTimeout(clear, 300);
    }

    function toggleUser() {
        userVisible.value = !userVisible.value;
    }
</script>

<template>
    <header class="flex items-center justify-center m-4 h-10">
        <a href="/" v-ripple>
            <img src="@/assets/images/logo.png" />
        </a>

        <div class="flex-1"></div>

        <div class="w-80 h-10 flex">
            <SearchBar
                v-model="searchText"
                v-model:visible="searchVisible"
                :blur="clear">
                Search
            </SearchBar>
        </div>

        <div class="flex-1"></div>

        <div class="flex items-center justify-center">
            <div
                class="bg-[#85E014] hover:bg-[#9fed40] size-10 text-lg rounded-full text-white cursor-pointer
                       font-bold flex items-center justify-center transition-[background] duration-200"
                v-ripple
                @click.stop="toggleUser">
                {{ props.username.toUpperCase()[0] }}
            </div>
        </div>
    </header>

    <div
        v-show="searchVisible"
        class="absolute left-1/2 top-17 -translate-x-1/2 bg-fg-lighter shadow-xl w-100 max-h-100 min-h-15
               z-50 rounded-lg py-2 overflow-auto">
        <div v-if="loading"></div>

        <div
            v-else-if="results.length === 0 && query.length > 0"
            class="w-full h-15 flex flex-col items-center justify-center">
            <p class="text-[1.15rem] font-semibold font-fredoka">No results found.</p>
            <p class="text-sm text-fgray font-fredoka">
                Please try a different search term.
            </p>
        </div>

        <div
            v-else-if="results.length === 0"
            class="w-full h-15 flex flex-col items-center justify-center">
            <p class="text-[1.15rem] font-semibold font-fredoka">Type to search!</p>
            <p class="text-sm text-fgray font-fredoka">
                Your results will appear here.
            </p>
        </div>

        <SearchResult
            v-else
            v-for="res in results"
            :key="res.id || res.title"
            :action="searchClick"
            :item="res"
        />
    </div>

    <div
        v-show="userVisible"
        ref="dropdown"
        class="absolute right-2 top-17 bg-fg-lighter shadow-xl w-60 z-50 rounded-lg flex flex-col
               justify-center items-center p-4">
        <div class="bg-[#85E014] size-10 text-lg rounded-full font-bold flex items-center justify-center">
            {{ props.username.toUpperCase()[0] }}
        </div>

        <h1 class="font-bold text-xl mt-2">{{ props.username }}</h1>

        <button class="w-full bg-fg-more-lighter hover:bg-fg-even-more-lighter transition-[background]
            duration-200 mt-5 py-1 rounded-md cursor-pointer" v-ripple>
            Log out
        </button>
    </div>
</template>
