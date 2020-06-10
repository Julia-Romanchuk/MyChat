import { ServerResponse } from "../api.type";
import ProfileAPI from './profileAPI.type'
import { requestWithCredentials } from "../Helpers/fetch";
import axios, { AxiosResponse } from 'axios'

const profileAPI: ProfileAPI = {
    async getProfile (id) {
        return await requestWithCredentials('/profile/' + id)
    },
    async updateProfile (profile) {
        return await requestWithCredentials('/profile/updateProfile', 'PUT', {profile})
    },
    //// @
    //async uploadAvatar (avatar) {
    //    const Bearer = 'Bearer ' + localStorage.getItem('token')
    //    const formData = new FormData()
    //    formData.append('image', avatar)
    //    console.log(formData.get('image'))
    //    const response = await fetch('/profile/uploadAvatar', {method: 'PUT',
    //     body: JSON.stringify(formData), 
    //    headers: {
    //        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarybG6Cd3wvJO3BaXyvv", 
    //        //"Content-Transfer-Encoding": "binary",
    //        'Authorization': Bearer
    //    }})
    //    await response.json()
    //    return response
    //    
    //},
    async uploadAvatar (avatar) {
        const Bearer = 'Bearer ' + localStorage.getItem('token')
      let formData = new FormData;
        formData.append('image', avatar)
        const response: AxiosResponse<ServerResponse<{avatarURL: string}>> = 
        await axios.put('http://localhost:3000/profile/uploadAvatar',
        formData, 
        {headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': Bearer
            }} 
        )
        return response.data
    },
    async addFriend (userId) {
        return await requestWithCredentials('/friends', 'PUT', {userId})
    },
    async removeFriend (userId) {
        return await requestWithCredentials('/friends', 'DELETE', {userId})
    },
    async getFriends (userId) {
        return await requestWithCredentials(`/profile/${userId}/friends`)
    }
}

export default profileAPI