import axios from "axios";

export const getPostsApi = () => {
	return axios.get("https://635bea26aa7c3f113dc9a068.mockapi.io/posts");
}