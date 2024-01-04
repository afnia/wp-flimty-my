"use strict";

/*! This file is auto-generated */
!function () {
  "use strict";

  var t = {
    n: function n(_n) {
      var e = _n && _n.__esModule ? function () {
        return _n["default"];
      } : function () {
        return _n;
      };
      return t.d(e, {
        a: e
      }), e;
    },
    d: function d(n, e) {
      for (var r in e) {
        t.o(e, r) && !t.o(n, r) && Object.defineProperty(n, r, {
          enumerable: !0,
          get: e[r]
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
    __unstableAwaitPromise: function __unstableAwaitPromise() {
      return d;
    },
    apiFetch: function apiFetch() {
      return u;
    },
    controls: function controls() {
      return p;
    },
    dispatch: function dispatch() {
      return l;
    },
    select: function select() {
      return s;
    },
    syncSelect: function syncSelect() {
      return a;
    }
  });
  var e = window.wp.apiFetch,
      r = t.n(e),
      o = window.wp.data,
      i = window.wp.deprecated,
      c = t.n(i);

  function u(t) {
    return {
      type: "API_FETCH",
      request: t
    };
  }

  function s(t, n) {
    var _o$controls;

    for (var _len = arguments.length, e = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      e[_key - 2] = arguments[_key];
    }

    return c()("`select` control in `@wordpress/data-controls`", {
      since: "5.7",
      alternative: "built-in `resolveSelect` control in `@wordpress/data`"
    }), (_o$controls = o.controls).resolveSelect.apply(_o$controls, [t, n].concat(e));
  }

  function a(t, n) {
    var _o$controls2;

    for (var _len2 = arguments.length, e = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      e[_key2 - 2] = arguments[_key2];
    }

    return c()("`syncSelect` control in `@wordpress/data-controls`", {
      since: "5.7",
      alternative: "built-in `select` control in `@wordpress/data`"
    }), (_o$controls2 = o.controls).select.apply(_o$controls2, [t, n].concat(e));
  }

  function l(t, n) {
    var _o$controls3;

    for (var _len3 = arguments.length, e = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      e[_key3 - 2] = arguments[_key3];
    }

    return c()("`dispatch` control in `@wordpress/data-controls`", {
      since: "5.7",
      alternative: "built-in `dispatch` control in `@wordpress/data`"
    }), (_o$controls3 = o.controls).dispatch.apply(_o$controls3, [t, n].concat(e));
  }

  var d = function d(t) {
    return {
      type: "AWAIT_PROMISE",
      promise: t
    };
  },
      p = {
    AWAIT_PROMISE: function AWAIT_PROMISE(_ref) {
      var t = _ref.promise;
      return t;
    },
    API_FETCH: function API_FETCH(_ref2) {
      var t = _ref2.request;
      return r()(t);
    }
  };

  (window.wp = window.wp || {}).dataControls = n;
}();