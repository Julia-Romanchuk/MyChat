import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { Layout, Input } from 'antd';
import { ProfileType } from '../../../Redux/Types/profileReduser.type'
import { connect } from 'react-redux'
import { AppStateType } from '../../../Redux';
import { profileSelector } from '../../Selectors/profileSeectors';
import { withRouter, RouteComponentProps } from 'react-router';
import DialogsList from '../Dialogs/DialogsList';
import { getDialogs } from '../../../Redux/Redusers/dialogsReducer';
import { dialogsSelector } from '../../Selectors/dialogsSelector';
import { DialogListItem } from '../../../Redux/Types/dilaogsReducer.type';
import { getUsers } from '../../../Redux/Redusers/usersReducer' 
import SearchUsersList from '../UsersList/SearchUsersList';
import { wsConnect } from '../../../Redux/WebSocketMiddleware/wsMiddleware'

const { Header, Content, Sider } = Layout

type MapStateProps = {
  profile: ProfileType | null
  dialogs: Array<DialogListItem> | null
}

type MapDiaspatchProps = {
  getDialogs: () => void
  getUsers: (usernameParam: string) => void
  wsConnect: () => void
}

type PathParamsType = {
    userId: string
}

type LayoutComponentT = MapStateProps & MapDiaspatchProps & RouteComponentProps<PathParamsType>

const LayoutComponent: FC<LayoutComponentT> = ({children, getUsers, wsConnect}) => {
    
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => { wsConnect() }, [wsConnect])

  const onSearchUsersChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    getUsers(e.target.value)
  }
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
    <Layout  style={{maxWidth: '1100px' }}>
      <Header className="site-layout-background" style={{ padding: 0 }}> </Header>

      <Layout className="site-layout" >
        <Sider style={{borderRight: '1px solid lightgrey', margin: '5px' }}>     
          <Input 
            placeholder='Search' 
            value={searchValue}
            onChange={onSearchUsersChange}
            style={{position: 'relative', borderRadius: '5px'}} 
          />
          {!!searchValue 
          ? <SearchUsersList />
          : <DialogsList />}
        </Sider>

        <Content style={{ margin: '0 16px', maxHeight: '765px'}}>
          { children }
        </Content>
      </Layout>
    </Layout>
    </div>
    );
  }

  const mapStateToProps = (state: AppStateType) => ({
    profile: profileSelector(state),
    dialogs: dialogsSelector(state)
  })

  const WithRouterSider = withRouter(LayoutComponent) 
  export default connect<MapStateProps, MapDiaspatchProps, {}, AppStateType>
    (mapStateToProps, {getDialogs, getUsers, wsConnect})(WithRouterSider)