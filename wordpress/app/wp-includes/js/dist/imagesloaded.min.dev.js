"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! This file is auto-generated */

/*!
 * imagesLoaded PACKAGED v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!function (t, e) {
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : void 0, function () {
  function t() {}

  var e = t.prototype;
  return e.on = function (t, e) {
    if (!t || !e) return this;
    var i = this._events = this._events || {},
        s = i[t] = i[t] || [];
    return s.includes(e) || s.push(e), this;
  }, e.once = function (t, e) {
    if (!t || !e) return this;
    this.on(t, e);
    var i = this._onceEvents = this._onceEvents || {};
    return (i[t] = i[t] || {})[e] = !0, this;
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];
    if (!i || !i.length) return this;
    var s = i.indexOf(e);
    return -1 != s && i.splice(s, 1), this;
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];
    if (!i || !i.length) return this;
    i = i.slice(0), e = e || [];
    var s = this._onceEvents && this._onceEvents[t];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = i[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;
        s && s[n] && (this.off(t, n), delete s[n]), n.apply(this, e);
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

    return this;
  }, e.allOff = function () {
    return delete this._events, delete this._onceEvents, this;
  }, t;
}),
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
function (t, e) {
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter);
}("undefined" != typeof window ? window : void 0, function (t, e) {
  var i = t.jQuery,
      s = t.console;

  function n(t, e, o) {
    if (!(this instanceof n)) return new n(t, e, o);
    var r = t;
    var h;
    ("string" == typeof t && (r = document.querySelectorAll(t)), r) ? (this.elements = (h = r, Array.isArray(h) ? h : "object" == _typeof(h) && "number" == typeof h.length ? _toConsumableArray(h) : [h]), this.options = {}, "function" == typeof e ? o = e : Object.assign(this.options, e), o && this.on("always", o), this.getImages(), i && (this.jqDeferred = new i.Deferred()), setTimeout(this.check.bind(this))) : s.error("Bad element for imagesLoaded ".concat(r || t));
  }

  n.prototype = Object.create(e.prototype), n.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  };
  var o = [1, 9, 11];

  n.prototype.addElementImages = function (t) {
    "IMG" === t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
    var e = t.nodeType;
    if (!e || !o.includes(e)) return;
    var i = t.querySelectorAll("img");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = i[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _t2 = _step2.value;
        this.addImage(_t2);
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

    if ("string" == typeof this.options.background) {
      var _e = t.querySelectorAll(this.options.background);

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _e[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _t = _step3.value;
          this.addElementBackgroundImages(_t);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  };

  var r = /url\((['"])?(.*?)\1\)/gi;

  function h(t) {
    this.img = t;
  }

  function d(t, e) {
    this.url = t, this.element = e, this.img = new Image();
  }

  return n.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);
    if (!e) return;
    var i = r.exec(e.backgroundImage);

    for (; null !== i;) {
      var _s = i && i[2];

      _s && this.addBackground(_s, t), i = r.exec(e.backgroundImage);
    }
  }, n.prototype.addImage = function (t) {
    var e = new h(t);
    this.images.push(e);
  }, n.prototype.addBackground = function (t, e) {
    var i = new d(t, e);
    this.images.push(i);
  }, n.prototype.check = function () {
    var _this = this;

    if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete();

    var t = function t(_t3, e, i) {
      setTimeout(function () {
        _this.progress(_t3, e, i);
      });
    };

    this.images.forEach(function (e) {
      e.once("progress", t), e.check();
    });
  }, n.prototype.progress = function (t, e, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount === this.images.length && this.complete(), this.options.debug && s && s.log("progress: ".concat(i), t, e);
  }, n.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";

    if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var _t4 = this.hasAnyBroken ? "reject" : "resolve";

      this.jqDeferred[_t4](this);
    }
  }, h.prototype = Object.create(e.prototype), h.prototype.check = function () {
    this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.currentSrc || this.img.src);
  }, h.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, h.prototype.confirm = function (t, e) {
    this.isLoaded = t;
    var i = this.img.parentNode,
        s = "PICTURE" === i.nodeName ? i : this.img;
    this.emitEvent("progress", [this, s, e]);
  }, h.prototype.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, h.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, h.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, h.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, d.prototype = Object.create(h.prototype), d.prototype.check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, d.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, d.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]);
  }, n.makeJQueryPlugin = function (e) {
    (e = e || t.jQuery) && (i = e, i.fn.imagesLoaded = function (t, e) {
      return new n(this, t, e).jqDeferred.promise(i(this));
    });
  }, n.makeJQueryPlugin(), n;
});