import { message as AntdMessage } from 'antd'

type ResultMessageT = {
    message: string
    resultCode: number
}

const ResultMessage = ({message, resultCode}: ResultMessageT) => {
    return resultCode 
    ? AntdMessage.success(message)
    : AntdMessage.error(message) 
} 

export default ResultMessage