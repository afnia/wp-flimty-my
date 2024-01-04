"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

  /************************************************************************/

  var __webpack_exports__ = {};
  /* harmony export */

  __webpack_require__.d(__webpack_exports__, {
    /* harmony export */
    "default": function _default() {
      return (
        /* binding */
        TokenList
      );
    }
    /* harmony export */

  });
  /**
   * A set of tokens.
   *
   * @see https://dom.spec.whatwg.org/#domtokenlist
   */


  var TokenList =
  /*#__PURE__*/
  function () {
    /**
     * Constructs a new instance of TokenList.
     *
     * @param {string} initialValue Initial value to assign.
     */
    function TokenList() {
      var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      _classCallCheck(this, TokenList);

      this.value = initialValue; // Disable reason: These are type hints on the class.

      /* eslint-disable no-unused-expressions */

      /** @type {string} */

      this._currentValue;
      /** @type {string[]} */

      this._valueAsArray;
      /* eslint-enable no-unused-expressions */
    }
    /**
     * @param {Parameters<Array<string>['entries']>} args
     */


    _createClass(TokenList, [{
      key: "entries",
      value: function entries() {
        var _this$_valueAsArray;

        return (_this$_valueAsArray = this._valueAsArray).entries.apply(_this$_valueAsArray, arguments);
      }
      /**
       * @param {Parameters<Array<string>['forEach']>} args
       */

    }, {
      key: "forEach",
      value: function forEach() {
        var _this$_valueAsArray2;

        return (_this$_valueAsArray2 = this._valueAsArray).forEach.apply(_this$_valueAsArray2, arguments);
      }
      /**
       * @param {Parameters<Array<string>['keys']>} args
       */

    }, {
      key: "keys",
      value: function keys() {
        var _this$_valueAsArray3;

        return (_this$_valueAsArray3 = this._valueAsArray).keys.apply(_this$_valueAsArray3, arguments);
      }
      /**
       * @param {Parameters<Array<string>['values']>} args
       */

    }, {
      key: "values",
      value: function values() {
        var _this$_valueAsArray4;

        return (_this$_valueAsArray4 = this._valueAsArray).values.apply(_this$_valueAsArray4, arguments);
      }
      /**
       * Returns the associated set as string.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-value
       *
       * @return {string} Token set as string.
       */

    }, {
      key: "toString",

      /**
       * Returns the stringified form of the TokenList.
       *
       * @see https://dom.spec.whatwg.org/#DOMTokenList-stringification-behavior
       * @see https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tostring
       *
       * @return {string} Token set as string.
       */
      value: function toString() {
        return this.value;
      }
      /**
       * Returns an iterator for the TokenList, iterating items of the set.
       *
       * @see https://dom.spec.whatwg.org/#domtokenlist
       *
       * @return {IterableIterator<string>} TokenList iterator.
       */

    }, {
      key: Symbol.iterator,
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function value() {
        return regeneratorRuntime.wrap(function value$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.delegateYield(this._valueAsArray, "t0", 1);

              case 1:
                return _context.abrupt("return", _context.t0);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, value, this);
      })
      /**
       * Returns the token with index `index`.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-item
       *
       * @param {number} index Index at which to return token.
       *
       * @return {string|undefined} Token at index.
       */

    }, {
      key: "item",
      value: function item(index) {
        return this._valueAsArray[index];
      }
      /**
       * Returns true if `token` is present, and false otherwise.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-contains
       *
       * @param {string} item Token to test.
       *
       * @return {boolean} Whether token is present.
       */

    }, {
      key: "contains",
      value: function contains(item) {
        return this._valueAsArray.indexOf(item) !== -1;
      }
      /**
       * Adds all arguments passed, except those already present.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-add
       *
       * @param {...string} items Items to add.
       */

    }, {
      key: "add",
      value: function add() {
        for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
          items[_key] = arguments[_key];
        }

        this.value += ' ' + items.join(' ');
      }
      /**
       * Removes arguments passed, if they are present.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-remove
       *
       * @param {...string} items Items to remove.
       */

    }, {
      key: "remove",
      value: function remove() {
        for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }

        this.value = this._valueAsArray.filter(function (val) {
          return !items.includes(val);
        }).join(' ');
      }
      /**
       * If `force` is not given, "toggles" `token`, removing it if it’s present
       * and adding it if it’s not present. If `force` is true, adds token (same
       * as add()). If force is false, removes token (same as remove()). Returns
       * true if `token` is now present, and false otherwise.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-toggle
       *
       * @param {string}  token   Token to toggle.
       * @param {boolean} [force] Presence to force.
       *
       * @return {boolean} Whether token is present after toggle.
       */

    }, {
      key: "toggle",
      value: function toggle(token, force) {
        if (undefined === force) {
          force = !this.contains(token);
        }

        if (force) {
          this.add(token);
        } else {
          this.remove(token);
        }

        return force;
      }
      /**
       * Replaces `token` with `newToken`. Returns true if `token` was replaced
       * with `newToken`, and false otherwise.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-replace
       *
       * @param {string} token    Token to replace with `newToken`.
       * @param {string} newToken Token to use in place of `token`.
       *
       * @return {boolean} Whether replacement occurred.
       */

    }, {
      key: "replace",
      value: function replace(token, newToken) {
        if (!this.contains(token)) {
          return false;
        }

        this.remove(token);
        this.add(newToken);
        return true;
      }
      /**
       * Returns true if `token` is in the associated attribute’s supported
       * tokens. Returns false otherwise.
       *
       * Always returns `true` in this implementation.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-supports
       *
       * @return {boolean} Whether token is supported.
       */

    }, {
      key: "supports",
      value: function supports() {
        return true;
      }
    }, {
      key: "value",
      get: function get() {
        return this._currentValue;
      }
      /**
       * Replaces the associated set with a new string value.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-value
       *
       * @param {string} value New token set as string.
       */
      ,
      set: function set(value) {
        value = String(value);
        this._valueAsArray = _toConsumableArray(new Set(value.split(/\s+/g).filter(Boolean)));
        this._currentValue = this._valueAsArray.join(' ');
      }
      /**
       * Returns the number of tokens.
       *
       * @see https://dom.spec.whatwg.org/#dom-domtokenlist-length
       *
       * @return {number} Number of tokens.
       */

    }, {
      key: "length",
      get: function get() {
        return this._valueAsArray.length;
      }
    }]);

    return TokenList;
  }();

  (window.wp = window.wp || {}).tokenList = __webpack_exports__["default"];
  /******/
})();