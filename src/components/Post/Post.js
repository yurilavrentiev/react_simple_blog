import React from "react";
import './Post.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Post = ({ 
    title, 
    article, 
    liked, 
    likePost,
    deletePost
   }) => {
  const heartFill = liked ? 'crimson' : 'black';

  return (
    <div className='post'>
      <div className='postContent'>
        <h2>{title}</h2>
        <p>{article}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <div>
        <button className='deleteBtn' onClick={deletePost}>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  )


}



export default Post;