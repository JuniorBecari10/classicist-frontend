<script setup lang="ts">
</script>

<template>
    <div class="grid grid-cols-1 rounded-[36px] bg-[#303030] pb-2 w-[calc(100vw-5rem)] h-auto justify-center justify-items-center">
        <!-- Work -->
        <div class="inline-flex rounded-full bg-[#3c3c3c] mb-3 pl-8 pr-[2%] w-full h-[3.25rem] items-center justify-between">
            <section class="inline-flex items-center justify-between space-x-5">
                <img src="../resources/bluearrow.svg" class="scale-150 mt-1 mr-8">
                <span class="font-semibold text-[115%] text-blue-400">Symphony No. 5</span>
                <div class="rounded-full bg-[#4c4c4c] px-3 py-1.5 font-light">Op. 67</div>
                <div class="rounded-full bg-[#4c4c4c] px-3 py-1.5 font-light">Herbert von Karajan • Berliner Philarmoniker ― 1984</div>
            </section>
            <span class="font-mono font-bold text-blue-400">37:38</span>
        </div>

        <!-- Acts -->
        <div class="inline-flex rounded-full bg-[#3c3c3c] px-4 my-1 w-[98%] h-[2rem] items-center justify-between">
            <section class="flex-1 space-x-5">
                <div class="inline-flex w-5 justify-center">
                    <span class="font-mono font-bold text-blue-400">I</span>
                </div>
                <span class="font-semibold text-blue-400">Allegro com brio</span>
            </section>
            <span class="font-mono font-bold text-blue-400">7:22</span>
        </div>
        <div class="inline-flex rounded-full px-4 my-1 w-[98%] h-[2rem] items-center justify-between">
            <section class="flex-1 space-x-5">
                <div class="inline-flex w-5 justify-center">
                    <span class="font-mono font-bold">II</span>
                </div>
                <span>Andante con moto</span>
            </section>
            <span class="font-mono">9:21</span>
        </div>
        <div class="inline-flex rounded-full px-4 my-1 w-[98%] h-[2rem] items-center justify-between">
            <section class="flex-1 space-x-5">
                <div class="inline-flex w-5 justify-center">
                    <span class="font-mono font-bold">III</span>
                </div>
                <span>Scherzo: Allegro</span>
            </section>
            <span class="font-mono">4:49</span>
        </div>
        <div class="inline-flex rounded-full px-4 my-1 w-[98%] h-[2rem] items-center justify-between">
            <section class="flex-1 space-x-5">
                <div class="inline-flex w-5 justify-center">
                    <span class="font-mono font-bold">IV</span>
                </div>
                <span>Finale: Allegro</span>
            </section>
            <span class="font-mono">8:43</span>
        </div>
    </div>
    
    <div class="grid grid-cols-1 rounded-[36px] bg-[#303030] -mt-3 w-[calc(100vw-5rem)] h-auto justify-center justify-items-center">
        <!-- Work -->
        <div class="inline-flex rounded-full bg-[#3c3c3c] px-9 w-full h-[3.25rem] items-center justify-between">
            <section class="inline-flex items-center justify-between space-x-5">
                <div class="size-[19.5px]">
                    <img src="../resources/arrow.svg" class="scale-150 mt-1 mr-8">
                </div>
                <span class="font-light text-[115%]">Symphony No. 9 • “Choral”</span>
                <div class="rounded-full bg-[#4c4c4c] px-3 py-1.5 font-light">Op. 125</div>
                <div class="rounded-full bg-[#4c4c4c] px-3 py-1.5 font-light">Herbert von Karajan • Berliner Philarmoniker ― 1984</div>
            </section>
            <span class="font-mono">01:06:25</span>
        </div>
    </div>
    <!-- add acts section and works section, add jetbrains font, edit work div padding, and make the damn ts to work right -->
</template>
