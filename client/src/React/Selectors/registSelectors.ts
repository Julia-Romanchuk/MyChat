import { createSelector } from 'reselect'
import { AppStateType } from '../../Redux'
//@ts-ignore
const resultSelector = (state: AppStateType) => state.AuthReduser.registrationResult

export const statusCode = createSelector(resultSelector, result => result.status) 
export const message = createSelector(resultSelector, result => result.message) 
