<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
</style>

<script setup lang="ts">
  import { ref } from "vue";

  const user = ref("Antônio");
  const logo = ref("");
  const config = ref("");
</script>

<template>
  <div class="bg-black flex flex-col w-full h-[97.5vh]">
    <header class="flex items-center justify-center m-4 h-10">
      <img class="cursor-pointer"src="./assets/logo.png" />

      <div class="flex-1"></div>

      <div class="flex items-center px-25 py-2 justify-center bg-[#3c3c3c] rounded-md cursor-pointer">
        <img class="mr-3 w-4" src="./assets/search.png" />
        <span class="text-white font-[Fredoka]">Search</span>
      </div>

      <div class="flex-1"></div>

      <div class="flex items-center justify-center cursor-pointer">
        <img class="mr-2 w-[25px]" src="./assets/config.png" />
        <div class="bg-[#85E014] size-10 text-lg rounded-full text-white font-bold flex items-center justify-center">A</div>
      </div>
    </header>

      <div class="box-border flex-1  flex">

        <div class="flex-1 bg-red-500 h-full m-2 rounded-md mt-0 ">
          <button class=" size-8 box-content md:box-border rounded-md bg-[#3c3c3c] cursor-pointer"><img class="mr-3 w-4 flex itens-center justify-center" src="./assets/home.png"></button>
          
        </div>

        <div class="flex-3 bg-blue-500 h-full m-2 rounded-md mt-0"></div>
      </div>
      
      <div class="h-10  bg-green-500 m-2 rounded-md  "></div>

  </div>
</template>
