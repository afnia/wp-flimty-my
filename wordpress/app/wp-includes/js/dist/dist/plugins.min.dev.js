"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    n: function n(_n) {
      var r = _n && _n.__esModule ? function () {
        return _n["default"];
      } : function () {
        return _n;
      };
      return e.d(r, {
        a: r
      }), r;
    },
    d: function d(n, r) {
      for (var t in r) {
        e.o(r, t) && !e.o(n, t) && Object.defineProperty(n, t, {
          enumerable: !0,
          get: r[t]
        });
      }
    },
    o: function o(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    },
    r: function r(e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }
  },
      n = {};
  e.r(n), e.d(n, {
    PluginArea: function PluginArea() {
      return x;
    },
    getPlugin: function getPlugin() {
      return w;
    },
    getPlugins: function getPlugins() {
      return h;
    },
    registerPlugin: function registerPlugin() {
      return m;
    },
    unregisterPlugin: function unregisterPlugin() {
      return v;
    },
    usePluginContext: function usePluginContext() {
      return a;
    },
    withPluginContext: function withPluginContext() {
      return c;
    }
  });
  var r = window.wp.element;
  var t = window.wp.hooks,
      o = window.wp.isShallowEqual,
      i = e.n(o),
      u = window.wp.compose;
  var l = (0, r.createContext)({
    name: null,
    icon: null
  }),
      s = l.Provider;

  function a() {
    return (0, r.useContext)(l);
  }

  var c = function c(e) {
    return (0, u.createHigherOrderComponent)(function (n) {
      return function (t) {
        return (0, r.createElement)(l.Consumer, null, function (o) {
          return (0, r.createElement)(n, _objectSpread({}, t, {}, e(o, t)));
        });
      };
    }, "withPluginContext");
  };

  var p =
  /*#__PURE__*/
  function (_r$Component) {
    _inherits(p, _r$Component);

    function p(e) {
      var _this;

      _classCallCheck(this, p);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(p).call(this, e)), _this.state = {
        hasError: !1
      };
      return _this;
    }

    _createClass(p, [{
      key: "componentDidCatch",
      value: function componentDidCatch(e) {
        var _this$props = this.props,
            n = _this$props.name,
            r = _this$props.onError;
        r && r(n, e);
      }
    }, {
      key: "render",
      value: function render() {
        return this.state.hasError ? null : this.props.children;
      }
    }], [{
      key: "getDerivedStateFromError",
      value: function getDerivedStateFromError() {
        return {
          hasError: !0
        };
      }
    }]);

    return p;
  }(r.Component);

  var g = window.wp.primitives;
  var d = (0, r.createElement)(g.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, r.createElement)(g.Path, {
    d: "M10.5 4v4h3V4H15v4h1.5a1 1 0 011 1v4l-3 4v2a1 1 0 01-1 1h-3a1 1 0 01-1-1v-2l-3-4V9a1 1 0 011-1H9V4h1.5zm.5 12.5v2h2v-2l3-4v-3H8v3l3 4z"
  }));
  var f = {};

  function m(e, n) {
    if ("object" != _typeof(n)) return console.error("No settings object provided!"), null;
    if ("string" != typeof e) return console.error("Plugin name must be string."), null;
    if (!/^[a-z][a-z0-9-]*$/.test(e)) return console.error('Plugin name must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".'), null;
    f[e] && console.error("Plugin \"".concat(e, "\" is already registered.")), n = (0, t.applyFilters)("plugins.registerPlugin", n, e);
    var _n2 = n,
        r = _n2.render,
        o = _n2.scope;
    if ("function" != typeof r) return console.error('The "render" property must be specified and must be a valid function.'), null;

    if (o) {
      if ("string" != typeof o) return console.error("Plugin scope must be string."), null;
      if (!/^[a-z][a-z0-9-]*$/.test(o)) return console.error('Plugin scope must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-page".'), null;
    }

    return f[e] = _objectSpread({
      name: e,
      icon: d
    }, n), (0, t.doAction)("plugins.pluginRegistered", n, e), n;
  }

  function v(e) {
    if (!f[e]) return void console.error('Plugin "' + e + '" is not registered.');
    var n = f[e];
    return delete f[e], (0, t.doAction)("plugins.pluginUnregistered", n, e), n;
  }

  function w(e) {
    return f[e];
  }

  function h(e) {
    return Object.values(f).filter(function (n) {
      return n.scope === e;
    });
  }

  var y = function (e, n) {
    var r,
        t,
        o = 0;

    function i() {
      var i,
          u,
          l = r,
          s = arguments.length;

      e: for (; l;) {
        if (l.args.length === arguments.length) {
          for (u = 0; u < s; u++) {
            if (l.args[u] !== arguments[u]) {
              l = l.next;
              continue e;
            }
          }

          return l !== r && (l === t && (t = l.prev), l.prev.next = l.next, l.next && (l.next.prev = l.prev), l.next = r, l.prev = null, r.prev = l, r = l), l.val;
        }

        l = l.next;
      }

      for (i = new Array(s), u = 0; u < s; u++) {
        i[u] = arguments[u];
      }

      return l = {
        args: i,
        val: e.apply(null, i)
      }, r ? (r.prev = l, l.next = r) : t = l, o === n.maxSize ? (t = t.prev).next = null : o++, r = l, l.val;
    }

    return n = n || {}, i.clear = function () {
      r = null, t = null, o = 0;
    }, i;
  }(function (e, n) {
    return {
      icon: e,
      name: n
    };
  });

  var x = function x(_ref) {
    var e = _ref.scope,
        n = _ref.onError;
    var o = (0, r.useMemo)(function () {
      var n = [];
      return {
        subscribe: function subscribe(e) {
          return (0, t.addAction)("plugins.pluginRegistered", "core/plugins/plugin-area/plugins-registered", e), (0, t.addAction)("plugins.pluginUnregistered", "core/plugins/plugin-area/plugins-unregistered", e), function () {
            (0, t.removeAction)("plugins.pluginRegistered", "core/plugins/plugin-area/plugins-registered"), (0, t.removeAction)("plugins.pluginUnregistered", "core/plugins/plugin-area/plugins-unregistered");
          };
        },
        getValue: function getValue() {
          var r = h(e);
          return i()(n, r) || (n = r), n;
        }
      };
    }, [e]),
        u = (0, r.useSyncExternalStore)(o.subscribe, o.getValue);
    return (0, r.createElement)("div", {
      style: {
        display: "none"
      }
    }, u.map(function (_ref2) {
      var e = _ref2.icon,
          t = _ref2.name,
          o = _ref2.render;
      return (0, r.createElement)(s, {
        key: t,
        value: y(e, t)
      }, (0, r.createElement)(p, {
        name: t,
        onError: n
      }, (0, r.createElement)(o, null)));
    }));
  };

  (window.wp = window.wp || {}).plugins = n;
}();