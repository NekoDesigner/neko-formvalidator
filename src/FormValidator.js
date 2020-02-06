"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class inpire by Laravel Frameword Request Validation rules
 * Use it for validate your forms elements
 * @example
 * new FormValidator(myForm, [{ element: myInput, rules: 'required|min:5', messages: { required: "Need not empty !", min: "Must greater or equal than 5 !" } }])
 *
 * @export
 * @class FormValidator
 */
var FormValidator = /** @class */ (function () {
    function FormValidator(form, elements) {
        this.TAG = '[FORM VALIDATOR] => ';
        this.validRules = ['required', 'email', 'number', 'max', 'min', 'required_if'];
        this.form = form;
        this.elements = elements;
        this.validationRules();
    }
    FormValidator.prototype.add = function (element) {
        this.elements.push(element);
        // this.Log(this.elements);
    };
    FormValidator.prototype.remove = function (element) {
        var id = null;
        this.elements.forEach(function (el, index) {
            if (el.element == element) {
                id = index;
            }
        });
        if (id === null)
            throw this.Error("Element doesn't exist.");
        this.elements.splice(id, 1);
        // this.Log(this.elements);
    };
    FormValidator.prototype.validate = function () {
        var _this = this;
        var messages = [];
        var valid = true;
        this.elements.forEach(function (el) {
            var element = el.element, rules = el.rules;
            // Get all rules
            var rules_arr = rules.split('|');
            // Vérifier si il y a un required_if
            var regex = /required_if/gi;
            if (/^required_if/.test(rules)) {
                var required_if_ok_1 = false;
                // check if required_if is OK
                rules_arr.forEach(function (rule) {
                    if (/^required_if/.test(rule)) {
                        if (_this.applySpecialRule("required_if", element, rule)) {
                            required_if_ok_1 = false;
                            if (el.messages && el.messages[_this.getSpecialRule(rule)]) {
                                var obj = {
                                    message: el.messages[_this.getSpecialRule(rule)].toString(),
                                    element: element
                                };
                                messages.push(obj);
                            }
                            else {
                                valid = false;
                            }
                        }
                        else {
                            required_if_ok_1 = true;
                        }
                    }
                });
                // if required_if is ok, we can check if other rules are respected
                if (required_if_ok_1) {
                    rules_arr.forEach(function (rule) {
                        if (!_this.checkRule(rule))
                            throw "La r\u00E8gle " + rule + " n'existe pas.";
                        if (!/^required_if/.test(rule)) {
                            if (!_this.isSpecialRule(rule)) {
                                if (!_this.rulesSchema[rule](element)) {
                                    if (el.messages && el.messages[rule]) {
                                        var obj = {
                                            message: el.messages[rule].toString(),
                                            element: element
                                        };
                                        messages.push(obj);
                                    }
                                    else {
                                        valid = false;
                                    }
                                }
                            }
                            else {
                                var rule_name = _this.getSpecialRule(rule);
                                if (_this.applySpecialRule(rule_name, element, rule)) {
                                    if (el.messages && el.messages[_this.getSpecialRule(rule)]) {
                                        var obj = {
                                            message: el.messages[_this.getSpecialRule(rule)].toString(),
                                            element: element
                                        };
                                        messages.push(obj);
                                    }
                                    else {
                                        valid = false;
                                    }
                                }
                            }
                        }
                    });
                }
            }
            else {
                rules_arr.forEach(function (rule) {
                    if (!_this.checkRule(rule))
                        throw "La r\u00E8gle " + rule + " n'existe pas.";
                    // if (!this.validRules.includes(rule)) throw `La règle ${rule} n'existe pas.`;
                    if (!_this.isSpecialRule(rule)) {
                        if (!_this.rulesSchema[rule](element)) {
                            if (el.messages && el.messages[rule]) {
                                var obj = {
                                    message: el.messages[rule].toString(),
                                    element: element
                                };
                                messages.push(obj);
                            }
                            else {
                                valid = false;
                            }
                        }
                    }
                    else {
                        var rule_name = _this.getSpecialRule(rule);
                        if (_this.applySpecialRule(rule_name, element, rule)) {
                            if (el.messages && el.messages[_this.getSpecialRule(rule)]) {
                                var obj = {
                                    message: el.messages[_this.getSpecialRule(rule)].toString(),
                                    element: element
                                };
                                messages.push(obj);
                            }
                            else {
                                valid = false;
                            }
                        }
                    }
                });
            }
        });
        var result = {
            isValid: valid,
            messages: messages,
            getMessage: this.getMessage
        };
        console.log(result);
        return messages.length ? messages : valid;
    };
    /**
     * Rules with parameters
     *
     * @param {*} rule_name
     * @param {*} element
     * @param {*} rule
     * @returns {boolean}
     * @memberof FormValidator
     */
    FormValidator.prototype.applySpecialRule = function (rule_name, element, rule) {
        var valid = false;
        switch (rule_name) {
            case 'required_if':
                var elements = rule.split(':');
                var other = document.querySelector("[name=\"" + elements[1] + "\"]");
                valid = this.rulesSchema['required_if'](element, other);
                break;
            case 'min':
                var values = rule.split(':');
                var min = parseInt(values[1]);
                valid = this.rulesSchema['min'](element, min);
                break;
            case 'max':
                values = rule.split(':');
                var max = parseInt(values[1]);
                valid = this.rulesSchema['max'](element, max);
                break;
        }
        return valid;
    };
    /**
     * Check validation rules
     *
     * @memberof FormValidator
     */
    FormValidator.prototype.validationRules = function () {
        this.rulesSchema = {
            required: function (element) {
                var value = element.value;
                return value.length;
            },
            email: function (element) {
                var value = element.value;
                var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(value);
            },
            number: function (element) {
                var value = element.value;
                return parseInt(value) != NaN ? true : false;
            },
            required_if: function (element, other) {
                if (element.value == '' && other.value != '') {
                    return true;
                }
                return false;
            },
            min: function (element, minimum) {
                var value = element.value;
                if (isNaN(value)) {
                    return value.length >= minimum ? false : true;
                }
                return parseFloat(value) >= minimum ? false : true;
            },
            max: function (element, maximum) {
                var value = element.value;
                if (isNaN(value)) {
                    return value.length <= maximum ? false : true;
                }
                return parseFloat(value) <= maximum ? false : true;
            },
        };
    };
    /**
     * Check if rule exist
     *
     * @param {*} value
     * @returns {boolean}
     * @memberof FormValidator
     */
    FormValidator.prototype.checkRule = function (value) {
        var valid = false;
        this.validRules.forEach(function (rule) {
            var val = "^" + rule;
            var regex = new RegExp(val, "i");
            if (regex.test(value)) {
                valid = true;
            }
        });
        return valid;
    };
    /**
     * Return name of special rules
     *
     * @param {*} value
     * @returns {string}
     * @memberof FormValidator
     */
    FormValidator.prototype.getSpecialRule = function (value) {
        var name = '';
        var specialRules = ['required_if', 'min', 'max'];
        specialRules.forEach(function (rule) {
            var val = "^" + rule;
            var regex = new RegExp(val, "i");
            if (regex.test(value)) {
                name = rule;
            }
        });
        return name;
    };
    /**
     * Check if is special rules (with parameters)
     *
     * @param {*} value
     * @returns {boolean}
     * @memberof FormValidator
     */
    FormValidator.prototype.isSpecialRule = function (value) {
        var valid = false;
        var specialRules = ['required_if', 'min', 'max'];
        specialRules.forEach(function (rule) {
            var val = "^" + rule;
            var regex = new RegExp(val, "i");
            if (regex.test(value)) {
                valid = true;
            }
        });
        return valid;
    };
    FormValidator.prototype.getMessage = function (el) {
        var regex = /:attr/ig;
        var name = el.element.getAttribute('name');
        if (name) {
            var message = el.message.replace(regex, name);
            return message;
        }
        else {
            this.Warn("L'attibut name est manquant sur une de vos form elements");
            return el.message;
        }
    };
    /**
     * Log message with Tag
     *
     * @param {*} message
     * @memberof FormValidator
     */
    FormValidator.prototype.Log = function (message) {
        console.log(this.TAG, message);
    };
    /**
     * Log error message with Tag
     *
     * @param {*} message
     * @memberof FormValidator
     */
    FormValidator.prototype.Error = function (message) {
        console.error(this.TAG, message);
    };
    /**
     * Log warning message with Tag
     *
     * @param {*} message
     * @memberof FormValidator
     */
    FormValidator.prototype.Warn = function (message) {
        console.warn(this.TAG, message);
    };
    return FormValidator;
}());
exports.default = FormValidator;
