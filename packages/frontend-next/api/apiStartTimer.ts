import {Project} from "@/types";
import {axiosInstance} from "@/api/index";

interface ApiStartTimerProps {
    project_id: string;
}
export const apiStartTimer = async ({ project_id }: ApiStartTimerProps): Promise<Project> => {
    const payload = { project_id: project_id };
    const response = await axiosInstance.post<Project>(`/project/start`, payload);
    return response.data;
};