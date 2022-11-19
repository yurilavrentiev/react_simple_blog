import styles from './EditPostForm.module.css';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import React, { useEffect, useState } from 'react';

const EditPostForm = (props) => {

  const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  const [postBody, setPostBody] = useState(props.selectedPost.article)

  const handleInputChange = (event) => {
    event.preventDefault();
    setPostTitle(event.target.value)
  }

  const handleTextAreaChange = (event) => {
    event.preventDefault();
    setPostBody(event.target.value)
  }

  const savePost = (event) => {
    event.preventDefault()
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      article: postBody,
      liked: props.selectedPost.liked,
    }
    props.editPost(post);
    props.hideForm();
  }


  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        props.hideForm()
      }
    };
    window.addEventListener('keyup', handleEscape)

    return () => { window.removeEventListener('keyup', handleEscape) }
  }, [props])



  const hideForm = props.hideForm;

  return (
    <>
      <form className={styles.editPostForm} onSubmit={savePost}>
        <button
          onClick={hideForm}
          className={styles.btnContainer}>
          <CancelSharpIcon />
        </button>
        <h3>Edit Post</h3>
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
            Save Changes
          </button>
        </div>
      </form>
      <div
        className={styles.overlay}
        onClick={hideForm}>
      </div>
    </>
  )
}


export default EditPostForm;
