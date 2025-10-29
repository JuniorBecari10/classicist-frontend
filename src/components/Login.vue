<template>
    <section class="w-screen h-screen flex flex-col justify-between items-center font-oldstd font-400 text-[#7d7d7d] text-[23px] select-none scl">
        
        <svg width="70" height="102" viewBox="0 0 35 51" fill="none" xmlns="http://www.w3.org/2000/svg" 
        class="">
            <path d="M17.568 42.864C14.592 42.864 12.032 42 9.888 40.272C7.744 38.544 6.112 36.288 4.992 33.504C3.904 30.688 3.36 27.728 3.36 24.624C3.36 21.392 3.904 18.432 4.992 15.744C6.08 13.056 7.632 10.928 9.648 9.36C11.664 7.76 14.016 6.96 16.704 6.96C18.112 6.96 19.44 7.28 20.688 7.92C21.936 8.56 22.96 9.248 23.76 9.984C24.528 10.688 25.04 11.04 25.296 11.04C25.552 11.04 25.728 10.96 25.824 10.8C25.952 10.64 26.08 10.384 26.208 10.032L27.12 7.344H28.32L28.512 22.224H27.168C26.464 19.184 25.552 16.64 24.432 14.592C23.312 12.512 22.08 10.976 20.736 9.984C19.424 8.992 18.112 8.496 16.8 8.496C13.76 8.496 11.6 9.872 10.32 12.624C9.072 15.376 8.448 19.376 8.448 24.624C8.448 30.032 9.104 34.176 10.416 37.056C11.728 39.904 14.112 41.328 17.568 41.328C20.64 41.328 22.976 40.192 24.576 37.92C26.208 35.616 27.136 32.832 27.36 29.568H29.088C28.992 31.456 28.592 33.408 27.888 35.424C27.216 37.44 26.032 39.184 24.336 40.656C22.64 42.128 20.384 42.864 17.568 42.864Z" fill="white"/>
            <line x1="10.5" y1="10" x2="10.5" y2="38" stroke="white"/>
            <line x1="12.5" y1="9" x2="12.5" y2="41" stroke="white"/>
            <line x1="14.5" y1="8" x2="14.5" y2="42" stroke="white"/>
            <line x1="16.5" y1="7" x2="16.5" y2="42" stroke="white"/>
        </svg>

        <div class="bg-[#252525] rounded-[34px] px-20 py-10 gap-10 grid cols-1 justify-center items-center justify-items-center">
            <div class="bg-[#333] rounded-[16px] flex gap-12 px-15 py-4 items-center relative">
                <!-- <span class="bg-white rounded-[7px] absolute w-28 h-10 left-[30px] z-0" :class="'left-' + (!option ? '[25px]' : '[144px]')"></span> --> 
                <button class="z-10" :disabled="!option" @click="chgopt" :class="{sel: !option}">Login</button>
                <button class="pl-1 z-10" :disabled="option" @click="chgopt" :class="{sel: option}">Sign Up</button>              
            </div>
            <form class="bg-[#252525] grid gap-6 justify-items-center text-[#a3a3a3]">
                <input type="text" placeholder="Username" required>
                <input type="text" placeholder="Password" required>
                <input type="text" placeholder="Confirm Password" required>
            </form>
            <button class="bg-white rounded-[7px] flex text-black px-10 py-3 justify-center">
                Sign Up
            </button>
        </div>
    </section>
</template>

<script setup lang = "ts">
    import { ref } from 'vue';

    const option: boolean = ref(false)
    const chgopt =(): void => option.value ^= 1
</script>

<style>
    input {
        background: #4b4b4b;
        border-radius: 12px;
        padding-left: 2rem;
        padding-block: 13px;
        width: 550px;
    }
    .scl {
        scale: 90%;
    }
    .sel {
        color: black;
    }
    button:hover {cursor: pointer}
    button:disabled {cursor: default}
    
</style>