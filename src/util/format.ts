import type { Composer, DisplayWork, WorkTitle } from "@/model/work.ts";
import type { Performer } from "@/model/recording.ts";

function formatTitleDisplay(title: WorkTitle): string {
    return `${title.kind} No. ${title.number}${
        title.nickname ? ` • "${title.nickname}"` : ""
    }`;
}

export function formatDisplayWork(dw: DisplayWork): string {
    return `${formatTitleDisplay(dw.title)} • ${dw.movement}`
}

export function formatDisplayAuthors(composer: Composer, performers: Performer[]): string {
    return `${composer.name} | ${performers.map(p => p.name).join(", ")}`;
}
