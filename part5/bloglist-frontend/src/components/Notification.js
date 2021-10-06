import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return (
      <div className='empty notification'>
        Notifications go here
      </div>
    )
  }

  // https://stackoverflow.com/a/37073268
  const classes = `${notification.type} notification`

  return (
    <div className={classes}>
      {notification.message}
    </div>
  )
}

export default Notification