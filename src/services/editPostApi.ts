import axios from "axios";
import { Post } from "../types";

export const editPostApi = (post: Post) => {
	return axios.put(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${post.id}`, post);
}