import { AppStateType } from '../../Redux'
import { createSelector } from 'reselect'
import { ownerIdSelector } from './profileSeectors'

export const dialogsSelector = (state: AppStateType) => state.DialogsReduser.dialogs
export const dialogSelector = (state: AppStateType) => state.DialogsReduser.dialog
export const collocutorIdSelector = (state: AppStateType) => state.DialogsReduser.collocutorId

export const collocutor = createSelector(
    [ownerIdSelector, dialogSelector],
    (ownerId, dialog) => {
        return dialog
        ? dialog.authors.filter(author => author._id !== ownerId)[0]
        : null
    }
)  