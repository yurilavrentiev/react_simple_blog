import styles from './AddPostForm.module.css';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import React, { useEffect } from 'react';
import {Controller} from '../../../types';
import { observer } from 'mobx-react';

export const AddPostForm = observer(function AddPostForm(props: {controller: Controller}) {

  const {controller} = props;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        controller.setShowAddPostForm(false);
      }
    };
    window.addEventListener('keyup', handleEscape);

    return () => { window.removeEventListener('keyup', handleEscape) }
  }, [controller]);

  return (
    <>
      <form className={styles.addPostForm} onSubmit={() => {controller.addNewPost()}}>
        <button
          onClick={() => {controller.setShowAddPostForm(false);}}
          className={styles.btnContainer}>
          <CancelSharpIcon />
        </button>
        <h3>New Post</h3>
        <div>
          <input
            name='postTitle'
            className={styles.formInputs}
            placeholder='Post Title'
            value={controller.addPostFormTitleValue}
            onChange={(event) => {controller.postTitleChangeHandler(event)}}
            required />
        </div>
        <div>
          <textarea
            name='postBody'
            className={styles.formInputs}
            placeholder='Post Content'
            rows={5}
            value={controller.addPostFormBodyValue}
            onChange={(event) => {controller.postBodyChangeHandler(event)}}
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
        onClick={() => {controller.setShowAddPostForm(false);}}>
      </div>
    </>
  )
});
