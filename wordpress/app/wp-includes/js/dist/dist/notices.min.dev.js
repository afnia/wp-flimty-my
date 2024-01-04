"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    store: function store() {
      return b;
    }
  });
  var n = {};
  e.r(n), e.d(n, {
    createErrorNotice: function createErrorNotice() {
      return E;
    },
    createInfoNotice: function createInfoNotice() {
      return d;
    },
    createNotice: function createNotice() {
      return f;
    },
    createSuccessNotice: function createSuccessNotice() {
      return l;
    },
    createWarningNotice: function createWarningNotice() {
      return p;
    },
    removeAllNotices: function removeAllNotices() {
      return O;
    },
    removeNotice: function removeNotice() {
      return y;
    },
    removeNotices: function removeNotices() {
      return N;
    }
  });
  var r = {};
  e.r(r), e.d(r, {
    getNotices: function getNotices() {
      return _;
    }
  });
  var i = window.wp.data;

  var o = function o(e) {
    return function (t) {
      return function () {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var r = arguments.length > 1 ? arguments[1] : undefined;
        var i = r[e];
        if (void 0 === i) return n;
        var o = t(n[i], r);
        return o === n[i] ? n : _objectSpread({}, n, _defineProperty({}, i, o));
      };
    };
  };

  var c = o("context")(function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var t = arguments.length > 1 ? arguments[1] : undefined;

    switch (t.type) {
      case "CREATE_NOTICE":
        return [].concat(_toConsumableArray(e.filter(function (_ref) {
          var e = _ref.id;
          return e !== t.notice.id;
        })), [t.notice]);

      case "REMOVE_NOTICE":
        return e.filter(function (_ref2) {
          var e = _ref2.id;
          return e !== t.id;
        });

      case "REMOVE_NOTICES":
        return e.filter(function (_ref3) {
          var e = _ref3.id;
          return !t.ids.includes(e);
        });

      case "REMOVE_ALL_NOTICES":
        return e.filter(function (_ref4) {
          var e = _ref4.type;
          return e !== t.noticeType;
        });
    }

    return e;
  });
  var u = "global",
      s = "info";
  var a = 0;

  function f() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : s;
    var t = arguments.length > 1 ? arguments[1] : undefined;
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _n$speak = n.speak,
        r = _n$speak === void 0 ? !0 : _n$speak,
        _n$isDismissible = n.isDismissible,
        i = _n$isDismissible === void 0 ? !0 : _n$isDismissible,
        _n$context = n.context,
        o = _n$context === void 0 ? u : _n$context,
        _n$id = n.id,
        c = _n$id === void 0 ? "".concat(o).concat(++a) : _n$id,
        _n$actions = n.actions,
        f = _n$actions === void 0 ? [] : _n$actions,
        _n$type = n.type,
        l = _n$type === void 0 ? "default" : _n$type,
        d = n.__unstableHTML,
        _n$icon = n.icon,
        E = _n$icon === void 0 ? null : _n$icon,
        _n$explicitDismiss = n.explicitDismiss,
        p = _n$explicitDismiss === void 0 ? !1 : _n$explicitDismiss,
        y = n.onDismiss;
    return {
      type: "CREATE_NOTICE",
      context: o,
      notice: {
        id: c,
        status: e,
        content: t = String(t),
        spokenMessage: r ? t : null,
        __unstableHTML: d,
        isDismissible: i,
        actions: f,
        type: l,
        icon: E,
        explicitDismiss: p,
        onDismiss: y
      }
    };
  }

  function l(e, t) {
    return f("success", e, t);
  }

  function d(e, t) {
    return f("info", e, t);
  }

  function E(e, t) {
    return f("error", e, t);
  }

  function p(e, t) {
    return f("warning", e, t);
  }

  function y(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : u;
    return {
      type: "REMOVE_NOTICE",
      id: e,
      context: t
    };
  }

  function O() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : u;
    return {
      type: "REMOVE_ALL_NOTICES",
      noticeType: e,
      context: t
    };
  }

  function N(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : u;
    return {
      type: "REMOVE_NOTICES",
      ids: e,
      context: t
    };
  }

  var T = [];

  function _(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : u;
    return e[t] || T;
  }

  var b = (0, i.createReduxStore)("core/notices", {
    reducer: c,
    actions: n,
    selectors: r
  });
  (0, i.register)(b), (window.wp = window.wp || {}).notices = t;
}();