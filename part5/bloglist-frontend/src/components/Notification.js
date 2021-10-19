import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
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