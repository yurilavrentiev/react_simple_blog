import axios from "axios";

export const deletePostApi = (postId: string) => {
	axios.delete(
		`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${postId}`
	);
}