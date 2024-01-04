"use strict";

/*! This file is auto-generated */
!function () {
  "use strict";

  var r = {
    d: function d(t, e) {
      for (var n in e) {
        r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
          enumerable: !0,
          get: e[n]
        });
      }
    },
    o: function o(r, t) {
      return Object.prototype.hasOwnProperty.call(r, t);
    },
    r: function r(_r) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(_r, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(_r, "__esModule", {
        value: !0
      });
    }
  },
      t = {};

  function e(r, t) {
    if (r === t) return !0;
    var e = Object.keys(r),
        n = Object.keys(t);
    if (e.length !== n.length) return !1;
    var o = 0;

    for (; o < e.length;) {
      var _n = e[o],
          u = r[_n];
      if (void 0 === u && !t.hasOwnProperty(_n) || u !== t[_n]) return !1;
      o++;
    }

    return !0;
  }

  function n(r, t) {
    if (r === t) return !0;
    if (r.length !== t.length) return !1;

    for (var _e = 0, _n2 = r.length; _e < _n2; _e++) {
      if (r[_e] !== t[_e]) return !1;
    }

    return !0;
  }

  function o(r, t) {
    if (r && t) {
      if (r.constructor === Object && t.constructor === Object) return e(r, t);
      if (Array.isArray(r) && Array.isArray(t)) return n(r, t);
    }

    return r === t;
  }

  r.r(t), r.d(t, {
    "default": function _default() {
      return o;
    },
    isShallowEqualArrays: function isShallowEqualArrays() {
      return n;
    },
    isShallowEqualObjects: function isShallowEqualObjects() {
      return e;
    }
  }), (window.wp = window.wp || {}).isShallowEqual = t;
}();