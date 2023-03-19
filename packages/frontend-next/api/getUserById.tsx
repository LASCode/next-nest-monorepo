import {User} from "@/types";

export const getUserById = async (id: string) => {
    const response = await fetch(`http://localhost:3001/user/${id}`, {method: 'GET'});
    return await response.json() as Promise<User>;
};