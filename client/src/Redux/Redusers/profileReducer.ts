import { ProfileType, UserItem } from "../Types/profileReduser.type";
import { ServerResponse } from "../../API/api.type"
import profileAPI from '../../API/profileAPI'
import { ThunkBase, Reducer } from "../Types/common.type";

const initialState: InitialState = {
    profile: null,
    isFollowed: false,
    friendsList: null
}

const profileReduser = (state = initialState, action: CombinedActions): InitialState => {
    switch (action.type) {
        case "SET_PROFILE":
            return {...state, profile: action.profile}
        case 'SET_AVATAR':
            if (state.profile)
            return {...state, profile: {...state.profile, image: action.avatarURL}}
            return {...state}
        case 'IS_FOLLOWED': 
            return {...state, isFollowed: action.isFollowed}
        case 'SET_FRIENDS_LIST': 
            return {...state, friendsList: action.friendsList}
        default:
            return state
    }
}

export const setProfile = (profile: ProfileType) => ({type: 'SET_PROFILE', profile} as const)
export const setAvatar = (avatarURL: string) => ({type: 'SET_AVATAR', avatarURL} as const) 
export const setFriendsList = (friendsList: Array<UserItem>) => ({type: 'SET_FRIENDS_LIST', friendsList} as const)
export const isFollowed = (isFollowed: boolean) => ({type: 'IS_FOLLOWED', isFollowed} as const)

export const loadProfile = (id: string): Thunk => async (dispatch) => {
    const response = await profileAPI.getProfile(id)
    if (response.status) {
        dispatch(setProfile(response.data.profile))
        dispatch(isFollowed(response.data.profile.followed))
    } else {
        console.log('ERROR', response.message)
    }
}

export const updateProfile = (profile: ProfileType): Thunk => async (dispatch) => {
    const response = await profileAPI.updateProfile(profile)
    if (response.status) {
        dispatch(setProfile(response.data.profile))
    } else {
        console.log('Updating profile error')
    }
}

export const uploadAvatar = (avatar: string): Thunk => async (dispatch) => {
    const response = await profileAPI.uploadAvatar(avatar)
    if (response.status) {
        dispatch(setAvatar(response.data.avatarURL))
    } else {
        console.log('Uploading avatar error')
    }
}

export const switchFriendStatus = (operation: 'add' | 'remove', userId: string): Thunk => 
    async (dispatch) => {
        let response: ServerResponse<{isFollowed: boolean}>
        switch (operation) {
            case 'add': 
                response = await profileAPI.addFriend(userId)
                break
            case 'remove': 
                response = await profileAPI.removeFriend(userId)
        }
        if (response.status) {
            dispatch(isFollowed(response.data.isFollowed))
        } else {
            console.log('Friend List error')
    }
}

export const getFriends = (userId: string): Thunk => async (dispatch) => {
    const response = await profileAPI.getFriends(userId)
    if (response.status) {
        dispatch(setFriendsList(response.data.friendsList))
    } else {
        console.log('error')
    }
}

export default profileReduser

type CombinedActions = 
    ReturnType<typeof setProfile> | 
    ReturnType<typeof setAvatar> | 
    ReturnType<typeof isFollowed> |
    ReturnType<typeof setFriendsList>

type InitialState = {
    profile: ProfileType | null,
    isFollowed: boolean,
    friendsList: null | Array<UserItem>
}

type Thunk = ThunkBase<CombinedActions>