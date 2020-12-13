import Rule from "./Rule";

/**
 *
 *
 * @export
 * @class Pattern
 * @extends {Rule}
 */
export default class Pattern extends Rule {

    /**
     *
     *
     * @static
     * @memberof Pattern
     */
    static Description = `La valeur du champs doit correspondre au pattern passé en paramètre.`;

    /**
     *
     *
     * @static
     * @memberof Pattern
     */
    static ErrorMessage = `Le champs :attr: n'a pas un format valide.`;

    /**
     * Creates an instance of Pattern.
     * 
     * @memberof Pattern
     */
    constructor() {
        super('pattern'); // The rule name

    }

    /**
     *
     *
     * @param {string} params
     * @return {boolean|null} 
     * @memberof Pattern
     */
    applyRule(params: string) {
        let regexp_string = params.substring(1);
        regexp_string = regexp_string.slice(0, -1);
        let regexp = new RegExp(regexp_string);
        if (!this.input!.value.match(regexp)) {
            this.setErrorMessage(Pattern.ErrorMessage);
            return this.error();
        }
    }


}