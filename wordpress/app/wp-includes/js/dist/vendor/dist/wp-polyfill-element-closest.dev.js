"use strict";

!function (e) {
  var t = e.Element.prototype;
  "function" != typeof t.matches && (t.matches = t.msMatchesSelector || t.mozMatchesSelector || t.webkitMatchesSelector || function (e) {
    for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = 0; t[o] && t[o] !== this;) {
      ++o;
    }

    return Boolean(t[o]);
  }), "function" != typeof t.closest && (t.closest = function (e) {
    for (var t = this; t && 1 === t.nodeType;) {
      if (t.matches(e)) return t;
      t = t.parentNode;
    }

    return null;
  });
}(window);