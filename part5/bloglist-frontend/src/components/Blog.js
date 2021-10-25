import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Link as HyperLink } from '@mui/material'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [toggle, setToggle] = useState(true)

  const buttonToggle = () => setToggle(!toggle)

  return (
    <div data-cy={blog.title} className='blog'>
      {/* if toggle true or false */}
      <HyperLink
        className='blogClass'
        underline='hover'
        color='inherit'
        variant='button'
        component={Link}
        to={`blogs/${blog.id}`}
      >
        {`"${blog.title}" by ${blog.author}`}
      </HyperLink>{' '}
      { toggle
        ?
        <Button className="rightAlignButton" size='small' onClick={buttonToggle}>View</Button>
        :
        // https://stackoverflow.com/a/59187804
        <>
          <Button size='small' className="rightAlignButton" onClick={buttonToggle}>Hide</Button>
          <div className='blogClass2'>
              Added by: {blog.user.username}<br />
              Total Likes: {blog.likes}{' '}
            <button data-cy='likeButton' onClick={handleLike}>Like</button><br />
              Url: <HyperLink href={`/blogs/${blog.id}`}>{blog.url}</HyperLink><br />
            { /* conditional render */
              blog.user.username === user.username
                ? <button data-cy='removeButton' onClick={handleRemove}>Remove</button>
                : null}
          </div>
        </>
      }
    </div>
  )
}

export default Blog