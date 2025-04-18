"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/mode/mips_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function s() {
    var e = /\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source;
    this.$rules = {
      start: [{
        token: "storage.modifier.mips",
        regex: /\.\b(?:align|ascii|asciiz|byte|double|extern|float|globl|space|word)\b/,
        comment: "Assembler directives for data storage"
      }, {
        token: "entity.name.section.mips",
        regex: /\.\b(?:data|text|kdata|ktext|)\b/,
        comment: "Segements: .data .text"
      }, {
        token: "variable.parameter.mips",
        regex: /\$(?:(?:3[01]|[12]?[0-9]|[0-9])|zero|at|v[01]|a[0-3]|s[0-7]|t[0-9]|k[01]|gp|sp|fp|ra)/,
        comment: "Registers by id $1, $2, ..."
      }, {
        token: "variable.parameter.mips",
        regex: /\$f(?:[0-9]|[1-2][0-9]|3[0-1])/,
        comment: "Floating point registers"
      }, {
        token: "support.function.source.mips",
        regex: /\b(?:(?:add|sub|div|l|mov|mult|neg|s|c\.eq|c\.le|c\.lt)\.[ds]|cvt\.s\.[dw]|cvt\.d\.[sw]|cvt\.w\.[ds]|bc1[tf])\b/,
        comment: "The MIPS floating-point instruction set"
      }, {
        token: "support.function.source.mips",
        regex: /\b(?:add|addu|addi|addiu|sub|subu|and|andi|or|not|ori|nor|xor|xori|slt|sltu|slti|sltiu|sll|sllv|rol|srl|sra|srlv|ror|j|jr|jal|beq|bne|lw|sw|lb|sb|lui|move|mfhi|mflo|mthi|mtlo)\b/,
        comment: "Just the hardcoded instructions provided by the MIPS assembly language"
      }, {
        token: "support.function.other.mips",
        regex: /\b(?:abs|b|beqz|bge|bgt|bgtu|ble|bleu|blt|bltu|bnez|div|divu|la|li|move|mul|neg|not|rem|remu|seq|sge|sgt|sle|sne)\b/,
        comment: "Pseudo instructions"
      }, {
        token: "entity.name.function.mips",
        regex: /\bsyscall\b/,
        comment: "Other"
      }, {
        token: "string",
        regex: "(?:'\")(?:" + e + "|.)?(?:'\")"
      }, {
        token: "string.start",
        regex: "'",
        stateName: "qstring",
        next: [{
          token: "string",
          regex: /\\\s*$/,
          next: "qqstring"
        }, {
          token: "constant.language.escape",
          regex: e
        }, {
          token: "string.end",
          regex: "'|$",
          next: "start"
        }, {
          defaultToken: "string"
        }]
      }, {
        token: "string.start",
        regex: '"',
        stateName: "qqstring",
        next: [{
          token: "string",
          regex: /\\\s*$/,
          next: "qqstring"
        }, {
          token: "constant.language.escape",
          regex: e
        }, {
          token: "string.end",
          regex: '"|$',
          next: "start"
        }, {
          defaultToken: "string"
        }]
      }, {
        token: "constant.numeric.mips",
        regex: /\b(?:\d+|0(?:x|X)[a-fA-F0-9]+)\b/,
        comment: "Numbers like +12, -3, 55, 0x3F"
      }, {
        token: "entity.name.tag.mips",
        regex: /\b[\w]+\b:/,
        comment: "Labels at line start: begin_repeat: add ..."
      }, {
        token: "comment.assembly",
        regex: /#.*$/,
        comment: "Single line comments"
      }]
    }, this.normalizeRules();
  };

  s.metaData = {
    fileTypes: ["s", "asm"],
    name: "MIPS",
    scopeName: "source.mips"
  }, r.inherits(s, i), t.MIPSHighlightRules = s;
}), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
  "use strict";

  var r = e("../../lib/oop"),
      i = e("../../range").Range,
      s = e("./fold_mode").FoldMode,
      o = t.FoldMode = function (e) {
    e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)));
  };

  r.inherits(o, s), function () {
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, n) {
      var r = e.getLine(n);
      if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r)) return "";

      var i = this._getFoldWidgetBase(e, t, n);

      return !i && this.startRegionRe.test(r) ? "start" : i;
    }, this.getFoldWidgetRange = function (e, t, n, r) {
      var i = e.getLine(n);
      if (this.startRegionRe.test(i)) return this.getCommentRegionBlock(e, i, n);
      var s = i.match(this.foldingStartMarker);

      if (s) {
        var o = s.index;
        if (s[1]) return this.openingBracketBlock(e, s[1], n, o);
        var u = e.getCommentFoldRange(n, o + s[0].length, 1);
        return u && !u.isMultiLine() && (r ? u = this.getSectionRange(e, n) : t != "all" && (u = null)), u;
      }

      if (t === "markbegin") return;
      var s = i.match(this.foldingStopMarker);

      if (s) {
        var o = s.index + s[0].length;
        return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1);
      }
    }, this.getSectionRange = function (e, t) {
      var n = e.getLine(t),
          r = n.search(/\S/),
          s = t,
          o = n.length;
      t += 1;
      var u = t,
          a = e.getLength();

      while (++t < a) {
        n = e.getLine(t);
        var f = n.search(/\S/);
        if (f === -1) continue;
        if (r > f) break;
        var l = this.getFoldWidgetRange(e, "all", t);

        if (l) {
          if (l.start.row <= s) break;
          if (l.isMultiLine()) t = l.end.row;else if (r == f) break;
        }

        u = t;
      }

      return new i(s, o, u, e.getLine(u).length);
    }, this.getCommentRegionBlock = function (e, t, n) {
      var r = t.search(/\s*$/),
          s = e.getLength(),
          o = n,
          u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
          a = 1;

      while (++n < s) {
        t = e.getLine(n);
        var f = u.exec(t);
        if (!f) continue;
        f[1] ? a-- : a++;
        if (!a) break;
      }

      var l = n;
      if (l > o) return new i(o, r, l, t.length);
    };
  }.call(o.prototype);
}), ace.define("ace/mode/mips", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/mips_highlight_rules", "ace/mode/folding/cstyle"], function (e, t, n) {
  "use strict";

  var r = e("../lib/oop"),
      i = e("./text").Mode,
      s = e("./mips_highlight_rules").MIPSHighlightRules,
      o = e("./folding/cstyle").FoldMode,
      u = function u() {
    this.HighlightRules = s, this.foldingRules = new o();
  };

  r.inherits(u, i), function () {
    this.lineCommentStart = ["#"], this.$id = "ace/mode/mips";
  }.call(u.prototype), t.Mode = u;
});

(function () {
  ace.require(["ace/mode/mips"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();