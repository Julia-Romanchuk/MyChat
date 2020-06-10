import { RegistFormData, LoginFormData } from "../../Redux/Types/authReduser.type";
import { APIMethodReturn } from "../api.type";

type AuthAPI = {
    registration: (formData: RegistFormData) => APIMethodReturn<null>
    login: (formData: LoginFormData) => APIMethodReturn<{ token: string } | null>
    authMe: () => APIMethodReturn<{ ownerId: string }>
}

export default AuthAPI