import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { setCollocutorId } from '../../../Redux/Redusers/dialogsReducer'
import { loadProfile, updateProfile, uploadAvatar, 
         switchFriendStatus, getFriends } from '../../../Redux/Redusers/profileReducer'

import { isAuthSelector } from '../../Selectors/loginSelectors'
import { profileSelector, ownerIdSelector, 
        isFollowedSelector, friendsListSelector } from '../../Selectors/profileSeectors'

import { ProfileType, UserItem } from '../../../Redux/Types/profileReduser.type'
import { AppStateType } from '../../../Redux'

import LoginFormContainer from '../Auth/Login/LoginFormContainer'
import Profile from './Profile'


type MapStateProps = { 
    profile: ProfileType | null
    isAuth: boolean
    ownerId: string
    isFollowed: null | boolean
    friendsList: Array<UserItem> | null

}
type MapDispatchProps = {
    loadProfile: (id: string) => void
    updateProfile: (profile: ProfileType) => void
    uploadAvatar: (avatar: string) => void
    switchFriendStatus: (operation: 'add' | 'remove', userId: string) => void
    getFriends: (userId: string) => void
    setCollocutorId: (collocutorId: string) => void
}
type PathParamsType = {
    userId: string
}
type ProfileContainerType = MapDispatchProps & MapStateProps & RouteComponentProps<PathParamsType>


const ProfileContainer: FC<ProfileContainerType> = (props) => {

    const {ownerId, profile, match, history, isAuth, isFollowed, friendsList,
        updateProfile, uploadAvatar, loadProfile, switchFriendStatus, setCollocutorId, getFriends } = props

    // true either url doesn't contain id or id in the url is ownerId 
    const isOwner = !match.params.userId || match.params.userId === ownerId

    useEffect(() => {
        const userId = match.params.userId
        if (userId) loadProfile(userId)
        else if (ownerId) loadProfile(ownerId)
    }, [match.params.userId, loadProfile, ownerId])

    const onAvatarUpload = (e: React.BaseSyntheticEvent) => {
        if(e.target.files.length)
        uploadAvatar(e.target.files[0])
    }

    const deleteFriend = (userId: string) => {
        switchFriendStatus('remove', userId)
    }

    const addFriend = (userId: string) => {
        switchFriendStatus('add', userId)
    }

    const onSendMessageClick = (dialogId?: string) => {
        profile && setCollocutorId(profile._id)
        history.push(`/dialog/${dialogId || ''}`)
    }

    return !isAuth
        ? <LoginFormContainer />
        : <Profile 
            profile={profile}
            isOwner={isOwner}
            isFollowed={isFollowed}
            updateProfile={updateProfile}
            onAvatarUpload={onAvatarUpload}
            removeFriend={deleteFriend}
            addFriend={addFriend}
            friendsList={friendsList}
            getFriendsList={getFriends}
            onSendMessageClick={onSendMessageClick}
         />
}

const mapStateToProps = (state: AppStateType) => ({
    profile: profileSelector(state),
    isAuth: isAuthSelector(state),
    ownerId: ownerIdSelector(state),
    isFollowed: isFollowedSelector(state),
    friendsList: friendsListSelector(state)
})

export default connect<MapStateProps, MapDispatchProps, {}, AppStateType>(
    mapStateToProps, 
    { loadProfile, updateProfile, uploadAvatar, switchFriendStatus, getFriends, setCollocutorId }
    )(ProfileContainer)