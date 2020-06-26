import React, { FC, useState, ChangeEvent } from 'react'
import {Button, Avatar, Row, Col, Typography, Spin } from 'antd'
import defaultAvatar from '../../../images/defaultAvatar.png'
import ProfileInfoBox from './ProfileParts/ProfileInfoBox'
import EditProfileInfoBox from './ProfileParts/ProfileEditMode'
import BestFriendsBox from './ProfileParts/BestFriendsBox'
import { ProfileType, UserItem } from '../../../Redux/Types/profileReduser.type'

type TProfile = {
    profile: ProfileType | null
    isOwner: boolean
    updateProfile: (profile: ProfileType) => void
    onAvatarUpload: (e: ChangeEvent<HTMLInputElement>) => void
    addFriend: (userId: string) => void
    removeFriend: (userId: string) => void
    isFollowed: null | boolean
    friendsList: Array<UserItem> | null
    getFriendsList: (userId: string) => void
    onSendMessageClick: (dialogId?: string) => void
}

type PathParamsType = {
    dialogId?: string
}

const sizing = { xs: 8, sm: 8, md: 6, lg: 4 }

const Profile: FC<TProfile> = (props) => {

    const {
        profile, isOwner, onAvatarUpload, friendsList, isFollowed,
        addFriend, removeFriend, updateProfile, getFriendsList, onSendMessageClick} = props

    const [editMode, setEditMode] = useState(false)
    
    return (
        profile === null
        ? <Spin size='large' />
        : <div style={{height: 'strench'}} >
        <Row>
        <Col {...sizing} >
            <div>
                <Avatar src={profile.image ? profile.image : defaultAvatar} shape='square' style={ {width: "100%", height: "100%"} }/>
                {!isOwner  
                ? <Button.Group>
                    {isFollowed
                    ? <Button type='primary' onClick={() => removeFriend(profile._id)} >Delete from best</Button>
                    : <Button type='primary' onClick={() => addFriend(profile._id)} >Add to best</Button>}
                    <Button onClick={() => onSendMessageClick(profile.dialogId)} >Send message</Button>    
                </Button.Group>
                : editMode && 
                <input onChange={onAvatarUpload} type='file'/> }
            </div>
        </Col>
        <Col xs={16} sm={18} md={20} lg={20} >
            {isOwner && <>
            {editMode
            ? <Button danger onClick={() => setEditMode(false)}> Cancel </Button>
            : <Button type='primary' onClick={() => setEditMode(true)}> Edit profile </Button>} </> }
            
            {editMode 
            ? <EditProfileInfoBox updateProfile={updateProfile} profile={profile} setEditMode={setEditMode} /> 
            : <ProfileInfoBox profile={profile}  />}
        </Col>     
        </Row>

        <Row>
        <Col xs={24} sm={24} md={14} lg={12} xl={6} >
        { !!profile.bestFriends.length && 
         <BestFriendsBox 
            friends={profile.bestFriends} 
            friendsList={friendsList} 
            getFriendsList={getFriendsList} 
            userId={profile._id} />
        }
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} >
            <Typography.Paragraph>
                {profile.aboutMe ? profile.aboutMe : 'About me'}
            </Typography.Paragraph>
        </Col>        
    </Row>
    {!isOwner && <Button style={{float: 'right'}} danger >Block user</Button>}
    </div>
    )
}

export default Profile