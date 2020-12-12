"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rule = /** @class */ (function () {
    function Rule(ruleName) {
        this.errorMessage = 'Une erreur est survenue !';
        this.hasError = false;
        this.name = ruleName;
    }
    Rule.prototype.applyRule = function (params, form) { };
    Rule.prototype.error = function () {
        this.hasError = true;
        // console.log(this.errorMessage)
    };
    Rule.prototype.setErrorMessage = function (message, attr) {
        this.errorMessage = message.replace(':attr:', "" + this.getInputName());
        if (attr) {
            for (var key in attr) {
                this.errorMessage = this.errorMessage.replace(":" + key + ":", attr[key]);
            }
        }
    };
    Rule.prototype._prepare = function (form, input) {
        this.form = form;
        this.input = this.form.querySelector("[name=\"" + input + "\"]");
        this.hasError = false;
    };
    Rule.prototype.getInputName = function () {
        return this.input ? this.input.getAttribute('name') : '';
    };
    return Rule;
}());
exports.default = Rule;
