import AuthAPI from "./authAPI.type"
import { requestWithCredentials, request } from "../Helpers/fetch"

const authAPI: AuthAPI = {
    async registration (formData) {
        return request('/auth/registration', "POST", formData)
    },
    async login (formData) {
        const response = await request('/auth/login', 'POST', formData)
        if (response.status) localStorage.setItem('token', response.data.token)
        return response
    },
    async authMe () {
        return await requestWithCredentials('/auth/authMe')
    }
}

export default authAPI