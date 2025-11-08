<script setup lang="ts">
    import { formatTitleDisplayKey, formatCatalog, formatCompositionYear } from "@/util/format.ts";
    
    const props = defineProps<{
        work: Work;
        imagePath: string;
    }>();
</script>

<template>
    <div class="h-50 bg-cover bg-center bg-fixed"
        :style="{ backgroundImage: `url('${props.imagePath}')` }">
        <div class="h-full bg-gradient-to-t from-fg to-black/30">
            <div class="pt-5 pl-8">
                <p class="font-semibold text-4xl mb-2">{{ formatTitleDisplayKey(props.work.title, props.work.key.note, props.work.key.mode) }}</p>
                <p class="text-xl text-fgray">Work • {{ props.work.composer.name }}</p>
                <p class="text-xl text-fgray">{{ formatCatalog(props.work.catalog) }} • {{ formatCompositionYear(props.work.year) }}</p>
            </div>
        </div>
    </div>
</template>
