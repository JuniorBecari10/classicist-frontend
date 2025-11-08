<script setup lang="ts">
</script>
<template>
  <div class="bg-[url('./src/assets/landing-page-gif.gif')] h-50 bg-cover bg-center "></div>
  <div class="absolute left-0 top-0 w-full h-50 bg-linear-to-t from-black via-transparent to-black"></div>
  <img src="./assets/inconeC.png" class="absolute top-3 left-3 fixed"></img>
  <div class="absolute top-3 right-3 fixed ">
    <a class=" box-conten bg-transparent px-2 pt-2 pb-2 rounded-md mr-3  font-oldstd">Login</a>
    <a class=" box-content bg-white px-2 pt-2 pb-2 rounded-md text-black font-oldstd">Sign Up</a>
  </div>
  <div class="absolute top-30 ml-[50%] -translate-x-1/2 flex flex-col justify-start items-center">
    <h1 class="text-[40px] text-wrap w-90 text-center font-oldstd leading-13 ">The next-level classical music app.</h1>
    <p  class="text-[24px] text-nowrap    text-center font-oldstd">Discover a new way to listen to classical music.</p>
    <a  class="text-[20px] box-conten bg-white px-10 pt-3 pb-3 rounded-md text-black font-oldstd mt-25">Listen now</a>
    <a href="#infos"  class="text-[20px] box-conten bg-transparent px-15 pt-1 pb-2 rounded-md border-2 border-white font-oldstd mt-5">See what Classicist offers</a>
    <div class="w-full" id="infos">
      <div class="mt-40 flex items-center justify-center">
        <div class="bg-white h-1 w-110"></div>
        <p class="text-[24px] w-[50%] font-oldstd mx-5 text-center">What makes Classicist great?</p>
        <div class="bg-white h-1 w-110"></div>
      </div>
      <div class="flex items-center justify-center mt-40">
        <img src="./assets/NotaMusical.png" class="size-[170px] mb-35 mr-15"></img>
        <div class="">
          <h1 class="text-[48px] font-oldstd text-wrap w-90 leading-none">Structural redefinement.</h1>
          <p  class="text-[24px] font-oldstd text-wrap w-130 mt-5">Classicist redefines what classical music streaming is, with the historically and musically correct way to present them.</p>
        </div>
      </div>
      <div class="flex items-center justify-center mt-20">
        <img src="./assets/Lupa.png" class="size-[170px] mb-25 mr-15"></img>
        <div class="">
          <h1 class="text-[48px] font-oldstd text-wrap w-100 leading-none">Musically accurate search engine.</h1>
          <p  class="text-[24px] font-oldstd text-wrap w-130 mt-5">Classicist has a powerful search engine, especifically focused on form and keys.</p>
        </div>
      </div>
      <div class="flex items-center justify-center mt-20">
        <img src="./assets/ClavaDeSol.png" class="size-[170px] mb-40 mr-15"></img>
        <div class="">
          <h1 class="text-[48px] font-oldstd text-wrap w-110 leading-none">First-class sheet music visualization.</h1>
          <p  class="text-[24px] font-oldstd text-wrap w-125 mt-5">Classicist allows you to visualize the sheet music of all pieces, allowing the user to analyze and even appreciate how the piece was beautifully written.</p>
        </div>
      </div>
      <p class="text-[24px] font-oldstd  text-center mt-40">What are you waiting for?</p>
    </div>
    <a  class="text-[20px] box-conten bg-white px-10 pt-3 pb-3 rounded-md text-black font-oldstd mt-25">Listen now</a>
  </div>
  
</template>
