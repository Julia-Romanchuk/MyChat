import React, { FC, useEffect } from 'react'
import { AppStateType } from '../../../Redux'
import { DialogListItem } from '../../../Redux/Types/dilaogsReducer.type'
import { dialogsSelector } from '../../Selectors/dialogsSelector'
import { getDialogs } from '../../../Redux/Redusers/dialogsReducer'
import { connect } from 'react-redux'
import { Menu, Avatar, Badge } from 'antd'
import defaultAvatar from '../../../images/defaultAvatar.png'
import { withRouter, RouteComponentProps } from 'react-router'
import { ownerIdSelector } from '../../Selectors/profileSeectors'

type MapStateType = {
    dialogs: Array<DialogListItem>
    ownerId: string
}
type MapDispatchProps = {
    getDialogs: () => void
}

type DialogContainerType = MapDispatchProps & MapStateType & RouteComponentProps

const DialogsList: FC<DialogContainerType> = ({dialogs, getDialogs, history, ownerId}) => {

    useEffect(() => {getDialogs()}, [])

    const onDialogItemClick = (dialogId: string) => { history.push(`/dialog/${dialogId}`) }

    return dialogs
    ? <Menu
        mode='inline' 
        theme='light'
        >
        {dialogs.map((dialogItem) => {
            return (
                <Menu.Item 
                    key={dialogItem.authors.filter(author => author._id !== ownerId)[0]._id} 
                    icon={
                            <Avatar 
                                size='large' 
                                src={dialogItem.authors.filter(author => author._id !== ownerId)[0].image || defaultAvatar} 
                            />
                        }
                    onClick={() => onDialogItemClick(dialogItem._id)}
                >
                    <span>
                        {dialogItem.authors.filter(author => author._id !== ownerId)[0].firstname}
                    </span>
                </Menu.Item>
                )
            })}
    </Menu>
    : <p>You dont have dialogs yet</p>
    
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    dialogs: dialogsSelector(state),
    ownerId: ownerIdSelector(state)
})

export default withRouter(connect<MapStateType, MapDispatchProps, {}, AppStateType>(mapStateToProps, { getDialogs })(DialogsList))