import { WorkingPeriod } from "@/types";
import { axiosInstance } from "@/api";


export const apiCreateWorkingPeriod = async (timestamp: number): Promise<WorkingPeriod> => {
    const payload = { assignedDay: timestamp };
    const response = await axiosInstance.post<WorkingPeriod>(`/workingPeriod`, payload);
    return response.data;
};