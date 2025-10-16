export type Time = {
    hours: number;
    minutes: number;
    seconds: number;
}

export function convertDuration(totalSeconds: number): Time {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
}
