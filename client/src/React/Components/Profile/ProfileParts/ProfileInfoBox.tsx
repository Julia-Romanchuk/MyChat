import React, { FC } from  'react'
import { ProfileType, Contacts } from '../../../../Redux/Types/profileReduser.type'
import locationIcon from '../../../../images/location.png'
import { Descriptions, PageHeader, Typography } from 'antd'

const { Item } = Descriptions
const { Paragraph } = Typography

type ProfileInfoBoxType = {
    profile: ProfileType
}
 
const ProfileInfoBox: FC<ProfileInfoBoxType> = ({profile}) => {

  const {firstname, lastname, username, status, address, contacts} = profile
  
  return (
    <div>
      <PageHeader 
        title={`${firstname} ${lastname}`}
        subTitle={username} 
      />
      <Paragraph> {status ? status : 'Set status'} </Paragraph>
      <Paragraph>
        <img alt={`${username}'s avatar`} style={ {width: "1em", height: "1em"} } src={locationIcon} />
        {address ? `${address.country}, ${address.city}` : 'Ukraine, Kiev'}
      </Paragraph>
      <Descriptions>
        {Object.keys(contacts).map((contactItem) => {
            return <Item key={contactItem} label={contactItem}> 
               {contacts[contactItem as keyof Contacts]}
            </Item>}
          )}  
      </Descriptions>
    </div>
  )
}

export default ProfileInfoBox