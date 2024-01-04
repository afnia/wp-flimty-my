"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    d: function d(t, r) {
      for (var n in r) {
        e.o(r, n) && !e.o(t, n) && Object.defineProperty(t, n, {
          enumerable: !0,
          get: r[n]
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
    ifViewportMatches: function ifViewportMatches() {
      return f;
    },
    store: function store() {
      return s;
    },
    withViewportMatch: function withViewportMatch() {
      return w;
    }
  });
  var r = {};
  e.r(r), e.d(r, {
    setIsMatching: function setIsMatching() {
      return a;
    }
  });
  var n = {};
  e.r(n), e.d(n, {
    isViewportMatch: function isViewportMatch() {
      return u;
    }
  });
  var o = window.wp.compose,
      i = window.wp.data;

  var c = function c() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var t = arguments.length > 1 ? arguments[1] : undefined;
    return "SET_IS_MATCHING" === t.type ? t.values : e;
  };

  function a(e) {
    return {
      type: "SET_IS_MATCHING",
      values: e
    };
  }

  function u(e, t) {
    return -1 === t.indexOf(" ") && (t = ">= " + t), !!e[t];
  }

  var s = (0, i.createReduxStore)("core/viewport", {
    reducer: c,
    actions: r,
    selectors: n
  });
  (0, i.register)(s);

  var d = function d(e, t) {
    var r = (0, o.debounce)(function () {
      var e = Object.fromEntries(c.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            e = _ref2[0],
            t = _ref2[1];

        return [e, t.matches];
      }));
      (0, i.dispatch)(s).setIsMatching(e);
    }, 0, {
      leading: !0
    }),
        n = Object.entries(t),
        c = Object.entries(e).flatMap(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          e = _ref4[0],
          t = _ref4[1];

      return n.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            n = _ref6[0],
            o = _ref6[1];

        var i = window.matchMedia("(".concat(o, ": ").concat(t, "px)"));
        return i.addEventListener("change", r), ["".concat(n, " ").concat(e), i];
      });
    });
    window.addEventListener("orientationchange", r), r(), r.flush();
  },
      p = window.wp.element;

  var w = function w(e) {
    var t = Object.entries(e);
    return (0, o.createHigherOrderComponent)(function (e) {
      return (0, o.pure)(function (r) {
        var n = Object.fromEntries(t.map(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              e = _ref8[0],
              t = _ref8[1];

          var _t$split = t.split(" "),
              _t$split2 = _slicedToArray(_t$split, 2),
              r = _t$split2[0],
              n = _t$split2[1];

          return void 0 === n && (n = r, r = ">="), [e, (0, o.useViewportMatch)(n, r)];
        }));
        return (0, p.createElement)(e, _objectSpread({}, r, {}, n));
      });
    }, "withViewportMatch");
  };

  var f = function f(e) {
    return (0, o.createHigherOrderComponent)((0, o.compose)([w({
      isViewportMatch: e
    }), (0, o.ifCondition)(function (e) {
      return e.isViewportMatch;
    })]), "ifViewportMatches");
  };

  d({
    huge: 1440,
    wide: 1280,
    large: 960,
    medium: 782,
    small: 600,
    mobile: 480
  }, {
    "<": "max-width",
    ">=": "min-width"
  }), (window.wp = window.wp || {}).viewport = t;
}();