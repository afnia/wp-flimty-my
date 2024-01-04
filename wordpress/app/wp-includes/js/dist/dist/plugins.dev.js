"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
    PluginArea: function PluginArea() {
      return (
        /* reexport */
        plugin_area
      );
    },
    getPlugin: function getPlugin() {
      return (
        /* reexport */
        _getPlugin
      );
    },
    getPlugins: function getPlugins() {
      return (
        /* reexport */
        _getPlugins
      );
    },
    registerPlugin: function registerPlugin() {
      return (
        /* reexport */
        _registerPlugin
      );
    },
    unregisterPlugin: function unregisterPlugin() {
      return (
        /* reexport */
        _unregisterPlugin
      );
    },
    usePluginContext: function usePluginContext() {
      return (
        /* reexport */
        _usePluginContext
      );
    },
    withPluginContext: function withPluginContext() {
      return (
        /* reexport */
        _withPluginContext
      );
    }
  });

  ; // CONCATENATED MODULE: external ["wp","element"]

  var external_wp_element_namespaceObject = window["wp"]["element"];
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

  ; // CONCATENATED MODULE: external ["wp","hooks"]

  var external_wp_hooks_namespaceObject = window["wp"]["hooks"];
  ; // CONCATENATED MODULE: external ["wp","isShallowEqual"]

  var external_wp_isShallowEqual_namespaceObject = window["wp"]["isShallowEqual"];

  var external_wp_isShallowEqual_default =
  /*#__PURE__*/
  __webpack_require__.n(external_wp_isShallowEqual_namespaceObject);

  ; // CONCATENATED MODULE: external ["wp","compose"]

  var external_wp_compose_namespaceObject = window["wp"]["compose"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/plugins/build-module/components/plugin-context/index.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  var Context = (0, external_wp_element_namespaceObject.createContext)({
    name: null,
    icon: null
  });
  var PluginContextProvider = Context.Provider;
  /**
   * A hook that returns the plugin context.
   *
   * @return {PluginContext} Plugin context
   */

  function _usePluginContext() {
    return (0, external_wp_element_namespaceObject.useContext)(Context);
  }
  /**
   * A Higher Order Component used to inject Plugin context to the
   * wrapped component.
   *
   * @param  mapContextToProps Function called on every context change,
   *                           expected to return object of props to
   *                           merge with the component's own props.
   *
   * @return {WPComponent} Enhanced component with injected context as props.
   */


  var _withPluginContext = function _withPluginContext(mapContextToProps) {
    return (0, external_wp_compose_namespaceObject.createHigherOrderComponent)(function (OriginalComponent) {
      return function (props) {
        return (0, external_wp_element_namespaceObject.createElement)(Context.Consumer, null, function (context) {
          return (0, external_wp_element_namespaceObject.createElement)(OriginalComponent, _objectSpread({}, props, {}, mapContextToProps(context, props)));
        });
      };
    }, 'withPluginContext');
  };

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/plugins/build-module/components/plugin-error-boundary/index.js

  /**
   * WordPress dependencies
   */

  var PluginErrorBoundary =
  /*#__PURE__*/
  function (_external_wp_element_) {
    _inherits(PluginErrorBoundary, _external_wp_element_);

    /**
     * @param {Object} props
     */
    function PluginErrorBoundary(props) {
      var _this;

      _classCallCheck(this, PluginErrorBoundary);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PluginErrorBoundary).call(this, props));
      _this.state = {
        hasError: false
      };
      return _this;
    }

    _createClass(PluginErrorBoundary, [{
      key: "componentDidCatch",

      /**
       * @param {Error} error Error object passed by React.
       */
      value: function componentDidCatch(error) {
        var _this$props = this.props,
            name = _this$props.name,
            onError = _this$props.onError;

        if (onError) {
          onError(name, error);
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.state.hasError) {
          return this.props.children;
        }

        return null;
      }
    }], [{
      key: "getDerivedStateFromError",
      value: function getDerivedStateFromError() {
        return {
          hasError: true
        };
      }
    }]);

    return PluginErrorBoundary;
  }(external_wp_element_namespaceObject.Component);

  ; // CONCATENATED MODULE: external ["wp","primitives"]

  var external_wp_primitives_namespaceObject = window["wp"]["primitives"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/icons/build-module/library/plugins.js

  /**
   * WordPress dependencies
   */

  var plugins = (0, external_wp_element_namespaceObject.createElement)(external_wp_primitives_namespaceObject.SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, (0, external_wp_element_namespaceObject.createElement)(external_wp_primitives_namespaceObject.Path, {
    d: "M10.5 4v4h3V4H15v4h1.5a1 1 0 011 1v4l-3 4v2a1 1 0 01-1 1h-3a1 1 0 01-1-1v-2l-3-4V9a1 1 0 011-1H9V4h1.5zm.5 12.5v2h2v-2l3-4v-3H8v3l3 4z"
  }));
  /* harmony default export */

  var library_plugins = plugins;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/plugins/build-module/api/index.js

  /* eslint no-console: [ 'error', { allow: [ 'error' ] } ] */

  /**
   * WordPress dependencies
   */

  /**
   * Plugin definitions keyed by plugin name.
   */

  var api_plugins = {};
  /**
   * Registers a plugin to the editor.
   *
   * @param name     A string identifying the plugin. Must be
   *                 unique across all registered plugins.
   * @param settings The settings for this plugin.
   *
   * @example
   * ```js
   * // Using ES5 syntax
   * var el = wp.element.createElement;
   * var Fragment = wp.element.Fragment;
   * var PluginSidebar = wp.editPost.PluginSidebar;
   * var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
   * var registerPlugin = wp.plugins.registerPlugin;
   * var moreIcon = wp.element.createElement( 'svg' ); //... svg element.
   *
   * function Component() {
   * 	return el(
   * 		Fragment,
   * 		{},
   * 		el(
   * 			PluginSidebarMoreMenuItem,
   * 			{
   * 				target: 'sidebar-name',
   * 			},
   * 			'My Sidebar'
   * 		),
   * 		el(
   * 			PluginSidebar,
   * 			{
   * 				name: 'sidebar-name',
   * 				title: 'My Sidebar',
   * 			},
   * 			'Content of the sidebar'
   * 		)
   * 	);
   * }
   * registerPlugin( 'plugin-name', {
   * 	icon: moreIcon,
   * 	render: Component,
   * 	scope: 'my-page',
   * } );
   * ```
   *
   * @example
   * ```js
   * // Using ESNext syntax
   * import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
   * import { registerPlugin } from '@wordpress/plugins';
   * import { more } from '@wordpress/icons';
   *
   * const Component = () => (
   * 	<>
   * 		<PluginSidebarMoreMenuItem
   * 			target="sidebar-name"
   * 		>
   * 			My Sidebar
   * 		</PluginSidebarMoreMenuItem>
   * 		<PluginSidebar
   * 			name="sidebar-name"
   * 			title="My Sidebar"
   * 		>
   * 			Content of the sidebar
   * 		</PluginSidebar>
   * 	</>
   * );
   *
   * registerPlugin( 'plugin-name', {
   * 	icon: more,
   * 	render: Component,
   * 	scope: 'my-page',
   * } );
   * ```
   *
   * @return The final plugin settings object.
   */

  function _registerPlugin(name, settings) {
    if (_typeof(settings) !== 'object') {
      console.error('No settings object provided!');
      return null;
    }

    if (typeof name !== 'string') {
      console.error('Plugin name must be string.');
      return null;
    }

    if (!/^[a-z][a-z0-9-]*$/.test(name)) {
      console.error('Plugin name must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".');
      return null;
    }

    if (api_plugins[name]) {
      console.error("Plugin \"".concat(name, "\" is already registered."));
    }

    settings = (0, external_wp_hooks_namespaceObject.applyFilters)('plugins.registerPlugin', settings, name);
    var _settings = settings,
        render = _settings.render,
        scope = _settings.scope;

    if (typeof render !== 'function') {
      console.error('The "render" property must be specified and must be a valid function.');
      return null;
    }

    if (scope) {
      if (typeof scope !== 'string') {
        console.error('Plugin scope must be string.');
        return null;
      }

      if (!/^[a-z][a-z0-9-]*$/.test(scope)) {
        console.error('Plugin scope must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-page".');
        return null;
      }
    }

    api_plugins[name] = _objectSpread({
      name: name,
      icon: library_plugins
    }, settings);
    (0, external_wp_hooks_namespaceObject.doAction)('plugins.pluginRegistered', settings, name);
    return settings;
  }
  /**
   * Unregisters a plugin by name.
   *
   * @param name Plugin name.
   *
   * @example
   * ```js
   * // Using ES5 syntax
   * var unregisterPlugin = wp.plugins.unregisterPlugin;
   *
   * unregisterPlugin( 'plugin-name' );
   * ```
   *
   * @example
   * ```js
   * // Using ESNext syntax
   * import { unregisterPlugin } from '@wordpress/plugins';
   *
   * unregisterPlugin( 'plugin-name' );
   * ```
   *
   * @return The previous plugin settings object, if it has been
   *         successfully unregistered; otherwise `undefined`.
   */


  function _unregisterPlugin(name) {
    if (!api_plugins[name]) {
      console.error('Plugin "' + name + '" is not registered.');
      return;
    }

    var oldPlugin = api_plugins[name];
    delete api_plugins[name];
    (0, external_wp_hooks_namespaceObject.doAction)('plugins.pluginUnregistered', oldPlugin, name);
    return oldPlugin;
  }
  /**
   * Returns a registered plugin settings.
   *
   * @param name Plugin name.
   *
   * @return Plugin setting.
   */


  function _getPlugin(name) {
    return api_plugins[name];
  }
  /**
   * Returns all registered plugins without a scope or for a given scope.
   *
   * @param scope The scope to be used when rendering inside
   *              a plugin area. No scope by default.
   *
   * @return The list of plugins without a scope or for a given scope.
   */


  function _getPlugins(scope) {
    return Object.values(api_plugins).filter(function (plugin) {
      return plugin.scope === scope;
    });
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/plugins/build-module/components/plugin-area/index.js

  /**
   * External dependencies
   */

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  var getPluginContext = memize(function (icon, name) {
    return {
      icon: icon,
      name: name
    };
  });
  /**
   * A component that renders all plugin fills in a hidden div.
   *
   * @param  props
   * @param  props.scope
   * @param  props.onError
   * @example
   * ```js
   * // Using ES5 syntax
   * var el = wp.element.createElement;
   * var PluginArea = wp.plugins.PluginArea;
   *
   * function Layout() {
   * 	return el(
   * 		'div',
   * 		{ scope: 'my-page' },
   * 		'Content of the page',
   * 		PluginArea
   * 	);
   * }
   * ```
   *
   * @example
   * ```js
   * // Using ESNext syntax
   * import { PluginArea } from '@wordpress/plugins';
   *
   * const Layout = () => (
   * 	<div>
   * 		Content of the page
   * 		<PluginArea scope="my-page" />
   * 	</div>
   * );
   * ```
   *
   * @return {WPComponent} The component to be rendered.
   */

  function PluginArea(_ref) {
    var scope = _ref.scope,
        onError = _ref.onError;
    var store = (0, external_wp_element_namespaceObject.useMemo)(function () {
      var lastValue = [];
      return {
        subscribe: function subscribe(listener) {
          (0, external_wp_hooks_namespaceObject.addAction)('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered', listener);
          (0, external_wp_hooks_namespaceObject.addAction)('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered', listener);
          return function () {
            (0, external_wp_hooks_namespaceObject.removeAction)('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered');
            (0, external_wp_hooks_namespaceObject.removeAction)('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered');
          };
        },
        getValue: function getValue() {
          var nextValue = _getPlugins(scope);

          if (!external_wp_isShallowEqual_default()(lastValue, nextValue)) {
            lastValue = nextValue;
          }

          return lastValue;
        }
      };
    }, [scope]);
    var plugins = (0, external_wp_element_namespaceObject.useSyncExternalStore)(store.subscribe, store.getValue);
    return (0, external_wp_element_namespaceObject.createElement)("div", {
      style: {
        display: 'none'
      }
    }, plugins.map(function (_ref2) {
      var icon = _ref2.icon,
          name = _ref2.name,
          Plugin = _ref2.render;
      return (0, external_wp_element_namespaceObject.createElement)(PluginContextProvider, {
        key: name,
        value: getPluginContext(icon, name)
      }, (0, external_wp_element_namespaceObject.createElement)(PluginErrorBoundary, {
        name: name,
        onError: onError
      }, (0, external_wp_element_namespaceObject.createElement)(Plugin, null)));
    }));
  }
  /* harmony default export */


  var plugin_area = PluginArea;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/plugins/build-module/components/index.js

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/plugins/build-module/index.js

  (window.wp = window.wp || {}).plugins = __webpack_exports__;
  /******/
})();