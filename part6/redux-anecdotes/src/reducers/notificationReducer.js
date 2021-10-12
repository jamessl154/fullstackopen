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

export const setNotification = (text) => {
    return {
        type: 'NOTIFY',
        text
    }
}

export const removeNotification = () => {
    return {
        type: 'RESET'
    }
}

export default notificationReducer