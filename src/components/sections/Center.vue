<script setup lang="ts">
    import ImageWork from "../util/ImageWork.vue";

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

    const ids = getUniqueRandomNumbers(1, 20, 10);
</script>

<template>
    <div class="flex-1 bg-fg ml-2 rounded-xl">
        <h1 class="mt-6 ml-8 text-[32px] font-bold">Welcome back, Antônio!</h1>

        <p class="ml-8 mt-6 text-[15px]">Recommended for you</p>
        <div class="flex ml-4 mt-4 gap-2 overflow-auto">
            <ImageWork :workId="id" v-for="id in ids" />
        </div>

        <p class="ml-8 mt-10 text-[15px]">We think you might like these...</p>
        <div class="grid grid-cols-2 gap-2 mx-4 mt-4">
            <button class="hover:brightness-120 flex items-center justify-center p-3 bg-fg-lighter rounded-md">
                <img class="rounded-md size-10" src="./assets/img1.png" />
                <div class="flex-1 ml-2">
                    <p class="text-[15px] font-semibold font-fredoka">Symphony No. 5 in C Minor</p>
                    <p class="text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philharmon</p>
                </div>
            </button>
        </div>
    </div>
</template>
