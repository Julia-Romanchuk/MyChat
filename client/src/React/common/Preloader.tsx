import React, { FC } from 'react'
import { Spin } from 'antd'
import { AppStateType } from '../../Redux'
import { isFechingSelector } from '../Selectors/loginSelectors'
import { connect } from 'react-redux'

type MapStateProps = {
    isFeaching: boolean
}

const Preloader: FC<MapStateProps> = (props) => {

    const {isFeaching, children} = props

    return isFeaching
    ? <Spin size='large' />
    : <> { children } </>
} 

const mapStateToProps = (state: AppStateType) => ({
    isFeaching: isFechingSelector(state)
})

export default connect<MapStateProps, {}, {}, AppStateType>(mapStateToProps, {})(Preloader)