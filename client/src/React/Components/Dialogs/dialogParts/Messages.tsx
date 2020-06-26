import React, { FC } from 'react'
import { Empty } from 'antd'
import { List } from 'antd'

import { Dialog } from '../../../../Redux/Types/dilaogsReducer.type'
import { getTimeHHMMSS } from '../../../Helpers/dateWorker'

const defauldMessage = {
    borderRadius: '15px', 
    maxWidth: '60%',
    padding:'10px', 
    alignContent: 'stretch',
    display: 'inline',
}

type MessagesType = {
    dialog: Dialog
    ownerId: string
}

const Messages: FC<MessagesType> = (props) => {

    const { dialog, ownerId } = props

    const messagesList = dialog.messages.map( message => {
        const isOwner = ownerId === message.author
        return ( 
            <List.Item key={message._id} style={isOwner ? { padding:'4px', display: 'flex', justifyContent: 'flex-end'} : undefined} > 
                <div style={!isOwner  
                    ? {wordBreak: 'break-word', backgroundColor: 'rgb(210, 230, 247)', ...defauldMessage} 
                    : {...defauldMessage, background: 'white', wordBreak: 'break-word'}} >
                    {message.text} 
                    <span style = {{paddingLeft: '15px', fontSize: '0.75em'}}>{getTimeHHMMSS(message.createdAt)}</span>
                </div>
            </List.Item>
        )
    })

    return !dialog
        ? <Empty />
        : <div className={'dialog'}> 
            <List style={{position: 'relative' }} itemLayout='vertical' > 
                { messagesList } 
            </List> 
        </div>
}



export default Messages