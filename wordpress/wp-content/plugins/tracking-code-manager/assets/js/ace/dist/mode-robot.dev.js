"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/mode/robot_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function s() {
    var e = new RegExp(/\$\{CURDIR\}|\$\{TEMPDIR\}|\$\{EXECDIR\}|\$\{\/\}|\$\{\:\}|\$\{\\n\}|\$\{true\}|\$\{false\}|\$\{none\}|\$\{null\}|\$\{space(?:\s*\*\s+[0-9]+)?\}|\$\{empty\}|&\{empty\}|@\{empty\}|\$\{TEST NAME\}|@\{TEST[\s_]TAGS\}|\$\{TEST[\s_]DOCUMENTATION\}|\$\{TEST[\s_]STATUS\}|\$\{TEST[\s_]MESSAGE\}|\$\{PREV[\s_]TEST[\s_]NAME\}|\$\{PREV[\s_]TEST[\s_]STATUS\}|\$\{PREV[\s_]TEST[\s_]MESSAGE\}|\$\{SUITE[\s_]NAME\}|\$\{SUITE[\s_]SOURCE\}|\$\{SUITE[\s_]DOCUMENTATION\}|&\{SUITE[\s_]METADATA\}|\$\{SUITE[\s_]STATUS\}|\$\{SUITE[\s_]MESSAGE\}|\$\{KEYWORD[\s_]STATUS\}|\$\{KEYWORD[\s_]MESSAGE\}|\$\{LOG[\s_]LEVEL\}|\$\{OUTPUT[\s_]FILE\}|\$\{LOG[\s_]FILE\}|\$\{REPORT[\s_]FILE\}|\$\{DEBUG[\s_]FILE\}|\$\{OUTPUT[\s_]DIR\}/);
    this.$rules = {
      start: [{
        token: "string.robot.header",
        regex: /^\*{3}\s+(?:settings?|metadata|(?:user )?keywords?|test ?cases?|tasks?|variables?)/,
        caseInsensitive: !0,
        push: [{
          token: "string.robot.header",
          regex: /$/,
          next: "pop"
        }, {
          defaultToken: "string.robot.header"
        }],
        comment: "start of a table"
      }, {
        token: "comment.robot",
        regex: /(?:^|\s{2,}|\t|\|\s{1,})(?=[^\\])#/,
        push: [{
          token: "comment.robot",
          regex: /$/,
          next: "pop"
        }, {
          defaultToken: "comment.robot"
        }]
      }, {
        token: "comment",
        regex: /^\s*\[?Documentation\]?/,
        caseInsensitive: !0,
        push: [{
          token: "comment",
          regex: /^(?!\s*\.\.\.)/,
          next: "pop"
        }, {
          defaultToken: "comment"
        }]
      }, {
        token: "storage.type.method.robot",
        regex: /\[(?:Arguments|Setup|Teardown|Precondition|Postcondition|Template|Return|Timeout)\]/,
        caseInsensitive: !0,
        comment: "testcase settings"
      }, {
        token: "storage.type.method.robot",
        regex: /\[Tags\]/,
        caseInsensitive: !0,
        push: [{
          token: "storage.type.method.robot",
          regex: /^(?!\s*\.\.\.)/,
          next: "pop"
        }, {
          token: "comment",
          regex: /^\s*\.\.\./
        }, {
          defaultToken: "storage.type.method.robot"
        }],
        comment: "test tags"
      }, {
        token: "constant.language",
        regex: e,
        caseInsensitive: !0
      }, {
        token: "entity.name.variable.wrapper",
        regex: /[$@&%]\{\{?/,
        push: [{
          token: "entity.name.variable.wrapper",
          regex: /\}\}?(\s?=)?/,
          next: "pop"
        }, {
          include: "$self"
        }, {
          token: "entity.name.variable",
          regex: /./
        }, {
          defaultToken: "entity.name.variable"
        }]
      }, {
        token: "keyword.control.robot",
        regex: /^[^\s\t*$|]+|(?=^\|)\s+[^\s\t*$|]+/,
        push: [{
          token: "keyword.control.robot",
          regex: /(?=\s{2})|\t|$|\s+(?=\|)/,
          next: "pop"
        }, {
          defaultToken: "keyword.control.robot"
        }]
      }, {
        token: "constant.numeric.robot",
        regex: /\b[0-9]+(?:\.[0-9]+)?\b/
      }, {
        token: "keyword",
        regex: /\s{2,}(for|in range|in|end|else if|if|else|with name)(\s{2,}|$)/,
        caseInsensitive: !0
      }, {
        token: "storage.type.function",
        regex: /^(?:\s{2,}\s+)[^ \t*$@&%[.|]+/,
        push: [{
          token: "storage.type.function",
          regex: /(?=\s{2})|\t|$|\s+(?=\|)/,
          next: "pop"
        }, {
          defaultToken: "storage.type.function"
        }]
      }]
    }, this.normalizeRules();
  };

  s.metadata = {
    fileTypes: ["robot"],
    name: "Robot",
    scopeName: "source.robot"
  }, r.inherits(s, i), t.RobotHighlightRules = s;
}), ace.define("ace/mode/folding/pythonic", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode"], function (e, t, n) {
  "use strict";

  var r = e("../../lib/oop"),
      i = e("./fold_mode").FoldMode,
      s = t.FoldMode = function (e) {
    this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + e + ")(?:\\s*)(?:#.*)?$");
  };

  r.inherits(s, i), function () {
    this.getFoldWidgetRange = function (e, t, n) {
      var r = e.getLine(n),
          i = r.match(this.foldingStartMarker);
      if (i) return i[1] ? this.openingBracketBlock(e, i[1], n, i.index) : i[2] ? this.indentationBlock(e, n, i.index + i[2].length) : this.indentationBlock(e, n);
    };
  }.call(s.prototype);
}), ace.define("ace/mode/robot", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/robot_highlight_rules", "ace/mode/folding/pythonic"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./robot_highlight_rules").RobotHighlightRules,
      o = e("./folding/pythonic").FoldMode,
      u = function u() {
    this.HighlightRules = s, this.foldingRules = new o(), this.$behaviour = this.$defaultBehaviour;
  };

  r.inherits(u, i), function () {
    this.lineCommentStart = "#", this.$id = "ace/mode/robot", this.snippetFileId = "ace/snippets/robot";
  }.call(u.prototype), t.Mode = u;
});

(function () {
  ace.require(["ace/mode/robot"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();