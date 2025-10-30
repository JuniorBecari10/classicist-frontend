<script setup lang="ts">
    import { ref } from "vue";

    import ButtonBg from "../util/ButtonBg.vue";
    import ButtonFilter from "../util/ButtonFilter.vue";
    import SearchBar from "../util/SearchBar.vue";

    const search = ref("");

    const filterWorks = ref(false);
    const filterComposers = ref(false);
    const filterPerformers = ref(false);
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-fg h-full rounded-xl">
        <div class="flex p-2 w-full">
            <ButtonBg> <img class="w-4" src="@/assets/images/home.png" /> </ButtonBg>
            <SearchBar v-model="search">Search your library</SearchBar>
        </div>

        <div class="flex items-center justify-center w-full py-1 px-3">
            <ButtonFilter v-model="filterWorks">Works</ButtonFilter>
            <ButtonFilter v-model="filterComposers">Composers</ButtonFilter>
            <ButtonFilter v-model="filterPerformers" :noMr="true">Performers</ButtonFilter>
        </div>

        <div class="m-4 p-2 rounded-md hover:bg-fg-lighter mt-10 flex-1 w-full">
            <button class="flex-1 px-5 h-8 rounded-md cursor-pointer text-left">
                <p class="font-semibold font-fredoka">Symphony No. 7</p>
                <p class="text-[11px] text-fgray font-fredoka">Ludwig van Beethoven</p>
            </button>
        </div>
    </div>
</template>
