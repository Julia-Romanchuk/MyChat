import React, { FC } from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { AppStateType } from '../../../../Redux'
import { isAuthSelector, loginResultCode, loginResultMessage } from '../../../Selectors/loginSelectors'
import { Redirect } from 'react-router'
import { onLogin } from '../../../../Redux/Redusers/authReducer'
import Alert from 'antd/es/alert'
import { LoginFormData } from '../../../../Redux/Types/authReduser.type'

export type MapStateType = {
    isAuth: boolean
    loginResultCode: number | null
    loginResultMessage: string | null
}
export type MapDispatchType = {
    onLogin: (formData: LoginFormData) => void
}
export type LoginFormContainerPropsType = MapDispatchType & MapStateType

const LoginFormContainer: FC<LoginFormContainerPropsType> = (props) => {

    const {onLogin, isAuth, loginResultCode, loginResultMessage} = props

    return isAuth
    ? <Redirect to='/profile' />
    : <> 
        {loginResultCode === 0 && <Alert type='error' message={loginResultMessage} />}
        <LoginForm onLogin={onLogin} />
    </>
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        isAuth: isAuthSelector(state),
        loginResultCode: loginResultCode(state),
        loginResultMessage: loginResultMessage(state)
    }
}

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps, {onLogin})(LoginFormContainer)
