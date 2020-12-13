
/**
 *
 *
 * @interface Validable
 */
interface Validable {

    name: string,
    form?: HTMLFormElement,
    input?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    applyRule: Function,
    error: Function,
    errorMessage: string,
    hasError: Boolean

}


/**
 *
 *
 * @export
 * @class Rule
 * @implements {Validable}
 */
export default class Rule implements Validable {


    /**
     *
     *
     * @type {string}
     * @memberof Rule
     */
    name: string;

    /**
     *
     *
     * @type {HTMLFormElement}
     * @memberof Rule
     */
    form?: HTMLFormElement;

    /**
     *
     *
     * @type {HTMLInputElement}
     * @memberof Rule
     */
    input?: HTMLInputElement;

    /**
     *
     *
     * @type {string}
     * @memberof Rule
     */
    errorMessage: string = 'Une erreur est survenue !';

    /**
     *
     *
     * @type {Boolean}
     * @memberof Rule
     */
    hasError: Boolean = false;


    /**
     * Creates an instance of Rule.
     * 
     * @param {string} ruleName
     * @memberof Rule
     */
    constructor(ruleName: string) {
        this.name = ruleName;
    }


    /**
     * The rule logic
     *
     * @param {string} [params]
     * @param {HTMLFormElement} [form]
     * @memberof Rule
     */
    applyRule(params?: string, form?: HTMLFormElement) { }

    /**
     * Mark rule has fail
     *
     * @memberof Rule
     */
    error() {
        this.hasError = true;
        // console.log(this.errorMessage)
    }

    /**
     * Set the rule error message output
     *
     * @param {string} message
     * @param {{ [keyname: string]: any }} [attr]
     * @memberof Rule
     */
    setErrorMessage(message: string, attr?: { [keyname: string]: any }) {
        this.errorMessage = message.replace(':attr:', `${this.getInputName()}`);
        if (attr) {
            for (let key in attr) {
                this.errorMessage = this.errorMessage.replace(`:${key}:`, attr[key]);
            }
        }
    }

    /**
     * Set the form and the current input that apply rule
     *
     * @param {HTMLFormElement} form
     * @param {string} input
     * @memberof Rule
     */
    _prepare(form: HTMLFormElement, input: string) {
        this.form = form;
        this.input = this.form.querySelector(`[name="${input}"]`) as HTMLInputElement;
        this.hasError = false;
    }

    /**
     * Return the input name
     *
     * @return {string|null} 
     * @memberof Rule
     */
    getInputName() {
        return this.input ? this.input.getAttribute('name') : '';
    }

}