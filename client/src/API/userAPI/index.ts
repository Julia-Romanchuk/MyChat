import UsersAPI from './userAPI.type'
import { request } from "../Helpers/fetch"

const usersAPI: UsersAPI = {
    async searchUsers (usernameParam) {
        return request(`/users/${usernameParam}`)
    } 
} 

export default usersAPI