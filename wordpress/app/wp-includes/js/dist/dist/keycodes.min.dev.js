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

/*! This file is auto-generated */
!function () {
  "use strict";

  var t = {
    d: function d(n, r) {
      for (var e in r) {
        t.o(r, e) && !t.o(n, e) && Object.defineProperty(n, e, {
          enumerable: !0,
          get: r[e]
        });
      }
    },
    o: function o(t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    },
    r: function r(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }
  },
      n = {};
  t.r(n), t.d(n, {
    ALT: function ALT() {
      return P;
    },
    BACKSPACE: function BACKSPACE() {
      return s;
    },
    COMMAND: function COMMAND() {
      return L;
    },
    CTRL: function CTRL() {
      return j;
    },
    DELETE: function DELETE() {
      return S;
    },
    DOWN: function DOWN() {
      return O;
    },
    END: function END() {
      return g;
    },
    ENTER: function ENTER() {
      return p;
    },
    ESCAPE: function ESCAPE() {
      return h;
    },
    F10: function F10() {
      return b;
    },
    HOME: function HOME() {
      return v;
    },
    LEFT: function LEFT() {
      return w;
    },
    PAGEDOWN: function PAGEDOWN() {
      return A;
    },
    PAGEUP: function PAGEUP() {
      return m;
    },
    RIGHT: function RIGHT() {
      return E;
    },
    SHIFT: function SHIFT() {
      return T;
    },
    SPACE: function SPACE() {
      return y;
    },
    TAB: function TAB() {
      return d;
    },
    UP: function UP() {
      return C;
    },
    ZERO: function ZERO() {
      return _;
    },
    displayShortcut: function displayShortcut() {
      return x;
    },
    displayShortcutList: function displayShortcutList() {
      return Z;
    },
    isAppleOS: function isAppleOS() {
      return l;
    },
    isKeyboardEvent: function isKeyboardEvent() {
      return K;
    },
    modifiers: function modifiers() {
      return k;
    },
    rawShortcut: function rawShortcut() {
      return M;
    },
    shortcutAriaLabel: function shortcutAriaLabel() {
      return D;
    }
  });

  var _r = function r() {
    return _r = Object.assign || function (t) {
      for (var n, r = 1, e = arguments.length; r < e; r++) {
        for (var o in n = arguments[r]) {
          Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
      }

      return t;
    }, _r.apply(this, arguments);
  };

  Object.create;
  Object.create;
  "function" == typeof SuppressedError && SuppressedError;

  function e(t) {
    return t.toLowerCase();
  }

  var o = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g],
      i = /[^A-Z0-9]+/gi;

  function u(t, n, r) {
    return n instanceof RegExp ? t.replace(n, r) : n.reduce(function (t, n) {
      return t.replace(n, r);
    }, t);
  }

  function c(t) {
    return function (t) {
      return t.charAt(0).toUpperCase() + t.substr(1);
    }(t.toLowerCase());
  }

  function f(t, n) {
    return void 0 === n && (n = {}), function (t, n) {
      void 0 === n && (n = {});

      for (var r = n.splitRegexp, c = void 0 === r ? o : r, f = n.stripRegexp, a = void 0 === f ? i : f, l = n.transform, s = void 0 === l ? e : l, d = n.delimiter, p = void 0 === d ? " " : d, h = u(u(t, c, "$1\0$2"), a, "\0"), y = 0, m = h.length; "\0" === h.charAt(y);) {
        y++;
      }

      for (; "\0" === h.charAt(m - 1);) {
        m--;
      }

      return h.slice(y, m).split("\0").map(s).join(p);
    }(t, _r({
      delimiter: " ",
      transform: c
    }, n));
  }

  var a = window.wp.i18n;

  function l() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!t) {
      if ("undefined" == typeof window) return !1;
      t = window;
    }

    var n = t.navigator.platform;
    return -1 !== n.indexOf("Mac") || ["iPad", "iPhone"].includes(n);
  }

  var s = 8,
      d = 9,
      p = 13,
      h = 27,
      y = 32,
      m = 33,
      A = 34,
      g = 35,
      v = 36,
      w = 37,
      C = 38,
      E = 39,
      O = 40,
      S = 46,
      b = 121,
      P = "alt",
      j = "ctrl",
      L = "meta",
      T = "shift",
      _ = 48;

  function R(t, n) {
    return Object.fromEntries(Object.entries(t).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          t = _ref2[0],
          r = _ref2[1];

      return [t, n(r)];
    }));
  }

  var k = {
    primary: function primary(t) {
      return t() ? [L] : [j];
    },
    primaryShift: function primaryShift(t) {
      return t() ? [T, L] : [j, T];
    },
    primaryAlt: function primaryAlt(t) {
      return t() ? [P, L] : [j, P];
    },
    secondary: function secondary(t) {
      return t() ? [T, P, L] : [j, T, P];
    },
    access: function access(t) {
      return t() ? [j, P] : [T, P];
    },
    ctrl: function ctrl() {
      return [j];
    },
    alt: function alt() {
      return [P];
    },
    ctrlShift: function ctrlShift() {
      return [j, T];
    },
    shift: function shift() {
      return [T];
    },
    shiftAlt: function shiftAlt() {
      return [T, P];
    },
    undefined: function undefined() {
      return [];
    }
  },
      M = R(k, function (t) {
    return function (n) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : l;
      return [].concat(_toConsumableArray(t(r)), [n.toLowerCase()]).join("+");
    };
  }),
      Z = R(k, function (t) {
    return function (n) {
      var _o;

      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : l;
      var e = r(),
          o = (_o = {}, _defineProperty(_o, P, e ? "⌥" : "Alt"), _defineProperty(_o, j, e ? "⌃" : "Ctrl"), _defineProperty(_o, L, "⌘"), _defineProperty(_o, T, e ? "⇧" : "Shift"), _o);
      return [].concat(_toConsumableArray(t(r).reduce(function (t, n) {
        var r;
        var i = null !== (r = o[n]) && void 0 !== r ? r : n;
        return e ? [].concat(_toConsumableArray(t), [i]) : [].concat(_toConsumableArray(t), [i, "+"]);
      }, [])), [f(n, {
        stripRegexp: /[^A-Z0-9~`,\.\\\-]/gi
      })]);
    };
  }),
      x = R(Z, function (t) {
    return function (n) {
      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : l;
      return t(n, r).join("");
    };
  }),
      D = R(k, function (t) {
    return function (n) {
      var _o2;

      var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : l;
      var e = r(),
          o = (_o2 = {}, _defineProperty(_o2, T, "Shift"), _defineProperty(_o2, L, e ? "Command" : "Control"), _defineProperty(_o2, j, "Control"), _defineProperty(_o2, P, e ? "Option" : "Alt"), _defineProperty(_o2, ",", (0, a.__)("Comma")), _defineProperty(_o2, ".", (0, a.__)("Period")), _defineProperty(_o2, "`", (0, a.__)("Backtick")), _defineProperty(_o2, "~", (0, a.__)("Tilde")), _o2);
      return [].concat(_toConsumableArray(t(r)), [n]).map(function (t) {
        var n;
        return f(null !== (n = o[t]) && void 0 !== n ? n : t);
      }).join(e ? " " : " + ");
    };
  });
  var K = R(k, function (t) {
    return function (n, r) {
      var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : l;

      var o = t(e),
          i = function (t) {
        return [P, j, L, T].filter(function (n) {
          return t["".concat(n, "Key")];
        });
      }(n),
          u = {
        Comma: ",",
        Backslash: "\\",
        IntlRo: "\\",
        IntlYen: "\\"
      },
          c = o.filter(function (t) {
        return !i.includes(t);
      }),
          f = i.filter(function (t) {
        return !o.includes(t);
      });

      if (c.length > 0 || f.length > 0) return !1;
      var a = n.key.toLowerCase();
      return r ? (n.altKey && 1 === r.length && (a = String.fromCharCode(n.keyCode).toLowerCase()), n.shiftKey && 1 === r.length && u[n.code] && (a = u[n.code]), "del" === r && (r = "delete"), a === r.toLowerCase()) : o.includes(a);
    };
  });
  (window.wp = window.wp || {}).keycodes = n;
}();