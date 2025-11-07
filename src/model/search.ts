import type { Performer } from "./recording";
import type { Composer, Work } from "./work";

export type SearchItem = Work | Composer | Performer;

export type SearchResult =
    | { type: "work"; value: Work }
    | { type: "composer"; value: Composer }
    | { type: "performer"; value: Performer };

export function newWorkSR(w: Work): SearchResult {
    return { type: "work", value: w };
}

export function newComposerSR(c: Composer): SearchResult {
    return { type: "composer", value: c };
}

export function newPerformerSR(p: Performer): SearchResult {
    return { type: "performer", value: p };
}
