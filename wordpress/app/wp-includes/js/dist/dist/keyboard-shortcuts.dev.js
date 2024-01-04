"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

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
    ShortcutProvider: function ShortcutProvider() {
      return (
        /* reexport */
        _ShortcutProvider
      );
    },
    __unstableUseShortcutEventMatch: function __unstableUseShortcutEventMatch() {
      return (
        /* reexport */
        useShortcutEventMatch
      );
    },
    store: function store() {
      return (
        /* reexport */
        _store
      );
    },
    useShortcut: function useShortcut() {
      return (
        /* reexport */
        _useShortcut
      );
    }
  }); // NAMESPACE OBJECT: ./node_modules/@wordpress/keyboard-shortcuts/build-module/store/actions.js


  var actions_namespaceObject = {};

  __webpack_require__.r(actions_namespaceObject);

  __webpack_require__.d(actions_namespaceObject, {
    registerShortcut: function registerShortcut() {
      return _registerShortcut;
    },
    unregisterShortcut: function unregisterShortcut() {
      return _unregisterShortcut;
    }
  }); // NAMESPACE OBJECT: ./node_modules/@wordpress/keyboard-shortcuts/build-module/store/selectors.js


  var selectors_namespaceObject = {};

  __webpack_require__.r(selectors_namespaceObject);

  __webpack_require__.d(selectors_namespaceObject, {
    getAllShortcutKeyCombinations: function getAllShortcutKeyCombinations() {
      return _getAllShortcutKeyCombinations;
    },
    getAllShortcutRawKeyCombinations: function getAllShortcutRawKeyCombinations() {
      return _getAllShortcutRawKeyCombinations;
    },
    getCategoryShortcuts: function getCategoryShortcuts() {
      return _getCategoryShortcuts;
    },
    getShortcutAliases: function getShortcutAliases() {
      return _getShortcutAliases;
    },
    getShortcutDescription: function getShortcutDescription() {
      return _getShortcutDescription;
    },
    getShortcutKeyCombination: function getShortcutKeyCombination() {
      return _getShortcutKeyCombination;
    },
    getShortcutRepresentation: function getShortcutRepresentation() {
      return _getShortcutRepresentation;
    }
  });

  ; // CONCATENATED MODULE: external ["wp","data"]

  var external_wp_data_namespaceObject = window["wp"]["data"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/store/reducer.js

  /**
   * Reducer returning the registered shortcuts
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
      case 'REGISTER_SHORTCUT':
        return _objectSpread({}, state, _defineProperty({}, action.name, {
          category: action.category,
          keyCombination: action.keyCombination,
          aliases: action.aliases,
          description: action.description
        }));

      case 'UNREGISTER_SHORTCUT':
        var _action$name = action.name,
            actionName = state[_action$name],
            remainingState = _objectWithoutProperties(state, [_action$name].map(_toPropertyKey));

        return remainingState;
    }

    return state;
  }
  /* harmony default export */


  var store_reducer = reducer;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/store/actions.js

  /** @typedef {import('@wordpress/keycodes').WPKeycodeModifier} WPKeycodeModifier */

  /**
   * Keyboard key combination.
   *
   * @typedef {Object} WPShortcutKeyCombination
   *
   * @property {string}                      character Character.
   * @property {WPKeycodeModifier|undefined} modifier  Modifier.
   */

  /**
   * Configuration of a registered keyboard shortcut.
   *
   * @typedef {Object} WPShortcutConfig
   *
   * @property {string}                     name           Shortcut name.
   * @property {string}                     category       Shortcut category.
   * @property {string}                     description    Shortcut description.
   * @property {WPShortcutKeyCombination}   keyCombination Shortcut key combination.
   * @property {WPShortcutKeyCombination[]} [aliases]      Shortcut aliases.
   */

  /**
   * Returns an action object used to register a new keyboard shortcut.
   *
   * @param {WPShortcutConfig} config Shortcut config.
   *
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect, useDispatch } from '@wordpress/data';
   * import { useEffect } from '@wordpress/element';
   * import { __ } from '@wordpress/i18n';
   *
   * const ExampleComponent = () => {
   *     const { registerShortcut } = useDispatch( keyboardShortcutsStore );
   *
   *     useEffect( () => {
   *         registerShortcut( {
   *             name: 'custom/my-custom-shortcut',
   *             category: 'my-category',
   *             description: __( 'My custom shortcut' ),
   *             keyCombination: {
   *                 modifier: 'primary',
   *                 character: 'j',
   *             },
   *         } );
   *     }, [] );
   *
   *     const shortcut = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getShortcutKeyCombination(
   *                 'custom/my-custom-shortcut'
   *             ),
   *         []
   *     );
   *
   *     return shortcut ? (
   *         <p>{ __( 'Shortcut is registered.' ) }</p>
   *     ) : (
   *         <p>{ __( 'Shortcut is not registered.' ) }</p>
   *     );
   * };
   *```
   * @return {Object} action.
   */

  function _registerShortcut(_ref) {
    var name = _ref.name,
        category = _ref.category,
        description = _ref.description,
        keyCombination = _ref.keyCombination,
        aliases = _ref.aliases;
    return {
      type: 'REGISTER_SHORTCUT',
      name: name,
      category: category,
      keyCombination: keyCombination,
      aliases: aliases,
      description: description
    };
  }
  /**
   * Returns an action object used to unregister a keyboard shortcut.
   *
   * @param {string} name Shortcut name.
   *
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect, useDispatch } from '@wordpress/data';
   * import { useEffect } from '@wordpress/element';
   * import { __ } from '@wordpress/i18n';
   *
   * const ExampleComponent = () => {
   *     const { unregisterShortcut } = useDispatch( keyboardShortcutsStore );
   *
   *     useEffect( () => {
   *         unregisterShortcut( 'core/edit-post/next-region' );
   *     }, [] );
   *
   *     const shortcut = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getShortcutKeyCombination(
   *                 'core/edit-post/next-region'
   *             ),
   *         []
   *     );
   *
   *     return shortcut ? (
   *         <p>{ __( 'Shortcut is not unregistered.' ) }</p>
   *     ) : (
   *         <p>{ __( 'Shortcut is unregistered.' ) }</p>
   *     );
   * };
   *```
   * @return {Object} action.
   */


  function _unregisterShortcut(name) {
    return {
      type: 'UNREGISTER_SHORTCUT',
      name: name
    };
  }

  ; // CONCATENATED MODULE: ./node_modules/rememo/rememo.js

  /** @typedef {(...args: any[]) => *[]} GetDependants */

  /** @typedef {() => void} Clear */

  /**
   * @typedef {{
   *   getDependants: GetDependants,
   *   clear: Clear
   * }} EnhancedSelector
   */

  /**
   * Internal cache entry.
   *
   * @typedef CacheNode
   *
   * @property {?CacheNode|undefined} [prev] Previous node.
   * @property {?CacheNode|undefined} [next] Next node.
   * @property {*[]} args Function arguments for cache entry.
   * @property {*} val Function result.
   */

  /**
   * @typedef Cache
   *
   * @property {Clear} clear Function to clear cache.
   * @property {boolean} [isUniqueByDependants] Whether dependants are valid in
   * considering cache uniqueness. A cache is unique if dependents are all arrays
   * or objects.
   * @property {CacheNode?} [head] Cache head.
   * @property {*[]} [lastDependants] Dependants from previous invocation.
   */

  /**
   * Arbitrary value used as key for referencing cache object in WeakMap tree.
   *
   * @type {{}}
   */

  var LEAF_KEY = {};
  /**
   * Returns the first argument as the sole entry in an array.
   *
   * @template T
   *
   * @param {T} value Value to return.
   *
   * @return {[T]} Value returned as entry in array.
   */

  function arrayOf(value) {
    return [value];
  }
  /**
   * Returns true if the value passed is object-like, or false otherwise. A value
   * is object-like if it can support property assignment, e.g. object or array.
   *
   * @param {*} value Value to test.
   *
   * @return {boolean} Whether value is object-like.
   */


  function isObjectLike(value) {
    return !!value && 'object' === _typeof(value);
  }
  /**
   * Creates and returns a new cache object.
   *
   * @return {Cache} Cache object.
   */


  function createCache() {
    /** @type {Cache} */
    var cache = {
      clear: function clear() {
        cache.head = null;
      }
    };
    return cache;
  }
  /**
   * Returns true if entries within the two arrays are strictly equal by
   * reference from a starting index.
   *
   * @param {*[]} a First array.
   * @param {*[]} b Second array.
   * @param {number} fromIndex Index from which to start comparison.
   *
   * @return {boolean} Whether arrays are shallowly equal.
   */


  function isShallowEqual(a, b, fromIndex) {
    var i;

    if (a.length !== b.length) {
      return false;
    }

    for (i = fromIndex; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }
  /**
   * Returns a memoized selector function. The getDependants function argument is
   * called before the memoized selector and is expected to return an immutable
   * reference or array of references on which the selector depends for computing
   * its own return value. The memoize cache is preserved only as long as those
   * dependant references remain the same. If getDependants returns a different
   * reference(s), the cache is cleared and the selector value regenerated.
   *
   * @template {(...args: *[]) => *} S
   *
   * @param {S} selector Selector function.
   * @param {GetDependants=} getDependants Dependant getter returning an array of
   * references used in cache bust consideration.
   */

  /* harmony default export */


  function rememo(selector, getDependants) {
    /** @type {WeakMap<*,*>} */
    var rootCache;
    /** @type {GetDependants} */

    var normalizedGetDependants = getDependants ? getDependants : arrayOf;
    /**
     * Returns the cache for a given dependants array. When possible, a WeakMap
     * will be used to create a unique cache for each set of dependants. This
     * is feasible due to the nature of WeakMap in allowing garbage collection
     * to occur on entries where the key object is no longer referenced. Since
     * WeakMap requires the key to be an object, this is only possible when the
     * dependant is object-like. The root cache is created as a hierarchy where
     * each top-level key is the first entry in a dependants set, the value a
     * WeakMap where each key is the next dependant, and so on. This continues
     * so long as the dependants are object-like. If no dependants are object-
     * like, then the cache is shared across all invocations.
     *
     * @see isObjectLike
     *
     * @param {*[]} dependants Selector dependants.
     *
     * @return {Cache} Cache object.
     */

    function getCache(dependants) {
      var caches = rootCache,
          isUniqueByDependants = true,
          i,
          dependant,
          map,
          cache;

      for (i = 0; i < dependants.length; i++) {
        dependant = dependants[i]; // Can only compose WeakMap from object-like key.

        if (!isObjectLike(dependant)) {
          isUniqueByDependants = false;
          break;
        } // Does current segment of cache already have a WeakMap?


        if (caches.has(dependant)) {
          // Traverse into nested WeakMap.
          caches = caches.get(dependant);
        } else {
          // Create, set, and traverse into a new one.
          map = new WeakMap();
          caches.set(dependant, map);
          caches = map;
        }
      } // We use an arbitrary (but consistent) object as key for the last item
      // in the WeakMap to serve as our running cache.


      if (!caches.has(LEAF_KEY)) {
        cache = createCache();
        cache.isUniqueByDependants = isUniqueByDependants;
        caches.set(LEAF_KEY, cache);
      }

      return caches.get(LEAF_KEY);
    }
    /**
     * Resets root memoization cache.
     */


    function clear() {
      rootCache = new WeakMap();
    }
    /* eslint-disable jsdoc/check-param-names */

    /**
     * The augmented selector call, considering first whether dependants have
     * changed before passing it to underlying memoize function.
     *
     * @param {*}    source    Source object for derivation.
     * @param {...*} extraArgs Additional arguments to pass to selector.
     *
     * @return {*} Selector result.
     */

    /* eslint-enable jsdoc/check-param-names */


    function callSelector()
    /* source, ...extraArgs */
    {
      var len = arguments.length,
          cache,
          node,
          i,
          args,
          dependants; // Create copy of arguments (avoid leaking deoptimization).

      args = new Array(len);

      for (i = 0; i < len; i++) {
        args[i] = arguments[i];
      }

      dependants = normalizedGetDependants.apply(null, args);
      cache = getCache(dependants); // If not guaranteed uniqueness by dependants (primitive type), shallow
      // compare against last dependants and, if references have changed,
      // destroy cache to recalculate result.

      if (!cache.isUniqueByDependants) {
        if (cache.lastDependants && !isShallowEqual(dependants, cache.lastDependants, 0)) {
          cache.clear();
        }

        cache.lastDependants = dependants;
      }

      node = cache.head;

      while (node) {
        // Check whether node arguments match arguments
        if (!isShallowEqual(node.args, args, 1)) {
          node = node.next;
          continue;
        } // At this point we can assume we've found a match
        // Surface matched node to head if not already


        if (node !== cache.head) {
          // Adjust siblings to point to each other.

          /** @type {CacheNode} */
          node.prev.next = node.next;

          if (node.next) {
            node.next.prev = node.prev;
          }

          node.next = cache.head;
          node.prev = null;
          /** @type {CacheNode} */

          cache.head.prev = node;
          cache.head = node;
        } // Return immediately


        return node.val;
      } // No cached value found. Continue to insertion phase:


      node =
      /** @type {CacheNode} */
      {
        // Generate the result from original function
        val: selector.apply(null, args)
      }; // Avoid including the source object in the cache.

      args[0] = null;
      node.args = args; // Don't need to check whether node is already head, since it would
      // have been returned above already if it was
      // Shift existing head down list

      if (cache.head) {
        cache.head.prev = node;
        node.next = cache.head;
      }

      cache.head = node;
      return node.val;
    }

    callSelector.getDependants = normalizedGetDependants;
    callSelector.clear = clear;
    clear();
    return (
      /** @type {S & EnhancedSelector} */
      callSelector
    );
  }

  ; // CONCATENATED MODULE: external ["wp","keycodes"]

  var external_wp_keycodes_namespaceObject = window["wp"]["keycodes"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/store/selectors.js

  /**
   * External dependencies
   */

  /**
   * WordPress dependencies
   */

  /** @typedef {import('./actions').WPShortcutKeyCombination} WPShortcutKeyCombination */

  /** @typedef {import('@wordpress/keycodes').WPKeycodeHandlerByModifier} WPKeycodeHandlerByModifier */

  /**
   * Shared reference to an empty array for cases where it is important to avoid
   * returning a new array reference on every invocation.
   *
   * @type {Array<any>}
   */

  var EMPTY_ARRAY = [];
  /**
   * Shortcut formatting methods.
   *
   * @property {WPKeycodeHandlerByModifier} display     Display formatting.
   * @property {WPKeycodeHandlerByModifier} rawShortcut Raw shortcut formatting.
   * @property {WPKeycodeHandlerByModifier} ariaLabel   ARIA label formatting.
   */

  var FORMATTING_METHODS = {
    display: external_wp_keycodes_namespaceObject.displayShortcut,
    raw: external_wp_keycodes_namespaceObject.rawShortcut,
    ariaLabel: external_wp_keycodes_namespaceObject.shortcutAriaLabel
  };
  /**
   * Returns a string representing the key combination.
   *
   * @param {?WPShortcutKeyCombination} shortcut       Key combination.
   * @param {keyof FORMATTING_METHODS}  representation Type of representation
   *                                                   (display, raw, ariaLabel).
   *
   * @return {string?} Shortcut representation.
   */

  function getKeyCombinationRepresentation(shortcut, representation) {
    if (!shortcut) {
      return null;
    }

    return shortcut.modifier ? FORMATTING_METHODS[representation][shortcut.modifier](shortcut.character) : shortcut.character;
  }
  /**
   * Returns the main key combination for a given shortcut name.
   *
   * @param {Object} state Global state.
   * @param {string} name  Shortcut name.
   *
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect } from '@wordpress/data';
   * import { createInterpolateElement } from '@wordpress/element';
   * import { sprintf } from '@wordpress/i18n';
   * const ExampleComponent = () => {
   *     const {character, modifier} = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getShortcutKeyCombination(
   *                 'core/edit-post/next-region'
   *             ),
   *         []
   *     );
   *
   *     return (
   *         <div>
   *             { createInterpolateElement(
   *                 sprintf(
   *                     'Character: <code>%s</code> / Modifier: <code>%s</code>',
   *                     character,
   *                     modifier
   *                 ),
   *                 {
   *                     code: <code />,
   *                 }
   *             ) }
   *         </div>
   *     );
   * };
   *```
   *
   * @return {WPShortcutKeyCombination?} Key combination.
   */


  function _getShortcutKeyCombination(state, name) {
    return state[name] ? state[name].keyCombination : null;
  }
  /**
   * Returns a string representing the main key combination for a given shortcut name.
   *
   * @param {Object}                   state          Global state.
   * @param {string}                   name           Shortcut name.
   * @param {keyof FORMATTING_METHODS} representation Type of representation
   *                                                  (display, raw, ariaLabel).
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect } from '@wordpress/data';
   * import { sprintf } from '@wordpress/i18n';
   *
   * const ExampleComponent = () => {
   *     const {display, raw, ariaLabel} = useSelect(
   *         ( select ) =>{
   *             return {
   *                 display: select( keyboardShortcutsStore ).getShortcutRepresentation('core/edit-post/next-region' ),
   *                 raw: select( keyboardShortcutsStore ).getShortcutRepresentation('core/edit-post/next-region','raw' ),
   *                 ariaLabel: select( keyboardShortcutsStore ).getShortcutRepresentation('core/edit-post/next-region', 'ariaLabel')
   *             }
   *         },
   *         []
   *     );
   *
   *     return (
   *         <ul>
   *             <li>{ sprintf( 'display string: %s', display ) }</li>
   *             <li>{ sprintf( 'raw string: %s', raw ) }</li>
   *             <li>{ sprintf( 'ariaLabel string: %s', ariaLabel ) }</li>
   *         </ul>
   *     );
   * };
   *```
   *
   * @return {string?} Shortcut representation.
   */


  function _getShortcutRepresentation(state, name) {
    var representation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'display';

    var shortcut = _getShortcutKeyCombination(state, name);

    return getKeyCombinationRepresentation(shortcut, representation);
  }
  /**
   * Returns the shortcut description given its name.
   *
   * @param {Object} state Global state.
   * @param {string} name  Shortcut name.
   *
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect } from '@wordpress/data';
   * import { __ } from '@wordpress/i18n';
   * const ExampleComponent = () => {
   *     const shortcutDescription = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getShortcutDescription( 'core/edit-post/next-region' ),
   *         []
   *     );
   *
   *     return shortcutDescription ? (
   *         <div>{ shortcutDescription }</div>
   *     ) : (
   *         <div>{ __( 'No description.' ) }</div>
   *     );
   * };
   *```
   * @return {string?} Shortcut description.
   */


  function _getShortcutDescription(state, name) {
    return state[name] ? state[name].description : null;
  }
  /**
   * Returns the aliases for a given shortcut name.
   *
   * @param {Object} state Global state.
   * @param {string} name  Shortcut name.
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect } from '@wordpress/data';
   * import { createInterpolateElement } from '@wordpress/element';
   * import { sprintf } from '@wordpress/i18n';
   * const ExampleComponent = () => {
   *     const shortcutAliases = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getShortcutAliases(
   *                 'core/edit-post/next-region'
   *             ),
   *         []
   *     );
   *
   *     return (
   *         shortcutAliases.length > 0 && (
   *             <ul>
   *                 { shortcutAliases.map( ( { character, modifier }, index ) => (
   *                     <li key={ index }>
   *                         { createInterpolateElement(
   *                             sprintf(
   *                                 'Character: <code>%s</code> / Modifier: <code>%s</code>',
   *                                 character,
   *                                 modifier
   *                             ),
   *                             {
   *                                 code: <code />,
   *                             }
   *                         ) }
   *                     </li>
   *                 ) ) }
   *             </ul>
   *         )
   *     );
   * };
   *```
   *
   * @return {WPShortcutKeyCombination[]} Key combinations.
   */


  function _getShortcutAliases(state, name) {
    return state[name] && state[name].aliases ? state[name].aliases : EMPTY_ARRAY;
  }
  /**
   * Returns the shortcuts that include aliases for a given shortcut name.
   *
   * @param {Object} state Global state.
   * @param {string} name  Shortcut name.
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect } from '@wordpress/data';
   * import { createInterpolateElement } from '@wordpress/element';
   * import { sprintf } from '@wordpress/i18n';
   *
   * const ExampleComponent = () => {
   *     const allShortcutKeyCombinations = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getAllShortcutKeyCombinations(
   *                 'core/edit-post/next-region'
   *             ),
   *         []
   *     );
   *
   *     return (
   *         allShortcutKeyCombinations.length > 0 && (
   *             <ul>
   *                 { allShortcutKeyCombinations.map(
   *                     ( { character, modifier }, index ) => (
   *                         <li key={ index }>
   *                             { createInterpolateElement(
   *                                 sprintf(
   *                                     'Character: <code>%s</code> / Modifier: <code>%s</code>',
   *                                     character,
   *                                     modifier
   *                                 ),
   *                                 {
   *                                     code: <code />,
   *                                 }
   *                             ) }
   *                         </li>
   *                     )
   *                 ) }
   *             </ul>
   *         )
   *     );
   * };
   *```
   *
   * @return {WPShortcutKeyCombination[]} Key combinations.
   */


  var _getAllShortcutKeyCombinations = rememo(function (state, name) {
    return [_getShortcutKeyCombination(state, name)].concat(_toConsumableArray(_getShortcutAliases(state, name))).filter(Boolean);
  }, function (state, name) {
    return [state[name]];
  });
  /**
   * Returns the raw representation of all the keyboard combinations of a given shortcut name.
   *
   * @param {Object} state Global state.
   * @param {string} name  Shortcut name.
   *
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect } from '@wordpress/data';
   * import { createInterpolateElement } from '@wordpress/element';
   * import { sprintf } from '@wordpress/i18n';
   *
   * const ExampleComponent = () => {
   *     const allShortcutRawKeyCombinations = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getAllShortcutRawKeyCombinations(
   *                 'core/edit-post/next-region'
   *             ),
   *         []
   *     );
   *
   *     return (
   *         allShortcutRawKeyCombinations.length > 0 && (
   *             <ul>
   *                 { allShortcutRawKeyCombinations.map(
   *                     ( shortcutRawKeyCombination, index ) => (
   *                         <li key={ index }>
   *                             { createInterpolateElement(
   *                                 sprintf(
   *                                     ' <code>%s</code>',
   *                                     shortcutRawKeyCombination
   *                                 ),
   *                                 {
   *                                     code: <code />,
   *                                 }
   *                             ) }
   *                         </li>
   *                     )
   *                 ) }
   *             </ul>
   *         )
   *     );
   * };
   *```
   *
   * @return {string[]} Shortcuts.
   */


  var _getAllShortcutRawKeyCombinations = rememo(function (state, name) {
    return _getAllShortcutKeyCombinations(state, name).map(function (combination) {
      return getKeyCombinationRepresentation(combination, 'raw');
    });
  }, function (state, name) {
    return [state[name]];
  });
  /**
   * Returns the shortcut names list for a given category name.
   *
   * @param {Object} state Global state.
   * @param {string} name  Category name.
   * @example
   *
   *```js
   * import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
   * import { useSelect } from '@wordpress/data';
   *
   * const ExampleComponent = () => {
   *     const categoryShortcuts = useSelect(
   *         ( select ) =>
   *             select( keyboardShortcutsStore ).getCategoryShortcuts(
   *                 'block'
   *             ),
   *         []
   *     );
   *
   *     return (
   *         categoryShortcuts.length > 0 && (
   *             <ul>
   *                 { categoryShortcuts.map( ( categoryShortcut ) => (
   *                     <li key={ categoryShortcut }>{ categoryShortcut }</li>
   *                 ) ) }
   *             </ul>
   *         )
   *     );
   * };
   *```
   * @return {string[]} Shortcut names.
   */


  var _getCategoryShortcuts = rememo(function (state, categoryName) {
    return Object.entries(state).filter(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          shortcut = _ref3[1];

      return shortcut.category === categoryName;
    }).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
          name = _ref5[0];

      return name;
    });
  }, function (state) {
    return [state];
  });

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/store/index.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  var STORE_NAME = 'core/keyboard-shortcuts';
  /**
   * Store definition for the keyboard shortcuts namespace.
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
  ; // CONCATENATED MODULE: external ["wp","element"]

  var external_wp_element_namespaceObject = window["wp"]["element"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/hooks/use-shortcut-event-match.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /**
   * Returns a function to check if a keyboard event matches a shortcut name.
   *
   * @return {Function} A function to check if a keyboard event matches a
   *                    predefined shortcut combination.
   */

  function useShortcutEventMatch() {
    var _ref6 = (0, external_wp_data_namespaceObject.useSelect)(_store),
        getAllShortcutKeyCombinations = _ref6.getAllShortcutKeyCombinations;
    /**
     * A function to check if a keyboard event matches a predefined shortcut
     * combination.
     *
     * @param {string}        name  Shortcut name.
     * @param {KeyboardEvent} event Event to check.
     *
     * @return {boolean} True if the event matches any shortcuts, false if not.
     */


    function isMatch(name, event) {
      return getAllShortcutKeyCombinations(name).some(function (_ref7) {
        var modifier = _ref7.modifier,
            character = _ref7.character;
        return external_wp_keycodes_namespaceObject.isKeyboardEvent[modifier](event, character);
      });
    }

    return isMatch;
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/context.js

  /**
   * WordPress dependencies
   */

  var globalShortcuts = new Set();

  var globalListener = function globalListener(event) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = globalShortcuts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var keyboardShortcut = _step.value;
        keyboardShortcut(event);
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
  };

  var context = (0, external_wp_element_namespaceObject.createContext)({
    add: function add(shortcut) {
      if (globalShortcuts.size === 0) {
        document.addEventListener('keydown', globalListener);
      }

      globalShortcuts.add(shortcut);
    },
    "delete": function _delete(shortcut) {
      globalShortcuts["delete"](shortcut);

      if (globalShortcuts.size === 0) {
        document.removeEventListener('keydown', globalListener);
      }
    }
  });
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/hooks/use-shortcut.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /**
   * Attach a keyboard shortcut handler.
   *
   * @param {string}   name               Shortcut name.
   * @param {Function} callback           Shortcut callback.
   * @param {Object}   options            Shortcut options.
   * @param {boolean}  options.isDisabled Whether to disable to shortut.
   */

  function _useShortcut(name, callback) {
    var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref8$isDisabled = _ref8.isDisabled,
        isDisabled = _ref8$isDisabled === void 0 ? false : _ref8$isDisabled;

    var shortcuts = (0, external_wp_element_namespaceObject.useContext)(context);
    var isMatch = useShortcutEventMatch();
    var callbackRef = (0, external_wp_element_namespaceObject.useRef)();
    (0, external_wp_element_namespaceObject.useEffect)(function () {
      callbackRef.current = callback;
    }, [callback]);
    (0, external_wp_element_namespaceObject.useEffect)(function () {
      if (isDisabled) {
        return;
      }

      function _callback(event) {
        if (isMatch(name, event)) {
          callbackRef.current(event);
        }
      }

      shortcuts.add(_callback);
      return function () {
        shortcuts["delete"](_callback);
      };
    }, [name, isDisabled, shortcuts]);
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/components/shortcut-provider.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  var Provider = context.Provider;
  /**
   * Handles callbacks added to context by `useShortcut`.
   * Adding a provider allows to register contextual shortcuts
   * that are only active when a certain part of the UI is focused.
   *
   * @param {Object} props Props to pass to `div`.
   *
   * @return {import('@wordpress/element').WPElement} Component.
   */

  function _ShortcutProvider(props) {
    var _ref9 = (0, external_wp_element_namespaceObject.useState)(function () {
      return new Set();
    }),
        _ref10 = _slicedToArray(_ref9, 1),
        keyboardShortcuts = _ref10[0];

    function onKeyDown(event) {
      if (props.onKeyDown) props.onKeyDown(event);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = keyboardShortcuts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var keyboardShortcut = _step2.value;
          keyboardShortcut(event);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions */


    return (0, external_wp_element_namespaceObject.createElement)(Provider, {
      value: keyboardShortcuts
    }, (0, external_wp_element_namespaceObject.createElement)("div", _objectSpread({}, props, {
      onKeyDown: onKeyDown
    })));
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/keyboard-shortcuts/build-module/index.js

  (window.wp = window.wp || {}).keyboardShortcuts = __webpack_exports__;
  /******/
})();