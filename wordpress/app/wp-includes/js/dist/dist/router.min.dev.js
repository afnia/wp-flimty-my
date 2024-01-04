"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    privateApis: function privateApis() {
      return A;
    }
  });
  var n,
      r = window.wp.element;

  function o() {
    return o = Object.assign ? Object.assign.bind() : function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }, o.apply(this, arguments);
  }

  !function (e) {
    e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
  }(n || (n = {}));

  var a = function a(e) {
    return e;
  };

  var u = "beforeunload",
      i = "popstate";

  function c(e) {
    e.preventDefault(), e.returnValue = "";
  }

  function s() {
    var e = [];
    return {
      get length() {
        return e.length;
      },

      push: function push(t) {
        return e.push(t), function () {
          e = e.filter(function (e) {
            return e !== t;
          });
        };
      },
      call: function call(t) {
        e.forEach(function (e) {
          return e && e(t);
        });
      }
    };
  }

  function l() {
    return Math.random().toString(36).substr(2, 8);
  }

  function f(e) {
    var t = e.pathname,
        n = void 0 === t ? "/" : t,
        r = e.search,
        o = void 0 === r ? "" : r,
        a = e.hash,
        u = void 0 === a ? "" : a;
    return o && "?" !== o && (n += "?" === o.charAt(0) ? o : "?" + o), u && "#" !== u && (n += "#" === u.charAt(0) ? u : "#" + u), n;
  }

  function h(e) {
    var t = {};

    if (e) {
      var n = e.indexOf("#");
      n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
      var r = e.indexOf("?");
      r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e);
    }

    return t;
  }

  var p = window.wp.url;

  var d = function (e) {
    void 0 === e && (e = {});
    var t = e.window,
        r = void 0 === t ? document.defaultView : t,
        p = r.history;

    function d() {
      var e = r.location,
          t = e.pathname,
          n = e.search,
          o = e.hash,
          u = p.state || {};
      return [u.idx, a({
        pathname: t,
        search: n,
        hash: o,
        state: u.usr || null,
        key: u.key || "default"
      })];
    }

    var v = null;
    r.addEventListener(i, function () {
      if (v) P.call(v), v = null;else {
        var e = n.Pop,
            t = d(),
            r = t[0],
            o = t[1];

        if (P.length) {
          if (null != r) {
            var a = w - r;
            a && (v = {
              action: e,
              location: o,
              retry: function retry() {
                x(-1 * a);
              }
            }, x(a));
          }
        } else j(e);
      }
    });
    var y = n.Pop,
        g = d(),
        w = g[0],
        b = g[1],
        m = s(),
        P = s();

    function O(e) {
      return "string" == typeof e ? e : f(e);
    }

    function k(e, t) {
      return void 0 === t && (t = null), a(o({
        pathname: b.pathname,
        hash: "",
        search: ""
      }, "string" == typeof e ? h(e) : e, {
        state: t,
        key: l()
      }));
    }

    function A(e, t) {
      return [{
        usr: e.state,
        key: e.key,
        idx: t
      }, O(e)];
    }

    function S(e, t, n) {
      return !P.length || (P.call({
        action: e,
        location: t,
        retry: n
      }), !1);
    }

    function j(e) {
      y = e;
      var t = d();
      w = t[0], b = t[1], m.call({
        action: y,
        location: b
      });
    }

    function x(e) {
      p.go(e);
    }

    null == w && (w = 0, p.replaceState(o({}, p.state, {
      idx: w
    }), ""));
    var E = {
      get action() {
        return y;
      },

      get location() {
        return b;
      },

      createHref: O,
      push: function e(t, o) {
        var a = n.Push,
            u = k(t, o);

        if (S(a, u, function () {
          e(t, o);
        })) {
          var i = A(u, w + 1),
              c = i[0],
              s = i[1];

          try {
            p.pushState(c, "", s);
          } catch (e) {
            r.location.assign(s);
          }

          j(a);
        }
      },
      replace: function e(t, r) {
        var o = n.Replace,
            a = k(t, r);

        if (S(o, a, function () {
          e(t, r);
        })) {
          var u = A(a, w),
              i = u[0],
              c = u[1];
          p.replaceState(i, "", c), j(o);
        }
      },
      go: x,
      back: function back() {
        x(-1);
      },
      forward: function forward() {
        x(1);
      },
      listen: function listen(e) {
        return m.push(e);
      },
      block: function block(e) {
        var t = P.push(e);
        return 1 === P.length && r.addEventListener(u, c), function () {
          t(), P.length || r.removeEventListener(u, c);
        };
      }
    };
    return E;
  }(),
      v = d.push,
      y = d.replace;

  d.push = function (e, t) {
    var n = (0, p.getQueryArgs)(window.location.href),
        r = (0, p.removeQueryArgs).apply(void 0, [window.location.href].concat(_toConsumableArray(Object.keys(n)))),
        o = (0, p.addQueryArgs)(r, e);
    return v.call(d, o, t);
  }, d.replace = function (e, t) {
    var n = (0, p.getQueryArgs)(window.location.href),
        r = (0, p.removeQueryArgs).apply(void 0, [window.location.href].concat(_toConsumableArray(Object.keys(n)))),
        o = (0, p.addQueryArgs)(r, e);
    return y.call(d, o, t);
  };
  var g = d;
  var w = (0, r.createContext)(),
      b = (0, r.createContext)();

  function m(e) {
    var t = new URLSearchParams(e.search);
    return _objectSpread({}, e, {
      params: Object.fromEntries(t.entries())
    });
  }

  var P = window.wp.privateApis;

  var _ref = (0, P.__dangerousOptInToUnstableAPIsOnlyForCoreModules)("I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.", "@wordpress/router"),
      O = _ref.lock,
      k = _ref.unlock,
      A = {};

  O(A, {
    useHistory: function useHistory() {
      return (0, r.useContext)(b);
    },
    useLocation: function useLocation() {
      return (0, r.useContext)(w);
    },
    RouterProvider: function RouterProvider(_ref2) {
      var e = _ref2.children;

      var _ref3 = (0, r.useState)(function () {
        return m(g.location);
      }),
          _ref4 = _slicedToArray(_ref3, 2),
          t = _ref4[0],
          n = _ref4[1];

      return (0, r.useEffect)(function () {
        return g.listen(function (_ref5) {
          var e = _ref5.location;
          n(m(e));
        });
      }, []), (0, r.createElement)(b.Provider, {
        value: g
      }, (0, r.createElement)(w.Provider, {
        value: t
      }, e));
    }
  }), (window.wp = window.wp || {}).router = t;
}();