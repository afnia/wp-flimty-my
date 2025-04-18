"use strict";

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
        deprecated
      );
    }
  }); // UNUSED EXPORTS: logged


  ; // CONCATENATED MODULE: external ["wp","hooks"]

  var external_wp_hooks_namespaceObject = window["wp"]["hooks"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/deprecated/build-module/index.js

  /**
   * WordPress dependencies
   */

  /**
   * Object map tracking messages which have been logged, for use in ensuring a
   * message is only logged once.
   *
   * @type {Record<string, true | undefined>}
   */

  var logged = Object.create(null);
  /**
   * Logs a message to notify developers about a deprecated feature.
   *
   * @param {string} feature               Name of the deprecated feature.
   * @param {Object} [options]             Personalisation options
   * @param {string} [options.since]       Version in which the feature was deprecated.
   * @param {string} [options.version]     Version in which the feature will be removed.
   * @param {string} [options.alternative] Feature to use instead
   * @param {string} [options.plugin]      Plugin name if it's a plugin feature
   * @param {string} [options.link]        Link to documentation
   * @param {string} [options.hint]        Additional message to help transition away from the deprecated feature.
   *
   * @example
   * ```js
   * import deprecated from '@wordpress/deprecated';
   *
   * deprecated( 'Eating meat', {
   * 	since: '2019.01.01'
   * 	version: '2020.01.01',
   * 	alternative: 'vegetables',
   * 	plugin: 'the earth',
   * 	hint: 'You may find it beneficial to transition gradually.',
   * } );
   *
   * // Logs: 'Eating meat is deprecated since version 2019.01.01 and will be removed from the earth in version 2020.01.01. Please use vegetables instead. Note: You may find it beneficial to transition gradually.'
   * ```
   */

  function deprecated(feature) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var since = options.since,
        version = options.version,
        alternative = options.alternative,
        plugin = options.plugin,
        link = options.link,
        hint = options.hint;
    var pluginMessage = plugin ? " from ".concat(plugin) : '';
    var sinceMessage = since ? " since version ".concat(since) : '';
    var versionMessage = version ? " and will be removed".concat(pluginMessage, " in version ").concat(version) : '';
    var useInsteadMessage = alternative ? " Please use ".concat(alternative, " instead.") : '';
    var linkMessage = link ? " See: ".concat(link) : '';
    var hintMessage = hint ? " Note: ".concat(hint) : '';
    var message = "".concat(feature, " is deprecated").concat(sinceMessage).concat(versionMessage, ".").concat(useInsteadMessage).concat(linkMessage).concat(hintMessage); // Skip if already logged.

    if (message in logged) {
      return;
    }
    /**
     * Fires whenever a deprecated feature is encountered
     *
     * @param {string}  feature             Name of the deprecated feature.
     * @param {?Object} options             Personalisation options
     * @param {string}  options.since       Version in which the feature was deprecated.
     * @param {?string} options.version     Version in which the feature will be removed.
     * @param {?string} options.alternative Feature to use instead
     * @param {?string} options.plugin      Plugin name if it's a plugin feature
     * @param {?string} options.link        Link to documentation
     * @param {?string} options.hint        Additional message to help transition away from the deprecated feature.
     * @param {?string} message             Message sent to console.warn
     */


    (0, external_wp_hooks_namespaceObject.doAction)('deprecated', feature, options, message); // eslint-disable-next-line no-console

    console.warn(message);
    logged[message] = true;
  }
  /** @typedef {import('utility-types').NonUndefined<Parameters<typeof deprecated>[1]>} DeprecatedOptions */


  (window.wp = window.wp || {}).deprecated = __webpack_exports__["default"];
  /******/
})();