import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  isSelfPost = false,
  handleLikeClick,
  handleRemoveClick
}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='clickable' onClick={toggleVisibility}>
        <div>
          {blog.title} {blog.author}
        </div>
        {visible ? (
          <div className='blogVisible'>
            <div>
              <a href='google.com'>{blog.url}</a>
            </div>
            <div>
              {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}{' '}
              <button onClick={handleLikeClick}>like</button>
            </div>
            <div>
              added by{' '}
              {blog.user && blog.user.name ? blog.user.name : 'Anonymous'}
            </div>
            {isSelfPost ? (
              <div>
                <button onClick={handleRemoveClick}>remove</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div className='blogHidden'></div>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
}

export default Blog
