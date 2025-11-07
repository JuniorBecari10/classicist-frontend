<script setup lang="ts">
    import { ref, nextTick } from "vue";

    const model = defineModel<string>({ default: "" });
    const visible = defineModel<boolean>("visible", { default: false });

    const inputRef = ref<HTMLInputElement | null>(null);
    const props = defineProps<{
        blur: () => void;
    }>();

    function handleButtonClick() {
        visible.value = true;

        nextTick(() => {
            inputRef.value?.focus();
        });
    }

    // When the input loses focus, clear & hide it
    function handleBlur(event: FocusEvent) {
        const relatedTarget = event.relatedTarget as HTMLElement | null;

        // If focus goes outside the component (not the clear button, not the input), hide it
        if (!relatedTarget || relatedTarget.closest(".search-container") === null) {
            if (!model.value) {
                visible.value = false;
                props.blur();
            }
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            model.value = "";
            visible.value = false;
            inputRef.value?.blur();
            props.blur();
        }
    }

    function clear() {
        model.value = "";
        nextTick(() => inputRef.value?.focus());
    }
</script>

<template>
    <button v-show="!visible"
        class="hover:bg-fg-more-lighter transition-[background] duration-200 flex-1 flex items-center justify-center
               bg-fg-lighter rounded-md cursor-text"
        v-ripple
        @click="handleButtonClick">
        <img class="mr-3 size-5" src="@/assets/images/search.png" />
        <span class="whitespace-nowrap"><slot /></span>
    </button>

    <div v-show="visible"
        class="bg-fg-lighter rounded-md p-2 flex-1 flex">
        <input
            ref="inputRef"
            type="text"
            v-model="model"
            class="outline-none flex-1"
            @blur="handleBlur"
            @keydown="handleKeyDown" />
        <div class="w-7 h-full flex justify-center items-center">
            <button
                class="hover:bg-fg-even-more-lighter p-1 rounded-sm transition-[background] duration-200 cursor-pointer"
                @click="clear"
                v-ripple>
                <img src="@/assets/images/close.png" class="w-3" />
            </button>
        </div>
    </div>
</template>
