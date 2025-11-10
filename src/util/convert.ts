import type { Work, DisplayWork } from "@/model/work";

export function workToDisplayWork(work: Work, movement: number): DisplayWork {
    const movIndex = movement - 1;
    return {
        title: work.title,
        tempos: work.movements[movIndex].tempo_markings,
        movementNumber: movement,
        form: work.movements[movIndex].form,
        nickname: work.movements[movIndex].nickname,
    };
}
