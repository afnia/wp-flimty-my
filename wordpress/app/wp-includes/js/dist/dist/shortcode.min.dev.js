"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*! This file is auto-generated */
!function () {
  "use strict";

  var t = {
    d: function d(e, n) {
      for (var r in n) {
        t.o(n, r) && !t.o(e, r) && Object.defineProperty(e, r, {
          enumerable: !0,
          get: n[r]
        });
      }
    },
    o: function o(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
  },
      e = {};

  function n(t) {
    return new RegExp("\\[(\\[?)(" + t + ")(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)", "g");
  }

  t.d(e, {
    "default": function _default() {
      return i;
    }
  });

  var r = function (t, e) {
    var n,
        r,
        s = 0;

    function o() {
      var o,
          i,
          c = n,
          a = arguments.length;

      t: for (; c;) {
        if (c.args.length === arguments.length) {
          for (i = 0; i < a; i++) {
            if (c.args[i] !== arguments[i]) {
              c = c.next;
              continue t;
            }
          }

          return c !== n && (c === r && (r = c.prev), c.prev.next = c.next, c.next && (c.next.prev = c.prev), c.next = n, c.prev = null, n.prev = c, n = c), c.val;
        }

        c = c.next;
      }

      for (o = new Array(a), i = 0; i < a; i++) {
        o[i] = arguments[i];
      }

      return c = {
        args: o,
        val: t.apply(null, o)
      }, n ? (n.prev = c, c.next = n) : r = c, s === e.maxSize ? (r = r.prev).next = null : s++, n = c, c.val;
    }

    return e = e || {}, o.clear = function () {
      n = null, r = null, s = 0;
    }, o;
  }(function (t) {
    var e = {},
        n = [],
        r = /([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*'([^']*)'(?:\s|$)|([\w-]+)\s*=\s*([^\s'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|'([^']*)'(?:\s|$)|(\S+)(?:\s|$)/g;
    var s;

    for (t = t.replace(/[\u00a0\u200b]/g, " "); s = r.exec(t);) {
      s[1] ? e[s[1].toLowerCase()] = s[2] : s[3] ? e[s[3].toLowerCase()] = s[4] : s[5] ? e[s[5].toLowerCase()] = s[6] : s[7] ? n.push(s[7]) : s[8] ? n.push(s[8]) : s[9] && n.push(s[9]);
    }

    return {
      named: e,
      numeric: n
    };
  });

  function s(t) {
    var e;
    return e = t[4] ? "self-closing" : t[6] ? "closed" : "single", new o({
      tag: t[2],
      attrs: t[3],
      type: e,
      content: t[5]
    });
  }

  var o = Object.assign(function (t) {
    var _this = this;

    var _ref = t || {},
        e = _ref.tag,
        n = _ref.attrs,
        s = _ref.type,
        o = _ref.content;

    if (Object.assign(this, {
      tag: e,
      type: s,
      content: o
    }), this.attrs = {
      named: {},
      numeric: []
    }, !n) return;
    var i = ["named", "numeric"];
    "string" == typeof n ? this.attrs = r(n) : n.length === i.length && i.every(function (t, e) {
      return t === n[e];
    }) ? this.attrs = n : Object.entries(n).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          t = _ref3[0],
          e = _ref3[1];

      _this.set(t, e);
    });
  }, {
    next: function t(e, r) {
      var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var i = n(e);
      i.lastIndex = o;
      var c = i.exec(r);
      if (!c) return;
      if ("[" === c[1] && "]" === c[7]) return t(e, r, i.lastIndex);
      var a = {
        index: c.index,
        content: c[0],
        shortcode: s(c)
      };
      return c[1] && (a.content = a.content.slice(1), a.index++), c[7] && (a.content = a.content.slice(0, -1)), a;
    },
    replace: function replace(t, e, r) {
      return e.replace(n(t), function (t, e, n, o, i, c, a, u) {
        if ("[" === e && "]" === u) return t;
        var l = r(s(arguments));
        return l || "" === l ? e + l + u : t;
      });
    },
    string: function string(t) {
      return new o(t).string();
    },
    regexp: n,
    attrs: r,
    fromMatch: s
  });
  Object.assign(o.prototype, {
    get: function get(t) {
      return this.attrs["number" == typeof t ? "numeric" : "named"][t];
    },
    set: function set(t, e) {
      return this.attrs["number" == typeof t ? "numeric" : "named"][t] = e, this;
    },
    string: function string() {
      var t = "[" + this.tag;
      return this.attrs.numeric.forEach(function (e) {
        /\s/.test(e) ? t += ' "' + e + '"' : t += " " + e;
      }), Object.entries(this.attrs.named).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            e = _ref5[0],
            n = _ref5[1];

        t += " " + e + '="' + n + '"';
      }), "single" === this.type ? t + "]" : "self-closing" === this.type ? t + " /]" : (t += "]", this.content && (t += this.content), t + "[/" + this.tag + "]");
    }
  });
  var i = o;
  (window.wp = window.wp || {}).shortcode = e["default"];
}();