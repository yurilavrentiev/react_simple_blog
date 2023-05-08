import { makeAutoObservable, runInAction } from "mobx";
import { Post } from "./types";
import { getPostsApi } from "./services/getPostApi";
import { putPostApi } from "./services/putPostApi";
import { deletePostApi } from "./services/deletePostApi";

export class MyBlogController {
	isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
	isShowedAddPostForm = false;
	isShowedEditPostForm = false;
	isPending = false;
	loginInputValue = "";
	passwordInputValue = "";
	userName = localStorage.getItem("userName");
	posts = [];
	selectedPost = {};

	constructor() {
		makeAutoObservable(this);
	};

	setIsLoggedIn(value: boolean) {
		this.isLoggedIn = value;
	};

	setPosts() {
		this.isPendingHandler(true);
		getPostsApi().then((response) => {
			runInAction(() => {
					response.data.forEach((element: Post)=> this.posts.push(element));
					this.isPendingHandler(false);
			});
		});
	};

	likePost(postId: string) {
		this.posts.forEach((post: Post) => {
			if (post.id === postId) {
				post.liked = !post.liked;
				putPostApi(post);
			}
		})
	};

	deletePost(blogPost: Post) {

		this.isPendingHandler(true);
	
		if (window.confirm(`Are you sure you want to delete ${blogPost.title}?`)) {
			this.posts = this.posts.filter((post: Post) => post.id !== blogPost.id);
			deletePostApi(blogPost.id);
		} else {
			this.isPendingHandler(false);
		}
	}

	showAddPostFormHandler(value: boolean) {
		this.isShowedAddPostForm = value;
	};

	showEditPostFormHandler(value: boolean) {
		this.isShowedEditPostForm = value;
	};

	isPendingHandler(value: boolean) {
		this.isPending = value;
	};

	setUserName(userName: string) {
		this.userName = userName;
	};

	loginChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		this.loginInputValue = event.currentTarget.value;
	};

	passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		this.passwordInputValue = event.currentTarget.value;
	};

	signInHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		this.setUserName(this.loginInputValue);
		localStorage.setItem("isLoggedIn", "true");
		localStorage.setItem("userName", this.userName);
		this.setIsLoggedIn(true);
	};

	logOutHandler() {
		localStorage.setItem("isLoggedIn", "false");
		localStorage.setItem("userName", "");
		this.setIsLoggedIn(false);
	};
};