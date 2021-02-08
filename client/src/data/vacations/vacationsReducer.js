import * as ACTIONS from './vacationsActions';

const initialState = {
    vacationsList: [],
    followedVacations: [],
    followedVacationsForChart: [],
}

const vacationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.VACATION_ADDED:
            return { ...state, vacationsList: [...state.vacationsList, action.vacation] };
        case ACTIONS.ALL_VACATIONS:
            return { ...state, vacationsList: action.vacation };
        case ACTIONS.ALL_FOLLOWED_VACATIONS:
            return { ...state, followedVacations: action.vacations }
        case ACTIONS.FOLLOWED_VACATIONS_CHART:
            return { ...state, followedVacationsForChart: action.vacations }
        default:
            return initialState;
    }
}

export default vacationsReducer;