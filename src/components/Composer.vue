<script setup lang="ts">
import Works from './Works.vue'
import About from './About.vue'
</script>

<template>
    <section class="font-fredoka select-none">
        <div class="bg-[url('./src/resources/Amadeus.jpg')] h-60 bg-[center_-40rem] bg-fixed">
            <div class="h-1/1 bg-gradient-to-t from-[#252525] to-transparent">
                <div class="pt-5 pl-8 pt-0">
                    <p class="font-semibold text-[3rem]">Wolfgang Amadeus Mozart</p>
                    <p class="font-light text-[1.5rem] text-gray-300">Composer • 1756 ― 1791</p>
                </div>
            </div>
        </div>

        <!-- Body -->
        <p class="pl-9 mt-3 font-light text-xl">Works</p>
        <section class="grid justify-center my-3 w-full gap-8">
            <Works />
            <About />
        </section>
    </section>
</template>