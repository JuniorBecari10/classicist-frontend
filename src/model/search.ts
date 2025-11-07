import type { Performer } from "./recording";
import type { Composer, Work } from "./work";

export type SearchItem = Work | Composer | Performer;

// Tagged union for SearchResult
export type SearchResult =
    | { type: "work"; data: Work }
    | { type: "composer"; data: Composer }
    | { type: "performer"; data: Performer };

// Constructors (like your NewWorkSR etc.)
export function newWorkSR(w: Work): SearchResult {
    return { type: "work", data: w };
}

export function newComposerSR(c: Composer): SearchResult {
    return { type: "composer", data: c };
}

export function newPerformerSR(p: Performer): SearchResult {
    return { type: "performer", data: p };
}
