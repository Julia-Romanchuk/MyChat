import React, { FC } from 'react'
import { AppStateType } from '../../../Redux'
import { usersListSelector } from '../../Selectors/usersSelector'
import { getUsers } from '../../../Redux/Redusers/usersReducer'
import { connect } from 'react-redux'
import { Menu, Avatar } from 'antd'
import defaultAvatar from '../../../images/defaultAvatar.png'
import { withRouter, RouteComponentProps } from 'react-router'
import { SearchUserItem } from '../../../Redux/Types/usersReduser.type'

type MapStateType = {
    usersList: Array<SearchUserItem> | null
}
type MapDispatchProps = {
    getUsers: (usernameParam: string) => void
}

type DialogContainerType = MapDispatchProps & MapStateType & RouteComponentProps

const UsersList: FC<DialogContainerType> = ({usersList, getUsers, history}) => {

   const onUsersClick = (userId: string) => { history.push(`/profile/${userId}`) }

    return usersList
    ? <Menu
        mode='inline' 
        theme='light'
        >
        {usersList.map((userItem) => {
            return (
                <Menu.Item 
                    key={userItem._id} 
                    icon={<Avatar size='large' src={userItem.image || defaultAvatar} />}
                    onClick={() => onUsersClick(userItem._id)}
                    children={`${userItem.firstname} ${userItem.lastname}`}
                />
                )
            })
        }
    </Menu>
    : <p>No users found</p>
    
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    usersList: usersListSelector(state)
})



export default withRouter(connect<MapStateType, MapDispatchProps, {}, AppStateType>(mapStateToProps, { getUsers })(UsersList))