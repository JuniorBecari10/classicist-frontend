<script setup lang="ts">
    import { ref } from "vue";
    import Current from "./Current.vue";

    const workTitle = ref({
        kind: "Symphony",
        number: 5,
        nickname: "Fate",
    } satisfies WorkTitle);

    const displayWork = ref({
        title: workTitle.value,
        movement: "Allegro con brio",
    } satisfies DisplayWork);

    const performers = ref<Performer[]>([
        {
          name: "Herbert von Karajan",
        },
    ]);
</script>

<template>
    <div class="w-full p-5">
        <div class="w-full h-20 bg-fg rounded-lg">
            <Current
                :work="displayWork"
                :composer="{ name: 'Ludwig van Beethoven' }"
                :performers="performers"
            />
        </div>
    </div>
</template>
