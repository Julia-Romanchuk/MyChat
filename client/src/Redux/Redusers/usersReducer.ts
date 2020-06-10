import { InitialStateType, SearchUserItem } from "../Types/usersReduser.type";
import { Reducer, Dispatch } from "react";
import usersAPI from '../../API/userAPI'

type CombinedActions = 
    ReturnType<typeof setUsersList>

const initialState: InitialStateType = {
    usersList: null
}

const usersReducer: Reducer<InitialStateType, CombinedActions> = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS_LIST':
            return {...state, usersList: action.usersList}
        default:
            return state
    }
}

const setUsersList = (usersList: Array<SearchUserItem>) => ({type: 'SET_USERS_LIST', usersList} as const)

export const getUsers = (usernameParams: string) => async (dispatch: Dispatch<CombinedActions>) => {
    const response = await usersAPI.searchUsers(usernameParams)
    response.status
    ? dispatch(setUsersList(response.data.users))
    : console.log('ERROR')
}

export default usersReducer