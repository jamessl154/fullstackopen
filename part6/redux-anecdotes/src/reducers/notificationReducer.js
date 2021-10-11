const notificationAtStart = 'TODO'

const notificationReducer = (state = notificationAtStart, action) => {
    switch(action.type) {
        case 'TODO':
            return null
        default:
            return state
    }
}

export default notificationReducer