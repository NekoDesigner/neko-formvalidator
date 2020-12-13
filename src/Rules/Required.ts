import Rule from "./Rule";

/**
 *
 *
 * @export
 * @class Required
 * @extends {Rule}
 */
export default class Required extends Rule {

    /**
     *
     *
     * @static
     * @memberof Required
     */
    static Description = `Le champs ne peut pas être nulle.`;

    /**
     *
     *
     * @static
     * @memberof Required
     */
    static ErrorMessage = `Le champs :attr: est requis !`;

    /**
     * Creates an instance of Required.
     * 
     * @memberof Required
     */
    constructor() {
        super('required'); // The rule name
    }

    /**
     *
     *
     * @return {boolean|null} 
     * @memberof Required
     */
    applyRule() {
        this.setErrorMessage(Required.ErrorMessage);
        if (!this.input || (this.input && !this.input.value)) return this.error();
    }

}