import React, { PropsWithChildren } from 'react'
import { Spin } from 'antd'
import { AppStateType } from '../../Redux'
import { isFechingSelector } from '../Selectors/loginSelectors'
import { connect } from 'react-redux'

type PerloaderType = {
    isFeaching: boolean
    children: any
}

type MapStateProps = {
    isFeaching: boolean
}

const Preloader = (props: PropsWithChildren<PerloaderType>) => {
    return props.isFeaching
    ? <Spin size='large' />
    : props.children
} 

const mapStateToProps = (state: AppStateType) => ({
    isFeaching: isFechingSelector(state)
})

export default connect<MapStateProps, {}, {}, AppStateType>(mapStateToProps, {})(Preloader)