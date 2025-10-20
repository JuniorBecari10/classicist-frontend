import type { Composer, DisplayWork, WorkTitle } from "@/model/work.ts";
import type { Performer } from "@/model/recording.ts";
import { convertDuration, type Time } from "./time.ts";

function formatTitleDisplay(title: WorkTitle): string {
    return `${title.kind} No. ${title.number}${
        title.nickname ? `: "${title.nickname}"` : ""
    }`;
}

export function formatDisplayWork(dw: DisplayWork): string {
    return `${formatTitleDisplay(dw.title)} • ${toRoman(dw.mov_num)}. ${dw.movement}`
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

export function toRoman(num: number): string {
    if (num <= 0 || num >= 4000) {
        throw new Error("Number must be between 1 and 3999");
    }

    const romanMap: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];

    let result = "";
    for (const [value, symbol] of romanMap) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }

    return result;
}
