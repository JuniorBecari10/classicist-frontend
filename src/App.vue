<script setup lang="ts">
    import Player from "./components/player/Player.vue";
    import { ref } from "vue";

    const user = ref("Antônio");
    const logo = ref("");
    const config = ref("");
</script>

<template>
  <div class="bg-black flex flex-col w-full h-[97.5vh]">
    <header class="flex items-center justify-center m-4 h-10">
      <img class="cursor-pointer" src="./assets/logo.png" />

      <div class="flex-1"></div>

      <div class="hover:brightness-120 flex items-center px-25 py-2 justify-center bg-[#3c3c3c] rounded-md cursor-pointer">
        <img class="mr-3 w-4" src="./assets/search.png" />
        <span class="text-white font-[Fredoka]">Search</span>
      </div>

      <div class="flex-1"></div>

      <div class="hover:brightness-120 flex items-center justify-center cursor-pointer">
        <div class="bg-[#85E014] size-10 text-lg rounded-full text-white font-bold flex items-center justify-center">A
        </div>
      </div>
    </header>

    <div class="box-border flex-1 flex">
      <div  class="flex-1 items-center justify-center bg-[#252525] h-full m-2 rounded-xl mt-0">
        <div class="flex p-2">
            <button class="hover:brightness-120 m-2 size-10 box-content md:box-border rounded-md bg-[#3c3c3c] cursor-pointer"><img class="mr-3 w-4 ml-3 flex items-center justify-center" src="./assets/home.png"/></button>
            <button class="hover:brightness-120 flex-1 h-10 mt-2 mr-2 items-center justify-center flex bg-[#3c3c3c] rounded-md cursor-pointer"><img class="mr-3 size-5" src="./assets/search.png" /><span class="whitespace-nowrap">Search your library</span></button>
        </div>
        <div class="ml-4 flex-1 items-center justify-center">
            <button class="hover:brightness-120 flex-1 px-5 h-8 bg-[#3c3c3c] rounded-md cursor-pointer">Works</button>
            <button class="hover:brightness-120 ml-2 flex-1 px-5 h-8 bg-[#3c3c3c] rounded-md cursor-pointer">Composers</button>
            <button class="hover:brightness-120 ml-2 flex-1 px-5 h-8 bg-[#3c3c3c] rounded-md cursor-pointer">Performer</button>
        </div>
        <div class="m-4 p-2 rounded-md hover:bg-[#3c3c3c] mt-10 flex-1 items-center justify-center">
            <button class=" flex-1 px-5 h-8 rounded-md cursor-pointer">
                <p class="font-semibold font-fredoka">Symphony No. 7</p>
                <p class="text-[11px] text-[fgray] font-fredoka">Ludwig van Beethoven</p>
            </button>
        </div>
      </div>

      <div class="flex-2 bg-blue-500 h-full m-2 rounded-xl mt-0 p-4">
        <div>
          <h1 class=" text-[32px] font-semibold font-fredoka">
            Welcome back, Antônio!
          </h1>
          <p class=" mt-10 text-[15px] font-fredoka text-[fgray]">
            Recommended for you
          </p>
        </div>

        <div>
          <button class="hover:brightness-120 cursor-pointer">
            <img class=" mt-2 rounded-md size-45" src="./assets/img1.png" />
          </button>
          <button class="hover:brightness-120 cursor-pointer">
            <img class="ml-8 mt-2 rounded-md size-45" src="./assets/img2.png" />
          </button>
          <button class="hover:brightness-120 cursor-pointer">
            <img class="ml-8 mt-2 rounded-md size-45" src="./assets/img3.png" />
          </button>
          <button class="hover:brightness-120 cursor-pointer">
            <img class="ml-8 mt-2 rounded-md size-45" src="./assets/img1.png" />
          </button>
        </div>

        <div>
          <p class=" mt-10 text-[15px] font-fredoka text-[fgray]">
            We think you might like these...
          </p>
          <div class="grid-rows-2 grid-cols-2 grid gap-2">
              <button class="hover:brightness-120 flex-1 flex items-center justify-center  mt-4 p-3 bg-[#3c3c3c] rounded-md">
                    <img class="rounded-md size-10" src="./assets/img1.png" />
                <div class="flex-1">
                  <p class="flex ml-2 text-[15px] font-semibold font-fredoka">Symphony No. 5 in C Minor</p>
                  <p class="flex ml-2 text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philarmon</p>
                </div>
              </button>
              <button class="hover:brightness-120 flex-1 flex items-center justify-center  mt-4 p-3 bg-[#3c3c3c] rounded-md">
                    <img class="rounded-md size-10" src="./assets/img1.png" />
                <div class="flex-1">
                  <p class="flex ml-2 text-[15px] font-semibold font-fredoka">Symphony No. 5 in C Minor</p>
                  <p class="flex ml-2 text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philarmon</p>
                </div>
              </button>
              <button class="hover:brightness-120 flex-1 flex items-center justify-center  mt-4 p-3 bg-[#3c3c3c] rounded-md">
                    <img class="rounded-md size-10" src="./assets/img1.png" />
                <div class="flex-1">
                  <p class="flex ml-2 text-[15px] font-semibold font-fredoka">Symphony No. 5 in C Minor</p>
                  <p class="flex ml-2 text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philarmon</p>
                </div>
              </button>
              <button class="hover:brightness-120 flex-1 flex items-center justify-center  mt-4 p-3 bg-[#3c3c3c] rounded-md">
                    <img class="rounded-md size-10" src="./assets/img1.png" />
                <div class="flex-1">
                  <p class="flex ml-2 text-[15px] font-semibold font-fredoka">Symphony No. 5 in C Minor</p>
                  <p class="flex ml-2 text-[11px]">Ludwig van Beethoven | Herbert von Karajan - Berliner Philarmon</p>
                </div>
              </button>
          </div>
        </div>
      </div>
    </div>
        <Player />
  </div>
</template>
