import { AppStateType } from '../../Redux'

export const profileSelector = (state: AppStateType) => state.ProfileReduser.profile
export const ownerIdSelector = (state: AppStateType) => state.AuthReduser.ownerId
export const isFollowedSelector = (state: AppStateType) => state.ProfileReduser.isFollowed
export const friendsListSelector = (state: AppStateType) => state.ProfileReduser.friendsList 