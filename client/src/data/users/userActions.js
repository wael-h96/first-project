import * as api from '../../utils';
import * as MESSAGE from '../messages/messagesActions';
export const LOGGED_IN = '/users/login';
export const USER_LOGGED_OUT = "/users/logout";

export const login = (user) => async dispatch => {

    const response = await api.post("/users/login", user)
    if (response.errors) {
        dispatch(MESSAGE.setMessage(response.errors))
    } else {
        dispatch({ type: LOGGED_IN, user: response.data })
    }

}

export const logout = () => async dispatch => {

    const result = await api.post("/users/logout", {});
    if (result.errors) {
        console.log(result.errors);
    } else {
        dispatch({ type: USER_LOGGED_OUT });
    }
}


export const register = (user) => async dispatch => {
    const response = await api.post("/users/register", user);
    console.log(response)
    if (response.errors) {
        dispatch(MESSAGE.setMessage(response.errors))
    } else {
        dispatch(MESSAGE.setMessage("User successfully registered"));
    }

}
