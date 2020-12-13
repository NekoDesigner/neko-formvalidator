import Rule from "./Rule";

/**
 *
 *
 * @export
 * @class Email
 * @extends {Rule}
 */
export default class Email extends Rule {

    /**
     *
     *
     * @static
     * @memberof Email
     */
    static Description = `La valeur du champs doit être au format E-mail.`;

    /**
     *
     *
     * @static
     * @memberof Email
     */
    static ErrorMessage = `Le champs :attr: doit avoir un email valide.`;

    /**
     *
     *
     * @memberof Email
     */
    mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    /**
     * Creates an instance of Email.
     * 
     * @memberof Email
     */
    constructor() {
        super('email'); // The rule name

    }

    /**
     *
     *
     * @return {boolean|null} 
     * @memberof Email
     */
    applyRule() {
        if (!this.input!.value.match(this.mailformat)) {
            this.setErrorMessage(Email.ErrorMessage);
            return this.error();
        }
    }


}