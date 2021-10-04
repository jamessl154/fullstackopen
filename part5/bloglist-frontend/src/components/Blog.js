import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [toggle, setToggle] = useState(true)
  const [likes, setlikes] = useState(blog.likes)

  const buttonToggle = () => setToggle(!toggle)

  const handleLike = async () => {

    let updateRequest = { likes: likes + 1 }

    setlikes(likes + 1)
    await blogService.addLikes(blog.id, updateRequest)
    // console.log('response', response)
  }

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
              Total Likes: {likes}{' '}
              <button onClick={handleLike}>Like</button><br />
              Url: {blog.url}<br />
            </div>
          </div>
      }
    </div>
  )
}

export default Blog