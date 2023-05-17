import styles from './EditPostForm.module.css';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import React, { useEffect } from 'react';
import { Controller } from '../../../types';
import { observer } from 'mobx-react';

export const EditPostForm = observer(function EditPostForm(props: {controller: Controller}) {
  const {controller} = props;

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
       controller.setShowEditPostForm(false);
      }
    };
    window.addEventListener('keyup', handleEscape)

    return () => { window.removeEventListener('keyup', handleEscape) }
  }, [controller]);

  return (
    <>
      <form className={styles.editPostForm} onSubmit={() => {controller.editPost()}}>
        <button
          onClick={() => {controller.setShowEditPostForm(false);}}
          className={styles.btnContainer}>
          <CancelSharpIcon />
        </button>
        <h3>Edit Post</h3>
        <div>
          <input
            name='postTitle'
            className={styles.formInputs}
            placeholder='Post Title'
            value={controller.editPostInputTitleValue}
            onChange={(event) => {controller.editPostTitleChangeHandler(event)}}
            required />
        </div>
        <div>
          <textarea
            name='postBody'
            className={styles.formInputs}
            placeholder='Post Content'
            rows={5}
            value={controller.editPostInputBodyValue}
            onChange={(event) => {controller.editPostBodyChangeHandler(event)}}
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
        onClick={() => {controller.setShowEditPostForm(false);}}>
      </div>
    </>
  )
});
