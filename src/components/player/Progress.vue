<script setup lang="ts">
    import { convertFormatTime } from "@/util/format.ts";
    import { ref } from "vue";

    const props = defineProps<{
        length: number; // in seconds
    }>();

    const current = ref(0);
</script>

<template>
    <div class="flex-1 h-full flex flex-col justify-center items-center mx-4">
        <div class="w-full h-1/2 flex justify-center">
            <div class="flex w-1/5 h-full justify-evenly items-center">
                <button>
                    <img src="@/assets/images/back.png">
                </button>
                <button>
                    <img src="@/assets/images/pause.png">
                </button>
                <button>
                    <img src="@/assets/images/forward.png">
                </button>
            </div>
        </div>
        <div class="w-full h-1/3 flex items-center">
            <span class="text-fgray font-jetbrains text-sm">{{ convertFormatTime(current) }}</span>
            <div class="w-full h-1.5 rounded-full bg-white mx-3"></div>
            <span class="text-fgray font-jetbrains text-sm">{{ convertFormatTime(props.length) }}</span>
        </div>
    </div>
</template>
