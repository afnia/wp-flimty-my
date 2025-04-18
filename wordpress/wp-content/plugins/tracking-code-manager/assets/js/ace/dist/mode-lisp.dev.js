"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/mode/lisp_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function s() {
    var e = "case|do|let|loop|if|else|when",
        t = "eq|neq|and|or",
        n = "null|nil",
        r = "cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn",
        i = this.createKeywordMapper({
      "keyword.control": e,
      "keyword.operator": t,
      "constant.language": n,
      "support.function": r
    }, "identifier", !0);
    this.$rules = {
      start: [{
        token: "comment",
        regex: ";.*$"
      }, {
        token: ["storage.type.function-type.lisp", "text", "entity.name.function.lisp"],
        regex: "(?:\\b(?:(defun|defmethod|defmacro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"
      }, {
        token: ["punctuation.definition.constant.character.lisp", "constant.character.lisp"],
        regex: "(#)((?:\\w|[\\\\+-=<>'\"&#])+)"
      }, {
        token: ["punctuation.definition.variable.lisp", "variable.other.global.lisp", "punctuation.definition.variable.lisp"],
        regex: "(\\*)(\\S*)(\\*)"
      }, {
        token: "constant.numeric",
        regex: "0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
      }, {
        token: "constant.numeric",
        regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
      }, {
        token: i,
        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
      }, {
        token: "string",
        regex: '"(?=.)',
        next: "qqstring"
      }],
      qqstring: [{
        token: "constant.character.escape.lisp",
        regex: "\\\\."
      }, {
        token: "string",
        regex: '[^"\\\\]+'
      }, {
        token: "string",
        regex: "\\\\$",
        next: "qqstring"
      }, {
        token: "string",
        regex: '"|$',
        next: "start"
      }]
    };
  };

  r.inherits(s, i), t.LispHighlightRules = s;
}), ace.define("ace/mode/lisp", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/lisp_highlight_rules"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./lisp_highlight_rules").LispHighlightRules,
      o = function o() {
    this.HighlightRules = s, this.$behaviour = this.$defaultBehaviour;
  };

  r.inherits(o, i), function () {
    this.lineCommentStart = ";", this.$id = "ace/mode/lisp";
  }.call(o.prototype), t.Mode = o;
});

(function () {
  ace.require(["ace/mode/lisp"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();