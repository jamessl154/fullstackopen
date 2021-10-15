import { connect } from 'react-redux'
import React from 'react'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: props.notification.visibility
  }

  return (
    <div style={style}>
      {props.notification.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// connect Notification to the redux store,
// which returns a connected component that is immediately exported
// mapDispatchToProps null second argument
export default connect(mapStateToProps)(Notification)