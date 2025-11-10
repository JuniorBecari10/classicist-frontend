<template>
    <div class="relative h-110 bg-cover bg-center bg-[url('./src/assets/gif/orchestra.gif')]">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black"></div>
    </div>

    <header class="fixed top-3 flex justify-between items-center">
        <a href="/" class="fixed top-3 left-10" v-ripple>
            <img src="@/assets/images/logo.png" alt="Classicist logo" />
        </a>

        <nav class="fixed top-8 right-10 flex space-x-5">
            <a class="box-content bg-transparent px-3 py-2 rounded-md !font-oldstd cursor-pointer">
                Login
            </a>
            <a class="box-content bg-white px-3 py-2 rounded-md text-black !font-oldstd cursor-pointer">
                Sign Up
            </a>
        </nav>
    </header>

    <section class="absolute top-60 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center">
        <h1 class="text-[40px] w-90 !font-oldstd leading-13">
            The next-level classical music app.
        </h1>
        <p class="text-[24px] !font-oldstd mt-2">
            Discover a new way to listen to classical music.
        </p>

        <div class="flex flex-col items-center mt-15 space-y-5">
            <a href="/login" class="text-[20px] box-content bg-white px-10 py-3 rounded-md text-black !font-oldstd cursor-pointer" v-ripple>
                Listen now
            </a>
            <a href="#infos"
                class="text-[20px] box-content bg-transparent px-15 py-2 rounded-md border-2 border-white !font-oldstd" v-ripple>
                See what Classicist offers
            </a>
        </div>
    </section>

    <section id="infos" class="w-full mt-[350px] flex flex-col items-center text-center">
        <div class="flex items-center justify-center my-20">
            <div class="bg-white h-1 w-110"></div>
            <p class="text-[24px] w-[50%] !font-oldstd mx-5">What makes Classicist great?</p>
            <div class="bg-white h-1 w-110"></div>
        </div>

        <div class="flex items-center justify-center mt-40">
            <img src="@/assets/images/eighth.png" class="size-[170px] mb-35 mr-15" alt="Musical note" />
            <div class="text-left">
                <h2 class="text-[48px] !font-oldstd w-90 leading-none">Structural redefinement.</h2>
                <p class="text-[24px] !font-oldstd w-130 mt-5">
                    Classicist redefines what classical music streaming is, presenting it the historically and musically correct way.
                </p>
            </div>
        </div>

        <div class="flex items-center justify-center mt-20">
            <img src="@/assets/images/glass.png" class="size-[170px] mb-25 mr-15" alt="Magnifying glass" />
            <div class="text-left">
                <h2 class="text-[48px] !font-oldstd w-100 leading-none">Musically accurate search engine.</h2>
                <p class="text-[24px] !font-oldstd w-130 mt-5">
                    Classicist includes a powerful search engine specifically focused on musical form and key.
                </p>
            </div>
        </div>

        <div class="flex items-center justify-center mt-20">
            <img src="@/assets/images/treble.png" class="size-[170px] mb-40 mr-15" alt="Treble clef" />
            <div class="text-left">
                <h2 class="text-[48px] !font-oldstd w-110 leading-none">First-class sheet music visualization.</h2>
                <p class="text-[24px] !font-oldstd w-125 mt-5">
                    Classicist allows users to view sheet music for every piece, enabling musical analysis and appreciation.
                </p>
            </div>
        </div>

        <p class="text-[24px] !font-oldstd text-center mt-40">
            What are you waiting for?
        </p>

        <a href="/login" class="text-[20px] box-content bg-white px-10 py-3 rounded-md text-black !font-oldstd mt-10 cursor-pointer">
            Listen now
        </a>
    </section>

    <!-- Footer (optional placeholder for later expansion) -->
    <footer class="mt-40 w-full flex flex-col justify-center items-center h-50">
        <img src="@/assets/images/logo.png" alt="Classicist logo" />
        <p class="!font-oldstd mt-8 text-lg">Copyright © 2025 Classicist. All rights reserved.</p>
    </footer>
</template>
