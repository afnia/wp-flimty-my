"use strict";

/*! This file is auto-generated */
!function () {
  "use strict";

  var n = {
    d: function d(t, e) {
      for (var o in e) {
        n.o(e, o) && !n.o(t, o) && Object.defineProperty(t, o, {
          enumerable: !0,
          get: e[o]
        });
      }
    },
    o: function o(n, t) {
      return Object.prototype.hasOwnProperty.call(n, t);
    }
  },
      t = {};
  n.d(t, {
    "default": function _default() {
      return e;
    }
  });
  new Set();

  function e(n) {}

  (window.wp = window.wp || {}).warning = t["default"];
}();