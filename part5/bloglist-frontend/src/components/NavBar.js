import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const NavBar = ({ username, handleLogout }) => {
  return (
    <div className='navigationBar'>
      <div className='navButtons'>
        <Button variant="contained" style={{ 'marginRight': '10px' }} component={Link} to="/blogs" disabled={false /* inject state for disabled here*/} size="large">Blogs</Button>
        <Button variant="contained" component={Link} to="/users" disabled={false /* inject state for disabled here*/} size="large">Users</Button>
      </div>
      <div className='logout'>
        <div className='logoutText'>
          {username} is logged in
        </div>
        <Button
          color="secondary"
          size="large"
          variant="outlined"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default NavBar