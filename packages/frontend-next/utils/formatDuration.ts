const divide = (a: number, b: number): {full: number, remainder: number} => ({full: Math.floor(a / b), remainder: a % b});

export const formatDuration = (totalTime: number) => {
    const hours = divide(totalTime, (1000 * 60 * 60));
    const minutes = divide(hours.remainder, (1000 * 60));
    const seconds = divide(hours.remainder, 1000);

    return `${`0${hours.full}`.slice(-2)}:${`0${minutes.full}`.slice(-2)}:${`0${seconds.full}`.slice(-2)}`
}