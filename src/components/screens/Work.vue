<script setup lang="ts">
    import { ref, computed } from "vue";
    import { getRecsForWork, useFetch } from "@/util/fetch.ts";
    import { joinTempoMarkings } from "@/util/format.ts";
    import { BACKEND_URL } from "@/util/consts.ts";

    import WorkHeader from "../util/WorkHeader.vue";
    import WorkControls from "../util/WorkControls.vue";
    
    const props = defineProps<{
        work: Work;
        recId?: number;
    }>();

    const selectedRecId = ref(props.recId ? props.recId : -1);

    const { data: recs, loading: loading, error: error } =
        useFetch(() => getRecsForWork(props.work.id));
    
    const recData = computed(() => {
        if (!recs.value || recs.value.length === 0)
            return null;

        if (selectedRecId.value < 0)
            selectedRecId.value = recs.value[0].id;

        const rec = recs.value.filter(rec => rec.id === selectedRecId.value)[0];

        return {
            perfs: rec.performers?.map(p => p.performer) ?? [],
            imagePath: `${BACKEND_URL}/public/images/covers/${rec.photo_path}`,
        };
    });


    let aboutexp = ref(0);
</script>

<template>
    <div v-if="loading" class="flex-1 bg-fg rounded-xl overflow-y-auto h-full animate-pulse" />
    <div v-else-if="error" class="flex-1 bg-red-300 rounded-xl overflow-y-auto h-full animate-pulse" />

    <section v-else class="flex-1 bg-fg rounded-xl overflow-y-auto h-full">
        <WorkHeader :work="props.work" :imagePath="recData.imagePath" />
        <WorkControls :recs="recs" :perfs="recs.map(rec => rec.performers)" />

        <!-- Movements & About -->
        <section class="w-full grid grid-cols-1 justify-items-center gap-8 px-4">
            <div class="bg-fg-lighter rounded-full w-full inline-flex justify-between items-center px-8 py-4" v-for="mov in props.work.movements">
                <div class="inline-flex items-center gap-8">
                    <div class="bg-white rounded-full size-[5px]"></div>
                    <span>{{ joinTempoMarkings(mov.tempo_markings) }}</span>
                </div>
                <span class="font-jetbrains text-[95%]">9:35</span>
            
            </div>

            <div class="grid grid-cols-1 rounded-[36px] bg-[#3c3c3c] py-6 px-12 w-full h-auto justify-center justify-items-center gap-3">
                <div class="inline-flex justify-left items-center w-full gap-3">                     
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="20" height="20" fill="url(#pattern0_100_17)"/>
                        <defs>
                        <pattern id="pattern0_100_17" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_100_17" transform="scale(0.0416667)"/>
                        </pattern>
                        <image id="image0_100_17" width="24" height="24" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnklEQVR4nO2UQQqDMBAA9wtFfEwvrb/w0D5FaI79QPsc8RO+wwq9KUwJKIZgpNjNoZC55TKzG0JEEiICVMALKGPIDQsjcI0ZsAwqmwDnjUinNbUJRCoNOYGI0ZTP3HdLv5DPFBJRfkvyP5JbgAx4BuT737kLkKvL7U8IHJ3zwdnk98mBB9B7kUzzWppp2jdwUpF6gRaop00u6oGErPAB71XiY9UE/xgAAAAASUVORK5CYII="/>
                        </defs>
                    </svg>
                    <p>About the piece</p>

                </div>
                <p class="overflow-hidden font-light transition-[max-height] duration-300 ease-in-out" :class="aboutexp ? 'max-h-96' : 'max-h-18'">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident quibusdam maxime aliquam debitis, eum ut recusandae deleniti corrupti velit, tempore sint quis. Aliquam, suscipit laudantium dicta ducimus quam error debitis nobis deserunt expedita. Eos itaque asperiores velit. Maiores et assumenda culpa voluptate fugit quam error vero quasi reiciendis. Sequi rem, vero ab aperiam aspernatur deserunt distinctio quaerat quis atque. Hic nobis consequatur suscipit quae, perferendis ipsa error. Quia laudantium eligendi magni minus praesentium fuga est sapiente quaerat. Sapiente enim aliquid quam, soluta sequi iure. Maxime eveniet sint ad obcaecati, cumque alias voluptate sapiente nemo tenetur eos illum ab modi esse laborum voluptatem nostrum placeat nulla iusto minima consectetur! Perferendis tempore ab repudiandae voluptates fugiat saepe quisquam aliquid, commodi nobis, illo vel. Dicta quo ad expedita impedit suscipit, quas eum, libero non vel blanditiis ipsa aliquam ipsum magni quam sint molestias iusto! Sint tempora incidunt natus quaerat similique obcaecati itaque omnis!
                </p>
                <div class="inline-flex w-full">
                    <button class="bg-[#616161] rounded-[26px] h-8 w-[106px] inline-flex justify-center items-center cursor-pointer hover:bg-[#717171] transition-[background] duration-400" v-ripple
                    @click="aboutexp ^= 1">
                        Show&nbsp<span v-if="aboutexp">less</span><span v-else>more</span>
                    </button>
                </div>
                
            </div>
        </section>
    </section>
</template>
