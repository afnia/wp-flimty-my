"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/mode/cirru_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function s() {
    this.$rules = {
      start: [{
        token: "constant.numeric",
        regex: /[\d\.]+/
      }, {
        token: "comment.line.double-dash",
        regex: /--/,
        next: "comment"
      }, {
        token: "storage.modifier",
        regex: /\(/
      }, {
        token: "storage.modifier",
        regex: /,/,
        next: "line"
      }, {
        token: "support.function",
        regex: /[^\(\)"\s{}\[\]]+/,
        next: "line"
      }, {
        token: "string.quoted.double",
        regex: /"/,
        next: "string"
      }, {
        token: "storage.modifier",
        regex: /\)/
      }],
      comment: [{
        token: "comment.line.double-dash",
        regex: / +[^\n]+/,
        next: "start"
      }],
      string: [{
        token: "string.quoted.double",
        regex: /"/,
        next: "line"
      }, {
        token: "constant.character.escape",
        regex: /\\/,
        next: "escape"
      }, {
        token: "string.quoted.double",
        regex: /[^\\"]+/
      }],
      escape: [{
        token: "constant.character.escape",
        regex: /./,
        next: "string"
      }],
      line: [{
        token: "constant.numeric",
        regex: /[\d\.]+/
      }, {
        token: "markup.raw",
        regex: /^\s*/,
        next: "start"
      }, {
        token: "storage.modifier",
        regex: /\$/,
        next: "start"
      }, {
        token: "variable.parameter",
        regex: /[^\(\)"\s{}\[\]]+/
      }, {
        token: "storage.modifier",
        regex: /\(/,
        next: "start"
      }, {
        token: "storage.modifier",
        regex: /\)/
      }, {
        token: "markup.raw",
        regex: /^ */,
        next: "start"
      }, {
        token: "string.quoted.double",
        regex: /"/,
        next: "string"
      }]
    };
  };

  r.inherits(s, i), t.CirruHighlightRules = s;
}), ace.define("ace/mode/folding/coffee", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/range"], function (e, t, n) {
  "use strict";

  var r = e("../../lib/oop"),
      i = e("./fold_mode").FoldMode,
      s = e("../../range").Range,
      o = t.FoldMode = function () {};

  r.inherits(o, i), function () {
    this.getFoldWidgetRange = function (e, t, n) {
      var r = this.indentationBlock(e, n);
      if (r) return r;
      var i = /\S/,
          o = e.getLine(n),
          u = o.search(i);
      if (u == -1 || o[u] != "#") return;
      var a = o.length,
          f = e.getLength(),
          l = n,
          c = n;

      while (++n < f) {
        o = e.getLine(n);
        var h = o.search(i);
        if (h == -1) continue;
        if (o[h] != "#") break;
        c = n;
      }

      if (c > l) {
        var p = e.getLine(c).length;
        return new s(l, a, c, p);
      }
    }, this.getFoldWidget = function (e, t, n) {
      var r = e.getLine(n),
          i = r.search(/\S/),
          s = e.getLine(n + 1),
          o = e.getLine(n - 1),
          u = o.search(/\S/),
          a = s.search(/\S/);
      if (i == -1) return e.foldWidgets[n - 1] = u != -1 && u < a ? "start" : "", "";

      if (u == -1) {
        if (i == a && r[i] == "#" && s[i] == "#") return e.foldWidgets[n - 1] = "", e.foldWidgets[n + 1] = "", "start";
      } else if (u == i && r[i] == "#" && o[i] == "#" && e.getLine(n - 2).search(/\S/) == -1) return e.foldWidgets[n - 1] = "start", e.foldWidgets[n + 1] = "", "";

      return u != -1 && u < i ? e.foldWidgets[n - 1] = "start" : e.foldWidgets[n - 1] = "", i < a ? "start" : "";
    };
  }.call(o.prototype);
}), ace.define("ace/mode/cirru", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/cirru_highlight_rules", "ace/mode/folding/coffee"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./cirru_highlight_rules").CirruHighlightRules,
      o = e("./folding/coffee").FoldMode,
      u = function u() {
    this.HighlightRules = s, this.foldingRules = new o(), this.$behaviour = this.$defaultBehaviour;
  };

  r.inherits(u, i), function () {
    this.lineCommentStart = "--", this.$id = "ace/mode/cirru";
  }.call(u.prototype), t.Mode = u;
});

(function () {
  ace.require(["ace/mode/cirru"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();