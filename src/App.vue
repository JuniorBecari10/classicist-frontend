<script setup lang="ts">
    import Header from "./components/sections/Header.vue";
    import SideBar from "./components/sections/SideBar.vue";
    import Center from "./components/sections/Center.vue";
    import Player from "./components/player/Player.vue";
</script>

<template>
    <div class="bg-black flex flex-col w-full min-h-screen">
        <Header />

        <div class="p-2 flex-1">
            <div class="flex">
                <SideBar />
                <Center />
            </div>

            <Player />
        </div>
    </div>
</template>
