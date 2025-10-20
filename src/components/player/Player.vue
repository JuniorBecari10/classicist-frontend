<script setup lang="ts">
    import { ref } from "vue";
    import Current from "./Current.vue";
    import Progress from "./Progress.vue";
    import Controls from "./Controls.vue";

    const workTitle = ref({
        kind: "Symphony",
        number: 5,
        nickname: "Fate",
    } satisfies WorkTitle);

    const displayWork = ref({
        title: workTitle.value,
        movement: "Allegro con brio",
        mov_num: 1,
    } satisfies DisplayWork);

    const performers = ref<Performer[]>([
        {
          name: "Herbert von Karajan",
        },
    ]);
</script>

<template>
    <div class="w-full p-5">
        <div class="w-full h-22 bg-fg rounded-lg flex items-center">
            <Current
                :work="displayWork"
                :composer="{ name: 'Ludwig van Beethoven' }"
                :performers="performers"
                 imageName="image.png"
            />
            <Progress
                :length="320"
            />

            <Controls />
        </div>
    </div>
</template>
