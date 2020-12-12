import Rule from "./Rule";

export default class RequiredIf extends Rule {

    static Description = `Le champs est requis si l'élément passé en paramètre n'est pas nulle.`

    static ErrorMessage = `Le champs :attr: est requis si le champs suivant est remplis : ":input:" `

    constructor() {
        super('required_if')
    }

    applyRule(params: string) {
        let input = this.form!.querySelector(`[name="${params}"]`) as HTMLFormElement;

        if (input.value && !this.input!.value) {
            this.setErrorMessage(RequiredIf.ErrorMessage, { input: params })
            return this.error()
        }

    }
}