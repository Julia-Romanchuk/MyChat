import { SearchUserItem } from "../Types/usersReduser.type";
import usersAPI from '../../API/userAPI'
import { ThunkBase } from "../Types/common.type";

const initialState: InitialState = {
    usersList: null
}

const usersReducer = (state = initialState, action: CombinedActions): InitialState => {
    switch (action.type) {
        case 'SET_USERS_LIST':
            return {...state, usersList: action.usersList}
        default:
            return state
    }
}

const setUsersList = (usersList: Array<SearchUserItem>) => ({type: 'SET_USERS_LIST', usersList} as const)

export const getUsers = (usernameParams: string): Thunk => async (dispatch) => {
    const response = await usersAPI.searchUsers(usernameParams)
    response.status
    ? dispatch(setUsersList(response.data.users))
    : console.log('ERROR')
}

export default usersReducer

type CombinedActions = 
    ReturnType<typeof setUsersList>

type InitialState = {
    usersList: null | Array<SearchUserItem>
}

type Thunk = ThunkBase<CombinedActions>