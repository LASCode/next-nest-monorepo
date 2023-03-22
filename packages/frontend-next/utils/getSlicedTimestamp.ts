export const getSlicedTimestamp = (rawTimestamp: number): number => {
    const currentDate = new Date(rawTimestamp);
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
}

