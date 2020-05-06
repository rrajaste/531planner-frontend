import IFormInputObjectConfiguration from "./IFormInputObjectConfiguration"

export default abstract class AbstractFormInputObject<TValue> {
    protected _isValid: boolean | undefined = undefined;
    protected _displayName = ""
    protected _maxLength = 0;
    protected _minLength = 0;
    protected _isRequired: boolean | undefined = undefined;
    protected _customValidationFunction: Function | undefined = undefined;
    protected abstract _value: TValue;

    constructor (configuration: IFormInputObjectConfiguration) {
        this._maxLength = configuration.max
        this._minLength = configuration.min
        this._isRequired = configuration.isRequired
        this._displayName = configuration.displayName
        this._customValidationFunction = configuration.customValidationFunc
    }

    get value (): TValue {
        return this._value
    }

    set value (newValue: TValue) {
        this._value = newValue
        if (this._customValidationFunction !== undefined) {
            this._isValid = this._customValidationFunction()
        } else {
            this.validate()
        }
    }

    public abstract validate (): void

    get isValid (): boolean | undefined {
        this.validate()
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
        return ""
    }

    get bootstrapValidationClass (): object {
        return { 'is-invalid': this._isValid === false, 'is-valid': this._isValid === true }
    }
}
