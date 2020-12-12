"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rule_1 = __importDefault(require("./Rule"));
var RequiredWith = /** @class */ (function (_super) {
    __extends(RequiredWith, _super);
    function RequiredWith() {
        return _super.call(this, 'required_with') || this;
    }
    RequiredWith.prototype.applyRule = function (params) {
        var _this = this;
        this.setErrorMessage("Le champs " + this.getInputName() + " est requis !");
        var inputs = params.split(',');
        var needed = false;
        var count = 0;
        inputs.forEach(function (inputName) {
            var input = _this.form.querySelector("[name=\"" + inputName + "\"]");
            if (input.value) {
                count++;
            }
        });
        if (count == inputs.length && !this.input.value)
            needed = true;
        if (needed) {
            this.setErrorMessage(RequiredWith.ErrorMessage, { list: inputs.join(', ') });
            return this.error();
        }
    };
    RequiredWith.Description = "Si tous les \u00E9l\u00E9ments pass\u00E9 en param\u00E8tre sont remplis, le champs sera requis";
    RequiredWith.ErrorMessage = "Le champs :attr: est requis si les champs suivant sont remplis : :list:\" ";
    return RequiredWith;
}(Rule_1.default));
exports.default = RequiredWith;
