"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    store: function store() {
      return (
        /* reexport */
        _store
      );
    }
  }); // NAMESPACE OBJECT: ./node_modules/@wordpress/notices/build-module/store/actions.js


  var actions_namespaceObject = {};

  __webpack_require__.r(actions_namespaceObject);

  __webpack_require__.d(actions_namespaceObject, {
    createErrorNotice: function createErrorNotice() {
      return _createErrorNotice;
    },
    createInfoNotice: function createInfoNotice() {
      return _createInfoNotice;
    },
    createNotice: function createNotice() {
      return _createNotice;
    },
    createSuccessNotice: function createSuccessNotice() {
      return _createSuccessNotice;
    },
    createWarningNotice: function createWarningNotice() {
      return _createWarningNotice;
    },
    removeAllNotices: function removeAllNotices() {
      return _removeAllNotices;
    },
    removeNotice: function removeNotice() {
      return _removeNotice;
    },
    removeNotices: function removeNotices() {
      return _removeNotices;
    }
  }); // NAMESPACE OBJECT: ./node_modules/@wordpress/notices/build-module/store/selectors.js


  var selectors_namespaceObject = {};

  __webpack_require__.r(selectors_namespaceObject);

  __webpack_require__.d(selectors_namespaceObject, {
    getNotices: function getNotices() {
      return _getNotices;
    }
  });

  ; // CONCATENATED MODULE: external ["wp","data"]

  var external_wp_data_namespaceObject = window["wp"]["data"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/notices/build-module/store/utils/on-sub-key.js

  /**
   * Higher-order reducer creator which creates a combined reducer object, keyed
   * by a property on the action object.
   *
   * @param {string} actionProperty Action property by which to key object.
   *
   * @return {Function} Higher-order reducer.
   */

  var onSubKey = function onSubKey(actionProperty) {
    return function (reducer) {
      return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments.length > 1 ? arguments[1] : undefined;
        // Retrieve subkey from action. Do not track if undefined; useful for cases
        // where reducer is scoped by action shape.
        var key = action[actionProperty];

        if (key === undefined) {
          return state;
        } // Avoid updating state if unchanged. Note that this also accounts for a
        // reducer which returns undefined on a key which is not yet tracked.


        var nextKeyState = reducer(state[key], action);

        if (nextKeyState === state[key]) {
          return state;
        }

        return _objectSpread({}, state, _defineProperty({}, key, nextKeyState));
      };
    };
  };
  /* harmony default export */


  var on_sub_key = onSubKey;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/notices/build-module/store/reducer.js

  /**
   * Internal dependencies
   */

  /**
   * Reducer returning the next notices state. The notices state is an object
   * where each key is a context, its value an array of notice objects.
   *
   * @param {Object} state  Current state.
   * @param {Object} action Dispatched action.
   *
   * @return {Object} Updated state.
   */

  var notices = on_sub_key('context')(function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'CREATE_NOTICE':
        // Avoid duplicates on ID.
        return [].concat(_toConsumableArray(state.filter(function (_ref) {
          var id = _ref.id;
          return id !== action.notice.id;
        })), [action.notice]);

      case 'REMOVE_NOTICE':
        return state.filter(function (_ref2) {
          var id = _ref2.id;
          return id !== action.id;
        });

      case 'REMOVE_NOTICES':
        return state.filter(function (_ref3) {
          var id = _ref3.id;
          return !action.ids.includes(id);
        });

      case 'REMOVE_ALL_NOTICES':
        return state.filter(function (_ref4) {
          var type = _ref4.type;
          return type !== action.noticeType;
        });
    }

    return state;
  });
  /* harmony default export */

  var reducer = notices;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/notices/build-module/store/constants.js

  /**
   * Default context to use for notice grouping when not otherwise specified. Its
   * specific value doesn't hold much meaning, but it must be reasonably unique
   * and, more importantly, referenced consistently in the store implementation.
   *
   * @type {string}
   */

  var DEFAULT_CONTEXT = 'global';
  /**
   * Default notice status.
   *
   * @type {string}
   */

  var DEFAULT_STATUS = 'info';
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/notices/build-module/store/actions.js

  /**
   * Internal dependencies
   */

  /**
   * @typedef {Object} WPNoticeAction Object describing a user action option associated with a notice.
   *
   * @property {string}    label   Message to use as action label.
   * @property {?string}   url     Optional URL of resource if action incurs
   *                               browser navigation.
   * @property {?Function} onClick Optional function to invoke when action is
   *                               triggered by user.
   */

  var uniqueId = 0;
  /**
   * Returns an action object used in signalling that a notice is to be created.
   *
   * @param {string|undefined}      status                       Notice status ("info" if undefined is passed).
   * @param {string}                content                      Notice message.
   * @param {Object}                [options]                    Notice options.
   * @param {string}                [options.context='global']   Context under which to
   *                                                             group notice.
   * @param {string}                [options.id]                 Identifier for notice.
   *                                                             Automatically assigned
   *                                                             if not specified.
   * @param {boolean}               [options.isDismissible=true] Whether the notice can
   *                                                             be dismissed by user.
   * @param {string}                [options.type='default']     Type of notice, one of
   *                                                             `default`, or `snackbar`.
   * @param {boolean}               [options.speak=true]         Whether the notice
   *                                                             content should be
   *                                                             announced to screen
   *                                                             readers.
   * @param {Array<WPNoticeAction>} [options.actions]            User actions to be
   *                                                             presented with notice.
   * @param {string}                [options.icon]               An icon displayed with the notice.
   *                                                             Only used when type is set to `snackbar`.
   * @param {boolean}               [options.explicitDismiss]    Whether the notice includes
   *                                                             an explicit dismiss button and
   *                                                             can't be dismissed by clicking
   *                                                             the body of the notice. Only applies
   *                                                             when type is set to `snackbar`.
   * @param {Function}              [options.onDismiss]          Called when the notice is dismissed.
   *
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * const ExampleComponent = () => {
   *     const { createNotice } = useDispatch( noticesStore );
   *     return (
   *         <Button
   *             onClick={ () => createNotice( 'success', __( 'Notice message' ) ) }
   *         >
   *             { __( 'Generate a success notice!' ) }
   *         </Button>
   *     );
   * };
   * ```
   *
   * @return {Object} Action object.
   */

  function _createNotice() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATUS;
    var content = arguments.length > 1 ? arguments[1] : undefined;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _options$speak = options.speak,
        speak = _options$speak === void 0 ? true : _options$speak,
        _options$isDismissibl = options.isDismissible,
        isDismissible = _options$isDismissibl === void 0 ? true : _options$isDismissibl,
        _options$context = options.context,
        context = _options$context === void 0 ? DEFAULT_CONTEXT : _options$context,
        _options$id = options.id,
        id = _options$id === void 0 ? "".concat(context).concat(++uniqueId) : _options$id,
        _options$actions = options.actions,
        actions = _options$actions === void 0 ? [] : _options$actions,
        _options$type = options.type,
        type = _options$type === void 0 ? 'default' : _options$type,
        __unstableHTML = options.__unstableHTML,
        _options$icon = options.icon,
        icon = _options$icon === void 0 ? null : _options$icon,
        _options$explicitDism = options.explicitDismiss,
        explicitDismiss = _options$explicitDism === void 0 ? false : _options$explicitDism,
        onDismiss = options.onDismiss; // The supported value shape of content is currently limited to plain text
    // strings. To avoid setting expectation that e.g. a WPElement could be
    // supported, cast to a string.

    content = String(content);
    return {
      type: 'CREATE_NOTICE',
      context: context,
      notice: {
        id: id,
        status: status,
        content: content,
        spokenMessage: speak ? content : null,
        __unstableHTML: __unstableHTML,
        isDismissible: isDismissible,
        actions: actions,
        type: type,
        icon: icon,
        explicitDismiss: explicitDismiss,
        onDismiss: onDismiss
      }
    };
  }
  /**
   * Returns an action object used in signalling that a success notice is to be
   * created. Refer to `createNotice` for options documentation.
   *
   * @see createNotice
   *
   * @param {string} content   Notice message.
   * @param {Object} [options] Optional notice options.
   *
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * const ExampleComponent = () => {
   *     const { createSuccessNotice } = useDispatch( noticesStore );
   *     return (
   *         <Button
   *             onClick={ () =>
   *                 createSuccessNotice( __( 'Success!' ), {
   *                     type: 'snackbar',
   *                     icon: '🔥',
   *                 } )
   *             }
   *         >
   *             { __( 'Generate a snackbar success notice!' ) }
   *        </Button>
   *     );
   * };
   * ```
   *
   * @return {Object} Action object.
   */


  function _createSuccessNotice(content, options) {
    return _createNotice('success', content, options);
  }
  /**
   * Returns an action object used in signalling that an info notice is to be
   * created. Refer to `createNotice` for options documentation.
   *
   * @see createNotice
   *
   * @param {string} content   Notice message.
   * @param {Object} [options] Optional notice options.
   *
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * const ExampleComponent = () => {
   *     const { createInfoNotice } = useDispatch( noticesStore );
   *     return (
   *         <Button
   *             onClick={ () =>
   *                createInfoNotice( __( 'Something happened!' ), {
   *                   isDismissible: false,
   *                } )
   *             }
   *         >
   *         { __( 'Generate a notice that cannot be dismissed.' ) }
   *       </Button>
   *       );
   * };
   *```
   *
   * @return {Object} Action object.
   */


  function _createInfoNotice(content, options) {
    return _createNotice('info', content, options);
  }
  /**
   * Returns an action object used in signalling that an error notice is to be
   * created. Refer to `createNotice` for options documentation.
   *
   * @see createNotice
   *
   * @param {string} content   Notice message.
   * @param {Object} [options] Optional notice options.
   *
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * const ExampleComponent = () => {
   *     const { createErrorNotice } = useDispatch( noticesStore );
   *     return (
   *         <Button
   *             onClick={ () =>
   *                 createErrorNotice( __( 'An error occurred!' ), {
   *                     type: 'snackbar',
   *                     explicitDismiss: true,
   *                 } )
   *             }
   *         >
   *             { __(
   *                 'Generate an snackbar error notice with explicit dismiss button.'
   *             ) }
   *         </Button>
   *     );
   * };
   * ```
   *
   * @return {Object} Action object.
   */


  function _createErrorNotice(content, options) {
    return _createNotice('error', content, options);
  }
  /**
   * Returns an action object used in signalling that a warning notice is to be
   * created. Refer to `createNotice` for options documentation.
   *
   * @see createNotice
   *
   * @param {string} content   Notice message.
   * @param {Object} [options] Optional notice options.
   *
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * const ExampleComponent = () => {
   *     const { createWarningNotice, createInfoNotice } = useDispatch( noticesStore );
   *     return (
   *         <Button
   *             onClick={ () =>
   *                 createWarningNotice( __( 'Warning!' ), {
   *                     onDismiss: () => {
   *                         createInfoNotice(
   *                             __( 'The warning has been dismissed!' )
   *                         );
   *                     },
   *                 } )
   *             }
   *         >
   *             { __( 'Generates a warning notice with onDismiss callback' ) }
   *         </Button>
   *     );
   * };
   * ```
   *
   * @return {Object} Action object.
   */


  function _createWarningNotice(content, options) {
    return _createNotice('warning', content, options);
  }
  /**
   * Returns an action object used in signalling that a notice is to be removed.
   *
   * @param {string} id                 Notice unique identifier.
   * @param {string} [context='global'] Optional context (grouping) in which the notice is
   *                                    intended to appear. Defaults to default context.
   *
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * const ExampleComponent = () => {
   *    const notices = useSelect( ( select ) => select( noticesStore ).getNotices() );
   *    const { createWarningNotice, removeNotice } = useDispatch( noticesStore );
   *
   *    return (
   *         <>
   *             <Button
   *                 onClick={ () =>
   *                     createWarningNotice( __( 'Warning!' ), {
   *                         isDismissible: false,
   *                     } )
   *                 }
   *             >
   *                 { __( 'Generate a notice' ) }
   *             </Button>
   *             { notices.length > 0 && (
   *                 <Button onClick={ () => removeNotice( notices[ 0 ].id ) }>
   *                     { __( 'Remove the notice' ) }
   *                 </Button>
   *             ) }
   *         </>
   *     );
   *};
   * ```
   *
   * @return {Object} Action object.
   */


  function _removeNotice(id) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CONTEXT;
    return {
      type: 'REMOVE_NOTICE',
      id: id,
      context: context
    };
  }
  /**
   * Removes all notices from a given context. Defaults to the default context.
   *
   * @param {string} noticeType The context to remove all notices from.
   * @param {string} context    The context to remove all notices from.
   *
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch, useSelect } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * export const ExampleComponent = () => {
   * 	const notices = useSelect( ( select ) =>
   * 		select( noticesStore ).getNotices()
   * 	);
   * 	const { removeNotices } = useDispatch( noticesStore );
   * 	return (
   * 		<>
   * 			<ul>
   * 				{ notices.map( ( notice ) => (
   * 					<li key={ notice.id }>{ notice.content }</li>
   * 				) ) }
   * 			</ul>
   * 			<Button
   * 				onClick={ () =>
   * 					removeAllNotices()
   * 				}
   * 			>
   * 				{ __( 'Clear all notices', 'woo-gutenberg-products-block' ) }
   * 			</Button>
   * 			<Button
   * 				onClick={ () =>
   * 					removeAllNotices( 'snackbar' )
   * 				}
   * 			>
   * 				{ __( 'Clear all snackbar notices', 'woo-gutenberg-products-block' ) }
   * 			</Button>
   * 		</>
   * 	);
   * };
   * ```
   *
   * @return {Object} 	   Action object.
   */


  function _removeAllNotices() {
    var noticeType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CONTEXT;
    return {
      type: 'REMOVE_ALL_NOTICES',
      noticeType: noticeType,
      context: context
    };
  }
  /**
   * Returns an action object used in signalling that several notices are to be removed.
   *
   * @param {string[]} ids                List of unique notice identifiers.
   * @param {string}   [context='global'] Optional context (grouping) in which the notices are
   *                                      intended to appear. Defaults to default context.
   * @example
   * ```js
   * import { __ } from '@wordpress/i18n';
   * import { useDispatch, useSelect } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   * import { Button } from '@wordpress/components';
   *
   * const ExampleComponent = () => {
   * 	const notices = useSelect( ( select ) =>
   * 		select( noticesStore ).getNotices()
   * 	);
   * 	const { removeNotices } = useDispatch( noticesStore );
   * 	return (
   * 		<>
   * 			<ul>
   * 				{ notices.map( ( notice ) => (
   * 					<li key={ notice.id }>{ notice.content }</li>
   * 				) ) }
   * 			</ul>
   * 			<Button
   * 				onClick={ () =>
   * 					removeNotices( notices.map( ( { id } ) => id ) )
   * 				}
   * 			>
   * 				{ __( 'Clear all notices' ) }
   * 			</Button>
   * 		</>
   * 	);
   * };
   * ```
   * @return {Object} Action object.
   */


  function _removeNotices(ids) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CONTEXT;
    return {
      type: 'REMOVE_NOTICES',
      ids: ids,
      context: context
    };
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/notices/build-module/store/selectors.js

  /**
   * Internal dependencies
   */

  /** @typedef {import('./actions').WPNoticeAction} WPNoticeAction */

  /**
   * The default empty set of notices to return when there are no notices
   * assigned for a given notices context. This can occur if the getNotices
   * selector is called without a notice ever having been created for the
   * context. A shared value is used to ensure referential equality between
   * sequential selector calls, since otherwise `[] !== []`.
   *
   * @type {Array}
   */

  var DEFAULT_NOTICES = [];
  /**
   * @typedef {Object} WPNotice Notice object.
   *
   * @property {string}           id             Unique identifier of notice.
   * @property {string}           status         Status of notice, one of `success`,
   *                                             `info`, `error`, or `warning`. Defaults
   *                                             to `info`.
   * @property {string}           content        Notice message.
   * @property {string}           spokenMessage  Audibly announced message text used by
   *                                             assistive technologies.
   * @property {string}           __unstableHTML Notice message as raw HTML. Intended to
   *                                             serve primarily for compatibility of
   *                                             server-rendered notices, and SHOULD NOT
   *                                             be used for notices. It is subject to
   *                                             removal without notice.
   * @property {boolean}          isDismissible  Whether the notice can be dismissed by
   *                                             user. Defaults to `true`.
   * @property {string}           type           Type of notice, one of `default`,
   *                                             or `snackbar`. Defaults to `default`.
   * @property {boolean}          speak          Whether the notice content should be
   *                                             announced to screen readers. Defaults to
   *                                             `true`.
   * @property {WPNoticeAction[]} actions        User actions to present with notice.
   */

  /**
   * Returns all notices as an array, optionally for a given context. Defaults to
   * the global context.
   *
   * @param {Object}  state   Notices state.
   * @param {?string} context Optional grouping context.
   *
   * @example
   *
   *```js
   * import { useSelect } from '@wordpress/data';
   * import { store as noticesStore } from '@wordpress/notices';
   *
   * const ExampleComponent = () => {
   *     const notices = useSelect( ( select ) => select( noticesStore ).getNotices() );
   *     return (
   *         <ul>
   *         { notices.map( ( notice ) => (
   *             <li key={ notice.ID }>{ notice.content }</li>
   *         ) ) }
   *        </ul>
   *    )
   * };
   *```
   *
   * @return {WPNotice[]} Array of notices.
   */

  function _getNotices(state) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CONTEXT;
    return state[context] || DEFAULT_NOTICES;
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/notices/build-module/store/index.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /**
   * Store definition for the notices namespace.
   *
   * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/data/README.md#createReduxStore
   */

  var _store = (0, external_wp_data_namespaceObject.createReduxStore)('core/notices', {
    reducer: reducer,
    actions: actions_namespaceObject,
    selectors: selectors_namespaceObject
  });

  (0, external_wp_data_namespaceObject.register)(_store);
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/notices/build-module/index.js

  (window.wp = window.wp || {}).notices = __webpack_exports__;
  /******/
})();