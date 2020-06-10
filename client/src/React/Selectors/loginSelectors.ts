import { createSelector } from 'reselect'
import { AppStateType } from '../../Redux'
//@ts-ignore
export const isAuthSelector = (state: AppStateType) => state.AuthReduser.isAuthorized
//@ts-ignore
export const loginResultSelector = (state: AppStateType) => state.AuthReduser.loginResult
//@ts-ignore
export const isFechingSelector = (state: AppStateType) => state.AuthReduser.feachingInProgress

export const loginResultCode = createSelector(loginResultSelector, loginResult => loginResult.status) 
export const loginResultMessage = createSelector(loginResultSelector, loginResult => loginResult.message) 
