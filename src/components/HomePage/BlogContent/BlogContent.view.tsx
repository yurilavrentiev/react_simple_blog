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
		controller.fetchPosts();
		// return () => {
		//   if (source) {
		//     source.cancel('Axios get request canceled');
		//   }
		// }
	}, [controller]);

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
					controller.setShowAddPostForm(true);
				}}
			>
				New Post
			</button>

			<div
				className={styles.posts}
				style={{ opacity: controller.isPending ? 0.5 : 1 }}
			>
				{controller.isPending && <CircularProgress className={styles.loader} />}
				{controller.posts.map((item) => {
		return (
			<Post
				key={item.id}
				title={item.title}
				article={item.article}
				liked={item.liked}
				likePost={() => controller.likePost(item.id)}
				deletePost={() => controller.deletePost(item)}
				showEditForm={() => {
					controller.setShowEditPostForm(true);
				}}
				handleSelectedPost={() => {
					controller.setSelectedPost(item);
				}}
			/>
		);
	})};
			</div>
		</div>
	);
});
