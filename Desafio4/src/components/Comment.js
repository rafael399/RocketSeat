import React from 'react';
import PropTypes from 'prop-types';

function Comment({ data }) {
  return (
    <div className="commentContainer">
      <img className="avatar" src={data.author.avatar} />
      <div className="commentContent">
        <p><span className="commentAuthor">{data.author.name}</span> {data.content}</p>
      </div>
    </div>
  )
}

Comment.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Comment;