interface Validable {

    name: string,
    form?: HTMLFormElement,
    input?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    applyRule: Function,
    error: Function,
    errorMessage: string,
    hasError: Boolean

}

export default class Rule implements Validable {

    name: string;
    form?: HTMLFormElement;
    input?: HTMLInputElement;
    errorMessage: string = 'Une erreur est survenue !';
    hasError: Boolean = false;

    constructor(ruleName: string) {
        this.name = ruleName;
    }

    applyRule(params?: string, form?: HTMLFormElement) { }

    error() {
        this.hasError = true;
        // console.log(this.errorMessage)
    }

    setErrorMessage(message: string, attr?: { [keyname: string]: any }) {
        this.errorMessage = message.replace(':attr:', `${this.getInputName()}`)
        if (attr) {
            for (let key in attr) {
                this.errorMessage = this.errorMessage.replace(`:${key}:`, attr[key])
            }
        }
    }

    _prepare(form: HTMLFormElement, input: string) {
        this.form = form;
        this.input = this.form.querySelector(`[name="${input}"]`) as HTMLInputElement
        this.hasError = false
    }

    getInputName() {
        return this.input ? this.input.getAttribute('name') : ''
    }

}