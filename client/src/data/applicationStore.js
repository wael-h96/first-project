import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from './users/usersReducer';
import messagesReducer from './messages/messagesReducer';
import vacationsReducer from './vacations/vacationsReducer'

const applicationStore = createStore(
    combineReducers(
        {
            users: usersReducer,
            messages: messagesReducer,
            vacations: vacationsReducer,
        }
    ),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default applicationStore;