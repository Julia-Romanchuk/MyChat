import React, { FC, useEffect } from 'react'
import { AppStateType } from '../../../Redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Menu, Avatar } from 'antd'

import { getDialogs } from '../../../Redux/Redusers/dialogsReducer'

import { DialogListItem } from '../../../Redux/Types/dilaogsReducer.type'
import { dialogsSelector } from '../../Selectors/dialogsSelector'
import { ownerIdSelector } from '../../Selectors/profileSeectors'

import defaultAvatar from '../../../images/defaultAvatar.png'


type MapStateType = {
    dialogs: Array<DialogListItem> | null
    ownerId: string
}
type MapDispatchProps = {
    getDialogs: () => void
}

type DialogContainerType = MapDispatchProps & MapStateType & RouteComponentProps

const DialogsList: FC<DialogContainerType> = ({dialogs, getDialogs, history, ownerId}) => {

    useEffect(() => {getDialogs()}, [getDialogs])

    const onDialogItemClick = (dialogId: string) => {
        history.push(`/dialog/${dialogId}`) 
    }

    return dialogs
    ? <Menu
        mode='inline' 
        theme='light'
        >
        {dialogs.map((dialogItem) => {
            const collocutor = dialogItem.authors.filter(author => author._id !== ownerId)[0]
            return (
                <Menu.Item 
                    key={collocutor._id} 
                    icon={ <Avatar size='large' src={collocutor.image || defaultAvatar} /> }
                    onClick={() => onDialogItemClick(dialogItem._id)}
                >
                    <span>
                        {collocutor.firstname}
                    </span>
                </Menu.Item>
                )
            })}
    </Menu>
    : <p>You dont have dialogs yet</p>
    
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    dialogs: dialogsSelector(state),
    ownerId: ownerIdSelector(state),
})

export default withRouter(connect<MapStateType, MapDispatchProps, {}, AppStateType>(mapStateToProps, { getDialogs })(DialogsList))