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

  var __webpack_exports__ = {}; // ESM COMPAT FLAG

  __webpack_require__.r(__webpack_exports__); // EXPORTS


  __webpack_require__.d(__webpack_exports__, {
    ifViewportMatches: function ifViewportMatches() {
      return (
        /* reexport */
        if_viewport_matches
      );
    },
    store: function store() {
      return (
        /* reexport */
        _store
      );
    },
    withViewportMatch: function withViewportMatch() {
      return (
        /* reexport */
        with_viewport_match
      );
    }
  }); // NAMESPACE OBJECT: ./node_modules/@wordpress/viewport/build-module/store/actions.js


  var actions_namespaceObject = {};

  __webpack_require__.r(actions_namespaceObject);

  __webpack_require__.d(actions_namespaceObject, {
    setIsMatching: function setIsMatching() {
      return _setIsMatching;
    }
  }); // NAMESPACE OBJECT: ./node_modules/@wordpress/viewport/build-module/store/selectors.js


  var selectors_namespaceObject = {};

  __webpack_require__.r(selectors_namespaceObject);

  __webpack_require__.d(selectors_namespaceObject, {
    isViewportMatch: function isViewportMatch() {
      return _isViewportMatch;
    }
  });

  ; // CONCATENATED MODULE: external ["wp","compose"]

  var external_wp_compose_namespaceObject = window["wp"]["compose"];
  ; // CONCATENATED MODULE: external ["wp","data"]

  var external_wp_data_namespaceObject = window["wp"]["data"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/store/reducer.js

  /**
   * Reducer returning the viewport state, as keys of breakpoint queries with
   * boolean value representing whether query is matched.
   *
   * @param {Object} state  Current state.
   * @param {Object} action Dispatched action.
   *
   * @return {Object} Updated state.
   */

  function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_IS_MATCHING':
        return action.values;
    }

    return state;
  }
  /* harmony default export */


  var store_reducer = reducer;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/store/actions.js

  /**
   * Returns an action object used in signalling that viewport queries have been
   * updated. Values are specified as an object of breakpoint query keys where
   * value represents whether query matches.
   * Ignored from documentation as it is for internal use only.
   *
   * @ignore
   *
   * @param {Object} values Breakpoint query matches.
   *
   * @return {Object} Action object.
   */

  function _setIsMatching(values) {
    return {
      type: 'SET_IS_MATCHING',
      values: values
    };
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/store/selectors.js

  /**
   * Returns true if the viewport matches the given query, or false otherwise.
   *
   * @param {Object} state Viewport state object.
   * @param {string} query Query string. Includes operator and breakpoint name,
   *                       space separated. Operator defaults to >=.
   *
   * @example
   *
   * ```js
   * import { store as viewportStore } from '@wordpress/viewport';
   * import { useSelect } from '@wordpress/data';
   * import { __ } from '@wordpress/i18n';
   * const ExampleComponent = () => {
   *     const isMobile = useSelect(
   *         ( select ) => select( viewportStore ).isViewportMatch( '< small' ),
   *         []
   *     );
   *
   *     return isMobile ? (
   *         <div>{ __( 'Mobile' ) }</div>
   *     ) : (
   *         <div>{ __( 'Not Mobile' ) }</div>
   *     );
   * };
   * ```
   *
   * @return {boolean} Whether viewport matches query.
   */

  function _isViewportMatch(state, query) {
    // Default to `>=` if no operator is present.
    if (query.indexOf(' ') === -1) {
      query = '>= ' + query;
    }

    return !!state[query];
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/store/index.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  var STORE_NAME = 'core/viewport';
  /**
   * Store definition for the viewport namespace.
   *
   * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore
   *
   * @type {Object}
   */

  var _store = (0, external_wp_data_namespaceObject.createReduxStore)(STORE_NAME, {
    reducer: store_reducer,
    actions: actions_namespaceObject,
    selectors: selectors_namespaceObject
  });

  (0, external_wp_data_namespaceObject.register)(_store);
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/listener.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  var addDimensionsEventListener = function addDimensionsEventListener(breakpoints, operators) {
    /**
     * Callback invoked when media query state should be updated. Is invoked a
     * maximum of one time per call stack.
     */
    var setIsMatching = (0, external_wp_compose_namespaceObject.debounce)(function () {
      var values = Object.fromEntries(queries.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            query = _ref2[1];

        return [key, query.matches];
      }));
      (0, external_wp_data_namespaceObject.dispatch)(_store).setIsMatching(values);
    }, 0, {
      leading: true
    });
    /**
     * Hash of breakpoint names with generated MediaQueryList for corresponding
     * media query.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
     * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
     *
     * @type {Object<string,MediaQueryList>}
     */

    var operatorEntries = Object.entries(operators);
    var queries = Object.entries(breakpoints).flatMap(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          width = _ref4[1];

      return operatorEntries.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            operator = _ref6[0],
            condition = _ref6[1];

        var list = window.matchMedia("(".concat(condition, ": ").concat(width, "px)"));
        list.addEventListener('change', setIsMatching);
        return ["".concat(operator, " ").concat(name), list];
      });
    });
    window.addEventListener('orientationchange', setIsMatching); // Set initial values.

    setIsMatching();
    setIsMatching.flush();
  };
  /* harmony default export */


  var listener = addDimensionsEventListener;
  ; // CONCATENATED MODULE: external ["wp","element"]

  var external_wp_element_namespaceObject = window["wp"]["element"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/with-viewport-match.js

  /**
   * WordPress dependencies
   */

  /**
   * Higher-order component creator, creating a new component which renders with
   * the given prop names, where the value passed to the underlying component is
   * the result of the query assigned as the object's value.
   *
   * @see isViewportMatch
   *
   * @param {Object} queries Object of prop name to viewport query.
   *
   * @example
   *
   * ```jsx
   * function MyComponent( { isMobile } ) {
   * 	return (
   * 		<div>Currently: { isMobile ? 'Mobile' : 'Not Mobile' }</div>
   * 	);
   * }
   *
   * MyComponent = withViewportMatch( { isMobile: '< small' } )( MyComponent );
   * ```
   *
   * @return {Function} Higher-order component.
   */

  var withViewportMatch = function withViewportMatch(queries) {
    var queryEntries = Object.entries(queries);

    var useViewPortQueriesResult = function useViewPortQueriesResult() {
      return Object.fromEntries(queryEntries.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            key = _ref8[0],
            query = _ref8[1];

        var _query$split = query.split(' '),
            _query$split2 = _slicedToArray(_query$split, 2),
            operator = _query$split2[0],
            breakpointName = _query$split2[1];

        if (breakpointName === undefined) {
          breakpointName = operator;
          operator = '>=';
        } // Hooks should unconditionally execute in the same order,
        // we are respecting that as from the static query of the HOC we generate
        // a hook that calls other hooks always in the same order (because the query never changes).
        // eslint-disable-next-line react-hooks/rules-of-hooks


        return [key, (0, external_wp_compose_namespaceObject.useViewportMatch)(breakpointName, operator)];
      }));
    };

    return (0, external_wp_compose_namespaceObject.createHigherOrderComponent)(function (WrappedComponent) {
      return (0, external_wp_compose_namespaceObject.pure)(function (props) {
        var queriesResult = useViewPortQueriesResult();
        return (0, external_wp_element_namespaceObject.createElement)(WrappedComponent, _objectSpread({}, props, {}, queriesResult));
      });
    }, 'withViewportMatch');
  };
  /* harmony default export */


  var with_viewport_match = withViewportMatch;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/if-viewport-matches.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /**
   * Higher-order component creator, creating a new component which renders if
   * the viewport query is satisfied.
   *
   * @see withViewportMatches
   *
   * @param {string} query Viewport query.
   *
   * @example
   *
   * ```jsx
   * function MyMobileComponent() {
   * 	return <div>I'm only rendered on mobile viewports!</div>;
   * }
   *
   * MyMobileComponent = ifViewportMatches( '< small' )( MyMobileComponent );
   * ```
   *
   * @return {Function} Higher-order component.
   */

  var ifViewportMatches = function ifViewportMatches(query) {
    return (0, external_wp_compose_namespaceObject.createHigherOrderComponent)((0, external_wp_compose_namespaceObject.compose)([with_viewport_match({
      isViewportMatch: query
    }), (0, external_wp_compose_namespaceObject.ifCondition)(function (props) {
      return props.isViewportMatch;
    })]), 'ifViewportMatches');
  };
  /* harmony default export */


  var if_viewport_matches = ifViewportMatches;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/viewport/build-module/index.js

  /**
   * Internal dependencies
   */

  /**
   * Hash of breakpoint names with pixel width at which it becomes effective.
   *
   * @see _breakpoints.scss
   *
   * @type {Object}
   */

  var BREAKPOINTS = {
    huge: 1440,
    wide: 1280,
    large: 960,
    medium: 782,
    small: 600,
    mobile: 480
  };
  /**
   * Hash of query operators with corresponding condition for media query.
   *
   * @type {Object}
   */

  var OPERATORS = {
    '<': 'max-width',
    '>=': 'min-width'
  };
  listener(BREAKPOINTS, OPERATORS);
  (window.wp = window.wp || {}).viewport = __webpack_exports__;
  /******/
})();