"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/******/
(function () {
  // webpackBootstrap

  /******/
  var __webpack_modules__ = {
    /***/
    4403:
    /***/
    function _(module, exports) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
      /*!
      Copyright (c) 2018 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
      */

      /* global define */


      (function () {
        'use strict';

        var hasOwn = {}.hasOwnProperty;
        var nativeCodeString = '[native code]';

        function classNames() {
          var classes = [];

          for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg) continue;

            var argType = _typeof(arg);

            if (argType === 'string' || argType === 'number') {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames.apply(null, arg);

                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === 'object') {
              if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
                classes.push(arg.toString());
                continue;
              }

              for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
                }
              }
            }
          }

          return classes.join(' ');
        }

        if (true && module.exports) {
          classNames["default"] = classNames;
          module.exports = classNames;
        } else if (true) {
          // register as 'classnames', consistent with npm package name
          !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return classNames;
          }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
      })();
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
      BlockQuotation: function BlockQuotation() {
        return (
          /* reexport */
          _BlockQuotation
        );
      },
      Circle: function Circle() {
        return (
          /* reexport */
          _Circle
        );
      },
      Defs: function Defs() {
        return (
          /* reexport */
          _Defs
        );
      },
      G: function G() {
        return (
          /* reexport */
          _G
        );
      },
      HorizontalRule: function HorizontalRule() {
        return (
          /* reexport */
          _HorizontalRule
        );
      },
      Line: function Line() {
        return (
          /* reexport */
          _Line
        );
      },
      LinearGradient: function LinearGradient() {
        return (
          /* reexport */
          _LinearGradient
        );
      },
      Path: function Path() {
        return (
          /* reexport */
          _Path
        );
      },
      Polygon: function Polygon() {
        return (
          /* reexport */
          _Polygon
        );
      },
      RadialGradient: function RadialGradient() {
        return (
          /* reexport */
          _RadialGradient
        );
      },
      Rect: function Rect() {
        return (
          /* reexport */
          _Rect
        );
      },
      SVG: function SVG() {
        return (
          /* reexport */
          _SVG
        );
      },
      Stop: function Stop() {
        return (
          /* reexport */
          _Stop
        );
      },
      View: function View() {
        return (
          /* reexport */
          _View
        );
      }
    }); // EXTERNAL MODULE: ./node_modules/classnames/index.js


    var classnames = __webpack_require__(4403);

    var classnames_default =
    /*#__PURE__*/
    __webpack_require__.n(classnames);

    ; // CONCATENATED MODULE: external ["wp","element"]

    var external_wp_element_namespaceObject = window["wp"]["element"];
    ; // CONCATENATED MODULE: ./node_modules/@wordpress/primitives/build-module/svg/index.js

    /**
     * External dependencies
     */

    /**
     * WordPress dependencies
     */

    /** @typedef {{isPressed?: boolean} & import('react').ComponentPropsWithoutRef<'svg'>} SVGProps */

    /**
     * @param {import('react').ComponentPropsWithoutRef<'circle'>} props
     *
     * @return {JSX.Element} Circle component
     */

    var _Circle = function _Circle(props) {
      return (0, external_wp_element_namespaceObject.createElement)('circle', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'g'>} props
     *
     * @return {JSX.Element} G component
     */


    var _G = function _G(props) {
      return (0, external_wp_element_namespaceObject.createElement)('g', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'line'>} props
     *
     * @return {JSX.Element} Path component
     */


    var _Line = function _Line(props) {
      return (0, external_wp_element_namespaceObject.createElement)('line', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'path'>} props
     *
     * @return {JSX.Element} Path component
     */


    var _Path = function _Path(props) {
      return (0, external_wp_element_namespaceObject.createElement)('path', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'polygon'>} props
     *
     * @return {JSX.Element} Polygon component
     */


    var _Polygon = function _Polygon(props) {
      return (0, external_wp_element_namespaceObject.createElement)('polygon', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'rect'>} props
     *
     * @return {JSX.Element} Rect component
     */


    var _Rect = function _Rect(props) {
      return (0, external_wp_element_namespaceObject.createElement)('rect', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'defs'>} props
     *
     * @return {JSX.Element} Defs component
     */


    var _Defs = function _Defs(props) {
      return (0, external_wp_element_namespaceObject.createElement)('defs', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'radialGradient'>} props
     *
     * @return {JSX.Element} RadialGradient component
     */


    var _RadialGradient = function _RadialGradient(props) {
      return (0, external_wp_element_namespaceObject.createElement)('radialGradient', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'linearGradient'>} props
     *
     * @return {JSX.Element} LinearGradient component
     */


    var _LinearGradient = function _LinearGradient(props) {
      return (0, external_wp_element_namespaceObject.createElement)('linearGradient', props);
    };
    /**
     * @param {import('react').ComponentPropsWithoutRef<'stop'>} props
     *
     * @return {JSX.Element} Stop component
     */


    var _Stop = function _Stop(props) {
      return (0, external_wp_element_namespaceObject.createElement)('stop', props);
    };

    var _SVG = (0, external_wp_element_namespaceObject.forwardRef)(
    /**
     * @param {SVGProps}                                    props isPressed indicates whether the SVG should appear as pressed.
     *                                                            Other props will be passed through to svg component.
     * @param {import('react').ForwardedRef<SVGSVGElement>} ref   The forwarded ref to the SVG element.
     *
     * @return {JSX.Element} Stop component
     */
    function (_ref, ref) {
      var className = _ref.className,
          isPressed = _ref.isPressed,
          props = _objectWithoutProperties(_ref, ["className", "isPressed"]);

      var appliedProps = _objectSpread({}, props, {
        className: classnames_default()(className, {
          'is-pressed': isPressed
        }) || undefined,
        'aria-hidden': true,
        focusable: false
      }); // Disable reason: We need to have a way to render HTML tag for web.
      // eslint-disable-next-line react/forbid-elements


      return (0, external_wp_element_namespaceObject.createElement)("svg", _objectSpread({}, appliedProps, {
        ref: ref
      }));
    });

    _SVG.displayName = 'SVG';
    ; // CONCATENATED MODULE: ./node_modules/@wordpress/primitives/build-module/horizontal-rule/index.js

    var _HorizontalRule = 'hr';
    ; // CONCATENATED MODULE: ./node_modules/@wordpress/primitives/build-module/block-quotation/index.js

    var _BlockQuotation = 'blockquote';
    ; // CONCATENATED MODULE: ./node_modules/@wordpress/primitives/build-module/view/index.js

    var _View = 'div';
    ; // CONCATENATED MODULE: ./node_modules/@wordpress/primitives/build-module/index.js
  }();
  (window.wp = window.wp || {}).primitives = __webpack_exports__;
  /******/
})();