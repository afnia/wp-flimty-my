"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*! This file is auto-generated */
!function () {
  "use strict";

  var r = {
    d: function d(e, t) {
      for (var s in t) {
        r.o(t, s) && !r.o(e, s) && Object.defineProperty(e, s, {
          enumerable: !0,
          get: t[s]
        });
      }
    },
    o: function o(r, e) {
      return Object.prototype.hasOwnProperty.call(r, e);
    }
  },
      e = {};
  r.d(e, {
    "default": function _default() {
      return t;
    }
  });

  var t =
  /*#__PURE__*/
  function () {
    function t() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      _classCallCheck(this, t);

      this.value = r, this._currentValue, this._valueAsArray;
    }

    _createClass(t, [{
      key: "entries",
      value: function entries() {
        var _this$_valueAsArray;

        return (_this$_valueAsArray = this._valueAsArray).entries.apply(_this$_valueAsArray, arguments);
      }
    }, {
      key: "forEach",
      value: function forEach() {
        var _this$_valueAsArray2;

        return (_this$_valueAsArray2 = this._valueAsArray).forEach.apply(_this$_valueAsArray2, arguments);
      }
    }, {
      key: "keys",
      value: function keys() {
        var _this$_valueAsArray3;

        return (_this$_valueAsArray3 = this._valueAsArray).keys.apply(_this$_valueAsArray3, arguments);
      }
    }, {
      key: "values",
      value: function values() {
        var _this$_valueAsArray4;

        return (_this$_valueAsArray4 = this._valueAsArray).values.apply(_this$_valueAsArray4, arguments);
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.value;
      }
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
    }, {
      key: "item",
      value: function item(r) {
        return this._valueAsArray[r];
      }
    }, {
      key: "contains",
      value: function contains(r) {
        return -1 !== this._valueAsArray.indexOf(r);
      }
    }, {
      key: "add",
      value: function add() {
        for (var _len = arguments.length, r = new Array(_len), _key = 0; _key < _len; _key++) {
          r[_key] = arguments[_key];
        }

        this.value += " " + r.join(" ");
      }
    }, {
      key: "remove",
      value: function remove() {
        for (var _len2 = arguments.length, r = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          r[_key2] = arguments[_key2];
        }

        this.value = this._valueAsArray.filter(function (e) {
          return !r.includes(e);
        }).join(" ");
      }
    }, {
      key: "toggle",
      value: function toggle(r, e) {
        return void 0 === e && (e = !this.contains(r)), e ? this.add(r) : this.remove(r), e;
      }
    }, {
      key: "replace",
      value: function replace(r, e) {
        return !!this.contains(r) && (this.remove(r), this.add(e), !0);
      }
    }, {
      key: "supports",
      value: function supports() {
        return !0;
      }
    }, {
      key: "value",
      get: function get() {
        return this._currentValue;
      },
      set: function set(r) {
        r = String(r), this._valueAsArray = _toConsumableArray(new Set(r.split(/\s+/g).filter(Boolean))), this._currentValue = this._valueAsArray.join(" ");
      }
    }, {
      key: "length",
      get: function get() {
        return this._valueAsArray.length;
      }
    }]);

    return t;
  }();

  (window.wp = window.wp || {}).tokenList = e["default"];
}();