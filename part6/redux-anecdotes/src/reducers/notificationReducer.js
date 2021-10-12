const notificationAtStart = {
    visibility: 'hidden',
    text: 'Nothing here'
}

const notificationReducer = (state = notificationAtStart, action) => {
    switch(action.type) {
        case 'NOTIFY':
            return { visibility: 'visible', text: action.text }
        case 'RESET':
            return notificationAtStart
        default:
            return state
    }
}

export const setNotification = (text, seconds) => {
    return async (dispatch) => {
        dispatch({ type: 'NOTIFY', text })
        setTimeout(() => dispatch({ type: 'RESET' })
        , seconds * 1000)
    }
}

export default notificationReducer