import AbstractFormInputObject from './AbstractFormInputObject';

export default interface IFormInputObjectConfiguration {
    isRequired: boolean,
    max: number,
    min: number,
    displayName: string
    customValidationFunc?: Function
}