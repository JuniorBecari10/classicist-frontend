import type { Work, DisplayWork } from "@/model/work";

export function workToDisplayWork(work: Work, movement: number): DisplayWork {
    return {
        title: work.title,
        tempos: work.movements[movement].tempo_markings,
        movementNumber: movement,
    };
}
