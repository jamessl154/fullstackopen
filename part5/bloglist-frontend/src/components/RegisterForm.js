import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')

  return (
    <div>
      <div className='frontpage-title-text'>BlogList</div>
      <div className="center-form">
        <form data-cy='registerForm'>
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
              value={confirmation}
              name="Confirmation"
              onChange={({ target }) => setConfirmation(target.value)}
            />
          </div>
          <div className='frontpage-buttons'>
            <div className='button-gap'>
              <Button color='secondary' type="submit">Register</Button>
              <Button component={Link} to="/" color="secondary">Back</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm