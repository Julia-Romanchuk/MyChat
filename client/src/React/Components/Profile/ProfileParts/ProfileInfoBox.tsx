import React, { FC } from  'react'
import { ProfileType } from '../../../../Redux/Types/profileReduser.type'
import locationIcon from '../../../../images/location.png'
import { Descriptions, PageHeader, Typography } from 'antd'

type ProfileInfoBoxType = {
    profile: ProfileType
}

const ProfileInfoBox: FC<ProfileInfoBoxType> = ({profile}) => {
    return (
    <div>
      <PageHeader 
        title={`${profile.firstname} ${profile.lastname}`}
        subTitle={profile.username} 
      />
      <Typography.Paragraph >{profile.status ? profile.status : 'Set status'}</Typography.Paragraph>
      <Typography.Paragraph >
        <img alt={`${profile.username}'s avatar`} style={ {width: "1em", height: "1em"} } src={locationIcon} />
        {profile.address ? `${profile.address.country}, ${profile.address.city}` : 'Ukraine, Kiev'}
      </Typography.Paragraph>
      <Descriptions>
          {Object.keys(profile.contacts).map(contactItem => 
          //@ts-ignore
                <Descriptions.Item key={Object.keys(contactItem)} label={contactItem}>{profile.contacts[contactItem] as string}</Descriptions.Item>
            )}  
        </Descriptions>
    </div>
    )
}

export default ProfileInfoBox