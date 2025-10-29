<script setup lang="ts">
    import { defineProps, defineEmits } from "vue";

    const props = defineProps<{
        imageName: string;
    }>();

    const emit = defineEmits<{
        (e: "disappear"): void;
    }>();
</script>

<template>
    <Transition name="fade">
        <div
            v-show="props.imageName"
            class="absolute left-0 top-0 w-full h-full overflow-hidden bg-black/40 z-[100] flex justify-center items-center"
            @click="emit('disappear')">
            <img
                v-if="props.imageName"
                class="w-[45%] rounded-2xl shadow-lg"
                :src="`http://localhost:8080/public/images/covers/${props.imageName}`"
            />
        </div>
    </Transition>
</template>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
