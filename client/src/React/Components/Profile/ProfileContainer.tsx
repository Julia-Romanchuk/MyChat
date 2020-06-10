import React, { FC, useEffect } from 'react'
import Profile from './Profile'
import { RouteComponentProps } from 'react-router'
import { AppStateType } from '../../../Redux'
import { profileSelector, ownerIdSelector, friendOperationResultSelector, isFollowedSelector, friendsListSelector } from '../../Selectors/profileSeectors'
import { loadProfile, updateProfile, uploadAvatar, switchFriendStatus, getFriends } from '../../../Redux/Redusers/profileReducer'
import { ProfileType, UserItem } from '../../../Redux/Types/profileReduser.type'
import { isAuthSelector } from '../../Selectors/loginSelectors'
import { connect } from 'react-redux'
import LoginFormContainer from '../Auth/Login/LoginFormContainer'
import { ResultType } from '../../../Redux/Types/authReduser.type'

type MapStateProps = {
    profile: ProfileType | null
    isAuth: boolean
    ownerId: string
    friendOperationResult: ResultType
    isFollowed: null | boolean
    friendsList: Array<UserItem> | null

}
type MapDispatchProps = {
    loadProfile: (id: string) => void
    updateProfile: (profile: ProfileType) => void
    uploadAvatar: (avatar: string) => void
    switchFriendStatus: (operation: 'add' | 'remove', userId: string) => void
    getFriends: (userId: string) => void
}
type PathParamsType = {
    userId: string
}
type ProfileContainerType = MapDispatchProps & MapStateProps & RouteComponentProps<PathParamsType>


const ProfileContainer: FC<ProfileContainerType> = (props) => {

    const {ownerId, profile, match, history, isAuth, friendOperationResult, isFollowed,
        updateProfile, uploadAvatar, loadProfile, switchFriendStatus, friendsList, getFriends } = props

    // true either url doesn't contain id or if id in url equal to ownerId 
    const isOwner = !match.params.userId || match.params.userId === ownerId

    useEffect(() => {
        const userId = match.params.userId
        if (userId) loadProfile(userId)
        else if (ownerId) loadProfile(ownerId)
    }, [match.params.userId])

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
        history.push(`/dialog/${dialogId || ''}`)
    }

    return !isAuth
        ? <LoginFormContainer />
        : <Profile 
            profile={profile}
            isOwner={isOwner}
            friendOperationResult={friendOperationResult}
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
    friendOperationResult: friendOperationResultSelector(state),
    isFollowed: isFollowedSelector(state),
    friendsList: friendsListSelector(state)
})

export default connect<MapStateProps, MapDispatchProps, {}, AppStateType>(
    mapStateToProps, 
    { loadProfile, updateProfile, uploadAvatar, switchFriendStatus, getFriends }
    )(ProfileContainer)