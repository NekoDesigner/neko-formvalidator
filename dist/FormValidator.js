"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = /** @class */ (function () {
    function Validator(form) {
        this.errors = {};
        this.state = {
            success: true,
            errors: null
        };
        this.form = form;
    }
    Validator.use = function (rule) {
        if (Array.isArray(rule)) {
            rule.forEach(function (rullable) {
                var name = new rullable().name.toString();
                Validator.modules[name] = rullable;
            });
        }
        else {
            var name_1 = new rule().name.toString();
            Validator.modules[name_1] = rule;
        }
    };
    Validator.prototype.validate = function (rules) {
        this._resetState();
        for (var key in rules) {
            var rule_list = rules[key];
            var callable_rule = rule_list.split('|');
            if (this._hasNullableRule(callable_rule)) {
                for (var i = 0; i < callable_rule.length; i++) {
                    var input = this.form.querySelector("[name=\"" + key + "\"]");
                    if (input.value) {
                        this._call(key, callable_rule[i]);
                    }
                }
            }
            else {
                for (var i = 0; i < callable_rule.length; i++) {
                    this._call(key, callable_rule[i]);
                }
            }
        }
        this._updateState();
        return this.state;
    };
    Validator.prototype._call = function (input, rule) {
        var guard;
        if (this._hasParameters(rule)) {
            var rule_with_params = rule.split(':');
            var rule_name = rule_with_params[0];
            var params = rule_with_params[1];
            if (Validator.modules[rule_name]) {
                guard = new Validator.modules[rule_name]();
                guard._prepare(this.form, input);
                guard.applyRule(params);
            }
            else {
                throw new Error(rule_name + " doesn't exist. Please check if you have correctly import the rule or if you correctly call it by name.");
            }
        }
        else if (Validator.modules[rule]) {
            guard = new Validator.modules[rule]();
            guard._prepare(this.form, input);
            guard.applyRule();
        }
        else {
            throw new Error(rule + " doesn't exist. Please check if you have correctly import the rule or if you correctly call it by name.");
        }
        this._checkError(guard, input);
    };
    Validator.prototype._checkError = function (guard, input) {
        if (guard.hasError) {
            if (this.errors[input]) {
                this.errors[input]['messages'].push(guard.errorMessage);
            }
            else {
                this.errors[input] = {
                    el: guard.input,
                    messages: [guard.errorMessage]
                };
            }
        }
    };
    Validator.prototype._hasParameters = function (rule) {
        return /:/g.test(rule);
    };
    Validator.prototype._hasNullableRule = function (rules) {
        return rules.find(function (rule) { return rule === 'nullable'; });
    };
    Validator.prototype._resetState = function () {
        this.errors = {};
        this.state.errors = null;
        this.state.success = true;
    };
    Validator.prototype._updateState = function () {
        if (Object.entries(this.errors).length === 0) {
            this.state.errors = null;
            this.state.success = true;
        }
        else {
            this.state.errors = this.errors;
            this.state.success = false;
        }
    };
    Validator.modules = {};
    return Validator;
}());
exports.default = Validator;
var Required_1 = __importDefault(require("./Rules/Required"));
exports.Required = Required_1.default;
var RequiredIf_1 = __importDefault(require("./Rules/RequiredIf"));
exports.RequiredIf = RequiredIf_1.default;
var RequiredWith_1 = __importDefault(require("./Rules/RequiredWith"));
exports.RequiredWith = RequiredWith_1.default;
var Min_1 = __importDefault(require("./Rules/Min"));
exports.Min = Min_1.default;
var Max_1 = __importDefault(require("./Rules/Max"));
exports.Max = Max_1.default;
var Numeric_1 = __importDefault(require("./Rules/Numeric"));
exports.Numeric = Numeric_1.default;
var Email_1 = __importDefault(require("./Rules/Email"));
exports.Email = Email_1.default;
var Pattern_1 = __importDefault(require("./Rules/Pattern"));
exports.Pattern = Pattern_1.default;
var Rule_1 = __importDefault(require("./Rules/Rule"));
exports.Rule = Rule_1.default;
