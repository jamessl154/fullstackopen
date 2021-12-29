import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Link as HyperLink } from '@material-ui/core'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [toggle, setToggle] = useState(true)

  const buttonToggle = () => setToggle(!toggle)

  return (
    <div data-cy={blog.title} className='blog'>
      <div className='blogHeader'>
        <div>
          {/* if toggle true or false */}
          <HyperLink
            color="secondary"
            underline='hover'
            // https://stackoverflow.com/a/59187804
            component={Link}
            className="blogTitle"
            to={`blogs/${blog.id}`}
          >
            {`"${blog.title}" by ${blog.author}`}
          </HyperLink>
        </div>
        <div>
          { toggle
            ?
            // https://stackoverflow.com/a/50342884
            <Button color="secondary" onClick={buttonToggle}>+</Button>
            :
            <Button color="secondary" onClick={buttonToggle}>-</Button>
          }
        </div>
      </div>
      { toggle ?
        null
        :
        <div className="expandedBlog">
            Added by: {blog.user.username}<br />
            Total Likes: {blog.likes}{' '}
          <Button data-cy='likeButton' onClick={handleLike} type="submit">&#128077;</Button><br />
            Url: <HyperLink color="secondary" underline="always" href={`/blogs/${blog.id}`}>{blog.url}</HyperLink><br />
          { /* conditional render */
            blog.user.username === user.username
              ? <button data-cy='removeButton' onClick={handleRemove}>Remove</button>
              : null}
        </div>
      }
    </div>
  )
}

export default Blog