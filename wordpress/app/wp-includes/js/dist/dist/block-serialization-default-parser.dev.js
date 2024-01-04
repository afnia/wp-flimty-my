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

  var __webpack_exports__ = {};

  __webpack_require__.r(__webpack_exports__);
  /* harmony export */


  __webpack_require__.d(__webpack_exports__, {
    /* harmony export */
    parse: function parse() {
      return (
        /* binding */
        _parse
      );
    }
    /* harmony export */

  });
  /**
   * @type {string}
   */


  var document;
  /**
   * @type {number}
   */

  var offset;
  /**
   * @type {ParsedBlock[]}
   */

  var output;
  /**
   * @type {ParsedFrame[]}
   */

  var stack;
  /**
   * @typedef {Object|null} Attributes
   */

  /**
   * @typedef {Object} ParsedBlock
   * @property {string|null}        blockName    Block name.
   * @property {Attributes}         attrs        Block attributes.
   * @property {ParsedBlock[]}      innerBlocks  Inner blocks.
   * @property {string}             innerHTML    Inner HTML.
   * @property {Array<string|null>} innerContent Inner content.
   */

  /**
   * @typedef {Object} ParsedFrame
   * @property {ParsedBlock} block            Block.
   * @property {number}      tokenStart       Token start.
   * @property {number}      tokenLength      Token length.
   * @property {number}      prevOffset       Previous offset.
   * @property {number|null} leadingHtmlStart Leading HTML start.
   */

  /**
   * @typedef {'no-more-tokens'|'void-block'|'block-opener'|'block-closer'} TokenType
   */

  /**
   * @typedef {[TokenType, string, Attributes, number, number]} Token
   */

  /**
   * Matches block comment delimiters
   *
   * While most of this pattern is straightforward the attribute parsing
   * incorporates a tricks to make sure we don't choke on specific input
   *
   *  - since JavaScript has no possessive quantifier or atomic grouping
   *    we are emulating it with a trick
   *
   *    we want a possessive quantifier or atomic group to prevent backtracking
   *    on the `}`s should we fail to match the remainder of the pattern
   *
   *    we can emulate this with a positive lookahead and back reference
   *    (a++)*c === ((?=(a+))\1)*c
   *
   *    let's examine an example:
   *      - /(a+)*c/.test('aaaaaaaaaaaaad') fails after over 49,000 steps
   *      - /(a++)*c/.test('aaaaaaaaaaaaad') fails after 85 steps
   *      - /(?>a+)*c/.test('aaaaaaaaaaaaad') fails after 126 steps
   *
   *    this is because the possessive `++` and the atomic group `(?>)`
   *    tell the engine that all those `a`s belong together as a single group
   *    and so it won't split it up when stepping backwards to try and match
   *
   *    if we use /((?=(a+))\1)*c/ then we get the same behavior as the atomic group
   *    or possessive and prevent the backtracking because the `a+` is matched but
   *    not captured. thus, we find the long string of `a`s and remember it, then
   *    reference it as a whole unit inside our pattern
   *
   *    @see http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead
   *    @see http://blog.stevenlevithan.com/archives/mimic-atomic-groups
   *    @see https://javascript.info/regexp-infinite-backtracking-problem
   *
   *    once browsers reliably support atomic grouping or possessive
   *    quantifiers natively we should remove this trick and simplify
   *
   * @type {RegExp}
   *
   * @since 3.8.0
   * @since 4.6.1 added optimization to prevent backtracking on attribute parsing
   */

  var tokenizer = /<!--\s+(\/)?wp:([a-z][a-z0-9_-]*\/)?([a-z][a-z0-9_-]*)\s+({(?:(?=([^}]+|}+(?=})|(?!}\s+\/?-->)[^])*)\5|[^]*?)}\s+)?(\/)?-->/g;
  /**
   * Constructs a block object.
   *
   * @param {string|null}   blockName
   * @param {Attributes}    attrs
   * @param {ParsedBlock[]} innerBlocks
   * @param {string}        innerHTML
   * @param {string[]}      innerContent
   * @return {ParsedBlock} The block object.
   */

  function Block(blockName, attrs, innerBlocks, innerHTML, innerContent) {
    return {
      blockName: blockName,
      attrs: attrs,
      innerBlocks: innerBlocks,
      innerHTML: innerHTML,
      innerContent: innerContent
    };
  }
  /**
   * Constructs a freeform block object.
   *
   * @param {string} innerHTML
   * @return {ParsedBlock} The freeform block object.
   */


  function Freeform(innerHTML) {
    return Block(null, {}, [], innerHTML, [innerHTML]);
  }
  /**
   * Constructs a frame object.
   *
   * @param {ParsedBlock} block
   * @param {number}      tokenStart
   * @param {number}      tokenLength
   * @param {number}      prevOffset
   * @param {number|null} leadingHtmlStart
   * @return {ParsedFrame} The frame object.
   */


  function Frame(block, tokenStart, tokenLength, prevOffset, leadingHtmlStart) {
    return {
      block: block,
      tokenStart: tokenStart,
      tokenLength: tokenLength,
      prevOffset: prevOffset || tokenStart + tokenLength,
      leadingHtmlStart: leadingHtmlStart
    };
  }
  /**
   * Parser function, that converts input HTML into a block based structure.
   *
   * @param {string} doc The HTML document to parse.
   *
   * @example
   * Input post:
   * ```html
   * <!-- wp:columns {"columns":3} -->
   * <div class="wp-block-columns has-3-columns"><!-- wp:column -->
   * <div class="wp-block-column"><!-- wp:paragraph -->
   * <p>Left</p>
   * <!-- /wp:paragraph --></div>
   * <!-- /wp:column -->
   *
   * <!-- wp:column -->
   * <div class="wp-block-column"><!-- wp:paragraph -->
   * <p><strong>Middle</strong></p>
   * <!-- /wp:paragraph --></div>
   * <!-- /wp:column -->
   *
   * <!-- wp:column -->
   * <div class="wp-block-column"></div>
   * <!-- /wp:column --></div>
   * <!-- /wp:columns -->
   * ```
   *
   * Parsing code:
   * ```js
   * import { parse } from '@wordpress/block-serialization-default-parser';
   *
   * parse( post ) === [
   *     {
   *         blockName: "core/columns",
   *         attrs: {
   *             columns: 3
   *         },
   *         innerBlocks: [
   *             {
   *                 blockName: "core/column",
   *                 attrs: null,
   *                 innerBlocks: [
   *                     {
   *                         blockName: "core/paragraph",
   *                         attrs: null,
   *                         innerBlocks: [],
   *                         innerHTML: "\n<p>Left</p>\n"
   *                     }
   *                 ],
   *                 innerHTML: '\n<div class="wp-block-column"></div>\n'
   *             },
   *             {
   *                 blockName: "core/column",
   *                 attrs: null,
   *                 innerBlocks: [
   *                     {
   *                         blockName: "core/paragraph",
   *                         attrs: null,
   *                         innerBlocks: [],
   *                         innerHTML: "\n<p><strong>Middle</strong></p>\n"
   *                     }
   *                 ],
   *                 innerHTML: '\n<div class="wp-block-column"></div>\n'
   *             },
   *             {
   *                 blockName: "core/column",
   *                 attrs: null,
   *                 innerBlocks: [],
   *                 innerHTML: '\n<div class="wp-block-column"></div>\n'
   *             }
   *         ],
   *         innerHTML: '\n<div class="wp-block-columns has-3-columns">\n\n\n\n</div>\n'
   *     }
   * ];
   * ```
   * @return {ParsedBlock[]} A block-based representation of the input HTML.
   */


  var _parse = function _parse(doc) {
    document = doc;
    offset = 0;
    output = [];
    stack = [];
    tokenizer.lastIndex = 0;

    do {// twiddle our thumbs
    } while (proceed());

    return output;
  };
  /**
   * Parses the next token in the input document.
   *
   * @return {boolean} Returns true when there is more tokens to parse.
   */


  function proceed() {
    var stackDepth = stack.length;
    var next = nextToken();

    var _next = _slicedToArray(next, 5),
        tokenType = _next[0],
        blockName = _next[1],
        attrs = _next[2],
        startOffset = _next[3],
        tokenLength = _next[4]; // We may have some HTML soup before the next block.


    var leadingHtmlStart = startOffset > offset ? offset : null;

    switch (tokenType) {
      case 'no-more-tokens':
        // If not in a block then flush output.
        if (0 === stackDepth) {
          addFreeform();
          return false;
        } // Otherwise we have a problem
        // This is an error
        // we have options
        //  - treat it all as freeform text
        //  - assume an implicit closer (easiest when not nesting)
        // For the easy case we'll assume an implicit closer.


        if (1 === stackDepth) {
          addBlockFromStack();
          return false;
        } // For the nested case where it's more difficult we'll
        // have to assume that multiple closers are missing
        // and so we'll collapse the whole stack piecewise.


        while (0 < stack.length) {
          addBlockFromStack();
        }

        return false;

      case 'void-block':
        // easy case is if we stumbled upon a void block
        // in the top-level of the document.
        if (0 === stackDepth) {
          if (null !== leadingHtmlStart) {
            output.push(Freeform(document.substr(leadingHtmlStart, startOffset - leadingHtmlStart)));
          }

          output.push(Block(blockName, attrs, [], '', []));
          offset = startOffset + tokenLength;
          return true;
        } // Otherwise we found an inner block.


        addInnerBlock(Block(blockName, attrs, [], '', []), startOffset, tokenLength);
        offset = startOffset + tokenLength;
        return true;

      case 'block-opener':
        // Track all newly-opened blocks on the stack.
        stack.push(Frame(Block(blockName, attrs, [], '', []), startOffset, tokenLength, startOffset + tokenLength, leadingHtmlStart));
        offset = startOffset + tokenLength;
        return true;

      case 'block-closer':
        // If we're missing an opener we're in trouble
        // This is an error.
        if (0 === stackDepth) {
          // We have options
          //  - assume an implicit opener
          //  - assume _this_ is the opener
          // - give up and close out the document.
          addFreeform();
          return false;
        } // If we're not nesting then this is easy - close the block.


        if (1 === stackDepth) {
          addBlockFromStack(startOffset);
          offset = startOffset + tokenLength;
          return true;
        } // Otherwise we're nested and we have to close out the current
        // block and add it as a innerBlock to the parent.


        var stackTop =
        /** @type {ParsedFrame} */
        stack.pop();
        var html = document.substr(stackTop.prevOffset, startOffset - stackTop.prevOffset);
        stackTop.block.innerHTML += html;
        stackTop.block.innerContent.push(html);
        stackTop.prevOffset = startOffset + tokenLength;
        addInnerBlock(stackTop.block, stackTop.tokenStart, stackTop.tokenLength, startOffset + tokenLength);
        offset = startOffset + tokenLength;
        return true;

      default:
        // This is an error.
        addFreeform();
        return false;
    }
  }
  /**
   * Parse JSON if valid, otherwise return null
   *
   * Note that JSON coming from the block comment
   * delimiters is constrained to be an object
   * and cannot be things like `true` or `null`
   *
   * @param {string} input JSON input string to parse
   * @return {Object|null} parsed JSON if valid
   */


  function parseJSON(input) {
    try {
      return JSON.parse(input);
    } catch (e) {
      return null;
    }
  }
  /**
   * Finds the next token in the document.
   *
   * @return {Token} The next matched token.
   */


  function nextToken() {
    // Aye the magic
    // we're using a single RegExp to tokenize the block comment delimiters
    // we're also using a trick here because the only difference between a
    // block opener and a block closer is the leading `/` before `wp:` (and
    // a closer has no attributes). we can trap them both and process the
    // match back in JavaScript to see which one it was.
    var matches = tokenizer.exec(document); // We have no more tokens.

    if (null === matches) {
      return ['no-more-tokens', '', null, 0, 0];
    }

    var startedAt = matches.index;

    var _matches = _slicedToArray(matches, 7),
        match = _matches[0],
        closerMatch = _matches[1],
        namespaceMatch = _matches[2],
        nameMatch = _matches[3],
        attrsMatch
    /* Internal/unused. */
    = _matches[4],
        voidMatch = _matches[6];

    var length = match.length;
    var isCloser = !!closerMatch;
    var isVoid = !!voidMatch;
    var namespace = namespaceMatch || 'core/';
    var name = namespace + nameMatch;
    var hasAttrs = !!attrsMatch;
    var attrs = hasAttrs ? parseJSON(attrsMatch) : {}; // This state isn't allowed
    // This is an error.

    if (isCloser && (isVoid || hasAttrs)) {// We can ignore them since they don't hurt anything
      // we may warn against this at some point or reject it.
    }

    if (isVoid) {
      return ['void-block', name, attrs, startedAt, length];
    }

    if (isCloser) {
      return ['block-closer', name, null, startedAt, length];
    }

    return ['block-opener', name, attrs, startedAt, length];
  }
  /**
   * Adds a freeform block to the output.
   *
   * @param {number} [rawLength]
   */


  function addFreeform(rawLength) {
    var length = rawLength ? rawLength : document.length - offset;

    if (0 === length) {
      return;
    }

    output.push(Freeform(document.substr(offset, length)));
  }
  /**
   * Adds inner block to the parent block.
   *
   * @param {ParsedBlock} block
   * @param {number}      tokenStart
   * @param {number}      tokenLength
   * @param {number}      [lastOffset]
   */


  function addInnerBlock(block, tokenStart, tokenLength, lastOffset) {
    var parent = stack[stack.length - 1];
    parent.block.innerBlocks.push(block);
    var html = document.substr(parent.prevOffset, tokenStart - parent.prevOffset);

    if (html) {
      parent.block.innerHTML += html;
      parent.block.innerContent.push(html);
    }

    parent.block.innerContent.push(null);
    parent.prevOffset = lastOffset ? lastOffset : tokenStart + tokenLength;
  }
  /**
   * Adds block from the stack to the output.
   *
   * @param {number} [endOffset]
   */


  function addBlockFromStack(endOffset) {
    var _stack$pop =
    /** @type {ParsedFrame} */
    stack.pop(),
        block = _stack$pop.block,
        leadingHtmlStart = _stack$pop.leadingHtmlStart,
        prevOffset = _stack$pop.prevOffset,
        tokenStart = _stack$pop.tokenStart;

    var html = endOffset ? document.substr(prevOffset, endOffset - prevOffset) : document.substr(prevOffset);

    if (html) {
      block.innerHTML += html;
      block.innerContent.push(html);
    }

    if (null !== leadingHtmlStart) {
      output.push(Freeform(document.substr(leadingHtmlStart, tokenStart - leadingHtmlStart)));
    }

    output.push(block);
  }

  (window.wp = window.wp || {}).blockSerializationDefaultParser = __webpack_exports__;
  /******/
})();