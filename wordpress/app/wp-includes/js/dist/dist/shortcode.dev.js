"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/******/
(function () {
  // webpackBootstrap

  /******/
  "use strict";
  /******/
  // The require scope

  /******/

  var __webpack_require__ = {};
  /******/

  /************************************************************************/

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

  /************************************************************************/

  var __webpack_exports__ = {}; // EXPORTS

  __webpack_require__.d(__webpack_exports__, {
    "default": function _default() {
      return (
        /* binding */
        build_module
      );
    }
  }); // UNUSED EXPORTS: attrs, fromMatch, next, regexp, replace, string


  ; // CONCATENATED MODULE: ./node_modules/memize/dist/index.js

  /**
   * Memize options object.
   *
   * @typedef MemizeOptions
   *
   * @property {number} [maxSize] Maximum size of the cache.
   */

  /**
   * Internal cache entry.
   *
   * @typedef MemizeCacheNode
   *
   * @property {?MemizeCacheNode|undefined} [prev] Previous node.
   * @property {?MemizeCacheNode|undefined} [next] Next node.
   * @property {Array<*>}                   args   Function arguments for cache
   *                                               entry.
   * @property {*}                          val    Function result.
   */

  /**
   * Properties of the enhanced function for controlling cache.
   *
   * @typedef MemizeMemoizedFunction
   *
   * @property {()=>void} clear Clear the cache.
   */

  /**
   * Accepts a function to be memoized, and returns a new memoized function, with
   * optional options.
   *
   * @template {(...args: any[]) => any} F
   *
   * @param {F}             fn        Function to memoize.
   * @param {MemizeOptions} [options] Options object.
   *
   * @return {((...args: Parameters<F>) => ReturnType<F>) & MemizeMemoizedFunction} Memoized function.
   */

  function memize(fn, options) {
    var size = 0;
    /** @type {?MemizeCacheNode|undefined} */

    var head;
    /** @type {?MemizeCacheNode|undefined} */

    var tail;
    options = options || {};

    function memoized()
    /* ...args */
    {
      var node = head,
          len = arguments.length,
          args,
          i;

      searchCache: while (node) {
        // Perform a shallow equality test to confirm that whether the node
        // under test is a candidate for the arguments passed. Two arrays
        // are shallowly equal if their length matches and each entry is
        // strictly equal between the two sets. Avoid abstracting to a
        // function which could incur an arguments leaking deoptimization.
        // Check whether node arguments match arguments length
        if (node.args.length !== arguments.length) {
          node = node.next;
          continue;
        } // Check whether node arguments match arguments values


        for (i = 0; i < len; i++) {
          if (node.args[i] !== arguments[i]) {
            node = node.next;
            continue searchCache;
          }
        } // At this point we can assume we've found a match
        // Surface matched node to head if not already


        if (node !== head) {
          // As tail, shift to previous. Must only shift if not also
          // head, since if both head and tail, there is no previous.
          if (node === tail) {
            tail = node.prev;
          } // Adjust siblings to point to each other. If node was tail,
          // this also handles new tail's empty `next` assignment.

          /** @type {MemizeCacheNode} */


          node.prev.next = node.next;

          if (node.next) {
            node.next.prev = node.prev;
          }

          node.next = head;
          node.prev = null;
          /** @type {MemizeCacheNode} */

          head.prev = node;
          head = node;
        } // Return immediately


        return node.val;
      } // No cached value found. Continue to insertion phase:
      // Create a copy of arguments (avoid leaking deoptimization)


      args = new Array(len);

      for (i = 0; i < len; i++) {
        args[i] = arguments[i];
      }

      node = {
        args: args,
        // Generate the result from original function
        val: fn.apply(null, args)
      }; // Don't need to check whether node is already head, since it would
      // have been returned above already if it was
      // Shift existing head down list

      if (head) {
        head.prev = node;
        node.next = head;
      } else {
        // If no head, follows that there's no tail (at initial or reset)
        tail = node;
      } // Trim tail if we're reached max size and are pending cache insertion


      if (size ===
      /** @type {MemizeOptions} */
      options.maxSize) {
        tail =
        /** @type {MemizeCacheNode} */
        tail.prev;
        /** @type {MemizeCacheNode} */

        tail.next = null;
      } else {
        size++;
      }

      head = node;
      return node.val;
    }

    memoized.clear = function () {
      head = null;
      tail = null;
      size = 0;
    }; // Ignore reason: There's not a clear solution to create an intersection of
    // the function with additional properties, where the goal is to retain the
    // function signature of the incoming argument and add control properties
    // on the return value.
    // @ts-ignore


    return memoized;
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/shortcode/build-module/index.js

  /**
   * External dependencies
   */

  /**
   * Shortcode attributes object.
   *
   * @typedef {Object} WPShortcodeAttrs
   *
   * @property {Object} named   Object with named attributes.
   * @property {Array}  numeric Array with numeric attributes.
   */

  /**
   * Shortcode object.
   *
   * @typedef {Object} WPShortcode
   *
   * @property {string}           tag     Shortcode tag.
   * @property {WPShortcodeAttrs} attrs   Shortcode attributes.
   * @property {string}           content Shortcode content.
   * @property {string}           type    Shortcode type: `self-closing`,
   *                                      `closed`, or `single`.
   */

  /**
   * @typedef {Object} WPShortcodeMatch
   *
   * @property {number}      index     Index the shortcode is found at.
   * @property {string}      content   Matched content.
   * @property {WPShortcode} shortcode Shortcode instance of the match.
   */

  /**
   * Find the next matching shortcode.
   *
   * @param {string} tag   Shortcode tag.
   * @param {string} text  Text to search.
   * @param {number} index Index to start search from.
   *
   * @return {WPShortcodeMatch | undefined} Matched information.
   */

  function next(tag, text) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var re = regexp(tag);
    re.lastIndex = index;
    var match = re.exec(text);

    if (!match) {
      return;
    } // If we matched an escaped shortcode, try again.


    if ('[' === match[1] && ']' === match[7]) {
      return next(tag, text, re.lastIndex);
    }

    var result = {
      index: match.index,
      content: match[0],
      shortcode: fromMatch(match)
    }; // If we matched a leading `[`, strip it from the match and increment the
    // index accordingly.

    if (match[1]) {
      result.content = result.content.slice(1);
      result.index++;
    } // If we matched a trailing `]`, strip it from the match.


    if (match[7]) {
      result.content = result.content.slice(0, -1);
    }

    return result;
  }
  /**
   * Replace matching shortcodes in a block of text.
   *
   * @param {string}   tag      Shortcode tag.
   * @param {string}   text     Text to search.
   * @param {Function} callback Function to process the match and return
   *                            replacement string.
   *
   * @return {string} Text with shortcodes replaced.
   */


  function replace(tag, text, callback) {
    return text.replace(regexp(tag), function (match, left, $3, attrs, slash, content, closing, right) {
      // If both extra brackets exist, the shortcode has been properly
      // escaped.
      if (left === '[' && right === ']') {
        return match;
      } // Create the match object and pass it through the callback.


      var result = callback(fromMatch(arguments)); // Make sure to return any of the extra brackets if they weren't used to
      // escape the shortcode.

      return result || result === '' ? left + result + right : match;
    });
  }
  /**
   * Generate a string from shortcode parameters.
   *
   * Creates a shortcode instance and returns a string.
   *
   * Accepts the same `options` as the `shortcode()` constructor, containing a
   * `tag` string, a string or object of `attrs`, a boolean indicating whether to
   * format the shortcode using a `single` tag, and a `content` string.
   *
   * @param {Object} options
   *
   * @return {string} String representation of the shortcode.
   */


  function string(options) {
    return new shortcode(options).string();
  }
  /**
   * Generate a RegExp to identify a shortcode.
   *
   * The base regex is functionally equivalent to the one found in
   * `get_shortcode_regex()` in `wp-includes/shortcodes.php`.
   *
   * Capture groups:
   *
   * 1. An extra `[` to allow for escaping shortcodes with double `[[]]`
   * 2. The shortcode name
   * 3. The shortcode argument list
   * 4. The self closing `/`
   * 5. The content of a shortcode when it wraps some content.
   * 6. The closing tag.
   * 7. An extra `]` to allow for escaping shortcodes with double `[[]]`
   *
   * @param {string} tag Shortcode tag.
   *
   * @return {RegExp} Shortcode RegExp.
   */


  function regexp(tag) {
    return new RegExp('\\[(\\[?)(' + tag + ')(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)', 'g');
  }
  /**
   * Parse shortcode attributes.
   *
   * Shortcodes accept many types of attributes. These can chiefly be divided into
   * named and numeric attributes:
   *
   * Named attributes are assigned on a key/value basis, while numeric attributes
   * are treated as an array.
   *
   * Named attributes can be formatted as either `name="value"`, `name='value'`,
   * or `name=value`. Numeric attributes can be formatted as `"value"` or just
   * `value`.
   *
   * @param {string} text Serialised shortcode attributes.
   *
   * @return {WPShortcodeAttrs} Parsed shortcode attributes.
   */


  var attrs = memize(function (text) {
    var named = {};
    var numeric = []; // This regular expression is reused from `shortcode_parse_atts()` in
    // `wp-includes/shortcodes.php`.
    //
    // Capture groups:
    //
    // 1. An attribute name, that corresponds to...
    // 2. a value in double quotes.
    // 3. An attribute name, that corresponds to...
    // 4. a value in single quotes.
    // 5. An attribute name, that corresponds to...
    // 6. an unquoted value.
    // 7. A numeric attribute in double quotes.
    // 8. A numeric attribute in single quotes.
    // 9. An unquoted numeric attribute.

    var pattern = /([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|'([^']*)'(?:\s|$)|(\S+)(?:\s|$)/g; // Map zero-width spaces to actual spaces.

    text = text.replace(/[\u00a0\u200b]/g, ' ');
    var match; // Match and normalize attributes.

    while (match = pattern.exec(text)) {
      if (match[1]) {
        named[match[1].toLowerCase()] = match[2];
      } else if (match[3]) {
        named[match[3].toLowerCase()] = match[4];
      } else if (match[5]) {
        named[match[5].toLowerCase()] = match[6];
      } else if (match[7]) {
        numeric.push(match[7]);
      } else if (match[8]) {
        numeric.push(match[8]);
      } else if (match[9]) {
        numeric.push(match[9]);
      }
    }

    return {
      named: named,
      numeric: numeric
    };
  });
  /**
   * Generate a Shortcode Object from a RegExp match.
   *
   * Accepts a `match` object from calling `regexp.exec()` on a `RegExp` generated
   * by `regexp()`. `match` can also be set to the `arguments` from a callback
   * passed to `regexp.replace()`.
   *
   * @param {Array} match Match array.
   *
   * @return {WPShortcode} Shortcode instance.
   */

  function fromMatch(match) {
    var type;

    if (match[4]) {
      type = 'self-closing';
    } else if (match[6]) {
      type = 'closed';
    } else {
      type = 'single';
    }

    return new shortcode({
      tag: match[2],
      attrs: match[3],
      type: type,
      content: match[5]
    });
  }
  /**
   * Creates a shortcode instance.
   *
   * To access a raw representation of a shortcode, pass an `options` object,
   * containing a `tag` string, a string or object of `attrs`, a string indicating
   * the `type` of the shortcode ('single', 'self-closing', or 'closed'), and a
   * `content` string.
   *
   * @param {Object} options Options as described.
   *
   * @return {WPShortcode} Shortcode instance.
   */


  var shortcode = Object.assign(function (options) {
    var _this = this;

    var _ref = options || {},
        tag = _ref.tag,
        attributes = _ref.attrs,
        type = _ref.type,
        content = _ref.content;

    Object.assign(this, {
      tag: tag,
      type: type,
      content: content
    }); // Ensure we have a correctly formatted `attrs` object.

    this.attrs = {
      named: {},
      numeric: []
    };

    if (!attributes) {
      return;
    }

    var attributeTypes = ['named', 'numeric']; // Parse a string of attributes.

    if (typeof attributes === 'string') {
      this.attrs = attrs(attributes); // Identify a correctly formatted `attrs` object.
    } else if (attributes.length === attributeTypes.length && attributeTypes.every(function (t, key) {
      return t === attributes[key];
    })) {
      this.attrs = attributes; // Handle a flat object of attributes.
    } else {
      Object.entries(attributes).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        _this.set(key, value);
      });
    }
  }, {
    next: next,
    replace: replace,
    string: string,
    regexp: regexp,
    attrs: attrs,
    fromMatch: fromMatch
  });
  Object.assign(shortcode.prototype, {
    /**
     * Get a shortcode attribute.
     *
     * Automatically detects whether `attr` is named or numeric and routes it
     * accordingly.
     *
     * @param {(number|string)} attr Attribute key.
     *
     * @return {string} Attribute value.
     */
    get: function get(attr) {
      return this.attrs[typeof attr === 'number' ? 'numeric' : 'named'][attr];
    },

    /**
     * Set a shortcode attribute.
     *
     * Automatically detects whether `attr` is named or numeric and routes it
     * accordingly.
     *
     * @param {(number|string)} attr  Attribute key.
     * @param {string}          value Attribute value.
     *
     * @return {WPShortcode} Shortcode instance.
     */
    set: function set(attr, value) {
      this.attrs[typeof attr === 'number' ? 'numeric' : 'named'][attr] = value;
      return this;
    },

    /**
     * Transform the shortcode into a string.
     *
     * @return {string} String representation of the shortcode.
     */
    string: function string() {
      var text = '[' + this.tag;
      this.attrs.numeric.forEach(function (value) {
        if (/\s/.test(value)) {
          text += ' "' + value + '"';
        } else {
          text += ' ' + value;
        }
      });
      Object.entries(this.attrs.named).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            name = _ref5[0],
            value = _ref5[1];

        text += ' ' + name + '="' + value + '"';
      }); // If the tag is marked as `single` or `self-closing`, close the tag and
      // ignore any additional content.

      if ('single' === this.type) {
        return text + ']';
      } else if ('self-closing' === this.type) {
        return text + ' /]';
      } // Complete the opening tag.


      text += ']';

      if (this.content) {
        text += this.content;
      } // Add the closing tag.


      return text + '[/' + this.tag + ']';
    }
  });
  /* harmony default export */

  var build_module = shortcode;
  (window.wp = window.wp || {}).shortcode = __webpack_exports__["default"];
  /******/
})();