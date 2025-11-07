<template>
    <section class="bg-[#252525] font-fredoka select-none w-screen h-screen">
        <!-- Header -->
        <div class="bg-[url('./src/resources/musik.png')] h-50 bg-[center_-40rem] bg-cover bg-fixed">
            <div class="h-1/1 bg-gradient-to-t from-[#252525] to-transparent">
                <div class="pt-5 pl-8 pt-0">
                    <p class="font-semibold text-[3rem]">Ballade No. 1 in G Minor</p>
                    <p class="font-light text-[1.5rem] text-gray-300">Fréderic Chopin</p>
                    <p class="font-light text-[1.5rem] text-gray-300">Op. 23 • 1835 • 9 min</p>
                </div>
            </div>
        </div>

        <!-- Play button & Orchestra -->
        <div class="ml-8 -mt-5 mb-6 flex items-center gap-4">
            <div class="rounded-full size-[55px] flex justify-center items-center gap-2 
            cursor-pointer" 
            @click="musplay ^= 1">
                <div class="relative bg-[#18A0E4] rounded-full size-full text-[12px] flex justify-center items-center hover:bg-[#42aee4] play transition-[background] duration-400" :class="{pause : musplay}"></div>
            </div>
            <select class="rounded-full bg-[#4c4c4c] h-10 w-[270px] px-4 flex items-center font-light text-[16px] 
            transition-all duration-400 focus:bg-[#5c5c5c] hover:bg-[#5c5c5c]" v-model="orch">
                <option>Krystian Zimerman ― 1988</option>
                <option>Hans Zimmer ― 2017</option>
                <option>Herbert Richers ― 1989</option>
            </select>
        </div>

        <!-- Movements & About -->
        <section class="w-full grid grid-cols-1 justify-items-center gap-8">
            <div class="bg-[#303030] rounded-[34px] w-[calc(100vw-5rem)] h-[3.25rem] inline-flex justify-between items-center px-8">
                <div class="inline-flex items-center gap-8">
                    <div class="bg-white rounded-full size-[5px]"></div>
                    <span>Largo ― Moderato ― Presto con fuoco</span>
                </div>
                <span class="font-jetbrains text-[95%]">9:35</span>
            
            </div>

            <div class="grid grid-cols-1 rounded-[36px] bg-[#3c3c3c] py-6 px-12 w-[calc(100vw-5rem)] h-auto justify-center justify-items-center gap-3">
                <div class="inline-flex justify-left items-center w-full gap-3">                     
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="20" height="20" fill="url(#pattern0_100_17)"/>
                        <defs>
                        <pattern id="pattern0_100_17" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_100_17" transform="scale(0.0416667)"/>
                        </pattern>
                        <image id="image0_100_17" width="24" height="24" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnklEQVR4nO2UQQqDMBAA9wtFfEwvrb/w0D5FaI79QPsc8RO+wwq9KUwJKIZgpNjNoZC55TKzG0JEEiICVMALKGPIDQsjcI0ZsAwqmwDnjUinNbUJRCoNOYGI0ZTP3HdLv5DPFBJRfkvyP5JbgAx4BuT737kLkKvL7U8IHJ3zwdnk98mBB9B7kUzzWppp2jdwUpF6gRaop00u6oGErPAB71XiY9UE/xgAAAAASUVORK5CYII="/>
                        </defs>
                    </svg>
                    <p>About the piece</p>

                </div>
                <p class="overflow-hidden font-light transition-[max-height] duration-300 ease-in-out" :class="aboutexp ? 'max-h-96' : 'max-h-18'">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident quibusdam maxime aliquam debitis, eum ut recusandae deleniti corrupti velit, tempore sint quis. Aliquam, suscipit laudantium dicta ducimus quam error debitis nobis deserunt expedita. Eos itaque asperiores velit. Maiores et assumenda culpa voluptate fugit quam error vero quasi reiciendis. Sequi rem, vero ab aperiam aspernatur deserunt distinctio quaerat quis atque. Hic nobis consequatur suscipit quae, perferendis ipsa error. Quia laudantium eligendi magni minus praesentium fuga est sapiente quaerat. Sapiente enim aliquid quam, soluta sequi iure. Maxime eveniet sint ad obcaecati, cumque alias voluptate sapiente nemo tenetur eos illum ab modi esse laborum voluptatem nostrum placeat nulla iusto minima consectetur! Perferendis tempore ab repudiandae voluptates fugiat saepe quisquam aliquid, commodi nobis, illo vel. Dicta quo ad expedita impedit suscipit, quas eum, libero non vel blanditiis ipsa aliquam ipsum magni quam sint molestias iusto! Sint tempora incidunt natus quaerat similique obcaecati itaque omnis!
                </p>
                <div class="inline-flex w-full">
                    <button class="bg-[#616161] rounded-[26px] h-8 w-[106px] inline-flex justify-center items-center cursor-pointer hover:bg-[#717171] transition-[background] duration-400"
                    @click="aboutexp ^= 1">
                        Show&nbsp<span v-if="aboutexp">more</span><span v-else>less</span>
                    </button>
                </div>
                
            </div>
        </section>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    let aboutexp = ref(0)
    let musplay = ref(0)
    let orch = ref('Krystian Zimerman ― 1988')
</script>

<style>
    .play:before {
        content: "";
        position: absolute;
        right: 15px;
        height: 0;
        border-style: solid;
        border-width: 1em 0 1em 1.75em;
        border-color: transparent transparent transparent white; /* icon color */
        transition: .218s ease;
    }
    .pause:before {
        height: 2em;
        border-width: 0 0 0 1.5em;
        right: 18.5px
    }
    .play:after {
        content: "";
        position: absolute;
        background: inherit;
        width: 0;
        height: 2em;
        top: 1.3em;
        left: 2.05em;
        transition: .218s linear;
    }
    .pause:after { width: .5em }

    select, ::picker(select) { appearance: base-select }
    ::picker(select) {
        border-radius: 15px;
        border: none
    }
    select::picker-icon {
        content: url('data:image/svg+xml;utf8, <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L6.5 6L12.5 0.5" stroke="gray" stroke-linecap="round"/></svg>');
        transition: 0.4s rotate;
    }
    select:open::picker-icon {
        rotate: 180deg;
    }

    option {
        background: #4c4c4c;
        color: white;
        padding-block: 3px;
        transition: .4s
    }
    option:first-of-type { border-radius: 8px 8px 0 0 }
    option:last-of-type { border-radius: 0 0 8px 8px }
    option::checkmark {
        content: '';
    }
</style>