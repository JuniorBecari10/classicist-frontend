<script setup lang="ts">
import Works from './Works.vue'
</script>

<template>
    <section class="font-fredoka">
        <div class="bg-[url('./src/res/Amadeus.jpg')] h-60 bg-[center_-40rem]">
            <div class="h-1/1 bg-gradient-to-t from-[#252525] to-transparent to-80%">
                <div class="pt-5 pl-8 pt-0">
                    <p class="font-semibold text-[3rem]">Wolfgang Amadeus Mozart</p>
                    <p class="font-light text-[1.5rem]">Composer • 1756 ― 1791</p>
                </div>
            </div>
        </div>
        <p class="pl-9 font-light">Works</p>
        <Works class="" />
    </section>
</template>