import React from 'react'
import './Posts.css'
import Avatar from '@material-ui/core/Avatar';

function Posts({ username, caption, imageURL } ) {
    return (
        <div className ='post'>
            <div className='post__header'>
              <Avatar
                  className ='post__avatar'
                  alt ="CNW"
                  src= '/static/images/avatar/1.jpg'
              />
              <h3>{username}</h3>
         </div>     
            {/* header-> avatar +username */}
            {/* image */}
            <img className ='post__image'
            src ={imageURL}
            alt = ''>
                
            </img>
            {/* username + caption */}
            <h4 className = ' post__text'> <strong>{username}</strong>  {caption}</h4>
        </div>
    )
}

export default Posts;
