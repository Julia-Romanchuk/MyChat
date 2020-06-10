import { ProfileType, UserItem } from "../../Redux/Types/profileReduser.type";
import { APIMethodReturn } from "../api.type";

type ProfileAPI = {
    getProfile: (id: string) => APIMethodReturn<{ profile: ProfileType}>
    updateProfile: (profile: ProfileType) => APIMethodReturn<{ profile: ProfileType}>
    uploadAvatar: (avatar: string) => APIMethodReturn<{ avatarURL: string }> 
    addFriend: (userId: string) => APIMethodReturn<{isFollowed: boolean}>
    removeFriend: (userId: string) => APIMethodReturn<{isFollowed: boolean}>
    getFriends: (userId: string) => APIMethodReturn<{ friendsList: Array<UserItem> }>
}

export default ProfileAPI