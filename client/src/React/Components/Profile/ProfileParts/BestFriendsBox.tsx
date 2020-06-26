import React, { FC, useState } from 'react'
import Card from 'antd/lib/card'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import { UserItem } from '../../../../Redux/Types/profileReduser.type'
import FriendsModal from '../friendsModal.tsx/FriendsModal'
import ListItem from '../../../common/ListItem'

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

    return (friends
        ? <> 
            <Card 
                title={
                    <>
                        <span>Friends</span> 
                        <Button style={{float: 'right'}} onClick={onShowMore} >Show all</Button> 
                        <FriendsModal 
                            friendsList={friendsList} 
                            visible={modalVisible} 
                            userId={userId} 
                            getFriendsList={getFriendsList}
                            setModalVisible={setModalVisible} />
                    </>
                } 
            >
                <Row gutter={10}>
                    <ListItem items={friends} />
                </Row>
            </Card>
        </>
        : <> </>

    )
}

export default BestFriendsBox