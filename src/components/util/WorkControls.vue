<script setup lang="ts">
    import { ref } from "vue";
    import RecordingSelect from "../util/RecordingSelect.vue";

    const selectedId = defineModel<number | null>({ default: null });
    const props = defineProps<{
        recs: Recording[];
    }>();

    const paused = ref(false);
</script>

<template>
    <div class="ml-6 -mt-12 mb-6 flex items-center gap-4">
        <div class="rounded-full size-[55px] flex justify-center items-center gap-2 cursor-pointer" @click="paused = !paused" v-ripple>
            <div class="
                relative bg-[#18A0E4] rounded-full size-full text-[12px] flex justify-center items-center
                hover:bg-[#42aee4] play transition-[background] duration-400" :class="{pause: paused}"
            />
        </div>

        <RecordingSelect :recs="props.recs" v-model="selectedId" />
    </div>
</template>

<style scoped>
    .play:before {
        content: "";
        position: absolute;
        right: 15px;
        height: 0;
        border-style: solid;
        border-width: 1em 0 1em 1.75em;
        border-color: transparent transparent transparent white; /* icon color */
        transition: .218s ease;
    }
    
    .pause:before {
        height: 2em;
        border-width: 0 0 0 1.5em;
        right: 18.5px
    }
    
    .play:after {
        content: "";
        position: absolute;
        background: inherit;
        width: 0;
        height: 2em;
        top: 1.3em;
        left: 2.05em;
        transition: .218s linear;
    }
    
    .pause:after {
        width: .5em;
    }
</style>
