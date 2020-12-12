import Rule from "./Rule";

export default class Email extends Rule {

    static Description = `La valeur du champs doit être au format E-mail.`;
    static ErrorMessage = `Le champs :attr: doit avoir un email valide.`

    mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    constructor() {
        super('email');

    }

    applyRule() {
        if (!this.input!.value.match(this.mailformat)) {
            this.setErrorMessage(Email.ErrorMessage);
            return this.error();
        }
    }


}