import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({ username, password, handleLogin,
  setPassword, setUsername }) => {
  const [frontPage, setFrontpage] = useState(null)

  return (
    <div>
      <div className='frontpage-title-text'>BlogList</div>
      { !frontPage ?
        <div className='frontpage-buttons'>
          <Button onClick={() => setFrontpage('login')} color="secondary">Log in</Button>
          <Button onClick={() => setFrontpage('register')} color="secondary">Register</Button>
        </div>
        : frontPage === 'login' ?
          <div className="center-form">
            <form data-cy='loginForm' onSubmit={handleLogin}>
              <TextField
                variant="standard"
                id='username'
                label='Username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
              <br />
              <TextField
                variant="standard"
                id='password'
                label='Password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
              <br />
              <div className='frontpage-buttons'>
                <Button color='secondary' data-cy='loginButton' type="submit">Log in</Button>
                <Button color='secondary' onClick={() => setFrontpage(null)}>Back</Button>
              </div>
            </form>
          </div>
          : // register
          <>
            TODO
            <br />
            <div className="center-form">
              <Button color='secondary' onClick={() => setFrontpage(null)}>Back</Button>
            </div>
          </>
      }
    </div>
  )
}

export default LoginForm