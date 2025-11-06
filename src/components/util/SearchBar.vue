<script setup lang="ts">
    import { ref, nextTick } from "vue";

    // This defines a reactive model for v-model binding
    const model = defineModel<string>({ default: "" });

    const showInput = ref(false);
    const inputRef = ref<HTMLInputElement | null>(null);

    // When the button is clicked, show input and focus it
    function handleButtonClick() {
        showInput.value = true;
        nextTick(() => {
            inputRef.value?.focus();
        });
    }

    // When the input loses focus, clear & hide it
    function handleBlur() {
        // model.value = ""; // reset the external v-model value
        showInput.value = false;
    }
</script>

<template>
    <button
        v-show="!showInput"
        class="hover:bg-fg-more-lighter transition-[background] duration-200 flex-1 flex items-center justify-center
               bg-fg-lighter rounded-md cursor-text"
        v-ripple
        @click="handleButtonClick"
    >
        <img class="mr-3 size-5" src="@/assets/images/search.png" />
        <span class="whitespace-nowrap"><slot /></span>
    </button>

    <input
        ref="inputRef"
        v-show="showInput"
        type="text"
        v-model="model"
        class="bg-fg-lighter outline-none rounded-md p-2 flex-1"
        @blur="handleBlur"
    />
</template>
