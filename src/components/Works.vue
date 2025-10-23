<template>
    <div class="grid grid-cols-1 rounded-[24px] bg-[#303030] w-[calc(100vw-5rem)] h-auto justify-center justify-items-center" :class="{'pb-2': !hidden}">
        <!-- Work -->
        <div class="works" :class="{'mb-3': !hidden}" @click.self="flipWork">
            <section class="inline-flex items-center justify-between space-x-5">

                <svg class="scale-150 mr-8 ml-1 transition rotate delay-0.4" :class="hidden ? '' : 'rotate-90'" width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12L6 6.5L1 1" :stroke="hidden ? 'white' : '#18a0e4'" :stroke-width="hidden ? '1px' : '2px'" stroke-linecap="round"/>
                </svg>

                <span class="text-[115%]" :class="hidden ? 'font-light' : 'font-semibold text-[#18a0e4]'" @click.self="flipWork">Symphony No. 5</span>
                <div class="rounded-full bg-[#4c4c4c] px-3 py-1.5 font-light">Op. 67</div>
                <select v-model="performance" class="rounded-full bg-[#4c4c4c] px-3 py-1.5 font-light">
                    <option class="">
                        <span>Herbert von Karajan • Berliner Philarmoniker ― 1984</span>
                    </option>
                    <option class="">
                        <span>Claudio Abbado • Wiener Philarmoniker ― 1978</span>
                    </option>
                    <option class="">
                        <span>Herbert Richers • São Paulo ― 1996</span>
                    </option>
                </select>
            </section>
            <span class="font-jetbrains mt-0.5" :class="hidden ? 'font-light' : 'font-extrabold text-[#18a0e4]'">37:38</span>
        </div>

        <!-- Acts -->
        <section class="grid grid-cols-1 w-full justify-items-center" v-show="!hidden">            
            <div class="acts">
                <section class="flex-1 space-x-5">
                    <div class="inline-flex w-5 justify-center">
                        <span class="font-jetbrains font-extrabold text-[#18a0e4]">I</span>
                    </div>
                    <span class="font-semibold text-[#18a0e4]">Allegro com brio</span>
                </section>
                <span class="font-jetbrains font-extrabold text-[#18a0e4]">7:22</span>
            </div>
            <div class="acts">
                <section class="flex-1 space-x-5">
                    <div class="inline-flex w-5 justify-center">
                        <span class="font-jetbrains font-light">II</span>
                    </div>
                    <span>Andante con moto</span>
                </section>
                <span class="font-jetbrains font-light">9:21</span>
            </div>
            <div class="acts">
                <section class="flex-1 space-x-5">
                    <div class="inline-flex w-5 justify-center">
                        <span class="font-jetbrains font-light">III</span>
                    </div>
                    <span>Scherzo: Allegro</span>
                </section>
                <span class="font-jetbrains font-light">4:49</span>
            </div>
            <div class="acts">
                <section class="flex-1 space-x-5">
                    <div class="inline-flex w-5 justify-center">
                        <span class="font-jetbrains font-light">IV</span>
                    </div>
                    <span>Finale: Allegro</span>
                </section>
                <span class="font-jetbrains font-light">8:43</span>
            </div>
        </section>
    </div>
    <!-- 
    <div class="grid grid-cols-1 rounded-[36px] bg-[#303030] -mt-3 w-[calc(100vw-5rem)] h-auto justify-center justify-items-center">
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
    -->
</template>

<script setup lang = "ts">
    import { ref } from 'vue';
    let hidden = ref(0)
    const flipWork = () => hidden.value ^= 1
    let performance = 'Herbert von Karajan • Berliner Philarmoniker ― 1984'
    
</script>

<style>
    .works {
        display: inline-flex;
        border-radius: 36px;
        background: #3c3c3c;
        padding-left: 32px;
        padding-right: 2%;
        width: 100%;
        height: 3.25rem;
        align-items: center;
        justify-content: space-between;
        transition: background 2s ease-in-out;
    }
    .works:hover {
        background: #ffffff;
        cursor: pointer;
    }
    .acts {
        display: inline-flex;
        border-radius: calc(infinity * 1px);
        padding-left: 19.5px;
        padding-right: 1%;
        margin-block: 4px;
        width: 98%;
        height: 2rem;
        align-items: center;
        justify-content: center;
    }
    .acts:hover {
        background: #3c3c3c;
    }
</style>

