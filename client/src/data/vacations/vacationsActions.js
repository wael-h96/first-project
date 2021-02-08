import * as api from '../../utils';
import axios from 'axios';
export const VACATION_ADDED = "/api/vacations/add-vacation";
export const ALL_VACATIONS = "/vacations/";
export const FOLLOWED_VACATIONS = "/vacations/follow-vacation";
export const ALL_FOLLOWED_VACATIONS = "/vacations/unfollow-vacation";
export const FOLLOWED_VACATIONS_CHART = "vacations/number-of-followers/chart";

export const addVacation = (vacation) => async dispatch => {
    const formData = getNewFormData(vacation)
    try {
        const response = await axios.post('/api/vacations/add-vacation', formData)
        dispatch({ type: VACATION_ADDED, vacation: response.data })
    } catch (errors) {
        console.log(errors)
    }
}

export const fetchAllVacations = () => async dispatch => {
    try {
        const allVacations = await api.get("/vacations");
        dispatch({ type: ALL_VACATIONS, vacation: allVacations.data })
    } catch (errors) {
        console.log({ errors })
    }
}

export const fetchAllFollowedVacations = (userId) => async dispatch => {
    const followedVacations = await api.get(`/vacations/followed-vacations/${userId}`)
    dispatch({ type: ALL_FOLLOWED_VACATIONS, vacations: followedVacations.data })
}

export const updateVacation = (vacationToUpdate) => async dispatch => {

    try {
        const form = getNewFormData(vacationToUpdate)
        const allVacations = await axios.post('/api/vacations/update-vacation', form)
        dispatch({ type: ALL_VACATIONS, vacation: allVacations.data })
    } catch (errors) {
        console.log(errors)
    }
}

export const deleteVacation = (id) => async dispatch => {
    const vacations = await api.post("/vacations/delete", { id })
    if (vacations) {
        dispatch({ type: ALL_VACATIONS, vacation: vacations.data })
    }
}

export const followVacation = (userFollowVacation) => async dispatch => {
    const vacation = await api.post("/vacations/follow-vacation", userFollowVacation)
    dispatch({ type: ALL_FOLLOWED_VACATIONS, vacations: vacation.data })
}

export const unfollowVacation = (userUnfollowVacation) => async dispatch => {
    try {
        const returnedVacations = await api.post("/vacations/unfollow-vacation", userUnfollowVacation)
        dispatch({ type: ALL_FOLLOWED_VACATIONS, vacations: returnedVacations.data })
    } catch (errors) {
        console.log(errors)
    }
}

export const fetchVacationsFollowedId = () => async dispatch => {
    const followedVacationsNames = await api.get("/vacations/number-of-followers/chart")
    if (followedVacationsNames) {
        dispatch({ type: FOLLOWED_VACATIONS_CHART, vacations: followedVacationsNames.data })
    }
}


const getNewFormData = (vacation) => {
    const formData = new FormData()
    formData.append("id", vacation.id)
    formData.append("description", vacation.description)
    formData.append("destination", vacation.destination)
    formData.append("from", vacation.from)
    formData.append("to", vacation.to)
    formData.append("price", vacation.price)
    formData.append("imageFile", vacation.vacationImage)
    return formData
}