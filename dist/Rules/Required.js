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
var Required = /** @class */ (function (_super) {
    __extends(Required, _super);
    function Required() {
        return _super.call(this, 'required') || this;
    }
    Required.prototype.applyRule = function () {
        this.setErrorMessage(Required.ErrorMessage);
        if (!this.input || (this.input && !this.input.value))
            return this.error();
    };
    Required.Description = "Le champs ne peut pas \u00EAtre nulle.";
    Required.ErrorMessage = "Le champs :attr: est requis !";
    return Required;
}(Rule_1.default));
exports.default = Required;
