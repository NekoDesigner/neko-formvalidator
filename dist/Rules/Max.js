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
var Max = /** @class */ (function (_super) {
    __extends(Max, _super);
    function Max() {
        return _super.call(this, 'max') || this;
    }
    Max.prototype.applyRule = function (params) {
        var length = parseInt(params);
        if (this.input.type == 'number' ||
            (this.input.hasAttribute('data-input-type') && this.input.getAttribute('data-input-type') == 'number')) {
            if (parseInt(this.input.value) > length) {
                this.setErrorMessage(Max.ErrorMessageNumber, { num: length });
                return this.error();
            }
        }
        else if (this.input.value.length > length) {
            this.setErrorMessage(Max.ErrorMessage, { num: length });
            return this.error();
        }
    };
    Max.Description = "La longeur ou la valeur du champs doit \u00EAtre inf\u00E9rieur ou \u00E9gale \u00E0 la valeur pass\u00E9 en param\u00E8tre";
    Max.ErrorMessageNumber = "Le champs :attr: doit \u00EAtre inf\u00E9rieur ou \u00E9gale \u00E0 :num: !";
    Max.ErrorMessage = "Le champs :attr: doit comporter au maximum :num: caract\u00E8res !";
    return Max;
}(Rule_1.default));
exports.default = Max;
