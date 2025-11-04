import { type Composer, type DisplayWork, type WorkTitle, type TempoMarking, type Option, KeyMode, Note } from "@/model/work.ts";
import type { Performer } from "@/model/recording.ts";
import { convertDuration, type Time } from "./time.ts";

export function formatDisplayWork(dw: DisplayWork): string {
    return `${formatTitleDisplay(dw.title)} • ${toRoman(dw.movementNumber)}. ${joinTempoMarkings(dw.tempos)}`
}

export function formatDisplayWorkKey(dw: DisplayWork, note: Note, mode: KeyMode): string {
    return `${formatTitleDisplayKey(dw.title, note, mode)} • ${toRoman(dw.movementNumber)}. ${joinTempoMarkings(dw.tempos)}`
}

export function formatDisplayAuthors(composer: Composer, performers: Performer[]): string {
    return `${composer.name} | ${performers.map(p => p.name).join(", ")}`;
}

export function formatTime(t: Time): string {
    const pad = (n: number) => n.toString().padStart(2, "0");

    if (t.hours > 0)
        return `${pad(t.hours)}:${pad(t.minutes)}:${pad(t.seconds)}`;

    return `${pad(t.minutes)}:${pad(t.seconds)}`;
}

export function convertFormatTime(duration: number): string {
    return formatTime(convertDuration(duration));
}

export function formatTitleDisplay(title: WorkTitle): string {
    return `${formatTitleDisplayNoNick(title)}${formatNick(title.nickname)}`;
}

export function formatTitleDisplayKey(title: WorkTitle, note: Note, mode: KeyMode): string {
    return `${formatTitleDisplayNoNick(title)} in ${formatKey(note, mode)}${formatNick(title.nickname)}`;
}

// ---

function formatTitleDisplayNoNick(title: WorkTitle): string {
    return `${title.kind}${
        title.number
            ? ` No. ${title.number}`
            : ""
    }`;
}

function formatNick(nickname: Option<string>) {
    return `${
        nickname
            ? `: "${nickname}"`
            : ""
    }`;
}

function formatKey(note: Note, mode: KeyMode) {
    return `${formatNote(note)} ${formatMode(mode)}`;
}

function formatNote(note: Note) {
    switch (note) {
        case Note.C: return "C";
        case Note.CSharp: return "C-sharp";
        case Note.DFlat: return "D-flat";
        case Note.D: return "D";
        case Note.DSharp: return "D-sharp";
        case Note.EFlat: return "E-flat";
        case Note.E: return "E";
        case Note.F: return "F";
        case Note.FSharp: return "F-sharp";
        case Note.GFlat: return "G-flat";
        case Note.G: return "G";
        case Note.GSharp: return "G-sharp";
        case Note.AFlat: return "A-flat";
        case Note.A: return "A";
        case Note.ASharp: return "A-sharp";
        case Note.BFlat: return "B-flat";
        case Note.B: return "B";
    }
}

function formatMode(mode: KeyMode) {
    switch (mode) {
        case KeyMode.Major: return "Major";
        case KeyMode.Minor: return "Minor";
    }
}

function joinTempoMarkings(tempos: TempoMarking[]): string {
    return tempos
        .map(formatTempoMarking)
        .join(" ― ");
}

function formatTempoMarking(tempo: TempoMarking): string {
    return `${tempo.form ? `${tempo.form}: ` : ""}${tempo.name}`;
}

function toRoman(num: number): string {
    if (num <= 0 || num >= 4000) {
        throw new Error(`Number must be between 1 and 3999; got ${num}`);
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
