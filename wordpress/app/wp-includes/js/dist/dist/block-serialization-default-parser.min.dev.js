"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*! This file is auto-generated */
!function () {
  "use strict";

  var n = {
    d: function d(t, e) {
      for (var r in e) {
        n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, {
          enumerable: !0,
          get: e[r]
        });
      }
    },
    o: function o(n, t) {
      return Object.prototype.hasOwnProperty.call(n, t);
    },
    r: function r(n) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(n, "__esModule", {
        value: !0
      });
    }
  },
      t = {};
  var e, r, o, u;
  n.r(t), n.d(t, {
    parse: function parse() {
      return i;
    }
  });
  var s = /<!--\s+(\/)?wp:([a-z][a-z0-9_-]*\/)?([a-z][a-z0-9_-]*)\s+({(?:(?=([^}]+|}+(?=})|(?!}\s+\/?-->)[^])*)\5|[^]*?)}\s+)?(\/)?-->/g;

  function l(n, t, e, r, o) {
    return {
      blockName: n,
      attrs: t,
      innerBlocks: e,
      innerHTML: r,
      innerContent: o
    };
  }

  function c(n) {
    return l(null, {}, [], n, [n]);
  }

  var i = function i(n) {
    e = n, r = 0, o = [], u = [], s.lastIndex = 0;

    do {} while (f());

    return o;
  };

  function f() {
    var n = u.length,
        t = function () {
      var n = s.exec(e);
      if (null === n) return ["no-more-tokens", "", null, 0, 0];

      var t = n.index,
          _n2 = _slicedToArray(n, 7),
          r = _n2[0],
          o = _n2[1],
          u = _n2[2],
          l = _n2[3],
          c = _n2[4],
          i = _n2[6],
          f = r.length,
          p = !!o,
          a = !!i,
          b = (u || "core/") + l,
          k = !!c,
          h = k ? function (n) {
        try {
          return JSON.parse(n);
        } catch (n) {
          return null;
        }
      }(c) : {};

      if (a) return ["void-block", b, h, t, f];
      if (p) return ["block-closer", b, null, t, f];
      return ["block-opener", b, h, t, f];
    }(),
        _t = _slicedToArray(t, 5),
        i = _t[0],
        f = _t[1],
        k = _t[2],
        h = _t[3],
        d = _t[4],
        g = h > r ? r : null;

    switch (i) {
      case "no-more-tokens":
        if (0 === n) return p(), !1;
        if (1 === n) return b(), !1;

        for (; 0 < u.length;) {
          b();
        }

        return !1;

      case "void-block":
        return 0 === n ? (null !== g && o.push(c(e.substr(g, h - g))), o.push(l(f, k, [], "", [])), r = h + d, !0) : (a(l(f, k, [], "", []), h, d), r = h + d, !0);

      case "block-opener":
        return u.push(function (n, t, e, r, o) {
          return {
            block: n,
            tokenStart: t,
            tokenLength: e,
            prevOffset: r || t + e,
            leadingHtmlStart: o
          };
        }(l(f, k, [], "", []), h, d, h + d, g)), r = h + d, !0;

      case "block-closer":
        if (0 === n) return p(), !1;
        if (1 === n) return b(h), r = h + d, !0;

        var _t2 = u.pop(),
            _s2 = e.substr(_t2.prevOffset, h - _t2.prevOffset);

        return _t2.block.innerHTML += _s2, _t2.block.innerContent.push(_s2), _t2.prevOffset = h + d, a(_t2.block, _t2.tokenStart, _t2.tokenLength, h + d), r = h + d, !0;

      default:
        return p(), !1;
    }
  }

  function p(n) {
    var t = n || e.length - r;
    0 !== t && o.push(c(e.substr(r, t)));
  }

  function a(n, t, r, o) {
    var s = u[u.length - 1];
    s.block.innerBlocks.push(n);
    var l = e.substr(s.prevOffset, t - s.prevOffset);
    l && (s.block.innerHTML += l, s.block.innerContent.push(l)), s.block.innerContent.push(null), s.prevOffset = o || t + r;
  }

  function b(n) {
    var _u$pop = u.pop(),
        t = _u$pop.block,
        r = _u$pop.leadingHtmlStart,
        s = _u$pop.prevOffset,
        l = _u$pop.tokenStart,
        i = n ? e.substr(s, n - s) : e.substr(s);

    i && (t.innerHTML += i, t.innerContent.push(i)), null !== r && o.push(c(e.substr(r, l - r))), o.push(t);
  }

  (window.wp = window.wp || {}).blockSerializationDefaultParser = t;
}();