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
        case 'SET_TIMEOUTID':
            return { ...state, timeoutID: action.timeoutID }
        default:
            return state
    }
}

export const setNotification = (text, seconds, prevID) => {
    return async (dispatch) => {
        clearTimeout(prevID)
        dispatch({ type: 'NOTIFY', text })
        // The return value from the setTimeout is an ID unique to that
        // setTimeout. We can cancel prematurely by calling clearTimeout(ID).
        let timeoutID = setTimeout(() => dispatch({ type: 'RESET' })
        , seconds * 1000)
        // We can dispatch an action to save this variable to the store
        // and then, on each call to to setNotification, clear the
        // previous setTimeout, stopping the RESET action from being dispatched.
        
        // Important: need to maintain order of dispatches,
        // this is the last dispatch to the store (before asynchronous dispatch)
        // which leaves the notification state in store with the timeoutID
        // needed to stop the RESET
        dispatch({ type: 'SET_TIMEOUTID', timeoutID })

        // Solves the issue by essentially resetting the timer for the notification
        // to remain visible with the new updated notification
    }
}

export default notificationReducer