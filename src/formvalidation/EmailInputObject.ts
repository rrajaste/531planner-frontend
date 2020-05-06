import AbstractFormInputObject from './AbstractFormInputObject'

export default class EmailInputObject extends AbstractFormInputObject<string> {
    protected _value: any = "";

    validate (): void {
        this._isValid = this._matchesRegexPattern()
    }

    protected _matchesRegexPattern (): boolean {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(this.value)
    }

    get errorMessage (): string {
        if (this.value.length < this._minLength && this._value.length !== 0) {
            return `${this.displayName} has to be at least ${this.minLength} characters long.`
        } else if (this.value.length > this._maxLength) {
            return `${this.displayName} cannot be longer than ${this.maxLength} characters.`
        } else if (this.value.length === 0) {
            return `${this.displayName} is required.`
        } else if (!this._matchesRegexPattern()) {
            return "Please enter a valid email"
        }
        return ""
    }
}
