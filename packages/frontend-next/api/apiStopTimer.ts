import {Project} from "@/types";
import {axiosInstance} from "@/api/index";

interface ApiStopTimerProps {
    project_id: string;
}
export const apiStopTimer = async ({ project_id }: ApiStopTimerProps): Promise<Project> => {
    const payload = { project_id: project_id };
    const response = await axiosInstance.post<Project>(`/project/stop`, payload);
    return response.data;
};