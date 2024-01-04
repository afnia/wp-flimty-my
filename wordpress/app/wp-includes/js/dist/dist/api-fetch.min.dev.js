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

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    d: function d(t, r) {
      for (var n in r) {
        e.o(r, n) && !e.o(t, n) && Object.defineProperty(t, n, {
          enumerable: !0,
          get: r[n]
        });
      }
    },
    o: function o(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }
  },
      t = {};
  e.d(t, {
    "default": function _default() {
      return T;
    }
  });
  var r = window.wp.i18n;

  var n = function n(e) {
    var t = function t(e, r) {
      var _e$headers = e.headers,
          n = _e$headers === void 0 ? {} : _e$headers;

      for (var _a in n) {
        if ("x-wp-nonce" === _a.toLowerCase() && n[_a] === t.nonce) return r(e);
      }

      return r(_objectSpread({}, e, {
        headers: _objectSpread({}, n, {
          "X-WP-Nonce": t.nonce
        })
      }));
    };

    return t.nonce = e, t;
  };

  var a = function a(e, t) {
    var r,
        n,
        a = e.path;
    return "string" == typeof e.namespace && "string" == typeof e.endpoint && (r = e.namespace.replace(/^\/|\/$/g, ""), n = e.endpoint.replace(/^\//, ""), a = n ? r + "/" + n : r), delete e.namespace, delete e.endpoint, t(_objectSpread({}, e, {
      path: a
    }));
  };

  var o = function o(e) {
    return function (t, r) {
      return a(t, function (t) {
        var n,
            a = t.url,
            o = t.path;
        return "string" == typeof o && (n = e, -1 !== e.indexOf("?") && (o = o.replace("?", "&")), o = o.replace(/^\//, ""), "string" == typeof n && -1 !== n.indexOf("?") && (o = o.replace("?", "&")), a = n + o), r(_objectSpread({}, t, {
          url: a
        }));
      });
    };
  },
      s = window.wp.url;

  function i(e, t) {
    return Promise.resolve(t ? e.body : new window.Response(JSON.stringify(e.body), {
      status: 200,
      statusText: "OK",
      headers: e.headers
    }));
  }

  var c = function c(e) {
    var t = Object.fromEntries(Object.entries(e).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          e = _ref2[0],
          t = _ref2[1];

      return [(0, s.normalizePath)(e), t];
    }));
    return function (e, r) {
      var _e$parse = e.parse,
          n = _e$parse === void 0 ? !0 : _e$parse;
      var a = e.path;

      if (!a && e.url) {
        var _ref3 = (0, s.getQueryArgs)(e.url),
            _t = _ref3.rest_route,
            _r = _objectWithoutProperties(_ref3, ["rest_route"]);

        "string" == typeof _t && (a = (0, s.addQueryArgs)(_t, _r));
      }

      if ("string" != typeof a) return r(e);
      var o = e.method || "GET",
          c = (0, s.normalizePath)(a);

      if ("GET" === o && t[c]) {
        var _e2 = t[c];
        return delete t[c], i(_e2, !!n);
      }

      if ("OPTIONS" === o && t[o] && t[o][c]) {
        var _e3 = t[o][c];
        return delete t[o][c], i(_e3, !!n);
      }

      return r(e);
    };
  };

  var d = function d(_ref4, n) {
    var e = _ref4.path,
        t = _ref4.url,
        r = _objectWithoutProperties(_ref4, ["path", "url"]);

    return _objectSpread({}, r, {
      url: t && (0, s.addQueryArgs)(t, n),
      path: e && (0, s.addQueryArgs)(e, n)
    });
  },
      p = function p(e) {
    return e.json ? e.json() : Promise.reject(e);
  },
      u = function u(e) {
    var _ref5 = function (e) {
      if (!e) return {};
      var t = e.match(/<([^>]+)>; rel="next"/);
      return t ? {
        next: t[1]
      } : {};
    }(e.headers.get("link")),
        t = _ref5.next;

    return t;
  };

  var h = function h(e, t) {
    var r, n, a, o, _t2, _r2;

    return regeneratorRuntime.async(function h$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!1 === e.parse)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", t(e));

          case 2:
            if (function (e) {
              var t = !!e.path && -1 !== e.path.indexOf("per_page=-1"),
                  r = !!e.url && -1 !== e.url.indexOf("per_page=-1");
              return t || r;
            }(e)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", t(e));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(T(_objectSpread({}, d(e, {
              per_page: 100
            }), {
              parse: !1
            })));

          case 6:
            r = _context.sent;
            _context.next = 9;
            return regeneratorRuntime.awrap(p(r));

          case 9:
            n = _context.sent;

            if (Array.isArray(n)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", n);

          case 12:
            a = u(r);

            if (a) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", n);

          case 15:
            o = [].concat(n);

          case 16:
            if (!a) {
              _context.next = 26;
              break;
            }

            _context.next = 19;
            return regeneratorRuntime.awrap(T(_objectSpread({}, e, {
              path: void 0,
              url: a,
              parse: !1
            })));

          case 19:
            _t2 = _context.sent;
            _context.next = 22;
            return regeneratorRuntime.awrap(p(_t2));

          case 22:
            _r2 = _context.sent;
            o = o.concat(_r2), a = u(_t2);

          case 24:
            _context.next = 16;
            break;

          case 26:
            return _context.abrupt("return", o);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var l = new Set(["PATCH", "PUT", "DELETE"]),
      f = "GET";

  var w = function w(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    return Promise.resolve(function (e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      return t ? 204 === e.status ? null : e.json ? e.json() : Promise.reject(e) : e;
    }(e, t))["catch"](function (e) {
      return m(e, t);
    });
  };

  function m(e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
    if (!t) throw e;
    return function (e) {
      var t = {
        code: "invalid_json",
        message: (0, r.__)("The response is not a valid JSON response.")
      };
      if (!e || !e.json) throw t;
      return e.json()["catch"](function () {
        throw t;
      });
    }(e).then(function (e) {
      var t = {
        code: "unknown_error",
        message: (0, r.__)("An unknown error occurred.")
      };
      throw e || t;
    });
  }

  var g = function g(e, t) {
    if (!function (e) {
      var t = !!e.method && "POST" === e.method;
      return (!!e.path && -1 !== e.path.indexOf("/wp/v2/media") || !!e.url && -1 !== e.url.indexOf("/wp/v2/media")) && t;
    }(e)) return t(e);
    var n = 0;

    var a = function a(e) {
      return n++, t({
        path: "/wp/v2/media/".concat(e, "/post-process"),
        method: "POST",
        data: {
          action: "create-image-subsizes"
        },
        parse: !1
      })["catch"](function () {
        return n < 5 ? a(e) : (t({
          path: "/wp/v2/media/".concat(e, "?force=true"),
          method: "DELETE"
        }), Promise.reject());
      });
    };

    return t(_objectSpread({}, e, {
      parse: !1
    }))["catch"](function (t) {
      var n = t.headers.get("x-wp-upload-attachment-id");
      return t.status >= 500 && t.status < 600 && n ? a(n)["catch"](function () {
        return !1 !== e.parse ? Promise.reject({
          code: "post_process",
          message: (0, r.__)("Media upload failed. If this is a photo or a large image, please scale it down and try again.")
        }) : Promise.reject(t);
      }) : m(t, e.parse);
    }).then(function (t) {
      return w(t, e.parse);
    });
  };

  var y = function y(e) {
    return function (t, r) {
      return "string" != typeof t.url || (0, s.hasQueryArg)(t.url, "wp_theme_preview") || (t.url = (0, s.addQueryArgs)(t.url, {
        wp_theme_preview: e
      })), "string" != typeof t.path || (0, s.hasQueryArg)(t.path, "wp_theme_preview") || (t.path = (0, s.addQueryArgs)(t.path, {
        wp_theme_preview: e
      })), r(t);
    };
  };

  var _ = {
    Accept: "application/json, */*;q=0.1"
  },
      v = {
    credentials: "include"
  },
      P = [function (e, t) {
    return "string" != typeof e.url || (0, s.hasQueryArg)(e.url, "_locale") || (e.url = (0, s.addQueryArgs)(e.url, {
      _locale: "user"
    })), "string" != typeof e.path || (0, s.hasQueryArg)(e.path, "_locale") || (e.path = (0, s.addQueryArgs)(e.path, {
      _locale: "user"
    })), t(e);
  }, a, function (e, t) {
    var _e4 = e,
        _e4$method = _e4.method,
        r = _e4$method === void 0 ? f : _e4$method;
    return l.has(r.toUpperCase()) && (e = _objectSpread({}, e, {
      headers: _objectSpread({}, e.headers, {
        "X-HTTP-Method-Override": r,
        "Content-Type": "application/json"
      }),
      method: "POST"
    })), t(e);
  }, h];

  var O = function O(e) {
    if (e.status >= 200 && e.status < 300) return e;
    throw e;
  };

  var j = function j(e) {
    var t = e.url,
        n = e.path,
        a = e.data,
        _e$parse2 = e.parse,
        o = _e$parse2 === void 0 ? !0 : _e$parse2,
        s = _objectWithoutProperties(e, ["url", "path", "data", "parse"]);

    var i = e.body,
        c = e.headers;
    c = _objectSpread({}, _, {}, c), a && (i = JSON.stringify(a), c["Content-Type"] = "application/json");
    return window.fetch(t || n || window.location.href, _objectSpread({}, v, {}, s, {
      body: i,
      headers: c
    })).then(function (e) {
      return Promise.resolve(e).then(O)["catch"](function (e) {
        return m(e, o);
      }).then(function (e) {
        return w(e, o);
      });
    }, function (e) {
      if (e && "AbortError" === e.name) throw e;
      throw {
        code: "fetch_error",
        message: (0, r.__)("You are probably offline.")
      };
    });
  };

  function A(e) {
    return P.reduceRight(function (e, t) {
      return function (r) {
        return t(r, e);
      };
    }, j)(e)["catch"](function (t) {
      return "rest_cookie_invalid_nonce" !== t.code ? Promise.reject(t) : window.fetch(A.nonceEndpoint).then(O).then(function (e) {
        return e.text();
      }).then(function (t) {
        return A.nonceMiddleware.nonce = t, A(e);
      });
    });
  }

  A.use = function (e) {
    P.unshift(e);
  }, A.setFetchHandler = function (e) {
    j = e;
  }, A.createNonceMiddleware = n, A.createPreloadingMiddleware = c, A.createRootURLMiddleware = o, A.fetchAllMiddleware = h, A.mediaUploadMiddleware = g, A.createThemePreviewMiddleware = y;
  var T = A;
  (window.wp = window.wp || {}).apiFetch = t["default"];
}();