import * as ACTIONS from './messagesActions'
const initialState = {
    messageList: '',
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_MESSAGE:
            return { ...state, messageList: action.message };
        default:
            return initialState
    }
}

export default messagesReducer;