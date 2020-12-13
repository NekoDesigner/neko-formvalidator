import Rule from "./Rule";

/**
 *
 *
 * @export
 * @class Min
 * @extends {Rule}
 */
export default class Min extends Rule {

    /**
     *
     *
     * @static
     * @memberof Min
     */
    static Description = `La longeur ou la valeur du champs doit être supérieur ou égale à la valeur passé en paramètre`;

    /**
     *
     *
     * @static
     * @memberof Min
     */
    static ErrorMessageNumber = `Le champs :attr: doit être supérieur ou égale à :num: !`;

    /**
     *
     *
     * @static
     * @memberof Min
     */
    static ErrorMessage = `Le champs :attr: doit comporter au moins :num: caractères !`;

    /**
     * Creates an instance of Min.
     * 
     * @memberof Min
     */
    constructor() {
        super('min'); // The rule name
    }

    /**
     *
     *
     * @param {string} params
     * @return {boolean|null} 
     * @memberof Min
     */
    applyRule(params: string) {
        let length = parseInt(params);
        if (
            this.input!.type == 'number' ||
            (this.input!.hasAttribute('data-input-type') && this.input!.getAttribute('data-input-type') == 'number')
        ) {
            if (parseInt(this.input!.value) < length) {
                this.setErrorMessage(Min.ErrorMessageNumber, { num: length });
                return this.error();
            }
        } else if (this.input!.value.length < length) {
            this.setErrorMessage(Min.ErrorMessage, { num: length });
            return this.error();
        }
    }

}