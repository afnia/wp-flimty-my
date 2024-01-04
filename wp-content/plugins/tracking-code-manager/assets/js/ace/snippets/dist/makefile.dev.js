"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/snippets/makefile", ["require", "exports", "module"], function (e, t, n) {
  "use strict";

  t.snippetText = "snippet ifeq\n	ifeq (${1:cond0},${2:cond1})\n		${3:code}\n	endif\n", t.scope = "makefile";
});

(function () {
  ace.require(["ace/snippets/makefile"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();