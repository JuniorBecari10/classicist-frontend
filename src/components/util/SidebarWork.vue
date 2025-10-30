<script setup lang="ts">
    const props = defineProps<{
        name: string;
        composer: string;
    }>();
</script>

<template>
    <div class="p-2 rounded-md hover:bg-fg-lighter flex-1 w-[96%] m-2">
        <button class="flex-1 h-8 rounded-md cursor-pointer text-left" v-ripple>
            <p class="font-semibold font-fredoka">{{ props.name }}</p>
            <p class="text-[11px] text-fgray font-fredoka">{{ props.composer }}</p>
        </button>
    </div>
</template>
