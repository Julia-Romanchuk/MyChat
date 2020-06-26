import React, { FC } from 'react'
import { FormItemProps } from 'antd/lib/form'
import { Form, Col } from 'antd';
import Input, { InputProps } from 'antd/lib/input';

type InputsFormCreatorType = {
    inputs: Array<{
        name: string | Array<string>
        formItemProps: FormItemProps
        inputItemProps?: InputProps
        wrapIntoCol?: number
    }> 
    hasFeedback?: Array<string> | 'all'
    required?: Array<string> | 'all'
}

const InputsFormCreaator: FC<InputsFormCreatorType> = ({ inputs, hasFeedback, required }) => { 

    const ItemsList = inputs.map((inputItem) => {
        const rules = inputItem.formItemProps.rules ? inputItem.formItemProps.rules : []
        return ( inputItem.wrapIntoCol
        ? <Col span={inputItem.wrapIntoCol} >
            <Form.Item 
            name={inputItem.name} 
            {...inputItem.formItemProps}
            hasFeedback={hasFeedback === 'all' || hasFeedback?.includes(
                typeof inputItem.name === 'string' 
                ? inputItem.name
                : inputItem.name.join('.'))}
            rules={[
                {required: required?.includes(
                    typeof inputItem.name === 'string' 
                    ? inputItem.name
                    : inputItem.name.join('.')) || required === 'all',
                message: `Please, input ${inputItem.name}`},
                ...rules]}
        >
            {inputItem.formItemProps.children === true 
            ? <Input {...inputItem.inputItemProps} />
            : inputItem.formItemProps.children }
        </Form.Item>
        </Col>
        : <Form.Item 
            name={inputItem.name} 
            {...inputItem.formItemProps}
            hasFeedback={hasFeedback === 'all' || hasFeedback?.includes(
                typeof inputItem.name === 'string' 
                ? inputItem.name
                : inputItem.name.join('.'))}
            rules={[
                {required: required?.includes(
                    typeof inputItem.name === 'string' 
                    ? inputItem.name
                    : inputItem.name.join('.')) || required === 'all',
                message: `Please, input ${inputItem.name}`},
                ...rules]}
        >
            {inputItem.formItemProps.children === true 
            ? <Input {...inputItem.inputItemProps} />
            : inputItem.formItemProps.children }
        </Form.Item>
        )})

    return <> {ItemsList} </>
}

export default InputsFormCreaator