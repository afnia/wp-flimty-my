"use strict";

!function () {
  var t = {
    624: function _() {
      jQuery(function (t) {
        t(".wpcode-admin-tabs-navigation").on("click", ".wpcode-admin-tabs button", function (e) {
          e.preventDefault();
          var n = t(this).data("target");
          t(this).addClass("active").parent().siblings().find("button").removeClass("active"), t(document.getElementById(n)).addClass("active").siblings().removeClass("active"), t(document).trigger("wpcode-tab-change", n), window.wpcode_editor && jQuery.each(window.wpcode_editor, function (t, e) {
            e.codemirror.refresh();
          });
        });
      });
    }
  },
      e = {};

  function n(o) {
    var r = e[o];
    if (void 0 !== r) return r.exports;
    var i = e[o] = {
      exports: {}
    };
    return t[o](i, i.exports, n), i.exports;
  }

  n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t["default"];
    } : function () {
      return t;
    };
    return n.d(e, {
      a: e
    }), e;
  }, n.d = function (t, e) {
    for (var o in e) {
      n.o(e, o) && !n.o(t, o) && Object.defineProperty(t, o, {
        enumerable: !0,
        get: e[o]
      });
    }
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, function () {
    "use strict";

    n(624);
  }();
}();