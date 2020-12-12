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
var Email = /** @class */ (function (_super) {
    __extends(Email, _super);
    function Email() {
        var _this = _super.call(this, 'email') || this;
        _this.mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return _this;
    }
    Email.prototype.applyRule = function () {
        if (!this.input.value.match(this.mailformat)) {
            this.setErrorMessage(Email.ErrorMessage);
            return this.error();
        }
    };
    Email.Description = "La valeur du champs doit \u00EAtre au format E-mail.";
    Email.ErrorMessage = "Le champs :attr: doit avoir un email valide.";
    return Email;
}(Rule_1.default));
exports.default = Email;
