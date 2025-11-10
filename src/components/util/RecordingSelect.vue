<script setup lang="ts">
    import { onMounted } from "vue";
    import { joinPerformers } from "@/util/format.ts";

    const props = defineProps<{
        recs: Recording[];
    }>();

    const selectedId = defineModel<number | null>({ default: null });
    
    onMounted(() => {
        if (!selectedId.value && props.recs.length > 0)
            selectedId.value = props.recs[0].id;
    });
</script>

<template>
    <select
        class="rounded-full bg-fg-lighter h-10 max-w-1/2 pr-5 pl-4 flex items-center text-[16px] hover:bg-fg-more-lighter truncate"
        v-model="selectedId">
            <option v-for="rec in props.recs" :key="rec.id" :value="rec.id">
                {{ joinPerformers(rec.performers.map(p => p.performer)) }} ― {{ rec.year }}
            </option>
    </select>
</template>

<style scoped>
    select, ::picker(select) {
        appearance: base-select;
    }

    ::picker(select) {
        border-radius: 15px;
        border: none
    }
    
    select::picker-icon {
        content: url("@/assets/svg/picker.svg");
        transition: 0.4s rotate;
    }

    select:open::picker-icon {
        rotate: 180deg;
    }

    option {
        background: #4c4c4c;
        color: white;
        padding-block: 3px;
        transition: .4s
    }
    option:first-of-type {
        border-radius: 8px 8px 0 0;
    }

    option:last-of-type {
        border-radius: 0 0 8px 8px;
    }

    option::checkmark {
        content: "";
    }
</style>
