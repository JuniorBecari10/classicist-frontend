<template>
    <div class="flex-3 bg-blue-500 h-full m-2 rounded-xl mt-0 flex flex-col">
        <div>
            <h1 class="m-6 ml-8 text-[32px] font-bold font-fredoka">Welcome back, Antônio!</h1>
            <p class="ml-8 mt-6 text-[15px] font-fredoka text-[fgray]">Recommended for you</p>
        </div>

        <!-- Recommended works images -->
        <div class="flex flex-wrap ml-8 mt-2 gap-2">
            <button class="cursor-pointer"><img class="rounded-md size-45" src="./assets/img1.png" /></button>
            <button class="cursor-pointer"><img class="rounded-md size-45" src="./assets/img2.png" /></button>
            <button class="cursor-pointer"><img class="rounded-md size-45" src="./assets/img3.png" /></button>
            <button class="cursor-pointer"><img class="rounded-md size-45" src="./assets/img1.png" /></button>
            <button class="cursor-pointer"><img class="rounded-md size-45" src="./assets/img2.png" /></button>
            <button class="cursor-pointer"><img class="rounded-md size-45" src="./assets/img3.png" /></button>
        </div>

        <!-- Suggested works list -->
        <div>
            <p class="ml-8 mt-10 text-[15px] font-fredoka text-[fgray]">We think you might like these...</p>
            <button class="flex items-center ml-8 mt-4 bg-fg-lighter rounded-md p-2">
                <img class="rounded-md size-10 ml-6 mt-2" src="./assets/img1.png" />
                <div class="ml-4 flex-1 text-left">
                    <p class="font-bold font-fredoka">Symphony No. 5 in C Minor</p>
                    <p>Ludwig van Beethoven | Herbert von Karajan - Berliner Philharmon</p>
                </div>
            </button>
        </div>

        <!-- Grid of works -->
        <div class="grid grid-cols-2 gap-2 ml-8 mt-4">
            <button class="hover:brightness-120 flex items-center justify-center p-3 bg-fg-lighter rounded-md">
                <img class="rounded-md size-10" src="./assets/img1.png" />
                <div class="flex-1 ml-2">
                    <p class="text-[15px] font-semibold font-fredoka">Symphony No. 5 in C Minor</p>
                    <p class="text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philharmon</p>
                </div>
            </button>
            <button class="hover:brightness-120 flex items-center justify-center p-3 bg-fg-lighter rounded-md">
                <img class="rounded-md size-10" src="./assets/img2.png" />
                <div class="flex-1 ml-2">
                    <p class="text-[15px] font-semibold font-fredoka">Symphony No. 6 in F Major</p>
                    <p class="text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philharmon</p>
                </div>
            </button>
            <button class="hover:brightness-120 flex items-center justify-center p-3 bg-fg-lighter rounded-md">
                <img class="rounded-md size-10" src="./assets/img3.png" />
                <div class="flex-1 ml-2">
                    <p class="text-[15px] font-semibold font-fredoka">Symphony No. 7 in A Major</p>
                    <p class="text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philharmon</p>
                </div>
            </button>
            <button class="hover:brightness-120 flex items-center justify-center p-3 bg-fg-lighter rounded-md">
                <img class="rounded-md size-10" src="./assets/img1.png" />
                <div class="flex-1 ml-2">
                    <p class="text-[15px] font-semibold font-fredoka">Symphony No. 8 in F Major</p>
                    <p class="text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philharmon</p>
                </div>
            </button>
        </div>
    </div>
</template>
