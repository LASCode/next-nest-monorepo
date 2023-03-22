import axios from "axios";
import {Post} from "@/types/Post.types";

export const apiGetPosts = async (): Promise<Post[]> => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
        responseType: 'json',
        withCredentials: false,
    });
    return response.data;
};