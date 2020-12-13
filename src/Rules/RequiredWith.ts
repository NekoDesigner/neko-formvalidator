import Rule from "./Rule";

/**
 *
 *
 * @export
 * @class RequiredWith
 * @extends {Rule}
 */
export default class RequiredWith extends Rule {

    /**
     *
     *
     * @static
     * @memberof RequiredWith
     */
    static Description = `Si tous les éléments passé en paramètre sont remplis, le champs sera requis`;

    /**
     *
     *
     * @static
     * @memberof RequiredWith
     */
    static ErrorMessage = `Le champs :attr: est requis si les champs suivant sont remplis : :list:" `;

    /**
     * Creates an instance of RequiredWith.
     * 
     * @memberof RequiredWith
     */
    constructor() {
        super('required_with'); // The rule name
    }

    /**
     *
     *
     * @param {string} params
     * @return {boolean|null} 
     * @memberof RequiredWith
     */
    applyRule(params: string) {
        this.setErrorMessage(`Le champs ${this.getInputName()} est requis !`);

        let inputs = params.split(',');
        let needed = false;
        let count = 0

        inputs.forEach(inputName => {
            let input = this.form!.querySelector(`[name="${inputName}"]`) as HTMLFormElement;
            if (input.value) {
                count++;
            }
        })

        if (count == inputs.length && !this.input!.value) needed = true;

        if (needed) {
            this.setErrorMessage(RequiredWith.ErrorMessage, { list: inputs.join(', ') });
            return this.error();
        }

    }
}