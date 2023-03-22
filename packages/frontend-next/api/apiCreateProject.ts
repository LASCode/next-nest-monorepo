import {Project} from "@/types";
import {axiosInstance} from "@/api/index";

interface ApiCreateProjectProps {
    title: string;
    working_period_id: string;
}
export const apiCreateProject = async ({ title, working_period_id }: ApiCreateProjectProps): Promise<Project> => {
    const payload = { name: title, working_period_id: working_period_id };
    const response = await axiosInstance.post<Project>(`/project`, payload);
    return response.data;
};