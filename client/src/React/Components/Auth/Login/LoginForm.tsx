import React, { FC } from 'react'
import { LoginFormData } from '../../../../Redux/Types/authReduser.type'
import { Form, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import InputsFormCreaator from '../../../common/formItemCreator'
import { Store } from 'antd/es/form/interface'
import { useForm } from 'antd/lib/form/util'

export type LoginFormPropsType = {
  onLogin: (formData: LoginFormData) => void
}

const LoginForm: FC<LoginFormPropsType> = ({ onLogin }) => {

  const [form] = useForm()

  // ATTENTION!!!
  const onFinish = (values: Store) => {
    onLogin(values as LoginFormData)
  }

    return <Form
        className="login-form"
        form={form}
        onFinish={onFinish}
        >

      <InputsFormCreaator 
        inputs={[
        {
          name: 'username', 
          formItemProps: {children: true},
          inputItemProps: {
            prefix: <UserOutlined className="site-form-item-icon"/>, 
            placeholder: "Username"
          } 
        },
        {
          name: 'password',
          formItemProps: {children: true },
          inputItemProps: { 
            prefix: <LockOutlined className="site-form-item-icon" />, 
            type: "password", 
            placeholder: "Password"
          }
        }
        ]}
        required='all'
      />
      
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button className="login-form-button" type="primary" htmlType="submit" >
          Log in
        </Button>
        Or <a href="/registration">register now!</a>
      </Form.Item>
    </Form>
};

export default LoginForm