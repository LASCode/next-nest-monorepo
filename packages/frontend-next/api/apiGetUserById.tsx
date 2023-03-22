import { User } from "@/types";
import { axiosInstance } from "@/api/index";

export const apiGetUserById = async (id: string): Promise<User> => {
    const response = await axiosInstance.get<User>(`user/${id}`, {method: 'GET'});
    return response.data;
};