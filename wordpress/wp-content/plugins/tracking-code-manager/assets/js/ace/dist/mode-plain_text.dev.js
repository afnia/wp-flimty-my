"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/mode/plain_text", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/text_highlight_rules", "ace/mode/behaviour"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./text_highlight_rules").TextHighlightRules,
      o = e("./behaviour").Behaviour,
      u = function u() {
    this.HighlightRules = s, this.$behaviour = new o();
  };

  r.inherits(u, i), function () {
    this.type = "text", this.getNextLineIndent = function (e, t, n) {
      return "";
    }, this.$id = "ace/mode/plain_text";
  }.call(u.prototype), t.Mode = u;
});

(function () {
  ace.require(["ace/mode/plain_text"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();