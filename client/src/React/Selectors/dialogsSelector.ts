import { AppStateType } from '../../Redux'
// @ts-ignore
export const dialogsSelector = (state: AppStateType) => state.DialogsReduser.dialogs
// @ts-ignore
export const dialogSelector = (state: AppStateType) => state.DialogsReduser.dialog
// @ts-ignore
export const dialogIdSelector = (state: AppStateType) => state.ProfileReduser.profile.dialogId
 