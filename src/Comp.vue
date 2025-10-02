<script setup lang="ts">
import { ref } from "vue"
</script>

<template>
    <section class="font-fredoka">
        <div class="bg-[url('./src/res/Amadeus.jpg')] h-50 bg-[center_-40rem]">
            <div class="h-1/1 bg-gradient-to-t from-black to-transparent">
                <div class="pt-5 pl-8 pt-0">
                    <p class="font-semibold text-[3rem]">Wolfgang Amadeus Mozart</p>
                    <p class="font-light text-[1.5rem]">Composer • 1756 ― 1791</p>
                </div>
            </div>
        </div>

        <p class="pl-8 font-light">Works</p>

        <section class="flex justify-center mt-3">
            <div class="rounded-full bg-[#222222] ml-8 mr-8 pl-8 w-1/1 h-[2.5rem] content-center">
                <img src="./res/seta.svg" class="">
            </div>
        </section>
    </section>
</template>