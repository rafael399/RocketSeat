import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function Post({ data }) {
  return (
    <div className="postContainer">
      <div className="postHeader">
        <img className="avatar" src={data.author.avatar} />
        <div className="postInfo">
          <h3>{data.author.name}</h3>
          <time>{data.date}</time>
        </div>
      </div>

      <div className="postContent">
        <p>{data.content}</p>
      </div>

      <ul className="postComments">
        {data.comments.map(comment => <li className="comment" key={comment.id}><Comment data={comment} /></li>)}
      </ul>
    </div>
  )
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Post;