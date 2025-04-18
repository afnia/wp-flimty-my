"use strict";

/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */
(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;
  return e.define("select2/i18n/ro", [], function () {
    return {
      errorLoading: function errorLoading() {
        return "Rezultatele nu au putut fi incărcate.";
      },
      inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Vă rugăm să ștergeți" + t + " caracter";
        return t !== 1 && (n += "e"), n;
      },
      inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Vă rugăm să introduceți " + t + "sau mai multe caractere";
        return n;
      },
      loadingMore: function loadingMore() {
        return "Se încarcă mai multe rezultate…";
      },
      maximumSelected: function maximumSelected(e) {
        var t = "Aveți voie să selectați cel mult " + e.maximum;
        return t += " element", e.maximum !== 1 && (t += "e"), t;
      },
      noResults: function noResults() {
        return "Nu au fost găsite rezultate";
      },
      searching: function searching() {
        return "Căutare…";
      }
    };
  }), {
    define: e.define,
    require: e.require
  };
})();