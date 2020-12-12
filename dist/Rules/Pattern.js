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
var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    function Pattern() {
        return _super.call(this, 'pattern') || this;
    }
    Pattern.prototype.applyRule = function (params) {
        var regexp_string = params.substring(1);
        regexp_string = regexp_string.slice(0, -1);
        var regexp = new RegExp(regexp_string);
        if (!this.input.value.match(regexp)) {
            this.setErrorMessage(Pattern.ErrorMessage);
            return this.error();
        }
    };
    Pattern.Description = "La valeur du champs doit correspondre au pattern pass\u00E9 en param\u00E8tre.";
    Pattern.ErrorMessage = "Le champs :attr: n'a pas un format valide.";
    return Pattern;
}(Rule_1.default));
exports.default = Pattern;
