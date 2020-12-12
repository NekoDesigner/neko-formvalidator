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
/**
 * WARNING : This rule must be call before Min and Max rules
 *
 * @export
 * @class Numeric
 * @extends {Rule}
 */
var Numeric = /** @class */ (function (_super) {
    __extends(Numeric, _super);
    function Numeric() {
        return _super.call(this, 'numeric') || this;
    }
    Numeric.prototype.applyRule = function () {
        if (!this.isNumeric(this.input.value)) {
            this.setErrorMessage(Numeric.ErrorMessage);
            return this.error();
        }
        else {
            this.input.setAttribute('data-input-type', 'number');
        }
    };
    Numeric.prototype.isNumeric = function (value) {
        return /^\d+$/.test(value);
    };
    Numeric.Description = "L'\u00E9l\u00E9ment doit \u00EAtre un nombre.";
    Numeric.ErrorMessage = "Le champs :attr: doit \u00EAtre de type numeric.";
    return Numeric;
}(Rule_1.default));
exports.default = Numeric;
