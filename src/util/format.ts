import type { Composer, DisplayWork, WorkTitle } from "@/model/work.ts";
import type { Performer } from "@/model/recording.ts";

function formatTitleDisplay(title: WorkTitle): string {
    return `${title.kind} No. ${title.number}${
        title.number.isSome()
            ? `• "${title.nickname.unwrap()}"`
            : ""
    }
`
}

export function formatDisplayWork(dw: DisplayWork): string {
    return `${formatTitleDisplay(dw.title)} • ${dw.movement}`
}

export function formatDisplayAuthors(composer: Composer, performers: Performer[]): string {
    return `${composer.name} | ${performers.forEach((perf, i, _) =>
        `${perf.name}${
            i < performers.length - 1
                ? ", "
                : ""
        }`)}`
}
