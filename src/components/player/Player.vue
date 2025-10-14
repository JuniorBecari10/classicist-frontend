<script setup lang="ts">
    import { ref, computed } from "vue";
    import Current from "./Current.vue";
    import { Option } from "@/model/option.ts";

    const workTitle = ref({
        kind: "Symphony",
        number: Option.some(5),
        nickname: Option.none(),
    } satisfies WorkTitle);

    const displayWork = computed(() => ({
        title: workTitle.value,
        movement: "Allegro con brio",
    } satisfies DisplayWork));

    const performers = ref<Performer[]>([
        {
          id: 0,
          name: "Herbert von Karajan",
        },
    ]);
</script>

<template>
    <div class="w-full p-5">
        <div class="w-full h-20 bg-fg rounded-lg">
            <Current
                :work="displayWork"
                composer="Ludwig van Beethoven"
                :performers="performers"
            />
        </div>
    </div>
</template>
