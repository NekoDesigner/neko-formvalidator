/**
 * options paramters must match with FormElement interface
 *
 * @interface FormElement
 */
interface FormElement {
    element: HTMLInputElement | HTMLSelectElement,
    rules: string
    messages?: any
}

interface FormError {
    message: string,
    element: HTMLInputElement | HTMLSelectElement
}

interface FormResult {
    isValid: boolean,
    messages: Array<FormError>
    getMessage: Function
}

/**
 * Class inpire by Laravel Frameword Request Validation rules
 * Use it for validate your forms elements
 * @example
 * new FormValidator(myForm, [{ element: myInput, rules: 'required|min:5', messages: { required: "Need not empty !", min: "Must greater or equal than 5 !" } }])
 *
 * @export
 * @class FormValidator
 */
export default class FormValidator {

    TAG: string = '[FORM VALIDATOR] => ';
    form: HTMLFormElement;
    elements: Array<FormElement>;

    validRules: Array<string> = ['required', 'email', 'number', 'max', 'min', 'required_if'];
    rulesSchema: any;

    constructor(form: HTMLFormElement, elements: Array<FormElement>) {
        this.form = form;
        this.elements = elements;
        this.validationRules();
    }

    add(element: FormElement) {
        this.elements.push(element);
        // this.Log(this.elements);
    }

    remove(element: HTMLInputElement | HTMLSelectElement) {
        let id = null;
        this.elements.forEach((el, index) => {
            if (el.element == element) {
                id = index;
            }
        });

        if (id === null) throw this.Error(`Element doesn't exist.`);

        this.elements.splice(id, 1);
        // this.Log(this.elements);
    }

    validate(): FormResult {

        let messages: Array<FormError> = [];
        let valid: boolean = true;
        
        this.elements.forEach(el => {
            
            let { element, rules } = el;
            
            // Get all rules
            let rules_arr = rules.split('|');

            // Vérifier si il y a un required_if
            const regex = /required_if/gi;
            if (/^required_if/.test(rules)) {
                let required_if_ok = false;
                // check if required_if is OK
                rules_arr.forEach(rule => {
                    if (/^required_if/.test(rule)) {
                        if (this.applySpecialRule("required_if", element, rule)) {
                            required_if_ok = false;
                            if (el.messages && el.messages[this.getSpecialRule(rule)]) {
                                let obj: FormError = {
                                    message: el.messages[this.getSpecialRule(rule)].toString(),
                                    element
                                }
                                messages.push(obj)
                            } else {
                                valid = false;
                            }
                        } else {
                            required_if_ok = true;
                        }
                    }
                });
                // if required_if is ok, we can check if other rules are respected
                if (required_if_ok) {
                    rules_arr.forEach(rule => {
                        if (!this.checkRule(rule)) throw `La règle ${rule} n'existe pas.`;
                        if (!/^required_if/.test(rule)) {
                            if (!this.isSpecialRule(rule)) {
                                if (!this.rulesSchema[rule](element)) {
                                    if (el.messages && el.messages[rule]) {
                                        let obj: FormError = {
                                            message: el.messages[rule].toString(),
                                            element
                                        }
                                        messages.push(obj);
                                    } else {
                                        valid = false;
                                    }
                                }
                            } else {
                                const rule_name = this.getSpecialRule(rule);
                                if (this.applySpecialRule(rule_name, element, rule)) {
                                    if (el.messages && el.messages[this.getSpecialRule(rule)]) {
                                        let obj: FormError = {
                                            message: el.messages[this.getSpecialRule(rule)].toString(),
                                            element
                                        }
                                        messages.push(obj)
                                    } else {
                                        valid = false;
                                    }
                                }
                            }
                        }
                    });
                }

            }
            else
            {
                rules_arr.forEach(rule => {

                    if (!this.checkRule(rule)) throw `La règle ${rule} n'existe pas.`;
                    // if (!this.validRules.includes(rule)) throw `La règle ${rule} n'existe pas.`;
    
                    if (!this.isSpecialRule(rule)) {
                        if (!this.rulesSchema[rule](element)) {
                            if (el.messages && el.messages[rule]) {
                                let obj: FormError = {
                                    message: el.messages[rule].toString(),
                                    element
                                }
                                messages.push(obj);
                            } else {
                                valid = false;
                            }
                        }
                    } else {
                        const rule_name = this.getSpecialRule(rule);
                        if (this.applySpecialRule(rule_name, element, rule)) {
                            if (el.messages && el.messages[this.getSpecialRule(rule)]) {
                                let obj: FormError = {
                                    message: el.messages[this.getSpecialRule(rule)].toString(),
                                    element
                                }
                                messages.push(obj)
                            } else {
                                valid = false;
                            }
                        }
                    }
    
                });    
            }
        });

        let result: FormResult = {
            isValid: !messages.length,
            messages: messages,
            getMessage: this.getMessage
        }

        return result;
        // return messages.length ? messages : valid;
    }

