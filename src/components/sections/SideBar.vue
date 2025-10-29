<script setup lang="ts">
    import Button from "../util/Button.vue";
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-fg h-full rounded-xl">
        <div class="flex p-2 w-full">
            <Button :noPadding="true">
                <div class="bg-fg-lighter size-10 rounded-md flex justify-center items-center">
                    <img class="w-4" src="@/assets/images/home.png" />
                </div>
            </Button>

            <button class="hover:brightness-120 flex-1 h-10 mt-2 mr-2 flex items-center justify-center bg-fg-lighter rounded-md cursor-pointer">
                <img class="mr-3 size-5" src="@/assets/images/search.png" />
                <span class="whitespace-nowrap">Search your library</span>
            </button>
        </div>

        <div class="ml-4 flex-1 flex items-center justify-center w-full">
            <button class="hover:brightness-120 flex-1 px-5 h-8 bg-fg-lighter rounded-md cursor-pointer">Works</button>
            <button class="hover:brightness-120 ml-2 flex-1 px-5 h-8 bg-fg-lighter rounded-md cursor-pointer">Composers</button>
            <button class="hover:brightness-120 ml-2 flex-1 px-5 h-8 bg-fg-lighter rounded-md cursor-pointer">Performer</button>
        </div>

        <div class="m-4 p-2 rounded-md hover:bg-fg-lighter mt-10 flex-1 w-full">
            <button class="flex-1 px-5 h-8 rounded-md cursor-pointer text-left">
                <p class="font-semibold font-fredoka">Symphony No. 7</p>
                <p class="text-[11px] text-fgray font-fredoka">Ludwig van Beethoven</p>
            </button>
        </div>
    </div>
</template>
