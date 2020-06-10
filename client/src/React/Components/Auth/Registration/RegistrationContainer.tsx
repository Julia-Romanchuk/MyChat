import React, { FC } from 'react'
import RegistrationForm from './RegistrationForm'
import { AppStateType } from '../../../../Redux'
import { statusCode, message } from '../../../Selectors/registSelectors'
import { RegistFormData } from '../../../../Redux/Types/authReduser.type'
import { onRegistSubmit } from '../../../../Redux/Redusers/authReducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ResultMessage from '../../../common/Alert'


type mapStateType = {
    registResultCode:  number | null
    registResultMessage: string
}
type mapDispatchType = {
    onRegistSubmit: (formData: RegistFormData) => void
}
type RegistrationFormContainer = mapDispatchType & mapStateType 

const RegistrationFormContainer: FC<RegistrationFormContainer> = (props) => {

    const {onRegistSubmit, registResultCode, registResultMessage} = props
    
    return registResultCode
    ? 
    <>
        <ResultMessage message={registResultMessage} resultCode={registResultCode} />
        <Redirect to='login' />
    </>
    : <RegistrationForm onRegistSubmit={onRegistSubmit} />
}

const mapStateToProps = (state: AppStateType): mapStateType => {
    return {
        registResultCode: statusCode(state),
        registResultMessage: message(state)
    }
}

export default connect<mapStateType, mapDispatchType, {}, AppStateType>(mapStateToProps, {onRegistSubmit})(RegistrationFormContainer)
