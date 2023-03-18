export const getSlicedTimestamp = (rawDate: Date): number =>
    new Date(rawDate.getFullYear(), rawDate.getMonth(), rawDate.getDate()).getTime();