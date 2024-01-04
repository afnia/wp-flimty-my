"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (a, v) {
  "use strict";

  var t;
  t = function t(l) {
    function t(t, e) {
      return isNaN(t) ? e || 0 : Number(t);
    }

    function c(t) {
      return t.data("plugin_" + n);
    }

    function p() {
      for (var t = null, e = 0; e < g.length; e++) {
        (t = c(g[e])) && t.hide(!0);
      }

      h.trigger("hiddenAll." + u);
    }

    var n = "webuiPopover",
        d = "webui-popover",
        u = "webui.popover",
        o = {
      placement: "auto",
      container: null,
      width: "auto",
      height: "auto",
      trigger: "click",
      style: "",
      selector: !1,
      delay: {
        show: null,
        hide: 300
      },
      async: {
        type: "GET",
        before: null,
        success: null,
        error: null
      },
      cache: !0,
      multi: !1,
      arrow: !0,
      title: "",
      content: "",
      closeable: !1,
      padding: !0,
      url: "",
      type: "html",
      direction: "",
      animation: null,
      template: '<div class="webui-popover"><div class="webui-arrow"></div><div class="webui-popover-inner"><a href="#" class="close"></a><h3 class="webui-popover-title"></h3><div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div></div></div>',
      backdrop: !1,
      dismissible: !0,
      onShow: null,
      onHide: null,
      abortXHR: !0,
      autoHide: !1,
      offsetTop: 0,
      offsetLeft: 0,
      iframeOptions: {
        frameborder: "0",
        allowtransparency: "true",
        id: "",
        name: "",
        scrolling: "",
        onload: "",
        height: "",
        width: ""
      },
      hideEmpty: !1
    },
        f = d + "-rtl",
        g = [],
        s = l('<div class="webui-popover-backdrop"></div>'),
        e = 0,
        m = !1,
        y = -2e3,
        h = l(v),
        i = "ontouchstart" in v.documentElement && /Mobi/.test(navigator.userAgent);

    function r(t, e) {
      return this.$element = l(t), e && ("string" !== l.type(e.delay) && "number" !== l.type(e.delay) || (e.delay = {
        show: e.delay,
        hide: e.delay
      })), this.options = l.extend({}, o, e), this._defaults = o, this._name = n, this._targetclick = !1, this.init(), g.push(this.$element), this;
    }

    r.prototype = {
      init: function init() {
        if (this.$element[0] instanceof v.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        "manual" !== this.getTrigger() && ("click" === this.getTrigger() || i ? this.$element.off("click touchend", this.options.selector).on("click touchend", this.options.selector, l.proxy(this.toggle, this)) : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave click", this.options.selector).on("mouseenter", this.options.selector, l.proxy(this.mouseenterHandler, this)).on("mouseleave", this.options.selector, l.proxy(this.mouseleaveHandler, this))), this._poped = !1, this._inited = !0, this._opened = !1, this._idSeed = e, this.id = n + this._idSeed, this.options.container = l(this.options.container || v.body).first(), this.options.backdrop && s.appendTo(this.options.container).hide(), e++, "sticky" === this.getTrigger() && this.show(), this.options.selector && (this._options = l.extend({}, this.options, {
          selector: ""
        }));
      },
      destroy: function destroy() {
        for (var t = -1, e = 0; e < g.length; e++) {
          if (g[e] === this.$element) {
            t = e;
            break;
          }
        }

        g.splice(t, 1), this.hide(), this.$element.data("plugin_" + n, null), "click" === this.getTrigger() ? this.$element.off("click") : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave"), this.$target && this.$target.remove();
      },
      getDelegateOptions: function getDelegateOptions() {
        var i = {};
        return this._options && l.each(this._options, function (t, e) {
          o[t] !== e && (i[t] = e);
        }), i;
      },
      hide: function hide(t, e) {
        var i;
        (t || "sticky" !== this.getTrigger()) && this._opened && (e && (e.preventDefault(), e.stopPropagation()), this.xhr && !0 === this.options.abortXHR && (this.xhr.abort(), this.xhr = null), e = l.Event("hide." + u), this.$element.trigger(e, [this.$target]), this.$target && (this.$target.removeClass("in").addClass(this.getHideAnimation()), i = this, setTimeout(function () {
          i.$target.hide(), i.getCache() || i.$target.remove();
        }, i.getHideDelay())), this.options.backdrop && s.hide(), this._opened = !1, this.$element.trigger("hidden." + u, [this.$target]), this.options.onHide && this.options.onHide(this.$target));
      },
      resetAutoHide: function resetAutoHide() {
        var t = this,
            e = t.getAutoHide();
        e && (t.autoHideHandler && clearTimeout(t.autoHideHandler), t.autoHideHandler = setTimeout(function () {
          t.hide();
        }, e));
      },
      delegate: function delegate(t) {
        var e = l(t).data("plugin_" + n);
        return e || (e = new r(t, this.getDelegateOptions()), l(t).data("plugin_" + n, e)), e;
      },
      toggle: function toggle(t) {
        var e = this;
        t && (t.preventDefault(), t.stopPropagation(), this.options.selector && (e = this.delegate(t.currentTarget))), e[e.getTarget().hasClass("in") ? "hide" : "show"]();
      },
      hideAll: function hideAll() {
        p();
      },
      hideOthers: function hideOthers() {
        !function (t) {
          for (var e = null, i = 0; i < g.length; i++) {
            (e = c(g[i])) && e.id !== t.id && e.hide(!0);
          }

          h.trigger("hiddenAll." + u);
        }(this);
      },
      show: function show() {
        if (!this._opened) {
          var t = this.getTarget().removeClass().addClass(d).addClass(this._customTargetClass);

          if (this.options.multi || this.hideOthers(), !this.getCache() || !this._poped || "" === this.content) {
            if (this.content = "", this.setTitle(this.getTitle()), this.options.closeable || t.find(".close").off("click").remove(), this.isAsync() ? this.setContentASync(this.options.content) : this.setContent(this.getContent()), this.canEmptyHide() && "" === this.content) return;
            t.show();
          }

          this.displayContent(), this.options.onShow && this.options.onShow(t), this.bindBodyEvents(), this.options.backdrop && s.show(), this._opened = !0, this.resetAutoHide();
        }
      },
      displayContent: function displayContent() {
        var t,
            e = this.getElementPosition(),
            i = this.getTarget().removeClass().addClass(d).addClass(this._customTargetClass),
            o = this.getContentElement(),
            n = i[0].offsetWidth,
            s = i[0].offsetHeight,
            h = l.Event("show." + u);

        if (this.canEmptyHide()) {
          var r = o.children().html();
          if (null !== r && 0 === r.trim().length) return;
        }

        this.$element.trigger(h, [i]);
        h = this.$element.data("width") || this.options.width;
        "auto" !== (h = "" === h ? this._defaults.width : h) && i.width(h);
        h = this.$element.data("height") || this.options.height;
        "auto" !== (h = "" === h ? this._defaults.height : h) && o.height(h), this.options.style && this.$target.addClass(d + "-" + this.options.style), "rtl" !== this.options.direction || o.hasClass(f) || o.addClass(f), this.options.arrow || i.find(".webui-arrow").remove(), i.detach().css({
          top: y,
          left: y,
          display: "block"
        }), this.getAnimation() && i.addClass(this.getAnimation()), i.appendTo(this.options.container), t = this.getPlacement(e), this.$element.trigger("added." + u), this.initTargetEvents(), this.options.padding || ("auto" !== this.options.height && o.css("height", o.outerHeight()), this.$target.addClass("webui-no-padding")), this.options.maxHeight && o.css("maxHeight", this.options.maxHeight), this.options.maxWidth && o.css("maxWidth", this.options.maxWidth);
        var a,
            n = i[0].offsetWidth,
            s = i[0].offsetHeight,
            o = this.getTargetPositin(e, t, n, s);
        this.$target.css(o.position).addClass(t).addClass("in"), "iframe" === this.options.type && (n = i.find("iframe"), s = i.width(), a = n.parent().height(), "" !== this.options.iframeOptions.width && "auto" !== this.options.iframeOptions.width && (s = this.options.iframeOptions.width), "" !== this.options.iframeOptions.height && "auto" !== this.options.iframeOptions.height && (a = this.options.iframeOptions.height), n.width(s).height(a)), this.options.arrow || this.$target.css({
          margin: 0
        }), this.options.arrow && ((a = this.$target.find(".webui-arrow")).removeAttr("style"), "left" === t || "right" === t ? a.css({
          top: this.$target.height() / 2
        }) : "top" !== t && "bottom" !== t || a.css({
          left: this.$target.width() / 2
        }), o.arrowOffset && (-1 === o.arrowOffset.left || -1 === o.arrowOffset.top ? a.hide() : a.css(o.arrowOffset))), this.$element.hasClass("elementor-button-floating-yes") && i.css({
          position: "fixed",
          top: "auto",
          bottom: e.height + 10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "block"
        }), this._poped = !0, this.$element.trigger("shown." + u, [this.$target]);
      },
      isTargetLoaded: function isTargetLoaded() {
        return 0 === this.getTarget().find("i.glyphicon-refresh").length;
      },
      getTriggerElement: function getTriggerElement() {
        return this.$element;
      },
      getTarget: function getTarget() {
        var t;
        return this.$target || (t = n + this._idSeed, this.$target = l(this.options.template).attr("id", t), this._customTargetClass = this.$target.attr("class") !== d ? this.$target.attr("class") : null, this.getTriggerElement().attr("data-target", t)), this.$target.data("trigger-element") || this.$target.data("trigger-element", this.getTriggerElement()), this.$target;
      },
      removeTarget: function removeTarget() {
        this.$target.remove(), this.$target = null, this.$contentElement = null;
      },
      getTitleElement: function getTitleElement() {
        return this.getTarget().find("." + d + "-title");
      },
      getContentElement: function getContentElement() {
        return this.$contentElement || (this.$contentElement = this.getTarget().find("." + d + "-content")), this.$contentElement;
      },
      getTitle: function getTitle() {
        return this.$element.attr("data-title") || this.options.title || this.$element.attr("title");
      },
      getUrl: function getUrl() {
        return this.$element.attr("data-url") || this.options.url;
      },
      getAutoHide: function getAutoHide() {
        return this.$element.attr("data-auto-hide") || this.options.autoHide;
      },
      getOffsetTop: function getOffsetTop() {
        return t(this.$element.attr("data-offset-top")) || this.options.offsetTop;
      },
      getOffsetLeft: function getOffsetLeft() {
        return t(this.$element.attr("data-offset-left")) || this.options.offsetLeft;
      },
      getCache: function getCache() {
        var t = this.$element.attr("data-cache");
        if (void 0 !== t) switch (t.toLowerCase()) {
          case "true":
          case "yes":
          case "1":
            return !0;

          case "false":
          case "no":
          case "0":
            return !1;
        }
        return this.options.cache;
      },
      getTrigger: function getTrigger() {
        return this.$element.attr("data-trigger") || this.options.trigger;
      },
      getDelayShow: function getDelayShow() {
        var t = this.$element.attr("data-delay-show");
        return void 0 !== t ? t : 0 === this.options.delay.show ? 0 : this.options.delay.show || 100;
      },
      getHideDelay: function getHideDelay() {
        var t = this.$element.attr("data-delay-hide");
        return void 0 !== t ? t : 0 === this.options.delay.hide ? 0 : this.options.delay.hide || 100;
      },
      getAnimation: function getAnimation() {
        return this.$element.attr("data-animation") || this.options.animation;
      },
      getHideAnimation: function getHideAnimation() {
        var t = this.getAnimation();
        return t ? t + "-out" : "out";
      },
      setTitle: function setTitle(t) {
        var e = this.getTitleElement();
        t ? ("rtl" !== this.options.direction || e.hasClass(f) || e.addClass(f), e.html(t)) : e.remove();
      },
      hasContent: function hasContent() {
        return this.getContent();
      },
      canEmptyHide: function canEmptyHide() {
        return this.options.hideEmpty && "html" === this.options.type;
      },
      getIframe: function getIframe() {
        var e = l("<iframe></iframe>").attr("src", this.getUrl()),
            i = this;
        return l.each(this._defaults.iframeOptions, function (t) {
          void 0 !== i.options.iframeOptions[t] && e.attr(t, i.options.iframeOptions[t]);
        }), e;
      },
      getContent: function getContent() {
        var t;
        if (this.getUrl()) switch (this.options.type) {
          case "iframe":
            this.content = this.getIframe();
            break;

          case "html":
            try {
              this.content = l(this.getUrl()), this.content.is(":visible") || this.content.show();
            } catch (t) {
              throw new Error("Unable to get popover content. Invalid selector specified.");
            }

        } else this.content || (t = "", t = l.isFunction(this.options.content) ? this.options.content.apply(this.$element[0], [this]) : this.options.content, this.content = this.$element.attr("data-content") || t, this.content || (t = this.$element.next()) && t.hasClass(d + "-content") && (this.content = t));
        return this.content;
      },
      setContent: function setContent(t) {
        var e = this.getTarget(),
            i = this.getContentElement();
        "string" == typeof t ? i.html(t) : t instanceof l && (i.html(""), (this.options.cache ? t : t.clone(!0, !0)).removeClass(d + "-content").appendTo(i)), this.$target = e;
      },
      isAsync: function isAsync() {
        return "async" === this.options.type;
      },
      setContentASync: function setContentASync(e) {
        var i = this;
        this.xhr || (this.xhr = l.ajax({
          url: this.getUrl(),
          type: this.options.async.type,
          cache: this.getCache(),
          beforeSend: function beforeSend(t) {
            i.options.async.before && i.options.async.before(i, t);
          },
          success: function success(t) {
            i.bindBodyEvents(), e && l.isFunction(e) ? i.content = e.apply(i.$element[0], [t]) : i.content = t, i.setContent(i.content), i.getContentElement().removeAttr("style"), i.displayContent(), i.options.async.success && i.options.async.success(i, t);
          },
          complete: function complete() {
            i.xhr = null;
          },
          error: function error(t, e) {
            i.options.async.error && i.options.async.error(i, t, e);
          }
        }));
      },
      bindBodyEvents: function bindBodyEvents() {
        m || (this.options.dismissible && "click" === this.getTrigger() ? (h.off("keyup.webui-popover").on("keyup.webui-popover", l.proxy(this.escapeHandler, this)), h.off("click.webui-popover touchend.webui-popover").on("click.webui-popover touchend.webui-popover", l.proxy(this.bodyClickHandler, this))) : "hover" === this.getTrigger() && h.off("touchend.webui-popover").on("touchend.webui-popover", l.proxy(this.bodyClickHandler, this)));
      },
      mouseenterHandler: function mouseenterHandler(t) {
        var e = this;
        (e = t && this.options.selector ? this.delegate(t.currentTarget) : e)._timeout && clearTimeout(e._timeout), e._enterTimeout = setTimeout(function () {
          e.getTarget().is(":visible") || e.show();
        }, this.getDelayShow());
      },
      mouseleaveHandler: function mouseleaveHandler() {
        var t = this;
        clearTimeout(t._enterTimeout), t._timeout = setTimeout(function () {
          t.hide();
        }, this.getHideDelay());
      },
      escapeHandler: function escapeHandler(t) {
        27 === t.keyCode && this.hideAll();
      },
      bodyClickHandler: function bodyClickHandler(t) {
        for (var e, i = m = !0, o = 0; o < g.length; o++) {
          var n = c(g[o]);

          if (n && n._opened) {
            var s = n.getTarget().offset(),
                h = s.left,
                r = s.top,
                a = s.left + n.getTarget().width(),
                l = s.top + n.getTarget().height(),
                s = (s = e = void 0, s = {
              x: 0,
              y: 0
            }, "touchstart" === (n = t).type || "touchmove" === n.type || "touchend" === n.type || "touchcancel" === n.type ? (e = n.originalEvent.touches[0] || n.originalEvent.changedTouches[0], s.x = e.pageX, s.y = e.pageY) : "mousedown" !== n.type && "mouseup" !== n.type && "click" !== n.type || (s.x = n.pageX, s.y = n.pageY), s);

            if (s.x >= h && s.x <= a && s.y >= r && s.y <= l) {
              i = !1;
              break;
            }
          }
        }

        i && p();
      },
      initTargetEvents: function initTargetEvents() {
        "hover" === this.getTrigger() && this.$target.off("mouseenter mouseleave").on("mouseenter", l.proxy(this.mouseenterHandler, this)).on("mouseleave", l.proxy(this.mouseleaveHandler, this)), this.$target.find(".close").off("click").on("click", l.proxy(this.hide, this, !0));
      },
      getPlacement: function getPlacement(t) {
        this.options.container;
        var e = this.$element[0].getBoundingClientRect(),
            i = "function" == typeof this.options.placement ? this.options.placement.call(this, this.getTarget()[0], this.$element[0]) : this.$element.data("placement") || this.options.placement;
        return "auto" === i || "horizontal" === i || "vertical" === i ? i = 0 < e.top && e.top < 130 ? "bottom" : "top" : "auto-top" === i ? i = "top" : "auto-bottom" === i ? i = "bottom" : "auto-left" === i ? i = "left" : "auto-right" === i && (i = "right"), i;
      },
      getElementPosition: function getElementPosition() {
        var t = this.$element[0].getBoundingClientRect(),
            e = this.options.container,
            i = e.css("position");
        if (e.is(v.body) || "static" === i) return l.extend({}, this.$element.offset(), {
          width: this.$element[0].offsetWidth || t.width,
          height: this.$element[0].offsetHeight || t.height
        });
        if ("fixed" !== i) return "relative" === i ? {
          top: this.$element.offset().top - e.offset().top,
          left: this.$element.offset().left - e.offset().left,
          width: this.$element[0].offsetWidth || t.width,
          height: this.$element[0].offsetHeight || t.height
        } : void 0;
        i = e[0].getBoundingClientRect();
        return {
          top: t.top - i.top + e.scrollTop(),
          left: t.left - i.left + e.scrollLeft(),
          width: t.width,
          height: t.height
        };
      },
      getTargetPositin: function getTargetPositin(t, e, i, o) {
        var n = t,
            s = this.options.container,
            h = this.$element.outerWidth(),
            r = this.$element.outerHeight(),
            a = v.documentElement.scrollTop + s.scrollTop(),
            t = v.documentElement.scrollLeft + s.scrollLeft(),
            l = {},
            c = null,
            s = this.options.arrow ? 20 : 0,
            p = h < 10 + s ? s : 0,
            d = r < 10 + s ? s : 0,
            a = v.documentElement.clientHeight + a,
            t = v.documentElement.clientWidth + t,
            u = 0 < n.left + n.width / 2 - p,
            f = n.left + n.width / 2 + p < t,
            g = 0 < n.top + n.height / 2 - d,
            m = n.top + n.height / 2 + d < a;

        switch (e) {
          case "bottom":
            l = {
              top: n.top + n.height,
              left: n.left + n.width / 2 - i / 2
            };
            break;

          case "top":
            l = {
              top: n.top - o,
              left: n.left + n.width / 2 - i / 2
            };
            break;

          case "left":
            l = {
              top: n.top + n.height / 2 - o / 2,
              left: n.left - i
            };
            break;

          case "right":
            l = {
              top: n.top + n.height / 2 - o / 2,
              left: n.left + n.width
            };
            break;

          case "top-right":
            l = {
              top: n.top - o,
              left: u ? n.left - p : 10
            }, c = {
              left: u ? Math.min(h, i) / 2 + p : y
            };
            break;

          case "top-left":
            l = {
              top: n.top - o,
              left: n.left - i + n.width + (f ? p : -10)
            }, c = {
              left: f ? i - Math.min(h, i) / 2 - p : y
            };
            break;

          case "bottom-right":
            l = {
              top: n.top + n.height,
              left: u ? n.left - p : 10
            }, c = {
              left: u ? Math.min(h, i) / 2 + p : y
            };
            break;

          case "bottom-left":
            l = {
              top: n.top + n.height,
              left: n.left - i + n.width + (f ? p : -10)
            }, c = {
              left: f ? i - Math.min(h, i) / 2 - p : y
            };
            break;

          case "right-top":
            l = {
              top: n.top - o + n.height + (m ? d : -10),
              left: n.left + n.width
            }, c = {
              top: m ? o - Math.min(r, o) / 2 - d : y
            };
            break;

          case "right-bottom":
            l = {
              top: g ? n.top - d : 10,
              left: n.left + n.width
            }, c = {
              top: g ? Math.min(r, o) / 2 + d : y
            };
            break;

          case "left-top":
            l = {
              top: n.top - o + n.height + (m ? d : -10),
              left: n.left - i
            }, c = {
              top: m ? o - Math.min(r, o) / 2 - d : y
            };
            break;

          case "left-bottom":
            l = {
              top: g ? n.top - d : 10,
              left: n.left - i
            }, c = {
              top: g ? Math.min(r, o) / 2 + d : y
            };
        }

        return l.top += this.getOffsetTop(), l.left += this.getOffsetLeft(), {
          position: l,
          arrowOffset: c
        };
      }
    }, l.fn[n] = function (e, i) {
      var o = [],
          t = this.each(function () {
        var t = l.data(this, "plugin_" + n);
        t ? "destroy" === e ? t.destroy() : "string" == typeof e && o.push(t[e]()) : (e ? "string" == typeof e ? "destroy" !== e && (i || (t = new r(this, null), o.push(t[e]()))) : "object" == _typeof(e) && (t = new r(this, e)) : t = new r(this, null), l.data(this, "plugin_" + n, t));
      });
      return o.length ? o : t;
    }, a.WebuiPopovers = {
      show: function show(t, e) {
        (e ? l(t).webuiPopover(e) : l(t)).webuiPopover("show");
      },
      hide: function hide(t) {
        l(t).webuiPopover("hide");
      },
      create: function create(t, e) {
        e = e || {}, l(t).webuiPopover(e);
      },
      isCreated: function isCreated(t) {
        var i = !0;
        return l(t).each(function (t, e) {
          i = i && void 0 !== l(e).data("plugin_" + n);
        }), i;
      },
      hideAll: function hideAll() {
        p();
      },
      updateContent: function updateContent(t, e) {
        var i = l(t).data("plugin_" + n);
        i && (t = i.getCache(), i.options.cache = !1, i.options.content = e, i._opened ? (i._opened = !1, i.show()) : i.isAsync() ? i.setContentASync(e) : i.setContent(e), i.options.cache = t);
      },
      updateContentAsync: function updateContentAsync(t, e) {
        var i,
            o = l(t).data("plugin_" + n);
        o && (i = o.getCache(), t = o.options.type, o.options.cache = !1, o.options.url = e, o._opened ? (o._opened = !1, o.show()) : (o.options.type = "async", o.setContentASync(o.content)), o.options.cache = i, o.options.type = t);
      },
      setDefaultOptions: function setDefaultOptions(t) {
        o = l.extend({}, o, t);
      }
    };
  }, "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(require("jquery")) : t(a.jQuery);
}(window, document);