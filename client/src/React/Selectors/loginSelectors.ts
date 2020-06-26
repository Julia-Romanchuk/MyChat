import { createSelector } from 'reselect'
import { AppStateType } from '../../Redux'

export const isAuthSelector = (state: AppStateType) => state.AuthReduser.isAuthorized
export const loginResultSelector = (state: AppStateType) => state.AuthReduser.loginResult
export const isFechingSelector = (state: AppStateType) => state.AuthReduser.feachingInProgress

export const loginResultCode = createSelector(loginResultSelector, 
    loginResult => loginResult ? loginResult.status : null) 
    
export const loginResultMessage = createSelector(loginResultSelector, 
    loginResult => loginResult ? loginResult.message : null) 
