import * as ACTIONS from './userActions'

const initialState = {
    currentUser: null,
    role: null,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGGED_IN:
            return { ...state, currentUser: action.user, role: action.user.role };
        case ACTIONS.USER_LOGGED_OUT:
            return initialState;
        default:
            return state;

    }
}

export default usersReducer;