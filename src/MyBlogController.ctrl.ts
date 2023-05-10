import { makeAutoObservable, runInAction } from "mobx";
import { Post } from "./types";
import { getPostsApi } from "./services/getPostApi";
import { editPostApi } from "./services/editPostApi";
import { deletePostApi } from "./services/deletePostApi";
import { addPostApi } from "./services/addPostApi";

export class MyBlogController {
	isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
	isShowedAddPostForm = false;
	isShowedEditPostForm = false;
	isPending = false;
	loginInputValue = "";
	passwordInputValue = "";
	addPostFormTitleValue = "";
	addPostFormBodyValue = "";
	editPostInputTitleValue = "";
	editPostInputBodyValue = "";
	userName = localStorage.getItem("userName");
	posts = [];
	newPost = {
		title: "",
		article: "",
		liked: false,
	};
	selectedPost = {
		title: "",
		article: "",
		liked: false,
		id: "",
	};

	constructor() {
		makeAutoObservable(this);
	};

	setIsLoggedIn(value: boolean) {
		this.isLoggedIn = value;
	};

	setPosts() {
		this.isPendingHandler(true);
		this.posts = [];
		getPostsApi().then((response) => {
			runInAction(() => {
				response.data.forEach((element: Post) => this.posts.push(element));
			});
		});
		this.isPendingHandler(false);
	};

	setSelectedPost(selectedPost: Post) {
		this.selectedPost.title = selectedPost.title;
		this.selectedPost.article = selectedPost.article;
		this.selectedPost.liked = selectedPost.liked;
		this.selectedPost.id = selectedPost.id;
		this.setEditPostFormInputs();
	};

	likePost(postId: string) {
		this.posts.forEach((post: Post) => {
			if (post.id === postId) {
				post.liked = !post.liked;
				editPostApi(post);
			}
		});
	};

	deletePost(blogPost: Post) {
		this.isPendingHandler(true);

		if (window.confirm(`Are you sure you want to delete ${blogPost.title}?`)) {
			this.isPendingHandler(true);
			deletePostApi(blogPost.id).then(() => {
				this.setPosts();
				this.isPendingHandler(false);
			});
		} else {
			this.isPendingHandler(false);
		};
	};

	setEditPostFormInputs() {
		this.editPostInputTitleValue = this.selectedPost.title
		this.editPostInputBodyValue = this.selectedPost.article
	}

	setNewPost() {
		this.newPost.title = this.addPostFormTitleValue;
		this.newPost.article = this.addPostFormBodyValue;
	};
	savePost() {
		this.selectedPost.title = this.editPostInputTitleValue;
		this.selectedPost.article = this.editPostInputBodyValue;
	}
	editPost() {
		this.isPendingHandler(true);
		this.savePost();
		editPostApi(this.selectedPost).then(() => {
			this.setPosts();
			this.isPendingHandler(false);
		})
	}

	addNewPost() {
		this.isPendingHandler(true);
		this.setNewPost();
		addPostApi(this.newPost).then(() => {
			runInAction(() => {
				this.setPosts();
				this.isPendingHandler(false);
			});
		});
	};

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

	editPostTitleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		this.editPostInputTitleValue = event.currentTarget.value;
	};

	editPostBodyChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
		event.preventDefault();
		this.editPostInputBodyValue = event.currentTarget.value;
	};

	postTitleChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		this.addPostFormTitleValue = event.currentTarget.value;
	};

	postBodyChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
		event.preventDefault();
		this.addPostFormBodyValue = event.currentTarget.value;
	};

	loginChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		this.loginInputValue = event.currentTarget.value;
	};

	passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
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