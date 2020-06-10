import React, { FC } from 'react'
import { LoginFormData } from '../../../../Redux/Types/authReduser.type'
import { Form, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { LoginFormPropsType } from '../../../Types/login/login.type'
import InputsFormCreaator from '../../../common/formItemCreator'


const LoginForm: FC<LoginFormPropsType> = ({ onLogin }) => {

    const onFinish = (formData: LoginFormData) => {
        onLogin(formData)
    }

    return <Form
        className="login-form"
        //@ts-ignore
        onFinish = {onFinish}
        >

      <InputsFormCreaator 
        inputs={[
        {
          name: 'username', 
          formItemProps: {children: true},
          inputItemProps: {prefix: <UserOutlined className="site-form-item-icon"/>, placeholder: "Username"} 
        },
        {
          name: 'password',
          formItemProps: {children: true },
          inputItemProps: { prefix: <LockOutlined className="site-form-item-icon" />, type: "password", placeholder: "Password"}
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