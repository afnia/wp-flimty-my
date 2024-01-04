"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

  /************************************************************************/

  var __webpack_exports__ = {}; // EXPORTS

  __webpack_require__.d(__webpack_exports__, {
    "default": function _default() {
      return (
        /* binding */
        build_module
      );
    }
  });

  ; // CONCATENATED MODULE: external ["wp","i18n"]

  var external_wp_i18n_namespaceObject = window["wp"]["i18n"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js

  /**
   * @param {string} nonce
   * @return {import('../types').APIFetchMiddleware & { nonce: string }} A middleware to enhance a request with a nonce.
   */

  function createNonceMiddleware(nonce) {
    /**
     * @type {import('../types').APIFetchMiddleware & { nonce: string }}
     */
    var middleware = function middleware(options, next) {
      var _options$headers = options.headers,
          headers = _options$headers === void 0 ? {} : _options$headers; // If an 'X-WP-Nonce' header (or any case-insensitive variation
      // thereof) was specified, no need to add a nonce header.

      for (var headerName in headers) {
        if (headerName.toLowerCase() === 'x-wp-nonce' && headers[headerName] === middleware.nonce) {
          return next(options);
        }
      }

      return next(_objectSpread({}, options, {
        headers: _objectSpread({}, headers, {
          'X-WP-Nonce': middleware.nonce
        })
      }));
    };

    middleware.nonce = nonce;
    return middleware;
  }
  /* harmony default export */


  var nonce = createNonceMiddleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js

  /**
   * @type {import('../types').APIFetchMiddleware}
   */

  var namespaceAndEndpointMiddleware = function namespaceAndEndpointMiddleware(options, next) {
    var path = options.path;
    var namespaceTrimmed, endpointTrimmed;

    if (typeof options.namespace === 'string' && typeof options.endpoint === 'string') {
      namespaceTrimmed = options.namespace.replace(/^\/|\/$/g, '');
      endpointTrimmed = options.endpoint.replace(/^\//, '');

      if (endpointTrimmed) {
        path = namespaceTrimmed + '/' + endpointTrimmed;
      } else {
        path = namespaceTrimmed;
      }
    }

    delete options.namespace;
    delete options.endpoint;
    return next(_objectSpread({}, options, {
      path: path
    }));
  };
  /* harmony default export */


  var namespace_endpoint = namespaceAndEndpointMiddleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js

  /**
   * Internal dependencies
   */

  /**
   * @param {string} rootURL
   * @return {import('../types').APIFetchMiddleware} Root URL middleware.
   */

  var createRootURLMiddleware = function createRootURLMiddleware(rootURL) {
    return function (options, next) {
      return namespace_endpoint(options, function (optionsWithPath) {
        var url = optionsWithPath.url;
        var path = optionsWithPath.path;
        var apiRoot;

        if (typeof path === 'string') {
          apiRoot = rootURL;

          if (-1 !== rootURL.indexOf('?')) {
            path = path.replace('?', '&');
          }

          path = path.replace(/^\//, ''); // API root may already include query parameter prefix if site is
          // configured to use plain permalinks.

          if ('string' === typeof apiRoot && -1 !== apiRoot.indexOf('?')) {
            path = path.replace('?', '&');
          }

          url = apiRoot + path;
        }

        return next(_objectSpread({}, optionsWithPath, {
          url: url
        }));
      });
    };
  };
  /* harmony default export */


  var root_url = createRootURLMiddleware;
  ; // CONCATENATED MODULE: external ["wp","url"]

  var external_wp_url_namespaceObject = window["wp"]["url"];
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js

  /**
   * WordPress dependencies
   */

  /**
   * @param {Record<string, any>} preloadedData
   * @return {import('../types').APIFetchMiddleware} Preloading middleware.
   */

  function createPreloadingMiddleware(preloadedData) {
    var cache = Object.fromEntries(Object.entries(preloadedData).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          path = _ref2[0],
          data = _ref2[1];

      return [(0, external_wp_url_namespaceObject.normalizePath)(path), data];
    }));
    return function (options, next) {
      var _options$parse = options.parse,
          parse = _options$parse === void 0 ? true : _options$parse;
      /** @type {string | void} */

      var rawPath = options.path;

      if (!rawPath && options.url) {
        var _ref3 = (0, external_wp_url_namespaceObject.getQueryArgs)(options.url),
            pathFromQuery = _ref3.rest_route,
            queryArgs = _objectWithoutProperties(_ref3, ["rest_route"]);

        if (typeof pathFromQuery === 'string') {
          rawPath = (0, external_wp_url_namespaceObject.addQueryArgs)(pathFromQuery, queryArgs);
        }
      }

      if (typeof rawPath !== 'string') {
        return next(options);
      }

      var method = options.method || 'GET';
      var path = (0, external_wp_url_namespaceObject.normalizePath)(rawPath);

      if ('GET' === method && cache[path]) {
        var cacheData = cache[path]; // Unsetting the cache key ensures that the data is only used a single time.

        delete cache[path];
        return prepareResponse(cacheData, !!parse);
      } else if ('OPTIONS' === method && cache[method] && cache[method][path]) {
        var _cacheData = cache[method][path]; // Unsetting the cache key ensures that the data is only used a single time.

        delete cache[method][path];
        return prepareResponse(_cacheData, !!parse);
      }

      return next(options);
    };
  }
  /**
   * This is a helper function that sends a success response.
   *
   * @param {Record<string, any>} responseData
   * @param {boolean}             parse
   * @return {Promise<any>} Promise with the response.
   */


  function prepareResponse(responseData, parse) {
    return Promise.resolve(parse ? responseData.body : new window.Response(JSON.stringify(responseData.body), {
      status: 200,
      statusText: 'OK',
      headers: responseData.headers
    }));
  }
  /* harmony default export */


  var preloading = createPreloadingMiddleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /**
   * Apply query arguments to both URL and Path, whichever is present.
   *
   * @param {import('../types').APIFetchOptions} props
   * @param {Record<string, string | number>}    queryArgs
   * @return {import('../types').APIFetchOptions} The request with the modified query args
   */

  var modifyQuery = function modifyQuery(_ref4, queryArgs) {
    var path = _ref4.path,
        url = _ref4.url,
        options = _objectWithoutProperties(_ref4, ["path", "url"]);

    return _objectSpread({}, options, {
      url: url && (0, external_wp_url_namespaceObject.addQueryArgs)(url, queryArgs),
      path: path && (0, external_wp_url_namespaceObject.addQueryArgs)(path, queryArgs)
    });
  };
  /**
   * Duplicates parsing functionality from apiFetch.
   *
   * @param {Response} response
   * @return {Promise<any>} Parsed response json.
   */


  var parseResponse = function parseResponse(response) {
    return response.json ? response.json() : Promise.reject(response);
  };
  /**
   * @param {string | null} linkHeader
   * @return {{ next?: string }} The parsed link header.
   */


  var parseLinkHeader = function parseLinkHeader(linkHeader) {
    if (!linkHeader) {
      return {};
    }

    var match = linkHeader.match(/<([^>]+)>; rel="next"/);
    return match ? {
      next: match[1]
    } : {};
  };
  /**
   * @param {Response} response
   * @return {string | undefined} The next page URL.
   */


  var getNextPageUrl = function getNextPageUrl(response) {
    var _parseLinkHeader = parseLinkHeader(response.headers.get('link')),
        next = _parseLinkHeader.next;

    return next;
  };
  /**
   * @param {import('../types').APIFetchOptions} options
   * @return {boolean} True if the request contains an unbounded query.
   */


  var requestContainsUnboundedQuery = function requestContainsUnboundedQuery(options) {
    var pathIsUnbounded = !!options.path && options.path.indexOf('per_page=-1') !== -1;
    var urlIsUnbounded = !!options.url && options.url.indexOf('per_page=-1') !== -1;
    return pathIsUnbounded || urlIsUnbounded;
  };
  /**
   * The REST API enforces an upper limit on the per_page option. To handle large
   * collections, apiFetch consumers can pass `per_page=-1`; this middleware will
   * then recursively assemble a full response array from all available pages.
   *
   * @type {import('../types').APIFetchMiddleware}
   */


  var fetchAllMiddleware = function fetchAllMiddleware(options, next) {
    var response, results, nextPage, mergedResults, nextResponse, nextResults;
    return regeneratorRuntime.async(function fetchAllMiddleware$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(options.parse === false)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next(options));

          case 2:
            if (requestContainsUnboundedQuery(options)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", next(options));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(build_module(_objectSpread({}, modifyQuery(options, {
              per_page: 100
            }), {
              // Ensure headers are returned for page 1.
              parse: false
            })));

          case 6:
            response = _context.sent;
            _context.next = 9;
            return regeneratorRuntime.awrap(parseResponse(response));

          case 9:
            results = _context.sent;

            if (Array.isArray(results)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", results);

          case 12:
            nextPage = getNextPageUrl(response);

            if (nextPage) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", results);

          case 15:
            // Iteratively fetch all remaining pages until no "next" header is found.
            mergedResults =
            /** @type {any[]} */
            [].concat(results);

          case 16:
            if (!nextPage) {
              _context.next = 27;
              break;
            }

            _context.next = 19;
            return regeneratorRuntime.awrap(build_module(_objectSpread({}, options, {
              // Ensure the URL for the next page is used instead of any provided path.
              path: undefined,
              url: nextPage,
              // Ensure we still get headers so we can identify the next page.
              parse: false
            })));

          case 19:
            nextResponse = _context.sent;
            _context.next = 22;
            return regeneratorRuntime.awrap(parseResponse(nextResponse));

          case 22:
            nextResults = _context.sent;
            mergedResults = mergedResults.concat(nextResults);
            nextPage = getNextPageUrl(nextResponse);
            _context.next = 16;
            break;

          case 27:
            return _context.abrupt("return", mergedResults);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    });
  };
  /* harmony default export */


  var fetch_all_middleware = fetchAllMiddleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js

  /**
   * Set of HTTP methods which are eligible to be overridden.
   *
   * @type {Set<string>}
   */

  var OVERRIDE_METHODS = new Set(['PATCH', 'PUT', 'DELETE']);
  /**
   * Default request method.
   *
   * "A request has an associated method (a method). Unless stated otherwise it
   * is `GET`."
   *
   * @see  https://fetch.spec.whatwg.org/#requests
   *
   * @type {string}
   */

  var DEFAULT_METHOD = 'GET';
  /**
   * API Fetch middleware which overrides the request method for HTTP v1
   * compatibility leveraging the REST API X-HTTP-Method-Override header.
   *
   * @type {import('../types').APIFetchMiddleware}
   */

  var httpV1Middleware = function httpV1Middleware(options, next) {
    var _options = options,
        _options$method = _options.method,
        method = _options$method === void 0 ? DEFAULT_METHOD : _options$method;

    if (OVERRIDE_METHODS.has(method.toUpperCase())) {
      options = _objectSpread({}, options, {
        headers: _objectSpread({}, options.headers, {
          'X-HTTP-Method-Override': method,
          'Content-Type': 'application/json'
        }),
        method: 'POST'
      });
    }

    return next(options);
  };
  /* harmony default export */


  var http_v1 = httpV1Middleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js

  /**
   * WordPress dependencies
   */

  /**
   * @type {import('../types').APIFetchMiddleware}
   */

  var userLocaleMiddleware = function userLocaleMiddleware(options, next) {
    if (typeof options.url === 'string' && !(0, external_wp_url_namespaceObject.hasQueryArg)(options.url, '_locale')) {
      options.url = (0, external_wp_url_namespaceObject.addQueryArgs)(options.url, {
        _locale: 'user'
      });
    }

    if (typeof options.path === 'string' && !(0, external_wp_url_namespaceObject.hasQueryArg)(options.path, '_locale')) {
      options.path = (0, external_wp_url_namespaceObject.addQueryArgs)(options.path, {
        _locale: 'user'
      });
    }

    return next(options);
  };
  /* harmony default export */


  var user_locale = userLocaleMiddleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/utils/response.js

  /**
   * WordPress dependencies
   */

  /**
   * Parses the apiFetch response.
   *
   * @param {Response} response
   * @param {boolean}  shouldParseResponse
   *
   * @return {Promise<any> | null | Response} Parsed response.
   */

  var response_parseResponse = function response_parseResponse(response) {
    var shouldParseResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (shouldParseResponse) {
      if (response.status === 204) {
        return null;
      }

      return response.json ? response.json() : Promise.reject(response);
    }

    return response;
  };
  /**
   * Calls the `json` function on the Response, throwing an error if the response
   * doesn't have a json function or if parsing the json itself fails.
   *
   * @param {Response} response
   * @return {Promise<any>} Parsed response.
   */


  var parseJsonAndNormalizeError = function parseJsonAndNormalizeError(response) {
    var invalidJsonError = {
      code: 'invalid_json',
      message: (0, external_wp_i18n_namespaceObject.__)('The response is not a valid JSON response.')
    };

    if (!response || !response.json) {
      throw invalidJsonError;
    }

    return response.json()["catch"](function () {
      throw invalidJsonError;
    });
  };
  /**
   * Parses the apiFetch response properly and normalize response errors.
   *
   * @param {Response} response
   * @param {boolean}  shouldParseResponse
   *
   * @return {Promise<any>} Parsed response.
   */


  var parseResponseAndNormalizeError = function parseResponseAndNormalizeError(response) {
    var shouldParseResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return Promise.resolve(response_parseResponse(response, shouldParseResponse))["catch"](function (res) {
      return parseAndThrowError(res, shouldParseResponse);
    });
  };
  /**
   * Parses a response, throwing an error if parsing the response fails.
   *
   * @param {Response} response
   * @param {boolean}  shouldParseResponse
   * @return {Promise<any>} Parsed response.
   */


  function parseAndThrowError(response) {
    var shouldParseResponse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!shouldParseResponse) {
      throw response;
    }

    return parseJsonAndNormalizeError(response).then(function (error) {
      var unknownError = {
        code: 'unknown_error',
        message: (0, external_wp_i18n_namespaceObject.__)('An unknown error occurred.')
      };
      throw error || unknownError;
    });
  }

  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /**
   * @param {import('../types').APIFetchOptions} options
   * @return {boolean} True if the request is for media upload.
   */

  function isMediaUploadRequest(options) {
    var isCreateMethod = !!options.method && options.method === 'POST';
    var isMediaEndpoint = !!options.path && options.path.indexOf('/wp/v2/media') !== -1 || !!options.url && options.url.indexOf('/wp/v2/media') !== -1;
    return isMediaEndpoint && isCreateMethod;
  }
  /**
   * Middleware handling media upload failures and retries.
   *
   * @type {import('../types').APIFetchMiddleware}
   */


  var mediaUploadMiddleware = function mediaUploadMiddleware(options, next) {
    if (!isMediaUploadRequest(options)) {
      return next(options);
    }

    var retries = 0;
    var maxRetries = 5;
    /**
     * @param {string} attachmentId
     * @return {Promise<any>} Processed post response.
     */

    var postProcess = function postProcess(attachmentId) {
      retries++;
      return next({
        path: "/wp/v2/media/".concat(attachmentId, "/post-process"),
        method: 'POST',
        data: {
          action: 'create-image-subsizes'
        },
        parse: false
      })["catch"](function () {
        if (retries < maxRetries) {
          return postProcess(attachmentId);
        }

        next({
          path: "/wp/v2/media/".concat(attachmentId, "?force=true"),
          method: 'DELETE'
        });
        return Promise.reject();
      });
    };

    return next(_objectSpread({}, options, {
      parse: false
    }))["catch"](function (response) {
      var attachmentId = response.headers.get('x-wp-upload-attachment-id');

      if (response.status >= 500 && response.status < 600 && attachmentId) {
        return postProcess(attachmentId)["catch"](function () {
          if (options.parse !== false) {
            return Promise.reject({
              code: 'post_process',
              message: (0, external_wp_i18n_namespaceObject.__)('Media upload failed. If this is a photo or a large image, please scale it down and try again.')
            });
          }

          return Promise.reject(response);
        });
      }

      return parseAndThrowError(response, options.parse);
    }).then(function (response) {
      return parseResponseAndNormalizeError(response, options.parse);
    });
  };
  /* harmony default export */


  var media_upload = mediaUploadMiddleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js

  /**
   * WordPress dependencies
   */

  /**
   * This appends a `wp_theme_preview` parameter to the REST API request URL if
   * the admin URL contains a `theme` GET parameter.
   *
   * @param {Record<string, any>} themePath
   * @return {import('../types').APIFetchMiddleware} Preloading middleware.
   */

  var createThemePreviewMiddleware = function createThemePreviewMiddleware(themePath) {
    return function (options, next) {
      if (typeof options.url === 'string' && !(0, external_wp_url_namespaceObject.hasQueryArg)(options.url, 'wp_theme_preview')) {
        options.url = (0, external_wp_url_namespaceObject.addQueryArgs)(options.url, {
          wp_theme_preview: themePath
        });
      }

      if (typeof options.path === 'string' && !(0, external_wp_url_namespaceObject.hasQueryArg)(options.path, 'wp_theme_preview')) {
        options.path = (0, external_wp_url_namespaceObject.addQueryArgs)(options.path, {
          wp_theme_preview: themePath
        });
      }

      return next(options);
    };
  };
  /* harmony default export */


  var theme_preview = createThemePreviewMiddleware;
  ; // CONCATENATED MODULE: ./node_modules/@wordpress/api-fetch/build-module/index.js

  /**
   * WordPress dependencies
   */

  /**
   * Internal dependencies
   */

  /**
   * Default set of header values which should be sent with every request unless
   * explicitly provided through apiFetch options.
   *
   * @type {Record<string, string>}
   */

  var DEFAULT_HEADERS = {
    // The backend uses the Accept header as a condition for considering an
    // incoming request as a REST request.
    //
    // See: https://core.trac.wordpress.org/ticket/44534
    Accept: 'application/json, */*;q=0.1'
  };
  /**
   * Default set of fetch option values which should be sent with every request
   * unless explicitly provided through apiFetch options.
   *
   * @type {Object}
   */

  var DEFAULT_OPTIONS = {
    credentials: 'include'
  };
  /** @typedef {import('./types').APIFetchMiddleware} APIFetchMiddleware */

  /** @typedef {import('./types').APIFetchOptions} APIFetchOptions */

  /**
   * @type {import('./types').APIFetchMiddleware[]}
   */

  var middlewares = [user_locale, namespace_endpoint, http_v1, fetch_all_middleware];
  /**
   * Register a middleware
   *
   * @param {import('./types').APIFetchMiddleware} middleware
   */

  function registerMiddleware(middleware) {
    middlewares.unshift(middleware);
  }
  /**
   * Checks the status of a response, throwing the Response as an error if
   * it is outside the 200 range.
   *
   * @param {Response} response
   * @return {Response} The response if the status is in the 200 range.
   */


  var checkStatus = function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw response;
  };
  /** @typedef {(options: import('./types').APIFetchOptions) => Promise<any>} FetchHandler*/

  /**
   * @type {FetchHandler}
   */


  var defaultFetchHandler = function defaultFetchHandler(nextOptions) {
    var url = nextOptions.url,
        path = nextOptions.path,
        data = nextOptions.data,
        _nextOptions$parse = nextOptions.parse,
        parse = _nextOptions$parse === void 0 ? true : _nextOptions$parse,
        remainingOptions = _objectWithoutProperties(nextOptions, ["url", "path", "data", "parse"]);

    var body = nextOptions.body,
        headers = nextOptions.headers; // Merge explicitly-provided headers with default values.

    headers = _objectSpread({}, DEFAULT_HEADERS, {}, headers); // The `data` property is a shorthand for sending a JSON body.

    if (data) {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    var responsePromise = window.fetch( // Fall back to explicitly passing `window.location` which is the behavior if `undefined` is passed.
    url || path || window.location.href, _objectSpread({}, DEFAULT_OPTIONS, {}, remainingOptions, {
      body: body,
      headers: headers
    }));
    return responsePromise.then(function (value) {
      return Promise.resolve(value).then(checkStatus)["catch"](function (response) {
        return parseAndThrowError(response, parse);
      }).then(function (response) {
        return parseResponseAndNormalizeError(response, parse);
      });
    }, function (err) {
      // Re-throw AbortError for the users to handle it themselves.
      if (err && err.name === 'AbortError') {
        throw err;
      } // Otherwise, there is most likely no network connection.
      // Unfortunately the message might depend on the browser.


      throw {
        code: 'fetch_error',
        message: (0, external_wp_i18n_namespaceObject.__)('You are probably offline.')
      };
    });
  };
  /** @type {FetchHandler} */


  var fetchHandler = defaultFetchHandler;
  /**
   * Defines a custom fetch handler for making the requests that will override
   * the default one using window.fetch
   *
   * @param {FetchHandler} newFetchHandler The new fetch handler
   */

  function setFetchHandler(newFetchHandler) {
    fetchHandler = newFetchHandler;
  }
  /**
   * @template T
   * @param {import('./types').APIFetchOptions} options
   * @return {Promise<T>} A promise representing the request processed via the registered middlewares.
   */


  function apiFetch(options) {
    // creates a nested function chain that calls all middlewares and finally the `fetchHandler`,
    // converting `middlewares = [ m1, m2, m3 ]` into:
    // ```
    // opts1 => m1( opts1, opts2 => m2( opts2, opts3 => m3( opts3, fetchHandler ) ) );
    // ```
    var enhancedHandler = middlewares.reduceRight(function (
    /** @type {FetchHandler} */
    next, middleware) {
      return function (workingOptions) {
        return middleware(workingOptions, next);
      };
    }, fetchHandler);
    return enhancedHandler(options)["catch"](function (error) {
      if (error.code !== 'rest_cookie_invalid_nonce') {
        return Promise.reject(error);
      } // If the nonce is invalid, refresh it and try again.


      return window // @ts-ignore
      .fetch(apiFetch.nonceEndpoint).then(checkStatus).then(function (data) {
        return data.text();
      }).then(function (text) {
        // @ts-ignore
        apiFetch.nonceMiddleware.nonce = text;
        return apiFetch(options);
      });
    });
  }

  apiFetch.use = registerMiddleware;
  apiFetch.setFetchHandler = setFetchHandler;
  apiFetch.createNonceMiddleware = nonce;
  apiFetch.createPreloadingMiddleware = preloading;
  apiFetch.createRootURLMiddleware = root_url;
  apiFetch.fetchAllMiddleware = fetch_all_middleware;
  apiFetch.mediaUploadMiddleware = media_upload;
  apiFetch.createThemePreviewMiddleware = theme_preview;
  /* harmony default export */

  var build_module = apiFetch;
  (window.wp = window.wp || {}).apiFetch = __webpack_exports__["default"];
  /******/
})();