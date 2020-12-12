import Rule from "./Rule";

export default class Max extends Rule {

    static Description = `La longeur ou la valeur du champs doit être inférieur ou égale à la valeur passé en paramètre`

    static ErrorMessageNumber = `Le champs :attr: doit être inférieur ou égale à :num: !`
    static ErrorMessage = `Le champs :attr: doit comporter au maximum :num: caractères !`

    constructor() {
        super('max')
    }

    applyRule(params: string) {
        let length = parseInt(params)
        if (
            this.input!.type == 'number' ||
            (this.input!.hasAttribute('data-input-type') && this.input!.getAttribute('data-input-type') == 'number')
        ) {
            if (parseInt(this.input!.value) > length) {
                this.setErrorMessage(Max.ErrorMessageNumber, { num: length })
                return this.error()
            }
        } else if (this.input!.value.length > length) {
            this.setErrorMessage(Max.ErrorMessage, { num: length })
            return this.error()
        }
    }

}