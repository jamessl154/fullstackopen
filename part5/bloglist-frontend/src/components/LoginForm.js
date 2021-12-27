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
          <div className='button-gap'>
            <Button onClick={() => setFrontpage('login')} color="secondary">Login</Button>
            <Button onClick={() => setFrontpage('register')} color="secondary">Register</Button>
          </div>
        </div>
        : frontPage === 'login' ?
          <div className="center-form">
            <form data-cy='loginForm' onSubmit={handleLogin}>
              <div className="input-fields">
                <TextField
                  variant="standard"
                  id='username'
                  label='Username'
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
                <TextField
                  variant="standard"
                  id='password'
                  label='Password'
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <div className='frontpage-buttons'>
                <div className='button-gap'>
                  <Button color='secondary' data-cy='loginButton' type="submit">Login</Button>
                  <Button color='secondary' onClick={() => setFrontpage(null)}>Back</Button>
                </div>
              </div>
            </form>
          </div>
          : // register
          <div className="center-form">
            <form data-cy='registerForm' onSubmit={handleLogin}>
              <div className="input-fields">
                <TextField
                  variant="standard"
                  id='username'
                  label='Username'
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
                <TextField
                  variant="standard"
                  id='password'
                  label='Password'
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
                <TextField
                  variant="standard"
                  id='confirmation'
                  label='Confirm Password'
                  type="confirmation"
                  value={password}
                  name="Confirmation"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <div className='frontpage-buttons'>
                <div className='button-gap'>
                  <Button color='secondary' type="submit">Register</Button>
                  <Button color='secondary' onClick={() => setFrontpage(null)}>Back</Button>
                </div>
              </div>
            </form>
          </div>
      }
    </div>
  )
}

export default LoginForm