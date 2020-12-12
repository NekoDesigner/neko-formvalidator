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
var RequiredIf = /** @class */ (function (_super) {
    __extends(RequiredIf, _super);
    function RequiredIf() {
        return _super.call(this, 'required_if') || this;
    }
    RequiredIf.prototype.applyRule = function (params) {
        var input = this.form.querySelector("[name=\"" + params + "\"]");
        if (input.value && !this.input.value) {
            this.setErrorMessage(RequiredIf.ErrorMessage, { input: params });
            return this.error();
        }
    };
    RequiredIf.Description = "Le champs est requis si l'\u00E9l\u00E9ment pass\u00E9 en param\u00E8tre n'est pas nulle.";
    RequiredIf.ErrorMessage = "Le champs :attr: est requis si le champs suivant est remplis : \":input:\" ";
    return RequiredIf;
}(Rule_1.default));
exports.default = RequiredIf;
