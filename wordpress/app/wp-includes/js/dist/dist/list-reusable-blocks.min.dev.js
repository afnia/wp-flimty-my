"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*! This file is auto-generated */
!function () {
  "use strict";

  var e = {
    n: function n(t) {
      var n = t && t.__esModule ? function () {
        return t["default"];
      } : function () {
        return t;
      };
      return e.d(n, {
        a: n
      }), n;
    },
    d: function d(t, n) {
      for (var o in n) {
        e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, {
          enumerable: !0,
          get: n[o]
        });
      }
    },
    o: function o(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    },
    r: function r(e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }
  },
      t = {};
  e.r(t);
  var n = window.wp.element,
      o = window.wp.i18n;

  var _r = function r() {
    return _r = Object.assign || function (e) {
      for (var t, n = 1, o = arguments.length; n < o; n++) {
        for (var r in t = arguments[n]) {
          Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        }
      }

      return e;
    }, _r.apply(this, arguments);
  };

  Object.create;
  Object.create;
  "function" == typeof SuppressedError && SuppressedError;

  function a(e) {
    return e.toLowerCase();
  }

  var i = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g],
      s = /[^A-Z0-9]+/gi;

  function l(e, t, n) {
    return t instanceof RegExp ? e.replace(t, n) : t.reduce(function (e, t) {
      return e.replace(t, n);
    }, e);
  }

  function c(e, t) {
    return void 0 === t && (t = {}), function (e, t) {
      void 0 === t && (t = {});

      for (var n = t.splitRegexp, o = void 0 === n ? i : n, r = t.stripRegexp, c = void 0 === r ? s : r, p = t.transform, u = void 0 === p ? a : p, d = t.delimiter, f = void 0 === d ? " " : d, m = l(l(e, o, "$1\0$2"), c, "\0"), w = 0, b = m.length; "\0" === m.charAt(w);) {
        w++;
      }

      for (; "\0" === m.charAt(b - 1);) {
        b--;
      }

      return m.slice(w, b).split("\0").map(u).join(f);
    }(e, _r({
      delimiter: "."
    }, t));
  }

  var p = window.wp.apiFetch,
      u = e.n(p);

  var d = function d(e) {
    var t, n, o, a, i, s, l;
    return regeneratorRuntime.async(function d$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(u()({
              path: "/wp/v2/types/wp_block"
            }));

          case 2:
            t = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(u()({
              path: "/wp/v2/".concat(t.rest_base, "/").concat(e, "?context=edit")
            }));

          case 5:
            n = _context.sent;
            o = n.title.raw;
            a = n.content.raw;
            i = n.wp_pattern_sync_status;
            s = JSON.stringify({
              __file: "wp_block",
              title: o,
              content: a,
              syncStatus: i
            }, null, 2);
            !function (e, t, n) {
              var o = new window.Blob([t], {
                type: n
              });
              if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(o, e);else {
                var _t = document.createElement("a");

                _t.href = URL.createObjectURL(o), _t.download = e, _t.style.display = "none", document.body.appendChild(_t), _t.click(), document.body.removeChild(_t);
              }
            }((void 0 === l && (l = {}), c(o, _r({
              delimiter: "-"
            }, l)) + ".json"), s, "application/json");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  },
      f = window.wp.compose,
      m = window.wp.components;

  var w = function w(e) {
    var t, n, o;
    return regeneratorRuntime.async(function w$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(function (e) {
              var t = new window.FileReader();
              return new Promise(function (n) {
                t.onload = function () {
                  n(t.result);
                }, t.readAsText(e);
              });
            }(e));

          case 2:
            t = _context2.sent;
            _context2.prev = 3;
            n = JSON.parse(t);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](3);
            throw new Error("Invalid JSON file");

          case 10:
            if (!("wp_block" !== n.__file || !n.title || !n.content || "string" != typeof n.title || "string" != typeof n.content || n.syncStatus && "string" != typeof n.syncStatus)) {
              _context2.next = 12;
              break;
            }

            throw new Error("Invalid pattern JSON file");

          case 12:
            _context2.next = 14;
            return regeneratorRuntime.awrap(u()({
              path: "/wp/v2/types/wp_block"
            }));

          case 14:
            o = _context2.sent;
            _context2.next = 17;
            return regeneratorRuntime.awrap(u()({
              path: "/wp/v2/".concat(o.rest_base),
              data: {
                title: n.title,
                content: n.content,
                status: "publish",
                meta: "unsynced" === n.syncStatus ? {
                  wp_pattern_sync_status: n.syncStatus
                } : void 0
              },
              method: "POST"
            }));

          case 17:
            return _context2.abrupt("return", _context2.sent);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 7]]);
  };

  var b = (0, f.withInstanceId)(function (_ref) {
    var e = _ref.instanceId,
        t = _ref.onUpload;

    var r = "list-reusable-blocks-import-form-" + e,
        a = (0, n.useRef)(),
        _ref2 = (0, n.useState)(!1),
        _ref3 = _slicedToArray(_ref2, 2),
        i = _ref3[0],
        s = _ref3[1],
        _ref4 = (0, n.useState)(null),
        _ref5 = _slicedToArray(_ref4, 2),
        l = _ref5[0],
        c = _ref5[1],
        _ref6 = (0, n.useState)(null),
        _ref7 = _slicedToArray(_ref6, 2),
        p = _ref7[0],
        u = _ref7[1];

    return (0, n.createElement)("form", {
      className: "list-reusable-blocks-import-form",
      onSubmit: function onSubmit(e) {
        e.preventDefault(), p && (s({
          isLoading: !0
        }), w(p).then(function (e) {
          a && (s(!1), t(e));
        })["catch"](function (e) {
          if (!a) return;
          var t;

          switch (e.message) {
            case "Invalid JSON file":
              t = (0, o.__)("Invalid JSON file");
              break;

            case "Invalid pattern JSON file":
              t = (0, o.__)("Invalid pattern JSON file");
              break;

            default:
              t = (0, o.__)("Unknown error");
          }

          s(!1), c(t);
        }));
      },
      ref: a
    }, l && (0, n.createElement)(m.Notice, {
      status: "error",
      onRemove: function onRemove() {
        c(null);
      }
    }, l), (0, n.createElement)("label", {
      htmlFor: r,
      className: "list-reusable-blocks-import-form__label"
    }, (0, o.__)("File")), (0, n.createElement)("input", {
      id: r,
      type: "file",
      onChange: function onChange(e) {
        u(e.target.files[0]), c(null);
      }
    }), (0, n.createElement)(m.Button, {
      type: "submit",
      isBusy: i,
      disabled: !p || i,
      variant: "secondary",
      className: "list-reusable-blocks-import-form__button"
    }, (0, o._x)("Import", "button label")));
  });

  var v = function v(_ref8) {
    var e = _ref8.onUpload;
    return (0, n.createElement)(m.Dropdown, {
      popoverProps: {
        placement: "bottom-start"
      },
      contentClassName: "list-reusable-blocks-import-dropdown__content",
      renderToggle: function renderToggle(_ref9) {
        var e = _ref9.isOpen,
            t = _ref9.onToggle;
        return (0, n.createElement)(m.Button, {
          "aria-expanded": e,
          onClick: t,
          variant: "primary"
        }, (0, o.__)("Import from JSON"));
      },
      renderContent: function renderContent(_ref10) {
        var t = _ref10.onClose;
        return (0, n.createElement)(b, {
          onUpload: (0, f.pipe)(t, e)
        });
      }
    });
  };

  document.body.addEventListener("click", function (e) {
    e.target.classList.contains("wp-list-reusable-blocks__export") && (e.preventDefault(), d(e.target.dataset.id));
  }), document.addEventListener("DOMContentLoaded", function () {
    var e = document.querySelector(".page-title-action");
    if (!e) return;
    var t = document.createElement("div");
    t.className = "list-reusable-blocks__container", e.parentNode.insertBefore(t, e), (0, n.createRoot)(t).render((0, n.createElement)(v, {
      onUpload: function onUpload() {
        var e = document.createElement("div");
        e.className = "notice notice-success is-dismissible", e.innerHTML = "<p>".concat((0, o.__)("Pattern imported successfully!"), "</p>");
        var t = document.querySelector(".wp-header-end");
        t && t.parentNode.insertBefore(e, t);
      }
    }));
  }), (window.wp = window.wp || {}).listReusableBlocks = t;
}();