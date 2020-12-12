// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/Rules/Rule.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule =
/** @class */
function () {
  function Rule(ruleName) {
    this.errorMessage = 'Une erreur est survenue !';
    this.hasError = false;
    this.name = ruleName;
  }

  Rule.prototype.applyRule = function (params, form) {};

  Rule.prototype.error = function () {
    this.hasError = true; // console.log(this.errorMessage)
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
}();

exports.default = Rule;
},{}],"../src/Rules/Required.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));

var Required =
/** @class */
function (_super) {
  __extends(Required, _super);

  function Required() {
    return _super.call(this, 'required') || this;
  }

  Required.prototype.applyRule = function () {
    this.setErrorMessage(Required.ErrorMessage);
    if (!this.input || this.input && !this.input.value) return this.error();
  };

  Required.Description = "Le champs ne peut pas \xEAtre nulle.";
  Required.ErrorMessage = "Le champs :attr: est requis !";
  return Required;
}(Rule_1.default);

exports.default = Required;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/Rules/RequiredIf.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));

var RequiredIf =
/** @class */
function (_super) {
  __extends(RequiredIf, _super);

  function RequiredIf() {
    return _super.call(this, 'required_if') || this;
  }

  RequiredIf.prototype.applyRule = function (params) {
    var input = this.form.querySelector("[name=\"" + params + "\"]");

    if (input.value && !this.input.value) {
      this.setErrorMessage(RequiredIf.ErrorMessage, {
        input: params
      });
      return this.error();
    }
  };

  RequiredIf.Description = "Le champs est requis si l'\xE9l\xE9ment pass\xE9 en param\xE8tre n'est pas nulle.";
  RequiredIf.ErrorMessage = "Le champs :attr: est requis si le champs suivant est remplis : \":input:\" ";
  return RequiredIf;
}(Rule_1.default);

exports.default = RequiredIf;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/Rules/RequiredWith.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));

var RequiredWith =
/** @class */
function (_super) {
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
    if (count == inputs.length && !this.input.value) needed = true;

    if (needed) {
      this.setErrorMessage(RequiredWith.ErrorMessage, {
        list: inputs.join(', ')
      });
      return this.error();
    }
  };

  RequiredWith.Description = "Si tous les \xE9l\xE9ments pass\xE9 en param\xE8tre sont remplis, le champs sera requis";
  RequiredWith.ErrorMessage = "Le champs :attr: est requis si les champs suivant sont remplis : :list:\" ";
  return RequiredWith;
}(Rule_1.default);

exports.default = RequiredWith;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/Rules/Min.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));

var Min =
/** @class */
function (_super) {
  __extends(Min, _super);

  function Min() {
    return _super.call(this, 'min') || this;
  }

  Min.prototype.applyRule = function (params) {
    var length = parseInt(params);

    if (this.input.type == 'number' || this.input.hasAttribute('data-input-type') && this.input.getAttribute('data-input-type') == 'number') {
      if (parseInt(this.input.value) < length) {
        this.setErrorMessage(Min.ErrorMessageNumber, {
          num: length
        });
        return this.error();
      }
    } else if (this.input.value.length < length) {
      this.setErrorMessage(Min.ErrorMessage, {
        num: length
      });
      return this.error();
    }
  };

  Min.Description = "La longeur ou la valeur du champs doit \xEAtre sup\xE9rieur ou \xE9gale \xE0 la valeur pass\xE9 en param\xE8tre";
  Min.ErrorMessageNumber = "Le champs :attr: doit \xEAtre sup\xE9rieur ou \xE9gale \xE0 :num: !";
  Min.ErrorMessage = "Le champs :attr: doit comporter au moins :num: caract\xE8res !";
  return Min;
}(Rule_1.default);

exports.default = Min;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/Rules/Max.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));

var Max =
/** @class */
function (_super) {
  __extends(Max, _super);

  function Max() {
    return _super.call(this, 'max') || this;
  }

  Max.prototype.applyRule = function (params) {
    var length = parseInt(params);

    if (this.input.type == 'number' || this.input.hasAttribute('data-input-type') && this.input.getAttribute('data-input-type') == 'number') {
      if (parseInt(this.input.value) > length) {
        this.setErrorMessage(Max.ErrorMessageNumber, {
          num: length
        });
        return this.error();
      }
    } else if (this.input.value.length > length) {
      this.setErrorMessage(Max.ErrorMessage, {
        num: length
      });
      return this.error();
    }
  };

  Max.Description = "La longeur ou la valeur du champs doit \xEAtre inf\xE9rieur ou \xE9gale \xE0 la valeur pass\xE9 en param\xE8tre";
  Max.ErrorMessageNumber = "Le champs :attr: doit \xEAtre inf\xE9rieur ou \xE9gale \xE0 :num: !";
  Max.ErrorMessage = "Le champs :attr: doit comporter au maximum :num: caract\xE8res !";
  return Max;
}(Rule_1.default);

