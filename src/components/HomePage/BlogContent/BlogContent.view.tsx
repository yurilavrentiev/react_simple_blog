import React, { useEffect, useState } from "react";
import styles from './BlogContent.module.css';
import {Post} from "../Post/Post.view";
import {AddPostForm} from "./AddPostForm.view";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {EditPostForm} from "./EditPostForm.view";

let source;

export const BlogContent = (props) => {


  const [isShowedAddForm, setIsShowedAddForm] = useState(false);
  const [isShowedEditForm, setIsShowedEditForm] = useState(false);
  const [postsArr, setPostsArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const getPost = () => {
    source = axios.CancelToken.source();
    axios.get('https://635bea26aa7c3f113dc9a068.mockapi.io/posts', { cancelToken: source.token })
      .then((response) => {
        setPostsArr(response.data);
        setIsPending(false);
      })
      .catch((error) => console.log(error));
  }

  const likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios.put(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${blogPost.id}`, temp)
      .then((response) => {
        console.log('Post has been modified', response.data);
        getPost();
      })
      .catch((error) => console.log(error));
  }


  useEffect(() => {

    getPost();

    return () => {
      if (source) {
        source.cancel('Axios get request canceled');
      }
    }
  }, [props]);

  const addNewPost = (blogPost) => {
    setIsPending(true);
    axios.post('https://635bea26aa7c3f113dc9a068.mockapi.io/posts', blogPost)
      .then((response) => {
        console.log('Post has been created => ', response.data);
        getPost();
      })
      .catch((error) => console.log(error));
  }

  const editPost = (updatedBlogPost) => {
    setIsPending(true)
    axios.put(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${updatedBlogPost.id}`, updatedBlogPost)
      .then((response) => {
        console.log('All changes have been saved => ', response.data);
        getPost();
      })
      .catch((error) => console.log(error));
  }

  const deletePost = (blogPost) => {
    setIsPending(true);

    if (window.confirm(`Are you sure you want to delete ${blogPost.title}?`)) {
      axios.delete(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${blogPost.id}`)
        .then((response) => {
          console.log('Post has been deleted ', response.data);
          getPost();
        })
        .catch((error) => console.log(error));
    } else {

      setIsPending(false);

    }
  }

  const handleShowForm = () => { setIsShowedAddForm(true) };

  const handleHideForm = () => { setIsShowedAddForm(false) };

  const handleShowEditForm = () => { setIsShowedEditForm(true) };

  const handleHideEditForm = () => { setIsShowedEditForm(false) };

  const handleSelectedPost = (blogPost) => { setSelectedPost(blogPost) };

  const postsOpacity = isPending ? 0.5 : 1;

  const blogPosts = postsArr.map((item) => {
    return (
      <Post
        key={item.id}
        title={item.title}
        article={item.article}
        liked={item.liked}
        likePost={() => likePost(item)}
        deletePost={() => deletePost(item)}
        showEditForm={handleShowEditForm}
        handleSelectedPost={() => handleSelectedPost(item)}
      />
    )
  });

  if (postsArr.length === 0) {
    return <h1>Downloading</h1>
  }

  return (
    <div className={styles.blogPage}>
      {isShowedAddForm &&
        (<AddPostForm
          hideForm={handleHideForm}
          addPost={addNewPost}
          postsArr={postsArr}
        />)}
      {isShowedEditForm && (
        <EditPostForm
          hideForm={handleHideEditForm}
          selectedPost={selectedPost}
          editPost={editPost} />
      )}

      <h1>My Blog</h1>
      <button className={styles.btn} onClick={handleShowForm}>New Post</button>

      <div className={styles.posts} style={{ opacity: postsOpacity }}>
        {isPending && <CircularProgress className={styles.loader} />}
        {blogPosts}

      </div>
    </div>
  )
};
