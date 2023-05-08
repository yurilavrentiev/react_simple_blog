import React, { useEffect, useState } from "react";
import styles from './BlogContent.module.css';
import {Post} from "../Post/Post.view";
import {AddPostForm} from "./AddPostForm.view";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {EditPostForm} from "./EditPostForm.view";
import { MyBlogController } from "../../../MyBlogController.ctrl";
import { observer } from "mobx-react";

let source;

export const BlogContent = observer(function BlogContent(props: {controller: MyBlogController}) {

  const {controller} = props;
  const [selectedPost, setSelectedPost] = useState({});

  useEffect(() => {

    controller.setPosts();

    // return () => {
    //   if (source) {
    //     source.cancel('Axios get request canceled');
    //   }
    // }
  }, controller.posts);

  const addNewPost = (blogPost) => {
    controller.isPendingHandler(true);
    axios.post('https://635bea26aa7c3f113dc9a068.mockapi.io/posts', blogPost)
      .then((response) => {
        console.log('Post has been created => ', response.data);
        controller.setPosts();
      })
      .catch((error) => console.log(error));
  }

  const editPost = (updatedBlogPost) => {
    controller.isPendingHandler(true)
    axios.put(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log('All changes have been saved => ', response.data);
        controller.setPosts();
      })
      .catch((error) => console.log(error));
  }


  const handleSelectedPost = (blogPost) => { setSelectedPost(blogPost) };



  const blogPosts = controller.posts.map((item) => {
    return (
      <Post
        key={item.id}
        title={item.title}
        article={item.article}
        liked={item.liked}
        likePost={() => controller.likePost(item.id)}
        deletePost={() => controller.deletePost(item)}
        showEditForm={() => {controller.showEditPostFormHandler(true)}}
        handleSelectedPost={() => handleSelectedPost(item)}
      />
    )
  });

  if (controller.posts.length === 0) {
    return <h1>Downloading</h1>
  }

  return (
		<div className={styles.blogPage}>
			{controller.isShowedAddPostForm && (
				<AddPostForm
					hideForm={() => {
						controller.showAddPostFormHandler(false);
					}}
					addPost={addNewPost}
					postsArr={controller.posts}
				/>
			)}
			{controller.isShowedEditPostForm && (
				<EditPostForm
					hideForm={() => {
						controller.showEditPostFormHandler(false);
					}}
					selectedPost={selectedPost}
					editPost={editPost}
				/>
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
