"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/snippets/razor", ["require", "exports", "module"], function (e, t, n) {
  "use strict";

  t.snippetText = "snippet if\n(${1} == ${2}) {\n	${3}\n}", t.scope = "razor";
});

(function () {
  ace.require(["ace/snippets/razor"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();