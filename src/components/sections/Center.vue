<script setup lang="ts">
    import ImageWork from "../util/ImageWork.vue";
    import WorkTile from "../util/WorkTile.vue";

    import Work from "../screens/Work.vue";

    import { useCenterStore } from "@/stores/center.ts";
    const center = useCenterStore();

    const props = defineProps<{ username: string }>();

    function getUniqueRandomNumbers(a: number, b: number, n: number): number[] {
        if (b < a)
            throw new Error("Invalid range: b must be >= a");
        
        const rangeSize = b - a + 1;
        
        if (n > rangeSize)
            throw new Error("Not enough unique numbers in the given range");

        const numbers: number[] = [];

        while (numbers.length < n) {
            const rand = Math.floor(Math.random() * rangeSize) + a;

            if (!numbers.includes(rand))
                numbers.push(rand);
        }

        return numbers;
    }

    const minId = 1;
    const maxId = 20;

    const ids = getUniqueRandomNumbers(minId, maxId, 10);
    const tileIds = getUniqueRandomNumbers(minId, maxId, 4);
</script>

<template>
    <div v-if="center.isHome()" class="flex-1 bg-fg rounded-xl overflow-y-auto h-full">
        <h1 class="mt-6 ml-6 text-[32px] font-bold truncate">Good to see you, {{ props.username }}!</h1>

        <p class="ml-6 mt-4 text-[15px]">Recommended for you</p>
        <div class="flex pl-4 mt-4 gap-2 overflow-auto">
            <ImageWork :workId="id" v-for="id in ids" />
        </div>

        <p class="ml-6 mt-10 text-[15px]">We think you might like these...</p>
        <div class="grid grid-cols-2 gap-2 mx-4 mt-4 max-h-[20%]">
            <WorkTile :workId="id" v-for="id in tileIds" />
        </div>
    </div>

    <Work v-if="center.isWork()" :work="center.screen.value" :id="center.screen.recId" />
    <div v-if="center.isComposer()">composer todo {{ center.screen.value }}</div>
    <div v-if="center.isPerformer()">performer todo {{ center.screen.value }}</div>
</template>
