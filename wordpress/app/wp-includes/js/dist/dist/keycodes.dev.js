"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/******/
(function () {
  // webpackBootstrap

  /******/
  "use strict";
  /******/
  // The require scope

  /******/

  var __webpack_require__ = {};
  /******/

  /************************************************************************/

  /******/

  /* webpack/runtime/define property getters */

  /******/

  !function () {
    /******/
    // define getter functions for harmony exports

    /******/
    __webpack_require__.d = function (exports, definition) {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/

      }
      /******/

    };
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/hasOwnProperty shorthand */

  /******/

  !function () {
    /******/
    __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/make namespace object */

  /******/

  !function () {
    /******/
    // define __esModule on exports

    /******/
    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

  }();
  /******/

  /************************************************************************/

  var __webpack_exports__ = {}; // ESM COMPAT FLAG

  __webpack_require__.r(__webpack_exports__); // EXPORTS


  __webpack_require__.d(__webpack_exports__, {
    ALT: function ALT() {
      return (
        /* binding */
        _ALT
      );
    },
    BACKSPACE: function BACKSPACE() {
      return (
        /* binding */
        _BACKSPACE
      );
    },
    COMMAND: function COMMAND() {
      return (
        /* binding */
        _COMMAND
      );
    },
    CTRL: function CTRL() {
      return (
        /* binding */
        _CTRL
      );
    },
    DELETE: function DELETE() {
      return (
        /* binding */
        _DELETE
      );
    },
    DOWN: function DOWN() {
      return (
        /* binding */
        _DOWN
      );
    },
    END: function END() {
      return (
        /* binding */
        _END
      );
    },
    ENTER: function ENTER() {
      return (
        /* binding */
        _ENTER
      );
    },
    ESCAPE: function ESCAPE() {
      return (
        /* binding */
        _ESCAPE
      );
    },
    F10: function F10() {
      return (
        /* binding */
        _F
      );
    },
    HOME: function HOME() {
      return (
        /* binding */
        _HOME
      );
    },
    LEFT: function LEFT() {
      return (
        /* binding */
        _LEFT
      );
    },
    PAGEDOWN: function PAGEDOWN() {
      return (
        /* binding */
        _PAGEDOWN
      );
    },
    PAGEUP: function PAGEUP() {
      return (
        /* binding */
        _PAGEUP
      );
    },
    RIGHT: function RIGHT() {
      return (
        /* binding */
        _RIGHT
      );
    },
    SHIFT: function SHIFT() {
      return (
        /* binding */
        _SHIFT
      );
    },
    SPACE: function SPACE() {
      return (
        /* binding */
        _SPACE
      );
    },
    TAB: function TAB() {
      return (
        /* binding */
        _TAB
      );
    },
    UP: function UP() {
      return (
        /* binding */
        _UP
      );
    },
    ZERO: function ZERO() {
      return (
        /* binding */
        _ZERO
      );
    },
    displayShortcut: function displayShortcut() {
      return (
        /* binding */
        _displayShortcut
      );
    },
    displayShortcutList: function displayShortcutList() {
      return (
        /* binding */
        _displayShortcutList
      );
    },
    isAppleOS: function isAppleOS() {
      return (
        /* reexport */
        _isAppleOS
      );
    },
    isKeyboardEvent: function isKeyboardEvent() {
      return (
        /* binding */
        _isKeyboardEvent
      );
    },
    modifiers: function modifiers() {
      return (
        /* binding */
        _modifiers
      );
    },
    rawShortcut: function rawShortcut() {
      return (
        /* binding */
        _rawShortcut
      );
    },
    shortcutAriaLabel: function shortcutAriaLabel() {
      return (
        /* binding */
        _shortcutAriaLabel
      );
    }
  });

  ; // CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.mjs

  /******************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  /* global Reflect, Promise, SuppressedError, Symbol */

  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    return _assign.apply(this, arguments);
  };

  function __rest(s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  }

  function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __param(paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  }

  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }

    var kind = contextIn.kind,
        key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});

    var _,
        done = false;

    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};

      for (var p in contextIn) {
        context[p] = p === "access" ? {} : contextIn[p];
      }

      for (var p in contextIn.access) {
        context.access[p] = contextIn.access[p];
      }

      context.addInitializer = function (f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };

      var result = (0, decorators[i])(kind === "accessor" ? {
        get: descriptor.get,
        set: descriptor.set
      } : descriptor[key], context);

      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || _typeof(result) !== "object") throw new TypeError("Object expected");
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);else descriptor[key] = _;
      }
    }

    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }

  ;

  function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;

    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }

    return useValue ? value : void 0;
  }

  ;

  function __propKey(x) {
    return _typeof(x) === "symbol" ? x : "".concat(x);
  }

  ;

  function __setFunctionName(f, name, prefix) {
    if (_typeof(name) === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
      configurable: true,
      value: prefix ? "".concat(prefix, " ", name) : name
    });
  }

  ;

  function __metadata(metadataKey, metadataValue) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  function __generator(thisArg, body) {
    var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (g && (g = 0, op[0] && (_ = 0)), _) {
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      };
    }
  }

  var __createBinding = Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);

    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = {
        enumerable: true,
        get: function get() {
          return m[k];
        }
      };
    }

    Object.defineProperty(o, k2, desc);
  } : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
  };

  function __exportStar(m, o) {
    for (var p in m) {
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    }
  }

  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
        m = s && o[s],
        i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function next() {
        if (o && i >= o.length) o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }

  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;

    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
        ar.push(r.value);
      }
    } catch (error) {
      e = {
        error: error
      };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }

    return ar;
  }
  /** @deprecated */


  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++) {
      ar = ar.concat(__read(arguments[i]));
    }

    return ar;
  }
  /** @deprecated */


  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
      s += arguments[i].length;
    }

    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
        r[k] = a[j];
      }
    }

    return r;
  }

  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }

  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }

  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []),
        i,
        q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i;

    function verb(n) {
      if (g[n]) i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
    }

    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }

    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }

    function fulfill(value) {
      resume("next", value);
    }

    function reject(value) {
      resume("throw", value);
    }

    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  }

  function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function () {
      return this;
    }, i;

    function verb(n, f) {
      i[n] = o[n] ? function (v) {
        return (p = !p) ? {
          value: __await(o[n](v)),
          done: false
        } : f ? f(v) : v;
      } : f;
    }
  }

  function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator],
        i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
      return this;
    }, i);

    function verb(n) {
      i[n] = o[n] && function (v) {
        return new Promise(function (resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }

    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function (v) {
        resolve({
          value: v,
          done: d
        });
      }, reject);
    }
  }

  function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", {
        value: raw
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  }

  ;

  var __setModuleDefault = Object.create ? function (o, v) {
    Object.defineProperty(o, "default", {
      enumerable: true,
      value: v
    });
  } : function (o, v) {
    o["default"] = v;
  };

  function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) {
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }

    __setModuleDefault(result, mod);

    return result;
  }

  function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  }

  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }

  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }

  function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || _typeof(receiver) !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
  }

  function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
      if (_typeof(value) !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
      var dispose;

      if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
      }

      if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
      }

      if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
      env.stack.push({
        value: value,
        dispose: dispose,
        async: async
      });
    } else if (async) {
      env.stack.push({
        async: true
      });
    }

    return value;
  }

  var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  function __disposeResources(env) {
    function fail(e) {
      env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }

    function next() {
      while (env.stack.length) {
        var rec = env.stack.pop();

        try {
          var result = rec.dispose && rec.dispose.call(rec.value);
          if (rec.async) return Promise.resolve(result).then(next, function (e) {
            fail(e);
            return next();
          });
        } catch (e) {
          fail(e);
        }
      }

      if (env.hasError) throw env.error;
    }

    return next();
  }
  /* harmony default export */


  var tslib_es6 = {
    __extends: __extends,
    __assign: _assign,
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn,
    __addDisposableResource: __addDisposableResource,
    __disposeResources: __disposeResources
  };
  ; // CONCATENATED MODULE: ./node_modules/lower-case/dist.es2015/index.js

  /**
   * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
   */

  var SUPPORTED_LOCALE = {
    tr: {
      regexp: /\u0130|\u0049|\u0049\u0307/g,
      map: {
        İ: "i",
        I: "\u0131",
        İ: "i"
      }
    },
    az: {
      regexp: /\u0130/g,
      map: {
        İ: "i",
        I: "\u0131",
        İ: "i"
      }
    },
    lt: {
      regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
      map: {
        I: "i\u0307",
        J: "j\u0307",
        Į: "\u012F\u0307",
        Ì: "i\u0307\u0300",
        Í: "i\u0307\u0301",
        Ĩ: "i\u0307\u0303"
      }
    }
  };
  /**
   * Localized lower case.
   */

  function localeLowerCase(str, locale) {
    var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
    if (lang) return lowerCase(str.replace(lang.regexp, function (m) {
      return lang.map[m];
    }));
    return lowerCase(str);
  }
  /**
   * Lower case as a function.
   */


  function lowerCase(str) {
    return str.toLowerCase();
  }

  ; // CONCATENATED MODULE: ./node_modules/no-case/dist.es2015/index.js
  // Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").

  var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g]; // Remove all non-word characters.

  var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
  /**
   * Normalize the string into something other libraries can manipulate easier.
   */

  function noCase(input, options) {
    if (options === void 0) {
      options = {};
    }

    var _a = options.splitRegexp,
        splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a,
        _b = options.stripRegexp,
        stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b,
        _c = options.transform,
        transform = _c === void 0 ? lowerCase : _c,
        _d = options.delimiter,
        delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length; // Trim the delimiter from around the output string.

    while (result.charAt(start) === "\0") {
      start++;
    }

    while (result.charAt(end - 1) === "\0") {
      end--;
    } // Transform each token independently.


    return result.slice(start, end).split("\0").map(transform).join(delimiter);
  }
  /**
   * Replace `re` in the input string with the replacement value.
   */


  function replace(input, re, value) {
    if (re instanceof RegExp) return input.replace(re, value);
    return re.reduce(function (input, re) {
      return input.replace(re, value);
    }, input);
  }

  ; // CONCATENATED MODULE: ./node_modules/upper-case-first/dist.es2015/index.js

  /**
   * Upper case the first character of an input string.
   */

  function upperCaseFirst(input) {
    return input.charAt(0).toUpperCase() + input.substr(1);
  }

  ; // CONCATENATED MODULE: ./node_modules/capital-case/dist.es2015/index.js

  function capitalCaseTransform(input) {
    return upperCaseFirst(input.toLowerCase());
  }

  function capitalCase(input, options) {
    if (options === void 0) {
      options = {};
    }

    return noCase(input, _assign({
      delimiter: " ",
      transform: capitalCaseTransform
    }, options));
  }

  ; // CONCATENATED MODULE: external ["wp","i18n"]

  var external_wp_i18n_namespaceObject = window["wp"]["i18n"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keycodes/build-module/platform.js

  /**
   * Return true if platform is MacOS.
   *
   * @param {Window?} _window window object by default; used for DI testing.
   *
   * @return {boolean} True if MacOS; false otherwise.
   */

  function _isAppleOS() {
    var _window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!_window) {
      if (typeof window === 'undefined') {
        return false;
      }

      _window = window;
    }

    var platform = _window.navigator.platform;
    return platform.indexOf('Mac') !== -1 || ['iPad', 'iPhone'].includes(platform);
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keycodes/build-module/index.js

  /**
   * Note: The order of the modifier keys in many of the [foo]Shortcut()
   * functions in this file are intentional and should not be changed. They're
   * designed to fit with the standard menu keyboard shortcuts shown in the
   * user's platform.
   *
   * For example, on MacOS menu shortcuts will place Shift before Command, but
   * on Windows Control will usually come first. So don't provide your own
   * shortcut combos directly to keyboardShortcut().
   */

  /**
   * External dependencies
   */

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /** @typedef {typeof ALT | CTRL | COMMAND | SHIFT } WPModifierPart */

  /** @typedef {'primary' | 'primaryShift' | 'primaryAlt' | 'secondary' | 'access' | 'ctrl' | 'alt' | 'ctrlShift' | 'shift' | 'shiftAlt' | 'undefined'} WPKeycodeModifier */

  /**
   * An object of handler functions for each of the possible modifier
   * combinations. A handler will return a value for a given key.
   *
   * @template T
   *
   * @typedef {Record<WPKeycodeModifier, T>} WPModifierHandler
   */

  /**
   * @template T
   *
   * @typedef {(character: string, isApple?: () => boolean) => T} WPKeyHandler
   */

  /** @typedef {(event: import('react').KeyboardEvent<HTMLElement> | KeyboardEvent, character: string, isApple?: () => boolean) => boolean} WPEventKeyHandler */

  /** @typedef {( isApple: () => boolean ) => WPModifierPart[]} WPModifier */

  /**
   * Keycode for BACKSPACE key.
   */

  var _BACKSPACE = 8;
  /**
   * Keycode for TAB key.
   */

  var _TAB = 9;
  /**
   * Keycode for ENTER key.
   */

  var _ENTER = 13;
  /**
   * Keycode for ESCAPE key.
   */

  var _ESCAPE = 27;
  /**
   * Keycode for SPACE key.
   */

  var _SPACE = 32;
  /**
   * Keycode for PAGEUP key.
   */

  var _PAGEUP = 33;
  /**
   * Keycode for PAGEDOWN key.
   */

  var _PAGEDOWN = 34;
  /**
   * Keycode for END key.
   */

  var _END = 35;
  /**
   * Keycode for HOME key.
   */

  var _HOME = 36;
  /**
   * Keycode for LEFT key.
   */

  var _LEFT = 37;
  /**
   * Keycode for UP key.
   */

  var _UP = 38;
  /**
   * Keycode for RIGHT key.
   */

  var _RIGHT = 39;
  /**
   * Keycode for DOWN key.
   */

  var _DOWN = 40;
  /**
   * Keycode for DELETE key.
   */

  var _DELETE = 46;
  /**
   * Keycode for F10 key.
   */

  var _F = 121;
  /**
   * Keycode for ALT key.
   */

  var _ALT = 'alt';
  /**
   * Keycode for CTRL key.
   */

  var _CTRL = 'ctrl';
  /**
   * Keycode for COMMAND/META key.
   */

  var _COMMAND = 'meta';
  /**
   * Keycode for SHIFT key.
   */

  var _SHIFT = 'shift';
  /**
   * Keycode for ZERO key.
   */

  var _ZERO = 48;
  /**
   * Map the values of an object with a specified callback and return the result object.
   *
   * @template {{ [s: string]: any; } | ArrayLike<any>} T
   *
   * @param {T}                     object Object to map values of.
   * @param {( value: any ) => any} mapFn  Mapping function
   *
   * @return {any} Active modifier constants.
   */

  function mapValues(object, mapFn) {
    return Object.fromEntries(Object.entries(object).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return [key, mapFn(value)];
    }));
  }
  /**
   * Object that contains functions that return the available modifier
   * depending on platform.
   *
   * @type {WPModifierHandler< ( isApple: () => boolean ) => WPModifierPart[]>}
   */


  var _modifiers = {
    primary: function primary(_isApple) {
      return _isApple() ? [_COMMAND] : [_CTRL];
    },
    primaryShift: function primaryShift(_isApple) {
      return _isApple() ? [_SHIFT, _COMMAND] : [_CTRL, _SHIFT];
    },
    primaryAlt: function primaryAlt(_isApple) {
      return _isApple() ? [_ALT, _COMMAND] : [_CTRL, _ALT];
    },
    secondary: function secondary(_isApple) {
      return _isApple() ? [_SHIFT, _ALT, _COMMAND] : [_CTRL, _SHIFT, _ALT];
    },
    access: function access(_isApple) {
      return _isApple() ? [_CTRL, _ALT] : [_SHIFT, _ALT];
    },
    ctrl: function ctrl() {
      return [_CTRL];
    },
    alt: function alt() {
      return [_ALT];
    },
    ctrlShift: function ctrlShift() {
      return [_CTRL, _SHIFT];
    },
    shift: function shift() {
      return [_SHIFT];
    },
    shiftAlt: function shiftAlt() {
      return [_SHIFT, _ALT];
    },
    undefined: function undefined() {
      return [];
    }
  };
  /**
   * An object that contains functions to get raw shortcuts.
   *
   * These are intended for user with the KeyboardShortcuts.
   *
   * @example
   * ```js
   * // Assuming macOS:
   * rawShortcut.primary( 'm' )
   * // "meta+m""
   * ```
   *
   * @type {WPModifierHandler<WPKeyHandler<string>>} Keyed map of functions to raw
   *                                                 shortcuts.
   */

  var _rawShortcut = mapValues(_modifiers, function (
  /** @type {WPModifier} */
  modifier) {
    return (
      /** @type {WPKeyHandler<string>} */
      function (character) {
        var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _isAppleOS;

        return [].concat(_toConsumableArray(modifier(_isApple)), [character.toLowerCase()]).join('+');
      }
    );
  });
  /**
   * Return an array of the parts of a keyboard shortcut chord for display.
   *
   * @example
   * ```js
   * // Assuming macOS:
   * displayShortcutList.primary( 'm' );
   * // [ "⌘", "M" ]
   * ```
   *
   * @type {WPModifierHandler<WPKeyHandler<string[]>>} Keyed map of functions to
   *                                                   shortcut sequences.
   */


  var _displayShortcutList = mapValues(_modifiers, function (
  /** @type {WPModifier} */
  modifier) {
    return (
      /** @type {WPKeyHandler<string[]>} */
      function (character) {
        var _replacementKeyMap;

        var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _isAppleOS;

        var isApple = _isApple();

        var replacementKeyMap = (_replacementKeyMap = {}, _defineProperty(_replacementKeyMap, _ALT, isApple ? '⌥' : 'Alt'), _defineProperty(_replacementKeyMap, _CTRL, isApple ? '⌃' : 'Ctrl'), _defineProperty(_replacementKeyMap, _COMMAND, '⌘'), _defineProperty(_replacementKeyMap, _SHIFT, isApple ? '⇧' : 'Shift'), _replacementKeyMap);
        var modifierKeys = modifier(_isApple).reduce(function (accumulator, key) {
          var _replacementKeyMap$ke;

          var replacementKey = (_replacementKeyMap$ke = replacementKeyMap[key]) !== null && _replacementKeyMap$ke !== void 0 ? _replacementKeyMap$ke : key; // If on the Mac, adhere to platform convention and don't show plus between keys.

          if (isApple) {
            return [].concat(_toConsumableArray(accumulator), [replacementKey]);
          }

          return [].concat(_toConsumableArray(accumulator), [replacementKey, '+']);
        },
        /** @type {string[]} */
        []); // Symbols (~`,.) are removed by the default regular expression,
        // so override the rule to allow symbols used for shortcuts.
        // see: https://github.com/blakeembrey/change-case#options

        var capitalizedCharacter = capitalCase(character, {
          stripRegexp: /[^A-Z0-9~`,\.\\\-]/gi
        });
        return [].concat(_toConsumableArray(modifierKeys), [capitalizedCharacter]);
      }
    );
  });
  /**
   * An object that contains functions to display shortcuts.
   *
   * @example
   * ```js
   * // Assuming macOS:
   * displayShortcut.primary( 'm' );
   * // "⌘M"
   * ```
   *
   * @type {WPModifierHandler<WPKeyHandler<string>>} Keyed map of functions to
   *                                                 display shortcuts.
   */


  var _displayShortcut = mapValues(_displayShortcutList, function (
  /** @type {WPKeyHandler<string[]>} */
  shortcutList) {
    return (
      /** @type {WPKeyHandler<string>} */
      function (character) {
        var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _isAppleOS;

        return shortcutList(character, _isApple).join('');
      }
    );
  });
  /**
   * An object that contains functions to return an aria label for a keyboard
   * shortcut.
   *
   * @example
   * ```js
   * // Assuming macOS:
   * shortcutAriaLabel.primary( '.' );
   * // "Command + Period"
   * ```
   *
   * @type {WPModifierHandler<WPKeyHandler<string>>} Keyed map of functions to
   *                                                 shortcut ARIA labels.
   */


  var _shortcutAriaLabel = mapValues(_modifiers, function (
  /** @type {WPModifier} */
  modifier) {
    return (
      /** @type {WPKeyHandler<string>} */
      function (character) {
        var _replacementKeyMap2;

        var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _isAppleOS;

        var isApple = _isApple();
        /** @type {Record<string,string>} */


        var replacementKeyMap = (_replacementKeyMap2 = {}, _defineProperty(_replacementKeyMap2, _SHIFT, 'Shift'), _defineProperty(_replacementKeyMap2, _COMMAND, isApple ? 'Command' : 'Control'), _defineProperty(_replacementKeyMap2, _CTRL, 'Control'), _defineProperty(_replacementKeyMap2, _ALT, isApple ? 'Option' : 'Alt'), _defineProperty(_replacementKeyMap2, ',', (0, external_wp_i18n_namespaceObject.__)('Comma')), _defineProperty(_replacementKeyMap2, '.', (0, external_wp_i18n_namespaceObject.__)('Period')), _defineProperty(_replacementKeyMap2, '`', (0, external_wp_i18n_namespaceObject.__)('Backtick')), _defineProperty(_replacementKeyMap2, '~', (0, external_wp_i18n_namespaceObject.__)('Tilde')), _replacementKeyMap2);
        return [].concat(_toConsumableArray(modifier(_isApple)), [character]).map(function (key) {
          var _replacementKeyMap$ke2;

          return capitalCase((_replacementKeyMap$ke2 = replacementKeyMap[key]) !== null && _replacementKeyMap$ke2 !== void 0 ? _replacementKeyMap$ke2 : key);
        }).join(isApple ? ' ' : ' + ');
      }
    );
  });
  /**
   * From a given KeyboardEvent, returns an array of active modifier constants for
   * the event.
   *
   * @param {import('react').KeyboardEvent<HTMLElement> | KeyboardEvent} event Keyboard event.
   *
   * @return {Array<WPModifierPart>} Active modifier constants.
   */


  function getEventModifiers(event) {
    return (
      /** @type {WPModifierPart[]} */
      [_ALT, _CTRL, _COMMAND, _SHIFT].filter(function (key) {
        return event[
        /** @type {'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey'} */
        "".concat(key, "Key")];
      })
    );
  }
  /**
   * An object that contains functions to check if a keyboard event matches a
   * predefined shortcut combination.
   *
   * @example
   * ```js
   * // Assuming an event for ⌘M key press:
   * isKeyboardEvent.primary( event, 'm' );
   * // true
   * ```
   *
   * @type {WPModifierHandler<WPEventKeyHandler>} Keyed map of functions
   *                                                       to match events.
   */


  var _isKeyboardEvent = mapValues(_modifiers, function (
  /** @type {WPModifier} */
  getModifiers) {
    return (
      /** @type {WPEventKeyHandler} */
      function (event, character) {
        var _isApple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _isAppleOS;

        var mods = getModifiers(_isApple);
        var eventMods = getEventModifiers(event);
        /** @type {Record<string,string>} */

        var replacementWithShiftKeyMap = {
          Comma: ',',
          Backslash: '\\',
          // Windows returns `\` for both IntlRo and IntlYen.
          IntlRo: '\\',
          IntlYen: '\\'
        };
        var modsDiff = mods.filter(function (mod) {
          return !eventMods.includes(mod);
        });
        var eventModsDiff = eventMods.filter(function (mod) {
          return !mods.includes(mod);
        });

        if (modsDiff.length > 0 || eventModsDiff.length > 0) {
          return false;
        }

        var key = event.key.toLowerCase();

        if (!character) {
          return mods.includes(
          /** @type {WPModifierPart} */
          key);
        }

        if (event.altKey && character.length === 1) {
          key = String.fromCharCode(event.keyCode).toLowerCase();
        } // `event.key` returns the value of the key pressed, taking into the state of
        // modifier keys such as `Shift`. If the shift key is pressed, a different
        // value may be returned depending on the keyboard layout. It is necessary to
        // convert to the physical key value that don't take into account keyboard
        // layout or modifier key state.


        if (event.shiftKey && character.length === 1 && replacementWithShiftKeyMap[event.code]) {
          key = replacementWithShiftKeyMap[event.code];
        } // For backwards compatibility.


        if (character === 'del') {
          character = 'delete';
        }

        return key === character.toLowerCase();
      }
    );
  });

  (window.wp = window.wp || {}).keycodes = __webpack_exports__;
  /******/
})();