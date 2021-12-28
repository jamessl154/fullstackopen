import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const NavLink = ({ disabledButton }) => {
  if (disabledButton) {
    return (
      <>
        {disabledButton === '/blogs' ?
          <div className='navigationBar'>
            <Button variant='outlined' size='small' color='inherit' disabled>Blogs</Button>{' '}
            <Button component={Link} variant='outlined' size='small' color='inherit' to="/users">Users</Button>
          </div>
          :
          <div className='navigationBar'>
            <Button component={Link} variant='outlined' size='small' color='inherit' to="/blogs">Blogs</Button>{' '}
            <Button variant='outlined' size='small' color='inherit' disabled>Users</Button>
          </div>
        }
      </>
    )
  } else {
    return (
      <div className='navigationBar'>
        <Button component={Link} variant='outlined' size='small' color='inherit' to="/blogs">Blogs</Button>{' '}
        <Button component={Link} variant='outlined' size='small' color='inherit' to="/users">Users</Button>
      </div>
    )}
}

export default NavLink