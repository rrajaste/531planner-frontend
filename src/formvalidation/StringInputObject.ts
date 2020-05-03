import IFormInputObjectConfiguration from "./IFormInputObjectConfiguration"
import FormInputObject from './FormInputObject';

export default class StringInputObject extends FormInputObject {

    constructor (configuration: IFormInputObjectConfiguration) {
        super(configuration);
    }
}
