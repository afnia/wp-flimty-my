"use strict";

(self.__WordPressPrivateInteractivityAPI__ = self.__WordPressPrivateInteractivityAPI__ || []).push([[81], {
  149: function _(i, t, e) {
    var n = e(754);

    var o = function o(i) {
      var t;

      try {
        t = new window.ActiveXObject(i);
      } catch (i) {
        t = void 0;
      }

      return t;
    };

    (0, n.h)({
      selectors: {
        core: {
          file: {
            hasPdfPreview: function hasPdfPreview() {
              return !(window.navigator.userAgent.indexOf("Mobi") > -1) && !(window.navigator.userAgent.indexOf("Android") > -1) && !(window.navigator.userAgent.indexOf("Macintosh") > -1 && window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 2) && !((window.ActiveXObject || "ActiveXObject" in window) && !o("AcroPDF.PDF") && !o("PDF.PdfCtrl"));
            }
          }
        }
      }
    });
  }
}, function (i) {
  var t;
  t = 149, i(i.s = t);
}]);