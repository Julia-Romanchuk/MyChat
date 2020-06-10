import { Reducer, Dispatch } from "react"
import authAPI from "../../API/authAPI"
import dialogsAPI from '../../API/dialodsAPI' 
import { StatusCode } from "../../API/api.type"
import {  
    InitialStateType,
    ResultType, 
    RegistFormData, 
    LoginFormData
} from "../Types/authReduser.type"

type CombineActions = 
    ReturnType<typeof registrationResult> |
    ReturnType<typeof loginResult> | 
    ReturnType<typeof isAuth> |
    ReturnType<typeof setOwnerId> |
    ReturnType<typeof isFeaching>    

const initialState: InitialStateType = {
    registrationResult: {
        status: null,
        message: ''
    },
    loginResult: {
        status: null,
        message: ''
    },
    isAuthorized: false,
    ownerId: null,
    feachingInProgress: false
}

const authReduser: Reducer<InitialStateType, CombineActions> = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTRATION_RESULT': 
            return {...state, registrationResult: action.result}
        case 'IS_AUTH':
            return {...state, isAuthorized: action.isAuth}
        case 'LOGIN_RESULT':
            return {...state, loginResult: action.result}
        case 'SET_OWNER_ID':
            return {...state, ownerId: action.ownerId}
        case 'IS_FEACHING':
            return {...state, feachingInProgress: action.isFeaching}
        default: 
            return state 
    }
}

export const registrationResult = (result: ResultType) => ({type: 'REGISTRATION_RESULT', result} as const)
export const loginResult = (result: ResultType) => ({type: 'LOGIN_RESULT', result} as const)
export const isAuth = (isAuth: boolean) => ({type: 'IS_AUTH', isAuth} as const)
export const setOwnerId = (ownerId: string) => ({type: 'SET_OWNER_ID', ownerId} as const)
export const isFeaching = (isFeaching: boolean) => ({type: 'IS_FEACHING', isFeaching} as const)

export const onRegistSubmit = (formData: RegistFormData) => async (dispatch: Dispatch<CombineActions>) => {
    const response = await authAPI.registration(formData)
    dispatch(registrationResult(response))
}

export const onLogin = (formData: LoginFormData) => async (dispatch: Dispatch<any>) => {
    const response = await authAPI.login(formData)
    if (response.status) {
        dispatch(authMe())
    } else {
        dispatch(loginResult(response))
    }
}

export const authMe = () => async (dispatch: Dispatch<CombineActions>) => {
    dispatch(isFeaching(true))
    const response = await authAPI.authMe()
    if (response.status) {
        dispatch(isAuth(true))
        dispatch(setOwnerId(response.data.ownerId))
        await dialogsAPI.getDialogs()
    } 
    dispatch(isFeaching(false))
}

export default authReduser