    /**
     * Rules with parameters
     *
     * @param {*} rule_name
     * @param {*} element
     * @param {*} rule
     * @returns {boolean}
     * @memberof FormValidator
     */
    applySpecialRule(rule_name: string, element: HTMLInputElement | HTMLSelectElement, rule: string): boolean {

        let valid = false;

        switch (rule_name) {
            case 'required_if':
                let elements: string[] = rule.split(':');
                let other: HTMLInputElement = document.querySelector(`[name="${elements[1]}"]`) as HTMLInputElement;
                valid = this.rulesSchema['required_if'](element, other);
                break;
            case 'min':
                let values: string[] = rule.split(':');
                let min: number = parseInt(values[1]);
                valid = this.rulesSchema['min'](element, min);
                break;
            case 'max':
                values = rule.split(':');
                let max: number = parseInt(values[1]);
                valid = this.rulesSchema['max'](element, max);
                break;
        }

        return valid;

    }

    /**
     * Check validation rules
     *
     * @memberof FormValidator
     */
    validationRules() {

        this.rulesSchema = {
            required: (element: HTMLInputElement | HTMLSelectElement) => {
                let value = element.value;
                return value.length;
            },
            email: (element: HTMLInputElement | HTMLSelectElement) => {
                let value = element.value;
                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(value);
            },
            number: (element: HTMLInputElement | HTMLSelectElement) => {
                let value = element.value;
                return parseInt(value) != NaN ? true : false;
            },
            required_if: (element: HTMLInputElement | HTMLSelectElement, other: HTMLInputElement | HTMLSelectElement) => {
                if (element.value == '' && other.value != '') {
                    return true;
                }
                return false;
            },
            min: (element: HTMLInputElement | HTMLSelectElement, minimum: number) => {
                let value: any = element.value;
                if (isNaN(value)) {
                    return value.length >= minimum ? false : true;
                }
                return parseFloat(value) >= minimum ? false : true;
            },
            max: (element: HTMLInputElement | HTMLSelectElement, maximum: number) => {
                let value: any = element.value;
                if (isNaN(value)) {
                    return value.length <= maximum ? false : true;
                }
                return parseFloat(value) <= maximum ? false : true;
            },
        }

    }

    /**
     * Check if rule exist
     *
     * @param {*} value
     * @returns {boolean}
     * @memberof FormValidator
     */
    checkRule(value: string): boolean {
        let valid = false;

        this.validRules.forEach(rule => {
            let val = `^${rule}`;
            let regex = new RegExp(val, "i");
            if (regex.test(value)) {
                valid = true;
            }
        });

        return valid;
    }

    /**
     * Return name of special rules
     *
     * @param {*} value
     * @returns {string}
     * @memberof FormValidator
     */
    getSpecialRule(value: string): string {
        let name = '';
        let specialRules: string[] = ['required_if', 'min', 'max'];
        specialRules.forEach(rule => {
            let val = `^${rule}`;
            let regex = new RegExp(val, "i");
            if (regex.test(value)) {
                name = rule;
            }
        });
        return name;
    }

    /**
     * Check if is special rules (with parameters)
     *
     * @param {*} value
     * @returns {boolean}
     * @memberof FormValidator
     */
    isSpecialRule(value: string): boolean {

        let valid = false;

        let specialRules: string[] = ['required_if', 'min', 'max'];
        specialRules.forEach(rule => {
            let val = `^${rule}`;
            let regex = new RegExp(val, "i");
            if (regex.test(value)) {
                valid = true;
            }
        });

        return valid;
    }

    getMessage(el: FormError): string {
        let regex = /:attr/ig;
        let name = el.element.getAttribute('name');
        if (name) {
            let message: string = el.message.replace(regex, name);
            return message;
        } else {
            this.Warn(`L'attibut name est manquant sur une de vos form elements`);
            return el.message;
        }
    }

    /**
     * Log message with Tag
     *
     * @param {*} message
     * @memberof FormValidator
     */
    Log(message: any) {
        console.log(this.TAG, message);
    }

    /**
     * Log error message with Tag
     *
     * @param {*} message
     * @memberof FormValidator
     */
    Error(message: any) {
        console.error(this.TAG, message);
    }

    /**
     * Log warning message with Tag
     *
     * @param {*} message
     * @memberof FormValidator
     */
    Warn(message: any) {
        console.warn(this.TAG, message);
    }

}
