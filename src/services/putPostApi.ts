import axios from "axios";
import { Post } from "../types";

export const putPostApi = (post: Post) => {
	axios.put(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${post.id}`, post);
}