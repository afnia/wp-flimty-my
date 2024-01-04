"use strict";

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    d: function d(t, n) {
      for (var o in n) {
        e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, {
          enumerable: !0,
          get: n[o]
        });
      }
    },
    o: function o(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
  },
      t = {};

  function n(e) {
    "undefined" != typeof document && ("complete" !== document.readyState && "interactive" !== document.readyState ? document.addEventListener("DOMContentLoaded", e) : e());
  }

  e.d(t, {
    "default": function _default() {
      return n;
    }
  }), (window.wp = window.wp || {}).domReady = t["default"];
}();