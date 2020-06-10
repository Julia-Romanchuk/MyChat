import ValidationAPI from "./validationAPI.type"
import { request } from "../Helpers/fetch"

export const validationAPI: ValidationAPI = {
    async validate (value) {
        return await request(`/validate/${Object.keys(value)}`, 'POST', value)
    }
}