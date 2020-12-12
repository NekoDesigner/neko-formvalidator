import Rule from "./Rule";

export default class Required extends Rule {

    static Description = `Le champs ne peut pas être nulle.`

    static ErrorMessage = `Le champs :attr: est requis !`

    constructor() {
        super('required')
    }

    applyRule() {
        this.setErrorMessage(Required.ErrorMessage)
        if (!this.input || (this.input && !this.input.value)) return this.error()
    }

}