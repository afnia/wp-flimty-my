"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! This file is auto-generated */
!function () {
  var e = {
    4403: function _(e, t) {
      var n;
      /*!
      	Copyright (c) 2018 Jed Watson.
      	Licensed under the MIT License (MIT), see
      	http://jedwatson.github.io/classnames
      */

      !function () {
        "use strict";

        var r = {}.hasOwnProperty;

        function o() {
          for (var e = [], t = 0; t < arguments.length; t++) {
            var n = arguments[t];

            if (n) {
              var i = _typeof(n);

              if ("string" === i || "number" === i) e.push(n);else if (Array.isArray(n)) {
                if (n.length) {
                  var u = o.apply(null, n);
                  u && e.push(u);
                }
              } else if ("object" === i) {
                if (n.toString !== Object.prototype.toString && !n.toString.toString().includes("[native code]")) {
                  e.push(n.toString());
                  continue;
                }

                for (var a in n) {
                  r.call(n, a) && n[a] && e.push(a);
                }
              }
            }
          }

          return e.join(" ");
        }

        e.exports ? (o["default"] = o, e.exports = o) : void 0 === (n = function () {
          return o;
        }.apply(t, [])) || (e.exports = n);
      }();
    }
  },
      t = {};

  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = t[r] = {
      exports: {}
    };
    return e[r](i, i.exports, n), i.exports;
  }

  n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return n.d(t, {
      a: t
    }), t;
  }, n.d = function (e, t) {
    for (var r in t) {
      n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
        enumerable: !0,
        get: t[r]
      });
    }
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  };
  var r = {};
  !function () {
    "use strict";

    n.r(r), n.d(r, {
      BlockQuotation: function BlockQuotation() {
        return g;
      },
      Circle: function Circle() {
        return i;
      },
      Defs: function Defs() {
        return s;
      },
      G: function G() {
        return u;
      },
      HorizontalRule: function HorizontalRule() {
        return y;
      },
      Line: function Line() {
        return a;
      },
      LinearGradient: function LinearGradient() {
        return d;
      },
      Path: function Path() {
        return c;
      },
      Polygon: function Polygon() {
        return l;
      },
      RadialGradient: function RadialGradient() {
        return p;
      },
      Rect: function Rect() {
        return f;
      },
      SVG: function SVG() {
        return m;
      },
      Stop: function Stop() {
        return v;
      },
      View: function View() {
        return b;
      }
    });
    var e = n(4403),
        t = n.n(e),
        o = window.wp.element;

    var i = function i(e) {
      return (0, o.createElement)("circle", e);
    },
        u = function u(e) {
      return (0, o.createElement)("g", e);
    },
        a = function a(e) {
      return (0, o.createElement)("line", e);
    },
        c = function c(e) {
      return (0, o.createElement)("path", e);
    },
        l = function l(e) {
      return (0, o.createElement)("polygon", e);
    },
        f = function f(e) {
      return (0, o.createElement)("rect", e);
    },
        s = function s(e) {
      return (0, o.createElement)("defs", e);
    },
        p = function p(e) {
      return (0, o.createElement)("radialGradient", e);
    },
        d = function d(e) {
      return (0, o.createElement)("linearGradient", e);
    },
        v = function v(e) {
      return (0, o.createElement)("stop", e);
    },
        m = (0, o.forwardRef)(function (_ref, i) {
      var e = _ref.className,
          n = _ref.isPressed,
          r = _objectWithoutProperties(_ref, ["className", "isPressed"]);

      var u = _objectSpread({}, r, {
        className: t()(e, {
          "is-pressed": n
        }) || void 0,
        "aria-hidden": !0,
        focusable: !1
      });

      return (0, o.createElement)("svg", _objectSpread({}, u, {
        ref: i
      }));
    });

    m.displayName = "SVG";
    var y = "hr",
        g = "blockquote",
        b = "div";
  }(), (window.wp = window.wp || {}).primitives = r;
}();