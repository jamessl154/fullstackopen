import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [toggle, setToggle] = useState(true)

  const buttonToggle = () => setToggle(!toggle)

  return (
    <div className='blog'>
      {/* if toggle true or false */}
      { toggle
        ? <div>
            "{blog.title}" by {blog.author}{' '}
            <button onClick={buttonToggle}>View</button>
          </div>
        : <div>
            "{blog.title}" by {blog.author}{' '}
            <button onClick={buttonToggle}>Hide</button>
            <div>
              Added by: {blog.user.username}<br />
              Likes: {blog.likes}<br />
              Url: {blog.url}<br />
            </div>
          </div>
      }
    </div>
  )
}

export default Blog