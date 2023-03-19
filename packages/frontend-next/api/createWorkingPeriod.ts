import {User, WorkingPeriod} from "@/types";
import {INPUT_CreateWorkingPeriod} from "@test/backend-nest/dist/WorkingPeriodModule/inputs";

export const createWorkingPeriod = async (date: Date) => {
    const payload: INPUT_CreateWorkingPeriod = {
        assignedDay: date,
    };
    const response = await fetch(`http://localhost:3001/workingPeriod`, {method: 'POST', body: JSON.stringify(payload)});
    return await response.json() as Promise<WorkingPeriod>;
};