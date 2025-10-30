<script setup lang="ts">
    import { ref } from "vue";
    import SearchBar from "../util/SearchBar.vue";

    const search = ref("");
</script>

<template>
    <header class="flex items-center justify-center m-4 h-10">
        <a href="/" v-ripple>
            <img src="@/assets/images/logo.png" />
        </a>
        
        <div class="flex-1"></div>

        <div class="w-80 h-10 flex">
            <SearchBar v-model="search">Search</SearchBar>
        </div>

        <div class="flex-1"></div>

        <div class="hover:brightness-120 flex items-center justify-center cursor-pointer">
            <div class="bg-[#85E014] size-10 text-lg rounded-full text-white font-bold flex items-center justify-center">A</div>
        </div>
    </header>
</template>
