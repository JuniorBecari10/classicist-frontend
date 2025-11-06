<script setup lang="ts">
</script>
<template>
  <div class="bg-[url('./src/assets/landing-page-gif.gif')] h-50 bg-cover bg-center "></div>
  <div class="absolute left-0 top-0 w-full h-50 bg-linear-to-t from-black via-transparent to-black"></div>
  <img src="./assets/inconeC.png" class="absolute top-3 left-3 fixed"></img>
  <div class="absolute top-3 right-3 fixed ">
    <a class=" box-conten bg-transparent px-2 pt-1 pb-2 rounded-md mr-3  font-[Old_Standard_TT]">Login</a>
    <a class=" box-content bg-white px-2 pt-1 pb-2 rounded-md text-black font-[Old_Standard_TT]">Sign Up</a>
  </div>
  <div class="absolute top-30 ml-[50%] -translate-x-1/2 flex flex-col justify-start items-center">
    <h1 class="text-[40px] text-wrap w-90 text-center font-[Old_Standard_TT] leading-13 ">The next-level classical music app.</h1>
    <p  class="text-[24px] text-nowrap    text-center font-[Old_Standard_TT]">Discover a new way to listen to classical music.</p>
    <a  class="text-[20px] box-conten bg-white px-10 pt-3 pb-3 rounded-md text-black font-[Old_Standard_TT] mt-25">Listen now</a>
    <a href="#infos"  class="text-[20px] box-conten bg-transparent px-15 pt-1 pb-2 rounded-md border-2 border-white font-[Old_Standard_TT] mt-5">See what Classicist offers</a>
    <div class="w-full" id="infos">
      <div class="mt-40 flex items-center justify-center">
        <div class="bg-white h-1 w-100"></div>
        <p class="text-[24px] w-[50%] font-[Old_Standard_TT] mx-15 text-center">What makes Classicist great?</p>
        <div class="bg-white h-1 w-100"></div>
      </div>
    </div>
  </div>
  
</template>
