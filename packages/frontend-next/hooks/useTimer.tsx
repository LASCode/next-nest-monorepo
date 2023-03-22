import {useCallback, useEffect, useState} from "react";

interface UseTimerProps {
    callback: (prev: number) => number;
    interval: number;
}
export const useTimer = ({ callback, interval }: UseTimerProps, isRunning: boolean = true): number => {
    const [time, setTime] = useState<number>(0);
    const setTimeV2 = useCallback(() => setTime((prev) => callback(prev)), [callback])

    useEffect(() => {
        const timer = isRunning ? setInterval(setTimeV2, interval) : undefined;
        return () => { clearInterval(timer) }
    }, [callback, interval, isRunning, setTimeV2])

    return time
}