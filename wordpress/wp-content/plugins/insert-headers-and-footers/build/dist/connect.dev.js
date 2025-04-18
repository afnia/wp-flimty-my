"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function () {
  var t = {
    455: function _(t) {
      t.exports = function () {
        "use strict";

        function t(e) {
          return t = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
            return _typeof(t);
          } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof(t);
          }, t(e);
        }

        function e(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }

        function n(t, e) {
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
          }
        }

        function o(t, e, o) {
          return e && n(t.prototype, e), o && n(t, o), t;
        }

        function a() {
          return a = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];

              for (var o in n) {
                Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
              }
            }

            return t;
          }, a.apply(this, arguments);
        }

        function i(t) {
          return i = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }, i(t);
        }

        function r(t, e) {
          return r = Object.setPrototypeOf || function (t, e) {
            return t.__proto__ = e, t;
          }, r(t, e);
        }

        function s() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;

          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
          } catch (t) {
            return !1;
          }
        }

        function l(t, e, n) {
          return l = s() ? Reflect.construct : function (t, e, n) {
            var o = [null];
            o.push.apply(o, e);
            var a = new (Function.bind.apply(t, o))();
            return n && r(a, n.prototype), a;
          }, l.apply(null, arguments);
        }

        function c(t, e) {
          return !e || "object" != _typeof(e) && "function" != typeof e ? function (t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
          }(t) : e;
        }

        function u(t, e, n) {
          return u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
            var o = function (t, e) {
              for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = i(t));) {
                ;
              }

              return t;
            }(t, e);

            if (o) {
              var a = Object.getOwnPropertyDescriptor(o, e);
              return a.get ? a.get.call(n) : a.value;
            }
          }, u(t, e, n || t);
        }

        var d = "SweetAlert2:",
            p = function p(t) {
          return t.charAt(0).toUpperCase() + t.slice(1);
        },
            m = function m(t) {
          return Object.keys(t).map(function (e) {
            return t[e];
          });
        },
            f = function f(t) {
          return Array.prototype.slice.call(t);
        },
            w = function w(e) {
          console.warn("".concat(d, " ").concat("object" === t(e) ? e.join(" ") : e));
        },
            h = function h(t) {
          console.error("".concat(d, " ").concat(t));
        },
            g = [],
            b = function b(t, e) {
          var n;
          n = '"'.concat(t, '" is deprecated and will be removed in the next major release. Please use "').concat(e, '" instead.'), -1 === g.indexOf(n) && (g.push(n), w(n));
        },
            y = function y(t) {
          return "function" == typeof t ? t() : t;
        },
            v = function v(t) {
          return t && "function" == typeof t.toPromise;
        },
            k = function k(t) {
          return v(t) ? t.toPromise() : Promise.resolve(t);
        },
            x = function x(t) {
          return t && Promise.resolve(t) === t;
        },
            C = Object.freeze({
          cancel: "cancel",
          backdrop: "backdrop",
          close: "close",
          esc: "esc",
          timer: "timer"
        }),
            A = function A(e) {
          return e instanceof Element || function (e) {
            return "object" === t(e) && e.jquery;
          }(e);
        },
            B = function B(t) {
          var e = {};

          for (var n in t) {
            e[t[n]] = "swal2-" + t[n];
          }

          return e;
        },
            P = B(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "header", "content", "html-container", "actions", "confirm", "deny", "cancel", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error"]),
            O = B(["success", "warning", "info", "question", "error"]),
            E = function E() {
          return document.body.querySelector(".".concat(P.container));
        },
            S = function S(t) {
          var e = E();
          return e ? e.querySelector(t) : null;
        },
            T = function T(t) {
          return S(".".concat(t));
        },
            L = function L() {
          return T(P.popup);
        },
            j = function j() {
          return T(P.icon);
        },
            z = function z() {
          return T(P.title);
        },
            q = function q() {
          return T(P.content);
        },
            D = function D() {
          return T(P["html-container"]);
        },
            M = function M() {
          return T(P.image);
        },
            I = function I() {
          return T(P["progress-steps"]);
        },
            H = function H() {
          return T(P["validation-message"]);
        },
            V = function V() {
          return S(".".concat(P.actions, " .").concat(P.confirm));
        },
            N = function N() {
          return S(".".concat(P.actions, " .").concat(P.deny));
        },
            R = function R() {
          return S(".".concat(P.loader));
        },
            _ = function _() {
          return S(".".concat(P.actions, " .").concat(P.cancel));
        },
            U = function U() {
          return T(P.actions);
        },
            F = function F() {
          return T(P.header);
        },
            Y = function Y() {
          return T(P.footer);
        },
            $ = function $() {
          return T(P["timer-progress-bar"]);
        },
            W = function W() {
          return T(P.close);
        },
            Z = function Z() {
          var t = f(L().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function (t, e) {
            return (t = parseInt(t.getAttribute("tabindex"))) > (e = parseInt(e.getAttribute("tabindex"))) ? 1 : t < e ? -1 : 0;
          }),
              e = f(L().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(function (t) {
            return "-1" !== t.getAttribute("tabindex");
          });
          return function (t) {
            for (var e = [], n = 0; n < t.length; n++) {
              -1 === e.indexOf(t[n]) && e.push(t[n]);
            }

            return e;
          }(t.concat(e)).filter(function (t) {
            return mt(t);
          });
        },
            K = function K() {
          return !X() && !document.body.classList.contains(P["no-backdrop"]);
        },
            X = function X() {
          return document.body.classList.contains(P["toast-shown"]);
        },
            Q = {
          previousBodyPadding: null
        },
            J = function J(t, e) {
          if (t.textContent = "", e) {
            var n = new DOMParser().parseFromString(e, "text/html");
            f(n.querySelector("head").childNodes).forEach(function (e) {
              t.appendChild(e);
            }), f(n.querySelector("body").childNodes).forEach(function (e) {
              t.appendChild(e);
            });
          }
        },
            G = function G(t, e) {
          if (!e) return !1;

          for (var n = e.split(/\s+/), o = 0; o < n.length; o++) {
            if (!t.classList.contains(n[o])) return !1;
          }

          return !0;
        },
            tt = function tt(e, n, o) {
          if (function (t, e) {
            f(t.classList).forEach(function (n) {
              -1 === m(P).indexOf(n) && -1 === m(O).indexOf(n) && -1 === m(e.showClass).indexOf(n) && t.classList.remove(n);
            });
          }(e, n), n.customClass && n.customClass[o]) {
            if ("string" != typeof n.customClass[o] && !n.customClass[o].forEach) return w("Invalid type of customClass.".concat(o, '! Expected string or iterable object, got "').concat(t(n.customClass[o]), '"'));
            it(e, n.customClass[o]);
          }
        };

        function et(t, e) {
          if (!e) return null;

          switch (e) {
            case "select":
            case "textarea":
            case "file":
              return st(t, P[e]);

            case "checkbox":
              return t.querySelector(".".concat(P.checkbox, " input"));

            case "radio":
              return t.querySelector(".".concat(P.radio, " input:checked")) || t.querySelector(".".concat(P.radio, " input:first-child"));

            case "range":
              return t.querySelector(".".concat(P.range, " input"));

            default:
              return st(t, P.input);
          }
        }

        var nt,
            ot = function ot(t) {
          if (t.focus(), "file" !== t.type) {
            var e = t.value;
            t.value = "", t.value = e;
          }
        },
            at = function at(t, e, n) {
          t && e && ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)), e.forEach(function (e) {
            t.forEach ? t.forEach(function (t) {
              n ? t.classList.add(e) : t.classList.remove(e);
            }) : n ? t.classList.add(e) : t.classList.remove(e);
          }));
        },
            it = function it(t, e) {
          at(t, e, !0);
        },
            rt = function rt(t, e) {
          at(t, e, !1);
        },
            st = function st(t, e) {
          for (var n = 0; n < t.childNodes.length; n++) {
            if (G(t.childNodes[n], e)) return t.childNodes[n];
          }
        },
            lt = function lt(t, e, n) {
          n === "".concat(parseInt(n)) && (n = parseInt(n)), n || 0 === parseInt(n) ? t.style[e] = "number" == typeof n ? "".concat(n, "px") : n : t.style.removeProperty(e);
        },
            ct = function ct(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "flex";
          t.style.display = e;
        },
            ut = function ut(t) {
          t.style.display = "none";
        },
            dt = function dt(t, e, n, o) {
          var a = t.querySelector(e);
          a && (a.style[n] = o);
        },
            pt = function pt(t, e, n) {
          e ? ct(t, n) : ut(t);
        },
            mt = function mt(t) {
          return !(!t || !(t.offsetWidth || t.offsetHeight || t.getClientRects().length));
        },
            ft = function ft(t) {
          return !!(t.scrollHeight > t.clientHeight);
        },
            wt = function wt(t) {
          var e = window.getComputedStyle(t),
              n = parseFloat(e.getPropertyValue("animation-duration") || "0"),
              o = parseFloat(e.getPropertyValue("transition-duration") || "0");
          return n > 0 || o > 0;
        },
            ht = function ht(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = $();
          mt(n) && (e && (n.style.transition = "none", n.style.width = "100%"), setTimeout(function () {
            n.style.transition = "width ".concat(t / 1e3, "s linear"), n.style.width = "0%";
          }, 10));
        },
            gt = function gt() {
          return "undefined" == typeof window || "undefined" == typeof document;
        },
            bt = '\n <div aria-labelledby="'.concat(P.title, '" aria-describedby="').concat(P.content, '" class="').concat(P.popup, '" tabindex="-1">\n   <div class="').concat(P.header, '">\n     <ul class="').concat(P["progress-steps"], '"></ul>\n     <div class="').concat(P.icon, '"></div>\n     <img class="').concat(P.image, '" />\n     <h2 class="').concat(P.title, '" id="').concat(P.title, '"></h2>\n     <button type="button" class="').concat(P.close, '"></button>\n   </div>\n   <div class="').concat(P.content, '">\n     <div id="').concat(P.content, '" class="').concat(P["html-container"], '"></div>\n     <input class="').concat(P.input, '" />\n     <input type="file" class="').concat(P.file, '" />\n     <div class="').concat(P.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(P.select, '"></select>\n     <div class="').concat(P.radio, '"></div>\n     <label for="').concat(P.checkbox, '" class="').concat(P.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(P.label, '"></span>\n     </label>\n     <textarea class="').concat(P.textarea, '"></textarea>\n     <div class="').concat(P["validation-message"], '" id="').concat(P["validation-message"], '"></div>\n   </div>\n   <div class="').concat(P.actions, '">\n     <div class="').concat(P.loader, '"></div>\n     <button type="button" class="').concat(P.confirm, '"></button>\n     <button type="button" class="').concat(P.deny, '"></button>\n     <button type="button" class="').concat(P.cancel, '"></button>\n   </div>\n   <div class="').concat(P.footer, '"></div>\n   <div class="').concat(P["timer-progress-bar-container"], '">\n     <div class="').concat(P["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
            yt = function yt(t) {
          Vn.isVisible() && nt !== t.target.value && Vn.resetValidationMessage(), nt = t.target.value;
        },
            vt = function vt(t) {
          var e,
              n,
              o,
              a,
              i,
              r,
              s,
              l,
              c,
              u,
              d = !!(e = E()) && (e.parentNode.removeChild(e), rt([document.documentElement, document.body], [P["no-backdrop"], P["toast-shown"], P["has-column"]]), !0);
          if (gt()) h("SweetAlert2 requires document to initialize");else {
            var p = document.createElement("div");
            p.className = P.container, d && it(p, P["no-transition"]), J(p, bt);
            var m = "string" == typeof (u = t.target) ? document.querySelector(u) : u;
            m.appendChild(p), function (t) {
              var e = L();
              e.setAttribute("role", t.toast ? "alert" : "dialog"), e.setAttribute("aria-live", t.toast ? "polite" : "assertive"), t.toast || e.setAttribute("aria-modal", "true");
            }(t), function (t) {
              "rtl" === window.getComputedStyle(t).direction && it(E(), P.rtl);
            }(m), n = q(), o = st(n, P.input), a = st(n, P.file), i = n.querySelector(".".concat(P.range, " input")), r = n.querySelector(".".concat(P.range, " output")), s = st(n, P.select), l = n.querySelector(".".concat(P.checkbox, " input")), c = st(n, P.textarea), o.oninput = yt, a.onchange = yt, s.onchange = yt, l.onchange = yt, c.oninput = yt, i.oninput = function (t) {
              yt(t), r.value = i.value;
            }, i.onchange = function (t) {
              yt(t), i.nextSibling.value = i.value;
            };
          }
        },
            kt = function kt(e, n) {
          e instanceof HTMLElement ? n.appendChild(e) : "object" === t(e) ? xt(e, n) : e && J(n, e);
        },
            xt = function xt(t, e) {
          t.jquery ? Ct(e, t) : J(e, t.toString());
        },
            Ct = function Ct(t, e) {
          if (t.textContent = "", 0 in e) for (var n = 0; n in e; n++) {
            t.appendChild(e[n].cloneNode(!0));
          } else t.appendChild(e.cloneNode(!0));
        },
            At = function () {
          if (gt()) return !1;
          var t = document.createElement("div"),
              e = {
            WebkitAnimation: "webkitAnimationEnd",
            OAnimation: "oAnimationEnd oanimationend",
            animation: "animationend"
          };

          for (var n in e) {
            if (Object.prototype.hasOwnProperty.call(e, n) && void 0 !== t.style[n]) return e[n];
          }

          return !1;
        }(),
            Bt = function Bt(t, e) {
          var n = U(),
              o = R(),
              a = V(),
              i = N(),
              r = _();

          e.showConfirmButton || e.showDenyButton || e.showCancelButton || ut(n), tt(n, e, "actions"), Pt(a, "confirm", e), Pt(i, "deny", e), Pt(r, "cancel", e), function (t, e, n, o) {
            if (!o.buttonsStyling) return rt([t, e, n], P.styled);
            it([t, e, n], P.styled), o.confirmButtonColor && (t.style.backgroundColor = o.confirmButtonColor), o.denyButtonColor && (e.style.backgroundColor = o.denyButtonColor), o.cancelButtonColor && (n.style.backgroundColor = o.cancelButtonColor);
          }(a, i, r, e), e.reverseButtons && (n.insertBefore(r, o), n.insertBefore(i, o), n.insertBefore(a, o)), J(o, e.loaderHtml), tt(o, e, "loader");
        };

        function Pt(t, e, n) {
          pt(t, n["show".concat(p(e), "Button")], "inline-block"), J(t, n["".concat(e, "ButtonText")]), t.setAttribute("aria-label", n["".concat(e, "ButtonAriaLabel")]), t.className = P[e], tt(t, n, "".concat(e, "Button")), it(t, n["".concat(e, "ButtonClass")]);
        }

        var Ot = function Ot(t, e) {
          var n = E();

          if (n) {
            (function (t, e) {
              "string" == typeof e ? t.style.background = e : e || it([document.documentElement, document.body], P["no-backdrop"]);
            })(n, e.backdrop), !e.backdrop && e.allowOutsideClick && w('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'), function (t, e) {
              e in P ? it(t, P[e]) : (w('The "position" parameter is not valid, defaulting to "center"'), it(t, P.center));
            }(n, e.position), function (t, e) {
              if (e && "string" == typeof e) {
                var n = "grow-".concat(e);
                n in P && it(t, P[n]);
              }
            }(n, e.grow), tt(n, e, "container");
            var o = document.body.getAttribute("data-swal2-queue-step");
            o && (n.setAttribute("data-queue-step", o), document.body.removeAttribute("data-swal2-queue-step"));
          }
        },
            Et = {
          promise: new WeakMap(),
          innerParams: new WeakMap(),
          domCache: new WeakMap()
        },
            St = ["input", "file", "range", "select", "radio", "checkbox", "textarea"],
            Tt = function Tt(t) {
          if (!Mt[t.input]) return h('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(t.input, '"'));
          var e = Dt(t.input),
              n = Mt[t.input](e, t);
          ct(n), setTimeout(function () {
            ot(n);
          });
        },
            Lt = function Lt(t, e) {
          var n = et(q(), t);
          if (n) for (var o in function (t) {
            for (var e = 0; e < t.attributes.length; e++) {
              var n = t.attributes[e].name;
              -1 === ["type", "value", "style"].indexOf(n) && t.removeAttribute(n);
            }
          }(n), e) {
            "range" === t && "placeholder" === o || n.setAttribute(o, e[o]);
          }
        },
            jt = function jt(t) {
          var e = Dt(t.input);
          t.customClass && it(e, t.customClass.input);
        },
            zt = function zt(t, e) {
          t.placeholder && !e.inputPlaceholder || (t.placeholder = e.inputPlaceholder);
        },
            qt = function qt(t, e, n) {
          if (n.inputLabel) {
            t.id = P.input;
            var o = document.createElement("label"),
                a = P["input-label"];
            o.setAttribute("for", t.id), o.className = a, it(o, n.customClass.inputLabel), o.innerText = n.inputLabel, e.insertAdjacentElement("beforebegin", o);
          }
        },
            Dt = function Dt(t) {
          var e = P[t] ? P[t] : P.input;
          return st(q(), e);
        },
            Mt = {};

        Mt.text = Mt.email = Mt.password = Mt.number = Mt.tel = Mt.url = function (e, n) {
          return "string" == typeof n.inputValue || "number" == typeof n.inputValue ? e.value = n.inputValue : x(n.inputValue) || w('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(t(n.inputValue), '"')), qt(e, e, n), zt(e, n), e.type = n.input, e;
        }, Mt.file = function (t, e) {
          return qt(t, t, e), zt(t, e), t;
        }, Mt.range = function (t, e) {
          var n = t.querySelector("input"),
              o = t.querySelector("output");
          return n.value = e.inputValue, n.type = e.input, o.value = e.inputValue, qt(n, t, e), t;
        }, Mt.select = function (t, e) {
          if (t.textContent = "", e.inputPlaceholder) {
            var n = document.createElement("option");
            J(n, e.inputPlaceholder), n.value = "", n.disabled = !0, n.selected = !0, t.appendChild(n);
          }

          return qt(t, t, e), t;
        }, Mt.radio = function (t) {
          return t.textContent = "", t;
        }, Mt.checkbox = function (t, e) {
          var n = et(q(), "checkbox");
          n.value = 1, n.id = P.checkbox, n.checked = Boolean(e.inputValue);
          var o = t.querySelector("span");
          return J(o, e.inputPlaceholder), t;
        }, Mt.textarea = function (t, e) {
          t.value = e.inputValue, zt(t, e), qt(t, t, e);

          var n = function n(t) {
            return parseInt(window.getComputedStyle(t).paddingLeft) + parseInt(window.getComputedStyle(t).paddingRight);
          };

          if ("MutationObserver" in window) {
            var o = parseInt(window.getComputedStyle(L()).width);
            new MutationObserver(function () {
              var e = t.offsetWidth + n(L()) + n(q());
              L().style.width = e > o ? "".concat(e, "px") : null;
            }).observe(t, {
              attributes: !0,
              attributeFilter: ["style"]
            });
          }

          return t;
        };

        var It = function It(t, e) {
          var n = D();
          tt(n, e, "htmlContainer"), e.html ? (kt(e.html, n), ct(n, "block")) : e.text ? (n.textContent = e.text, ct(n, "block")) : ut(n), function (t, e) {
            var n = q(),
                o = Et.innerParams.get(t),
                a = !o || e.input !== o.input;
            St.forEach(function (t) {
              var o = P[t],
                  i = st(n, o);
              Lt(t, e.inputAttributes), i.className = o, a && ut(i);
            }), e.input && (a && Tt(e), jt(e));
          }(t, e), tt(q(), e, "content");
        },
            Ht = function Ht(t, e) {
          for (var n in O) {
            e.icon !== n && rt(t, O[n]);
          }

          it(t, O[e.icon]), Rt(t, e), Vt(), tt(t, e, "icon");
        },
            Vt = function Vt() {
          for (var t = L(), e = window.getComputedStyle(t).getPropertyValue("background-color"), n = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), o = 0; o < n.length; o++) {
            n[o].style.backgroundColor = e;
          }
        },
            Nt = function Nt(t, e) {
          t.textContent = "", e.iconHtml ? J(t, _t(e.iconHtml)) : "success" === e.icon ? J(t, '\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    ') : "error" === e.icon ? J(t, '\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    ') : J(t, _t({
            question: "?",
            warning: "!",
            info: "i"
          }[e.icon]));
        },
            Rt = function Rt(t, e) {
          if (e.iconColor) {
            t.style.color = e.iconColor, t.style.borderColor = e.iconColor;

            for (var n = 0, o = [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"]; n < o.length; n++) {
              dt(t, o[n], "backgroundColor", e.iconColor);
            }

            dt(t, ".swal2-success-ring", "borderColor", e.iconColor);
          }
        },
            _t = function _t(t) {
          return '<div class="'.concat(P["icon-content"], '">').concat(t, "</div>");
        },
            Ut = [],
            Ft = function Ft() {
          return E() && E().getAttribute("data-queue-step");
        },
            Yt = function Yt(t, e) {
          var n = I();
          if (!e.progressSteps || 0 === e.progressSteps.length) return ut(n);
          ct(n), n.textContent = "";
          var o = parseInt(void 0 === e.currentProgressStep ? Ft() : e.currentProgressStep);
          o >= e.progressSteps.length && w("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), e.progressSteps.forEach(function (t, a) {
            var i = function (t) {
              var e = document.createElement("li");
              return it(e, P["progress-step"]), J(e, t), e;
            }(t);

            if (n.appendChild(i), a === o && it(i, P["active-progress-step"]), a !== e.progressSteps.length - 1) {
              var r = function (t) {
                var e = document.createElement("li");
                return it(e, P["progress-step-line"]), t.progressStepsDistance && (e.style.width = t.progressStepsDistance), e;
              }(e);

              n.appendChild(r);
            }
          });
        },
            $t = function $t(t, e) {
          var n = F();
          tt(n, e, "header"), Yt(0, e), function (t, e) {
            var n = Et.innerParams.get(t),
                o = j();
            n && e.icon === n.icon ? (Nt(o, e), Ht(o, e)) : e.icon || e.iconHtml ? e.icon && -1 === Object.keys(O).indexOf(e.icon) ? (h('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.icon, '"')), ut(o)) : (ct(o), Nt(o, e), Ht(o, e), it(o, e.showClass.icon)) : ut(o);
          }(t, e), function (t, e) {
            var n = M();
            if (!e.imageUrl) return ut(n);
            ct(n, ""), n.setAttribute("src", e.imageUrl), n.setAttribute("alt", e.imageAlt), lt(n, "width", e.imageWidth), lt(n, "height", e.imageHeight), n.className = P.image, tt(n, e, "image");
          }(0, e), function (t, e) {
            var n = z();
            pt(n, e.title || e.titleText, "block"), e.title && kt(e.title, n), e.titleText && (n.innerText = e.titleText), tt(n, e, "title");
          }(0, e), function (t, e) {
            var n = W();
            J(n, e.closeButtonHtml), tt(n, e, "closeButton"), pt(n, e.showCloseButton), n.setAttribute("aria-label", e.closeButtonAriaLabel);
          }(0, e);
        },
            Wt = function Wt(t, e) {
          t.className = "".concat(P.popup, " ").concat(mt(t) ? e.showClass.popup : ""), e.toast ? (it([document.documentElement, document.body], P["toast-shown"]), it(t, P.toast)) : it(t, P.modal), tt(t, e, "popup"), "string" == typeof e.customClass && it(t, e.customClass), e.icon && it(t, P["icon-".concat(e.icon)]);
        },
            Zt = function Zt(t, e) {
          (function (t, e) {
            var n = E(),
                o = L();
            e.toast ? (lt(n, "width", e.width), o.style.width = "100%") : lt(o, "width", e.width), lt(o, "padding", e.padding), e.background && (o.style.background = e.background), ut(H()), Wt(o, e);
          })(0, e), Ot(0, e), $t(t, e), It(t, e), Bt(0, e), function (t, e) {
            var n = Y();
            pt(n, e.footer), e.footer && kt(e.footer, n), tt(n, e, "footer");
          }(0, e), "function" == typeof e.didRender ? e.didRender(L()) : "function" == typeof e.onRender && e.onRender(L());
        },
            Kt = function Kt() {
          return V() && V().click();
        };

        var Xt = function Xt(t) {
          var e = L();
          e || Vn.fire(), e = L();
          var n = U(),
              o = R();
          !t && mt(V()) && (t = V()), ct(n), t && (ut(t), o.setAttribute("data-button-to-replace", t.className)), o.parentNode.insertBefore(o, t), it([e, n], P.loading), ct(o), e.setAttribute("data-loading", !0), e.setAttribute("aria-busy", !0), e.focus();
        },
            Qt = {},
            Jt = function Jt(t) {
          return new Promise(function (e) {
            if (!t) return e();
            var n = window.scrollX,
                o = window.scrollY;
            Qt.restoreFocusTimeout = setTimeout(function () {
              Qt.previousActiveElement && Qt.previousActiveElement.focus ? (Qt.previousActiveElement.focus(), Qt.previousActiveElement = null) : document.body && document.body.focus(), e();
            }, 100), void 0 !== n && void 0 !== o && window.scrollTo(n, o);
          });
        },
            Gt = function Gt() {
          if (Qt.timeout) return function () {
            var t = $(),
                e = parseInt(window.getComputedStyle(t).width);
            t.style.removeProperty("transition"), t.style.width = "100%";
            var n = parseInt(window.getComputedStyle(t).width),
                o = parseInt(e / n * 100);
            t.style.removeProperty("transition"), t.style.width = "".concat(o, "%");
          }(), Qt.timeout.stop();
        },
            te = function te() {
          if (Qt.timeout) {
            var t = Qt.timeout.start();
            return ht(t), t;
          }
        },
            ee = !1,
            ne = {};

        var oe = function oe(t) {
          for (var e = t.target; e && e !== document; e = e.parentNode) {
            for (var n in ne) {
              var o = e.getAttribute(n);
              if (o) return void ne[n].fire({
                template: o
              });
            }
          }
        },
            ae = {
          title: "",
          titleText: "",
          text: "",
          html: "",
          footer: "",
          icon: void 0,
          iconColor: void 0,
          iconHtml: void 0,
          template: void 0,
          toast: !1,
          animation: !0,
          showClass: {
            popup: "swal2-show",
            backdrop: "swal2-backdrop-show",
            icon: "swal2-icon-show"
          },
          hideClass: {
            popup: "swal2-hide",
            backdrop: "swal2-backdrop-hide",
            icon: "swal2-icon-hide"
          },
          customClass: {},
          target: "body",
          backdrop: !0,
          heightAuto: !0,
          allowOutsideClick: !0,
          allowEscapeKey: !0,
          allowEnterKey: !0,
          stopKeydownPropagation: !0,
          keydownListenerCapture: !1,
          showConfirmButton: !0,
          showDenyButton: !1,
          showCancelButton: !1,
          preConfirm: void 0,
          preDeny: void 0,
          confirmButtonText: "OK",
          confirmButtonAriaLabel: "",
          confirmButtonColor: void 0,
          denyButtonText: "No",
          denyButtonAriaLabel: "",
          denyButtonColor: void 0,
          cancelButtonText: "Cancel",
          cancelButtonAriaLabel: "",
          cancelButtonColor: void 0,
          buttonsStyling: !0,
          reverseButtons: !1,
          focusConfirm: !0,
          focusDeny: !1,
          focusCancel: !1,
          returnFocus: !0,
          showCloseButton: !1,
          closeButtonHtml: "&times;",
          closeButtonAriaLabel: "Close this dialog",
          loaderHtml: "",
          showLoaderOnConfirm: !1,
          showLoaderOnDeny: !1,
          imageUrl: void 0,
          imageWidth: void 0,
          imageHeight: void 0,
          imageAlt: "",
          timer: void 0,
          timerProgressBar: !1,
          width: void 0,
          padding: void 0,
          background: void 0,
          input: void 0,
          inputPlaceholder: "",
          inputLabel: "",
          inputValue: "",
          inputOptions: {},
          inputAutoTrim: !0,
          inputAttributes: {},
          inputValidator: void 0,
          returnInputValueOnDeny: !1,
          validationMessage: void 0,
          grow: !1,
          position: "center",
          progressSteps: [],
          currentProgressStep: void 0,
          progressStepsDistance: void 0,
          onBeforeOpen: void 0,
          onOpen: void 0,
          willOpen: void 0,
          didOpen: void 0,
          onRender: void 0,
          didRender: void 0,
          onClose: void 0,
          onAfterClose: void 0,
          willClose: void 0,
          didClose: void 0,
          onDestroy: void 0,
          didDestroy: void 0,
          scrollbarPadding: !0
        },
            ie = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "onAfterClose", "onClose", "onDestroy", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"],
            re = {
          animation: 'showClass" and "hideClass',
          onBeforeOpen: "willOpen",
          onOpen: "didOpen",
          onRender: "didRender",
          onClose: "willClose",
          onAfterClose: "didClose",
          onDestroy: "didDestroy"
        },
            se = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture"],
            le = function le(t) {
          return Object.prototype.hasOwnProperty.call(ae, t);
        },
            ce = function ce(t) {
          return re[t];
        },
            ue = function ue(t) {
          le(t) || w('Unknown parameter "'.concat(t, '"'));
        },
            de = function de(t) {
          -1 !== se.indexOf(t) && w('The parameter "'.concat(t, '" is incompatible with toasts'));
        },
            pe = function pe(t) {
          ce(t) && b(t, ce(t));
        },
            me = function me(t) {
          for (var e in t) {
            ue(e), t.toast && de(e), pe(e);
          }
        },
            fe = Object.freeze({
          isValidParameter: le,
          isUpdatableParameter: function isUpdatableParameter(t) {
            return -1 !== ie.indexOf(t);
          },
          isDeprecatedParameter: ce,
          argsToParams: function argsToParams(e) {
            var n = {};
            return "object" !== t(e[0]) || A(e[0]) ? ["title", "html", "icon"].forEach(function (o, a) {
              var i = e[a];
              "string" == typeof i || A(i) ? n[o] = i : void 0 !== i && h("Unexpected type of ".concat(o, '! Expected "string" or "Element", got ').concat(t(i)));
            }) : a(n, e[0]), n;
          },
          isVisible: function isVisible() {
            return mt(L());
          },
          clickConfirm: Kt,
          clickDeny: function clickDeny() {
            return N() && N().click();
          },
          clickCancel: function clickCancel() {
            return _() && _().click();
          },
          getContainer: E,
          getPopup: L,
          getTitle: z,
          getContent: q,
          getHtmlContainer: D,
          getImage: M,
          getIcon: j,
          getInputLabel: function getInputLabel() {
            return T(P["input-label"]);
          },
          getCloseButton: W,
          getActions: U,
          getConfirmButton: V,
          getDenyButton: N,
          getCancelButton: _,
          getLoader: R,
          getHeader: F,
          getFooter: Y,
          getTimerProgressBar: $,
          getFocusableElements: Z,
          getValidationMessage: H,
          isLoading: function isLoading() {
            return L().hasAttribute("data-loading");
          },
          fire: function fire() {
            for (var t = this, e = arguments.length, n = new Array(e), o = 0; o < e; o++) {
              n[o] = arguments[o];
            }

            return l(t, n);
          },
          mixin: function mixin(t) {
            var n = function (n) {
              !function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                  }
                }), e && r(t, e);
              }(m, n);
              var l,
                  d,
                  p = (l = m, d = s(), function () {
                var t,
                    e = i(l);

                if (d) {
                  var n = i(this).constructor;
                  t = Reflect.construct(e, arguments, n);
                } else t = e.apply(this, arguments);

                return c(this, t);
              });

              function m() {
                return e(this, m), p.apply(this, arguments);
              }

              return o(m, [{
                key: "_main",
                value: function value(e, n) {
                  return u(i(m.prototype), "_main", this).call(this, e, a({}, t, n));
                }
              }]), m;
            }(this);

            return n;
          },
          queue: function queue(t) {
            b("Swal.queue()", "async/await");
            var e = this;
            Ut = t;

            var n = function n(t, e) {
              Ut = [], t(e);
            },
                o = [];

            return new Promise(function (t) {
              !function a(i, r) {
                i < Ut.length ? (document.body.setAttribute("data-swal2-queue-step", i), e.fire(Ut[i]).then(function (e) {
                  void 0 !== e.value ? (o.push(e.value), a(i + 1, r)) : n(t, {
                    dismiss: e.dismiss
                  });
                })) : n(t, {
                  value: o
                });
              }(0);
            });
          },
          getQueueStep: Ft,
          insertQueueStep: function insertQueueStep(t, e) {
            return e && e < Ut.length ? Ut.splice(e, 0, t) : Ut.push(t);
          },
          deleteQueueStep: function deleteQueueStep(t) {
            void 0 !== Ut[t] && Ut.splice(t, 1);
          },
          showLoading: Xt,
          enableLoading: Xt,
          getTimerLeft: function getTimerLeft() {
            return Qt.timeout && Qt.timeout.getTimerLeft();
          },
          stopTimer: Gt,
          resumeTimer: te,
          toggleTimer: function toggleTimer() {
            var t = Qt.timeout;
            return t && (t.running ? Gt() : te());
          },
          increaseTimer: function increaseTimer(t) {
            if (Qt.timeout) {
              var e = Qt.timeout.increase(t);
              return ht(e, !0), e;
            }
          },
          isTimerRunning: function isTimerRunning() {
            return Qt.timeout && Qt.timeout.isRunning();
          },
          bindClickHandler: function bindClickHandler() {
            ne[arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "data-swal-template"] = this, ee || (document.body.addEventListener("click", oe), ee = !0);
          }
        });

        function we() {
          if (Et.innerParams.get(this)) {
            var t = Et.domCache.get(this);
            ut(t.loader);
            var e = t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"));
            e.length ? ct(e[0], "inline-block") : !mt(V()) && !mt(N()) && !mt(_()) && ut(t.actions), rt([t.popup, t.actions], P.loading), t.popup.removeAttribute("aria-busy"), t.popup.removeAttribute("data-loading"), t.confirmButton.disabled = !1, t.denyButton.disabled = !1, t.cancelButton.disabled = !1;
          }
        }

        var he = function he() {
          null === Q.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (Q.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = "".concat(Q.previousBodyPadding + function () {
            var t = document.createElement("div");
            t.className = P["scrollbar-measure"], document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }(), "px"));
        },
            ge = function ge() {
          if (!navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i)) {
            L().scrollHeight > window.innerHeight - 44 && (E().style.paddingBottom = "".concat(44, "px"));
          }
        },
            be = function be() {
          var t,
              e = E();
          e.ontouchstart = function (e) {
            t = ye(e);
          }, e.ontouchmove = function (e) {
            t && (e.preventDefault(), e.stopPropagation());
          };
        },
            ye = function ye(t) {
          var e = t.target,
              n = E();
          return !(ve(t) || ke(t) || e !== n && (ft(n) || "INPUT" === e.tagName || ft(q()) && q().contains(e)));
        },
            ve = function ve(t) {
          return t.touches && t.touches.length && "stylus" === t.touches[0].touchType;
        },
            ke = function ke(t) {
          return t.touches && t.touches.length > 1;
        },
            xe = function xe() {
          return !!window.MSInputMethodContext && !!document.documentMode;
        },
            Ce = function Ce() {
          var t = E(),
              e = L();
          t.style.removeProperty("align-items"), e.offsetTop < 0 && (t.style.alignItems = "flex-start");
        },
            Ae = {
          swalPromiseResolve: new WeakMap()
        };

        function Be(t, e, n, o) {
          X() ? Le(t, o) : (Jt(n).then(function () {
            return Le(t, o);
          }), Qt.keydownTarget.removeEventListener("keydown", Qt.keydownHandler, {
            capture: Qt.keydownListenerCapture
          }), Qt.keydownHandlerAdded = !1), e.parentNode && !document.body.getAttribute("data-swal2-queue-step") && e.parentNode.removeChild(e), K() && (null !== Q.previousBodyPadding && (document.body.style.paddingRight = "".concat(Q.previousBodyPadding, "px"), Q.previousBodyPadding = null), function () {
            if (G(document.body, P.iosfix)) {
              var t = parseInt(document.body.style.top, 10);
              rt(document.body, P.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * t;
            }
          }(), "undefined" != typeof window && xe() && window.removeEventListener("resize", Ce), f(document.body.children).forEach(function (t) {
            t.hasAttribute("data-previous-aria-hidden") ? (t.setAttribute("aria-hidden", t.getAttribute("data-previous-aria-hidden")), t.removeAttribute("data-previous-aria-hidden")) : t.removeAttribute("aria-hidden");
          })), rt([document.documentElement, document.body], [P.shown, P["height-auto"], P["no-backdrop"], P["toast-shown"]]);
        }

        function Pe(t) {
          var e = L();

          if (e) {
            t = Oe(t);
            var n = Et.innerParams.get(this);

            if (n && !G(e, n.hideClass.popup)) {
              var o = Ae.swalPromiseResolve.get(this);
              rt(e, n.showClass.popup), it(e, n.hideClass.popup);
              var a = E();
              rt(a, n.showClass.backdrop), it(a, n.hideClass.backdrop), Ee(this, e, n), o(t);
            }
          }
        }

        var Oe = function Oe(t) {
          return void 0 === t ? {
            isConfirmed: !1,
            isDenied: !1,
            isDismissed: !0
          } : a({
            isConfirmed: !1,
            isDenied: !1,
            isDismissed: !1
          }, t);
        },
            Ee = function Ee(t, e, n) {
          var o = E(),
              a = At && wt(e),
              i = n.onClose,
              r = n.onAfterClose,
              s = n.willClose,
              l = n.didClose;
          Se(e, s, i), a ? Te(t, e, o, n.returnFocus, l || r) : Be(t, o, n.returnFocus, l || r);
        },
            Se = function Se(t, e, n) {
          null !== e && "function" == typeof e ? e(t) : null !== n && "function" == typeof n && n(t);
        },
            Te = function Te(t, e, n, o, a) {
          Qt.swalCloseEventFinishedCallback = Be.bind(null, t, n, o, a), e.addEventListener(At, function (t) {
            t.target === e && (Qt.swalCloseEventFinishedCallback(), delete Qt.swalCloseEventFinishedCallback);
          });
        },
            Le = function Le(t, e) {
          setTimeout(function () {
            "function" == typeof e && e(), t._destroy();
          });
        };

        function je(t, e, n) {
          var o = Et.domCache.get(t);
          e.forEach(function (t) {
            o[t].disabled = n;
          });
        }

        function ze(t, e) {
          if (!t) return !1;
          if ("radio" === t.type) for (var n = t.parentNode.parentNode.querySelectorAll("input"), o = 0; o < n.length; o++) {
            n[o].disabled = e;
          } else t.disabled = e;
        }

        var qe = function () {
          function t(n, o) {
            e(this, t), this.callback = n, this.remaining = o, this.running = !1, this.start();
          }

          return o(t, [{
            key: "start",
            value: function value() {
              return this.running || (this.running = !0, this.started = new Date(), this.id = setTimeout(this.callback, this.remaining)), this.remaining;
            }
          }, {
            key: "stop",
            value: function value() {
              return this.running && (this.running = !1, clearTimeout(this.id), this.remaining -= new Date() - this.started), this.remaining;
            }
          }, {
            key: "increase",
            value: function value(t) {
              var e = this.running;
              return e && this.stop(), this.remaining += t, e && this.start(), this.remaining;
            }
          }, {
            key: "getTimerLeft",
            value: function value() {
              return this.running && (this.stop(), this.start()), this.remaining;
            }
          }, {
            key: "isRunning",
            value: function value() {
              return this.running;
            }
          }]), t;
        }(),
            De = {
          email: function email(t, e) {
            return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid email address");
          },
          url: function url(t, e) {
            return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid URL");
          }
        };

        function Me(t) {
          (function (t) {
            t.inputValidator || Object.keys(De).forEach(function (e) {
              t.input === e && (t.inputValidator = De[e]);
            });
          })(t), t.showLoaderOnConfirm && !t.preConfirm && w("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"), t.animation = y(t.animation), function (t) {
            (!t.target || "string" == typeof t.target && !document.querySelector(t.target) || "string" != typeof t.target && !t.target.appendChild) && (w('Target parameter is not valid, defaulting to "body"'), t.target = "body");
          }(t), "string" == typeof t.title && (t.title = t.title.split("\n").join("<br />")), vt(t);
        }

        var Ie = ["swal-title", "swal-html", "swal-footer"],
            He = function He(e) {
          var n = {};
          return f(e.querySelectorAll("swal-param")).forEach(function (e) {
            Ye(e, ["name", "value"]);
            var o = e.getAttribute("name"),
                a = e.getAttribute("value");
            "boolean" == typeof ae[o] && "false" === a && (a = !1), "object" === t(ae[o]) && (a = JSON.parse(a)), n[o] = a;
          }), n;
        },
            Ve = function Ve(t) {
          var e = {};
          return f(t.querySelectorAll("swal-button")).forEach(function (t) {
            Ye(t, ["type", "color", "aria-label"]);
            var n = t.getAttribute("type");
            e["".concat(n, "ButtonText")] = t.innerHTML, e["show".concat(p(n), "Button")] = !0, t.hasAttribute("color") && (e["".concat(n, "ButtonColor")] = t.getAttribute("color")), t.hasAttribute("aria-label") && (e["".concat(n, "ButtonAriaLabel")] = t.getAttribute("aria-label"));
          }), e;
        },
            Ne = function Ne(t) {
          var e = {},
              n = t.querySelector("swal-image");
          return n && (Ye(n, ["src", "width", "height", "alt"]), n.hasAttribute("src") && (e.imageUrl = n.getAttribute("src")), n.hasAttribute("width") && (e.imageWidth = n.getAttribute("width")), n.hasAttribute("height") && (e.imageHeight = n.getAttribute("height")), n.hasAttribute("alt") && (e.imageAlt = n.getAttribute("alt"))), e;
        },
            Re = function Re(t) {
          var e = {},
              n = t.querySelector("swal-icon");
          return n && (Ye(n, ["type", "color"]), n.hasAttribute("type") && (e.icon = n.getAttribute("type")), n.hasAttribute("color") && (e.iconColor = n.getAttribute("color")), e.iconHtml = n.innerHTML), e;
        },
            _e = function _e(t) {
          var e = {},
              n = t.querySelector("swal-input");
          n && (Ye(n, ["type", "label", "placeholder", "value"]), e.input = n.getAttribute("type") || "text", n.hasAttribute("label") && (e.inputLabel = n.getAttribute("label")), n.hasAttribute("placeholder") && (e.inputPlaceholder = n.getAttribute("placeholder")), n.hasAttribute("value") && (e.inputValue = n.getAttribute("value")));
          var o = t.querySelectorAll("swal-input-option");
          return o.length && (e.inputOptions = {}, f(o).forEach(function (t) {
            Ye(t, ["value"]);
            var n = t.getAttribute("value"),
                o = t.innerHTML;
            e.inputOptions[n] = o;
          })), e;
        },
            Ue = function Ue(t, e) {
          var n = {};

          for (var o in e) {
            var a = e[o],
                i = t.querySelector(a);
            i && (Ye(i, []), n[a.replace(/^swal-/, "")] = i.innerHTML.trim());
          }

          return n;
        },
            Fe = function Fe(t) {
          var e = Ie.concat(["swal-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option"]);
          f(t.querySelectorAll("*")).forEach(function (n) {
            if (n.parentNode === t) {
              var o = n.tagName.toLowerCase();
              -1 === e.indexOf(o) && w("Unrecognized element <".concat(o, ">"));
            }
          });
        },
            Ye = function Ye(t, e) {
          f(t.attributes).forEach(function (n) {
            -1 === e.indexOf(n.name) && w(['Unrecognized attribute "'.concat(n.name, '" on <').concat(t.tagName.toLowerCase(), ">."), "".concat(e.length ? "Allowed attributes are: ".concat(e.join(", ")) : "To set the value, use HTML within the element.")]);
          });
        },
            $e = function $e(t) {
          var e = E(),
              n = L();
          "function" == typeof t.willOpen ? t.willOpen(n) : "function" == typeof t.onBeforeOpen && t.onBeforeOpen(n);
          var o = window.getComputedStyle(document.body).overflowY;
          Qe(e, n, t), setTimeout(function () {
            Ke(e, n);
          }, 10), K() && (Xe(e, t.scrollbarPadding, o), f(document.body.children).forEach(function (t) {
            t === E() || function (t, e) {
              if ("function" == typeof t.contains) return t.contains(e);
            }(t, E()) || (t.hasAttribute("aria-hidden") && t.setAttribute("data-previous-aria-hidden", t.getAttribute("aria-hidden")), t.setAttribute("aria-hidden", "true"));
          })), X() || Qt.previousActiveElement || (Qt.previousActiveElement = document.activeElement), We(n, t), rt(e, P["no-transition"]);
        },
            We = function We(t, e) {
          "function" == typeof e.didOpen ? setTimeout(function () {
            return e.didOpen(t);
          }) : "function" == typeof e.onOpen && setTimeout(function () {
            return e.onOpen(t);
          });
        },
            Ze = function t(e) {
          var n = L();

          if (e.target === n) {
            var o = E();
            n.removeEventListener(At, t), o.style.overflowY = "auto";
          }
        },
            Ke = function Ke(t, e) {
          At && wt(e) ? (t.style.overflowY = "hidden", e.addEventListener(At, Ze)) : t.style.overflowY = "auto";
        },
            Xe = function Xe(t, e, n) {
          (function () {
            if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) && !G(document.body, P.iosfix)) {
              var t = document.body.scrollTop;
              document.body.style.top = "".concat(-1 * t, "px"), it(document.body, P.iosfix), be(), ge();
            }
          })(), "undefined" != typeof window && xe() && (Ce(), window.addEventListener("resize", Ce)), e && "hidden" !== n && he(), setTimeout(function () {
            t.scrollTop = 0;
          });
        },
            Qe = function Qe(t, e, n) {
          it(t, n.showClass.backdrop), e.style.setProperty("opacity", "0", "important"), ct(e), setTimeout(function () {
            it(e, n.showClass.popup), e.style.removeProperty("opacity");
          }, 10), it([document.documentElement, document.body], P.shown), n.heightAuto && n.backdrop && !n.toast && it([document.documentElement, document.body], P["height-auto"]);
        },
            Je = function Je(t) {
          return t.checked ? 1 : 0;
        },
            Ge = function Ge(t) {
          return t.checked ? t.value : null;
        },
            tn = function tn(t) {
          return t.files.length ? null !== t.getAttribute("multiple") ? t.files : t.files[0] : null;
        },
            en = function en(e, n) {
          var o = q(),
              a = function a(t) {
            return on[n.input](o, an(t), n);
          };

          v(n.inputOptions) || x(n.inputOptions) ? (Xt(V()), k(n.inputOptions).then(function (t) {
            e.hideLoading(), a(t);
          })) : "object" === t(n.inputOptions) ? a(n.inputOptions) : h("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(t(n.inputOptions)));
        },
            nn = function nn(t, e) {
          var n = t.getInput();
          ut(n), k(e.inputValue).then(function (o) {
            n.value = "number" === e.input ? parseFloat(o) || 0 : "".concat(o), ct(n), n.focus(), t.hideLoading();
          })["catch"](function (e) {
            h("Error in inputValue promise: ".concat(e)), n.value = "", ct(n), n.focus(), t.hideLoading();
          });
        },
            on = {
          select: function select(t, e, n) {
            var o = st(t, P.select),
                a = function a(t, e, o) {
              var a = document.createElement("option");
              a.value = o, J(a, e), a.selected = rn(o, n.inputValue), t.appendChild(a);
            };

            e.forEach(function (t) {
              var e = t[0],
                  n = t[1];

              if (Array.isArray(n)) {
                var i = document.createElement("optgroup");
                i.label = e, i.disabled = !1, o.appendChild(i), n.forEach(function (t) {
                  return a(i, t[1], t[0]);
                });
              } else a(o, n, e);
            }), o.focus();
          },
          radio: function radio(t, e, n) {
            var o = st(t, P.radio);
            e.forEach(function (t) {
              var e = t[0],
                  a = t[1],
                  i = document.createElement("input"),
                  r = document.createElement("label");
              i.type = "radio", i.name = P.radio, i.value = e, rn(e, n.inputValue) && (i.checked = !0);
              var s = document.createElement("span");
              J(s, a), s.className = P.label, r.appendChild(i), r.appendChild(s), o.appendChild(r);
            });
            var a = o.querySelectorAll("input");
            a.length && a[0].focus();
          }
        },
            an = function e(n) {
          var o = [];
          return "undefined" != typeof Map && n instanceof Map ? n.forEach(function (n, a) {
            var i = n;
            "object" === t(i) && (i = e(i)), o.push([a, i]);
          }) : Object.keys(n).forEach(function (a) {
            var i = n[a];
            "object" === t(i) && (i = e(i)), o.push([a, i]);
          }), o;
        },
            rn = function rn(t, e) {
          return e && e.toString() === t.toString();
        },
            sn = function sn(t, e, n) {
          var o = function (t, e) {
            var n = t.getInput();
            if (!n) return null;

            switch (e.input) {
              case "checkbox":
                return Je(n);

              case "radio":
                return Ge(n);

              case "file":
                return tn(n);

              default:
                return e.inputAutoTrim ? n.value.trim() : n.value;
            }
          }(t, e);

          e.inputValidator ? ln(t, e, o) : t.getInput().checkValidity() ? "deny" === n ? cn(t, e, o) : dn(t, e, o) : (t.enableButtons(), t.showValidationMessage(e.validationMessage));
        },
            ln = function ln(t, e, n) {
          t.disableInput(), Promise.resolve().then(function () {
            return k(e.inputValidator(n, e.validationMessage));
          }).then(function (o) {
            t.enableButtons(), t.enableInput(), o ? t.showValidationMessage(o) : dn(t, e, n);
          });
        },
            cn = function cn(t, e, n) {
          e.showLoaderOnDeny && Xt(N()), e.preDeny ? Promise.resolve().then(function () {
            return k(e.preDeny(n, e.validationMessage));
          }).then(function (e) {
            !1 === e ? t.hideLoading() : t.closePopup({
              isDenied: !0,
              value: void 0 === e ? n : e
            });
          }) : t.closePopup({
            isDenied: !0,
            value: n
          });
        },
            un = function un(t, e) {
          t.closePopup({
            isConfirmed: !0,
            value: e
          });
        },
            dn = function dn(t, e, n) {
          e.showLoaderOnConfirm && Xt(), e.preConfirm ? (t.resetValidationMessage(), Promise.resolve().then(function () {
            return k(e.preConfirm(n, e.validationMessage));
          }).then(function (e) {
            mt(H()) || !1 === e ? t.hideLoading() : un(t, void 0 === e ? n : e);
          })) : un(t, n);
        },
            pn = function pn(t, e, n) {
          var o = Z();
          if (o.length) return (e += n) === o.length ? e = 0 : -1 === e && (e = o.length - 1), o[e].focus();
          L().focus();
        },
            mn = ["ArrowRight", "ArrowDown", "Right", "Down"],
            fn = ["ArrowLeft", "ArrowUp", "Left", "Up"],
            wn = ["Escape", "Esc"],
            hn = function hn(t, e, n) {
          var o = Et.innerParams.get(t);
          o && (o.stopKeydownPropagation && e.stopPropagation(), "Enter" === e.key ? gn(t, e, o) : "Tab" === e.key ? bn(e, o) : -1 !== [].concat(mn, fn).indexOf(e.key) ? yn(e.key) : -1 !== wn.indexOf(e.key) && vn(e, o, n));
        },
            gn = function gn(t, e, n) {
          if (!e.isComposing && e.target && t.getInput() && e.target.outerHTML === t.getInput().outerHTML) {
            if (-1 !== ["textarea", "file"].indexOf(n.input)) return;
            Kt(), e.preventDefault();
          }
        },
            bn = function bn(t, e) {
          for (var n = t.target, o = Z(), a = -1, i = 0; i < o.length; i++) {
            if (n === o[i]) {
              a = i;
              break;
            }
          }

          t.shiftKey ? pn(0, a, -1) : pn(0, a, 1), t.stopPropagation(), t.preventDefault();
        },
            yn = function yn(t) {
          if (-1 !== [V(), N(), _()].indexOf(document.activeElement)) {
            var e = -1 !== mn.indexOf(t) ? "nextElementSibling" : "previousElementSibling",
                n = document.activeElement[e];
            n && n.focus();
          }
        },
            vn = function vn(t, e, n) {
          y(e.allowEscapeKey) && (t.preventDefault(), n(C.esc));
        },
            kn = function kn(t, e, n) {
          e.popup.onclick = function () {
            var e = Et.innerParams.get(t);
            e.showConfirmButton || e.showDenyButton || e.showCancelButton || e.showCloseButton || e.timer || e.input || n(C.close);
          };
        },
            xn = !1,
            Cn = function Cn(t) {
          t.popup.onmousedown = function () {
            t.container.onmouseup = function (e) {
              t.container.onmouseup = void 0, e.target === t.container && (xn = !0);
            };
          };
        },
            An = function An(t) {
          t.container.onmousedown = function () {
            t.popup.onmouseup = function (e) {
              t.popup.onmouseup = void 0, (e.target === t.popup || t.popup.contains(e.target)) && (xn = !0);
            };
          };
        },
            Bn = function Bn(t, e, n) {
          e.container.onclick = function (o) {
            var a = Et.innerParams.get(t);
            xn ? xn = !1 : o.target === e.container && y(a.allowOutsideClick) && n(C.backdrop);
          };
        };

        var Pn = function Pn(t, e) {
          var n = function (t) {
            var e = "string" == typeof t.template ? document.querySelector(t.template) : t.template;
            if (!e) return {};
            var n = e.content || e;
            return Fe(n), a(He(n), Ve(n), Ne(n), Re(n), _e(n), Ue(n, Ie));
          }(t),
              o = a({}, ae, e, n, t);

          return o.showClass = a({}, ae.showClass, o.showClass), o.hideClass = a({}, ae.hideClass, o.hideClass), !1 === t.animation && (o.showClass = {
            popup: "swal2-noanimation",
            backdrop: "swal2-noanimation"
          }, o.hideClass = {}), o;
        },
            On = function On(t, e, n) {
          return new Promise(function (o) {
            var a = function a(e) {
              t.closePopup({
                isDismissed: !0,
                dismiss: e
              });
            };

            Ae.swalPromiseResolve.set(t, o), e.confirmButton.onclick = function () {
              return function (t, e) {
                t.disableButtons(), e.input ? sn(t, e, "confirm") : dn(t, e, !0);
              }(t, n);
            }, e.denyButton.onclick = function () {
              return function (t, e) {
                t.disableButtons(), e.returnInputValueOnDeny ? sn(t, e, "deny") : cn(t, e, !1);
              }(t, n);
            }, e.cancelButton.onclick = function () {
              return function (t, e) {
                t.disableButtons(), e(C.cancel);
              }(t, a);
            }, e.closeButton.onclick = function () {
              return a(C.close);
            }, function (t, e, n) {
              Et.innerParams.get(t).toast ? kn(t, e, n) : (Cn(e), An(e), Bn(t, e, n));
            }(t, e, a), function (t, e, n, o) {
              e.keydownTarget && e.keydownHandlerAdded && (e.keydownTarget.removeEventListener("keydown", e.keydownHandler, {
                capture: e.keydownListenerCapture
              }), e.keydownHandlerAdded = !1), n.toast || (e.keydownHandler = function (e) {
                return hn(t, e, o);
              }, e.keydownTarget = n.keydownListenerCapture ? window : L(), e.keydownListenerCapture = n.keydownListenerCapture, e.keydownTarget.addEventListener("keydown", e.keydownHandler, {
                capture: e.keydownListenerCapture
              }), e.keydownHandlerAdded = !0);
            }(t, Qt, n, a), function (t, e) {
              "select" === e.input || "radio" === e.input ? en(t, e) : -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(e.input) && (v(e.inputValue) || x(e.inputValue)) && nn(t, e);
            }(t, n), $e(n), Sn(Qt, n, a), Tn(e, n), setTimeout(function () {
              e.container.scrollTop = 0;
            });
          });
        },
            En = function En(t) {
          var e = {
            popup: L(),
            container: E(),
            content: q(),
            actions: U(),
            confirmButton: V(),
            denyButton: N(),
            cancelButton: _(),
            loader: R(),
            closeButton: W(),
            validationMessage: H(),
            progressSteps: I()
          };
          return Et.domCache.set(t, e), e;
        },
            Sn = function Sn(t, e, n) {
          var o = $();
          ut(o), e.timer && (t.timeout = new qe(function () {
            n("timer"), delete t.timeout;
          }, e.timer), e.timerProgressBar && (ct(o), setTimeout(function () {
            t.timeout && t.timeout.running && ht(e.timer);
          })));
        },
            Tn = function Tn(t, e) {
          if (!e.toast) return y(e.allowEnterKey) ? void (Ln(t, e) || pn(0, -1, 1)) : jn();
        },
            Ln = function Ln(t, e) {
          return e.focusDeny && mt(t.denyButton) ? (t.denyButton.focus(), !0) : e.focusCancel && mt(t.cancelButton) ? (t.cancelButton.focus(), !0) : !(!e.focusConfirm || !mt(t.confirmButton) || (t.confirmButton.focus(), 0));
        },
            jn = function jn() {
          document.activeElement && "function" == typeof document.activeElement.blur && document.activeElement.blur();
        };

        var zn,
            qn = function qn(t) {
          "function" == typeof t.didDestroy ? t.didDestroy() : "function" == typeof t.onDestroy && t.onDestroy();
        },
            Dn = function Dn(t) {
          delete t.params, delete Qt.keydownHandler, delete Qt.keydownTarget, Mn(Et), Mn(Ae);
        },
            Mn = function Mn(t) {
          for (var e in t) {
            t[e] = new WeakMap();
          }
        },
            In = Object.freeze({
          hideLoading: we,
          disableLoading: we,
          getInput: function getInput(t) {
            var e = Et.innerParams.get(t || this),
                n = Et.domCache.get(t || this);
            return n ? et(n.content, e.input) : null;
          },
          close: Pe,
          closePopup: Pe,
          closeModal: Pe,
          closeToast: Pe,
          enableButtons: function enableButtons() {
            je(this, ["confirmButton", "denyButton", "cancelButton"], !1);
          },
          disableButtons: function disableButtons() {
            je(this, ["confirmButton", "denyButton", "cancelButton"], !0);
          },
          enableInput: function enableInput() {
            return ze(this.getInput(), !1);
          },
          disableInput: function disableInput() {
            return ze(this.getInput(), !0);
          },
          showValidationMessage: function showValidationMessage(t) {
            var e = Et.domCache.get(this),
                n = Et.innerParams.get(this);
            J(e.validationMessage, t), e.validationMessage.className = P["validation-message"], n.customClass && n.customClass.validationMessage && it(e.validationMessage, n.customClass.validationMessage), ct(e.validationMessage);
            var o = this.getInput();
            o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedBy", P["validation-message"]), ot(o), it(o, P.inputerror));
          },
          resetValidationMessage: function resetValidationMessage() {
            var t = Et.domCache.get(this);
            t.validationMessage && ut(t.validationMessage);
            var e = this.getInput();
            e && (e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedBy"), rt(e, P.inputerror));
          },
          getProgressSteps: function getProgressSteps() {
            return Et.domCache.get(this).progressSteps;
          },
          _main: function _main(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            me(a({}, e, t)), Qt.currentInstance && Qt.currentInstance._destroy(), Qt.currentInstance = this;
            var n = Pn(t, e);
            Me(n), Object.freeze(n), Qt.timeout && (Qt.timeout.stop(), delete Qt.timeout), clearTimeout(Qt.restoreFocusTimeout);
            var o = En(this);
            return Zt(this, n), Et.innerParams.set(this, n), On(this, o, n);
          },
          update: function update(t) {
            var e = L(),
                n = Et.innerParams.get(this);
            if (!e || G(e, n.hideClass.popup)) return w("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
            var o = {};
            Object.keys(t).forEach(function (e) {
              Vn.isUpdatableParameter(e) ? o[e] = t[e] : w('Invalid parameter to update: "'.concat(e, '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md'));
            });
            var i = a({}, n, o);
            Zt(this, i), Et.innerParams.set(this, i), Object.defineProperties(this, {
              params: {
                value: a({}, this.params, t),
                writable: !1,
                enumerable: !0
              }
            });
          },
          _destroy: function _destroy() {
            var t = Et.domCache.get(this),
                e = Et.innerParams.get(this);
            e && (t.popup && Qt.swalCloseEventFinishedCallback && (Qt.swalCloseEventFinishedCallback(), delete Qt.swalCloseEventFinishedCallback), Qt.deferDisposalTimer && (clearTimeout(Qt.deferDisposalTimer), delete Qt.deferDisposalTimer), qn(e), Dn(this));
          }
        }),
            Hn = function () {
          function t() {
            if (e(this, t), "undefined" != typeof window) {
              "undefined" == typeof Promise && h("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"), zn = this;

              for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++) {
                o[a] = arguments[a];
              }

              var i = Object.freeze(this.constructor.argsToParams(o));
              Object.defineProperties(this, {
                params: {
                  value: i,
                  writable: !1,
                  enumerable: !0,
                  configurable: !0
                }
              });

              var r = this._main(this.params);

              Et.promise.set(this, r);
            }
          }

          return o(t, [{
            key: "then",
            value: function value(t) {
              return Et.promise.get(this).then(t);
            }
          }, {
            key: "finally",
            value: function value(t) {
              return Et.promise.get(this)["finally"](t);
            }
          }]), t;
        }();

        a(Hn.prototype, In), a(Hn, fe), Object.keys(In).forEach(function (t) {
          Hn[t] = function () {
            var e;
            if (zn) return (e = zn)[t].apply(e, arguments);
          };
        }), Hn.DismissReason = C, Hn.version = "10.16.9";
        var Vn = Hn;
        return Vn["default"] = Vn, Vn;
      }(), void 0 !== this && this.Sweetalert2 && (this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2), "undefined" != typeof document && function (t, e) {
        var n = t.createElement("style");
        if (t.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = e);else try {
          n.innerHTML = e;
        } catch (t) {
          n.innerText = e;
        }
      }(document, '.swal2-popup.swal2-toast{flex-direction:column;align-items:stretch;width:auto;padding:1.25em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row;padding:0}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;margin:0 .625em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container{padding:.625em 0 0}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex:1;flex-basis:auto!important;align-self:stretch;width:auto;height:2.2em;height:auto;margin:0 .3125em;margin-top:.3125em;padding:0}.swal2-popup.swal2-toast .swal2-styled{margin:.125em .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(100,150,200,.5)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-no-transition{transition:none!important}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:5px;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center;padding:0 1.8em}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#2778c4;color:#fff;font-size:1em}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#d14529;color:#fff;font-size:1em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#757575;color:#fff;font-size:1em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;height:.25em;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;align-items:center;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0 1.6em;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto}.swal2-validation-message{align-items:center;justify-content:center;margin:0 -2.7em;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent!important}body.swal2-no-backdrop .swal2-container>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-container.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-top-left,body.swal2-no-backdrop .swal2-container.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-top-end,body.swal2-no-backdrop .swal2-container.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-container.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-left,body.swal2-no-backdrop .swal2-container.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-end,body.swal2-no-backdrop .swal2-container.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom-left,body.swal2-no-backdrop .swal2-container.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-bottom-end,body.swal2-no-backdrop .swal2-container.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}');
    }
  },
      e = {};

  function n(o) {
    var a = e[o];
    if (void 0 !== a) return a.exports;
    var i = e[o] = {
      exports: {}
    };
    return t[o].call(i.exports, i, i.exports, n), i.exports;
  }

  n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t["default"];
    } : function () {
      return t;
    };
    return n.d(e, {
      a: e
    }), e;
  }, n.d = function (t, e) {
    for (var o in e) {
      n.o(e, o) && !n.o(t, o) && Object.defineProperty(t, o, {
        enumerable: !0,
        get: e[o]
      });
    }
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, function () {
    "use strict";

    var t = n(455),
        e = n.n(t);
    (window.WPCodeConnect || function (t, n, o) {
      var a = {
        $connectBtn: o("#wpcode-settings-connect-btn"),
        $connectKey: o("#wpcode-settings-upgrade-license-key")
      },
          i = {
        init: function init() {
          console.log("WPCodeConnect: init"), o(i.ready);
        },
        ready: function ready() {
          i.events();
        },
        events: function events() {
          i.connectBtnClick();
        },
        connectBtnClick: function connectBtnClick() {
          a.$connectBtn.on("click", function () {
            i.gotoUpgradeUrl();
          });
        },
        proAlreadyInstalled: function proAlreadyInstalled(t) {
          e().fire({
            title: wpcode.almost_done,
            text: t.data.message,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: wpcode.plugin_activate_btn,
            customClass: {
              confirmButton: "wpcode-button"
            }
          }).then(function (t) {
            t.isConfirmed && n.location.reload();
          });
        },
        gotoUpgradeUrl: function gotoUpgradeUrl() {
          var t = {
            action: "wpcode_connect_url",
            key: a.$connectKey.val(),
            _wpnonce: wpcode.nonce
          };
          o.post(ajaxurl, t).done(function (t) {
            if (t.success) return t.data.reload ? void i.proAlreadyInstalled(t) : void (n.location.href = t.data.url);
            e().fire({
              title: wpcode.oops,
              text: t.data.message,
              icon: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: wpcode.ok,
              customClass: {
                confirmButton: "wpcode-button"
              }
            });
          }).fail(function (t) {
            i.failAlert(t);
          });
        },
        failAlert: function failAlert(t) {
          e().fire({
            title: wpcode.oops,
            html: wpcode.server_error + "<br>" + t.status + " " + t.statusText + " " + t.responseText,
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: wpcode.ok,
            customClass: {
              confirmButton: "wpcode-button"
            }
          });
        }
      };
      return i;
    }(document, window, jQuery)).init();
  }();
}();