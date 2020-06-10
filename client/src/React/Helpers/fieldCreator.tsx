import React from 'react'
import { FormItemProps } from 'antd/lib/form/FormItem'
import { InputProps } from 'antd/lib/input'
import { WrappedFieldProps } from 'redux-form'
import FormItem from 'antd/es/form/FormItem'
import Input from 'antd/es/input'
import { Checkbox } from 'antd'

type CreateElementProps = FormItemProps & WrappedFieldProps & InputProps

export const createElement = (Component: any) => ({meta, input, ...props }: CreateElementProps) => {
    const { touched, error } = meta
    const hasError = touched && error
    return <FormItem label={props.label} validateStatus={hasError && "error" } help={hasError && error} hasFeedback={true} >
            <Component {...input} {...props} />
    </FormItem>
}

export const AInput = createElement(Input)
export const ACheckbox = createElement(Checkbox)