import React, { useEffect } from "react";
import styles from "./BlogContent.module.css";
import { Post } from "../Post/Post.view";
import { AddPostForm } from "./AddPostForm.view";
import CircularProgress from "@mui/material/CircularProgress";
import { EditPostForm } from "./EditPostForm.view";
import { observer } from "mobx-react";
import { Controller } from "../../../types";

export const BlogContent = observer(function BlogContent(props: {
	controller: Controller;
}) {
	const { controller } = props;

	useEffect(() => {
		controller.setPosts();
		// return () => {
		//   if (source) {
		//     source.cancel('Axios get request canceled');
		//   }
		// }
	}, [controller]);

	const blogPosts = controller.posts.map((item) => {
		return (
			<Post
				key={item.id}
				title={item.title}
				article={item.article}
				liked={item.liked}
				likePost={() => controller.likePost(item.id)}
				deletePost={() => controller.deletePost(item)}
				showEditForm={() => {
					controller.showEditPostFormHandler(true);
				}}
				handleSelectedPost={() => {
					controller.setSelectedPost(item);
				}}
			/>
		);
	});

	if (controller.posts.length === 0) {
		return <h1>Downloading</h1>;
	}

	return (
		<div className={styles.blogPage}>
			{controller.isShowedAddPostForm && (
				<AddPostForm controller={controller} />
			)}
			{controller.isShowedEditPostForm && (
				<EditPostForm controller={controller} />
			)}

			<h1>My Blog</h1>
			<button
				className={styles.btn}
				onClick={() => {
					controller.showAddPostFormHandler(true);
				}}
			>
				New Post
			</button>

			<div
				className={styles.posts}
				style={{ opacity: controller.isPending ? 0.5 : 1 }}
			>
				{controller.isPending && <CircularProgress className={styles.loader} />}
				{blogPosts}
			</div>
		</div>
	);
});
