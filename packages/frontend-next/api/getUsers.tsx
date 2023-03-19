import {User} from "@/types";

export const getUsers = async () => {
    const response = await fetch(`http://localhost:3001/user/all`, {method: 'GET'});
    return await response.json() as Promise<User[]>;
};