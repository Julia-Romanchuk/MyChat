import { createSelector } from 'reselect'
import { AppStateType } from '../../Redux'

const resultSelector = (state: AppStateType) => state.AuthReduser.registrationResult

export const statusCode = createSelector(resultSelector, result => result ? result.status : null) 
export const message = createSelector(resultSelector, result => result ? result.message : null) 
