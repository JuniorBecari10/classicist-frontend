import type { Composer, DisplayWork, WorkTitle } from "@/model/work.ts";
import type { Performer } from "@/model/recording.ts";
import { convertDuration, type Time } from "./time.ts";

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

export function formatTime(t: Time): string {
    const pad = (n: number) => n.toString().padStart(2, "0");

    if (t.hours > 0) {
        return `${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`;
    }

    return `${pad(t.minutes)}:${pad(t.seconds)}`;
}

export function convertFormatTime(duration: number): string {
    return formatTime(convertDuration(duration));
}
