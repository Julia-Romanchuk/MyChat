import { validationAPI } from "../../API/validationAPI"
import { ValueToValidate } from "../../API/validationAPI/validationAPI.type"
import { isChanged, isEmpty, isEmail } from "./baseValidatos"

const validateAsync = async (
    objToValidate: ValueToValidate, 
    setValidateStatusCallback: (status: 'error' | 'success' | 'validating' | 'warning') => void ) => {
        setValidateStatusCallback('validating')
        const response = await validationAPI.validate(objToValidate)
        if (response.status) {
            setValidateStatusCallback('success')
            return false
        } else {
            setValidateStatusCallback('error')
            return response.message
        }
    }

export const validateEmail = async (value: string, setValidateStatusCallback: any, initialValue?: string) => {
    if (initialValue && !isChanged(value, initialValue)) {
        setValidateStatusCallback(undefined) //dont show feedback if value doesnt change
        return Promise.resolve() //if value doesn't changed - don't send request 
    }
    if (isEmpty(value)) return Promise.reject('Please, input your email')
    if (!isEmail(value)) return Promise.reject('Incorrect email form')
    const validationResult = await validateAsync({'contacts.email': value}, setValidateStatusCallback) 
    return !validationResult
    ? Promise.resolve()
    : Promise.reject(validationResult)
}

export const validateUsername = async (value: string, setValidateStatusCallback: any, initialValue?: string) => {
    if (initialValue && !isChanged(value, initialValue)) {
        setValidateStatusCallback(undefined) //dont show feedback if value doesnt change
        return Promise.resolve() //if value doesn't changed - don't send request 
    }
    if (isEmpty(value)) return Promise.reject('Please, input username')
    const validationResult = await validateAsync({'username': value}, setValidateStatusCallback) 
    return !validationResult
    ? Promise.resolve()
    : Promise.reject(validationResult)
}
