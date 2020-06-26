import React, { FC, ChangeEvent } from 'react'
import { Button, PageHeader, Empty, Spin } from 'antd'

import Messages from './dialogParts/Messages'
import TextArea from 'antd/lib/input/TextArea'

import { Dialog } from '../../../Redux/Types/dilaogsReducer.type'
import { UserItem } from '../../../Redux/Types/profileReduser.type'

type DialogType = {
    dialog: Dialog | null
    ownerId: string 
    isDialogExist: boolean
    messageText: string
    collocutor: UserItem | null
    onMessageChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onMessageSend: (text: string) => void
    redirectToProfile: (userId: string) => void
}

const DialogE: FC<DialogType> = (props) => {

    const {dialog, ownerId, isDialogExist, messageText, collocutor,
        onMessageSend, redirectToProfile, onMessageChange} = props 

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {
                dialog !== null && isDialogExist && collocutor
                ? <div>
                    <div style={{height:'8%', position: 'relative', background: '#f0f2f5', width: '100%', 
                    borderBottom: '1px solid rgba(0, 0, 0, 0.35)', color: 'rgba(0, 0, 0, 0.65)' }} onClick={() => redirectToProfile(collocutor._id)} >
                        <PageHeader
                            title={`${collocutor.firstname} ${collocutor.lastname}`}
                            className="site-page-header"
                            avatar={{ src: collocutor.image, size:'large'}}
                        />.
                    </div>
                    <div style={{position: 'relative', padding: '2%'}} >
                    <Messages dialog={dialog} ownerId={ownerId} />
                    </div>
                </div>
                : isDialogExist ? <Spin /> : <Empty />
            }

            <footer style={{position: 'relative'}} >
                <TextArea 
                    autoSize={{ minRows: 2, maxRows: 6 }} 
                    style={{border: 'none', resize:'none'}}
                    value={messageText}
                    onChange={onMessageChange} />
                <Button type='primary' onClick={() => onMessageSend(messageText)} style={{borderRadius: 0}} >Send</Button>
            </footer>
        </div>
    )
}

export default DialogE