exports.default = Max;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/Rules/Numeric.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));
/**
 * WARNING : This rule must be call before Min and Max rules
 *
 * @export
 * @class Numeric
 * @extends {Rule}
 */


var Numeric =
/** @class */
function (_super) {
  __extends(Numeric, _super);

  function Numeric() {
    return _super.call(this, 'numeric') || this;
  }

  Numeric.prototype.applyRule = function () {
    if (!this.isNumeric(this.input.value)) {
      this.setErrorMessage(Numeric.ErrorMessage);
      return this.error();
    } else {
      this.input.setAttribute('data-input-type', 'number');
    }
  };

  Numeric.prototype.isNumeric = function (value) {
    return /^\d+$/.test(value);
  };

  Numeric.Description = "L'\xE9l\xE9ment doit \xEAtre un nombre.";
  Numeric.ErrorMessage = "Le champs :attr: doit \xEAtre de type numeric.";
  return Numeric;
}(Rule_1.default);

exports.default = Numeric;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/Rules/Email.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));

var Email =
/** @class */
function (_super) {
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

  Email.Description = "La valeur du champs doit \xEAtre au format E-mail.";
  Email.ErrorMessage = "Le champs :attr: doit avoir un email valide.";
  return Email;
}(Rule_1.default);

exports.default = Email;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/Rules/Pattern.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Rule_1 = __importDefault(require("./Rule"));

var Pattern =
/** @class */
function (_super) {
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

  Pattern.Description = "La valeur du champs doit correspondre au pattern pass\xE9 en param\xE8tre.";
  Pattern.ErrorMessage = "Le champs :attr: n'a pas un format valide.";
  return Pattern;
}(Rule_1.default);

exports.default = Pattern;
},{"./Rule":"../src/Rules/Rule.ts"}],"../src/FormValidator.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Validator =
/** @class */
function () {
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
    } else {
      var name = new rule().name.toString();
      Validator.modules[name] = rule;
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
      } else {
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
      } else {
        throw new Error(rule_name + " doesn't exist. Please check if you have correctly import the rule or if you correctly call it by name.");
      }
    } else if (Validator.modules[rule]) {
      guard = new Validator.modules[rule]();

      guard._prepare(this.form, input);

      guard.applyRule();
    } else {
      throw new Error(rule + " doesn't exist. Please check if you have correctly import the rule or if you correctly call it by name.");
    }

    this._checkError(guard, input);
  };

  Validator.prototype._checkError = function (guard, input) {
    if (guard.hasError) {
      if (this.errors[input]) {
        this.errors[input]['messages'].push(guard.errorMessage);
      } else {
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
    return rules.find(function (rule) {
      return rule === 'nullable';
    });
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
    } else {
      this.state.errors = this.errors;
      this.state.success = false;
    }
  };

  Validator.modules = {};
  return Validator;
}();

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
},{"./Rules/Required":"../src/Rules/Required.ts","./Rules/RequiredIf":"../src/Rules/RequiredIf.ts","./Rules/RequiredWith":"../src/Rules/RequiredWith.ts","./Rules/Min":"../src/Rules/Min.ts","./Rules/Max":"../src/Rules/Max.ts","./Rules/Numeric":"../src/Rules/Numeric.ts","./Rules/Email":"../src/Rules/Email.ts","./Rules/Pattern":"../src/Rules/Pattern.ts","./Rules/Rule":"../src/Rules/Rule.ts"}],"Example.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FormValidator_1 = __importStar(require("../src/FormValidator"));

var form = document.querySelector('#form-test');
FormValidator_1.default.use([FormValidator_1.Required, FormValidator_1.RequiredIf, FormValidator_1.RequiredWith, FormValidator_1.Min, FormValidator_1.Max, FormValidator_1.Numeric, FormValidator_1.Email, FormValidator_1.Pattern]);
var validator = new FormValidator_1.default(form);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var results = validator.validate({
    'name': 'required',
    'age': 'required|numeric|min:12',
    'power': 'min:100'
  });
  console.log(results);
});
},{"../src/FormValidator":"../src/FormValidator.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64699" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","Example.ts"], null)
//# sourceMappingURL=/Example.7754daf6.js.map