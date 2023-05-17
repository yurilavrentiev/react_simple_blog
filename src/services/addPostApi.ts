import axios from "axios";
import { NewPost } from "../types";

export const addPostApi = (blogPost: NewPost)=> {
	 return axios.post("https://635bea26aa7c3f113dc9a068.mockapi.io/posts", blogPost)
}