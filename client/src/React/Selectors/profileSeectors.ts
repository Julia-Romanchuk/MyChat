import { AppStateType } from '../../Redux'
import { ProfileType } from '../../Redux/Types/profileReduser.type'
//@ts-ignore
export const profileSelector = (state: AppStateType): ProfileType => state.ProfileReduser.profile
//@ts-ignore
export const ownerIdSelector = (state: AppStateType) => state.AuthReduser.ownerId
// @ts-ignore
export const friendOperationResultSelector = (state: AppStateType) => state.ProfileReduser.friendOperationResult
// @ts-ignore
export const isFollowedSelector = (state: AppStateType) => state.ProfileReduser.isFollowed
// @ts-ignore
export const friendsListSelector = (state: AppStateType) => state.ProfileReduser.friendsList 