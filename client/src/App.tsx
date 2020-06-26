import React, { useEffect, FC, memo } from 'react'
import './App.css'
import RegistrationFrom from './React/Components/Auth/Registration/RegistrationContainer'
import LoginContainer from './React/Components/Auth/Login//LoginFormContainer'
import 'antd/dist/antd.css'
import { Route, Redirect } from 'react-router'
import ProfileContainer from './React/Components/Profile/ProfileContainer'
import { authMe } from './Redux/Redusers/authReducer'
import { connect } from 'react-redux'
import { AppStateType } from './Redux'
import { isAuthSelector, isFechingSelector } from './React/Selectors/loginSelectors'
import Preloader from './React/common/Preloader'
import Layout from './React/Components/Layout/Layout'
import DialogContainer from './React/Components/Dialogs/DialogContainer'

type mapStateProps = {
  isAuth: boolean
  feachingInProgress: boolean
}

type mapDispatchProps = {
  authMe: () => void
}

type AppProps = mapDispatchProps & mapStateProps

const App: FC<AppProps> = ({ authMe, isAuth }) => {

  useEffect(() => {
    authMe()  
  }, [isAuth, authMe])

  return (
    <Preloader>
      <div className="App">
        <Route path='/registration'> <RegistrationFrom /> </Route>
        <Route path='/login'> <LoginContainer /> </Route>
        <Route exact path='/'>
          {isAuth 
          ? <Redirect to='/profile' />    
          : <LoginContainer />}
        </Route>

        <Route path={['/profile' , '/dialog']}>
          <Layout> 
            <Route path='/profile/:userId?' component={ProfileContainer} />
            <Route path='/dialog/:dialogId?' component={DialogContainer} /> 
          </Layout> 
        </Route>
      </div>
    </Preloader>
  )
}

const mapStateToProps = (state: AppStateType) => ({
  //@ts-ignore
  isAuth: isAuthSelector(state),
  feachingInProgress: isFechingSelector(state)
})

const arePropsEqual = (prevProps: AppProps, nextProps: AppProps) => {
  return prevProps.isAuth === nextProps.isAuth
}

export default connect<mapStateProps, mapDispatchProps, {}, AppStateType>(mapStateToProps, {authMe})(memo(App, arePropsEqual))
