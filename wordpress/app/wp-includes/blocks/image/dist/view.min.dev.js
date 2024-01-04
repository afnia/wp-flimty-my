"use strict";

(self.__WordPressPrivateInteractivityAPI__ = self.__WordPressPrivateInteractivityAPI__ || []).push([[354], {
  699: function _(e, t, i) {
    var o = i(754);
    var n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    var a,
        r = !1,
        c = 0;

    function l(e) {
      !r && Date.now() - c > 450 && window.scrollTo(e.core.image.scrollLeftReset, e.core.image.scrollTopReset);
    }

    function g(e, t) {
      var i = t.naturalWidth,
          o = t.naturalHeight,
          n = t.offsetWidth,
          a = t.offsetHeight,
          _t$getBoundingClientR = t.getBoundingClientRect(),
          r = _t$getBoundingClientR.x,
          c = _t$getBoundingClientR.y;

      var l = i / o;
      var g = n / a;
      if ("contain" === e.core.image.scaleAttr) if (l > g) {
        var _e = n / l;

        c += (a - _e) / 2, a = _e;
      } else {
        var _e2 = a * l;

        r += (n - _e2) / 2, n = _e2;
      }
      g = n / a;
      var d = parseFloat("none" !== e.core.image.targetWidth ? e.core.image.targetWidth : i),
          m = parseFloat("none" !== e.core.image.targetHeight ? e.core.image.targetHeight : o),
          s = d / m,
          h = d,
          u = m,
          f = d,
          w = m;

      if (l.toFixed(2) !== s.toFixed(2)) {
        if (l > s) {
          var _e3 = d / l;

          m - _e3 > d ? (m = _e3, d = _e3 * l) : m = d / l;
        } else {
          var _e4 = m * l;

          d - _e4 > m ? (d = _e4, m = _e4 / l) : d = m * l;
        }

        f = d, w = m, s = d / m, g > s ? (h = d, u = h / g) : (u = m, h = u * g);
      }

      (n > f || a > w) && (f = n, w = a);
      var b = 0;
      window.innerWidth > 480 ? b = 80 : window.innerWidth > 1920 && (b = 160);
      var x = Math.min(window.innerWidth - b, f),
          p = Math.min(window.innerHeight - 80, w);
      g > x / p ? (f = x, w = f / g) : (w = p, f = w * g);
      var E = n / f,
          y = d * (f / h),
          v = m * (w / u);
      var A = document.getElementById("wp-lightbox-styles");
      A || (A = document.createElement("style"), A.id = "wp-lightbox-styles", document.head.appendChild(A)), A.innerHTML = "\n\t\t:root {\n\t\t\t--wp--lightbox-initial-top-position: ".concat(c, "px;\n\t\t\t--wp--lightbox-initial-left-position: ").concat(r, "px;\n\t\t\t--wp--lightbox-container-width: ").concat(f + 1, "px;\n\t\t\t--wp--lightbox-container-height: ").concat(w + 1, "px;\n\t\t\t--wp--lightbox-image-width: ").concat(y, "px;\n\t\t\t--wp--lightbox-image-height: ").concat(v, "px;\n\t\t\t--wp--lightbox-scale: ").concat(E, ";\n\t\t}\n\t");
    }

    (0, o.h)({
      state: {
        core: {
          image: {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
          }
        }
      },
      actions: {
        core: {
          image: {
            showLightbox: function showLightbox(_ref) {
              var e = _ref.context,
                  t = _ref.event;
              e.core.image.imageLoaded && (e.core.image.initialized = !0, e.core.image.lastFocusedElement = window.document.activeElement, e.core.image.scrollDelta = 0, e.core.image.pointerType = t.pointerType, e.core.image.lightboxEnabled = !0, g(e, e.core.image.imageRef), e.core.image.scrollTopReset = window.pageYOffset || document.documentElement.scrollTop, e.core.image.scrollLeftReset = window.pageXOffset || document.documentElement.scrollLeft, a = l.bind(null, e), window.addEventListener("scroll", a, !1));
            },
            hideLightbox: function hideLightbox(_ref2) {
              var e;
              return regeneratorRuntime.async(function hideLightbox$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      e = _ref2.context;
                      e.core.image.hideAnimationEnabled = !0, e.core.image.lightboxEnabled && (setTimeout(function () {
                        window.removeEventListener("scroll", a), e.core.image.lightboxTriggerRef.focus({
                          preventScroll: !0
                        });
                      }, 450), e.core.image.lightboxEnabled = !1);

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            },
            handleKeydown: function handleKeydown(_ref3) {
              var e = _ref3.context,
                  t = _ref3.actions,
                  i = _ref3.event;
              e.core.image.lightboxEnabled && ("Tab" !== i.key && 9 !== i.keyCode || (i.shiftKey && window.document.activeElement === e.core.image.firstFocusableElement ? (i.preventDefault(), e.core.image.lastFocusableElement.focus()) : i.shiftKey || window.document.activeElement !== e.core.image.lastFocusableElement || (i.preventDefault(), e.core.image.firstFocusableElement.focus())), "Escape" !== i.key && 27 !== i.keyCode || t.core.image.hideLightbox({
                context: e,
                event: i
              }));
            },
            handleLoad: function handleLoad(_ref4) {
              var e = _ref4.context,
                  t = _ref4.effects,
                  i = _ref4.ref;
              e.core.image.imageLoaded = !0, e.core.image.imageCurrentSrc = i.currentSrc, t.core.image.setButtonStyles({
                context: e,
                ref: i
              });
            },
            handleTouchStart: function handleTouchStart() {
              r = !0;
            },
            handleTouchMove: function handleTouchMove(_ref5) {
              var e = _ref5.context,
                  t = _ref5.event;
              e.core.image.lightboxEnabled && t.preventDefault();
            },
            handleTouchEnd: function handleTouchEnd() {
              c = Date.now(), r = !1;
            }
          }
        }
      },
      selectors: {
        core: {
          image: {
            roleAttribute: function roleAttribute(_ref6) {
              var e = _ref6.context;
              return e.core.image.lightboxEnabled ? "dialog" : null;
            },
            ariaModal: function ariaModal(_ref7) {
              var e = _ref7.context;
              return e.core.image.lightboxEnabled ? "true" : null;
            },
            dialogLabel: function dialogLabel(_ref8) {
              var e = _ref8.context;
              return e.core.image.lightboxEnabled ? e.core.image.dialogLabel : null;
            },
            lightboxObjectFit: function lightboxObjectFit(_ref9) {
              var e = _ref9.context;
              if (e.core.image.initialized) return "cover";
            },
            enlargedImgSrc: function enlargedImgSrc(_ref10) {
              var e = _ref10.context;
              return e.core.image.initialized ? e.core.image.imageUploadedSrc : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
            }
          }
        }
      },
      effects: {
        core: {
          image: {
            initOriginImage: function initOriginImage(_ref11) {
              var e = _ref11.context,
                  t = _ref11.ref;
              e.core.image.imageRef = t, e.core.image.lightboxTriggerRef = t.parentElement.querySelector(".lightbox-trigger"), t.complete && (e.core.image.imageLoaded = !0, e.core.image.imageCurrentSrc = t.currentSrc);
            },
            initLightbox: function initLightbox(_ref12) {
              var e, t, _i;

              return regeneratorRuntime.async(function initLightbox$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      e = _ref12.context, t = _ref12.ref;

                      if (e.core.image.lightboxEnabled) {
                        _i = t.querySelectorAll(n);
                        e.core.image.firstFocusableElement = _i[0], e.core.image.lastFocusableElement = _i[_i.length - 1], t.focus();
                      }

                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            },
            setButtonStyles: function setButtonStyles(_ref13) {
              var e = _ref13.context,
                  t = _ref13.ref;
              var i = t.naturalWidth,
                  o = t.naturalHeight,
                  n = t.offsetWidth,
                  a = t.offsetHeight;
              if (0 === i || 0 === o) return;
              var r = t.parentElement,
                  c = t.parentElement.clientWidth;
              var l = t.parentElement.clientHeight;
              var g = r.querySelector("figcaption");

              if (g) {
                var _e5 = window.getComputedStyle(g);

                l = l - g.offsetHeight - parseFloat(_e5.marginTop) - parseFloat(_e5.marginBottom);
              }

              var d = l - a,
                  m = c - n;

              if ("contain" === e.core.image.scaleAttr) {
                var _t = i / o;

                if (_t >= n / a) {
                  var _i2 = n / _t;

                  e.core.image.imageButtonTop = (a - _i2) / 2 + d + 16, e.core.image.imageButtonRight = m + 16;
                } else {
                  var _i3 = a * _t;

                  e.core.image.imageButtonTop = d + 16, e.core.image.imageButtonRight = (n - _i3) / 2 + m + 16;
                }
              } else e.core.image.imageButtonTop = d + 16, e.core.image.imageButtonRight = m + 16;
            },
            setStylesOnResize: function setStylesOnResize(_ref14) {
              var e = _ref14.state,
                  t = _ref14.context,
                  i = _ref14.ref;
              t.core.image.lightboxEnabled && (e.core.image.windowWidth || e.core.image.windowHeight) && g(t, i);
            }
          }
        }
      }
    }, {
      afterLoad: function afterLoad(_ref15) {
        var e = _ref15.state;
        window.addEventListener("resize", function (e) {
          var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
          var i;
          return function () {
            var o = function o() {
              i = null, e();
            };

            clearTimeout(i), i = setTimeout(o, t);
          };
        }(function () {
          e.core.image.windowWidth = window.innerWidth, e.core.image.windowHeight = window.innerHeight;
        }));
      }
    });
  }
}, function (e) {
  var t;
  t = 699, e(e.s = t);
}]);