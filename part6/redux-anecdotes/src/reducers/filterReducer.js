const filterAtStart = ''

const filterReducer = (state = filterAtStart, action) => {
    switch(action.type) {
        case 'FILTER_CHANGE':
            return action.input
        default:
            return state
    }
}

export const formInput = (input) => {
    return {
        type: 'FILTER_CHANGE',
        input
    }
}

export default filterReducer