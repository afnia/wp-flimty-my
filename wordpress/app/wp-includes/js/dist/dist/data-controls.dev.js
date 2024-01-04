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

  var __webpack_exports__ = {}; // ESM COMPAT FLAG

  __webpack_require__.r(__webpack_exports__); // EXPORTS


  __webpack_require__.d(__webpack_exports__, {
    __unstableAwaitPromise: function __unstableAwaitPromise() {
      return (
        /* binding */
        _unstableAwaitPromise
      );
    },
    apiFetch: function apiFetch() {
      return (
        /* binding */
        _apiFetch
      );
    },
    controls: function controls() {
      return (
        /* binding */
        _controls
      );
    },
    dispatch: function dispatch() {
      return (
        /* binding */
        _dispatch
      );
    },
    select: function select() {
      return (
        /* binding */
        build_module_select
      );
    },
    syncSelect: function syncSelect() {
      return (
        /* binding */
        _syncSelect
      );
    }
  });

  ; // CONCATENATED MODULE: external ["wp","apiFetch"]

  var external_wp_apiFetch_namespaceObject = window["wp"]["apiFetch"];

  var external_wp_apiFetch_default =
  /*#__PURE__*/
  __webpack_require__.n(external_wp_apiFetch_namespaceObject);

  ; // CONCATENATED MODULE: external ["wp","data"]

  var external_wp_data_namespaceObject = window["wp"]["data"];
  ; // CONCATENATED MODULE: external ["wp","deprecated"]

  var external_wp_deprecated_namespaceObject = window["wp"]["deprecated"];

  var external_wp_deprecated_default =
  /*#__PURE__*/
  __webpack_require__.n(external_wp_deprecated_namespaceObject);

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/data-controls/build-module/index.js

  /**
   * WordPress dependencies
   */

  /**
   * Dispatches a control action for triggering an api fetch call.
   *
   * @param {Object} request Arguments for the fetch request.
   *
   * @example
   * ```js
   * import { apiFetch } from '@wordpress/data-controls';
   *
   * // Action generator using apiFetch
   * export function* myAction() {
   * 	const path = '/v2/my-api/items';
   * 	const items = yield apiFetch( { path } );
   * 	// do something with the items.
   * }
   * ```
   *
   * @return {Object} The control descriptor.
   */

  function _apiFetch(request) {
    return {
      type: 'API_FETCH',
      request: request
    };
  }
  /**
   * Control for resolving a selector in a registered data store.
   * Alias for the `resolveSelect` built-in control in the `@wordpress/data` package.
   *
   * @param storeNameOrDescriptor The store object or identifier.
   * @param selectorName          The selector name.
   * @param args                  Arguments passed without change to the `@wordpress/data` control.
   */


  function build_module_select(storeNameOrDescriptor, selectorName) {
    var _external_wp_data_nam;

    external_wp_deprecated_default()('`select` control in `@wordpress/data-controls`', {
      since: '5.7',
      alternative: 'built-in `resolveSelect` control in `@wordpress/data`'
    });

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return (_external_wp_data_nam = external_wp_data_namespaceObject.controls).resolveSelect.apply(_external_wp_data_nam, [storeNameOrDescriptor, selectorName].concat(args));
  }
  /**
   * Control for calling a selector in a registered data store.
   * Alias for the `select` built-in control in the `@wordpress/data` package.
   *
   * @param storeNameOrDescriptor The store object or identifier.
   * @param selectorName          The selector name.
   * @param args                  Arguments passed without change to the `@wordpress/data` control.
   */


  function _syncSelect(storeNameOrDescriptor, selectorName) {
    var _external_wp_data_nam2;

    external_wp_deprecated_default()('`syncSelect` control in `@wordpress/data-controls`', {
      since: '5.7',
      alternative: 'built-in `select` control in `@wordpress/data`'
    });

    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    return (_external_wp_data_nam2 = external_wp_data_namespaceObject.controls).select.apply(_external_wp_data_nam2, [storeNameOrDescriptor, selectorName].concat(args));
  }
  /**
   * Control for dispatching an action in a registered data store.
   * Alias for the `dispatch` control in the `@wordpress/data` package.
   *
   * @param storeNameOrDescriptor The store object or identifier.
   * @param actionName            The action name.
   * @param args                  Arguments passed without change to the `@wordpress/data` control.
   */


  function _dispatch(storeNameOrDescriptor, actionName) {
    var _external_wp_data_nam3;

    external_wp_deprecated_default()('`dispatch` control in `@wordpress/data-controls`', {
      since: '5.7',
      alternative: 'built-in `dispatch` control in `@wordpress/data`'
    });

    for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    return (_external_wp_data_nam3 = external_wp_data_namespaceObject.controls).dispatch.apply(_external_wp_data_nam3, [storeNameOrDescriptor, actionName].concat(args));
  }
  /**
   * Dispatches a control action for awaiting on a promise to be resolved.
   *
   * @param {Object} promise Promise to wait for.
   *
   * @example
   * ```js
   * import { __unstableAwaitPromise } from '@wordpress/data-controls';
   *
   * // Action generator using apiFetch
   * export function* myAction() {
   * 	const promise = getItemsAsync();
   * 	const items = yield __unstableAwaitPromise( promise );
   * 	// do something with the items.
   * }
   * ```
   *
   * @return {Object} The control descriptor.
   */


  var _unstableAwaitPromise = function _unstableAwaitPromise(promise) {
    return {
      type: 'AWAIT_PROMISE',
      promise: promise
    };
  };
  /**
   * The default export is what you use to register the controls with your custom
   * store.
   *
   * @example
   * ```js
   * // WordPress dependencies
   * import { controls } from '@wordpress/data-controls';
   * import { registerStore } from '@wordpress/data';
   *
   * // Internal dependencies
   * import reducer from './reducer';
   * import * as selectors from './selectors';
   * import * as actions from './actions';
   * import * as resolvers from './resolvers';
   *
   * registerStore( 'my-custom-store', {
   * reducer,
   * controls,
   * actions,
   * selectors,
   * resolvers,
   * } );
   * ```
   * @return {Object} An object for registering the default controls with the
   * store.
   */


  var _controls = {
    AWAIT_PROMISE: function AWAIT_PROMISE(_ref) {
      var promise = _ref.promise;
      return promise;
    },
    API_FETCH: function API_FETCH(_ref2) {
      var request = _ref2.request;
      return external_wp_apiFetch_default()(request);
    }
  };
  (window.wp = window.wp || {}).dataControls = __webpack_exports__;
  /******/
})();