"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/mode/textile_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function s() {
    this.$rules = {
      start: [{
        token: function token(e) {
          return e.charAt(0) == "h" ? "markup.heading." + e.charAt(1) : "markup.heading";
        },
        regex: "h1|h2|h3|h4|h5|h6|bq|p|bc|pre",
        next: "blocktag"
      }, {
        token: "keyword",
        regex: "[\\*]+|[#]+"
      }, {
        token: "text",
        regex: ".+"
      }],
      blocktag: [{
        token: "keyword",
        regex: "\\. ",
        next: "start"
      }, {
        token: "keyword",
        regex: "\\(",
        next: "blocktagproperties"
      }],
      blocktagproperties: [{
        token: "keyword",
        regex: "\\)",
        next: "blocktag"
      }, {
        token: "string",
        regex: "[a-zA-Z0-9\\-_]+"
      }, {
        token: "keyword",
        regex: "#"
      }]
    };
  };

  r.inherits(s, i), t.TextileHighlightRules = s;
}), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
  "use strict";

  var r = e("../range").Range,
      i = function i() {};

  (function () {
    this.checkOutdent = function (e, t) {
      return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1;
    }, this.autoOutdent = function (e, t) {
      var n = e.getLine(t),
          i = n.match(/^(\s*\})/);
      if (!i) return 0;
      var s = i[1].length,
          o = e.findMatchingBracket({
        row: t,
        column: s
      });
      if (!o || o.row == t) return 0;
      var u = this.$getIndent(e.getLine(o.row));
      e.replace(new r(t, 0, t, s - 1), u);
    }, this.$getIndent = function (e) {
      return e.match(/^\s*/)[0];
    };
  }).call(i.prototype), t.MatchingBraceOutdent = i;
}), ace.define("ace/mode/textile", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/textile_highlight_rules", "ace/mode/matching_brace_outdent"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./textile_highlight_rules").TextileHighlightRules,
      o = e("./matching_brace_outdent").MatchingBraceOutdent,
      u = function u() {
    this.HighlightRules = s, this.$outdent = new o(), this.$behaviour = this.$defaultBehaviour;
  };

  r.inherits(u, i), function () {
    this.type = "text", this.getNextLineIndent = function (e, t, n) {
      return e == "intag" ? n : "";
    }, this.checkOutdent = function (e, t, n) {
      return this.$outdent.checkOutdent(t, n);
    }, this.autoOutdent = function (e, t, n) {
      this.$outdent.autoOutdent(t, n);
    }, this.$id = "ace/mode/textile", this.snippetFileId = "ace/snippets/textile";
  }.call(u.prototype), t.Mode = u;
});

(function () {
  ace.require(["ace/mode/textile"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();