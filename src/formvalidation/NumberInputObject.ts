import IFormInputObjectConfiguration from "./IFormInputObjectConfiguration"
import AbstractFormInputObject from "./AbstractFormInputObject"

export default class NumberInputObject extends AbstractFormInputObject<number> {
    protected _value: any = 0;

    validate (): void {
        if (this.value >= this.minLength && this.value <= this.maxLength) {
            this._isValid = true
        } else {
            this._isValid = false
        }
    }

    get errorMessage (): string {
        if (this.value > this._maxLength) {
            return `${this.displayName} cannot be bigger than ${this.maxLength}.`
        } else if (this.value !== 0 && this.value < this._minLength) {
            return `${this.displayName} cannot be smaller than ${this.minLength}.`
        } else if (this.value === 0 && this._isRequired) {
            return `${this.displayName} is required.`
        }
        return ""
    }
}
