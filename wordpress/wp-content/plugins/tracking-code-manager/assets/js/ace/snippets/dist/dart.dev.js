"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

ace.define("ace/snippets/dart", ["require", "exports", "module"], function (e, t, n) {
  "use strict";

  t.snippetText = "snippet lib\n	library ${1};\n	${2}\nsnippet im\n	import '${1}';\n	${2}\nsnippet pa\n	part '${1}';\n	${2}\nsnippet pao\n	part of ${1};\n	${2}\nsnippet main\n	void main() {\n	  ${1:/* code */}\n	}\nsnippet st\n	static ${1}\nsnippet fi\n	final ${1}\nsnippet re\n	return ${1}\nsnippet br\n	break;\nsnippet th\n	throw ${1}\nsnippet cl\n	class ${1:`Filename(\"\", \"untitled\")`} ${2}\nsnippet imp\n	implements ${1}\nsnippet ext\n	extends ${1}\nsnippet if\n	if (${1:true}) {\n	  ${2}\n	}\nsnippet ife\n	if (${1:true}) {\n	  ${2}\n	} else {\n	  ${3}\n	}\nsnippet el\n	else\nsnippet sw\n	switch (${1}) {\n	  ${2}\n	}\nsnippet cs\n	case ${1}:\n	  ${2}\nsnippet de\n	default:\n	  ${1}\nsnippet for\n	for (var ${2:i} = 0, len = ${1:things}.length; $2 < len; ${3:++}$2) {\n	  ${4:$1[$2]}\n	}\nsnippet fore\n	for (final ${2:item} in ${1:itemList}) {\n	  ${3:/* code */}\n	}\nsnippet wh\n	while (${1:/* condition */}) {\n	  ${2:/* code */}\n	}\nsnippet dowh\n	do {\n	  ${2:/* code */}\n	} while (${1:/* condition */});\nsnippet as\n	assert(${1:/* condition */});\nsnippet try\n	try {\n	  ${2}\n	} catch (${1:Exception e}) {\n	}\nsnippet tryf\n	try {\n	  ${2}\n	} catch (${1:Exception e}) {\n	} finally {\n	}\n", t.scope = "dart";
});

(function () {
  ace.require(["ace/snippets/dart"], function (m) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && module) {
      module.exports = m;
    }
  });
})();