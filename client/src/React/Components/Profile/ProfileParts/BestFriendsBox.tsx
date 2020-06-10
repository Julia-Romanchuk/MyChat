import React, { FC, useState } from 'react'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Avatar from 'antd/lib/avatar'
import defaultAvatar from '../../../../images/defaultAvatar.png'
import { UserItem } from '../../../../Redux/Types/profileReduser.type'
import { Link } from 'react-router-dom'
import FriendsModal from '../friendsModal.tsx/FriendsModal'

export const ListItem: FC<any> = ({items}) => {
    return items.map((item: any) => (
    <Col xs={8} sm={8} md={8} lg={8} key={item} >
        <Card size='small' 
        bordered={false}
        title={
            <Link to={`/profile/${item._id}`}> 
                <Avatar style={{height: '55px', width: '55px'}} size='large' shape='circle' 
                src={item.image ? item.image : defaultAvatar} /> 
            </Link>
            } >
        <Card.Meta description={`${item.firstname} ${item.lastname}`} />
        </Card>
    </Col>
    ))
}

type BestFriendsBoxType = {
    friends?: Array<UserItem>
    friendsList: Array<UserItem> | null
    getFriendsList: (userId: string) => void
    userId: string
}

const BestFriendsBox: FC<BestFriendsBoxType> = ({friends, friendsList, getFriendsList, userId}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const onShowMore = () => {
        setModalVisible(true)
        getFriendsList(userId)
    }

    return (
        <> 
    <Card title={
        <>
            <span>Friends</span> 
            <Button style={{float: 'right'}} onClick={onShowMore} >Show all</Button> 
            <FriendsModal 
                friendsList={friendsList} 
                visible={modalVisible} 
                userId={userId} 
                getFriendsList={getFriendsList}
                setModalVisible={setModalVisible} />
        </>} >
            <Row gutter={10}>
                <ListItem items={friends} />
        </Row>
    </Card>
    </>
    )
}

export default BestFriendsBox