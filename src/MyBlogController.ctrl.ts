import { makeAutoObservable } from "mobx";

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
	}

	setIsLoggedIn(value: boolean) {
		this.isLoggedIn = value;
	}
	showAddPostFormHandler(value: boolean) {
		this.isShowedAddPostForm = value;
	}
	showEditPostFormHandler(value: boolean) {
		this.isShowedEditPostForm = value;
	}
	isPendingHandler(value: boolean) {
		this.isPending = value;
	}
	setUserName(userName: string) {
		this.userName = userName;
	}
	loginChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		this.loginInputValue = event.currentTarget.value;
	}
	passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		this.passwordInputValue = event.currentTarget.value;
	}
	signInHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		this.setUserName(this.loginInputValue);
		localStorage.setItem("isLoggedIn", "true");
		localStorage.setItem("userName", this.userName);
		this.setIsLoggedIn(true);
	}
	logOutHandler() {
		localStorage.setItem("isLoggedIn", "false");
		localStorage.setItem("userName", "");
		this.setIsLoggedIn(false);
	}
}