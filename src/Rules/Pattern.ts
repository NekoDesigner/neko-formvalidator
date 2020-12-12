import Rule from "./Rule";

export default class Pattern extends Rule {

    static Description = `La valeur du champs doit correspondre au pattern passé en paramètre.`;
    static ErrorMessage = `Le champs :attr: n'a pas un format valide.`;

    constructor() {
        super('pattern');

    }

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