import React, { FC, useEffect, useState, ChangeEvent } from 'react'
import DialogE from './Dialog'
import { RouteComponentProps } from 'react-router'
import { AppStateType } from '../../../Redux'
import { Dialog } from '../../../Redux/Types/dilaogsReducer.type'
import { dialogSelector } from '../../Selectors/dialogsSelector'
import { getDialogs, getDialog, sendMessage } from '../../../Redux/Redusers/dialogsReducer'
import { connect } from 'react-redux'
import { ownerIdSelector, profileSelector } from '../../Selectors/profileSeectors'
import { ProfileType } from '../../../Redux/Types/profileReduser.type'

type MapStateType = {
    dialog: Dialog | null
    ownerId: string
    profile: ProfileType
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

    const {dialog, match, history, ownerId, profile, getDialog, sendMessage, } = props

    const dialogId = match.params.dialogId

    const [messageText, setMessageText] = useState('')

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageText(e.target.value)
    }

    useEffect(() => {
        if (dialogId) getDialog(dialogId)
    }, [dialogId])

    const onMessageSend = (text: string) => {
        const userId = dialog ? dialog.authors.filter(author => author._id !== ownerId)[0]._id : profile._id
        dialog || profile._id
        // send message to corresponding dialod
        ? sendMessage(text, userId, dialogId) 
        // send request with userId, if dialog with this user doesnt exist
        //in order to create a new dialog and add message in 
        : sendMessage(text, userId) 
        setMessageText('')
    }

    const redirectToProfile = (userId: string) => {
        history.push(`/profile/${userId}`)
    }

    return <DialogE 
        ownerId={ownerId}
        dialog={dialog}
        isDialogExist={dialogId ? true : false}
        onMessageSend={onMessageSend}
        redirectToProfile={redirectToProfile}
        messageText={messageText}
        onMessageChange={onMessageChange} />
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    dialog: dialogSelector(state),
    ownerId: ownerIdSelector(state),
    profile: profileSelector(state)
})

export default connect<MapStateType, MapDispatchProps, {}, AppStateType>(
    mapStateToProps, { getDialogs, getDialog, sendMessage })(DialogContainer)