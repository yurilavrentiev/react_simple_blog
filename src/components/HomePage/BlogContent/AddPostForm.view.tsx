import styles from './AddPostForm.module.css';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import React, { useEffect, useState } from 'react';

export const AddPostForm = (props) => {

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const hideForm = props.hideForm;

  const handleInputChange = (event) => {
    event.preventDefault();
    setPostTitle(event.target.value);
  }

  const handleTextAreaChange = (event) => {
    event.preventDefault();
    setPostBody(event.target.value);
  }

  const createPost = (event) => {
    event.preventDefault()
    const post = {
      title: postTitle,
      article: postBody,
      liked: false,
    }
    props.addPost(post)
    props.hideForm()
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        props.hideForm()
      }
    }
    window.addEventListener('keyup', handleEscape);

    return () => { window.removeEventListener('keyup', handleEscape) }
  }, [props]);



  return (
    <>
      <form className={styles.addPostForm} onSubmit={createPost}>
        <button
          onClick={hideForm}
          className={styles.btnContainer}>
          <CancelSharpIcon />
        </button>
        <h3>New Post</h3>
        <div>
          <input
            name='postTitle'
            className={styles.formInputs}
            placeholder='Post Title'
            value={postTitle}
            onChange={handleInputChange}
            required />
        </div>
        <div>
          <textarea
            name='postBody'
            className={styles.formInputs}
            placeholder='Post Content'
            rows={5}
            value={postBody}
            onChange={handleTextAreaChange}
            required />
        </div>
        <div>
          <button
            type='submit'
            className={styles.btn}>
            Add Post
          </button>
        </div>
      </form>
      <div
        className={styles.overlay}
        onClick={hideForm}>
      </div>
    </>
  )
};
