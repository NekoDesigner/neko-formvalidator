import Rule from "./Rule";

/**
 *
 *
 * @export
 * @class RequiredIf
 * @extends {Rule}
 */
export default class RequiredIf extends Rule {

    /**
     *
     *
     * @static
     * @memberof RequiredIf
     */
    static Description = `Le champs est requis si l'élément passé en paramètre n'est pas nulle.`;

    /**
     *
     *
     * @static
     * @memberof RequiredIf
     */
    static ErrorMessage = `Le champs :attr: est requis si le champs suivant est remplis : ":input:" `;

    /**
     * Creates an instance of RequiredIf.
     * 
     * @memberof RequiredIf
     */
    constructor() {
        super('required_if'); // The rule name
    }

    /**
     *
     *
     * @param {string} params
     * @return {boolean|null} 
     * @memberof RequiredIf
     */
    applyRule(params: string) {
        let input = this.form!.querySelector(`[name="${params}"]`) as HTMLFormElement;

        if (input.value && !this.input!.value) {
            this.setErrorMessage(RequiredIf.ErrorMessage, { input: params });
            return this.error();
        }

    }
}