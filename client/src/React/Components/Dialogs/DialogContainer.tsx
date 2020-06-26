import React, { FC, useEffect, useState, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { AppStateType } from '../../../Redux'
import { getDialogs, getDialog, sendMessage } from '../../../Redux/Redusers/dialogsReducer'

import { dialogSelector, collocutorIdSelector, collocutor } from '../../Selectors/dialogsSelector'
import { ownerIdSelector } from '../../Selectors/profileSeectors'

import { UserItem } from '../../../Redux/Types/profileReduser.type'
import { Dialog } from '../../../Redux/Types/dilaogsReducer.type'

import DialogE from './Dialog'
type MapStateType = {
    dialog: Dialog | null
    ownerId: string
    collocutorId: string
    collocutor: UserItem | null
}
type MapDispatchProps = {
    getDialogs: () => void
    getDialog: (dialogId: string) => void
    sendMessage: (text: string, userId: string, dialogId?: string) => void
}

type PathParamsType = {
    dialogId: string
}

type DialogContainerType = MapDispatchProps & MapStateType & RouteComponentProps<PathParamsType>

const DialogContainer: FC<DialogContainerType> = (props) => {

    const {dialog, match, history, ownerId, collocutorId, collocutor,
        getDialog, sendMessage} = props

    const dialogId = match.params.dialogId

    const [messageText, setMessageText] = useState('')

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(e.target.value)
    }

    useEffect(() => {
        dialogId &&
        getDialog(dialogId)
    }, [dialogId, getDialog])

    const onMessageSend = (text: string) => {
        dialogId
        // send message to corresponding dialod
        ? sendMessage(text, collocutorId, dialogId)
        // send request with userId, if dialog with this user doesnt exist
        //in order to create a new dialog and add message in 
        : sendMessage(text, collocutorId) 
        setMessageText('')
    }

    const redirectToProfile = (userId: string) => {
        history.push(`/profile/${userId}`)
    }

    return (
        <DialogE 
            ownerId={ownerId}
            dialog={dialog}
            isDialogExist={dialogId ? true : false}
            onMessageSend={onMessageSend}
            redirectToProfile={redirectToProfile}
            messageText={messageText}
            onMessageChange={onMessageChange}
            collocutor={collocutor} />
    )
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    dialog: dialogSelector(state),
    ownerId: ownerIdSelector(state),
    collocutorId: collocutorIdSelector(state),
    collocutor: collocutor(state)
})

export default connect<MapStateType, MapDispatchProps, {}, AppStateType>(
    mapStateToProps, { getDialogs, getDialog, sendMessage })(DialogContainer)