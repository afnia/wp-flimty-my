"use strict";

!function () {
  function e(e) {
    return void 0 === e ? 0 : Number(e);
  }

  function n(e, n) {
    return !(e === n || isNaN(e) && isNaN(n));
  }

  self.DOMRect = function (t, i, u, r) {
    var o,
        f,
        c,
        a,
        m = e(t),
        b = e(i),
        d = e(u),
        g = e(r);
    Object.defineProperties(this, {
      x: {
        get: function get() {
          return m;
        },
        set: function set(e) {
          n(m, e) && (m = e, o = f = void 0);
        },
        enumerable: !0
      },
      y: {
        get: function get() {
          return b;
        },
        set: function set(e) {
          n(b, e) && (b = e, c = a = void 0);
        },
        enumerable: !0
      },
      width: {
        get: function get() {
          return d;
        },
        set: function set(e) {
          n(d, e) && (d = e, o = f = void 0);
        },
        enumerable: !0
      },
      height: {
        get: function get() {
          return g;
        },
        set: function set(e) {
          n(g, e) && (g = e, c = a = void 0);
        },
        enumerable: !0
      },
      left: {
        get: function get() {
          return o = void 0 === o ? m + Math.min(0, d) : o;
        },
        enumerable: !0
      },
      right: {
        get: function get() {
          return f = void 0 === f ? m + Math.max(0, d) : f;
        },
        enumerable: !0
      },
      top: {
        get: function get() {
          return c = void 0 === c ? b + Math.min(0, g) : c;
        },
        enumerable: !0
      },
      bottom: {
        get: function get() {
          return a = void 0 === a ? b + Math.max(0, g) : a;
        },
        enumerable: !0
      }
    });
  };
}();