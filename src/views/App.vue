<script setup lang="ts">
    import Header from "@/components/sections/Header.vue";
    import Sidebar from "@/components/sections/Sidebar.vue";
    import Center from "@/components/sections/Center.vue";
    import Player from "@/components/player/Player.vue";
    import ResizeSplit from "@/components/util/ResizeSplit.vue";

    const props = defineProps<{ username: string }>();
</script>

<template>
    <div class="bg-black flex flex-col w-full min-h-screen">
        <Header :username="props.username" />

        <div class="p-2 flex-1 flex flex-col">
            <ResizeSplit>
                <template #left> <Sidebar /> </template>
                <template #right> <Center :username="props.username" /> </template>
            </ResizeSplit>

            <Player />
        </div>
    </div>
</template>
