export default class Validator {

    static modules: { [ruleName: string]: any } = {};
    form: HTMLFormElement;
    errors: { [ruleName: string]: any } = {};
    state: { [ruleName: string]: any } = {
        success: true,
        errors: null
    }

    constructor(form: HTMLFormElement) {
        this.form = form;
    }

    static use(rule: any) {
        if (Array.isArray(rule)) {
            rule.forEach(rullable => {
                let name: string = new rullable().name.toString();
                Validator.modules[name] = rullable
            })
        } else {
            let name: string = new rule().name.toString();
            Validator.modules[name] = rule
        }
    }

    validate(rules: { [ruleName: string]: any }) {

        this._resetState()

        for (let key in rules) {
            let rule_list: string = rules[key]
            let callable_rule = rule_list.split('|')
            if (this._hasNullableRule(callable_rule)) {
                for (let i = 0; i < callable_rule.length; i++) {
                    let input: HTMLInputElement = this.form.querySelector(`[name="${key}"]`) as HTMLInputElement
                    if (input.value) {
                        this._call(key, callable_rule[i])
                    }
                }
            } else {
                for (let i = 0; i < callable_rule.length; i++) {
                    this._call(key, callable_rule[i])
                }
            }
        }

        this._updateState()

        return this.state

    }

    _call(input: string, rule: string) {

        let guard;

        if (this._hasParameters(rule)) {
            let rule_with_params = rule.split(':');
            let rule_name = rule_with_params[0];
            let params = rule_with_params[1];
            if (Validator.modules[rule_name]) {
                guard = new Validator.modules[rule_name]();
                guard._prepare(this.form, input);
                guard.applyRule(params);
            } else {
                throw new Error(`${rule_name} doesn't exist. Please check if you have correctly import the rule or if you correctly call it by name.`)
            }
        } else if (Validator.modules[rule]) {
            guard = new Validator.modules[rule]();
            guard._prepare(this.form, input);
            guard.applyRule();
        } else {
            throw new Error(`${rule} doesn't exist. Please check if you have correctly import the rule or if you correctly call it by name.`)
        }

        this._checkError(guard, input)

    }

    _checkError(guard: any, input: string) {
        if (guard.hasError) {
            if (this.errors[input]) {
                this.errors[input]['messages'].push(guard.errorMessage)
            } else {
                this.errors[input] = {
                    el: guard.input,
                    messages: [guard.errorMessage]
                }
            }
        }
    }

    _hasParameters(rule: string) {
        return /:/g.test(rule)
    }

    _hasNullableRule(rules: Array<string>) {
        return rules.find(rule => rule === 'nullable')
    }

    _resetState() {
        this.errors = {}
        this.state.errors = null
        this.state.success = true;
    }

    _updateState() {
        if (Object.entries(this.errors).length === 0) {
            this.state.errors = null;
            this.state.success = true;
        } else {
            this.state.errors = this.errors;
            this.state.success = false;
        }
    }

}

import Required from './Rules/Required';
import RequiredIf from './Rules/RequiredIf';
import RequiredWith from './Rules/RequiredWith';
import Min from './Rules/Min';
import Max from './Rules/Max';
import Numeric from './Rules/Numeric';
import Email from './Rules/Email';
import Pattern from './Rules/Pattern';
import Rule from './Rules/Rule';

export {
    Required,
    RequiredIf,
    RequiredWith,
    Min,
    Max,
    Numeric,
    Email,
    Pattern,
    Rule
}
