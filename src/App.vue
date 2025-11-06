<script setup lang="ts">
    import Header from "./components/sections/Header.vue";
    import Sidebar from "./components/sections/Sidebar.vue";
    import Center from "./components/sections/Center.vue";
    import Player from "./components/player/Player.vue";
    import ResizeSplit from "./components/util/ResizeSplit.vue";

    import { useLibraryStore } from "@/stores/library.ts";
    const lib = useLibraryStore();

    lib.addComposer({"id":4,"name":"Ludwig van Beethoven","birth_year":1770,"death_year":1827,"photo_path":"beethoven.jpg"});
    lib.addWork({"id":4,"title":{"kind":"Violin Concerto","number":2,"nickname":"Summer"},"key":{"note":10,"mode":1},"composer":{"id":2,"name":"Antonio Vivaldi","birth_year":1678,"death_year":1741,"photo_path":"vivaldi.jpg"},"catalog":{"prefix":"Op.","number":"8","subnumber":"2"},"movements":[{"nickname":null,"form":null,"lyrics":null,"tempo_markings":[{"form":null,"name":"Allegro non molto"}],"sheet":{"path":"summer-1.mxl"}},{"nickname":null,"form":null,"lyrics":null,"tempo_markings":[{"form":null,"name":"Adagio e piano"}],"sheet":{"path":"summer-2.mxl"}},{"nickname":null,"form":null,"lyrics":null,"tempo_markings":[{"form":null,"name":"Presto"}],"sheet":{"path":"summer-3.mxl"}}],"year":{"start_year":1723,"end_year":null}});
    lib.addPerformer({"id":4,"name":"Karl Richter"});
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
