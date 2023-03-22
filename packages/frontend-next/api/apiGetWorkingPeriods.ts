import {WorkingPeriod} from "@/types";
import {axiosInstance} from "@/api/index";

export const apiGetWorkingPeriods = async (): Promise<WorkingPeriod[]> => {
    const response = await axiosInstance.get<WorkingPeriod[]>(`/workingPeriod`, {method: 'GET'});
    return response.data;
};