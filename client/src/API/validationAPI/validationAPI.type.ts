import { APIMethodReturn } from "../api.type"

export type ValidateKeyName = 'contacts.email' | 'username' 
export type ValueToValidate = { [property: string]: string }

type ValidationAPI = {
    validate: (value: ValueToValidate) => APIMethodReturn<null>
}

export default ValidationAPI
