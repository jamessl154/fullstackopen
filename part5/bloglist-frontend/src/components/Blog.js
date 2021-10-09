import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [toggle, setToggle] = useState(true)

  const buttonToggle = () => setToggle(!toggle)

  return (
    <div data-cy={blog.title} className='blog'>
      {/* if toggle true or false */}
      { toggle
        ?
        <div>
          &quot;{blog.title}&quot; by {blog.author}{' '}
          <button onClick={buttonToggle}>View</button>
        </div>
        :
        <div className='expandedBlog'>
          &quot;{blog.title}&quot; by {blog.author}{' '}
          <button onClick={buttonToggle}>Hide</button>
          <div>
              Added by: {blog.user.username}<br />
              Total Likes: {blog.likes}{' '}
            <button data-cy='likeButton' onClick={handleLike}>Like</button><br />
              Url: {blog.url}<br />
            { /* conditional render */
              blog.user.username === user.username
                ? <button data-cy='removeButton' onClick={handleRemove}>Remove</button>
                : null}
          </div>
        </div>
      }
    </div>
  )
}

export default Blog