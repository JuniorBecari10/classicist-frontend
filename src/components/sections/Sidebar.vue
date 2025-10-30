<script setup lang="ts">
    import { ref } from "vue";

    import ButtonBg from "../util/ButtonBg.vue";
    import ButtonFilter from "../util/ButtonFilter.vue";
    import SearchBar from "../util/SearchBar.vue";
    import SidebarWork from "../util/SidebarWork.vue";

    const search = ref("");

    const filterWorks = ref(false);
    const filterComposers = ref(false);
    const filterPerformers = ref(false);

    const workTitle = ref({
        kind: "Symphony",
        number: 5,
        nickname: "Fate",
    } satisfies WorkTitle);
</script>

<template>
    <div class="flex flex-col items-center justify-start bg-fg rounded-xl">
        <div class="flex p-2 w-full">
            <ButtonBg> <img class="w-4" src="@/assets/images/home.png" /> </ButtonBg>
            <SearchBar v-model="search">Search your library</SearchBar>
        </div>

        <div class="grid grid-rows-1 grid-cols-3 w-full py-1 px-2">
            <ButtonFilter v-model="filterWorks">Works</ButtonFilter>
            <ButtonFilter v-model="filterComposers">Composers</ButtonFilter>
            <ButtonFilter v-model="filterPerformers" :noMr="true">Performers</ButtonFilter>
        </div>

        <div class="w-full">
            <SidebarWork :work="workTitle" composer="Ludwig van Beethoven" />
        </div>
    </div>
</template>
