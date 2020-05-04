import AbstractFormInputObject from './AbstractFormInputObject'

export default class StringInputObject extends AbstractFormInputObject<string> {
    protected _value: any = "";

    validate (): void {
        if (this.value.length >= this.minLength && this.value.length <= this.maxLength) {
            this._isValid = true
        } else {
            this._isValid = false
        }
    }

    get errorMessage (): string {
        if (this.value.length < this._minLength && this._value.length !== 0) {
            return `${this.displayName} has to be at least ${this.minLength} characters long.`
        } else if (this.value.length > this._maxLength) {
            return `${this.displayName} cannot be longer than ${this.maxLength} characters.`
        } else if (this.value.length === 0) {
            return `${this.displayName} is required.`
        }
        return ""
    }
}
