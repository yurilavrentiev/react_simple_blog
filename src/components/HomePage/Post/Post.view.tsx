import React from "react";
import styles from './Post.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { observer } from "mobx-react";

export const Post = observer(function Post({ 
    title, 
    article, 
    liked, 
    likePost,
    deletePost,
    showEditForm,
    handleSelectedPost
    }) {
      
  const heartFill = liked ? 'crimson' : 'black';

  const handleEditForm = () => {
    handleSelectedPost();
    showEditForm()
  }
  return (
    <div className={styles.post}>
      <div className={styles.postContent}>
        <h2>{title}</h2>
        <p>{article}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <div className={styles.postControl}>
        <button className={styles.editBtn} onClick={handleEditForm}>
          <EditIcon />
        </button>
        <button className={styles.deleteBtn} onClick={deletePost}>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  )


});
