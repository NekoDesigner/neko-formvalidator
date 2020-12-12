import Rule from "./Rule";


/**
 * WARNING : This rule must be call before Min and Max rules
 *
 * @export
 * @class Numeric
 * @extends {Rule}
 */
export default class Numeric extends Rule {

    static Description = `L'élément doit être un nombre.`

    static ErrorMessage = `Le champs :attr: doit être de type numeric.`

    constructor() {
        super('numeric')
    }

    applyRule() {
        if (!this.isNumeric(this.input!.value)) {
            this.setErrorMessage(Numeric.ErrorMessage)
            return this.error()
        } else {
            this.input!.setAttribute('data-input-type', 'number')
        }
    }

    isNumeric(value: string) {
        return /^\d+$/.test(value);
    }

}