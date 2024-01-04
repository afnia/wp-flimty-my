"use strict";

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    d: function d(n, t) {
      for (var r in t) {
        e.o(t, r) && !e.o(n, r) && Object.defineProperty(n, r, {
          enumerable: !0,
          get: t[r]
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
    escapeAmpersand: function escapeAmpersand() {
      return r;
    },
    escapeAttribute: function escapeAttribute() {
      return c;
    },
    escapeEditableHTML: function escapeEditableHTML() {
      return a;
    },
    escapeHTML: function escapeHTML() {
      return i;
    },
    escapeLessThan: function escapeLessThan() {
      return o;
    },
    escapeQuotationMark: function escapeQuotationMark() {
      return u;
    },
    isValidAttributeName: function isValidAttributeName() {
      return f;
    }
  });
  var t = /[\u007F-\u009F "'>/="\uFDD0-\uFDEF]/;

  function r(e) {
    return e.replace(/&(?!([a-z0-9]+|#[0-9]+|#x[a-f0-9]+);)/gi, "&amp;");
  }

  function u(e) {
    return e.replace(/"/g, "&quot;");
  }

  function o(e) {
    return e.replace(/</g, "&lt;");
  }

  function c(e) {
    return function (e) {
      return e.replace(/>/g, "&gt;");
    }(u(r(e)));
  }

  function i(e) {
    return o(r(e));
  }

  function a(e) {
    return o(e.replace(/&/g, "&amp;"));
  }

  function f(e) {
    return !t.test(e);
  }

  (window.wp = window.wp || {}).escapeHtml = n;
}();