<script setup lang="ts">
    import Header from "./components/sections/Header.vue";
    import Sidebar from "./components/sections/Sidebar.vue";
    import Center from "./components/sections/Center.vue";
    import Player from "./components/player/Player.vue";
    import ResizeSplit from "./components/util/ResizeSplit.vue";

    import { usePlayerStore } from "./stores/player.ts";

    const work = {"id":7,"title":{"kind":"Serenade","number":13,"nickname":"Eine kleine Nachtmusik"},"key":{"note":10,"mode":0},"composer":{"id":3,"name":"Wolfgang Amadeus Mozart","birth_year":1756,"death_year":1791,"photo_path":"mozart.jpg"},"catalog":{"prefix":"K.","number":"525","subnumber":null},"movements":[{"nickname":null,"form":null,"lyrics":null,"tempo_markings":[{"form":null,"name":"Allegro"}],"sheet":{"path":"eine-1.mxl"}},{"nickname":null,"form":"Romanze","lyrics":null,"tempo_markings":[{"form":null,"name":"Andante"}],"sheet":{"path":"eine-2.mxl"}},{"nickname":null,"form":"Menuetto","lyrics":null,"tempo_markings":[{"form":null,"name":"Allegretto"}],"sheet":{"path":"eine-3.mxl"}},{"nickname":null,"form":"Rondo","lyrics":null,"tempo_markings":[{"form":null,"name":"Allegro"}],"sheet":{"path":"eine-4.mxl"}}],"year":{"start_year":1787,"end_year":null}};

    usePlayerStore().addWork(work);
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
