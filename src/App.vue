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
  <div class="bg-black flex flex-col w-full h-screen">
    <header class="flex items-center justify-center m-4 h-10">
      <img src="./assets/logo.png" />

      <div class="flex-1"></div>

      <div class="flex items-center px-25 py-2 justify-center bg-[#3c3c3c] rounded-md">
        <img class="mr-3 w-4" src="./assets/search.png" />
        <span class="text-white font-[Fredoka]">Search</span>
      </div>

      <div class="flex-1"></div>

      <div class="flex items-center justify-center">
        <img class="mr-4 w-[25px]" src="./assets/config.png" />
        <div class="bg-[#85E014] size-10 text-lg rounded-full text-white font-bold flex items-center justify-center">A</div>
      </div>
    </header>

      <div class="box-border flex-1  flex">

        <div class="w-1/3 bg-red-500 h-full m-2 rounded-md mt-0 ">
          <div class=""><img class="mr-3 w-4" src="./assets/home.png"></div>
          
        </div>

        <div class="w-full bg-blue-500 h-full m-2 rounded-md mt-0"></div>
      </div>
      
      <div class="w-full h-10 bg-green-500 m-2 rounded-md "></div>

  </div>
</template>
