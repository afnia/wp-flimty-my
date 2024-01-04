"use strict";

!function (a) {
  "use strict";

  var b = function b(_b, c, d) {
    function m(a, b) {
      return k && (k = clearTimeout(k)), j = 0, d ? d.call(a, b) : null;
    }

    function n(a) {
      e = a.clientX, f = a.clientY;
    }

    function o(a, b) {
      if (k && (k = clearTimeout(k)), Math.abs(g - e) + Math.abs(h - f) < l.sensitivity) return j = 1, c ? c.call(a, b) : null;
      g = e, h = f, k = setTimeout(function () {
        o(a, b);
      }, l.interval);
    }

    function p(a) {
      return k && (k = clearTimeout(k)), _b.removeEventListener("mousemove", n), 1 !== j && (g = a.clientX, h = a.clientY, _b.addEventListener("mousemove", n), k = setTimeout(function () {
        o(_b, a);
      }, l.interval)), this;
    }

    function q(a) {
      return k && (k = clearTimeout(k)), _b.removeEventListener("mousemove", n), 1 === j && (k = setTimeout(function () {
        m(_b, a);
      }, l.timeout)), this;
    }

    var e,
        f,
        g,
        h,
        i = {},
        j = 0,
        k = 0,
        l = {
      sensitivity: 7,
      interval: 100,
      timeout: 0
    };
    return i.options = function (b) {
      return l = a.extend({}, l, b), i;
    }, i.remove = function () {
      _b.removeEventListener("mouseover", p), _b.removeEventListener("mouseout", q);
    }, _b.addEventListener("mouseover", p), _b.addEventListener("mouseout", q), i;
  };

  a.fn.hoverIntent = function (a, c, d) {
    return this.each(function () {
      b(this, a, c).options(d || {});
    });
  };
}(jQuery);