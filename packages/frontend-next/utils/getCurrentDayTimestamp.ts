export const getCurrentDayTimestamp = (): {defaultTimestamp: number, slicedTimestamp: number} => {
    const currentDate = new Date();
    return ({
        defaultTimestamp: currentDate.getTime(),
        slicedTimestamp: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime(),
    })
}