export const lendth = (max: number, min: number) => (value: string | undefined) => {
    if (value && value.length < min) return `Value must be more than ${min} symbols`
    if (value && value.length > max) return `Value must be less than ${max} symbols`
    return undefined
} 

export const isEmail = (value: string,) => {
  return (value && value.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)) ? true : false
}
export const isEmpty = (value: string) => {
  return !value ? true : false
}
export const isChanged = (currentValue: string, initialValue?: string,) => {
  return (initialValue === currentValue) ? false : true
}