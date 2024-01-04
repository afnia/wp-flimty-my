"use strict";

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    d: function d(n, t) {
      for (var o in t) {
        e.o(t, o) && !e.o(n, o) && Object.defineProperty(n, o, {
          enumerable: !0,
          get: t[o]
        });
      }
    },
    o: function o(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }
  },
      n = {};
  e.d(n, {
    "default": function _default() {
      return i;
    }
  });
  var t = window.wp.hooks;
  var o = Object.create(null);

  function i(e) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var i = n.since,
        r = n.version,
        c = n.alternative,
        a = n.plugin,
        d = n.link,
        s = n.hint,
        l = "".concat(e, " is deprecated").concat(i ? " since version ".concat(i) : "").concat(r ? " and will be removed".concat(a ? " from ".concat(a) : "", " in version ").concat(r) : "", ".").concat(c ? " Please use ".concat(c, " instead.") : "").concat(d ? " See: ".concat(d) : "").concat(s ? " Note: ".concat(s) : "");
    l in o || ((0, t.doAction)("deprecated", e, n, l), console.warn(l), o[l] = !0);
  }

  (window.wp = window.wp || {}).deprecated = n["default"];
}();