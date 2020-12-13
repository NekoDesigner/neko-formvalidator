import Rule from "./Rule";


/**
 * WARNING : This rule must be call before Min and Max rules
 *
 * @export
 * @class Numeric
 * @extends {Rule}
 */
export default class Numeric extends Rule {

    /**
     *
     *
     * @static
     * @memberof Numeric
     */
    static Description = `L'élément doit être un nombre.`;

    /**
     *
     *
     * @static
     * @memberof Numeric
     */
    static ErrorMessage = `Le champs :attr: doit être de type numeric.`;

    /**
     * Creates an instance of Numeric.
     * @memberof Numeric
     */
    constructor() {
        super('numeric');
    }

    /**
     *
     *
     * @return {boolean|null} 
     * @memberof Numeric
     */
    applyRule() {
        if (!this.isNumeric(this.input!.value)) {
            this.setErrorMessage(Numeric.ErrorMessage);
            return this.error();
        } else {
            this.input!.setAttribute('data-input-type', 'number');
        }
    }

    /**
     *
     *
     * @param {string} value
     * @return {boolean} 
     * @memberof Numeric
     */
    isNumeric(value: string) {
        return /^\d+$/.test(value);
    }

}