import React, { FC } from 'react'
import { Col, Card, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import defaultAvatar from '../../images/defaultAvatar.png'

import { UserItem } from '../../Redux/Types/profileReduser.type'

type ListItemT = {
    items: Array<UserItem>
}

export const ListItem: FC<ListItemT> = ({items}) => {

    const Items = items.map((item) => (
        <Col xs={8} sm={8} md={8} lg={8} key={item._id} >
            <Card size='small' 
                bordered={false}
                title={
                    <Link to={`/profile/${item._id}`}> 
                        <Avatar 
                            style={{height: '55px', width: '55px'}} 
                            src={item.image ? item.image : defaultAvatar}
                            size='large' shape='circle' 
                             /> 
                    </Link>
                }
            >
                <Card.Meta description={`${item.firstname} ${item.lastname}`} />
            </Card>
        </Col>
    ))

    return <> {Items} </>
}

export default ListItem