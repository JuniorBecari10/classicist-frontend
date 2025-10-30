import type { Work } from "@/model/work.ts";
import type { Recording } from "@/model/recording.ts";
import { BACKEND_URL } from "./consts.ts";
import { ref, onMounted } from "vue";

export async function getWork(id: number): Promise<Work> {
    const res = await fetch(`${BACKEND_URL}/api/work?id=${id}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch work (${res.status} ${res.statusText})`);
    }

    return res.json();
}

export async function getRecsForWork(id: number): Promise<Recording[]> {
    const res = await fetch(`${BACKEND_URL}/api/recsforwork?id=${id}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch work (${res.status} ${res.statusText})`);
    }

    return res.json();
}

export function useFetch<T>(fetchFn: () => Promise<T>) {
    const data = ref<T | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const load = async () => {
        loading.value = true;
        error.value = null;
        try {
            data.value = await fetchFn();
        } catch (err: any) {
            error.value = err.message || "Fetch failed";
        } finally {
            loading.value = false;
        }
    };

    onMounted(load);

    return { data, loading, error, reload: load };
}
