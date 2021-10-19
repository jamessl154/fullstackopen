const notificationReducer = (state, action) => {
  switch(action.type) {
  case 'NULL':
    return null
  default:
    return state
  }
}

export default notificationReducer