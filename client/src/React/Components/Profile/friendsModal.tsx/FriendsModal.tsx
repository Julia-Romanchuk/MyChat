import React, { FC } from 'react'
import { Modal, Row, Spin } from 'antd'
import ListItem from '../../../common/ListItem'
import { UserItem } from '../../../../Redux/Types/profileReduser.type'

type FriendsModalType = {
    friendsList: Array<UserItem> | null
    visible: boolean
    getFriendsList: (userId: string) => void
    userId: string
    setModalVisible: (visible: boolean) => void 
}

const FriendsModal: FC<FriendsModalType> = ({friendsList, visible, setModalVisible}) => {

    return (
        <Modal title="Friends" visible={visible} footer={null} closable maskClosable={false} 
        onCancel={() => setModalVisible(false)} >
            <Row>
                {friendsList === null
                ? <Spin />
                : <ListItem items={friendsList} />}
            </Row>
        </Modal>
    )
}

export default FriendsModal