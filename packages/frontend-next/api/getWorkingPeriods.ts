import {WorkingPeriod} from "@/types";

export const getWorkingPeriods = async (): Promise<WorkingPeriod[]> => {
    const response = await fetch(`http://localhost:3001/workingPeriod`, {method: 'GET'});
    return await response.json();
};