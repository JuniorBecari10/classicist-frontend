<template>
    <section class="bg-[#252525] font-fredoka select-none w-screen h-screen">
        <div class="bg-[url('./src/resources/musik.png')] h-50 bg-[center_-40rem] bg-cover bg-fixed">
            <div class="h-1/1 bg-gradient-to-t from-[#252525] to-transparent">
                <div class="pt-5 pl-8 pt-0">
                    <p class="font-semibold text-[3rem]">Ballade No. 1 in G Minor</p>
                    <p class="font-light text-[1.5rem] text-gray-300">Fréderic Chopin</p>
                    <p class="font-light text-[1.5rem] text-gray-300">Op. 23 • 1835 • 9 min</p>
                    <div class="mt-4 flex items-center gap-5">
                        <div class="bg-[#18A0E4] rounded-full size-[55px]"></div>
                        <select class="rounded-full bg-[#4c4c4c] h-[32px] w-[260px] font-light">
                            <option class="">
                                <span>Krystian Zimerman ― 1988</span>
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 rounded-[24px] bg-[#303030] w-[calc(100vw-5rem)] h-auto justify-center justify-items-center" :class="{'pb-2': !hidden}"></div>
    </section>
</template>

<script>

</script>