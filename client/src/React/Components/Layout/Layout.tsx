import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { Layout, Input } from 'antd';
import { ProfileType, UserItem } from '../../../Redux/Types/profileReduser.type'
import { connect } from 'react-redux'
import { AppStateType } from '../../../Redux';
import { profileSelector } from '../../Selectors/profileSeectors';
import { withRouter } from 'react-router';
import DialogsList from '../Dialogs/DialogsList';
import { getDialogs } from '../../../Redux/Redusers/dialogsReducer';
import { dialogsSelector } from '../../Selectors/dialogsSelector';
import { DialogListItem } from '../../../Redux/Types/dilaogsReducer.type';
import { getUsers } from '../../../Redux/Redusers/usersReducer' 
import SearchUsersList from '../UsersList/SearchUsersList';
import { wsConnect } from '../../../Redux/WebSocketMiddleware/wsMiddleware'

const { Header, Content, Sider } = Layout;

type FriendsListType = {
    friends: Array<UserItem>
}
type PathParamsType = {
    userId: string
}

const LayoutComponent: FC<any> = ({children, history, getUsers, wsConnect}) => {
    
  const [collapse, setCollapse] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
      wsConnect()
  }, [])

  const onSearchUsersChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    getUsers(e.target.value)
  }
  
  const onCollapse = () => {
    setCollapse(!collapse)
  }
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
    <Layout  style={{maxWidth: '1100px' }}>
      <Header className="site-layout-background" style={{ padding: 0 }}> </Header>

      <Layout className="site-layout" >
        <Sider 
        style={{borderRight: '1px solid lightgrey', margin: '5px' }}
          //collapsible 
          //collapsed={collapse} 
          //breakpoint="lg"
          //collapsedWidth="0"
          //onCollapse={onCollapse}
          //style={{height: '100%'}}
          
          >
            
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
          {children }
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
  type MapStateProps = {
    profile: ProfileType
    dialogs: Array<DialogListItem>
  }
  type MapDiaspatchProps = {
    getDialogs: () => void
    getUsers: (usernameParam: string) => void
    wsConnect: () => void
  }

  const WithRouterSider = withRouter(LayoutComponent) 
  export default connect<MapStateProps, MapDiaspatchProps, {}, AppStateType>
    (mapStateToProps, {getDialogs, getUsers, wsConnect})(WithRouterSider)