import React from 'react';
import "./Post.css";
import Avatar from '@mui/material/Avatar';

function Post(props) {
  return (
    <div className='post'>
        <div className='post__header'>
            <Avatar className="post__avatar" alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <h3>{props.userName}</h3>
        </div>
        <img className='post__image' src={props.imageUrl} alt=''/>
        <h4 className='post__text'><strong>{props.userName}</strong> {props.comment}</h4>
    </div>
  )
}

export default Post