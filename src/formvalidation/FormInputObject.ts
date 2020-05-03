import IFormInputObjectConfiguration from "./IFormInputObjectConfiguration"

export default abstract class FormInputObject {
    protected _isValid: boolean | undefined = undefined;
    protected _displayName = ""
    protected _maxLength = 0;
    protected _minLength = 0;
    protected _isRequired: boolean | undefined = undefined;
    protected _value = "";
    protected _hideLengthErrors = false
    protected _valueHasToMatch: FormInputObject | undefined = undefined
    protected _valueMisMatchMessage: undefined | string = undefined

    constructor (configuration: IFormInputObjectConfiguration) {
        this._maxLength = configuration.max
        this._minLength = configuration.min
        this._isRequired = configuration.isRequired
        this._displayName = configuration.displayName
        this._valueHasToMatch = configuration.valueHasToMatch
        this._valueMisMatchMessage = configuration.valueMisMatchMessage
    }

    get value (): string {
        return this._value
    }

    set value (newValue: string) {
        console.log(this._minLength, this._maxLength)
        if (newValue.length >= this.minLength && newValue.length <= this.maxLength) {
            this._isValid = true
        } else {
            this._isValid = false
        }
        this._value = newValue
    }

    get isValid (): boolean | undefined {
        return this._isValid
    }

    get maxLength (): number {
        return this._maxLength
    }

    get minLength (): number {
        return this._minLength
    }

    get displayName (): string {
        return this._displayName
    }

    get errorMessage (): string {
        if (this._valueHasToMatch !== undefined && this.value !== this._valueHasToMatch.value) {
            return this._valueMisMatchMessage!
        } else {
            return this._getLengthErrorMessage()
        }
    }

    protected  _getLengthErrorMessage (): string {
        if (this.value.length < this._minLength && this._value.length !== 0) {
            return `${this.displayName} has to be at least ${this.minLength} characters long.`
        } else if (this.value.length > this._maxLength) {
            return `${this.displayName} cannot be longer than ${this.maxLength} characters.`
        } else if (this.value.length === 0) {
            return `${this.displayName} is required.`
        }
        return ""
    }

    get bootstrapValidationClass (): object {
        return { 'is-invalid': this.isValid === false, 'is-valid': this.isValid === true }
    }
}
