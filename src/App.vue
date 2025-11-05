<script setup lang="ts">
    import Header from "./components/sections/Header.vue";
    import Sidebar from "./components/sections/Sidebar.vue";
    import Center from "./components/sections/Center.vue";
    import Player from "./components/player/Player.vue";
    import ResizeSplit from "./components/util/ResizeSplit.vue";

    import { usePlayerStore } from "./stores/player.ts";

    const rec = {"id":9,"work_id":7,"year":1966,"photo_path":"eine.jpg","performers":[{"id":17,"performer":{"id":8,"name":"Herbert von Karajan"},"role":"Conductor"},{"id":18,"performer":{"id":9,"name":"Berliner Philharmoniker"},"role":"Orchestra"}],"movements":[{"id":17,"movement_index":0,"movement_id":17,"audio_file":{"path":"eine-1.mp3","duration":334}},{"id":18,"movement_index":0,"movement_id":18,"audio_file":{"path":"eine-2.mp3","duration":326}},{"id":19,"movement_index":0,"movement_id":19,"audio_file":{"path":"eine-3.mp3","duration":146}},{"id":20,"movement_index":0,"movement_id":20,"audio_file":{"path":"eine-4.mp3","duration":195}}]};

    usePlayerStore().addRecording(rec);
</script>

<template>
    <div class="bg-black flex flex-col w-full min-h-screen">
        <Header />

        <div class="p-2 flex-1 flex flex-col">
            <ResizeSplit>
                <template #left> <Sidebar /> </template>
                <template #right> <Center /> </template>
            </ResizeSplit>

            <Player />
        </div>
    </div>
</template>
