import { LoginFormData } from "../../../Redux/Types/authReduser.type"

export type MapStateType = {
    isAuth: boolean
    loginResultCode: number
    loginResultMessage: string
}
export type MapDispatchType = {
    onLogin: (formData: LoginFormData) => void
}
export type LoginFormContainerPropsType = MapDispatchType & MapStateType

export type LoginFormPropsType = {
    onLogin: (formData: LoginFormData) => void
}