export type Controller = {
	isLoggedIn: boolean;
	isShowedAddPostForm: boolean;
	isShowedEditPostForm: boolean;
	isPending: boolean;
	posts: Post[];
	selectedPost: Post;
	userName: string;
	loginInputValue: string;
	passwordInputValue: string;
	setIsLoggedIn(value: boolean);
	setUserName(userName: string);
	loginChangeHandler(event: React.ChangeEvent<HTMLInputElement>);
	passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>);
	signInHandler(event: React.FormEvent<HTMLFormElement>);
	logOutHandler();
	showAddPostFormHandler(value: boolean);
	showEditPostFormHandler(value: boolean);
	isPendingHandler(value: boolean);
};

type Post = {
	title: string;
	article: string;
	liked: boolean;
	id: string;
}