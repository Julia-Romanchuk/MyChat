import React, { FC, useState } from 'react'
import { Button, Form, Input } from 'antd';
import { RegistFormData } from '../../../../Redux/Types/authReduser.type'
import { validateEmail, validateUsername } from '../../../Validators/validator';
import { ValidateStatus } from 'antd/es/form/FormItem';
import InputsFormCreaator from '../../../common/formItemCreator';

type RegistrationFormPropsType = {
    onRegistSubmit: (formData: RegistFormData) => void
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegistrationForm: FC<RegistrationFormPropsType> = ({onRegistSubmit}) => {

  const [emailValidateStatus, setEmailValidateStatus] = useState<ValidateStatus>('')
  const [usernameValidateStatus, setUsernameValidateStatus] = useState<ValidateStatus>('')
  
  const onFinish = (formData: RegistFormData) => {
        onRegistSubmit(formData)
    } 

    return <Form
      {...formItemLayout}
      className="login-form"
      name="register"
      //@ts-ignore
      onFinish={onFinish}
    >
      <InputsFormCreaator
        inputs={[
          {
            name: "firstname",
            formItemProps: {label: "Firstname", children: <Input />},
          },
          {
            name: 'lastname',
            formItemProps: {label: "Lastname", children: <Input />}
          },
          {
            name: 'username',
            formItemProps: {
              label: 'Nickname', 
              children: <Input />, 
              validateStatus: usernameValidateStatus, 
              rules: [
                () => ({ async validator(rule, value ) {
                   return validateUsername(value, setUsernameValidateStatus) 
                  }
                })
              ]
            }
          },
          {
            name: ['contacts', 'email'],
            formItemProps: {
              label: 'Email', 
              children: <Input />, 
              validateStatus: emailValidateStatus,
              rules: [
                () => ({
                  async validator(rule, value ){
                   return validateEmail(value, setEmailValidateStatus)
                  }
                })
              ]
            }
          },
          {
            name: 'password',
            formItemProps: { children: <Input.Password />, label: "Password" }
          }, 
          {
            name: 'confirm.password',
            formItemProps: {
              label: 'Confirm Password',
              dependencies: ['password'],
              children: <Input.Password />,
              rules: [
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
          }
        ]}
        hasFeedback = 'all'
        required = {['confirm.password', 'password', "firstname", "lastname" ]} />
      <Form.Item {...tailFormItemLayout}>
        <Button className="login-form-button" type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
}

export default RegistrationForm