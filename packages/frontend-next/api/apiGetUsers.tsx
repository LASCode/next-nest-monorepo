import { User } from "@/types";
import { axiosInstance } from "@/api/index";

export const apiGetUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get(`user/all`, {method: 'GET'});
    return response.data;
};