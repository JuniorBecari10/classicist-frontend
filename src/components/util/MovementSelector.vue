<script setup lang="ts">
    import { formatMovement, convertFormatTime, toRoman } from "@/util/format.ts";
    import { usePlayerStore } from "@/stores/player.ts";

    const props = defineProps<{
        work: Work,
        rec: Recording;
    }>();

    const player = usePlayerStore();
    const oneMov = props.work.movements.length === 1;

    function play(index: number) {
        player.clear();
        player.addRecording(props.rec);
        player.setMovIndex(index);
        player.setPlaying(true);
    }
</script>

<template>
    <div class="w-full grid grid-cols-1 justify-items-center gap-4 px-4">
        <div class="bg-fg-lighter w-full p-4"
                :style="{
                    borderRadius: oneMov ? 'calc(infinity * 1px)' : '1.5rem',
                    padding: oneMov ? '0.6rem' : '1rem',
                }">
            <div
                class="rounded-full w-full flex justify-start items-center p-3 pl-4 pr-6
                       hover:bg-fg-more-lighter cursor-pointer transition-[background] duration-200"
                v-for="mov, index in props.work.movements" v-ripple @click="play(index)">
                <div class="w-8 mr-5 flex items-center justify-center">
                    <div v-if="oneMov" class="bg-white rounded-full size-[7px] mt-0.5"></div>
                    <div v-else class="!font-jetbrains text-center text-[1rem]">{{ toRoman(index + 1) }}</div>
                </div>

                <span class="flex-1">{{ formatMovement(mov) }}</span>
                <span class="!font-jetbrains text-[1rem]">{{ convertFormatTime(rec.movements[index].audio_file.duration) }}</span>
            </div>
        </div>
    </div>
</template>
