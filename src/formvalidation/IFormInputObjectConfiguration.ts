import FormInputObject from './FormInputObject';

export default interface IFormInputObjectConfiguration {
    isRequired: boolean,
    max: number,
    min: number,
    displayName: string
    valueHasToMatch?: FormInputObject
    valueMisMatchMessage?: string
    hideLengthErrors?: boolean
}