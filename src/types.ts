export type Controller = {
	isLoggedIn: boolean;
	isShowedAddPostForm: boolean;
	isShowedEditPostForm: boolean;
	isPending: boolean;
	posts: Post[] | [];
	selectedPost: Post;
	newPost: NewPost;
	userName: string;
	loginInputValue: string;
	passwordInputValue: string;
	addPostFormTitleValue: string;
	addPostFormBodyValue: string;
	editPostInputTitleValue: string;
	editPostInputBodyValue: string;
	setUserName(userName: string);
	setNewPost();
	fetchPosts();
	setSelectedPost(selectedPost: Post);
	loginChangeHandler(event: React.ChangeEvent<HTMLInputElement>);
	passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>);
	postTitleChangeHandler(event: React.ChangeEvent<HTMLInputElement>);
	postBodyChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>);
	editPostTitleChangeHandler(event: React.ChangeEvent<HTMLInputElement>);
	editPostBodyChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>);
	signInHandler(event: React.FormEvent<HTMLFormElement>);
	logOutHandler();
	setShowAddPostForm(value: boolean);
	setShowEditPostForm(value: boolean);
	likePost(postId: string);
	deletePost(blogPost: Post);
	editPost();
	addNewPost();
	savePost();
};

export type Post = {
	title: string;
	article: string;
	liked: boolean;
	id: string;
}
export type NewPost = {
	title: string;
	article: string;
	liked: boolean;
};