import React, { FC, useState } from 'react'
import { ValidateStatus } from 'antd/lib/form/FormItem'
import { ProfileType } from '../../../../Redux/Types/profileReduser.type'
import Form from 'antd/lib/form/Form'
import { Row, Button } from 'antd'
import InputsFormCreaator from '../../../common/formItemCreator'
import { validateUsername, validateEmail } from '../../../Validators/validator'
import TextArea from 'antd/lib/input/TextArea'

export const EditProfileInfoBox: FC<any> = ({profile, updateProfile, setEditMode}) => {

    const [validateStatus, setValidateStatus] = useState<ValidateStatus>('')
    const [UsernameValidateStatus, UsernameSetValidateStatus] = useState<ValidateStatus>('')
  
    const onFinish = async (values: ProfileType) => { 
      await updateProfile(values)
      setEditMode(false)
    }
  
    return (
      <Form
      //@ts-ignore
        onFinish={onFinish}
        initialValues={profile}>
          <Row >
            <InputsFormCreaator 
              inputs={[
                {
                  name: 'firstname',
                  formItemProps: { label: 'Firstname', children: true },
                  wrapIntoCol: 8
                },
                {
                  name: 'lastname',
                  formItemProps: { label: 'Lastname', children: true },
                  wrapIntoCol: 8
                },
                {
                  name: 'username',
                  formItemProps: {
                  label: 'Username', 
                  children: true, 
                  rules: [
                    () => ({
                      async validator(rule, value ){
                      return validateUsername(value, UsernameSetValidateStatus, profile.username)
                      }
                    })
                  ],
                  validateStatus: UsernameValidateStatus  
                }
              }
            ]} required='all' />
          </Row>
              
          <InputsFormCreaator 
            inputs={[
              { name: 'status', formItemProps: {label: 'Status', children: true, rules: [{max: 300}]} }
            ]}  
          />
              
          <Row>
              <InputsFormCreaator 
                inputs = {[
                  {name: ['contacts', 'website'], formItemProps: {label: 'website', children: true}, wrapIntoCol: 8},
                  {name: ['contacts', 'mobile'], formItemProps: {label: 'mobile', children: true}, wrapIntoCol: 8},
                  {
                    name: ['contacts', 'email'], 
                    formItemProps: {
                    label: 'email', 
                    children: true,
                    validateStatus: validateStatus,
                    rules:[ () => ({ async validator(rule, value ){
                           return validateEmail(value, setValidateStatus, profile.contacts.email)
                          }
                        })
                      ]
                    }, 
                    wrapIntoCol: 8},
                  ]} hasFeedback={['contacts.email']} 
              />
            </Row>
  
            <Row>
              <InputsFormCreaator 
                inputs={[
                  {name: ['address', 'country'], formItemProps: {label: 'Country', children: true}},
                  {name: ['address', 'city'], formItemProps: {label: 'City', children: true}}
                ]}  
              />
            </Row>
                
            <InputsFormCreaator 
                inputs={[
                  {name: 'aboutMe', formItemProps: {label: "Tell somothing about you", children: <TextArea />}},
                ]}  
            />
             
          <Button htmlType='submit' >Save</Button>
          </Form>
      )
  }

export default EditProfileInfoBox