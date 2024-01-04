"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    d: function d(t, n) {
      for (var r in n) {
        e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
          enumerable: !0,
          get: n[r]
        });
      }
    },
    o: function o(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    },
    r: function r(e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }
  },
      t = {};
  e.r(t), e.d(t, {
    ShortcutProvider: function ShortcutProvider() {
      return K;
    },
    __unstableUseShortcutEventMatch: function __unstableUseShortcutEventMatch() {
      return T;
    },
    store: function store() {
      return E;
    },
    useShortcut: function useShortcut() {
      return O;
    }
  });
  var n = {};
  e.r(n), e.d(n, {
    registerShortcut: function registerShortcut() {
      return i;
    },
    unregisterShortcut: function unregisterShortcut() {
      return u;
    }
  });
  var r = {};
  e.r(r), e.d(r, {
    getAllShortcutKeyCombinations: function getAllShortcutKeyCombinations() {
      return m;
    },
    getAllShortcutRawKeyCombinations: function getAllShortcutRawKeyCombinations() {
      return b;
    },
    getCategoryShortcuts: function getCategoryShortcuts() {
      return C;
    },
    getShortcutAliases: function getShortcutAliases() {
      return w;
    },
    getShortcutDescription: function getShortcutDescription() {
      return g;
    },
    getShortcutKeyCombination: function getShortcutKeyCombination() {
      return v;
    },
    getShortcutRepresentation: function getShortcutRepresentation() {
      return S;
    }
  });
  var o = window.wp.data;

  var a = function a() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var t = arguments.length > 1 ? arguments[1] : undefined;

    switch (t.type) {
      case "REGISTER_SHORTCUT":
        return _objectSpread({}, e, _defineProperty({}, t.name, {
          category: t.category,
          keyCombination: t.keyCombination,
          aliases: t.aliases,
          description: t.description
        }));

      case "UNREGISTER_SHORTCUT":
        var _t$name = t.name,
            _n = e[_t$name],
            _r = _objectWithoutProperties(e, [_t$name].map(_toPropertyKey));

        return _r;
    }

    return e;
  };

  function i(_ref) {
    var e = _ref.name,
        t = _ref.category,
        n = _ref.description,
        r = _ref.keyCombination,
        o = _ref.aliases;
    return {
      type: "REGISTER_SHORTCUT",
      name: e,
      category: t,
      keyCombination: r,
      aliases: o,
      description: n
    };
  }

  function u(e) {
    return {
      type: "UNREGISTER_SHORTCUT",
      name: e
    };
  }

  var c = {};

  function s(e) {
    return [e];
  }

  function l(e, t, n) {
    var r;
    if (e.length !== t.length) return !1;

    for (r = n; r < e.length; r++) {
      if (e[r] !== t[r]) return !1;
    }

    return !0;
  }

  function d(e, t) {
    var n,
        r = t || s;

    function o() {
      n = new WeakMap();
    }

    function a() {
      var t,
          o,
          a,
          i,
          u,
          s = arguments.length;

      for (i = new Array(s), a = 0; a < s; a++) {
        i[a] = arguments[a];
      }

      for (t = function (e) {
        var t,
            r,
            o,
            a,
            i,
            u = n,
            s = !0;

        for (t = 0; t < e.length; t++) {
          if (!(i = r = e[t]) || "object" != _typeof(i)) {
            s = !1;
            break;
          }

          u.has(r) ? u = u.get(r) : (o = new WeakMap(), u.set(r, o), u = o);
        }

        return u.has(c) || ((a = function () {
          var e = {
            clear: function clear() {
              e.head = null;
            }
          };
          return e;
        }()).isUniqueByDependants = s, u.set(c, a)), u.get(c);
      }(u = r.apply(null, i)), t.isUniqueByDependants || (t.lastDependants && !l(u, t.lastDependants, 0) && t.clear(), t.lastDependants = u), o = t.head; o;) {
        if (l(o.args, i, 1)) return o !== t.head && (o.prev.next = o.next, o.next && (o.next.prev = o.prev), o.next = t.head, o.prev = null, t.head.prev = o, t.head = o), o.val;
        o = o.next;
      }

      return o = {
        val: e.apply(null, i)
      }, i[0] = null, o.args = i, t.head && (t.head.prev = o, o.next = t.head), t.head = o, o.val;
    }

    return a.getDependants = r, a.clear = o, o(), a;
  }

  var f = window.wp.keycodes;
  var p = [],
      y = {
    display: f.displayShortcut,
    raw: f.rawShortcut,
    ariaLabel: f.shortcutAriaLabel
  };

  function h(e, t) {
    return e ? e.modifier ? y[t][e.modifier](e.character) : e.character : null;
  }

  function v(e, t) {
    return e[t] ? e[t].keyCombination : null;
  }

  function S(e, t) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "display";
    return h(v(e, t), n);
  }

  function g(e, t) {
    return e[t] ? e[t].description : null;
  }

  function w(e, t) {
    return e[t] && e[t].aliases ? e[t].aliases : p;
  }

  var m = d(function (e, t) {
    return [v(e, t)].concat(_toConsumableArray(w(e, t))).filter(Boolean);
  }, function (e, t) {
    return [e[t]];
  }),
      b = d(function (e, t) {
    return m(e, t).map(function (e) {
      return h(e, "raw");
    });
  }, function (e, t) {
    return [e[t]];
  }),
      C = d(function (e, t) {
    return Object.entries(e).filter(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          e = _ref3[1];

      return e.category === t;
    }).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
          e = _ref5[0];

      return e;
    });
  }, function (e) {
    return [e];
  }),
      E = (0, o.createReduxStore)("core/keyboard-shortcuts", {
    reducer: a,
    actions: n,
    selectors: r
  });
  (0, o.register)(E);
  var R = window.wp.element;

  function T() {
    var _ref6 = (0, o.useSelect)(E),
        e = _ref6.getAllShortcutKeyCombinations;

    return function (t, n) {
      return e(t).some(function (_ref7) {
        var e = _ref7.modifier,
            t = _ref7.character;
        return f.isKeyboardEvent[e](n, t);
      });
    };
  }

  var k = new Set(),
      D = function D(e) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = k[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _t = _step.value;

        _t(e);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
      x = (0, R.createContext)({
    add: function add(e) {
      0 === k.size && document.addEventListener("keydown", D), k.add(e);
    },
    "delete": function _delete(e) {
      k["delete"](e), 0 === k.size && document.removeEventListener("keydown", D);
    }
  });

  function O(e, t) {
    var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref8$isDisabled = _ref8.isDisabled,
        n = _ref8$isDisabled === void 0 ? !1 : _ref8$isDisabled;

    var r = (0, R.useContext)(x),
        o = T(),
        a = (0, R.useRef)();
    (0, R.useEffect)(function () {
      a.current = t;
    }, [t]), (0, R.useEffect)(function () {
      if (!n) return r.add(t), function () {
        r["delete"](t);
      };

      function t(t) {
        o(e, t) && a.current(t);
      }
    }, [e, n, r]);
  }

  var U = x.Provider;

  function K(e) {
    var _ref9 = (0, R.useState)(function () {
      return new Set();
    }),
        _ref10 = _slicedToArray(_ref9, 1),
        t = _ref10[0];

    return (0, R.createElement)(U, {
      value: t
    }, (0, R.createElement)("div", _objectSpread({}, e, {
      onKeyDown: function onKeyDown(n) {
        e.onKeyDown && e.onKeyDown(n);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = t[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _e2 = _step2.value;

            _e2(n);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    })));
  }

  (window.wp = window.wp || {}).keyboardShortcuts = t;
}();