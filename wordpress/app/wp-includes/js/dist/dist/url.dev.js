"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/******/
(function () {
  // webpackBootstrap

  /******/
  var __webpack_modules__ = {
    /***/
    4793:
    /***/
    function _(module) {
      var characterMap = {
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "Ấ": "A",
        "Ắ": "A",
        "Ẳ": "A",
        "Ẵ": "A",
        "Ặ": "A",
        "Æ": "AE",
        "Ầ": "A",
        "Ằ": "A",
        "Ȃ": "A",
        "Ả": "A",
        "Ạ": "A",
        "Ẩ": "A",
        "Ẫ": "A",
        "Ậ": "A",
        "Ç": "C",
        "Ḉ": "C",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "Ế": "E",
        "Ḗ": "E",
        "Ề": "E",
        "Ḕ": "E",
        "Ḝ": "E",
        "Ȇ": "E",
        "Ẻ": "E",
        "Ẽ": "E",
        "Ẹ": "E",
        "Ể": "E",
        "Ễ": "E",
        "Ệ": "E",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "Ḯ": "I",
        "Ȋ": "I",
        "Ỉ": "I",
        "Ị": "I",
        "Ð": "D",
        "Ñ": "N",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "Ố": "O",
        "Ṍ": "O",
        "Ṓ": "O",
        "Ȏ": "O",
        "Ỏ": "O",
        "Ọ": "O",
        "Ổ": "O",
        "Ỗ": "O",
        "Ộ": "O",
        "Ờ": "O",
        "Ở": "O",
        "Ỡ": "O",
        "Ớ": "O",
        "Ợ": "O",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "Ủ": "U",
        "Ụ": "U",
        "Ử": "U",
        "Ữ": "U",
        "Ự": "U",
        "Ý": "Y",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "ấ": "a",
        "ắ": "a",
        "ẳ": "a",
        "ẵ": "a",
        "ặ": "a",
        "æ": "ae",
        "ầ": "a",
        "ằ": "a",
        "ȃ": "a",
        "ả": "a",
        "ạ": "a",
        "ẩ": "a",
        "ẫ": "a",
        "ậ": "a",
        "ç": "c",
        "ḉ": "c",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "ế": "e",
        "ḗ": "e",
        "ề": "e",
        "ḕ": "e",
        "ḝ": "e",
        "ȇ": "e",
        "ẻ": "e",
        "ẽ": "e",
        "ẹ": "e",
        "ể": "e",
        "ễ": "e",
        "ệ": "e",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "ḯ": "i",
        "ȋ": "i",
        "ỉ": "i",
        "ị": "i",
        "ð": "d",
        "ñ": "n",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "ố": "o",
        "ṍ": "o",
        "ṓ": "o",
        "ȏ": "o",
        "ỏ": "o",
        "ọ": "o",
        "ổ": "o",
        "ỗ": "o",
        "ộ": "o",
        "ờ": "o",
        "ở": "o",
        "ỡ": "o",
        "ớ": "o",
        "ợ": "o",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "ủ": "u",
        "ụ": "u",
        "ử": "u",
        "ữ": "u",
        "ự": "u",
        "ý": "y",
        "ÿ": "y",
        "Ā": "A",
        "ā": "a",
        "Ă": "A",
        "ă": "a",
        "Ą": "A",
        "ą": "a",
        "Ć": "C",
        "ć": "c",
        "Ĉ": "C",
        "ĉ": "c",
        "Ċ": "C",
        "ċ": "c",
        "Č": "C",
        "č": "c",
        "C̆": "C",
        "c̆": "c",
        "Ď": "D",
        "ď": "d",
        "Đ": "D",
        "đ": "d",
        "Ē": "E",
        "ē": "e",
        "Ĕ": "E",
        "ĕ": "e",
        "Ė": "E",
        "ė": "e",
        "Ę": "E",
        "ę": "e",
        "Ě": "E",
        "ě": "e",
        "Ĝ": "G",
        "Ǵ": "G",
        "ĝ": "g",
        "ǵ": "g",
        "Ğ": "G",
        "ğ": "g",
        "Ġ": "G",
        "ġ": "g",
        "Ģ": "G",
        "ģ": "g",
        "Ĥ": "H",
        "ĥ": "h",
        "Ħ": "H",
        "ħ": "h",
        "Ḫ": "H",
        "ḫ": "h",
        "Ĩ": "I",
        "ĩ": "i",
        "Ī": "I",
        "ī": "i",
        "Ĭ": "I",
        "ĭ": "i",
        "Į": "I",
        "į": "i",
        "İ": "I",
        "ı": "i",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "Ḱ": "K",
        "ḱ": "k",
        "K̆": "K",
        "k̆": "k",
        "Ĺ": "L",
        "ĺ": "l",
        "Ļ": "L",
        "ļ": "l",
        "Ľ": "L",
        "ľ": "l",
        "Ŀ": "L",
        "ŀ": "l",
        "Ł": "l",
        "ł": "l",
        "Ḿ": "M",
        "ḿ": "m",
        "M̆": "M",
        "m̆": "m",
        "Ń": "N",
        "ń": "n",
        "Ņ": "N",
        "ņ": "n",
        "Ň": "N",
        "ň": "n",
        "ŉ": "n",
        "N̆": "N",
        "n̆": "n",
        "Ō": "O",
        "ō": "o",
        "Ŏ": "O",
        "ŏ": "o",
        "Ő": "O",
        "ő": "o",
        "Œ": "OE",
        "œ": "oe",
        "P̆": "P",
        "p̆": "p",
        "Ŕ": "R",
        "ŕ": "r",
        "Ŗ": "R",
        "ŗ": "r",
        "Ř": "R",
        "ř": "r",
        "R̆": "R",
        "r̆": "r",
        "Ȓ": "R",
        "ȓ": "r",
        "Ś": "S",
        "ś": "s",
        "Ŝ": "S",
        "ŝ": "s",
        "Ş": "S",
        "Ș": "S",
        "ș": "s",
        "ş": "s",
        "Š": "S",
        "š": "s",
        "Ţ": "T",
        "ţ": "t",
        "ț": "t",
        "Ț": "T",
        "Ť": "T",
        "ť": "t",
        "Ŧ": "T",
        "ŧ": "t",
        "T̆": "T",
        "t̆": "t",
        "Ũ": "U",
        "ũ": "u",
        "Ū": "U",
        "ū": "u",
        "Ŭ": "U",
        "ŭ": "u",
        "Ů": "U",
        "ů": "u",
        "Ű": "U",
        "ű": "u",
        "Ų": "U",
        "ų": "u",
        "Ȗ": "U",
        "ȗ": "u",
        "V̆": "V",
        "v̆": "v",
        "Ŵ": "W",
        "ŵ": "w",
        "Ẃ": "W",
        "ẃ": "w",
        "X̆": "X",
        "x̆": "x",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Y̆": "Y",
        "y̆": "y",
        "Ź": "Z",
        "ź": "z",
        "Ż": "Z",
        "ż": "z",
        "Ž": "Z",
        "ž": "z",
        "ſ": "s",
        "ƒ": "f",
        "Ơ": "O",
        "ơ": "o",
        "Ư": "U",
        "ư": "u",
        "Ǎ": "A",
        "ǎ": "a",
        "Ǐ": "I",
        "ǐ": "i",
        "Ǒ": "O",
        "ǒ": "o",
        "Ǔ": "U",
        "ǔ": "u",
        "Ǖ": "U",
        "ǖ": "u",
        "Ǘ": "U",
        "ǘ": "u",
        "Ǚ": "U",
        "ǚ": "u",
        "Ǜ": "U",
        "ǜ": "u",
        "Ứ": "U",
        "ứ": "u",
        "Ṹ": "U",
        "ṹ": "u",
        "Ǻ": "A",
        "ǻ": "a",
        "Ǽ": "AE",
        "ǽ": "ae",
        "Ǿ": "O",
        "ǿ": "o",
        "Þ": "TH",
        "þ": "th",
        "Ṕ": "P",
        "ṕ": "p",
        "Ṥ": "S",
        "ṥ": "s",
        "X́": "X",
        "x́": "x",
        "Ѓ": "Г",
        "ѓ": "г",
        "Ќ": "К",
        "ќ": "к",
        "A̋": "A",
        "a̋": "a",
        "E̋": "E",
        "e̋": "e",
        "I̋": "I",
        "i̋": "i",
        "Ǹ": "N",
        "ǹ": "n",
        "Ồ": "O",
        "ồ": "o",
        "Ṑ": "O",
        "ṑ": "o",
        "Ừ": "U",
        "ừ": "u",
        "Ẁ": "W",
        "ẁ": "w",
        "Ỳ": "Y",
        "ỳ": "y",
        "Ȁ": "A",
        "ȁ": "a",
        "Ȅ": "E",
        "ȅ": "e",
        "Ȉ": "I",
        "ȉ": "i",
        "Ȍ": "O",
        "ȍ": "o",
        "Ȑ": "R",
        "ȑ": "r",
        "Ȕ": "U",
        "ȕ": "u",
        "B̌": "B",
        "b̌": "b",
        "Č̣": "C",
        "č̣": "c",
        "Ê̌": "E",
        "ê̌": "e",
        "F̌": "F",
        "f̌": "f",
        "Ǧ": "G",
        "ǧ": "g",
        "Ȟ": "H",
        "ȟ": "h",
        "J̌": "J",
        "ǰ": "j",
        "Ǩ": "K",
        "ǩ": "k",
        "M̌": "M",
        "m̌": "m",
        "P̌": "P",
        "p̌": "p",
        "Q̌": "Q",
        "q̌": "q",
        "Ř̩": "R",
        "ř̩": "r",
        "Ṧ": "S",
        "ṧ": "s",
        "V̌": "V",
        "v̌": "v",
        "W̌": "W",
        "w̌": "w",
        "X̌": "X",
        "x̌": "x",
        "Y̌": "Y",
        "y̌": "y",
        "A̧": "A",
        "a̧": "a",
        "B̧": "B",
        "b̧": "b",
        "Ḑ": "D",
        "ḑ": "d",
        "Ȩ": "E",
        "ȩ": "e",
        "Ɛ̧": "E",
        "ɛ̧": "e",
        "Ḩ": "H",
        "ḩ": "h",
        "I̧": "I",
        "i̧": "i",
        "Ɨ̧": "I",
        "ɨ̧": "i",
        "M̧": "M",
        "m̧": "m",
        "O̧": "O",
        "o̧": "o",
        "Q̧": "Q",
        "q̧": "q",
        "U̧": "U",
        "u̧": "u",
        "X̧": "X",
        "x̧": "x",
        "Z̧": "Z",
        "z̧": "z",
        "й": "и",
        "Й": "И",
        "ё": "е",
        "Ё": "Е"
      };
      var chars = Object.keys(characterMap).join('|');
      var allAccents = new RegExp(chars, 'g');
      var firstAccent = new RegExp(chars, '');

      function matcher(match) {
        return characterMap[match];
      }

      var removeAccents = function removeAccents(string) {
        return string.replace(allAccents, matcher);
      };

      var hasAccents = function hasAccents(string) {
        return !!string.match(firstAccent);
      };

      module.exports = removeAccents;
      module.exports.has = hasAccents;
      module.exports.remove = removeAccents;
      /***/
    }
    /******/

  };
  /************************************************************************/

  /******/
  // The module cache

  /******/

  var __webpack_module_cache__ = {};
  /******/

  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache

    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/

    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = __webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed

      /******/
      // no module.loaded needed

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/

    /******/
    // Return the exports of the module

    /******/


    return module.exports;
    /******/
  }
  /******/

  /************************************************************************/

  /******/

  /* webpack/runtime/compat get default export */

  /******/


  !function () {
    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/
    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function () {
        return module['default'];
      } :
      /******/
      function () {
        return module;
      };
      /******/

      __webpack_require__.d(getter, {
        a: getter
      });
      /******/


      return getter;
      /******/
    };
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/define property getters */

  /******/

  !function () {
    /******/
    // define getter functions for harmony exports

    /******/
    __webpack_require__.d = function (exports, definition) {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
          /******/
        }
        /******/

      }
      /******/

    };
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/hasOwnProperty shorthand */

  /******/

  !function () {
    /******/
    __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/

  }();
  /******/

  /******/

  /* webpack/runtime/make namespace object */

  /******/

  !function () {
    /******/
    // define __esModule on exports

    /******/
    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

  }();
  /******/

  /************************************************************************/

  var __webpack_exports__ = {}; // This entry need to be wrapped in an IIFE because it need to be in strict mode.

  !function () {
    "use strict"; // ESM COMPAT FLAG

    __webpack_require__.r(__webpack_exports__); // EXPORTS


    __webpack_require__.d(__webpack_exports__, {
      addQueryArgs: function addQueryArgs() {
        return (
          /* reexport */
          _addQueryArgs
        );
      },
      buildQueryString: function buildQueryString() {
        return (
          /* reexport */
          _buildQueryString
        );
      },
      cleanForSlug: function cleanForSlug() {
        return (
          /* reexport */
          _cleanForSlug
        );
      },
      filterURLForDisplay: function filterURLForDisplay() {
        return (
          /* reexport */
          _filterURLForDisplay
        );
      },
      getAuthority: function getAuthority() {
        return (
          /* reexport */
          _getAuthority
        );
      },
      getFilename: function getFilename() {
        return (
          /* reexport */
          _getFilename
        );
      },
      getFragment: function getFragment() {
        return (
          /* reexport */
          _getFragment
        );
      },
      getPath: function getPath() {
        return (
          /* reexport */
          _getPath
        );
      },
      getPathAndQueryString: function getPathAndQueryString() {
        return (
          /* reexport */
          _getPathAndQueryString
        );
      },
      getProtocol: function getProtocol() {
        return (
          /* reexport */
          _getProtocol
        );
      },
      getQueryArg: function getQueryArg() {
        return (
          /* reexport */
          _getQueryArg
        );
      },
      getQueryArgs: function getQueryArgs() {
        return (
          /* reexport */
          _getQueryArgs
        );
      },
      getQueryString: function getQueryString() {
        return (
          /* reexport */
          _getQueryString
        );
      },
      hasQueryArg: function hasQueryArg() {
        return (
          /* reexport */
          _hasQueryArg
        );
      },
      isEmail: function isEmail() {
        return (
          /* reexport */
          _isEmail
        );
      },
      isURL: function isURL() {
        return (
          /* reexport */
          _isURL
        );
      },
      isValidAuthority: function isValidAuthority() {
        return (
          /* reexport */
          _isValidAuthority
        );
      },
      isValidFragment: function isValidFragment() {
        return (
          /* reexport */
          _isValidFragment
        );
      },
      isValidPath: function isValidPath() {
        return (
          /* reexport */
          _isValidPath
        );
      },
      isValidProtocol: function isValidProtocol() {
        return (
          /* reexport */
          _isValidProtocol
        );
      },
      isValidQueryString: function isValidQueryString() {
        return (
          /* reexport */
          _isValidQueryString
        );
      },
      normalizePath: function normalizePath() {
        return (
          /* reexport */
          _normalizePath
        );
      },
      prependHTTP: function prependHTTP() {
        return (
          /* reexport */
          _prependHTTP
        );
      },
      prependHTTPS: function prependHTTPS() {
        return (
          /* reexport */
          _prependHTTPS
        );
      },
      removeQueryArgs: function removeQueryArgs() {
        return (
          /* reexport */
          _removeQueryArgs
        );
      },
      safeDecodeURI: function safeDecodeURI() {
        return (
          /* reexport */
          _safeDecodeURI
        );
      },
      safeDecodeURIComponent: function safeDecodeURIComponent() {
        return (
          /* reexport */
          _safeDecodeURIComponent
        );
      }
    });

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/is-url.js

    /**
     * Determines whether the given string looks like a URL.
     *
     * @param {string} url The string to scrutinise.
     *
     * @example
     * ```js
     * const isURL = isURL( 'https://wordpress.org' ); // true
     * ```
     *
     * @see https://url.spec.whatwg.org/
     * @see https://url.spec.whatwg.org/#valid-url-string
     *
     * @return {boolean} Whether or not it looks like a URL.
     */

    function _isURL(url) {
      // A URL can be considered value if the `URL` constructor is able to parse
      // it. The constructor throws an error for an invalid URL.
      try {
        new URL(url);
        return true;
      } catch (_unused) {
        return false;
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/is-email.js

    var EMAIL_REGEXP = /^(mailto:)?[a-z0-9._%+-]+@[a-z0-9][a-z0-9.-]*\.[a-z]{2,63}$/i;
    /**
     * Determines whether the given string looks like an email.
     *
     * @param {string} email The string to scrutinise.
     *
     * @example
     * ```js
     * const isEmail = isEmail( 'hello@wordpress.org' ); // true
     * ```
     *
     * @return {boolean} Whether or not it looks like an email.
     */

    function _isEmail(email) {
      return EMAIL_REGEXP.test(email);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-protocol.js

    /**
     * Returns the protocol part of the URL.
     *
     * @param {string} url The full URL.
     *
     * @example
     * ```js
     * const protocol1 = getProtocol( 'tel:012345678' ); // 'tel:'
     * const protocol2 = getProtocol( 'https://wordpress.org' ); // 'https:'
     * ```
     *
     * @return {string|void} The protocol part of the URL.
     */

    function _getProtocol(url) {
      var matches = /^([^\s:]+:)/.exec(url);

      if (matches) {
        return matches[1];
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/is-valid-protocol.js

    /**
     * Tests if a url protocol is valid.
     *
     * @param {string} protocol The url protocol.
     *
     * @example
     * ```js
     * const isValid = isValidProtocol( 'https:' ); // true
     * const isNotValid = isValidProtocol( 'https :' ); // false
     * ```
     *
     * @return {boolean} True if the argument is a valid protocol (e.g. http:, tel:).
     */

    function _isValidProtocol(protocol) {
      if (!protocol) {
        return false;
      }

      return /^[a-z\-.\+]+[0-9]*:$/i.test(protocol);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-authority.js

    /**
     * Returns the authority part of the URL.
     *
     * @param {string} url The full URL.
     *
     * @example
     * ```js
     * const authority1 = getAuthority( 'https://wordpress.org/help/' ); // 'wordpress.org'
     * const authority2 = getAuthority( 'https://localhost:8080/test/' ); // 'localhost:8080'
     * ```
     *
     * @return {string|void} The authority part of the URL.
     */

    function _getAuthority(url) {
      var matches = /^[^\/\s:]+:(?:\/\/)?\/?([^\/\s#?]+)[\/#?]{0,1}\S*$/.exec(url);

      if (matches) {
        return matches[1];
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/is-valid-authority.js

    /**
     * Checks for invalid characters within the provided authority.
     *
     * @param {string} authority A string containing the URL authority.
     *
     * @example
     * ```js
     * const isValid = isValidAuthority( 'wordpress.org' ); // true
     * const isNotValid = isValidAuthority( 'wordpress#org' ); // false
     * ```
     *
     * @return {boolean} True if the argument contains a valid authority.
     */

    function _isValidAuthority(authority) {
      if (!authority) {
        return false;
      }

      return /^[^\s#?]+$/.test(authority);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-path.js

    /**
     * Returns the path part of the URL.
     *
     * @param {string} url The full URL.
     *
     * @example
     * ```js
     * const path1 = getPath( 'http://localhost:8080/this/is/a/test?query=true' ); // 'this/is/a/test'
     * const path2 = getPath( 'https://wordpress.org/help/faq/' ); // 'help/faq'
     * ```
     *
     * @return {string|void} The path part of the URL.
     */

    function _getPath(url) {
      var matches = /^[^\/\s:]+:(?:\/\/)?[^\/\s#?]+[\/]([^\s#?]+)[#?]{0,1}\S*$/.exec(url);

      if (matches) {
        return matches[1];
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/is-valid-path.js

    /**
     * Checks for invalid characters within the provided path.
     *
     * @param {string} path The URL path.
     *
     * @example
     * ```js
     * const isValid = isValidPath( 'test/path/' ); // true
     * const isNotValid = isValidPath( '/invalid?test/path/' ); // false
     * ```
     *
     * @return {boolean} True if the argument contains a valid path
     */

    function _isValidPath(path) {
      if (!path) {
        return false;
      }

      return /^[^\s#?]+$/.test(path);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-query-string.js

    /**
     * Returns the query string part of the URL.
     *
     * @param {string} url The full URL.
     *
     * @example
     * ```js
     * const queryString = getQueryString( 'http://localhost:8080/this/is/a/test?query=true#fragment' ); // 'query=true'
     * ```
     *
     * @return {string|void} The query string part of the URL.
     */

    function _getQueryString(url) {
      var query;

      try {
        query = new URL(url, 'http://example.com').search.substring(1);
      } catch (error) {}

      if (query) {
        return query;
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/build-query-string.js

    /**
     * Generates URL-encoded query string using input query data.
     *
     * It is intended to behave equivalent as PHP's `http_build_query`, configured
     * with encoding type PHP_QUERY_RFC3986 (spaces as `%20`).
     *
     * @example
     * ```js
     * const queryString = buildQueryString( {
     *    simple: 'is ok',
     *    arrays: [ 'are', 'fine', 'too' ],
     *    objects: {
     *       evenNested: {
     *          ok: 'yes',
     *       },
     *    },
     * } );
     * // "simple=is%20ok&arrays%5B0%5D=are&arrays%5B1%5D=fine&arrays%5B2%5D=too&objects%5BevenNested%5D%5Bok%5D=yes"
     * ```
     *
     * @param {Record<string,*>} data Data to encode.
     *
     * @return {string} Query string.
     */

    function _buildQueryString(data) {
      var string = '';
      var stack = Object.entries(data);
      var pair;

      while (pair = stack.shift()) {
        var _pair = pair,
            _pair2 = _slicedToArray(_pair, 2),
            key = _pair2[0],
            value = _pair2[1]; // Support building deeply nested data, from array or object values.


        var hasNestedData = Array.isArray(value) || value && value.constructor === Object;

        if (hasNestedData) {
          // Push array or object values onto the stack as composed of their
          // original key and nested index or key, retaining order by a
          // combination of Array#reverse and Array#unshift onto the stack.
          var valuePairs = Object.entries(value).reverse();
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = valuePairs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = _slicedToArray(_step.value, 2),
                  member = _step$value[0],
                  memberValue = _step$value[1];

              stack.unshift(["".concat(key, "[").concat(member, "]"), memberValue]);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else if (value !== undefined) {
          // Null is treated as special case, equivalent to empty string.
          if (value === null) {
            value = '';
          }

          string += '&' + [key, value].map(encodeURIComponent).join('=');
        }
      } // Loop will concatenate with leading `&`, but it's only expected for all
      // but the first query parameter. This strips the leading `&`, while still
      // accounting for the case that the string may in-fact be empty.


      return string.substr(1);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/is-valid-query-string.js

    /**
     * Checks for invalid characters within the provided query string.
     *
     * @param {string} queryString The query string.
     *
     * @example
     * ```js
     * const isValid = isValidQueryString( 'query=true&another=false' ); // true
     * const isNotValid = isValidQueryString( 'query=true?another=false' ); // false
     * ```
     *
     * @return {boolean} True if the argument contains a valid query string.
     */

    function _isValidQueryString(queryString) {
      if (!queryString) {
        return false;
      }

      return /^[^\s#?\/]+$/.test(queryString);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-path-and-query-string.js

    /**
     * Internal dependencies
     */

    /**
     * Returns the path part and query string part of the URL.
     *
     * @param {string} url The full URL.
     *
     * @example
     * ```js
     * const pathAndQueryString1 = getPathAndQueryString( 'http://localhost:8080/this/is/a/test?query=true' ); // '/this/is/a/test?query=true'
     * const pathAndQueryString2 = getPathAndQueryString( 'https://wordpress.org/help/faq/' ); // '/help/faq'
     * ```
     *
     * @return {string} The path part and query string part of the URL.
     */

    function _getPathAndQueryString(url) {
      var path = _getPath(url);

      var queryString = _getQueryString(url);

      var value = '/';
      if (path) value += path;
      if (queryString) value += "?".concat(queryString);
      return value;
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-fragment.js

    /**
     * Returns the fragment part of the URL.
     *
     * @param {string} url The full URL
     *
     * @example
     * ```js
     * const fragment1 = getFragment( 'http://localhost:8080/this/is/a/test?query=true#fragment' ); // '#fragment'
     * const fragment2 = getFragment( 'https://wordpress.org#another-fragment?query=true' ); // '#another-fragment'
     * ```
     *
     * @return {string|void} The fragment part of the URL.
     */

    function _getFragment(url) {
      var matches = /^\S+?(#[^\s\?]*)/.exec(url);

      if (matches) {
        return matches[1];
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/is-valid-fragment.js

    /**
     * Checks for invalid characters within the provided fragment.
     *
     * @param {string} fragment The url fragment.
     *
     * @example
     * ```js
     * const isValid = isValidFragment( '#valid-fragment' ); // true
     * const isNotValid = isValidFragment( '#invalid-#fragment' ); // false
     * ```
     *
     * @return {boolean} True if the argument contains a valid fragment.
     */

    function _isValidFragment(fragment) {
      if (!fragment) {
        return false;
      }

      return /^#[^\s#?\/]*$/.test(fragment);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/safe-decode-uri-component.js

    /**
     * Safely decodes a URI component with `decodeURIComponent`. Returns the URI component unmodified if
     * `decodeURIComponent` throws an error.
     *
     * @param {string} uriComponent URI component to decode.
     *
     * @return {string} Decoded URI component if possible.
     */

    function _safeDecodeURIComponent(uriComponent) {
      try {
        return decodeURIComponent(uriComponent);
      } catch (uriComponentError) {
        return uriComponent;
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-query-args.js

    /**
     * Internal dependencies
     */

    /** @typedef {import('./get-query-arg').QueryArgParsed} QueryArgParsed */

    /**
     * @typedef {Record<string,QueryArgParsed>} QueryArgs
     */

    /**
     * Sets a value in object deeply by a given array of path segments. Mutates the
     * object reference.
     *
     * @param {Record<string,*>} object Object in which to assign.
     * @param {string[]}         path   Path segment at which to set value.
     * @param {*}                value  Value to set.
     */

    function setPath(object, path, value) {
      var length = path.length;
      var lastIndex = length - 1;

      for (var i = 0; i < length; i++) {
        var key = path[i];

        if (!key && Array.isArray(object)) {
          // If key is empty string and next value is array, derive key from
          // the current length of the array.
          key = object.length.toString();
        }

        key = ['__proto__', 'constructor', 'prototype'].includes(key) ? key.toUpperCase() : key; // If the next key in the path is numeric (or empty string), it will be
        // created as an array. Otherwise, it will be created as an object.

        var isNextKeyArrayIndex = !isNaN(Number(path[i + 1]));
        object[key] = i === lastIndex ? // If at end of path, assign the intended value.
        value : // Otherwise, advance to the next object in the path, creating
        // it if it does not yet exist.
        object[key] || (isNextKeyArrayIndex ? [] : {});

        if (Array.isArray(object[key]) && !isNextKeyArrayIndex) {
          // If we current key is non-numeric, but the next value is an
          // array, coerce the value to an object.
          object[key] = _objectSpread({}, object[key]);
        } // Update working reference object to the next in the path.


        object = object[key];
      }
    }
    /**
     * Returns an object of query arguments of the given URL. If the given URL is
     * invalid or has no querystring, an empty object is returned.
     *
     * @param {string} url URL.
     *
     * @example
     * ```js
     * const foo = getQueryArgs( 'https://wordpress.org?foo=bar&bar=baz' );
     * // { "foo": "bar", "bar": "baz" }
     * ```
     *
     * @return {QueryArgs} Query args object.
     */


    function _getQueryArgs(url) {
      return (_getQueryString(url) || '' // Normalize space encoding, accounting for PHP URL encoding
      // corresponding to `application/x-www-form-urlencoded`.
      //
      // See: https://tools.ietf.org/html/rfc1866#section-8.2.1
      ).replace(/\+/g, '%20').split('&').reduce(function (accumulator, keyValue) {
        var _keyValue$split$filte = keyValue.split('=') // Filtering avoids decoding as `undefined` for value, where
        // default is restored in destructuring assignment.
        .filter(Boolean).map(_safeDecodeURIComponent),
            _keyValue$split$filte2 = _slicedToArray(_keyValue$split$filte, 2),
            key = _keyValue$split$filte2[0],
            _keyValue$split$filte3 = _keyValue$split$filte2[1],
            value = _keyValue$split$filte3 === void 0 ? '' : _keyValue$split$filte3;

        if (key) {
          var segments = key.replace(/\]/g, '').split('[');
          setPath(accumulator, segments, value);
        }

        return accumulator;
      }, Object.create(null));
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/add-query-args.js

    /**
     * Internal dependencies
     */

    /**
     * Appends arguments as querystring to the provided URL. If the URL already
     * includes query arguments, the arguments are merged with (and take precedent
     * over) the existing set.
     *
     * @param {string} [url=''] URL to which arguments should be appended. If omitted,
     *                          only the resulting querystring is returned.
     * @param {Object} [args]   Query arguments to apply to URL.
     *
     * @example
     * ```js
     * const newURL = addQueryArgs( 'https://google.com', { q: 'test' } ); // https://google.com/?q=test
     * ```
     *
     * @return {string} URL with arguments applied.
     */

    function _addQueryArgs() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var args = arguments.length > 1 ? arguments[1] : undefined;

      // If no arguments are to be appended, return original URL.
      if (!args || !Object.keys(args).length) {
        return url;
      }

      var baseUrl = url; // Determine whether URL already had query arguments.

      var queryStringIndex = url.indexOf('?');

      if (queryStringIndex !== -1) {
        // Merge into existing query arguments.
        args = Object.assign(_getQueryArgs(url), args); // Change working base URL to omit previous query arguments.

        baseUrl = baseUrl.substr(0, queryStringIndex);
      }

      return baseUrl + '?' + _buildQueryString(args);
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-query-arg.js

    /**
     * Internal dependencies
     */

    /**
     * @typedef {{[key: string]: QueryArgParsed}} QueryArgObject
     */

    /**
     * @typedef {string|string[]|QueryArgObject} QueryArgParsed
     */

    /**
     * Returns a single query argument of the url
     *
     * @param {string} url URL.
     * @param {string} arg Query arg name.
     *
     * @example
     * ```js
     * const foo = getQueryArg( 'https://wordpress.org?foo=bar&bar=baz', 'foo' ); // bar
     * ```
     *
     * @return {QueryArgParsed|void} Query arg value.
     */

    function _getQueryArg(url, arg) {
      return _getQueryArgs(url)[arg];
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/has-query-arg.js

    /**
     * Internal dependencies
     */

    /**
     * Determines whether the URL contains a given query arg.
     *
     * @param {string} url URL.
     * @param {string} arg Query arg name.
     *
     * @example
     * ```js
     * const hasBar = hasQueryArg( 'https://wordpress.org?foo=bar&bar=baz', 'bar' ); // true
     * ```
     *
     * @return {boolean} Whether or not the URL contains the query arg.
     */

    function _hasQueryArg(url, arg) {
      return _getQueryArg(url, arg) !== undefined;
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/remove-query-args.js

    /**
     * Internal dependencies
     */

    /**
     * Removes arguments from the query string of the url
     *
     * @param {string}    url  URL.
     * @param {...string} args Query Args.
     *
     * @example
     * ```js
     * const newUrl = removeQueryArgs( 'https://wordpress.org?foo=bar&bar=baz&baz=foobar', 'foo', 'bar' ); // https://wordpress.org?baz=foobar
     * ```
     *
     * @return {string} Updated URL.
     */

    function _removeQueryArgs(url) {
      var queryStringIndex = url.indexOf('?');

      if (queryStringIndex === -1) {
        return url;
      }

      var query = _getQueryArgs(url);

      var baseURL = url.substr(0, queryStringIndex);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      args.forEach(function (arg) {
        return delete query[arg];
      });

      var queryString = _buildQueryString(query);

      return queryString ? baseURL + '?' + queryString : baseURL;
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/prepend-http.js

    /**
     * Internal dependencies
     */

    var USABLE_HREF_REGEXP = /^(?:[a-z]+:|#|\?|\.|\/)/i;
    /**
     * Prepends "http://" to a url, if it looks like something that is meant to be a TLD.
     *
     * @param {string} url The URL to test.
     *
     * @example
     * ```js
     * const actualURL = prependHTTP( 'wordpress.org' ); // http://wordpress.org
     * ```
     *
     * @return {string} The updated URL.
     */

    function _prependHTTP(url) {
      if (!url) {
        return url;
      }

      url = url.trim();

      if (!USABLE_HREF_REGEXP.test(url) && !_isEmail(url)) {
        return 'http://' + url;
      }

      return url;
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/safe-decode-uri.js

    /**
     * Safely decodes a URI with `decodeURI`. Returns the URI unmodified if
     * `decodeURI` throws an error.
     *
     * @param {string} uri URI to decode.
     *
     * @example
     * ```js
     * const badUri = safeDecodeURI( '%z' ); // does not throw an Error, simply returns '%z'
     * ```
     *
     * @return {string} Decoded URI if possible.
     */

    function _safeDecodeURI(uri) {
      try {
        return decodeURI(uri);
      } catch (uriError) {
        return uri;
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/filter-url-for-display.js

    /**
     * Returns a URL for display.
     *
     * @param {string}      url       Original URL.
     * @param {number|null} maxLength URL length.
     *
     * @example
     * ```js
     * const displayUrl = filterURLForDisplay( 'https://www.wordpress.org/gutenberg/' ); // wordpress.org/gutenberg
     * const imageUrl = filterURLForDisplay( 'https://www.wordpress.org/wp-content/uploads/img.png', 20 ); // …ent/uploads/img.png
     * ```
     *
     * @return {string} Displayed URL.
     */

    function _filterURLForDisplay(url) {
      var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // Remove protocol and www prefixes.
      var filteredURL = url.replace(/^(?:https?:)\/\/(?:www\.)?/, ''); // Ends with / and only has that single slash, strip it.

      if (filteredURL.match(/^[^\/]+\/$/)) {
        filteredURL = filteredURL.replace('/', '');
      }

      var mediaRegexp = /([\w|:])*\.(?:jpg|jpeg|gif|png|svg)/;

      if (!maxLength || filteredURL.length <= maxLength || !filteredURL.match(mediaRegexp)) {
        return filteredURL;
      } // If the file is not greater than max length, return last portion of URL.


      filteredURL = filteredURL.split('?')[0];
      var urlPieces = filteredURL.split('/');
      var file = urlPieces[urlPieces.length - 1];

      if (file.length <= maxLength) {
        return '…' + filteredURL.slice(-maxLength);
      } // If the file is greater than max length, truncate the file.


      var index = file.lastIndexOf('.');
      var _ref = [file.slice(0, index), file.slice(index + 1)],
          fileName = _ref[0],
          extension = _ref[1];
      var truncatedFile = fileName.slice(-3) + '.' + extension;
      return file.slice(0, maxLength - truncatedFile.length - 1) + '…' + truncatedFile;
    } // EXTERNAL MODULE: ./node_modules/remove-accents/index.js


    var remove_accents = __webpack_require__(4793);

    var remove_accents_default =
    /*#__PURE__*/
    __webpack_require__.n(remove_accents);

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/clean-for-slug.js

    /**
     * External dependencies
     */

    /**
     * Performs some basic cleanup of a string for use as a post slug.
     *
     * This replicates some of what `sanitize_title()` does in WordPress core, but
     * is only designed to approximate what the slug will be.
     *
     * Converts Latin-1 Supplement and Latin Extended-A letters to basic Latin
     * letters. Removes combining diacritical marks. Converts whitespace, periods,
     * and forward slashes to hyphens. Removes any remaining non-word characters
     * except hyphens. Converts remaining string to lowercase. It does not account
     * for octets, HTML entities, or other encoded characters.
     *
     * @param {string} string Title or slug to be processed.
     *
     * @return {string} Processed string.
     */

    function _cleanForSlug(string) {
      if (!string) {
        return '';
      }

      return remove_accents_default()(string) // Convert each group of whitespace, periods, and forward slashes to a hyphen.
      .replace(/[\s\./]+/g, '-') // Remove anything that's not a letter, number, underscore or hyphen.
      .replace(/(?:[\0-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u036F\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482-\u0489\u0530\u0557\u0558\u055A-\u055F\u0589-\u05CF\u05EB-\u05EE\u05F3-\u061F\u064B-\u065F\u066A-\u066D\u0670\u06D4\u06D6-\u06E4\u06E7-\u06ED\u06FD\u06FE\u0700-\u070F\u0711\u0730-\u074C\u07A6-\u07B0\u07B2-\u07BF\u07EB-\u07F3\u07F6-\u07F9\u07FB-\u07FF\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u083F\u0859-\u085F\u086B-\u089F\u08B5\u08BE-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0965\u0970\u0981-\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA-\u09BC\u09BE-\u09CD\u09CF-\u09DB\u09DE\u09E2-\u09E5\u09F2\u09F3\u09FA\u09FB\u09FD-\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A-\u0A58\u0A5D\u0A5F-\u0A65\u0A70\u0A71\u0A75-\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA-\u0ABC\u0ABE-\u0ACF\u0AD1-\u0ADF\u0AE2-\u0AE5\u0AF0-\u0AF8\u0AFA-\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A-\u0B3C\u0B3E-\u0B5B\u0B5E\u0B62-\u0B65\u0B70\u0B78-\u0B82\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BCF\u0BD1-\u0BE5\u0BF3-\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C3E-\u0C57\u0C5B-\u0C5F\u0C62-\u0C65\u0C70-\u0C77\u0C7F\u0C81-\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA-\u0CBC\u0CBE-\u0CDD\u0CDF\u0CE2-\u0CE5\u0CF0\u0CF3-\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D3E-\u0D4D\u0D4F-\u0D53\u0D57\u0D62-\u0D65\u0D79\u0D80-\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DE5\u0DF0-\u0E00\u0E31\u0E34-\u0E3F\u0E47-\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EB1\u0EB4-\u0EBC\u0EBE\u0EBF\u0EC5\u0EC7-\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F1F\u0F34-\u0F3F\u0F48\u0F6D-\u0F87\u0F8D-\u0FFF\u102B-\u103E\u104A-\u104F\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B-\u1368\u137D-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1712-\u171F\u1732-\u173F\u1752-\u175F\u176D\u1771-\u177F\u17B4-\u17D6\u17D8-\u17DB\u17DD-\u17DF\u17EA-\u17EF\u17FA-\u180F\u181A-\u181F\u1879-\u187F\u1885\u1886\u18A9\u18AB-\u18AF\u18F6-\u18FF\u191F-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19FF\u1A17-\u1A1F\u1A55-\u1A7F\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1B04\u1B34-\u1B44\u1B4C-\u1B4F\u1B5A-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BFF\u1C24-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1CFB-\u1CFF\u1DC0-\u1DFF\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u206F\u2072\u2073\u207A-\u207E\u208A-\u208F\u209D-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A-\u245F\u249C-\u24E9\u2500-\u2775\u2794-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CEF-\u2CF1\u2CF4-\u2CFC\u2CFE\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7F\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF-\u2E2E\u2E30-\u3004\u3008-\u3020\u302A-\u3030\u3036\u3037\u303D-\u3040\u3097-\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u3191\u3196-\u319F\u31BB-\u31EF\u3200-\u321F\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DB6-\u4DFF\u9FF0-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA66F-\uA67E\uA69E\uA69F\uA6F0-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7C7-\uA7F6\uA802\uA806\uA80B\uA823-\uA82F\uA836-\uA83F\uA874-\uA881\uA8B4-\uA8CF\uA8DA-\uA8F1\uA8F8-\uA8FA\uA8FC\uA8FF\uA926-\uA92F\uA947-\uA95F\uA97D-\uA983\uA9B3-\uA9CE\uA9DA-\uA9DF\uA9E5\uA9FF\uAA29-\uAA3F\uAA43\uAA4C-\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAC3-\uAADA\uAADE\uAADF\uAAEB-\uAAF1\uAAF5-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB68-\uAB6F\uABE3-\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB1E\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD06\uDD34-\uDD3F\uDD79-\uDD89\uDD8C-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEE0\uDEFC-\uDEFF\uDF24-\uDF2C\uDF4B-\uDF4F\uDF76-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC57\uDC77\uDC78\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE01-\uDE0F\uDE14\uDE18\uDE36-\uDE3F\uDE49-\uDE5F\uDE7F\uDEA0-\uDEBF\uDEC8\uDEE5-\uDEEA\uDEF0-\uDEFF\uDF36-\uDF3F\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD24-\uDD2F\uDD3A-\uDE5F\uDE7F-\uDEFF\uDF28-\uDF2F\uDF46-\uDF50\uDF55-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC00-\uDC02\uDC38-\uDC51\uDC70-\uDC82\uDCB0-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDD02\uDD27-\uDD35\uDD40-\uDD43\uDD45-\uDD4F\uDD73-\uDD75\uDD77-\uDD82\uDDB3-\uDDC0\uDDC5-\uDDCF\uDDDB\uDDDD-\uDDE0\uDDF5-\uDDFF\uDE12\uDE2C-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEDF-\uDEEF\uDEFA-\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A-\uDF3C\uDF3E-\uDF4F\uDF51-\uDF5C\uDF62-\uDFFF]|\uD805[\uDC35-\uDC46\uDC4B-\uDC4F\uDC5A-\uDC5E\uDC60-\uDC7F\uDCB0-\uDCC3\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDAF-\uDDD7\uDDDC-\uDDFF\uDE30-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEAB-\uDEB7\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B-\uDF2F\uDF3C-\uDFFF]|\uD806[\uDC2C-\uDC9F\uDCF3-\uDCFE\uDD00-\uDD9F\uDDA8\uDDA9\uDDD1-\uDDE0\uDDE2\uDDE4-\uDDFF\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE4F\uDE51-\uDE5B\uDE8A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC2F-\uDC3F\uDC41-\uDC4F\uDC6D-\uDC71\uDC90-\uDCFF\uDD07\uDD0A\uDD31-\uDD45\uDD47-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8A-\uDD97\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF3-\uDFBF\uDFD5-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD823-\uD82B\uD82D\uD82E\uD830-\uD833\uD836\uD837\uD839\uD83D-\uD83F\uD87B-\uD87D\uD87F-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE-\uDEFF\uDF30-\uDF3F\uDF44-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE97-\uDEFF\uDF4B-\uDF4F\uDF51-\uDF92\uDFA0-\uDFDF\uDFE2\uDFE4-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD822[\uDEF3-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDFFF]|\uD834[\uDC00-\uDEDF\uDEF4-\uDF5F\uDF79-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|[\uD838\uD83C][\uDC00-\uDCFF\uDD2D-\uDD36\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEEC-\uDEEF\uDEFA-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD0-\uDCFF\uDD44-\uDD4A\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDC70\uDCAC\uDCB0\uDCB5-\uDD00\uDD2E\uDD3E-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+/g, '') // Convert to lowercase
      .toLowerCase() // Replace multiple hyphens with a single one.
      .replace(/-+/g, '-') // Remove any remaining leading or trailing hyphens.
      .replace(/(^-+)|(-+$)/g, '');
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/get-filename.js

    /**
     * Returns the filename part of the URL.
     *
     * @param {string} url The full URL.
     *
     * @example
     * ```js
     * const filename1 = getFilename( 'http://localhost:8080/this/is/a/test.jpg' ); // 'test.jpg'
     * const filename2 = getFilename( '/this/is/a/test.png' ); // 'test.png'
     * ```
     *
     * @return {string|void} The filename part of the URL.
     */

    function _getFilename(url) {
      var filename;

      try {
        filename = new URL(url, 'http://example.com').pathname.split('/').pop();
      } catch (error) {}

      if (filename) {
        return filename;
      }
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/normalize-path.js

    /**
     * Given a path, returns a normalized path where equal query parameter values
     * will be treated as identical, regardless of order they appear in the original
     * text.
     *
     * @param {string} path Original path.
     *
     * @return {string} Normalized path.
     */

    function _normalizePath(path) {
      var splitted = path.split('?');
      var query = splitted[1];
      var base = splitted[0];

      if (!query) {
        return base;
      } // 'b=1%2C2&c=2&a=5'


      return base + '?' + query // [ 'b=1%2C2', 'c=2', 'a=5' ]
      .split('&') // [ [ 'b, '1%2C2' ], [ 'c', '2' ], [ 'a', '5' ] ]
      .map(function (entry) {
        return entry.split('=');
      }) // [ [ 'b', '1,2' ], [ 'c', '2' ], [ 'a', '5' ] ]
      .map(function (pair) {
        return pair.map(decodeURIComponent);
      }) // [ [ 'a', '5' ], [ 'b, '1,2' ], [ 'c', '2' ] ]
      .sort(function (a, b) {
        return a[0].localeCompare(b[0]);
      }) // [ [ 'a', '5' ], [ 'b, '1%2C2' ], [ 'c', '2' ] ]
      .map(function (pair) {
        return pair.map(encodeURIComponent);
      }) // [ 'a=5', 'b=1%2C2', 'c=2' ]
      .map(function (pair) {
        return pair.join('=');
      }) // 'a=5&b=1%2C2&c=2'
      .join('&');
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/prepend-https.js

    /**
     * Internal dependencies
     */

    /**
     * Prepends "https://" to a url, if it looks like something that is meant to be a TLD.
     *
     * Note: this will not replace "http://" with "https://".
     *
     * @param {string} url The URL to test.
     *
     * @example
     * ```js
     * const actualURL = prependHTTPS( 'wordpress.org' ); // https://wordpress.org
     * ```
     *
     * @return {string} The updated URL.
     */

    function _prependHTTPS(url) {
      if (!url) {
        return url;
      } // If url starts with http://, return it as is.


      if (url.startsWith('http://')) {
        return url;
      }

      url = _prependHTTP(url);
      return url.replace(/^http:/, 'https:');
    }

    ; // CONCATENATED MODULE: ./node_modules/@wordpress/url/build-module/index.js
  }();
  (window.wp = window.wp || {}).url = __webpack_exports__;
  /******/
})();