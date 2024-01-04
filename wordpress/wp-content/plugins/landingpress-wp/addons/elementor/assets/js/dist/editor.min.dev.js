"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function e(t, n, i) {
  function o(s, l) {
    if (!n[s]) {
      if (!t[s]) {
        var a = "function" == typeof require && require;
        if (!l && a) return a(s, !0);
        if (r) return r(s, !0);
        var c = new Error("Cannot find module '" + s + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      var d = n[s] = {
        exports: {}
      };
      t[s][0].call(d.exports, function (e) {
        var n = t[s][1][e];
        return o(n || e);
      }, d, d.exports, e, t, n, i);
    }

    return n[s].exports;
  }

  for (var r = "function" == typeof require && require, s = 0; s < i.length; s++) {
    o(i[s]);
  }

  return o;
}({
  1: [function (e, t, n) {
    t.exports = Marionette.Behavior.extend({
      previewWindow: null,
      ui: function ui() {
        return {
          buttonPreview: "#elementor-panel-saver-button-preview",
          buttonPublish: "#elementor-panel-saver-button-publish",
          buttonSaveOptions: "#elementor-panel-saver-button-save-options",
          buttonPublishLabel: "#elementor-panel-saver-button-publish-label",
          menuSaveDraft: "#elementor-panel-saver-menu-save-draft",
          lastEditedWrapper: ".elementor-last-edited-wrapper"
        };
      },
      events: function events() {
        return {
          "click @ui.buttonPreview": "onClickButtonPreview",
          "click @ui.buttonPublish": "onClickButtonPublish",
          "click @ui.menuSaveDraft": "onClickMenuSaveDraft"
        };
      },
      initialize: function initialize() {
        elementor.saver.on("before:save", this.onBeforeSave.bind(this)).on("after:save", this.onAfterSave.bind(this)).on("after:saveError", this.onAfterSaveError.bind(this)).on("page:status:change", this.onPageStatusChange), elementor.settings.page.model.on("change", this.onPageSettingsChange.bind(this)), elementor.channels.editor.on("status:change", this.activateSaveButtons.bind(this));
      },
      activateSaveButtons: function activateSaveButtons(e) {
        e = e || "draft" === elementor.settings.page.model.get("post_status"), this.ui.buttonPublish.add(this.ui.menuSaveDraft).toggleClass("elementor-saver-disabled", !e), this.ui.buttonSaveOptions.toggleClass("elementor-saver-disabled", !e);
      },
      onRender: function onRender() {
        this.setMenuItems(elementor.settings.page.model.get("post_status")), this.addTooltip();
      },
      onPageSettingsChange: function onPageSettingsChange(e) {
        var t = e.changed;
        _.isUndefined(t.post_status) || (this.setMenuItems(t.post_status), this.refreshWpPreview(), "page_settings" === elementor.getPanelView().getCurrentPageName() && elementor.getPanelView().getCurrentPageView().render());
      },
      onPageStatusChange: function onPageStatusChange(e) {
        "publish" === e && elementor.notifications.showToast({
          message: elementor.translate("publish_notification"),
          buttons: [{
            name: "view_page",
            text: elementor.translate("have_a_look"),
            callback: function callback() {
              open(elementor.config.post_link);
            }
          }]
        });
      },
      onBeforeSave: function onBeforeSave(e) {
        NProgress.start(), "autosave" === e.status ? this.ui.lastEditedWrapper.addClass("elementor-state-active") : this.ui.buttonPublish.addClass("elementor-button-state");
      },
      onAfterSave: function onAfterSave(e) {
        NProgress.done(), this.ui.buttonPublish.removeClass("elementor-button-state"), this.ui.lastEditedWrapper.removeClass("elementor-state-active"), this.refreshWpPreview(), this.setLastEdited(e);
      },
      setLastEdited: function setLastEdited(e) {
        this.ui.lastEditedWrapper.removeClass("elementor-button-state").find(".elementor-last-edited").html(e.config.last_edited);
      },
      onAfterSaveError: function onAfterSaveError() {
        NProgress.done(), this.ui.buttonPublish.removeClass("elementor-button-state");
      },
      onClickButtonPreview: function onClickButtonPreview() {
        this.previewWindow = open(elementor.config.wp_preview.url, elementor.config.wp_preview.target), elementor.saver.isEditorChanged() && (elementor.saver.xhr && (elementor.saver.xhr.abort(), elementor.saver.isSaving = !1), elementor.saver.doAutoSave());
      },
      onClickButtonPublish: function onClickButtonPublish() {
        var e = elementor.settings.page.model.get("post_status");
        if (!this.ui.buttonPublish.hasClass("elementor-saver-disabled")) switch (e) {
          case "publish":
          case "private":
            elementor.saver.update();
            break;

          case "draft":
            elementor.config.current_user_can_publish ? elementor.saver.publish() : elementor.saver.savePending();
            break;

          case "pending":
          case void 0:
            elementor.config.current_user_can_publish ? elementor.saver.publish() : elementor.saver.update();
        }
      },
      onClickMenuSaveDraft: function onClickMenuSaveDraft() {
        elementor.saver.saveDraft();
      },
      setMenuItems: function setMenuItems(e) {
        var t = "publish";

        switch (e) {
          case "publish":
          case "private":
            t = "update", elementor.config.current_revision_id !== elementor.config.post_id && this.activateSaveButtons(!0);
            break;

          case "draft":
            elementor.config.current_user_can_publish || (t = "submit"), this.activateSaveButtons(!0);
            break;

          case "pending":
          case void 0:
            elementor.config.current_user_can_publish || (t = "update");
        }

        this.ui.buttonPublishLabel.html(elementor.translate(t));
      },
      addTooltip: function addTooltip() {
        this.$el.find(".tooltip-target").tipsy({
          gravity: "s",
          title: function title() {
            return this.getAttribute("data-tooltip");
          }
        });
      },
      refreshWpPreview: function refreshWpPreview() {
        if (this.previewWindow) try {
          this.previewWindow.location = elementor.config.wp_preview.url;
        } catch (e) {}
      }
    });
  }, {}],
  2: [function (e, t, n) {
    var i = e("elementor-utils/module");
    t.exports = i.extend({
      autoSaveTimer: null,
      autosaveInterval: 1e3 * elementor.config.autosave_interval,
      isSaving: !1,
      isChangedDuringSave: !1,
      __construct: function __construct() {
        this.setWorkSaver();
      },
      startTimer: function startTimer(e) {
        clearTimeout(this.autoSaveTimer), e && (this.autoSaveTimer = window.setTimeout(_.bind(this.doAutoSave, this), this.autosaveInterval));
      },
      saveDraft: function saveDraft() {
        var e = elementor.settings.page.model.get("post_status");
        if (elementor.saver.isEditorChanged() || "draft" === e) switch (e) {
          case "publish":
          case "private":
            this.doAutoSave();
            break;

          default:
            this.update();
        }
      },
      doAutoSave: function doAutoSave() {
        "edit" === elementor.channels.dataEditMode.request("activeMode") && this.saveAutoSave();
      },
      saveAutoSave: function saveAutoSave(e) {
        this.isEditorChanged() && (e = _.extend({
          status: "autosave"
        }, e), this.saveEditor(e));
      },
      savePending: function savePending(e) {
        e = _.extend({
          status: "pending"
        }, e), this.saveEditor(e);
      },
      discard: function discard() {
        var e = this;
        elementor.ajax.send("discard_changes", {
          data: {
            post_id: elementor.config.post_id
          },
          success: function success() {
            e.setFlagEditorChange(!1), location.href = elementor.config.exit_to_dashboard_url;
          }
        });
      },
      update: function update(e) {
        e = _.extend({
          status: elementor.settings.page.model.get("post_status")
        }, e), this.saveEditor(e);
      },
      publish: function publish(e) {
        e = _.extend({
          status: "publish"
        }, e), this.saveEditor(e);
      },
      setFlagEditorChange: function setFlagEditorChange(e) {
        e && this.isSaving && (this.isChangedDuringSave = !0), this.startTimer(e), elementor.channels.editor.reply("status", e).trigger("status:change", e);
      },
      isEditorChanged: function isEditorChanged() {
        return !0 === elementor.channels.editor.request("status");
      },
      setWorkSaver: function setWorkSaver() {
        var e = this;
        elementor.$window.on("beforeunload", function () {
          if (e.isEditorChanged()) return elementor.translate("before_unload_alert");
        });
      },
      saveEditor: function saveEditor(e) {
        if (!this.isSaving) {
          e = _.extend({
            status: "draft",
            onSuccess: null
          }, e);
          var t = this,
              n = elementor.elements.toJSON({
            removeDefault: !0
          }),
              i = elementor.settings.page.model.get("post_status"),
              o = i !== e.status;
          return t.trigger("before:save", e).trigger("before:save:" + e.status, e), t.isSaving = !0, t.isChangedDuringSave = !1, t.xhr = elementor.ajax.send("save_builder", {
            data: {
              post_id: elementor.config.post_id,
              status: e.status,
              data: JSON.stringify(n)
            },
            success: function success(r) {
              t.afterAjax(), "autosave" !== e.status && (o && elementor.settings.page.model.set("post_status", e.status), t.isChangedDuringSave || t.setFlagEditorChange(!1)), r.config && jQuery.extend(!0, elementor.config, r.config), elementor.config.data = n, elementor.channels.editor.trigger("saved", r), t.trigger("after:save", r).trigger("after:save:" + e.status, r), o && t.trigger("page:status:change", e.status, i), _.isFunction(e.onSuccess) && e.onSuccess.call(this, r);
            },
            error: function error(n) {
              var i;
              t.afterAjax(), t.trigger("after:saveError", n).trigger("after:saveError:" + e.status, n), _.isString(n) ? i = n : n.statusText ? (i = elementor.ajax.createErrorMessage(n), 0 === n.readyState && (i += " " + elementor.translate("saving_disabled"))) : n[0] && n[0].code && (i = elementor.translate("server_error") + " " + n[0].code), elementor.notifications.showToast({
                message: i
              });
            }
          }), t.xhr;
        }
      },
      afterAjax: function afterAjax() {
        this.isSaving = !1, this.xhr = null;
      }
    });
  }, {
    "elementor-utils/module": 125
  }],
  3: [function (e, t, n) {
    var i = e("elementor-utils/view-module"),
        o = e("elementor-elements/models/base-settings"),
        r = e("elementor-editor-utils/controls-css-parser");
    t.exports = i.extend({
      controlsCSS: null,
      model: null,
      hasChange: !1,
      changeCallbacks: {},
      addChangeCallback: function addChangeCallback(e, t) {
        this.changeCallbacks[e] = t;
      },
      bindEvents: function bindEvents() {
        elementor.on("preview:loaded", this.onElementorPreviewLoaded), this.model.on("change", this.onModelChange);
      },
      addPanelPage: function addPanelPage() {
        var e = this.getSettings("name");
        elementor.getPanelView().addPage(e + "_settings", {
          view: elementor.settings.panelPages[e] || elementor.settings.panelPages.base,
          title: this.getSettings("panelPage.title"),
          options: {
            model: this.model,
            name: e
          }
        });
      },
      updateStylesheet: function updateStylesheet(e) {
        e || this.controlsCSS.stylesheet.empty(), this.controlsCSS.addStyleRules(this.model.getStyleControls(), this.model.attributes, this.model.controls, [/{{WRAPPER}}/g], [this.getSettings("cssWrapperSelector")]), this.controlsCSS.addStyleToDocument();
      },
      initModel: function initModel() {
        this.model = new o(this.getSettings("settings"), {
          controls: this.getSettings("controls")
        });
      },
      initControlsCSSParser: function initControlsCSSParser() {
        this.controlsCSS = new r({
          id: this.getSettings("name")
        });
      },
      getDataToSave: function getDataToSave(e) {
        return e;
      },
      save: function save(e) {
        var t = this;

        if (t.hasChange) {
          var n = this.model.toJSON({
            removeDefault: !0
          }),
              i = this.getDataToSave({
            data: JSON.stringify(n)
          });
          NProgress.start(), elementor.ajax.send("save_" + this.getSettings("name") + "_settings", {
            data: i,
            success: function success() {
              NProgress.done(), t.setSettings("settings", n), t.hasChange = !1, e && e.apply(t, arguments);
            },
            error: function error() {
              alert("An error occurred");
            }
          });
        }
      },
      addPanelMenuItem: function addPanelMenuItem() {
        var e = this.getSettings("panelPage.menu");

        if (e) {
          var t = {
            icon: e.icon,
            title: this.getSettings("panelPage.title"),
            type: "page",
            pageName: this.getSettings("name") + "_settings"
          };
          elementor.modules.panel.Menu.addItem(t, "settings", e.beforeItem);
        }
      },
      onInit: function onInit() {
        this.initModel(), this.initControlsCSSParser(), this.addPanelMenuItem(), this.debounceSave = _.debounce(this.save, 3e3), i.prototype.onInit.apply(this, arguments);
      },
      onModelChange: function onModelChange(e) {
        var t = this;
        t.hasChange = !0, this.controlsCSS.stylesheet.empty(), _.each(e.changed, function (e, n) {
          t.changeCallbacks[n] && t.changeCallbacks[n].call(t, e);
        }), t.updateStylesheet(!0), t.debounceSave();
      },
      onElementorPreviewLoaded: function onElementorPreviewLoaded() {
        this.updateStylesheet(), this.addPanelPage();
      }
    });
  }, {
    "elementor-editor-utils/controls-css-parser": 105,
    "elementor-elements/models/base-settings": 63,
    "elementor-utils/view-module": 126
  }],
  4: [function (e, t, n) {
    var i = e("elementor-views/controls-stack");
    t.exports = i.extend({
      id: function id() {
        return "elementor-panel-" + this.getOption("name") + "-settings";
      },
      getTemplate: function getTemplate() {
        return "#tmpl-elementor-panel-" + this.getOption("name") + "-settings";
      },
      childViewContainer: function childViewContainer() {
        return "#elementor-panel-" + this.getOption("name") + "-settings-controls";
      },
      childViewOptions: function childViewOptions() {
        return {
          elementSettingsModel: this.model
        };
      },
      initialize: function initialize() {
        this.collection = new Backbone.Collection(_.values(this.model.controls));
      }
    });
  }, {
    "elementor-views/controls-stack": 121
  }],
  5: [function (e, t, n) {
    var i = e("elementor-editor/components/settings/base/manager");
    t.exports = i.extend({
      changeCallbacks: {
        elementor_page_title_selector: function elementor_page_title_selector(e) {
          var t = e || "h1.entry-title";
          (elementor.settings.page.model.controls.hide_title.selectors = {})[t] = "display: none", elementor.settings.page.updateStylesheet();
        }
      }
    });
  }, {
    "elementor-editor/components/settings/base/manager": 3
  }],
  6: [function (e, t, n) {
    var i = e("elementor-editor/components/settings/base/manager");
    t.exports = i.extend({
      changeCallbacks: {
        post_title: function post_title(e) {
          elementorFrontend.getElements("$document").find(elementor.config.page_title_selector).text(e);
        },
        template: function template() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_sidebar: function _landingpress_hide_sidebar() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_header: function _landingpress_hide_header() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_menu: function _landingpress_hide_menu() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_footerwidgets: function _landingpress_hide_footerwidgets() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_footer: function _landingpress_hide_footer() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_breadcrumb: function _landingpress_hide_breadcrumb() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_title: function _landingpress_hide_title() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_hide_comments: function _landingpress_hide_comments() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_page_width: function _landingpress_page_width() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_page_header_custom: function _landingpress_page_header_custom() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_page_header_elementor: function _landingpress_page_header_elementor() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_page_footer_custom: function _landingpress_page_footer_custom() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        },
        _landingpress_page_footer_elementor: function _landingpress_page_footer_elementor() {
          this.save(function () {
            elementor.reloadPreview(), elementor.once("preview:loaded", function () {
              elementor.getPanelView().setPage("page_settings");
            });
          });
        }
      },
      bindEvents: function bindEvents() {
        elementor.channels.editor.on("elementor:clearPage", function () {
          elementor.clearPage();
        }), i.prototype.bindEvents.apply(this, arguments);
      },
      getDataToSave: function getDataToSave(e) {
        return e.id = elementor.config.post_id, e;
      }
    });
  }, {
    "elementor-editor/components/settings/base/manager": 3
  }],
  7: [function (e, t, n) {
    var i = e("elementor-utils/module");
    t.exports = i.extend({
      modules: {
        base: e("elementor-editor/components/settings/base/manager"),
        general: e("elementor-editor/components/settings/general/manager"),
        page: e("elementor-editor/components/settings/page/manager")
      },
      panelPages: {
        base: e("elementor-editor/components/settings/base/panel")
      },
      onInit: function onInit() {
        this.initSettings();
      },
      initSettings: function initSettings() {
        var e = this;

        _.each(elementor.config.settings, function (t, n) {
          var i = e.modules[n] || e.modules.base;
          e[n] = new i(t);
        });
      }
    });
  }, {
    "elementor-editor/components/settings/base/manager": 3,
    "elementor-editor/components/settings/base/panel": 4,
    "elementor-editor/components/settings/general/manager": 5,
    "elementor-editor/components/settings/page/manager": 6,
    "elementor-utils/module": 125
  }],
  8: [function (e, t, n) {
    var i;
    i = Marionette.Behavior.extend({
      ui: {
        insertButton: ".elementor-template-library-template-insert"
      },
      events: {
        "click @ui.insertButton": "onInsertButtonClick"
      },
      onInsertButtonClick: function onInsertButtonClick() {
        this.view.model.get("hasPageSettings") ? i.showImportDialog(this.view.model) : elementor.templates.importTemplate(this.view.model);
      }
    }, {
      dialog: null,
      showImportDialog: function showImportDialog(e) {
        var t = i.getDialog();
        t.onConfirm = function () {
          elementor.templates.importTemplate(e, {
            withPageSettings: !0
          });
        }, t.onCancel = function () {
          elementor.templates.importTemplate(e);
        }, t.show();
      },
      initDialog: function initDialog() {
        i.dialog = elementor.dialogsManager.createWidget("confirm", {
          id: "elementor-insert-template-settings-dialog",
          headerMessage: elementor.translate("import_template_dialog_header"),
          message: elementor.translate("import_template_dialog_message") + "<br>" + elementor.translate("import_template_dialog_message_attention"),
          strings: {
            confirm: elementor.translate("yes"),
            cancel: elementor.translate("no")
          }
        });
      },
      getDialog: function getDialog() {
        return i.dialog || i.initDialog(), i.dialog;
      }
    }), t.exports = i;
  }, {}],
  9: [function (e, t, n) {
    var i,
        o = e("elementor-templates/models/template");
    i = Backbone.Collection.extend({
      model: o
    }), t.exports = i;
  }, {
    "elementor-templates/models/template": 11
  }],
  10: [function (e, t, n) {
    var i,
        o = e("elementor-templates/views/layout"),
        r = e("elementor-templates/collections/templates");
    i = function i() {
      var e,
          t,
          n,
          i,
          s,
          l = this,
          a = {},
          c = {},
          d = {},
          m = {};
      this.init = function () {
        var e;
        e = {
          saveDialog: {
            description: elementor.translate("save_your_template_description")
          },
          ajaxParams: {
            success: function success(e) {
              l.getTemplatesCollection().add(e), l.setTemplatesSource("local");
            },
            error: function error(e) {
              l.showErrorDialog(e);
            }
          }
        }, _.each(["page", "section"], function (t) {
          var n = jQuery.extend(!0, {}, e, {
            saveDialog: {
              title: elementor.translate("save_your_template", [elementor.translate(t)])
            }
          });
          l.registerTemplateType(t, n);
        }), elementor.addBackgroundClickListener("libraryToggleMore", {
          element: ".elementor-template-library-template-more"
        });
      }, this.getTemplateTypes = function (e) {
        return e ? d[e] : d;
      }, this.registerTemplateType = function (e, t) {
        d[e] = t;
      }, this.deleteTemplate = function (e, t) {
        var n = l.getDeleteDialog();
        n.onConfirm = function () {
          t.onConfirm && t.onConfirm(), elementor.ajax.send("delete_template", {
            data: {
              source: e.get("source"),
              template_id: e.get("template_id")
            },
            success: function success(n) {
              s.remove(e, {
                silent: !0
              }), t.onSuccess && t.onSuccess(n);
            }
          });
        }, n.show();
      }, this.importTemplate = function (e, t) {
        t = t || {}, i.showLoadingView(), l.requestTemplateContent(e.get("source"), e.get("template_id"), {
          data: {
            page_settings: t.withPageSettings
          },
          success: function success(n) {
            l.closeModal(), elementor.channels.data.trigger("template:before:insert", e), elementor.sections.currentView.addChildModel(n.content, c.importOptions || {}), elementor.channels.data.trigger("template:after:insert", e), t.withPageSettings && elementor.settings.page.model.set(n.page_settings);
          },
          error: function error(e) {
            l.showErrorDialog(e);
          }
        });
      }, this.saveTemplate = function (e, t) {
        var n = d[e];
        _.extend(t, {
          source: "local",
          type: e
        }), n.prepareSavedData && (t = n.prepareSavedData(t)), t.content = JSON.stringify(t.content);
        var i = {
          data: t
        };
        n.ajaxParams && _.extend(i, n.ajaxParams), elementor.ajax.send("save_template", i);
      }, this.requestTemplateContent = function (e, t, n) {
        var i = {
          data: {
            source: e,
            edit_mode: !0,
            display: !0,
            template_id: t
          }
        };
        return n && jQuery.extend(!0, i, n), elementor.ajax.send("get_template_data", i);
      }, this.markAsFavorite = function (e, t) {
        var n = {
          data: {
            source: e.get("source"),
            template_id: e.get("template_id"),
            favorite: t
          }
        };
        return elementor.ajax.send("mark_template_as_favorite", n);
      }, this.getDeleteDialog = function () {
        return t || (t = elementor.dialogsManager.createWidget("confirm", {
          id: "elementor-template-library-delete-dialog",
          headerMessage: elementor.translate("delete_template"),
          message: elementor.translate("delete_template_confirm"),
          strings: {
            confirm: elementor.translate("delete")
          }
        })), t;
      }, this.getErrorDialog = function () {
        return n || (n = elementor.dialogsManager.createWidget("alert", {
          id: "elementor-template-library-error-dialog",
          headerMessage: elementor.translate("an_error_occurred")
        })), n;
      }, this.getModal = function () {
        return e || (e = elementor.dialogsManager.createWidget("lightbox", {
          id: "elementor-template-library-modal",
          closeButton: !1,
          hide: {
            onOutsideClick: !1
          }
        })), e;
      }, this.getLayout = function () {
        return i;
      }, this.getTemplatesCollection = function () {
        return s;
      }, this.getConfig = function (e) {
        return e ? a[e] : a;
      }, this.requestLibraryData = function (e, t, n) {
        if (!s || t) {
          var i = {
            data: {},
            success: function success(t) {
              s = new r(t.templates), a = t.config, e && e();
            }
          };
          n && (i.data.sync = !0), elementor.ajax.send("get_library_data", i);
        } else e && e();
      }, this.startModal = function (e) {
        c = e || {}, m = {
          text: {
            callback: function callback(e) {
              return e = e.toLowerCase(), this.get("title").toLowerCase().indexOf(e) >= 0 || _.any(this.get("tags"), function (t) {
                return t.toLowerCase().indexOf(e) >= 0;
              });
            }
          },
          favorite: {}
        }, jQuery.each(c.filters, function (e) {
          m[e] ? jQuery.extend(m[e], this) : m[e] = this;
        }), l.getModal().show(), l.setTemplatesSource("landingpresssections", !0), i || (i = new o()), i.showLoadingView(), l.requestLibraryData(function () {
          c.onReady && c.onReady();
        });
      }, this.closeModal = function () {
        l.getModal().hide();
      }, this.getFilter = function (e) {
        return elementor.channels.templates.request("filter:" + e);
      }, this.setFilter = function (e, t, n) {
        elementor.channels.templates.reply("filter:" + e, t), n || elementor.channels.templates.trigger("filter:change");
      }, this.getFilterTerms = function (e) {
        return e ? m[e] : m;
      }, this.setTemplatesSource = function (e, t) {
        elementor.channels.templates.stopReplying(), l.setFilter("source", e), t || l.showTemplates();
      }, this.showTemplates = function () {
        var e = l.getFilter("source"),
            t = s.filter(function (t) {
          if (e !== t.get("source")) return !1;
          var n = d[t.get("type")];
          return !n || !1 !== n.showInLibrary;
        });
        i.showTemplatesView(new r(t));
      }, this.showTemplatesModal = function () {
        l.startModal({
          onReady: l.showTemplates
        });
      }, this.showErrorDialog = function (e) {
        if ("object" == _typeof(e)) {
          var t = "";
          _.each(e, function (e) {
            t += "<div>" + e.message + ".</div>";
          }), e = t;
        } else e ? e += "." : e = "<i>&#60;The error message is empty&#62;</i>";

        l.getErrorDialog().setMessage(elementor.translate("templates_request_error") + '<div id="elementor-template-library-error-info">' + e + "</div>").show();
      };
    }, t.exports = new i();
  }, {
    "elementor-templates/collections/templates": 9,
    "elementor-templates/views/layout": 12
  }],
  11: [function (e, t, n) {
    var i;
    i = Backbone.Model.extend({
      defaults: {
        template_id: 0,
        title: "",
        source: "",
        type: "",
        author: "",
        thumbnail: "",
        url: "",
        export_link: "",
        tags: []
      }
    }), t.exports = i;
  }, {}],
  12: [function (e, t, n) {
    var i,
        o = e("elementor-templates/views/parts/header"),
        r = e("elementor-templates/views/parts/header-parts/logo"),
        s = e("elementor-templates/views/parts/header-parts/actions"),
        l = e("elementor-templates/views/parts/header-parts/menu"),
        a = e("elementor-templates/views/parts/header-parts/preview"),
        c = e("elementor-templates/views/parts/header-parts/back"),
        d = e("elementor-templates/views/parts/loading"),
        m = e("elementor-templates/views/parts/templates"),
        u = e("elementor-templates/views/parts/save-template"),
        h = e("elementor-templates/views/parts/import"),
        p = e("elementor-templates/views/parts/preview");
    i = Marionette.LayoutView.extend({
      el: "#elementor-template-library-modal",
      regions: {
        modalContent: ".dialog-message",
        modalHeader: ".dialog-widget-header"
      },
      initialize: function initialize() {
        this.getRegion("modalHeader").show(new o());
      },
      getHeaderView: function getHeaderView() {
        return this.getRegion("modalHeader").currentView;
      },
      getTemplateActionButton: function getTemplateActionButton(e) {
        var t = "#tmpl-elementor-template-library-" + (e.isPro ? "get-pro-button" : "insert-button");
        t = elementor.hooks.applyFilters("elementor/editor/template-library/template/action-button", t, e);
        var n = Marionette.TemplateCache.get(t);
        return Marionette.Renderer.render(n);
      },
      showLoadingView: function showLoadingView() {
        this.modalContent.show(new d());
      },
      showTemplatesView: function showTemplatesView(e) {
        this.modalContent.show(new m({
          collection: e
        }));
        var t = this.getHeaderView();
        t.tools.show(new s()), t.menuArea.show(new l()), t.logoArea.show(new r());
      },
      showImportView: function showImportView() {
        this.getHeaderView().menuArea.reset(), this.modalContent.show(new h());
      },
      showSaveTemplateView: function showSaveTemplateView(e) {
        this.getHeaderView().menuArea.reset(), this.modalContent.show(new u({
          model: e
        }));
      },
      showPreviewView: function showPreviewView(e) {
        this.modalContent.show(new p({
          url: e.get("url")
        }));
        var t = this.getHeaderView();
        t.menuArea.reset(), t.tools.show(new a({
          model: e
        })), t.logoArea.show(new c());
      }
    }), t.exports = i;
  }, {
    "elementor-templates/views/parts/header": 18,
    "elementor-templates/views/parts/header-parts/actions": 13,
    "elementor-templates/views/parts/header-parts/back": 14,
    "elementor-templates/views/parts/header-parts/logo": 15,
    "elementor-templates/views/parts/header-parts/menu": 16,
    "elementor-templates/views/parts/header-parts/preview": 17,
    "elementor-templates/views/parts/import": 19,
    "elementor-templates/views/parts/loading": 20,
    "elementor-templates/views/parts/preview": 21,
    "elementor-templates/views/parts/save-template": 22,
    "elementor-templates/views/parts/templates": 24
  }],
  13: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-template-library-header-actions",
      id: "elementor-template-library-header-actions",
      ui: {
        "import": "#elementor-template-library-header-import i",
        sync: "#elementor-template-library-header-sync i",
        save: "#elementor-template-library-header-save i"
      },
      events: {
        "click @ui.import": "onImportClick",
        "click @ui.sync": "onSyncClick",
        "click @ui.save": "onSaveClick"
      },
      onImportClick: function onImportClick() {
        elementor.templates.getLayout().showImportView();
      },
      onSyncClick: function onSyncClick() {
        var e = this;
        e.ui.sync.addClass("eicon-animation-spin"), elementor.templates.requestLibraryData(function () {
          e.ui.sync.removeClass("eicon-animation-spin"), elementor.templates.setTemplatesSource(elementor.templates.getFilter("source"));
        }, !0, !0);
      },
      onSaveClick: function onSaveClick() {
        elementor.templates.getLayout().showSaveTemplateView();
      }
    });
  }, {}],
  14: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-template-library-header-back",
      id: "elementor-template-library-header-preview-back",
      events: {
        click: "onClick"
      },
      onClick: function onClick() {
        elementor.templates.showTemplates();
      }
    });
  }, {}],
  15: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-template-library-header-logo",
      id: "elementor-template-library-header-logo",
      events: {
        click: "onClick"
      },
      onClick: function onClick() {
        elementor.templates.setTemplatesSource("remote");
      }
    });
  }, {}],
  16: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      options: {
        activeClass: "elementor-active"
      },
      template: "#tmpl-elementor-template-library-header-menu",
      id: "elementor-template-library-header-menu",
      ui: {
        menuItems: ".elementor-template-library-menu-item"
      },
      events: {
        "click @ui.menuItems": "onMenuItemClick"
      },
      $activeItem: null,
      activateMenuItem: function activateMenuItem(e) {
        var t = this.getOption("activeClass");
        this.$activeItem !== e && (this.$activeItem && this.$activeItem.removeClass(t), e.addClass(t), this.$activeItem = e);
      },
      onRender: function onRender() {
        var e = elementor.templates.getFilter("source"),
            t = this.ui.menuItems.filter('[data-template-source="' + e + '"]');
        this.activateMenuItem(t);
      },
      onMenuItemClick: function onMenuItemClick(e) {
        var t = e.currentTarget;
        this.activateMenuItem(jQuery(t)), elementor.templates.setTemplatesSource(t.dataset.templateSource);
      }
    });
  }, {}],
  17: [function (e, t, n) {
    var i = e("elementor-templates/behaviors/insert-template");
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-template-library-header-preview",
      id: "elementor-template-library-header-preview",
      behaviors: {
        insertTemplate: {
          behaviorClass: i
        }
      }
    });
  }, {
    "elementor-templates/behaviors/insert-template": 8
  }],
  18: [function (e, t, n) {
    var i;
    i = Marionette.LayoutView.extend({
      id: "elementor-template-library-header",
      template: "#tmpl-elementor-template-library-header",
      regions: {
        logoArea: "#elementor-template-library-header-logo-area",
        tools: "#elementor-template-library-header-tools",
        menuArea: "#elementor-template-library-header-menu-area"
      },
      ui: {
        closeModal: "#elementor-template-library-header-close-modal"
      },
      events: {
        "click @ui.closeModal": "onCloseModalClick"
      },
      onCloseModalClick: function onCloseModalClick() {
        elementor.templates.closeModal();
      }
    }), t.exports = i;
  }, {}],
  19: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-template-library-import",
      id: "elementor-template-library-import",
      ui: {
        uploadForm: "#elementor-template-library-import-form",
        fileInput: "#elementor-template-library-import-form-input"
      },
      events: {
        "change @ui.fileInput": "onFileInputChange"
      },
      droppedFiles: null,
      submitForm: function submitForm() {
        var e = elementor.templates.getLayout(),
            t = new FormData();
        this.droppedFiles ? (t.append("file", this.droppedFiles[0]), this.droppedFiles = null) : (t.append("file", this.ui.fileInput[0].files[0]), this.ui.uploadForm[0].reset());
        var n = {
          data: t,
          processData: !1,
          contentType: !1,
          success: function success(e) {
            elementor.templates.getTemplatesCollection().add(e), elementor.templates.setTemplatesSource("local");
          },
          error: function error(t) {
            elementor.templates.showErrorDialog(t), e.showImportView();
          }
        };
        elementor.ajax.send("import_template", n), e.showLoadingView();
      },
      onRender: function onRender() {
        this.ui.uploadForm.on({
          "drag dragstart dragend dragover dragenter dragleave drop": this.onFormActions.bind(this),
          dragenter: this.onFormDragEnter.bind(this),
          "dragleave drop": this.onFormDragLeave.bind(this),
          drop: this.onFormDrop.bind(this)
        });
      },
      onFormActions: function onFormActions(e) {
        e.preventDefault(), e.stopPropagation();
      },
      onFormDragEnter: function onFormDragEnter() {
        this.ui.uploadForm.addClass("elementor-drag-over");
      },
      onFormDragLeave: function onFormDragLeave(e) {
        jQuery(e.relatedTarget).closest(this.ui.uploadForm).length || this.ui.uploadForm.removeClass("elementor-drag-over");
      },
      onFormDrop: function onFormDrop(e) {
        this.droppedFiles = e.originalEvent.dataTransfer.files, this.submitForm();
      },
      onFileInputChange: function onFileInputChange() {
        this.submitForm();
      }
    }), t.exports = i;
  }, {}],
  20: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      id: "elementor-template-library-loading",
      template: "#tmpl-elementor-template-library-loading"
    }), t.exports = i;
  }, {}],
  21: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-template-library-preview",
      id: "elementor-template-library-preview",
      ui: {
        iframe: "> iframe"
      },
      onRender: function onRender() {
        this.ui.iframe.attr("src", this.getOption("url"));
      }
    }), t.exports = i;
  }, {}],
  22: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      id: "elementor-template-library-save-template",
      template: "#tmpl-elementor-template-library-save-template",
      ui: {
        form: "#elementor-template-library-save-template-form",
        submitButton: "#elementor-template-library-save-template-submit"
      },
      events: {
        "submit @ui.form": "onFormSubmit"
      },
      getSaveType: function getSaveType() {
        return this.model ? this.model.get("elType") : "page";
      },
      templateHelpers: function templateHelpers() {
        var e = this.getSaveType();
        return elementor.templates.getTemplateTypes(e).saveDialog;
      },
      onFormSubmit: function onFormSubmit(e) {
        e.preventDefault();
        var t = this.ui.form.elementorSerializeObject(),
            n = this.model ? this.model.get("elType") : "page",
            i = {
          removeDefault: !0
        };
        t.content = this.model ? [this.model.toJSON(i)] : elementor.elements.toJSON(i), this.ui.submitButton.addClass("elementor-button-state"), elementor.templates.saveTemplate(n, t);
      }
    }), t.exports = i;
  }, {}],
  23: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      id: "elementor-template-library-templates-empty",
      template: "#tmpl-elementor-template-library-templates-empty",
      ui: {
        title: ".elementor-template-library-blank-title",
        message: ".elementor-template-library-blank-message"
      },
      modesStrings: {
        empty: {
          title: elementor.translate("templates_empty_title"),
          message: elementor.translate("templates_empty_message")
        },
        noResults: {
          title: elementor.translate("templates_no_results_title"),
          message: elementor.translate("templates_no_results_message")
        },
        noFavorites: {
          title: elementor.translate("templates_no_favorites_title"),
          message: elementor.translate("templates_no_favorites_message")
        }
      },
      getCurrentMode: function getCurrentMode() {
        return elementor.templates.getFilter("text") ? "noResults" : elementor.templates.getFilter("favorite") ? "noFavorites" : "empty";
      },
      onRender: function onRender() {
        var e = this.modesStrings[this.getCurrentMode()];
        this.ui.title.html(e.title), this.ui.message.html(e.message);
      }
    }), t.exports = i;
  }, {}],
  24: [function (e, t, n) {
    var i,
        o = e("elementor-templates/views/template/local"),
        r = e("elementor-templates/views/template/remote"),
        s = e("elementor-templates/views/template/landingpresstemplates"),
        l = e("elementor-templates/views/template/landingpresssections");
    i = Marionette.CompositeView.extend({
      template: "#tmpl-elementor-template-library-templates",
      id: "elementor-template-library-templates",
      childViewContainer: "#elementor-template-library-templates-container",
      reorderOnSort: !0,
      emptyView: function emptyView() {
        return new (e("elementor-templates/views/parts/templates-empty"))();
      },
      ui: {
        filterText: "#elementor-template-library-filter-text",
        myFavoritesFilter: "#elementor-template-library-filter-my-favorites",
        orderInputs: ".elementor-template-library-order-input",
        orderLabels: ".elementor-template-library-order-label"
      },
      events: {
        "input @ui.filterText": "onFilterTextInput",
        "change @ui.myFavoritesFilter": "onMyFavoritesFilterChange",
        "mousedown @ui.orderLabels": "onOrderLabelsClick"
      },
      comparators: {
        title: function title(e) {
          return e.get("title").toLowerCase();
        },
        popularityIndex: function popularityIndex(e) {
          var t = e.get("popularityIndex");
          return t || (t = e.get("date")), -t;
        },
        trendIndex: function trendIndex(e) {
          var t = e.get("trendIndex");
          return t || (t = e.get("date")), -t;
        }
      },
      getChildView: function getChildView(e) {
        return "remote" === e.get("source") ? r : "landingpresstemplates" === e.get("source") ? s : "landingpresssections" === e.get("source") ? l : o;
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.templates, "filter:change", this._renderChildren);
      },
      filter: function filter(e) {
        var t = elementor.templates.getFilterTerms(),
            n = !0;
        return jQuery.each(t, function (t) {
          var i = this.value || elementor.templates.getFilter(t);

          if (i) {
            if (this.callback) {
              var o = this.callback.call(e, i);
              return o || (n = !1), o;
            }

            var r = i === e.get(t);
            return r || (n = !1), r;
          }
        }), n;
      },
      order: function order(e, t) {
        var n = this.comparators[e] || e;
        t && (n = this.reverseOrder(n)), this.collection.comparator = n, this.collection.sort();
      },
      reverseOrder: function reverseOrder(e) {
        if ("function" != typeof e) {
          var t = e;

          e = function e(_e) {
            return _e.get(t);
          };
        }

        return function (t, n) {
          var i = e(t),
              o = e(n);
          return void 0 === i ? -1 : void 0 === o ? 1 : i < o ? 1 : i > o ? -1 : 0;
        };
      },
      addSourceData: function addSourceData() {
        var e = this.children.isEmpty();
        this.$el.attr("data-template-source", e ? "empty" : elementor.templates.getFilter("source"));
      },
      toggleFilterClass: function toggleFilterClass() {
        this.$el.toggleClass("elementor-templates-filter-active", !(!elementor.templates.getFilter("text") && !elementor.templates.getFilter("favorite")));
      },
      onRenderCollection: function onRenderCollection() {
        this.addSourceData(), this.toggleFilterClass();
      },
      onBeforeRenderEmpty: function onBeforeRenderEmpty() {
        this.addSourceData();
      },
      onFilterTextInput: function onFilterTextInput() {
        elementor.templates.setFilter("text", this.ui.filterText.val());
      },
      onMyFavoritesFilterChange: function onMyFavoritesFilterChange() {
        elementor.templates.setFilter("favorite", this.ui.myFavoritesFilter[0].checked);
      },
      onOrderLabelsClick: function onOrderLabelsClick(e) {
        var t,
            n = jQuery(e.currentTarget.control);
        n[0].checked || (t = "asc" !== n.data("default-ordering-direction")), n.toggleClass("elementor-template-library-order-reverse", t), this.order(n.val(), n.hasClass("elementor-template-library-order-reverse"));
      }
    }), t.exports = i;
  }, {
    "elementor-templates/views/parts/templates-empty": 23,
    "elementor-templates/views/template/landingpresssections": 26,
    "elementor-templates/views/template/landingpresstemplates": 27,
    "elementor-templates/views/template/local": 28,
    "elementor-templates/views/template/remote": 29
  }],
  25: [function (e, t, n) {
    var i,
        o = e("elementor-templates/behaviors/insert-template");
    i = Marionette.ItemView.extend({
      className: function className() {
        var e = "elementor-template-library-template elementor-template-library-template-" + this.model.get("source");
        return this.model.get("isPro") && (e += " elementor-template-library-pro-template"), e;
      },
      ui: function ui() {
        return {
          previewButton: ".elementor-template-library-template-preview"
        };
      },
      events: function events() {
        return {
          "click @ui.previewButton": "onPreviewButtonClick"
        };
      },
      behaviors: {
        insertTemplate: {
          behaviorClass: o
        }
      }
    }), t.exports = i;
  }, {
    "elementor-templates/behaviors/insert-template": 8
  }],
  26: [function (e, t, n) {
    var i,
        o = e("elementor-templates/views/template/base");
    i = o.extend({
      template: "#tmpl-elementor-template-library-template-landingpresssections",
      ui: function ui() {
        return jQuery.extend(o.prototype.ui.apply(this, arguments), {
          favoriteCheckbox: ".elementor-template-library-template-favorite-input"
        });
      },
      events: function events() {
        return jQuery.extend(o.prototype.events.apply(this, arguments), {
          "change @ui.favoriteCheckbox": "onFavoriteCheckboxChange"
        });
      },
      onPreviewButtonClick: function onPreviewButtonClick() {
        elementor.templates.getLayout().showPreviewView(this.model);
      },
      onFavoriteCheckboxChange: function onFavoriteCheckboxChange() {
        var e = this.ui.favoriteCheckbox[0].checked;
        this.model.set("favorite", e), elementor.templates.markAsFavorite(this.model, e), !e && elementor.templates.getFilter("favorite") && elementor.channels.templates.trigger("filter:change");
      }
    }), t.exports = i;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  27: [function (e, t, n) {
    var i,
        o = e("elementor-templates/views/template/base");
    i = o.extend({
      template: "#tmpl-elementor-template-library-template-landingpresstemplates",
      ui: function ui() {
        return jQuery.extend(o.prototype.ui.apply(this, arguments), {
          favoriteCheckbox: ".elementor-template-library-template-favorite-input"
        });
      },
      events: function events() {
        return jQuery.extend(o.prototype.events.apply(this, arguments), {
          "change @ui.favoriteCheckbox": "onFavoriteCheckboxChange"
        });
      },
      onPreviewButtonClick: function onPreviewButtonClick() {
        elementor.templates.getLayout().showPreviewView(this.model);
      },
      onFavoriteCheckboxChange: function onFavoriteCheckboxChange() {
        var e = this.ui.favoriteCheckbox[0].checked;
        this.model.set("favorite", e), elementor.templates.markAsFavorite(this.model, e), !e && elementor.templates.getFilter("favorite") && elementor.channels.templates.trigger("filter:change");
      }
    }), t.exports = i;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  28: [function (e, t, n) {
    var i,
        o = e("elementor-templates/views/template/base");
    i = o.extend({
      template: "#tmpl-elementor-template-library-template-local",
      ui: function ui() {
        return _.extend(o.prototype.ui.apply(this, arguments), {
          deleteButton: ".elementor-template-library-template-delete",
          morePopup: ".elementor-template-library-template-more",
          toggleMore: ".elementor-template-library-template-more-toggle",
          toggleMoreIcon: ".elementor-template-library-template-more-toggle i"
        });
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "click @ui.deleteButton": "onDeleteButtonClick",
          "click @ui.toggleMore": "onToggleMoreClick"
        });
      },
      onDeleteButtonClick: function onDeleteButtonClick() {
        var e = this.ui.toggleMoreIcon;
        elementor.templates.deleteTemplate(this.model, {
          onConfirm: function onConfirm() {
            e.removeClass("eicon-ellipsis-h").addClass("fa fa-circle-o-notch fa-spin");
          },
          onSuccess: function onSuccess() {
            elementor.templates.showTemplates();
          }
        });
      },
      onToggleMoreClick: function onToggleMoreClick() {
        this.ui.morePopup.show();
      },
      onPreviewButtonClick: function onPreviewButtonClick() {
        open(this.model.get("url"), "_blank");
      }
    }), t.exports = i;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  29: [function (e, t, n) {
    var i,
        o = e("elementor-templates/views/template/base");
    i = o.extend({
      template: "#tmpl-elementor-template-library-template-remote",
      ui: function ui() {
        return jQuery.extend(o.prototype.ui.apply(this, arguments), {
          favoriteCheckbox: ".elementor-template-library-template-favorite-input"
        });
      },
      events: function events() {
        return jQuery.extend(o.prototype.events.apply(this, arguments), {
          "change @ui.favoriteCheckbox": "onFavoriteCheckboxChange"
        });
      },
      onPreviewButtonClick: function onPreviewButtonClick() {
        elementor.templates.getLayout().showPreviewView(this.model);
      },
      onFavoriteCheckboxChange: function onFavoriteCheckboxChange() {
        var e = this.ui.favoriteCheckbox[0].checked;
        this.model.set("favorite", e), elementor.templates.markAsFavorite(this.model, e), !e && elementor.templates.getFilter("favorite") && elementor.channels.templates.trigger("filter:change");
      }
    }), t.exports = i;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  30: [function (e, t, n) {
    var i;
    i = e("elementor-utils/module").extend({
      errors: [],
      __construct: function __construct(e) {
        var t = e.customValidationMethod;
        t && (this.validationMethod = t);
      },
      getDefaultSettings: function getDefaultSettings() {
        return {
          validationTerms: {}
        };
      },
      isValid: function isValid() {
        var e = this.validationMethod.apply(this, arguments);
        return !e.length || (this.errors = e, !1);
      },
      validationMethod: function validationMethod(e) {
        var t = [];
        return this.getSettings("validationTerms").required && (("" + e).length || t.push("Required value is empty")), t;
      }
    }), t.exports = i;
  }, {
    "elementor-utils/module": 125
  }],
  31: [function (e, t, n) {
    var i = e("elementor-validator/base");
    t.exports = i.extend({
      validationMethod: function validationMethod(e) {
        var t = this.getSettings("validationTerms"),
            n = [];
        return _.isFinite(e) && (void 0 !== t.min && e < t.min && n.push("Value is less than minimum"), void 0 !== t.max && e > t.max && n.push("Value is greater than maximum")), n;
      }
    });
  }, {
    "elementor-validator/base": 30
  }],
  32: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base"),
        r = e("elementor-validator/base");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return _.extend(e, {
          input: 'input[data-setting][type!="checkbox"][type!="radio"]',
          checkbox: 'input[data-setting][type="checkbox"]',
          radio: 'input[data-setting][type="radio"]',
          select: "select[data-setting]",
          textarea: "textarea[data-setting]",
          responsiveSwitchers: ".elementor-responsive-switcher"
        }), e;
      },
      templateHelpers: function templateHelpers() {
        var e = o.prototype.templateHelpers.apply(this, arguments);
        return e.data.controlValue = this.getControlValue(), e;
      },
      events: function events() {
        return {
          "input @ui.input": "onBaseInputChange",
          "change @ui.checkbox": "onBaseInputChange",
          "change @ui.radio": "onBaseInputChange",
          "input @ui.textarea": "onBaseInputChange",
          "change @ui.select": "onBaseInputChange",
          "click @ui.responsiveSwitchers": "onSwitcherClick"
        };
      },
      initialize: function initialize(e) {
        o.prototype.initialize.apply(this, arguments), this.registerValidators(), this.listenTo(this.elementSettingsModel, "change:external:" + this.model.get("name"), this.onSettingsExternalChange);
      },
      getControlValue: function getControlValue() {
        return this.elementSettingsModel.get(this.model.get("name"));
      },
      setValue: function setValue(e) {
        this.setSettingsModel(e);
      },
      setSettingsModel: function setSettingsModel(e) {
        this.elementSettingsModel.set(this.model.get("name"), e), this.triggerMethod("settings:change");
      },
      applySavedValue: function applySavedValue() {
        this.setInputValue('[data-setting="' + this.model.get("name") + '"]', this.getControlValue());
      },
      getEditSettings: function getEditSettings(e) {
        var t = this.getOption("elementEditSettings").toJSON();
        return e ? t[e] : t;
      },
      setEditSetting: function setEditSetting(e, t) {
        this.getOption("elementEditSettings").set(e, t);
      },
      getInputValue: function getInputValue(e) {
        var t = this.$(e),
            n = t.val(),
            i = t.attr("type");
        return -1 !== ["radio", "checkbox"].indexOf(i) ? t.prop("checked") ? n : "" : "number" === i && _.isFinite(n) ? +n : ("SELECT" === e.tagName && t.prop("multiple") && null === n && (n = []), n);
      },
      setInputValue: function setInputValue(e, t) {
        var n = this.$(e),
            i = n.attr("type");
        "checkbox" === i ? n.prop("checked", !!t) : "radio" === i ? n.filter('[value="' + t + '"]').prop("checked", !0) : n.val(t);
      },
      addValidator: function addValidator(e) {
        this.validators.push(e);
      },
      registerValidators: function registerValidators() {
        this.validators = [];
        var e = {};
        this.model.get("required") && (e.required = !0), jQuery.isEmptyObject(e) || this.addValidator(new r({
          validationTerms: e
        }));
      },
      onSettingsError: function onSettingsError() {
        this.$el.addClass("elementor-error");
      },
      onSettingsChange: function onSettingsChange() {
        this.$el.removeClass("elementor-error");
      },
      onRender: function onRender() {
        o.prototype.onRender.apply(this, arguments), this.applySavedValue(), this.renderResponsiveSwitchers(), this.triggerMethod("ready"), this.toggleControlVisibility(), this.addTooltip();
      },
      onBaseInputChange: function onBaseInputChange(e) {
        clearTimeout(this.correctionTimeout);
        var t = e.currentTarget,
            n = this.getInputValue(t),
            i = this.validators.slice(0),
            o = this.elementSettingsModel.validators[this.model.get("name")];

        if (o && (i = i.concat(o)), i) {
          var r = this.getControlValue(t.dataset.setting);
          if (!i.every(function (e) {
            return e.isValid(n, r);
          })) return void (this.correctionTimeout = setTimeout(this.setInputValue.bind(this, t, r), 1200));
        }

        this.updateElementModel(n, t), this.triggerMethod("input:change", e);
      },
      onSwitcherClick: function onSwitcherClick(e) {
        var t = jQuery(e.currentTarget).data("device");
        elementor.changeDeviceMode(t), this.triggerMethod("responsive:switcher:click", t);
      },
      onSettingsExternalChange: function onSettingsExternalChange() {
        this.applySavedValue(), this.triggerMethod("after:external:change");
      },
      renderResponsiveSwitchers: function renderResponsiveSwitchers() {
        if (!_.isEmpty(this.model.get("responsive"))) {
          var e = Marionette.Renderer.render("#tmpl-elementor-control-responsive-switchers", this.model.attributes);
          this.ui.controlTitle.after(e);
        }
      },
      onAfterExternalChange: function onAfterExternalChange() {
        this.hideTooltip(), this.render();
      },
      addTooltip: function addTooltip() {
        this.$(".tooltip-target").tipsy({
          gravity: function gravity() {
            var e = jQuery(this).data("tooltip-pos");
            return void 0 !== e ? e : "n";
          },
          title: function title() {
            return this.getAttribute("data-tooltip");
          }
        });
      },
      hideTooltip: function hideTooltip() {
        jQuery(".tipsy").hide();
      },
      updateElementModel: function updateElementModel(e) {
        this.setValue(e);
      }
    }, {
      getStyleValue: function getStyleValue(e, t) {
        return t;
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base": 35,
    "elementor-validator/base": 30
  }],
  33: [function (e, t, n) {
    var i;
    i = e("elementor-controls/base-data").extend({
      applySavedValue: function applySavedValue() {
        var e = this.getControlValue(),
            t = this.$("[data-setting]"),
            n = this;

        _.each(e, function (e, i) {
          var o = t.filter(function () {
            return i === this.dataset.setting;
          });
          n.setInputValue(o, e);
        });
      },
      getControlValue: function getControlValue(e) {
        var t = this.elementSettingsModel.get(this.model.get("name"));
        if (!jQuery.isPlainObject(t)) return {};

        if (e) {
          var n = t[e];
          return void 0 === n && (n = ""), n;
        }

        return elementor.helpers.cloneObject(t);
      },
      setValue: function setValue(e, t) {
        var n = this.getControlValue();
        "object" == _typeof(e) ? _.each(e, function (e, t) {
          n[t] = e;
        }) : n[e] = t, this.setSettingsModel(n);
      },
      updateElementModel: function updateElementModel(e, t) {
        var n = t.dataset.setting;
        this.setValue(n, e);
      }
    }, {
      getStyleValue: function getStyleValue(e, t) {
        return _.isObject(t) ? t[e] : "";
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  34: [function (e, t, n) {
    var i;
    i = e("elementor-controls/base-multiple").extend({
      getCurrentRange: function getCurrentRange() {
        return this.getUnitRange(this.getControlValue("unit"));
      },
      getUnitRange: function getUnitRange(e) {
        var t = this.model.get("range");
        return !(!t || !t[e]) && t[e];
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  35: [function (e, t, n) {
    var i;
    i = Marionette.CompositeView.extend({
      ui: function ui() {
        return {
          controlTitle: ".elementor-control-title"
        };
      },
      behaviors: function behaviors() {
        return elementor.hooks.applyFilters("controls/base/behaviors", {}, this);
      },
      getBehavior: function getBehavior(e) {
        return this._behaviors[Object.keys(this.behaviors()).indexOf(e)];
      },
      className: function className() {
        var e = "elementor-control elementor-control-" + this.model.get("name") + " elementor-control-type-" + this.model.get("type"),
            t = this.model.get("classes"),
            n = this.model.get("responsive");
        return _.isEmpty(t) || (e += " " + t), _.isEmpty(n) || (e += " elementor-control-responsive-" + n.max), e;
      },
      templateHelpers: function templateHelpers() {
        var e = {
          _cid: this.model.cid
        };
        return {
          data: _.extend({}, this.model.toJSON(), e)
        };
      },
      getTemplate: function getTemplate() {
        return Marionette.TemplateCache.get("#tmpl-elementor-control-" + this.model.get("type") + "-content");
      },
      initialize: function initialize(e) {
        this.elementSettingsModel = e.elementSettingsModel;
        var t = this.model.get("type"),
            n = jQuery.extend(!0, {}, elementor.config.controls[t], this.model.attributes);
        this.model.set(n), this.listenTo(this.elementSettingsModel, "change", this.toggleControlVisibility);
      },
      toggleControlVisibility: function toggleControlVisibility() {
        var e = elementor.helpers.isActiveControl(this.model, this.elementSettingsModel.attributes);
        this.$el.toggleClass("elementor-hidden-control", !e), elementor.channels.data.trigger("scrollbar:update");
      },
      onRender: function onRender() {
        var e = this.model.get("label_block") ? "block" : "inline",
            t = this.model.get("show_label"),
            n = "elementor-label-" + e;
        n += " elementor-control-separator-" + this.model.get("separator"), t || (n += " elementor-control-hidden-label"), this.$el.addClass(n), this.toggleControlVisibility();
      }
    }), t.exports = i;
  }, {}],
  36: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-multiple");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.sliders = ".elementor-slider", e.colors = ".elementor-shadow-color-picker", e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "slide @ui.sliders": "onSlideChange"
        });
      },
      initSliders: function initSliders() {
        var e = this.getControlValue();
        this.ui.sliders.each(function () {
          var t = jQuery(this),
              n = t.next(".elementor-slider-input").find("input");
          t.slider({
            value: e[this.dataset.input],
            min: +n.attr("min"),
            max: +n.attr("max")
          });
        });
      },
      initColors: function initColors() {
        var e = this;
        elementor.helpers.wpColorPicker(this.ui.colors, {
          change: function change() {
            var t = jQuery(this),
                n = t.data("setting");
            e.setValue(n, t.wpColorPicker("color"));
          },
          clear: function clear() {
            e.setValue(this.dataset.setting, "");
          }
        });
      },
      onInputChange: function onInputChange(e) {
        var t = e.currentTarget.dataset.setting;
        this.ui.sliders.filter('[data-input="' + t + '"]').slider("value", this.getControlValue(t));
      },
      onReady: function onReady() {
        this.initSliders(), this.initColors();
      },
      onSlideChange: function onSlideChange(e, t) {
        var n = e.currentTarget.dataset.input;
        this.ui.input.filter('[data-setting="' + n + '"]').val(t.value), this.setValue(n, t.value);
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.ui.colors.each(function () {
          var e = jQuery(this);
          e.wpColorPicker("instance") && e.wpColorPicker("close");
        }), this.$el.remove();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  37: [function (e, t, n) {
    var i = e("elementor-controls/base");
    t.exports = i.extend({
      ui: function ui() {
        var e = i.prototype.ui.apply(this, arguments);
        return e.button = "button", e;
      },
      events: {
        "click @ui.button": "onButtonClick"
      },
      onButtonClick: function onButtonClick() {
        var e = this.model.get("event");
        elementor.channels.editor.trigger(e, this);
      }
    });
  }, {
    "elementor-controls/base": 35
  }],
  38: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.inputs = '[type="radio"]', e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "mousedown label": "onMouseDownLabel",
          "click @ui.inputs": "onClickInput",
          "change @ui.inputs": "onBaseInputChange"
        });
      },
      onMouseDownLabel: function onMouseDownLabel(e) {
        var t = this.$(e.currentTarget),
            n = this.$("#" + t.attr("for"));
        n.data("checked", n.prop("checked"));
      },
      onClickInput: function onClickInput(e) {
        if (this.model.get("toggle")) {
          var t = this.$(e.currentTarget);
          t.data("checked") && t.prop("checked", !1).trigger("change");
        }
      },
      onRender: function onRender() {
        o.prototype.onRender.apply(this, arguments);
        var e = this.getControlValue();
        e && this.ui.inputs.filter('[value="' + e + '"]').prop("checked", !0);
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  39: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.editor = ".elementor-code-editor", e;
      },
      onReady: function onReady() {
        var e = this;

        if ("undefined" != typeof ace) {
          var t = ace.require("ace/ext/language_tools");

          if (e.editor = ace.edit(this.ui.editor[0]), jQuery(e.editor.container).addClass("elementor-input-style elementor-code-editor"), e.editor.setOptions({
            mode: "ace/mode/" + e.model.attributes.language,
            minLines: 10,
            maxLines: 1 / 0,
            showGutter: !0,
            useWorker: !0,
            enableBasicAutocompletion: !0,
            enableLiveAutocompletion: !0
          }), e.editor.getSession().setUseWrapMode(!0), elementor.panel.$el.on("resize.aceEditor", e.onResize.bind(this)), "css" === e.model.attributes.language) {
            t.addCompleter({
              getCompletions: function getCompletions(e, t, n, i, o) {
                var r = [],
                    s = t.getTokenAt(n.row, n.column);
                0 < i.length && "selector".match(i) && "constant" === s.type && (r = [{
                  name: "selector",
                  value: "selector",
                  score: 1,
                  meta: "Elementor"
                }]), o(null, r);
              }
            });
          }

          if (e.editor.setValue(e.getControlValue(), -1), e.editor.on("change", function () {
            e.setValue(e.editor.getValue());
          }), "html" === e.model.attributes.language) {
            var n = e.editor.getSession();
            n.on("changeAnnotation", function () {
              for (var e = n.getAnnotations() || [], t = e.length, i = e.length; i--;) {
                /doctype first\. Expected/.test(e[i].text) && e.splice(i, 1);
              }

              t > e.length && n.setAnnotations(e);
            });
          }
        }
      },
      onResize: function onResize() {
        this.editor.resize();
      },
      onDestroy: function onDestroy() {
        elementor.panel.$el.off("resize.aceEditor");
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  40: [function (e, t, n) {
    var i;
    i = e("elementor-controls/base-data").extend({
      onReady: function onReady() {
        var e = this;
        elementor.helpers.wpColorPicker(e.ui.input, {
          change: function change() {
            e.ui.input.val(e.ui.input.wpColorPicker("color")).trigger("input");
          },
          clear: function clear() {
            e.setValue("");
          }
        });
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.ui.input.wpColorPicker("instance") && this.ui.input.wpColorPicker("close"), this.$el.remove();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  41: [function (e, t, n) {
    var i;
    i = e("elementor-controls/base-data").extend({
      onReady: function onReady() {
        var e = this,
            t = _.extend({
          onClose: function onClose() {
            e.saveValue();
          },
          enableTime: !0,
          minuteIncrement: 1
        }, this.model.get("picker_options"));

        this.ui.input.flatpickr(t);
      },
      saveValue: function saveValue() {
        this.setValue(this.ui.input.val());
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.saveValue(), this.ui.input.flatpickr().destroy();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  42: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-units");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.controls = ".elementor-control-dimension > input:enabled", e.link = "button.elementor-link-dimensions", e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "click @ui.link": "onLinkDimensionsClicked"
        });
      },
      defaultDimensionValue: 0,
      initialize: function initialize() {
        o.prototype.initialize.apply(this, arguments), this.model.set("allowed_dimensions", this.filterDimensions(this.model.get("allowed_dimensions")));
      },
      getPossibleDimensions: function getPossibleDimensions() {
        return ["top", "right", "bottom", "left"];
      },
      filterDimensions: function filterDimensions(e) {
        e = e || "all";
        var t = this.getPossibleDimensions();
        return "all" === e ? t : (_.isArray(e) || ("horizontal" === e ? e = ["right", "left"] : "vertical" === e && (e = ["top", "bottom"])), e);
      },
      onReady: function onReady() {
        var e = this,
            t = e.getControlValue();
        e.isLinkedDimensions() || (e.ui.link.addClass("unlinked"), e.ui.controls.each(function (n, i) {
          var o = t[i.dataset.setting];
          _.isEmpty(o) && (o = e.defaultDimensionValue), e.$(i).val(o);
        })), e.fillEmptyDimensions();
      },
      updateDimensionsValue: function updateDimensionsValue() {
        var e = {},
            t = this.getPossibleDimensions(),
            n = this.ui.controls,
            i = this.defaultDimensionValue;
        t.forEach(function (t) {
          var o = n.filter('[data-setting="' + t + '"]');
          e[t] = o.length ? o.val() : i;
        }), this.setValue(e);
      },
      fillEmptyDimensions: function fillEmptyDimensions() {
        var e = this.getPossibleDimensions(),
            t = this.model.get("allowed_dimensions"),
            n = this.ui.controls,
            i = this.defaultDimensionValue;
        this.isLinkedDimensions() || e.forEach(function (e) {
          var o = n.filter('[data-setting="' + e + '"]');
          -1 !== _.indexOf(t, e) && o.length && _.isEmpty(o.val()) && o.val(i);
        });
      },
      updateDimensions: function updateDimensions() {
        this.fillEmptyDimensions(), this.updateDimensionsValue();
      },
      resetDimensions: function resetDimensions() {
        this.ui.controls.val(""), this.updateDimensionsValue();
      },
      onInputChange: function onInputChange(e) {
        var t = e.target.dataset.setting;

        if ("unit" === t && this.resetDimensions(), _.contains(this.getPossibleDimensions(), t)) {
          if (this.isLinkedDimensions()) {
            var n = this.$(e.target);
            this.ui.controls.val(n.val());
          }

          this.updateDimensions();
        }
      },
      onLinkDimensionsClicked: function onLinkDimensionsClicked(e) {
        e.preventDefault(), e.stopPropagation(), this.ui.link.toggleClass("unlinked"), this.setValue("isLinked", !this.ui.link.hasClass("unlinked")), this.isLinkedDimensions() && this.ui.controls.val(this.ui.controls.eq(0).val()), this.updateDimensions();
      },
      isLinkedDimensions: function isLinkedDimensions() {
        return this.getControlValue("isLinked");
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-units": 34
  }],
  43: [function (e, t, n) {
    var i = e("elementor-controls/select2");
    t.exports = i.extend({
      getSelect2Options: function getSelect2Options() {
        return {
          dir: elementor.config.is_rtl ? "rtl" : "ltr"
        };
      },
      templateHelpers: function templateHelpers() {
        var e = i.prototype.templateHelpers.apply(this, arguments),
            t = this.model.get("options");
        return e.getFontsByGroups = function (e) {
          var n = {};
          return _.each(t, function (t, i) {
            (_.isArray(e) && _.contains(e, t) || t === e) && (n[i] = i);
          }), n;
        }, e;
      }
    });
  }, {
    "elementor-controls/select2": 54
  }],
  44: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.addImages = ".elementor-control-gallery-add", e.clearGallery = ".elementor-control-gallery-clear", e.galleryThumbnails = ".elementor-control-gallery-thumbnails", e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "click @ui.addImages": "onAddImagesClick",
          "click @ui.clearGallery": "onClearGalleryClick",
          "click @ui.galleryThumbnails": "onGalleryThumbnailsClick"
        });
      },
      onReady: function onReady() {
        var e = this.hasImages();
        this.$el.toggleClass("elementor-gallery-has-images", e).toggleClass("elementor-gallery-empty", !e), this.initRemoveDialog();
      },
      hasImages: function hasImages() {
        return !!this.getControlValue().length;
      },
      openFrame: function openFrame(e) {
        this.initFrame(e), this.frame.open();
      },
      initFrame: function initFrame(e) {
        var t = {
          frame: "post",
          multiple: !0,
          state: {
            create: "gallery",
            add: "gallery-library",
            edit: "gallery-edit"
          }[e],
          button: {
            text: elementor.translate("insert_media")
          }
        };
        this.hasImages() && (t.selection = this.fetchSelection()), this.frame = wp.media(t), this.frame.on({
          update: this.select,
          "menu:render:default": this.menuRender,
          "content:render:browse": this.gallerySettings
        }, this);
      },
      menuRender: function menuRender(e) {
        e.unset("insert"), e.unset("featured-image");
      },
      gallerySettings: function gallerySettings(e) {
        e.sidebar.on("ready", function () {
          e.sidebar.unset("gallery");
        });
      },
      fetchSelection: function fetchSelection() {
        var e = wp.media.query({
          orderby: "post__in",
          order: "ASC",
          type: "image",
          perPage: -1,
          post__in: _.pluck(this.getControlValue(), "id")
        });
        return new wp.media.model.Selection(e.models, {
          props: e.props.toJSON(),
          multiple: !0
        });
      },
      select: function select(e) {
        var t = [];
        e.each(function (e) {
          t.push({
            id: e.get("id"),
            url: e.get("url")
          });
        }), this.setValue(t), this.render();
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.frame && this.frame.off(), this.$el.remove();
      },
      resetGallery: function resetGallery() {
        this.setValue(""), this.render();
      },
      initRemoveDialog: function initRemoveDialog() {
        var e;

        this.getRemoveDialog = function () {
          return e || (e = elementor.dialogsManager.createWidget("confirm", {
            message: elementor.translate("dialog_confirm_gallery_delete"),
            headerMessage: elementor.translate("delete_gallery"),
            strings: {
              confirm: elementor.translate("delete"),
              cancel: elementor.translate("cancel")
            },
            defaultOption: "confirm",
            onConfirm: this.resetGallery.bind(this)
          })), e;
        };
      },
      onAddImagesClick: function onAddImagesClick() {
        this.openFrame(this.hasImages() ? "add" : "create");
      },
      onClearGalleryClick: function onClearGalleryClick() {
        this.getRemoveDialog().show();
      },
      onGalleryThumbnailsClick: function onGalleryThumbnailsClick() {
        this.openFrame("edit");
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  45: [function (e, t, n) {
    var i,
        o = e("elementor-controls/select2");
    i = o.extend({
      initialize: function initialize() {
        o.prototype.initialize.apply(this, arguments), this.filterIcons();
      },
      filterIcons: function filterIcons() {
        var e = this.model.get("options"),
            t = this.model.get("include"),
            n = this.model.get("exclude");

        if (t) {
          var i = {};
          return _.each(t, function (t) {
            i[t] = e[t];
          }), void this.model.set("options", i);
        }

        n && _.each(n, function (t) {
          delete e[t];
        });
      },
      iconsList: function iconsList(e) {
        return e.id ? jQuery('<span><i class="' + e.id + '"></i> ' + e.text + "</span>") : e.text;
      },
      getSelect2Options: function getSelect2Options() {
        return {
          allowClear: !0,
          templateResult: this.iconsList.bind(this),
          templateSelection: this.iconsList.bind(this)
        };
      }
    }), t.exports = i;
  }, {
    "elementor-controls/select2": 54
  }],
  46: [function (e, t, n) {
    var i;
    i = e("elementor-controls/base-multiple").extend({
      ui: function ui() {
        return {
          inputWidth: 'input[data-setting="width"]',
          inputHeight: 'input[data-setting="height"]',
          btnApply: "button.elementor-image-dimensions-apply-button"
        };
      },
      events: function events() {
        return {
          "click @ui.btnApply": "onApplyClicked"
        };
      },
      onApplyClicked: function onApplyClicked(e) {
        e.preventDefault(), this.setValue({
          width: this.ui.inputWidth.val(),
          height: this.ui.inputHeight.val()
        });
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  47: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-multiple");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.controlMedia = ".elementor-control-media", e.frameOpeners = ".elementor-control-media-upload-button, .elementor-control-media-image", e.deleteButton = ".elementor-control-media-delete", e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "click @ui.frameOpeners": "openFrame",
          "click @ui.deleteButton": "deleteImage"
        });
      },
      onReady: function onReady() {
        _.isEmpty(this.getControlValue("url")) && this.ui.controlMedia.addClass("media-empty");
      },
      openFrame: function openFrame() {
        this.frame || this.initFrame(), this.frame.open();
      },
      deleteImage: function deleteImage() {
        this.setValue({
          url: "",
          id: ""
        }), this.render();
      },
      initFrame: function initFrame() {
        this.frame = wp.media({
          button: {
            text: elementor.translate("insert_media")
          },
          states: [new wp.media.controller.Library({
            title: elementor.translate("insert_media"),
            library: wp.media.query({
              type: "image"
            }),
            multiple: !1,
            date: !1
          })]
        }), this.frame.on("insert select", this.select.bind(this));
      },
      select: function select() {
        this.trigger("before:select");
        var e = this.frame.state().get("selection").first().toJSON();
        e.url && (this.setValue({
          url: e.url,
          id: e.id
        }), this.render()), this.trigger("after:select");
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.$el.remove();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  48: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data"),
        r = e("elementor-validator/number");
    i = o.extend({
      registerValidators: function registerValidators() {
        o.prototype.registerValidators.apply(this, arguments);
        var e = {},
            t = this.model;
        ["min", "max"].forEach(function (n) {
          var i = t.get(n);
          _.isFinite(i) && (e[n] = i);
        }), jQuery.isEmptyObject(e) || this.addValidator(new r({
          validationTerms: e
        }));
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32,
    "elementor-validator/number": 31
  }],
  49: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-multiple");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.reverseOrderLabel = ".elementor-control-order-label", e;
      },
      changeLabelTitle: function changeLabelTitle() {
        var e = this.getControlValue("reverse_order");
        this.ui.reverseOrderLabel.attr("title", elementor.translate(e ? "asc" : "desc"));
      },
      onRender: function onRender() {
        o.prototype.onRender.apply(this, arguments), this.changeLabelTitle();
      },
      onInputChange: function onInputChange() {
        this.changeLabelTitle();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  50: [function (e, t, n) {
    var i,
        o = e("elementor-controls/choose");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.popoverToggle = ".elementor-control-popover-toggle-toggle", e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "click @ui.popoverToggle": "onPopoverToggleClick"
        });
      },
      onPopoverToggleClick: function onPopoverToggleClick() {
        this.$el.next(".elementor-controls-popover").toggle();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/choose": 38
  }],
  51: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data");
    i = Marionette.CompositeView.extend({
      template: Marionette.TemplateCache.get("#tmpl-elementor-repeater-row"),
      className: "repeater-fields",
      ui: {
        duplicateButton: ".elementor-repeater-tool-duplicate",
        editButton: ".elementor-repeater-tool-edit",
        removeButton: ".elementor-repeater-tool-remove",
        itemTitle: ".elementor-repeater-row-item-title"
      },
      behaviors: {
        HandleInnerTabs: {
          behaviorClass: e("elementor-behaviors/inner-tabs")
        }
      },
      triggers: {
        "click @ui.removeButton": "click:remove",
        "click @ui.duplicateButton": "click:duplicate",
        "click @ui.itemTitle": "click:edit"
      },
      templateHelpers: function templateHelpers() {
        return {
          itemIndex: this.getOption("itemIndex")
        };
      },
      childViewContainer: ".elementor-repeater-row-controls",
      getChildView: function getChildView(e) {
        var t = e.get("type");
        return elementor.getControlView(t);
      },
      childViewOptions: function childViewOptions() {
        return {
          elementSettingsModel: this.model
        };
      },
      checkConditions: function checkConditions() {
        var e = this;
        e.collection.each(function (t) {
          var n = t.get("conditions"),
              i = t.get("parent_conditions"),
              o = !0;
          n && (o = elementor.conditions.check(n, e.model.attributes)), i && (o = elementor.conditions.check(i, e.getOption("parentModel").attributes)), e.children.findByModelCid(t.cid).$el.toggleClass("elementor-panel-hide", !o);
        });
      },
      updateIndex: function updateIndex(e) {
        this.itemIndex = e, this.setTitle();
      },
      setTitle: function setTitle() {
        var e = this.getOption("titleField"),
            t = "";

        if (e) {
          var n = {};
          this.children.each(function (e) {
            e instanceof o && (n[e.model.get("name")] = e.getControlValue());
          }), t = Marionette.TemplateCache.prototype.compileTemplate(e)(n);
        }

        t || (t = elementor.translate("Item #{0}", [this.getOption("itemIndex")])), this.ui.itemTitle.html(t);
      },
      initialize: function initialize(e) {
        var t = this;
        t.elementSettingsModel = e.elementSettingsModel, t.itemIndex = 0, t.collection = new Backbone.Collection(e.controlFields), t.listenTo(t.model, "change", t.checkConditions), t.listenTo(t.getOption("parentModel"), "change", t.checkConditions), e.titleField && t.listenTo(t.model, "change", t.setTitle);
      },
      onRender: function onRender() {
        this.setTitle(), this.checkConditions();
      },
      onChildviewResponsiveSwitcherClick: function onChildviewResponsiveSwitcherClick(e, t) {
        "desktop" === t && elementor.getPanelView().getCurrentPageView().$el.toggleClass("elementor-responsive-switchers-open");
      }
    }), t.exports = i;
  }, {
    "elementor-behaviors/inner-tabs": 70,
    "elementor-controls/base-data": 32
  }],
  52: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data"),
        r = e("elementor-controls/repeater-row"),
        s = e("elementor-elements/models/base-settings");
    i = o.extend({
      ui: {
        btnAddRow: ".elementor-repeater-add",
        fieldContainer: ".elementor-repeater-fields"
      },
      events: function events() {
        return {
          "click @ui.btnAddRow": "onButtonAddRowClick",
          "sortstart @ui.fieldContainer": "onSortStart",
          "sortupdate @ui.fieldContainer": "onSortUpdate",
          "sortstop @ui.fieldContainer": "onSortStop"
        };
      },
      childView: r,
      childViewContainer: ".elementor-repeater-fields",
      templateHelpers: function templateHelpers() {
        return {
          data: _.extend({}, this.model.toJSON(), {
            controlValue: []
          })
        };
      },
      childViewOptions: function childViewOptions() {
        return {
          controlFields: this.model.get("fields"),
          titleField: this.model.get("title_field"),
          parentModel: this.elementSettingsModel
        };
      },
      createItemModel: function createItemModel(e, t, n) {
        return (t = t || {}).controls = n.model.get("fields"), e._id || (e._id = elementor.helpers.getUniqueID()), new s(e, t);
      },
      fillCollection: function fillCollection() {
        var e = this.model.get("name");
        this.collection = this.elementSettingsModel.get(e), this.collection instanceof Backbone.Collection || (this.collection = new Backbone.Collection(this.collection, {
          model: _.partial(this.createItemModel, _, _, this)
        }), this.elementSettingsModel.set(e, this.collection, {
          silent: !0
        }), this.listenTo(this.collection, "change", this.onRowControlChange), this.listenTo(this.collection, "update", this.onRowUpdate, this));
      },
      initialize: function initialize(e) {
        o.prototype.initialize.apply(this, arguments), this.fillCollection(), this.listenTo(this.collection, "change", this.onRowControlChange), this.listenTo(this.collection, "update", this.onRowUpdate, this);
      },
      addRow: function addRow(e, t) {
        var n = elementor.helpers.getUniqueID();
        return e instanceof Backbone.Model ? e.set("_id", n) : e._id = n, this.collection.add(e, t);
      },
      editRow: function editRow(e) {
        if (this.currentEditableChild) {
          var t = this.currentEditableChild.getChildViewContainer(this.currentEditableChild);
          t.removeClass("editable"), t.find(".elementor-wp-editor").each(function () {
            tinymce.get(this.id).fire("hide");
          });
        }

        this.currentEditableChild !== e ? (e.getChildViewContainer(e).addClass("editable"), this.currentEditableChild = e, this.updateActiveRow()) : delete this.currentEditableChild;
      },
      toggleMinRowsClass: function toggleMinRowsClass() {
        this.model.get("prevent_empty") && this.$el.toggleClass("elementor-repeater-has-minimum-rows", 1 >= this.collection.length);
      },
      updateActiveRow: function updateActiveRow() {
        var e = 0;
        this.currentEditableChild && (e = this.currentEditableChild.itemIndex), this.setEditSetting("activeItemIndex", e);
      },
      updateChildIndexes: function updateChildIndexes() {
        var e = this.collection;
        this.children.each(function (t) {
          t.updateIndex(e.indexOf(t.model) + 1);
        });
      },
      onRender: function onRender() {
        o.prototype.onRender.apply(this, arguments), this.ui.fieldContainer.sortable({
          axis: "y",
          handle: ".elementor-repeater-row-tools"
        }), this.toggleMinRowsClass();
      },
      onSortStart: function onSortStart(e, t) {
        t.item.data("oldIndex", t.item.index());
      },
      onSortStop: function onSortStop(e, t) {
        var n = this;

        if (-1 !== t.item.index()) {
          var i = n.children.findByIndex(t.item.index()),
              o = i.children._views;
          jQuery.each(o, function () {
            if ("wysiwyg" === this.model.get("type")) return i.render(), delete n.currentEditableChild, !1;
          });
        }
      },
      onSortUpdate: function onSortUpdate(e, t) {
        var n = t.item.data("oldIndex"),
            i = this.collection.at(n),
            o = t.item.index();
        this.collection.remove(i), this.addRow(i, {
          at: o
        });
      },
      onAddChild: function onAddChild() {
        this.updateChildIndexes(), this.updateActiveRow();
      },
      onRemoveChild: function onRemoveChild(e) {
        e === this.currentEditableChild && delete this.currentEditableChild, this.updateChildIndexes(), this.updateActiveRow();
      },
      onRowUpdate: function onRowUpdate(e, t) {
        var n = this.elementSettingsModel,
            i = e.clone(),
            o = this.model.get("name");
        t.add ? i.remove(t.changes.added[0]) : i.add(t.changes.removed[0], {
          at: t.index
        }), n.changed = {}, n.changed[o] = e, n._previousAttributes = {}, n._previousAttributes[o] = i.toJSON(), n.trigger("change", n, n._pending), delete n.changed, delete n._previousAttributes, this.toggleMinRowsClass();
      },
      onRowControlChange: function onRowControlChange(e) {
        if (Object.keys(e.changed).length) {
          var t = e.collection.toJSON(),
              n = e.collection.findIndex(e),
              i = this._parent.model.get("settings"),
              o = this.model.get("name");

          t[n] = e._previousAttributes, i.changed = {}, i.changed[o] = e.collection, i._previousAttributes = {}, i._previousAttributes[o] = t, i.trigger("change", i), delete i.changed, delete i._previousAttributes;
        }
      },
      onButtonAddRowClick: function onButtonAddRowClick() {
        var e = {};

        _.each(this.model.get("fields"), function (t) {
          e[t.name] = t["default"];
        });

        var t = this.addRow(e),
            n = this.children.findByModel(t);
        this.editRow(n), this.render();
      },
      onChildviewClickRemove: function onChildviewClickRemove(e) {
        e.model.destroy(), this.render();
      },
      onChildviewClickDuplicate: function onChildviewClickDuplicate(e) {
        var t = this.createItemModel(e.model.toJSON(), {}, this);
        this.addRow(t, {
          at: e.itemIndex
        }), this.render();
      },
      onChildviewClickEdit: function onChildviewClickEdit(e) {
        this.editRow(e);
      },
      onAfterExternalChange: function onAfterExternalChange() {
        this.fillCollection(), o.prototype.onAfterExternalChange.apply(this, arguments);
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32,
    "elementor-controls/repeater-row": 51,
    "elementor-elements/models/base-settings": 63
  }],
  53: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.heading = ".elementor-panel-heading", e;
      },
      triggers: {
        click: "control:section:clicked"
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base": 35
  }],
  54: [function (e, t, n) {
    var i;
    i = e("elementor-controls/base-data").extend({
      getSelect2Options: function getSelect2Options() {
        return {
          allowClear: !0,
          placeholder: this.ui.select.children('option:first[value=""]').text()
        };
      },
      onReady: function onReady() {
        this.ui.select.select2(this.getSelect2Options());
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.ui.select.data("select2") && this.ui.select.select2("destroy"), this.$el.remove();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  55: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-units");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.slider = ".elementor-slider", e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "slide @ui.slider": "onSlideChange"
        });
      },
      initSlider: function initSlider() {
        var e = this.getControlValue("size"),
            t = this.getCurrentRange();
        this.ui.input.attr(t).val(e), this.ui.slider.slider(_.extend({}, t, {
          value: e
        }));
      },
      resetSize: function resetSize() {
        this.setValue("size", ""), this.initSlider();
      },
      onReady: function onReady() {
        this.initSlider();
      },
      onSlideChange: function onSlideChange(e, t) {
        this.setValue("size", t.value), this.ui.input.val(t.value);
      },
      onInputChange: function onInputChange(e) {
        var t = e.currentTarget.dataset.setting;
        "size" === t ? this.ui.slider.slider("value", this.getControlValue("size")) : "unit" === t && this.resetSize();
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.ui.slider.data("uiSlider") && this.ui.slider.slider("destroy"), this.$el.remove();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-units": 34
  }],
  56: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.resetStructure = ".elementor-control-structure-reset", e;
      },
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "click @ui.resetStructure": "onResetStructureClick"
        });
      },
      templateHelpers: function templateHelpers() {
        var e = o.prototype.templateHelpers.apply(this, arguments);
        return e.getMorePresets = this.getMorePresets.bind(this), e;
      },
      getCurrentEditedSection: function getCurrentEditedSection() {
        return elementor.getPanelView().getCurrentPageView().getOption("editedElementView");
      },
      getMorePresets: function getMorePresets() {
        var e = elementor.presetsFactory.getParsedStructure(this.getControlValue());
        return elementor.presetsFactory.getPresets(e.columnsCount);
      },
      onInputChange: function onInputChange() {
        this.getCurrentEditedSection().redefineLayout(), this.render();
      },
      onResetStructureClick: function onResetStructureClick() {
        this.getCurrentEditedSection().resetColumnsCustomSize();
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  57: [function (e, t, n) {
    var i = e("elementor-controls/base-data");
    t.exports = i.extend({
      setInputValue: function setInputValue(e, t) {
        t = "" + t, this.$(e).prop("checked", this.model.get("return_value") === t);
      }
    });
  }, {
    "elementor-controls/base-data": 32
  }],
  58: [function (e, t, n) {
    var i;
    i = e("elementor-controls/base").extend({
      triggers: {
        click: {
          event: "control:tab:clicked",
          stopPropagation: !1
        }
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base": 35
  }],
  59: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.form = "form", e.loading = ".wp-widget-form-loading", e;
      },
      events: function events() {
        return {
          "keyup @ui.form :input": "onFormChanged",
          "change @ui.form :input": "onFormChanged"
        };
      },
      onFormChanged: function onFormChanged() {
        var e = "widget-" + this.model.get("id_base"),
            t = this.ui.form.elementorSerializeObject()[e].REPLACE_TO_ID;
        this.setValue(t);
      },
      onReady: function onReady() {
        var e = this;
        elementor.ajax.send("editor_get_wp_widget_form", {
          data: {
            id: e.model.cid,
            widget_type: e.model.get("widget"),
            data: JSON.stringify(e.elementSettingsModel.toJSON())
          },
          success: function success(t) {
            if (e.ui.form.html(t), wp.textWidgets) {
              e.ui.form.addClass("open");
              var n = new jQuery.Event("widget-added");
              wp.textWidgets.handleWidgetAdded(n, e.ui.form), wp.mediaWidgets.handleWidgetAdded(n, e.ui.form), wp.customHtmlWidgets && wp.customHtmlWidgets.handleWidgetAdded(n, e.ui.form);
            }

            elementor.hooks.doAction("panel/widgets/" + e.model.get("widget") + "/controls/wp_widget/loaded", e);
          }
        });
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  60: [function (e, t, n) {
    var i,
        o = e("elementor-controls/base-data");
    i = o.extend({
      events: function events() {
        return _.extend(o.prototype.events.apply(this, arguments), {
          "keyup textarea.elementor-wp-editor": "onBaseInputChange"
        });
      },
      buttons: {
        addToBasic: {
          underline: "italic"
        },
        addToAdvanced: {},
        moveToAdvanced: {
          blockquote: "removeformat",
          alignleft: "blockquote",
          aligncenter: "alignleft",
          alignright: "aligncenter"
        },
        moveToBasic: {},
        removeFromBasic: ["unlink", "wp_more"],
        removeFromAdvanced: []
      },
      initialize: function initialize() {
        o.prototype.initialize.apply(this, arguments);
        var e = this;

        if (e.editorID = "elementorwpeditor" + e.cid, _.defer(function () {
          quicktags({
            buttons: "strong,em,del,link,img,close",
            id: e.editorID
          }), elementor.config.rich_editing_enabled && switchEditors.go(e.editorID, "tmce"), delete QTags.instances[0];
        }), elementor.config.rich_editing_enabled) {
          var t = {
            id: e.editorID,
            selector: "#" + e.editorID,
            setup: function setup(t) {
              e.saveEditor = e.saveEditor.bind(e, t), t.on("keyup change undo redo SetContent", e.saveEditor);
            }
          };
          tinyMCEPreInit.mceInit[e.editorID] = _.extend(_.clone(tinyMCEPreInit.mceInit.elementorwpeditor), t), elementor.config.tinymceHasCustomConfig || e.rearrangeButtons();
        } else e.$el.addClass("elementor-rich-editing-disabled");
      },
      saveEditor: function saveEditor(e) {
        e.save(), this.setValue(e.getContent());
      },
      attachElContent: function attachElContent() {
        var e = elementor.config.wp_editor.replace(/elementorwpeditor/g, this.editorID).replace("%%EDITORCONTENT%%", this.getControlValue());
        return this.$el.html(e), this;
      },
      moveButtons: function moveButtons(e, t, n) {
        n || (n = t, t = null), _.each(e, function (e, i) {
          var o = n.indexOf(e);

          if (t) {
            var r = t.indexOf(i);
            if (-1 === r) throw new ReferenceError("Trying to move non-existing button `" + i + "`");
            t.splice(r, 1);
          }

          if (-1 === o) throw new ReferenceError("Trying to move button after non-existing button `" + e + "`");
          n.splice(o + 1, 0, i);
        });
      },
      rearrangeButtons: function rearrangeButtons() {
        var e = tinyMCEPreInit.mceInit[this.editorID],
            t = e.toolbar1.split(","),
            n = e.toolbar2.split(",");
        t = _.difference(t, this.buttons.removeFromBasic), n = _.difference(n, this.buttons.removeFromAdvanced), this.moveButtons(this.buttons.moveToBasic, n, t), this.moveButtons(this.buttons.moveToAdvanced, t, n), this.moveButtons(this.buttons.addToBasic, t), this.moveButtons(this.buttons.addToAdvanced, n), e.toolbar1 = t.join(","), e.toolbar2 = n.join(",");
      },
      onAfterExternalChange: function onAfterExternalChange() {
        var e = this.getControlValue();
        tinymce.get(this.editorID).setContent(e), jQuery("#" + this.editorID).val(e);
      },
      onBeforeDestroy: function onBeforeDestroy() {
        delete QTags.instances[this.editorID], elementor.config.rich_editing_enabled && (tinymce.EditorManager.execCommand("mceRemoveEditor", !0, this.editorID), delete tinyMCEPreInit.mceInit[this.editorID], delete tinyMCEPreInit.qtInit[this.editorID]);
      }
    }), t.exports = i;
  }, {
    "elementor-controls/base-data": 32
  }],
  61: [function (e, t, n) {
    var i;
    Marionette.TemplateCache.prototype.compileTemplate = function (e, t) {
      return t = {
        evaluate: /<#([\s\S]+?)#>/g,
        interpolate: /{{{([\s\S]+?)}}}/g,
        escape: /{{([^}]+?)}}(?!})/g
      }, _.template(e, t);
    }, i = Marionette.Application.extend({
      helpers: e("elementor-editor-utils/helpers"),
      heartbeat: e("elementor-editor-utils/heartbeat"),
      imagesManager: e("elementor-editor-utils/images-manager"),
      debug: e("elementor-editor-utils/debug"),
      schemes: e("elementor-editor-utils/schemes"),
      presetsFactory: e("elementor-editor-utils/presets-factory"),
      templates: e("elementor-templates/manager"),
      ajax: e("elementor-editor-utils/ajax"),
      conditions: e("elementor-editor-utils/conditions"),
      hotKeys: e("elementor-utils/hot-keys"),
      history: e("modules/history/assets/js/module"),
      channels: {
        editor: Backbone.Radio.channel("ELEMENTOR:editor"),
        data: Backbone.Radio.channel("ELEMENTOR:data"),
        panelElements: Backbone.Radio.channel("ELEMENTOR:panelElements"),
        dataEditMode: Backbone.Radio.channel("ELEMENTOR:editmode"),
        deviceMode: Backbone.Radio.channel("ELEMENTOR:deviceMode"),
        templates: Backbone.Radio.channel("ELEMENTOR:templates")
      },
      modules: {
        element: {
          Model: e("elementor-elements/models/element")
        },
        ControlsStack: e("elementor-views/controls-stack"),
        Module: e("elementor-utils/module"),
        RepeaterRowView: e("elementor-controls/repeater-row"),
        SettingsModel: e("elementor-elements/models/base-settings"),
        WidgetView: e("elementor-elements/views/widget"),
        panel: {
          Menu: e("elementor-panel/pages/menu/menu")
        },
        controls: {
          Base: e("elementor-controls/base"),
          BaseData: e("elementor-controls/base-data"),
          BaseMultiple: e("elementor-controls/base-multiple"),
          Button: e("elementor-controls/button"),
          Color: e("elementor-controls/color"),
          Dimensions: e("elementor-controls/dimensions"),
          Image_dimensions: e("elementor-controls/image-dimensions"),
          Media: e("elementor-controls/media"),
          Slider: e("elementor-controls/slider"),
          Wysiwyg: e("elementor-controls/wysiwyg"),
          Choose: e("elementor-controls/choose"),
          Url: e("elementor-controls/base-multiple"),
          Font: e("elementor-controls/font"),
          Section: e("elementor-controls/section"),
          Tab: e("elementor-controls/tab"),
          Repeater: e("elementor-controls/repeater"),
          Wp_widget: e("elementor-controls/wp_widget"),
          Icon: e("elementor-controls/icon"),
          Gallery: e("elementor-controls/gallery"),
          Select2: e("elementor-controls/select2"),
          Date_time: e("elementor-controls/date-time"),
          Code: e("elementor-controls/code"),
          Box_shadow: e("elementor-controls/box-shadow"),
          Text_shadow: e("elementor-controls/box-shadow"),
          Structure: e("elementor-controls/structure"),
          Animation: e("elementor-controls/select2"),
          Hover_animation: e("elementor-controls/select2"),
          Order: e("elementor-controls/order"),
          Switcher: e("elementor-controls/switcher"),
          Number: e("elementor-controls/number"),
          Popover_toggle: e("elementor-controls/popover-toggle")
        },
        saver: {
          footerBehavior: e("./components/saver/behaviors/footer-saver")
        },
        templateLibrary: {
          ElementsCollectionView: e("elementor-panel/pages/elements/views/elements")
        }
      },
      backgroundClickListeners: {
        popover: {
          element: ".elementor-controls-popover",
          ignore: ".elementor-control-popover-toggle-toggle, .elementor-control-popover-toggle-toggle-label"
        }
      },
      _defaultDeviceMode: "desktop",
      addControlView: function addControlView(e, t) {
        this.modules.controls[e[0].toUpperCase() + e.slice(1)] = t;
      },
      checkEnvCompatibility: function checkEnvCompatibility() {
        return this.envData.gecko || this.envData.webkit;
      },
      getElementData: function getElementData(e) {
        var t = e.get("elType");

        if ("widget" === t) {
          var n = e.get("widgetType");
          return !!this.config.widgets[n] && this.config.widgets[n];
        }

        return !!this.config.elements[t] && this.config.elements[t];
      },
      getElementControls: function getElementControls(e) {
        var t = this,
            n = t.getElementData(e);
        if (!n) return !1;
        var i = e.get("isInner"),
            o = {};
        return _.each(n.controls, function (e, n) {
          i && e.hide_in_inner || !i && e.hide_in_top || (o[n] = _.extend({}, t.config.controls[e.type], e));
        }), o;
      },
      getControlView: function getControlView(e) {
        var t = e[0].toUpperCase() + e.slice(1),
            n = this.modules.controls[t];

        if (!n) {
          var i = -1 !== this.config.controls[e].features.indexOf("ui");
          n = this.modules.controls[i ? "Base" : "BaseData"];
        }

        return n;
      },
      getPanelView: function getPanelView() {
        return this.getRegion("panel").currentView;
      },
      initEnvData: function initEnvData() {
        this.envData = _.pick(tinymce.EditorManager.Env, ["desktop", "webkit", "gecko", "ie", "opera"]);
      },
      initComponents: function initComponents() {
        var t = e("elementor-utils/hooks"),
            n = e("elementor-editor/components/settings/settings"),
            i = e("elementor-editor/components/saver/manager"),
            o = e("elementor-editor-utils/notifications");
        this.hooks = new t(), this.saver = new i(), this.settings = new n(), this.pageSettings = this.settings.page, this.templates.init(), this.initDialogsManager(), this.notifications = new o(), this.ajax.init();
      },
      initDialogsManager: function initDialogsManager() {
        this.dialogsManager = new DialogsManager.Instance();
      },
      initElements: function initElements() {
        var t = e("elementor-elements/collections/elements"),
            n = this.config.data;
        this.elements && (n = this.elements.toJSON()), this.elements = new t(n);
      },
      initPreview: function initPreview() {
        var e = jQuery;
        this.$previewWrapper = e("#elementor-preview"), this.$previewResponsiveWrapper = e("#elementor-preview-responsive-wrapper");
        this.$preview || (this.$preview = e("<iframe>", {
          id: "elementor-preview-iframe",
          src: this.config.preview_link + "&" + new Date().getTime(),
          allowfullscreen: 1
        }), this.$previewResponsiveWrapper.append(this.$preview)), this.$preview.on("load", this.onPreviewLoaded.bind(this)).one("load", this.checkPageStatus.bind(this));
      },
      initFrontend: function initFrontend() {
        var e = this.$preview[0].contentWindow;
        window.elementorFrontend = e.elementorFrontend, e.elementor = this, elementorFrontend.init(), elementorFrontend.elementsHandler.initHandlers(), this.trigger("frontend:init");
      },
      initClearPageDialog: function initClearPageDialog() {
        var e,
            t = this;

        t.getClearPageDialog = function () {
          return e || (e = this.dialogsManager.createWidget("confirm", {
            id: "elementor-clear-page-dialog",
            headerMessage: elementor.translate("clear_page"),
            message: elementor.translate("dialog_confirm_clear_page"),
            position: {
              my: "center center",
              at: "center center"
            },
            strings: {
              confirm: elementor.translate("delete"),
              cancel: elementor.translate("cancel")
            },
            onConfirm: function onConfirm() {
              t.getRegion("sections").currentView.collection.reset();
            }
          }));
        };
      },
      initHotKeys: function initHotKeys() {
        var e = 46,
            t = 68,
            n = 76,
            i = 77,
            o = 80,
            r = 83,
            s = jQuery,
            l = {},
            a = this.hotKeys;
        l[e] = {
          deleteElement: {
            isWorthHandling: function isWorthHandling(e) {
              if (!("editor" === elementor.getPanelView().getCurrentPageName())) return !1;
              var t = s(e.target);
              return !t.is(":input, .elementor-input") && !t.closest(".elementor-inline-editing").length;
            },
            handle: function handle() {
              elementor.getPanelView().getCurrentPageView().getOption("editedElementView").removeElement();
            }
          }
        }, l[t] = {
          duplicateElement: {
            isWorthHandling: function isWorthHandling(e) {
              return a.isControlEvent(e);
            },
            handle: function handle() {
              var e = elementor.getPanelView();
              "editor" === e.getCurrentPageName() && e.getCurrentPageView().getOption("editedElementView").duplicate();
            }
          }
        }, l[n] = {
          showTemplateLibrary: {
            isWorthHandling: function isWorthHandling(e) {
              return a.isControlEvent(e) && e.shiftKey;
            },
            handle: function handle() {
              elementor.templates.showTemplatesModal();
            }
          }
        }, l[i] = {
          changeDeviceMode: {
            devices: ["desktop", "tablet", "mobile"],
            isWorthHandling: function isWorthHandling(e) {
              return a.isControlEvent(e) && e.shiftKey;
            },
            handle: function handle() {
              var e = elementor.channels.deviceMode.request("currentMode"),
                  t = this.devices.indexOf(e);
              ++t >= this.devices.length && (t = 0), elementor.changeDeviceMode(this.devices[t]);
            }
          }
        }, l[o] = {
          changeEditMode: {
            isWorthHandling: function isWorthHandling(e) {
              return a.isControlEvent(e);
            },
            handle: function handle() {
              elementor.getPanelView().modeSwitcher.currentView.toggleMode();
            }
          }
        }, l[r] = {
          saveEditor: {
            isWorthHandling: function isWorthHandling(e) {
              return a.isControlEvent(e);
            },
            handle: function handle() {
              elementor.saver.saveDraft();
            }
          }
        }, _.each(l, function (e, t) {
          _.each(e, function (e, n) {
            a.addHotKeyHandler(t, n, e);
          });
        }), a.bindListener(this.$window.add(elementorFrontend.getElements("$window")));
      },
      preventClicksInsideEditor: function preventClicksInsideEditor() {
        this.$previewContents.on("click", function (e) {
          var t = jQuery(e.target),
              n = elementor.channels.dataEditMode.request("activeMode"),
              i = !!t.closest("#elementor, .pen-menu").length,
              o = this.contains(t[0]);

          if ((!i || "edit" !== n) && o && (t.closest("a:not(.elementor-clickable)").length && e.preventDefault(), !i)) {
            var r = elementor.getPanelView();
            "elements" !== r.getCurrentPageName() && r.setPage("elements");
          }
        });
      },
      addBackgroundClickArea: function addBackgroundClickArea(e) {
        e.addEventListener("click", this.onBackgroundClick.bind(this), !0);
      },
      addBackgroundClickListener: function addBackgroundClickListener(e, t) {
        this.backgroundClickListeners[e] = t;
      },
      showFatalErrorDialog: function showFatalErrorDialog(e) {
        var t = {
          id: "elementor-fatal-error-dialog",
          headerMessage: "",
          message: "",
          position: {
            my: "center center",
            at: "center center"
          },
          strings: {
            confirm: elementor.translate("learn_more"),
            cancel: elementor.translate("go_back")
          },
          onConfirm: null,
          onCancel: function onCancel() {
            parent.history.go(-1);
          },
          hide: {
            onBackgroundClick: !1,
            onButtonClick: !1
          }
        };
        e = jQuery.extend(!0, t, e), this.dialogsManager.createWidget("confirm", e).show();
      },
      checkPageStatus: function checkPageStatus() {
        elementor.config.current_revision_id !== elementor.config.post_id && this.notifications.showToast({
          message: this.translate("working_on_draft_notification"),
          buttons: [{
            name: "view_revisions",
            text: elementor.translate("view_all_revisions"),
            callback: function callback() {
              var e = elementor.getPanelView();
              e.setPage("historyPage"), e.getCurrentPageView().activateTab("revisions");
            }
          }]
        });
      },
      onStart: function onStart() {
        this.$window = jQuery(window), NProgress.start(), NProgress.inc(.2), this.config = ElementorConfig, Backbone.Radio.DEBUG = !1, Backbone.Radio.tuneIn("ELEMENTOR"), this.initComponents(), this.initEnvData(), this.checkEnvCompatibility() || this.onEnvNotCompatible(), this.channels.dataEditMode.reply("activeMode", "edit"), this.listenTo(this.channels.dataEditMode, "switch", this.onEditModeSwitched), this.initClearPageDialog(), this.addBackgroundClickArea(document), this.$window.trigger("elementor:init"), this.initPreview(), this.logSite();
      },
      onPreviewLoaded: function onPreviewLoaded() {
        if (NProgress.done(), this.$preview[0].contentWindow.elementorFrontend) {
          this.$previewContents = this.$preview.contents();
          var t = this.$previewContents.find("#elementor");

          if (t.length) {
            this.initFrontend(), this.initElements(), this.initHotKeys(), this.heartbeat.init();
            var n = new Marionette.Region({
              el: t[0]
            });
            this.schemes.init(), this.schemes.printSchemesStyle(), this.preventClicksInsideEditor(), this.addBackgroundClickArea(elementorFrontend.getElements("$document")[0]);
            var i = e("elementor-views/preview"),
                o = e("elementor-layouts/panel/panel");
            this.addRegions({
              sections: n,
              panel: "#elementor-panel"
            }), this.getRegion("sections").show(new i({
              collection: this.elements
            })), this.getRegion("panel").show(new o()), this.$previewContents.children().addClass("elementor-html").children("body").addClass("elementor-editor-active"), this.setResizablePanel(), this.changeDeviceMode(this._defaultDeviceMode), jQuery("#elementor-loading, #elementor-preview-loading").fadeOut(600), _.defer(function () {
              elementorFrontend.getElements("window").jQuery.holdReady(!1);
            }), this.enqueueTypographyFonts(), this.onEditModeSwitched(), this.trigger("preview:loaded");
          } else this.onPreviewElNotFound();
        } else this.onPreviewLoadingError();
      },
      onEditModeSwitched: function onEditModeSwitched() {
        var e = this.channels.dataEditMode.request("activeMode");
        "edit" === e ? this.exitPreviewMode() : this.enterPreviewMode("preview" === e);
      },
      onEnvNotCompatible: function onEnvNotCompatible() {
        this.showFatalErrorDialog({
          headerMessage: this.translate("device_incompatible_header"),
          message: this.translate("device_incompatible_message"),
          strings: {
            confirm: elementor.translate("proceed_anyway")
          },
          hide: {
            onButtonClick: !0
          },
          onConfirm: function onConfirm() {
            this.hide();
          }
        });
      },
      onPreviewLoadingError: function onPreviewLoadingError() {
        this.showFatalErrorDialog({
          headerMessage: this.translate("preview_not_loading_header"),
          message: this.translate("preview_not_loading_message"),
          onConfirm: function onConfirm() {
            open(elementor.config.help_preview_error_url, "_blank");
          }
        });
      },
      onPreviewElNotFound: function onPreviewElNotFound() {
        this.showFatalErrorDialog({
          headerMessage: this.translate("preview_el_not_found_header"),
          message: this.translate("preview_el_not_found_message"),
          onConfirm: function onConfirm() {
            open(elementor.config.help_the_content_url, "_blank");
          }
        });
      },
      onBackgroundClick: function onBackgroundClick(e) {
        jQuery.each(this.backgroundClickListeners, function () {
          var t = this.element,
              n = jQuery(e.target);

          if (n[0].control && (n = n.add(n[0].control)), !this.ignore || !n.closest(this.ignore).length) {
            var i = n.closest(t);
            jQuery(t).not(i).hide();
          }
        });
      },
      setResizablePanel: function setResizablePanel() {
        var e = this,
            t = elementor.config.is_rtl ? "right" : "left";
        e.panel.$el.resizable({
          handles: elementor.config.is_rtl ? "w" : "e",
          minWidth: 200,
          maxWidth: 680,
          start: function start() {
            e.$previewWrapper.addClass("ui-resizable-resizing").css("pointer-events", "none");
          },
          stop: function stop() {
            e.$previewWrapper.removeClass("ui-resizable-resizing").css("pointer-events", ""), elementor.channels.data.trigger("scrollbar:update");
          },
          resize: function resize(n, i) {
            e.$previewWrapper.css(t, i.size.width);
          }
        });
      },
      enterPreviewMode: function enterPreviewMode(e) {
        var t = this.$previewContents.find("body");
        e && (t = t.add("body")), t.removeClass("elementor-editor-active").addClass("elementor-editor-preview"), e && (this.$previewWrapper.css(elementor.config.is_rtl ? "right" : "left", ""), this.panel.$el.css("width", ""));
      },
      exitPreviewMode: function exitPreviewMode() {
        this.$previewContents.find("body").add("body").removeClass("elementor-editor-preview").addClass("elementor-editor-active");
      },
      changeEditMode: function changeEditMode(e) {
        var t = elementor.channels.dataEditMode,
            n = t.request("activeMode");
        t.reply("activeMode", e), e !== n && t.trigger("switch", e);
      },
      reloadPreview: function reloadPreview() {
        jQuery("#elementor-preview-loading").show(), this.$preview[0].contentWindow.location.reload(!0);
      },
      clearPage: function clearPage() {
        this.getClearPageDialog().show();
      },
      changeDeviceMode: function changeDeviceMode(e) {
        var t = this.channels.deviceMode.request("currentMode");
        t !== e && (jQuery("body").removeClass("elementor-device-" + t).addClass("elementor-device-" + e), this.channels.deviceMode.reply("previousMode", t).reply("currentMode", e).trigger("change"));
      },
      enqueueTypographyFonts: function enqueueTypographyFonts() {
        var e = this,
            t = this.schemes.getScheme("typography");

        _.each(t.items, function (t) {
          e.helpers.enqueueFont(t.value.font_family);
        });
      },
      translate: function translate(e, t, n) {
        n || (n = this.config.i18n);
        var i = n[e];
        return void 0 === i && (i = e), t && (i = i.replace(/{(\d+)}/g, function (e, n) {
          return void 0 !== t[n] ? t[n] : e;
        })), i;
      },
      compareVersions: function compareVersions(e, t, n) {
        var i = function i(e) {
          return (e += "").replace(/[^\d.]+/, ".-1.");
        };

        if ((e = i(e)) === (t = i(t))) return !n || /^={2,3}$/.test(n);

        for (var o = e.split(".").map(Number), r = t.split(".").map(Number), s = Math.max(o.length, r.length), l = 0; l < s; l++) {
          var a = o[l] || 0,
              c = r[l] || 0;
          if (a !== c) return this.conditions.compare(a, c, n);
        }
      },
      logSite: function logSite() {
        var e = "",
            t = "";

        if (this.envData.gecko) {
          e += "%c" + [" ;;;;;;;;;;;;;;; ", ";;;  ;;       ;;;", ";;;  ;;;;;;;;;;;;", ";;;  ;;;;;;;;;;;;", ";;;  ;;       ;;;", ";;;  ;;;;;;;;;;;;", ";;;  ;;;;;;;;;;;;", ";;;  ;;       ;;;", " ;;;;;;;;;;;;;;; "].join("\n") + "\n", t = "color: #C42961";
        } else e += "%c00", t = 'line-height: 1.6; font-size: 20px; background-image: url("' + elementor.config.assets_url + 'images/logo-icon.png"); color: transparent; background-repeat: no-repeat; background-size: cover';

        e += "%c\nLove using Elementor? Join our growing community of Elementor developers: %chttps://github.com/pojome/elementor", setTimeout(console.log.bind(console, e, t, "color: #9B0A46", ""));
      }
    }), t.exports = (window.elementor = new i()).start();
  }, {
    "./components/saver/behaviors/footer-saver": 1,
    "elementor-controls/base": 35,
    "elementor-controls/base-data": 32,
    "elementor-controls/base-multiple": 33,
    "elementor-controls/box-shadow": 36,
    "elementor-controls/button": 37,
    "elementor-controls/choose": 38,
    "elementor-controls/code": 39,
    "elementor-controls/color": 40,
    "elementor-controls/date-time": 41,
    "elementor-controls/dimensions": 42,
    "elementor-controls/font": 43,
    "elementor-controls/gallery": 44,
    "elementor-controls/icon": 45,
    "elementor-controls/image-dimensions": 46,
    "elementor-controls/media": 47,
    "elementor-controls/number": 48,
    "elementor-controls/order": 49,
    "elementor-controls/popover-toggle": 50,
    "elementor-controls/repeater": 52,
    "elementor-controls/repeater-row": 51,
    "elementor-controls/section": 53,
    "elementor-controls/select2": 54,
    "elementor-controls/slider": 55,
    "elementor-controls/structure": 56,
    "elementor-controls/switcher": 57,
    "elementor-controls/tab": 58,
    "elementor-controls/wp_widget": 59,
    "elementor-controls/wysiwyg": 60,
    "elementor-editor-utils/ajax": 103,
    "elementor-editor-utils/conditions": 104,
    "elementor-editor-utils/debug": 106,
    "elementor-editor-utils/heartbeat": 107,
    "elementor-editor-utils/helpers": 108,
    "elementor-editor-utils/images-manager": 109,
    "elementor-editor-utils/notifications": 112,
    "elementor-editor-utils/presets-factory": 113,
    "elementor-editor-utils/schemes": 114,
    "elementor-editor/components/saver/manager": 2,
    "elementor-editor/components/settings/settings": 7,
    "elementor-elements/collections/elements": 62,
    "elementor-elements/models/base-settings": 63,
    "elementor-elements/models/element": 65,
    "elementor-elements/views/widget": 76,
    "elementor-layouts/panel/panel": 102,
    "elementor-panel/pages/elements/views/elements": 88,
    "elementor-panel/pages/menu/menu": 91,
    "elementor-templates/manager": 10,
    "elementor-utils/hooks": 123,
    "elementor-utils/hot-keys": 124,
    "elementor-utils/module": 125,
    "elementor-views/controls-stack": 121,
    "elementor-views/preview": 122,
    "modules/history/assets/js/module": 134
  }],
  62: [function (e, t, n) {
    var i = e("elementor-elements/models/element"),
        o = Backbone.Collection.extend({
      add: function add(e, t, n) {
        if (!(t && t.silent || n)) throw "Call Error: Adding model to element collection is allowed only by the dedicated addChildModel() method.";
        return Backbone.Collection.prototype.add.call(this, e, t);
      },
      model: function model(e, t) {
        var n = Backbone.Model;
        return e.elType && (n = elementor.hooks.applyFilters("element/model", i, e)), new n(e, t);
      },
      clone: function clone() {
        var e = Backbone.Collection.prototype.clone.apply(this, arguments),
            t = new o();
        return e.forEach(function (e) {
          t.add(e.clone(), null, !0);
        }), t;
      }
    });
    o.prototype.sync = o.prototype.fetch = o.prototype.save = _.noop, t.exports = o;
  }, {
    "elementor-elements/models/element": 65
  }],
  63: [function (e, t, n) {
    var i;
    i = Backbone.Model.extend({
      options: {},
      initialize: function initialize(e, t) {
        var n = this;

        if (t && (n.options = t), n.controls = t && t.controls ? t.controls : elementor.getElementControls(n), n.validators = {}, n.controls) {
          var i = e || {},
              o = {};
          _.each(n.controls, function (e) {
            var t = elementor.config.controls[e.type];

            if (!(-1 !== t.features.indexOf("ui"))) {
              var r = jQuery.isPlainObject(t.default_value);
              o[e.name] = r ? _.extend({}, t.default_value, e["default"] || {}) : e["default"] || t.default_value, void 0 !== i[e.name] && r && !_.isObject(i[e.name]) && (elementor.debug.addCustomError(new TypeError("An invalid argument supplied as multiple control value"), "InvalidElementData", "Element `" + (n.get("widgetType") || n.get("elType")) + "` got <" + i[e.name] + "> as `" + e.name + "` value. Expected array or object."), delete i[e.name]), void 0 === i[e.name] && (i[e.name] = o[e.name]);
            }
          }), n.defaults = o, n.handleRepeaterData(i), n.set(i);
        }
      },
      handleRepeaterData: function handleRepeaterData(e) {
        _.each(this.controls, function (t) {
          t.is_repeater && (e[t.name] instanceof Backbone.Collection || (e[t.name] = new Backbone.Collection(e[t.name], {
            model: function model(e, n) {
              return (n = n || {}).controls = t.fields, e._id || (e._id = elementor.helpers.getUniqueID()), new i(e, n);
            }
          })));
        });
      },
      getFontControls: function getFontControls() {
        return _.filter(this.getActiveControls(), function (e) {
          return "font" === e.type;
        });
      },
      getStyleControls: function getStyleControls(e) {
        var t = this;
        return e = e || t.getActiveControls(), _.filter(e, function (n) {
          return n.fields ? (n.styleFields = t.getStyleControls(n.fields), !0) : t.isStyleControl(n.name, e);
        });
      },
      isStyleControl: function isStyleControl(e, t) {
        t = t || this.controls;

        var n = _.find(t, function (t) {
          return e === t.name;
        });

        return n && !_.isEmpty(n.selectors);
      },
      getClassControls: function getClassControls(e) {
        return e = e || this.controls, _.filter(e, function (e) {
          return !_.isUndefined(e.prefix_class);
        });
      },
      isClassControl: function isClassControl(e) {
        var t = _.find(this.controls, function (t) {
          return e === t.name;
        });

        return t && !_.isUndefined(t.prefix_class);
      },
      getControl: function getControl(e) {
        return _.find(this.controls, function (t) {
          return e === t.name;
        });
      },
      getActiveControls: function getActiveControls() {
        var e = this,
            t = {};
        return _.each(e.controls, function (n, i) {
          elementor.helpers.isActiveControl(n, e.attributes) && (t[i] = n);
        }), t;
      },
      clone: function clone() {
        return new i(elementor.helpers.cloneObject(this.attributes), elementor.helpers.cloneObject(this.options));
      },
      setExternalChange: function setExternalChange(e, t) {
        this.set(e, t), this.trigger("change:external", e, t).trigger("change:external:" + e, t);
      },
      toJSON: function toJSON(e) {
        var t = Backbone.Model.prototype.toJSON.call(this);

        if (e = e || {}, delete t.widgetType, delete t.elType, delete t.isInner, _.each(t, function (e, n) {
          e && e.toJSON && (t[n] = e.toJSON());
        }), e.removeDefault) {
          var n = this.controls;

          _.each(t, function (e, i) {
            var o = n[i];

            if (o) {
              if (("text" === o.type || "textarea" === o.type) && t[i]) return;

              if (t[i] && "object" == _typeof(t[i])) {
                if (Object.keys(t[i]).length !== Object.keys(o["default"]).length) return;
                var r = !0;
                _.each(t[i], function (e, n) {
                  if (t[i][n] !== o["default"][n]) return r = !1;
                }), r && delete t[i];
              } else t[i] === o["default"] && delete t[i];
            }
          });
        }

        return t;
      }
    }), t.exports = i;
  }, {}],
  64: [function (e, t, n) {
    var i;
    i = e("elementor-elements/models/base-settings").extend({
      defaults: {
        _column_size: 100
      }
    }), t.exports = i;
  }, {
    "elementor-elements/models/base-settings": 63
  }],
  65: [function (e, t, n) {
    var i,
        o = e("elementor-elements/models/base-settings"),
        r = e("elementor-elements/models/column-settings");
    (i = Backbone.Model.extend({
      defaults: {
        id: "",
        elType: "",
        isInner: !1,
        settings: {},
        defaultEditSettings: {}
      },
      remoteRender: !1,
      _htmlCache: null,
      _jqueryXhr: null,
      renderOnLeave: !1,
      initialize: function initialize(t) {
        var n = this.get("elType"),
            i = this.get("elements");

        if (void 0 !== i) {
          var o = e("elementor-elements/collections/elements");
          this.set("elements", new o(i));
        }

        "widget" === n && (this.remoteRender = !0, this.setHtmlCache(t.htmlCache || "")), delete t.htmlCache, this.renderRemoteServer = _.throttle(this.renderRemoteServer, 1e3), this.initSettings(), this.initEditSettings(), this.on({
          destroy: this.onDestroy,
          "editor:close": this.onCloseEditor
        });
      },
      initSettings: function initSettings() {
        var e = this.get("elType"),
            t = this.get("settings"),
            n = {
          column: r
        }[e] || o;
        jQuery.isEmptyObject(t) && (t = elementor.helpers.cloneObject(t)), "widget" === e && (t.widgetType = this.get("widgetType")), t.elType = e, t.isInner = this.get("isInner"), t = new n(t), this.set("settings", t), elementorFrontend.config.elements.data[this.cid] = t;
      },
      initEditSettings: function initEditSettings() {
        var e = new Backbone.Model(this.get("defaultEditSettings"));
        this.set("editSettings", e), elementorFrontend.config.elements.editSettings[this.cid] = e;
      },
      onDestroy: function onDestroy() {
        var e = this.get("settings"),
            t = this.get("elements");
        void 0 !== t && _.each(_.clone(t.models), function (e) {
          e.destroy();
        }), e instanceof o && e.destroy();
      },
      onCloseEditor: function onCloseEditor() {
        this.initEditSettings(), this.renderOnLeave && this.renderRemoteServer();
      },
      setSetting: function setSetting(e, t) {
        var n = e.split("."),
            i = 3 === n.length,
            o = this.get("settings");
        e = n[0], i && (o = o.get(e).models[n[1]], e = n[2]), o.setExternalChange(e, t);
      },
      getSetting: function getSetting(e) {
        var t = e.split("."),
            n = 3 === t.length,
            i = this.get("settings");
        e = t[0];
        var o = i.get(e);
        return void 0 === o ? "" : (n && (o = o.models[t[1]].get(t[2])), o);
      },
      setHtmlCache: function setHtmlCache(e) {
        this._htmlCache = e;
      },
      getHtmlCache: function getHtmlCache() {
        return this._htmlCache;
      },
      getTitle: function getTitle() {
        var e = elementor.getElementData(this);
        return e ? e.title : "Unknown";
      },
      getIcon: function getIcon() {
        var e = elementor.getElementData(this);
        return e ? e.icon : "unknown";
      },
      createRemoteRenderRequest: function createRemoteRenderRequest() {
        var e = this.toJSON();
        return elementor.ajax.send("render_widget", {
          data: {
            post_id: elementor.config.post_id,
            data: JSON.stringify(e),
            _nonce: elementor.config.nonce
          },
          success: this.onRemoteGetHtml.bind(this)
        });
      },
      renderRemoteServer: function renderRemoteServer() {
        this.remoteRender && (this.renderOnLeave = !1, this.trigger("before:remote:render"), this.isRemoteRequestActive() && this._jqueryXhr.abort(), this._jqueryXhr = this.createRemoteRenderRequest());
      },
      isRemoteRequestActive: function isRemoteRequestActive() {
        return this._jqueryXhr && 4 !== this._jqueryXhr.readyState;
      },
      onRemoteGetHtml: function onRemoteGetHtml(e) {
        this.setHtmlCache(e.render), this.trigger("remote:render");
      },
      clone: function clone() {
        var e = new this.constructor(elementor.helpers.cloneObject(this.attributes));
        e.set("id", elementor.helpers.getUniqueID()), e.setHtmlCache(this.getHtmlCache());
        var t = this.get("elements");
        return _.isEmpty(t) || e.set("elements", t.clone()), e;
      },
      toJSON: function toJSON(e) {
        e = _.extend({
          copyHtmlCache: !1
        }, e);
        var t = Backbone.Model.prototype.toJSON.call(this);
        return _.each(t, function (n, i) {
          n && n.toJSON && (t[i] = n.toJSON(e));
        }), e.copyHtmlCache ? t.htmlCache = this.getHtmlCache() : delete t.htmlCache, t;
      }
    })).prototype.sync = i.prototype.fetch = i.prototype.save = _.noop, t.exports = i;
  }, {
    "elementor-elements/collections/elements": 62,
    "elementor-elements/models/base-settings": 63,
    "elementor-elements/models/column-settings": 64
  }],
  66: [function (e, t, n) {
    var i,
        o = e("elementor-elements/models/base-settings"),
        r = e("elementor-editor-utils/controls-css-parser"),
        s = e("elementor-validator/base"),
        l = e("elementor-views/base-container");
    i = l.extend({
      tagName: "div",
      controlsCSSParser: null,
      toggleEditTools: !0,
      allowRender: !0,
      renderAttributes: {},
      className: function className() {
        return "elementor-element elementor-element-edit-mode " + this.getElementUniqueID();
      },
      attributes: function attributes() {
        var e = this.model.get("elType");
        return "widget" === e && (e = this.model.get("widgetType")), {
          "data-id": this.getID(),
          "data-element_type": e
        };
      },
      ui: function ui() {
        return {
          triggerButton: "> .elementor-element-overlay .elementor-editor-element-trigger",
          duplicateButton: "> .elementor-element-overlay .elementor-editor-element-duplicate",
          removeButton: "> .elementor-element-overlay .elementor-editor-element-remove",
          saveButton: "> .elementor-element-overlay .elementor-editor-element-save",
          settingsList: "> .elementor-element-overlay .elementor-editor-element-settings",
          addButton: "> .elementor-element-overlay .elementor-editor-element-add"
        };
      },
      behaviors: function behaviors() {
        return elementor.hooks.applyFilters("elements/base/behaviors", {}, this);
      },
      getBehavior: function getBehavior(e) {
        return this._behaviors[Object.keys(this.behaviors()).indexOf(e)];
      },
      events: function events() {
        return {
          "click @ui.removeButton": "onClickRemove",
          "click @ui.saveButton": "onClickSave",
          "click @ui.duplicateButton": "onClickDuplicate",
          "click @ui.triggerButton": "onClickEdit"
        };
      },
      getElementType: function getElementType() {
        return this.model.get("elType");
      },
      getIDInt: function getIDInt() {
        return parseInt(this.getID(), 16);
      },
      getChildType: function getChildType() {
        return elementor.helpers.getElementChildType(this.getElementType());
      },
      getChildView: function getChildView(t) {
        var n,
            i = t.get("elType");
        return n = "section" === i ? e("elementor-elements/views/section") : "column" === i ? e("elementor-elements/views/column") : elementor.modules.WidgetView, elementor.hooks.applyFilters("element/view", n, t, this);
      },
      templateHelpers: function templateHelpers() {
        var e = l.prototype.templateHelpers.apply(this, arguments);
        return jQuery.extend(e, {
          editModel: this.getEditModel()
        });
      },
      getTemplateType: function getTemplateType() {
        return "js";
      },
      getEditModel: function getEditModel() {
        return this.model;
      },
      initialize: function initialize() {
        this.collection = this.model.get("elements"), this.collection && this.listenTo(this.collection, "add remove reset", this.onCollectionChanged, this);
        var e = this.getEditModel();
        this.listenTo(e.get("settings"), "change", this.onSettingsChanged, this), this.listenTo(e.get("editSettings"), "change", this.onEditSettingsChanged, this), this.initControlsCSSParser();
      },
      edit: function edit() {
        elementor.getPanelView().openEditor(this.getEditModel(), this);
      },
      addElementFromPanel: function addElementFromPanel(e) {
        var t = elementor.channels.panelElements.request("element:selected"),
            n = {
          id: elementor.helpers.getUniqueID(),
          elType: t.model.get("elType")
        };
        if ("widget" === n.elType) n.widgetType = t.model.get("widgetType");else {
          if ("section" !== n.elType) return;
          n.elements = [], n.isInner = !0;
        }
        var i = t.model.get("custom");
        i && _.extend(n, i), elementor.channels.data.trigger("element:before:add", n);
        var o = this.addChildElement(n, e);
        "section" === o.getElementType() && o.isInner() && o.addEmptyColumn(), elementor.channels.data.trigger("element:after:add", n);
      },
      addControlValidator: function addControlValidator(e, t) {
        t = t.bind(this);
        var n = new s({
          customValidationMethod: t
        }),
            i = this.getEditModel().get("settings").validators;
        i[e] || (i[e] = []), i[e].push(n);
      },
      addRenderAttribute: function addRenderAttribute(e, t, n, i) {
        var o = this;
        return "object" == _typeof(e) ? (jQuery.each(e, function (e) {
          o.addRenderAttribute(e, this, null, i);
        }), o) : "object" == _typeof(t) ? (jQuery.each(t, function (t) {
          o.addRenderAttribute(e, t, this, i);
        }), o) : (o.renderAttributes[e] || (o.renderAttributes[e] = {}), o.renderAttributes[e][t] || (o.renderAttributes[e][t] = []), Array.isArray(n) || (n = [n]), void (o.renderAttributes[e][t] = i ? n : o.renderAttributes[e][t].concat(n)));
      },
      getRenderAttributeString: function getRenderAttributeString(e) {
        if (!this.renderAttributes[e]) return "";
        var t = this.renderAttributes[e],
            n = [];
        return jQuery.each(t, function (e) {
          n.push(e + '="' + _.escape(this.join(" ")) + '"');
        }), n.join(" ");
      },
      isCollectionFilled: function isCollectionFilled() {
        return !1;
      },
      isInner: function isInner() {
        return !!this.model.get("isInner");
      },
      initControlsCSSParser: function initControlsCSSParser() {
        this.controlsCSSParser = new r({
          id: this.model.cid
        });
      },
      enqueueFonts: function enqueueFonts() {
        var e = this.getEditModel(),
            t = e.get("settings");

        _.each(t.getFontControls(), function (t) {
          var n = e.getSetting(t.name);
          _.isEmpty(n) || elementor.helpers.enqueueFont(n);
        });
      },
      renderStyles: function renderStyles(e) {
        e || (e = this.getEditModel().get("settings")), this.controlsCSSParser.stylesheet.empty(), this.controlsCSSParser.addStyleRules(e.getStyleControls(), e.attributes, this.getEditModel().get("settings").controls, [/{{ID}}/g, /{{WRAPPER}}/g], [this.getID(), "#elementor ." + this.getElementUniqueID()]), this.controlsCSSParser.addStyleToDocument();
        var t = elementor.hooks.applyFilters("editor/style/styleText", "", this);
        t && this.controlsCSSParser.elements.$stylesheetElement.append(t);
      },
      renderCustomClasses: function renderCustomClasses() {
        var e = this,
            t = e.getEditModel().get("settings"),
            n = t.getClassControls();
        _.each(n, function (n) {
          var i = t.previous(n.name);
          n.classes_dictionary && void 0 !== n.classes_dictionary[i] && (i = n.classes_dictionary[i]), e.$el.removeClass(n.prefix_class + i);
        }), _.each(n, function (n) {
          var i = t.attributes[n.name],
              o = i;
          n.classes_dictionary && void 0 !== n.classes_dictionary[i] && (o = n.classes_dictionary[i]), elementor.helpers.isActiveControl(n, t.attributes) && !_.isEmpty(o) && e.$el.addClass(n.prefix_class + o).addClass(_.result(e, "className"));
        });
      },
      renderCustomElementID: function renderCustomElementID() {
        var e = this.getEditModel().get("settings").get("_element_id");
        this.$el.attr("id", e);
      },
      getModelForRender: function getModelForRender() {
        return elementor.hooks.applyFilters("element/templateHelpers/editModel", this.getEditModel(), this);
      },
      renderUIOnly: function renderUIOnly() {
        var e = this.getModelForRender();
        this.renderStyles(e.get("settings")), this.renderCustomClasses(), this.renderCustomElementID(), this.enqueueFonts();
      },
      renderUI: function renderUI() {
        this.renderStyles(), this.renderCustomClasses(), this.renderCustomElementID(), this.enqueueFonts();
      },
      runReadyTrigger: function runReadyTrigger() {
        var e = this;

        _.defer(function () {
          elementorFrontend.elementsHandler.runReadyTrigger(e.$el);
        });
      },
      getID: function getID() {
        return this.model.get("id");
      },
      getElementUniqueID: function getElementUniqueID() {
        return "elementor-element-" + this.getID();
      },
      duplicate: function duplicate() {
        this.trigger("request:duplicate");
      },
      renderOnChange: function renderOnChange(e) {
        if (this.allowRender) {
          if (e instanceof o) {
            var t = e.hasChanged(),
                n = !t,
                i = !t;
            if (_.each(e.changedAttributes(), function (t, o) {
              var r = e.getControl(o);

              if ("_column_size" !== o) {
                if (!r) return i = !0, void (n = !0);
                "none" !== r.render_type && (i = !0), -1 === ["none", "ui"].indexOf(r.render_type) && ("template" !== r.render_type && (e.isStyleControl(o) || e.isClassControl(o) || "_element_id" === o) || (n = !0));
              } else i = !0;
            }), !i) return;
            if (!n) return void this.renderUIOnly();
          }

          var r = this.getTemplateType(),
              s = this.getEditModel();
          "js" === r ? (this.getEditModel().setHtmlCache(), this.render(), s.renderOnLeave = !0) : s.renderRemoteServer();
        }
      },
      onBeforeRender: function onBeforeRender() {
        this.renderAttributes = {};
      },
      onRender: function onRender() {
        var e = this;

        if (e.renderUI(), e.runReadyTrigger(), e.toggleEditTools) {
          var t = e.ui.triggerButton;
          e.ui.settingsList.hoverIntent(function () {
            t.addClass("elementor-active");
          }, function () {
            t.removeClass("elementor-active");
          }, {
            timeout: 500
          });
        }
      },
      onCollectionChanged: function onCollectionChanged() {
        elementor.saver.setFlagEditorChange(!0);
      },
      onEditSettingsChanged: function onEditSettingsChanged(e) {
        elementor.channels.editor.trigger("change:editSettings", e, this);
      },
      onSettingsChanged: function onSettingsChanged(e) {
        elementor.saver.setFlagEditorChange(!0), this.renderOnChange(e);
      },
      onClickEdit: function onClickEdit(e) {
        jQuery(e.target).closest(".elementor-clickable").length || (e.preventDefault(), e.stopPropagation()), "edit" === elementor.channels.dataEditMode.request("activeMode") && this.edit();
      },
      onClickDuplicate: function onClickDuplicate(e) {
        e.preventDefault(), e.stopPropagation(), this.duplicate();
      },
      removeElement: function removeElement() {
        elementor.channels.data.trigger("element:before:remove", this.model);
        var e = this._parent;
        e.isManualRemoving = !0, this.model.destroy(), e.isManualRemoving = !1, elementor.channels.data.trigger("element:after:remove", this.model);
      },
      onClickRemove: function onClickRemove(e) {
        e.preventDefault(), e.stopPropagation(), this.removeElement();
      },
      onClickSave: function onClickSave(e) {
        e.preventDefault();
        var t = this.model;
        elementor.templates.startModal({
          onReady: function onReady() {
            elementor.templates.getLayout().showSaveTemplateView(t);
          }
        });
      },
      onDestroy: function onDestroy() {
        this.controlsCSSParser.removeStyleFromDocument();
      }
    }), t.exports = i;
  }, {
    "elementor-editor-utils/controls-css-parser": 105,
    "elementor-elements/models/base-settings": 63,
    "elementor-elements/views/column": 74,
    "elementor-elements/views/section": 75,
    "elementor-validator/base": 30,
    "elementor-views/base-container": 119
  }],
  67: [function (e, t, n) {
    var i;
    i = Marionette.Behavior.extend({
      onChildviewClickNew: function onChildviewClickNew(e) {
        var t = e.$el.index() + 1;
        this.addChild({
          at: t
        });
      },
      onRequestNew: function onRequestNew() {
        this.addChild();
      },
      addChild: function addChild(e) {
        if (!this.view.isCollectionFilled()) {
          e = e || {};
          var t = {
            id: elementor.helpers.getUniqueID(),
            elType: this.view.getChildType()[0],
            settings: {},
            elements: []
          };
          elementor.channels.data.trigger("element:before:add", t), this.view.addChildModel(t, e), elementor.channels.data.trigger("element:after:add", t);
        }
      }
    }), t.exports = i;
  }, {}],
  68: [function (e, t, n) {
    var i;
    i = Marionette.Behavior.extend({
      onChildviewRequestDuplicate: function onChildviewRequestDuplicate(e) {
        if (!this.view.isCollectionFilled()) {
          var t = this.view.collection.indexOf(e.model),
              n = e.model.clone();
          elementor.channels.data.trigger("element:before:duplicate", n), this.view.addChildModel(n, {
            at: t + 1
          }), elementor.channels.data.trigger("element:after:duplicate", n);
        }
      }
    }), t.exports = i;
  }, {}],
  69: [function (e, t, n) {
    var i;
    i = Marionette.Behavior.extend({
      editing: !1,
      $currentEditingArea: null,
      ui: function ui() {
        return {
          inlineEditingArea: "." + this.getOption("inlineEditingClass")
        };
      },
      events: function events() {
        return {
          "click @ui.inlineEditingArea": "onInlineEditingClick",
          "input @ui.inlineEditingArea": "onInlineEditingUpdate"
        };
      },
      getEditingSettingKey: function getEditingSettingKey() {
        return this.$currentEditingArea.data().elementorSettingKey;
      },
      startEditing: function startEditing(e) {
        if (!this.editing && "edit" === elementor.channels.dataEditMode.request("activeMode") && !this.view.model.isRemoteRequestActive()) {
          this.$currentEditingArea = e;
          var t = this.$currentEditingArea.data().elementorInlineEditingToolbar,
              n = "advanced" === t ? "advanced" : "basic",
              i = this.view.getEditModel(),
              o = elementor.config.inlineEditing,
              r = i.getSetting(this.getEditingSettingKey());
          "advanced" === n && (r = wp.editor.autop(r)), this.$currentEditingArea.html(r);
          var s = elementorFrontend.getElements("window").ElementorInlineEditor;
          this.editing = !0, this.view.allowRender = !1, this.view.model.setHtmlCache(""), this.editor = new s({
            linksInNewWindow: !0,
            stay: !1,
            editor: this.$currentEditingArea[0],
            mode: n,
            list: "none" === t ? [] : o.toolbar[t || "basic"],
            cleanAttrs: ["id", "class", "name"],
            placeholder: elementor.translate("type_here") + "...",
            toolbarIconsPrefix: "eicon-editor-",
            toolbarIconsDictionary: {
              externalLink: {
                className: "eicon-editor-external-link"
              },
              list: {
                className: "eicon-editor-list-ul"
              },
              insertOrderedList: {
                className: "eicon-editor-list-ol"
              },
              insertUnorderedList: {
                className: "eicon-editor-list-ul"
              },
              createlink: {
                className: "eicon-editor-link"
              },
              unlink: {
                className: "eicon-editor-unlink"
              },
              blockquote: {
                className: "eicon-editor-quote"
              },
              p: {
                className: "eicon-editor-paragraph"
              },
              pre: {
                className: "eicon-editor-code"
              }
            }
          }), jQuery(this.editor._menu).children().on("mousedown", function (e) {
            e.preventDefault();
          }), this.$currentEditingArea.on("blur", this.onInlineEditingBlur.bind(this));
        }
      },
      stopEditing: function stopEditing() {
        this.editing = !1, this.editor.destroy(), this.view.allowRender = !0, "advanced" === this.$currentEditingArea.data().elementorInlineEditingToolbar && this.view.getEditModel().renderRemoteServer();
      },
      onInlineEditingClick: function onInlineEditingClick(e) {
        var t = this,
            n = jQuery(e.currentTarget);
        setTimeout(function () {
          t.startEditing(n);
        }, 30);
      },
      onInlineEditingBlur: function onInlineEditingBlur() {
        var e = this;
        setTimeout(function () {
          var t = elementorFrontend.getElements("window").getSelection();
          jQuery(t.focusNode).closest(".pen-input-wrapper").length || e.stopEditing();
        }, 20);
      },
      onInlineEditingUpdate: function onInlineEditingUpdate() {
        this.view.getEditModel().setSetting(this.getEditingSettingKey(), this.editor.getContent());
      }
    }), t.exports = i;
  }, {}],
  70: [function (e, t, n) {
    var i;
    i = Marionette.Behavior.extend({
      onRenderCollection: function onRenderCollection() {
        this.handleInnerTabs(this.view);
      },
      handleInnerTabs: function handleInnerTabs(e) {
        var t = e.children.filter(function (e) {
          return "tabs" === e.model.get("type");
        });

        _.each(t, function (t) {
          t.$el.find(".elementor-control-content").remove();
          var n = t.model.get("name"),
              i = e.children.filter(function (e) {
            return "tab" === e.model.get("type") && e.model.get("tabs_wrapper") === n;
          });

          _.each(i, function (n, i) {
            t._addChildView(n);

            var o = n.model.get("name"),
                r = e.children.filter(function (e) {
              return o === e.model.get("inner_tab");
            });
            0 === i ? n.$el.addClass("elementor-tab-active") : _.each(r, function (e) {
              e.$el.addClass("elementor-tab-close");
            });
          });
        });
      },
      onChildviewControlTabClicked: function onChildviewControlTabClicked(e) {
        var t = "elementor-tab-close",
            n = "elementor-tab-active",
            i = e.model.get("name"),
            o = this.view.children.filter(function (t) {
          return "tab" !== t.model.get("type") && e.model.get("tabs_wrapper") === t.model.get("tabs_wrapper");
        }),
            r = this.view.children.filter(function (t) {
          return "tab" === t.model.get("type") && e.model.get("tabs_wrapper") === t.model.get("tabs_wrapper");
        });
        _.each(r, function (e) {
          e.$el.removeClass(n);
        }), e.$el.addClass(n), _.each(o, function (e) {
          e.model.get("inner_tab") === i ? e.$el.removeClass(t) : e.$el.addClass(t);
        }), elementor.channels.data.trigger("scrollbar:update");
      }
    }), t.exports = i;
  }, {}],
  71: [function (e, t, n) {
    var i;
    i = Marionette.Behavior.extend({
      defaults: {
        handles: elementor.config.is_rtl ? "w" : "e"
      },
      events: {
        resizestart: "onResizeStart",
        resizestop: "onResizeStop",
        resize: "onResize"
      },
      initialize: function initialize() {
        Marionette.Behavior.prototype.initialize.apply(this, arguments), this.listenTo(elementor.channels.dataEditMode, "switch", this.onEditModeSwitched);
      },
      active: function active() {
        this.deactivate();

        var e = _.clone(this.options);

        delete e.behaviorClass;

        var t = this.getChildViewContainer(),
            n = _.extend({}, e);

        t.resizable(n);
      },
      deactivate: function deactivate() {
        this.getChildViewContainer().resizable("instance") && this.getChildViewContainer().resizable("destroy");
      },
      onEditModeSwitched: function onEditModeSwitched(e) {
        "edit" === e ? this.active() : this.deactivate();
      },
      onRender: function onRender() {
        var e = this;

        _.defer(function () {
          e.onEditModeSwitched(elementor.channels.dataEditMode.request("activeMode"));
        });
      },
      onDestroy: function onDestroy() {
        this.deactivate();
      },
      onResizeStart: function onResizeStart(e) {
        e.stopPropagation(), this.view.$el.data("originalWidth", this.view.el.getBoundingClientRect().width), this.view.triggerMethod("request:resize:start", e);
      },
      onResizeStop: function onResizeStop(e) {
        e.stopPropagation(), this.view.triggerMethod("request:resize:stop");
      },
      onResize: function onResize(e, t) {
        e.stopPropagation(), this.view.triggerMethod("request:resize", t, e);
      },
      getChildViewContainer: function getChildViewContainer() {
        return this.$el;
      }
    }), t.exports = i;
  }, {}],
  72: [function (e, t, n) {
    var i;
    i = Marionette.Behavior.extend({
      defaults: {
        elChildType: "widget"
      },
      events: {
        sortstart: "onSortStart",
        sortreceive: "onSortReceive",
        sortupdate: "onSortUpdate",
        sortover: "onSortOver",
        sortout: "onSortOut"
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.dataEditMode, "switch", this.onEditModeSwitched).listenTo(elementor.channels.deviceMode, "change", this.onDeviceModeChange);
      },
      onEditModeSwitched: function onEditModeSwitched(e) {
        "edit" === e ? this.activate() : this.deactivate();
      },
      onDeviceModeChange: function onDeviceModeChange() {
        "desktop" === elementor.channels.deviceMode.request("currentMode") ? this.activate() : this.deactivate();
      },
      onRender: function onRender() {
        var e = this;

        _.defer(function () {
          e.onEditModeSwitched(elementor.channels.dataEditMode.request("activeMode"));
        });
      },
      onDestroy: function onDestroy() {
        this.deactivate();
      },
      activate: function activate() {
        if (!this.getChildViewContainer().sortable("instance")) {
          var e = this.getChildViewContainer(),
              t = {
            connectWith: e.selector,
            placeholder: "elementor-sortable-placeholder elementor-" + this.getOption("elChildType") + "-placeholder",
            cursorAt: {
              top: 20,
              left: 25
            },
            helper: this._getSortableHelper.bind(this),
            cancel: "input, textarea, button, select, option, .elementor-inline-editing, .elementor-tab-title"
          },
              n = _.extend(t, this.view.getSortableOptions());

          e.sortable(n);
        }
      },
      _getSortableHelper: function _getSortableHelper(e, t) {
        var n = this.view.collection.get({
          cid: t.data("model-cid")
        });
        return '<div style="height: 84px; width: 125px;" class="elementor-sortable-helper elementor-sortable-helper-' + n.get("elType") + '"><div class="icon"><i class="' + n.getIcon() + '"></i></div><div class="elementor-element-title-wrapper"><div class="title">' + n.getTitle() + "</div></div></div>";
      },
      getChildViewContainer: function getChildViewContainer() {
        return this.view.getChildViewContainer(this.view);
      },
      deactivate: function deactivate() {
        this.getChildViewContainer().sortable("instance") && this.getChildViewContainer().sortable("destroy");
      },
      onSortStart: function onSortStart(e, t) {
        e.stopPropagation();
        var n = this.view.collection.get({
          cid: t.item.data("model-cid")
        });

        if ("column" === this.options.elChildType) {
          var i = t.item.data("sortableItem").items,
              o = 0;
          i.forEach(function (e) {
            if (e.item[0] === t.item[0]) return o = e.height, !1;
          }), t.placeholder.height(o);
        }

        elementor.channels.data.reply("dragging:model", n).reply("dragging:parent:view", this.view).trigger("drag:start", n).trigger(n.get("elType") + ":drag:start");
      },
      onSortOver: function onSortOver(e) {
        e.stopPropagation();
        var t = elementor.channels.data.request("dragging:model");
        jQuery(e.target).addClass("elementor-draggable-over").attr({
          "data-dragged-element": t.get("elType"),
          "data-dragged-is-inner": t.get("isInner")
        }), this.$el.addClass("elementor-dragging-on-child");
      },
      onSortOut: function onSortOut(e) {
        e.stopPropagation(), jQuery(e.target).removeClass("elementor-draggable-over").removeAttr("data-dragged-element data-dragged-is-inner"), this.$el.removeClass("elementor-dragging-on-child");
      },
      onSortReceive: function onSortReceive(e, t) {
        if (e.stopPropagation(), this.view.isCollectionFilled()) jQuery(t.sender).sortable("cancel");else {
          var n = elementor.channels.data.request("dragging:model"),
              i = "section" === n.get("elType") && n.get("isInner"),
              o = "column" === this.view.getElementType() && this.view.isInner();
          if (i && o) jQuery(t.sender).sortable("cancel");else {
            elementor.channels.data.trigger("drag:before:update", n);
            var r = t.item.parent().children().index(t.item),
                s = n.toJSON({
              copyHtmlCache: !0
            }),
                l = elementor.channels.data.request("dragging:parent:view");
            l.isManualRemoving = !0, n.destroy(), l.isManualRemoving = !1, this.view.addChildElement(s, {
              at: r
            }), elementor.channels.data.trigger("drag:after:update", n);
          }
        }
      },
      onSortUpdate: function onSortUpdate(e, t) {
        if (e.stopPropagation(), this.getChildViewContainer()[0] === t.item.parent()[0]) {
          var n = elementor.channels.data.request("dragging:model"),
              i = t.item,
              o = this.view.collection,
              r = i.parent().children().index(i);
          elementor.channels.data.trigger("drag:before:update", n), this.view.children.findByModelCid(n.cid)._isRendering = !0, o.remove(n), this.view.addChildElement(n, {
            at: r
          }), elementor.saver.setFlagEditorChange(!0), elementor.channels.data.trigger("drag:after:update", n);
        }
      },
      onAddChild: function onAddChild(e) {
        e.$el.attr("data-model-cid", e.model.cid);
      }
    }), t.exports = i;
  }, {}],
  73: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-empty-preview",
      className: "elementor-empty-view",
      events: {
        click: "onClickAdd"
      },
      onClickAdd: function onClickAdd() {
        elementor.getPanelView().setPage("elements");
      }
    }), t.exports = i;
  }, {}],
  74: [function (e, t, n) {
    var i,
        o = e("elementor-elements/views/base"),
        r = e("elementor-elements/views/column-empty");
    i = o.extend({
      template: Marionette.TemplateCache.get("#tmpl-elementor-element-column-content"),
      emptyView: r,
      childViewContainer: "> .elementor-column-wrap > .elementor-widget-wrap",
      behaviors: function behaviors() {
        var t = o.prototype.behaviors.apply(this, arguments);
        return _.extend(t, {
          Sortable: {
            behaviorClass: e("elementor-behaviors/sortable"),
            elChildType: "widget"
          },
          Resizable: {
            behaviorClass: e("elementor-behaviors/resizable")
          },
          HandleDuplicate: {
            behaviorClass: e("elementor-behaviors/handle-duplicate")
          },
          HandleAddMode: {
            behaviorClass: e("elementor-behaviors/duplicate")
          }
        }), elementor.hooks.applyFilters("elements/column/behaviors", t, this);
      },
      className: function className() {
        return o.prototype.className.apply(this, arguments) + " elementor-column elementor-" + (this.isInner() ? "inner" : "top") + "-column";
      },
      tagName: function tagName() {
        return this.model.getSetting("html_tag") || "div";
      },
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.columnInner = "> .elementor-column-wrap", e.percentsTooltip = "> .elementor-element-overlay .elementor-column-percents-tooltip", e;
      },
      triggers: {
        "click @ui.addButton": "click:new"
      },
      initialize: function initialize() {
        o.prototype.initialize.apply(this, arguments), this.addControlValidator("_inline_size", this.onEditorInlineSizeInputChange);
      },
      isDroppingAllowed: function isDroppingAllowed() {
        var e = elementor.channels.panelElements.request("element:selected");
        if (!e) return !1;
        var t = e.model.get("elType");
        return "section" === t ? !this.isInner() : "widget" === t;
      },
      getPercentsForDisplay: function getPercentsForDisplay() {
        return (+this.model.getSetting("_inline_size") || this.getPercentSize()).toFixed(1) + "%";
      },
      changeSizeUI: function changeSizeUI() {
        var e = this,
            t = e.model.getSetting("_column_size");
        e.$el.attr("data-col", t), _.defer(function () {
          e.ui.percentsTooltip && e.ui.percentsTooltip.text(e.getPercentsForDisplay());
        });
      },
      getPercentSize: function getPercentSize(e) {
        return e || (e = this.el.getBoundingClientRect().width), +(e / this.$el.parent().width() * 100).toFixed(3);
      },
      getSortableOptions: function getSortableOptions() {
        return {
          connectWith: ".elementor-widget-wrap",
          items: "> .elementor-element"
        };
      },
      changeChildContainerClasses: function changeChildContainerClasses() {
        var e = "elementor-element-empty",
            t = "elementor-element-populated";
        this.collection.isEmpty() ? this.ui.columnInner.removeClass(t).addClass(e) : this.ui.columnInner.removeClass(e).addClass(t);
      },
      onCollectionChanged: function onCollectionChanged() {
        o.prototype.onCollectionChanged.apply(this, arguments), this.changeChildContainerClasses();
      },
      onRender: function onRender() {
        var e = this;
        o.prototype.onRender.apply(e, arguments), e.changeChildContainerClasses(), e.changeSizeUI(), e.$el.html5Droppable({
          items: " > .elementor-column-wrap > .elementor-widget-wrap > .elementor-element, >.elementor-column-wrap > .elementor-widget-wrap > .elementor-empty-view > .elementor-first-add",
          axis: ["vertical"],
          groups: ["elementor-element"],
          isDroppingAllowed: e.isDroppingAllowed.bind(e),
          currentElementClass: "elementor-html5dnd-current-element",
          placeholderClass: "elementor-sortable-placeholder elementor-widget-placeholder",
          hasDraggingOnChildClass: "elementor-dragging-on-child",
          onDropping: function onDropping(t, n) {
            n.stopPropagation();
            var i = jQuery(this).index();
            "bottom" === t && i++, e.addElementFromPanel({
              at: i
            });
          }
        });
      },
      onSettingsChanged: function onSettingsChanged(e) {
        o.prototype.onSettingsChanged.apply(this, arguments);
        var t = e.changedAttributes();
        ("_column_size" in t || "_inline_size" in t) && this.changeSizeUI();
      },
      onEditorInlineSizeInputChange: function onEditorInlineSizeInputChange(e, t) {
        var n = [],
            i = this.model.getSetting("_column_size");
        if (100 === i) return n.push("Could not resize one column"), n;
        t || (t = i);

        try {
          this._parent.resizeChild(this, +t, +e);
        } catch (e) {
          e.message === this._parent.errors.columnWidthTooLarge && n.push(e.message);
        }

        return n;
      }
    }), t.exports = i;
  }, {
    "elementor-behaviors/duplicate": 67,
    "elementor-behaviors/handle-duplicate": 68,
    "elementor-behaviors/resizable": 71,
    "elementor-behaviors/sortable": 72,
    "elementor-elements/views/base": 66,
    "elementor-elements/views/column-empty": 73
  }],
  75: [function (e, t, n) {
    var i,
        o = e("elementor-elements/views/base"),
        r = e("elementor-views/add-section/inline");
    i = o.extend({
      template: Marionette.TemplateCache.get("#tmpl-elementor-element-section-content"),
      addSectionView: null,
      toggleEditTools: !1,
      className: function className() {
        return o.prototype.className.apply(this, arguments) + " elementor-section elementor-" + (this.isInner() ? "inner" : "top") + "-section";
      },
      tagName: function tagName() {
        return this.model.getSetting("html_tag") || "section";
      },
      childViewContainer: "> .elementor-container > .elementor-row",
      behaviors: function behaviors() {
        var t = o.prototype.behaviors.apply(this, arguments);
        return _.extend(t, {
          Sortable: {
            behaviorClass: e("elementor-behaviors/sortable"),
            elChildType: "column"
          },
          HandleDuplicate: {
            behaviorClass: e("elementor-behaviors/handle-duplicate")
          },
          HandleAddMode: {
            behaviorClass: e("elementor-behaviors/duplicate")
          }
        }), elementor.hooks.applyFilters("elements/section/behaviors", t, this);
      },
      errors: {
        columnWidthTooLarge: "New column width is too large",
        columnWidthTooSmall: "New column width is too small"
      },
      events: function events() {
        var e = o.prototype.events.apply(this, arguments);
        return e["click @ui.addButton"] = "onClickAdd", e;
      },
      initialize: function initialize() {
        o.prototype.initialize.apply(this, arguments), this.listenTo(this.collection, "add remove reset", this._checkIsFull), this._checkIsEmpty();
      },
      addEmptyColumn: function addEmptyColumn() {
        this.addChildModel({
          id: elementor.helpers.getUniqueID(),
          elType: "column",
          settings: {},
          elements: []
        });
      },
      addChildModel: function addChildModel(e, t) {
        var n = e instanceof Backbone.Model,
            i = this.isInner();
        return n ? e.set("isInner", i) : e.isInner = i, o.prototype.addChildModel.apply(this, arguments);
      },
      getSortableOptions: function getSortableOptions() {
        return {
          connectWith: (this.isInner() ? ".elementor-inner-section" : ".elementor-top-section") + " > .elementor-container > .elementor-row",
          handle: "> .elementor-element-overlay .elementor-editor-column-settings .elementor-editor-element-trigger",
          items: "> .elementor-column",
          forcePlaceholderSize: !0,
          tolerance: "pointer"
        };
      },
      onSettingsChanged: function onSettingsChanged(e) {
        o.prototype.onSettingsChanged.apply(this, arguments), e.changed.structure && this.redefineLayout();
      },
      getColumnPercentSize: function getColumnPercentSize(e, t) {
        return +(t / e.parent().width() * 100).toFixed(3);
      },
      getDefaultStructure: function getDefaultStructure() {
        return this.collection.length + "0";
      },
      getStructure: function getStructure() {
        return this.model.getSetting("structure");
      },
      setStructure: function setStructure(e) {
        if (+elementor.presetsFactory.getParsedStructure(e).columnsCount !== this.collection.length) throw new TypeError("The provided structure doesn't match the columns count.");
        this.model.setSetting("structure", e);
      },
      redefineLayout: function redefineLayout() {
        var e = elementor.presetsFactory.getPresetByStructure(this.getStructure());
        this.collection.each(function (t, n) {
          t.setSetting("_column_size", e.preset[n]), t.setSetting("_inline_size", null);
        });
      },
      resetLayout: function resetLayout() {
        this.setStructure(this.getDefaultStructure());
      },
      resetColumnsCustomSize: function resetColumnsCustomSize() {
        this.collection.each(function (e) {
          e.setSetting("_inline_size", null);
        });
      },
      isCollectionFilled: function isCollectionFilled() {
        return 10 <= this.collection.length;
      },
      _checkIsFull: function _checkIsFull() {
        this.$el.toggleClass("elementor-section-filled", this.isCollectionFilled());
      },
      _checkIsEmpty: function _checkIsEmpty() {
        this.collection.length || this.model.get("dontFillEmpty") || this.addEmptyColumn();
      },
      getColumnAt: function getColumnAt(e) {
        var t = this.collection.at(e);
        return t ? this.children.findByModelCid(t.cid) : null;
      },
      getNextColumn: function getNextColumn(e) {
        return this.getColumnAt(this.collection.indexOf(e.model) + 1);
      },
      getPreviousColumn: function getPreviousColumn(e) {
        return this.getColumnAt(this.collection.indexOf(e.model) - 1);
      },
      showChildrenPercentsTooltip: function showChildrenPercentsTooltip(e, t) {
        e.ui.percentsTooltip.show(), e.ui.percentsTooltip.attr("data-side", elementor.config.is_rtl ? "right" : "left"), t.ui.percentsTooltip.show(), t.ui.percentsTooltip.attr("data-side", elementor.config.is_rtl ? "left" : "right");
      },
      hideChildrenPercentsTooltip: function hideChildrenPercentsTooltip(e, t) {
        e.ui.percentsTooltip.hide(), t.ui.percentsTooltip.hide();
      },
      resizeChild: function resizeChild(e, t, n) {
        var i = this.getNextColumn(e) || this.getPreviousColumn(e);
        if (!i) throw new ReferenceError("There is not any next column");
        var o = i.$el,
            r = +(t + (+i.model.getSetting("_inline_size") || this.getColumnPercentSize(o, o[0].getBoundingClientRect().width)) - n).toFixed(3);
        if (r < 10) throw new RangeError(this.errors.columnWidthTooLarge);
        if (n < 10) throw new RangeError(this.errors.columnWidthTooSmall);
        return i.model.setSetting("_inline_size", r), !0;
      },
      destroyAddSectionView: function destroyAddSectionView() {
        this.addSectionView && !this.addSectionView.isDestroyed && this.addSectionView.destroy();
      },
      onRender: function onRender() {
        o.prototype.onRender.apply(this, arguments), this._checkIsFull();
      },
      onClickAdd: function onClickAdd() {
        if (!this.addSectionView || this.addSectionView.isDestroyed) {
          var e = this.model.collection.indexOf(this.model),
              t = new r({
            atIndex: e
          });
          t.render(), this.$el.before(t.$el), t.$el.hide(), setTimeout(function () {
            t.$el.slideDown();
          }), this.addSectionView = t;
        } else this.addSectionView.fadeToDeath();
      },
      onAddChild: function onAddChild() {
        this.isBuffering || this.model.get("dontFillEmpty") || this.resetLayout();
      },
      onRemoveChild: function onRemoveChild() {
        this.isManualRemoving && (this._checkIsEmpty(), this.resetLayout());
      },
      onChildviewRequestResizeStart: function onChildviewRequestResizeStart(e) {
        var t = this.getNextColumn(e);

        if (t) {
          this.showChildrenPercentsTooltip(e, t);
          var n = e.$el.find("iframe").add(t.$el.find("iframe"));
          elementor.helpers.disableElementEvents(n);
        }
      },
      onChildviewRequestResizeStop: function onChildviewRequestResizeStop(e) {
        var t = this.getNextColumn(e);

        if (t) {
          this.hideChildrenPercentsTooltip(e, t);
          var n = e.$el.find("iframe").add(t.$el.find("iframe"));
          elementor.helpers.enableElementEvents(n);
        }
      },
      onChildviewRequestResize: function onChildviewRequestResize(e, t, n) {
        var i = +e.model.getSetting("_inline_size") || this.getColumnPercentSize(e.$el, e.$el.data("originalWidth"));
        t.element.css({
          width: "",
          left: "initial"
        });
        var o = this.getColumnPercentSize(t.element, t.size.width);

        try {
          this.resizeChild(e, i, o);
        } catch (e) {
          return;
        }

        e.model.setSetting("_inline_size", o);
      },
      onDestroy: function onDestroy() {
        o.prototype.onDestroy.apply(this, arguments), this.destroyAddSectionView();
      }
    }), t.exports = i;
  }, {
    "elementor-behaviors/duplicate": 67,
    "elementor-behaviors/handle-duplicate": 68,
    "elementor-behaviors/sortable": 72,
    "elementor-elements/views/base": 66,
    "elementor-views/add-section/inline": 118
  }],
  76: [function (e, t, n) {
    var i,
        o = e("elementor-elements/views/base");
    i = o.extend({
      _templateType: null,
      getTemplate: function getTemplate() {
        var e = this.getEditModel();
        return "remote" !== this.getTemplateType() ? Marionette.TemplateCache.get("#tmpl-elementor-" + e.get("elType") + "-" + e.get("widgetType") + "-content") : _.template("");
      },
      className: function className() {
        return o.prototype.className.apply(this, arguments) + " elementor-widget";
      },
      events: function events() {
        var e = o.prototype.events.apply(this, arguments);
        return e.click = "onClickEdit", e;
      },
      behaviors: function behaviors() {
        var t = o.prototype.behaviors.apply(this, arguments);
        return _.extend(t, {
          InlineEditing: {
            behaviorClass: e("elementor-behaviors/inline-editing"),
            inlineEditingClass: "elementor-inline-editing"
          }
        }), elementor.hooks.applyFilters("elements/widget/behaviors", t, this);
      },
      initialize: function initialize() {
        o.prototype.initialize.apply(this, arguments);
        var e = this.getEditModel();
        e.on({
          "before:remote:render": this.onModelBeforeRemoteRender.bind(this),
          "remote:render": this.onModelRemoteRender.bind(this)
        }), "remote" !== this.getTemplateType() || this.getEditModel().getHtmlCache() || e.renderRemoteServer();
        var t = this.onRender;
        this.render = _.throttle(this.render, 300), this.onRender = function () {
          _.defer(t.bind(this));
        };
      },
      render: function render() {
        if (this.model.isRemoteRequestActive()) return this.handleEmptyWidget(), void this.$el.addClass("elementor-element");
        Marionette.CompositeView.prototype.render.apply(this, arguments);
      },
      handleEmptyWidget: function handleEmptyWidget() {
        this.$el.addClass("elementor-widget-empty").append('<i class="elementor-widget-empty-icon ' + this.getEditModel().getIcon() + '"></i>');
      },
      getTemplateType: function getTemplateType() {
        if (null === this._templateType) {
          var e = this.getEditModel(),
              t = jQuery("#tmpl-elementor-" + e.get("elType") + "-" + e.get("widgetType") + "-content");
          this._templateType = t.length ? "js" : "remote";
        }

        return this._templateType;
      },
      getHTMLContent: function getHTMLContent(e) {
        return this.getEditModel().getHtmlCache() || e;
      },
      attachElContent: function attachElContent(e) {
        var t = this,
            n = t.getHTMLContent(e);
        return _.defer(function () {
          elementorFrontend.getElements("window").jQuery(t.el).html(n), t.bindUIElements();
        }), this;
      },
      addInlineEditingAttributes: function addInlineEditingAttributes(e, t) {
        this.addRenderAttribute(e, {
          "class": "elementor-inline-editing",
          "data-elementor-setting-key": e
        }), t && this.addRenderAttribute(e, {
          "data-elementor-inline-editing-toolbar": t
        });
      },
      getRepeaterSettingKey: function getRepeaterSettingKey(e, t, n) {
        return [t, n, e].join(".");
      },
      onModelBeforeRemoteRender: function onModelBeforeRemoteRender() {
        this.$el.addClass("elementor-loading");
      },
      onBeforeDestroy: function onBeforeDestroy() {
        elementor.$previewContents.find("#elementor-style-" + this.model.cid).remove();
      },
      onModelRemoteRender: function onModelRemoteRender() {
        this.isDestroyed || (this.$el.removeClass("elementor-loading"), this.render());
      },
      onRender: function onRender() {
        var e = this;
        o.prototype.onRender.apply(e, arguments);
        var t = e.getEditModel(),
            n = t.getSetting("_skin") || "default";
        e.$el.attr("data-element_type", t.get("widgetType") + "." + n).removeClass("elementor-widget-empty").addClass("elementor-widget-" + t.get("widgetType") + " elementor-widget-can-edit").children(".elementor-widget-empty-icon").remove(), e.$el.imagesLoaded().always(function () {
          setTimeout(function () {
            1 > e.$el.height() && e.handleEmptyWidget();
          }, 200);
        });
      }
    }), t.exports = i;
  }, {
    "elementor-behaviors/inline-editing": 69,
    "elementor-elements/views/base": 66
  }],
  77: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-mode-switcher-content",
      id: "elementor-mode-switcher-inner",
      ui: {
        previewButton: "#elementor-mode-switcher-preview-input",
        previewLabel: "#elementor-mode-switcher-preview",
        previewLabelA11y: "#elementor-mode-switcher-preview .elementor-screen-only"
      },
      events: {
        "change @ui.previewButton": "onPreviewButtonChange"
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.dataEditMode, "switch", this.onEditModeChanged);
      },
      getCurrentMode: function getCurrentMode() {
        return this.ui.previewButton.is(":checked") ? "preview" : "edit";
      },
      setMode: function setMode(e) {
        this.ui.previewButton.prop("checked", "preview" === e).trigger("change");
      },
      toggleMode: function toggleMode() {
        this.setMode(this.ui.previewButton.prop("checked") ? "edit" : "preview");
      },
      onRender: function onRender() {
        this.onEditModeChanged();
      },
      onPreviewButtonChange: function onPreviewButtonChange() {
        elementor.changeEditMode(this.getCurrentMode());
      },
      onEditModeChanged: function onEditModeChanged() {
        var e = elementor.channels.dataEditMode.request("activeMode"),
            t = elementor.translate("preview" === e ? "back_to_editor" : "preview");
        this.ui.previewLabel.attr("title", t), this.ui.previewLabelA11y.text(t);
      }
    }), t.exports = i;
  }, {}],
  78: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-footer-content",
      tagName: "nav",
      id: "elementor-panel-footer-tools",
      possibleRotateModes: ["portrait", "landscape"],
      ui: {
        buttonSave: "#elementor-panel-saver-button-publish, #elementor-panel-saver-menu-save-draft",
        menuButtons: ".elementor-panel-footer-tool",
        settings: "#elementor-panel-footer-settings",
        deviceModeIcon: "#elementor-panel-footer-responsive > i",
        deviceModeButtons: "#elementor-panel-footer-responsive .elementor-panel-footer-sub-menu-item",
        saveTemplate: "#elementor-panel-saver-menu-save-template",
        history: "#elementor-panel-footer-history"
      },
      events: {
        "click @ui.settings": "onClickSettings",
        "click @ui.deviceModeButtons": "onClickResponsiveButtons",
        "click @ui.saveTemplate": "onClickSaveTemplate",
        "click @ui.history": "onClickHistory"
      },
      behaviors: function behaviors() {
        var e = {
          saver: {
            behaviorClass: elementor.modules.saver.footerBehavior
          }
        };
        return elementor.hooks.applyFilters("panel/footer/behaviors", e, this);
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.deviceMode, "change", this.onDeviceModeChange);
      },
      getDeviceModeButton: function getDeviceModeButton(e) {
        return this.ui.deviceModeButtons.filter('[data-device-mode="' + e + '"]');
      },
      onPanelClick: function onPanelClick(e) {
        var t = jQuery(e.target);

        if (!t.closest(".elementor-panel-footer-sub-menu-wrapper").length) {
          var n = t.closest(".elementor-panel-footer-tool"),
              i = n.length && !n.hasClass("elementor-open");
          this.ui.menuButtons.filter(":not(.elementor-leave-open)").removeClass("elementor-open"), i && n.addClass("elementor-open");
        }
      },
      onClickSettings: function onClickSettings() {
        var e = this;
        "page_settings" !== elementor.getPanelView().getCurrentPageName() && (elementor.getPanelView().setPage("page_settings"), elementor.getPanelView().getCurrentPageView().once("destroy", function () {
          e.ui.settings.removeClass("elementor-open");
        }));
      },
      onDeviceModeChange: function onDeviceModeChange() {
        var e = elementor.channels.deviceMode.request("previousMode"),
            t = elementor.channels.deviceMode.request("currentMode");
        this.getDeviceModeButton(e).removeClass("active"), this.getDeviceModeButton(t).addClass("active"), this.ui.deviceModeIcon.removeClass("eicon-device-" + e).addClass("eicon-device-" + t);
      },
      onClickResponsiveButtons: function onClickResponsiveButtons(e) {
        var t = this.$(e.currentTarget).data("device-mode");
        elementor.changeDeviceMode(t);
      },
      onClickSaveTemplate: function onClickSaveTemplate() {
        elementor.templates.startModal({
          onReady: function onReady() {
            elementor.templates.getLayout().showSaveTemplateView();
          }
        });
      },
      onClickHistory: function onClickHistory() {
        "historyPage" !== elementor.getPanelView().getCurrentPageName() && elementor.getPanelView().setPage("historyPage");
      },
      onRender: function onRender() {
        var e = this;

        _.defer(function () {
          elementor.getPanelView().$el.on("click", e.onPanelClick.bind(e));
        });
      }
    });
  }, {}],
  79: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-header",
      id: "elementor-panel-header",
      ui: {
        menuButton: "#elementor-panel-header-menu-button",
        menuIcon: "#elementor-panel-header-menu-button i",
        title: "#elementor-panel-header-title",
        addButton: "#elementor-panel-header-add-button"
      },
      events: {
        "click @ui.addButton": "onClickAdd",
        "click @ui.menuButton": "onClickMenu"
      },
      setTitle: function setTitle(e) {
        this.ui.title.html(e);
      },
      onClickAdd: function onClickAdd() {
        elementor.getPanelView().setPage("elements");
      },
      onClickMenu: function onClickMenu() {
        var e = elementor.getPanelView(),
            t = "menu" === e.getCurrentPageName() ? "elements" : "menu";

        if ("menu" === t) {
          var n = "eicon-arrow-" + (elementor.config.is_rtl ? "right" : "left");
          this.ui.menuIcon.removeClass("eicon-menu-bar").addClass(n);
        }

        e.setPage(t);
      }
    }), t.exports = i;
  }, {}],
  80: [function (e, t, n) {
    var i,
        o = e("elementor-views/controls-stack");
    i = o.extend({
      template: Marionette.TemplateCache.get("#tmpl-editor-content"),
      id: "elementor-panel-page-editor",
      childViewContainer: "#elementor-controls",
      childViewOptions: function childViewOptions() {
        return {
          elementSettingsModel: this.model.get("settings"),
          elementEditSettings: this.model.get("editSettings")
        };
      },
      openActiveSection: function openActiveSection() {
        o.prototype.openActiveSection.apply(this, arguments), elementor.channels.editor.trigger("section:activated", this.activeSection, this);
      },
      isVisibleSectionControl: function isVisibleSectionControl(e) {
        return o.prototype.isVisibleSectionControl.apply(this, arguments) && elementor.helpers.isActiveControl(e, this.model.get("settings").attributes);
      },
      scrollToEditedElement: function scrollToEditedElement() {
        elementor.helpers.scrollToView(this.getOption("editedElementView"));
      },
      onBeforeRender: function onBeforeRender() {
        var e = elementor.getElementControls(this.model);
        if (!e) throw new Error("Editor controls not found");
        this.collection = new Backbone.Collection(_.values(e));
      },
      onDestroy: function onDestroy() {
        var e = this.getOption("editedElementView");
        e && e.$el.removeClass("elementor-element-editable"), this.model.trigger("editor:close"), this.triggerMethod("editor:destroy");
      },
      onRender: function onRender() {
        var e = this.getOption("editedElementView");
        e && e.$el.addClass("elementor-element-editable");
      },
      onDeviceModeChange: function onDeviceModeChange() {
        o.prototype.onDeviceModeChange.apply(this, arguments), this.scrollToEditedElement();
      },
      onChildviewSettingsChange: function onChildviewSettingsChange(e) {
        var t = this.getOption("editedElementView"),
            n = t.model.get("elType");
        "widget" === n && (n = t.model.get("widgetType")), elementor.channels.editor.trigger("change", e, t).trigger("change:" + n, e, t).trigger("change:" + n + ":" + e.model.get("name"), e, t);
      }
    }), t.exports = i;
  }, {
    "elementor-views/controls-stack": 121
  }],
  81: [function (e, t, n) {
    var i,
        o = e("../models/element");
    i = Backbone.Collection.extend({
      model: o
    }), t.exports = i;
  }, {
    "../models/element": 84
  }],
  82: [function (e, t, n) {
    var i,
        o = e("../models/element");
    i = Backbone.Collection.extend({
      model: o
    }), t.exports = i;
  }, {
    "../models/element": 84
  }],
  83: [function (e, t, n) {
    var i,
        o = e("./collections/categories"),
        r = e("./collections/elements"),
        s = e("./views/categories"),
        l = elementor.modules.templateLibrary.ElementsCollectionView,
        a = e("./views/search"),
        c = e("./views/global");
    i = Marionette.LayoutView.extend({
      template: "#tmpl-elementor-panel-elements",
      regions: {
        elements: "#elementor-panel-elements-wrapper",
        search: "#elementor-panel-elements-search-area"
      },
      ui: {
        tabs: ".elementor-panel-navigation-tab"
      },
      events: {
        "click @ui.tabs": "onTabClick"
      },
      regionViews: {},
      elementsCollection: null,
      categoriesCollection: null,
      initialize: function initialize() {
        this.listenTo(elementor.channels.panelElements, "element:selected", this.destroy), this.initElementsCollection(), this.initCategoriesCollection(), this.initRegionViews();
      },
      initRegionViews: function initRegionViews() {
        var e = {
          elements: {
            region: this.elements,
            view: l,
            options: {
              collection: this.elementsCollection
            }
          },
          categories: {
            region: this.elements,
            view: s,
            options: {
              collection: this.categoriesCollection
            }
          },
          search: {
            region: this.search,
            view: a
          },
          global: {
            region: this.elements,
            view: c
          }
        };
        this.regionViews = elementor.hooks.applyFilters("panel/elements/regionViews", e);
      },
      initElementsCollection: function initElementsCollection() {
        var e = new r(),
            t = elementor.config.elements.section;
        e.add({
          title: elementor.translate("inner_section"),
          elType: "section",
          categories: ["basic"],
          icon: t.icon
        }), _.each(elementor.config.widgets, function (t) {
          e.add({
            title: t.title,
            elType: t.elType,
            categories: t.categories,
            keywords: t.keywords,
            icon: t.icon,
            widgetType: t.widget_type,
            custom: t.custom
          });
        }), this.elementsCollection = e;
      },
      initCategoriesCollection: function initCategoriesCollection() {
        var e = {};
        this.elementsCollection.each(function (t) {
          _.each(t.get("categories"), function (n) {
            e[n] || (e[n] = []), e[n].push(t);
          });
        });
        var t = new o();
        _.each(elementor.config.elements_categories, function (n, i) {
          e[i] && t.add({
            name: i,
            title: n.title,
            icon: n.icon,
            items: e[i]
          });
        }), this.categoriesCollection = t;
      },
      activateTab: function activateTab(e) {
        this.ui.tabs.removeClass("active").filter('[data-view="' + e + '"]').addClass("active"), this.showView(e);
      },
      showView: function showView(e) {
        var t = this.regionViews[e],
            n = t.options || {};
        t.region.show(new t.view(n));
      },
      clearSearchInput: function clearSearchInput() {
        this.getChildView("search").clearInput();
      },
      changeFilter: function changeFilter(e) {
        elementor.channels.panelElements.reply("filter:value", e).trigger("filter:change");
      },
      clearFilters: function clearFilters() {
        this.changeFilter(null), this.clearSearchInput();
      },
      onChildviewChildrenRender: function onChildviewChildrenRender() {
        this.updateElementsScrollbar();
      },
      onChildviewSearchChangeInput: function onChildviewSearchChangeInput(e) {
        this.changeFilter(e.ui.input.val(), "search");
      },
      onDestroy: function onDestroy() {
        elementor.channels.panelElements.reply("filter:value", null);
      },
      onShow: function onShow() {
        this.showView("categories"), this.showView("search");
      },
      onTabClick: function onTabClick(e) {
        this.activateTab(e.currentTarget.dataset.view);
      },
      updateElementsScrollbar: function updateElementsScrollbar() {
        elementor.channels.data.trigger("scrollbar:update");
      }
    }), t.exports = i;
  }, {
    "./collections/categories": 81,
    "./collections/elements": 82,
    "./views/categories": 85,
    "./views/global": 89,
    "./views/search": 90
  }],
  84: [function (e, t, n) {
    var i;
    i = Backbone.Model.extend({
      defaults: {
        title: "",
        categories: [],
        keywords: [],
        icon: "",
        elType: "widget",
        widgetType: ""
      }
    }), t.exports = i;
  }, {}],
  85: [function (e, t, n) {
    var i,
        o = e("./category");
    i = Marionette.CompositeView.extend({
      template: "#tmpl-elementor-panel-categories",
      childView: o,
      childViewContainer: "#elementor-panel-categories",
      id: "elementor-panel-elements-categories",
      initialize: function initialize() {
        this.listenTo(elementor.channels.panelElements, "filter:change", this.onPanelElementsFilterChange);
      },
      onPanelElementsFilterChange: function onPanelElementsFilterChange() {
        elementor.channels.panelElements.request("filter:value") && elementor.getPanelView().getCurrentPageView().showView("elements");
      }
    }), t.exports = i;
  }, {
    "./category": 86
  }],
  86: [function (e, t, n) {
    var i,
        o = e("../collections/elements");
    i = Marionette.CompositeView.extend({
      template: "#tmpl-elementor-panel-elements-category",
      className: "elementor-panel-category",
      childView: e("elementor-panel/pages/elements/views/element"),
      childViewContainer: ".panel-elements-category-items",
      initialize: function initialize() {
        this.collection = new o(this.model.get("items"));
      }
    }), t.exports = i;
  }, {
    "../collections/elements": 82,
    "elementor-panel/pages/elements/views/element": 87
  }],
  87: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-element-library-element",
      className: "elementor-element-wrapper",
      onRender: function onRender() {
        var e = this;
        this.$el.html5Draggable({
          onDragStart: function onDragStart() {
            elementor.channels.panelElements.reply("element:selected", e).trigger("element:drag:start");
          },
          onDragEnd: function onDragEnd() {
            elementor.channels.panelElements.trigger("element:drag:end");
          },
          groups: ["elementor-element"]
        });
      }
    }), t.exports = i;
  }, {}],
  88: [function (e, t, n) {
    var i;
    i = Marionette.CollectionView.extend({
      childView: e("elementor-panel/pages/elements/views/element"),
      id: "elementor-panel-elements",
      initialize: function initialize() {
        this.listenTo(elementor.channels.panelElements, "filter:change", this.onFilterChanged);
      },
      filter: function filter(e) {
        var t = elementor.channels.panelElements.request("filter:value");
        return !t || -1 !== e.get("title").toLowerCase().indexOf(t.toLowerCase()) || _.any(e.get("keywords"), function (e) {
          return -1 !== e.toLowerCase().indexOf(t.toLowerCase());
        });
      },
      onFilterChanged: function onFilterChanged() {
        elementor.channels.panelElements.request("filter:value") || this.onFilterEmpty(), this._renderChildren(), this.triggerMethod("children:render");
      },
      onFilterEmpty: function onFilterEmpty() {
        elementor.getPanelView().getCurrentPageView().showView("categories");
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/elements/views/element": 87
  }],
  89: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-global",
      id: "elementor-panel-global",
      initialize: function initialize() {
        elementor.getPanelView().getCurrentPageView().search.reset();
      },
      onDestroy: function onDestroy() {
        elementor.getPanelView().getCurrentPageView().showView("search");
      }
    });
  }, {}],
  90: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-element-search",
      id: "elementor-panel-elements-search-wrapper",
      ui: {
        input: "input"
      },
      events: {
        "keyup @ui.input": "onInputChanged"
      },
      clearInput: function clearInput() {
        this.ui.input.val("");
      },
      onInputChanged: function onInputChanged(e) {
        27 === e.keyCode && this.clearInput(), this.triggerMethod("search:change:input");
      },
      onRender: function onRender() {
        var e = this.ui.input;
        setTimeout(function () {
          e.focus();
        });
      }
    }), t.exports = i;
  }, {}],
  91: [function (e, t, n) {
    var i,
        o = e("elementor-panel/pages/menu/views/group");
    i = Marionette.CompositeView.extend({
      id: "elementor-panel-page-menu",
      template: "#tmpl-elementor-panel-menu",
      childView: o,
      childViewContainer: "#elementor-panel-page-menu-content",
      initialize: function initialize() {
        this.collection = i.getGroups();
      },
      onDestroy: function onDestroy() {
        var e = "eicon-arrow-" + (elementor.config.is_rtl ? "right" : "left");
        elementor.panel.currentView.getHeaderView().ui.menuIcon.removeClass(e).addClass("eicon-menu-bar");
      }
    }, {
      groups: null,
      initGroups: function initGroups() {
        this.groups = new Backbone.Collection([{
          name: "style",
          title: elementor.translate("global_style"),
          items: [{
            name: "global-colors",
            icon: "fa fa-paint-brush",
            title: elementor.translate("global_colors"),
            type: "page",
            pageName: "colorScheme"
          }, {
            name: "global-fonts",
            icon: "fa fa-font",
            title: elementor.translate("global_fonts"),
            type: "page",
            pageName: "typographyScheme"
          }, {
            name: "color-picker",
            icon: "fa fa-eyedropper",
            title: elementor.translate("color_picker"),
            type: "page",
            pageName: "colorPickerScheme"
          }]
        }, {
          name: "settings",
          title: elementor.translate("settings"),
          items: [{
            name: "elementor-settings",
            icon: "fa fa-external-link",
            title: elementor.translate("elementor_settings"),
            type: "link",
            link: elementor.config.settings_page_link,
            newTab: !0
          }, {
            name: "about-elementor",
            icon: "fa fa-info-circle",
            title: elementor.translate("about_elementor"),
            type: "link",
            link: elementor.config.elementor_site,
            newTab: !0
          }]
        }]);
      },
      getGroups: function getGroups() {
        return this.groups || this.initGroups(), this.groups;
      },
      addItem: function addItem(e, t, n) {
        var i = this.getGroups().findWhere({
          name: t
        });

        if (i) {
          var o,
              r = i.get("items");
          n && (o = _.findWhere(r, {
            name: n
          })), o ? r.splice(r.indexOf(o), 0, e) : r.push(e);
        }
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/menu/views/group": 92
  }],
  92: [function (e, t, n) {
    var i = e("elementor-panel/pages/menu/views/item");
    t.exports = Marionette.CompositeView.extend({
      template: "#tmpl-elementor-panel-menu-group",
      className: "elementor-panel-menu-group",
      childView: i,
      childViewContainer: ".elementor-panel-menu-items",
      initialize: function initialize() {
        this.collection = new Backbone.Collection(this.model.get("items"));
      },
      onChildviewClick: function onChildviewClick(e) {
        switch (e.model.get("type")) {
          case "page":
            var t = e.model.get("pageName"),
                n = e.model.get("title");
            elementor.getPanelView().setPage(t, n);
            break;

          case "link":
            var i = e.model.get("link");
            e.model.get("newTab") ? open(i, "_blank") : location.href = e.model.get("link");
            break;

          default:
            var o = e.model.get("callback");
            _.isFunction(o) && o.call(e);
        }
      }
    });
  }, {
    "elementor-panel/pages/menu/views/item": 93
  }],
  93: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-menu-item",
      className: "elementor-panel-menu-item",
      triggers: {
        click: "click"
      }
    });
  }, {}],
  94: [function (e, t, n) {
    var i,
        o = {
      color: e("elementor-panel/pages/schemes/items/color"),
      typography: e("elementor-panel/pages/schemes/items/typography")
    };
    i = Marionette.CompositeView.extend({
      id: function id() {
        return "elementor-panel-scheme-" + this.getType();
      },
      className: function className() {
        return "elementor-panel-scheme elementor-panel-scheme-" + this.getUIType();
      },
      childViewContainer: ".elementor-panel-scheme-items",
      getTemplate: function getTemplate() {
        return Marionette.TemplateCache.get("#tmpl-elementor-panel-schemes-" + this.getType());
      },
      getChildView: function getChildView() {
        return o[this.getUIType()];
      },
      getUIType: function getUIType() {
        return this.getType();
      },
      ui: function ui() {
        return {
          saveButton: ".elementor-panel-scheme-save .elementor-button",
          discardButton: ".elementor-panel-scheme-discard .elementor-button",
          resetButton: ".elementor-panel-scheme-reset .elementor-button"
        };
      },
      events: function events() {
        return {
          "click @ui.saveButton": "saveScheme",
          "click @ui.discardButton": "discardScheme",
          "click @ui.resetButton": "setDefaultScheme"
        };
      },
      initialize: function initialize() {
        this.model = new Backbone.Model(), this.resetScheme();
      },
      getType: function getType() {},
      getScheme: function getScheme() {
        return elementor.schemes.getScheme(this.getType());
      },
      changeChildrenUIValues: function changeChildrenUIValues(e) {
        var t = this;

        _.each(e, function (e, n) {
          var i = t.collection.findWhere({
            key: n
          });
          t.children.findByModelCid(i.cid).changeUIValue(e);
        });
      },
      discardScheme: function discardScheme() {
        elementor.schemes.resetSchemes(this.getType()), this.onSchemeChange(), this.ui.saveButton.prop("disabled", !0), this._renderChildren();
      },
      setSchemeValue: function setSchemeValue(e, t) {
        elementor.schemes.setSchemeValue(this.getType(), e, t), this.onSchemeChange();
      },
      saveScheme: function saveScheme() {
        elementor.schemes.saveScheme(this.getType()), this.ui.saveButton.prop("disabled", !0), this.resetScheme(), this._renderChildren();
      },
      setDefaultScheme: function setDefaultScheme() {
        var e = elementor.config.default_schemes[this.getType()].items;
        this.changeChildrenUIValues(e);
      },
      resetItems: function resetItems() {
        this.model.set("items", this.getScheme().items);
      },
      resetCollection: function resetCollection() {
        var e = this,
            t = e.model.get("items");
        e.collection = new Backbone.Collection(), _.each(t, function (t, n) {
          t.type = e.getType(), t.key = n, e.collection.add(t);
        });
      },
      resetScheme: function resetScheme() {
        this.resetItems(), this.resetCollection();
      },
      onSchemeChange: function onSchemeChange() {
        elementor.schemes.printSchemesStyle();
      },
      onChildviewValueChange: function onChildviewValueChange(e, t) {
        this.ui.saveButton.removeProp("disabled"), this.setSchemeValue(e.model.get("key"), t);
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/schemes/items/color": 99,
    "elementor-panel/pages/schemes/items/typography": 100
  }],
  95: [function (e, t, n) {
    var i;
    i = e("elementor-panel/pages/schemes/colors").extend({
      getType: function getType() {
        return "color-picker";
      },
      getUIType: function getUIType() {
        return "color";
      },
      onSchemeChange: function onSchemeChange() {},
      getViewComparator: function getViewComparator() {
        return this.orderView;
      },
      orderView: function orderView(e) {
        return elementor.helpers.getColorPickerPaletteIndex(e.get("key"));
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/schemes/colors": 96
  }],
  96: [function (e, t, n) {
    var i,
        o = e("elementor-panel/pages/schemes/base");
    i = o.extend({
      ui: function ui() {
        var e = o.prototype.ui.apply(this, arguments);
        return e.systemSchemes = ".elementor-panel-scheme-color-system-scheme", e;
      },
      events: function events() {
        var e = o.prototype.events.apply(this, arguments);
        return e["click @ui.systemSchemes"] = "onSystemSchemeClick", e;
      },
      getType: function getType() {
        return "color";
      },
      onSystemSchemeClick: function onSystemSchemeClick(e) {
        var t = jQuery(e.currentTarget).data("schemeName"),
            n = elementor.config.system_schemes[this.getType()][t].items;
        this.changeChildrenUIValues(n);
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/schemes/base": 94
  }],
  97: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-schemes-disabled",
      id: "elementor-panel-schemes-disabled",
      className: "elementor-panel-nerd-box",
      disabledTitle: "",
      templateHelpers: function templateHelpers() {
        return {
          disabledTitle: this.disabledTitle
        };
      }
    }), t.exports = i;
  }, {}],
  98: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      getTemplate: function getTemplate() {
        return Marionette.TemplateCache.get("#tmpl-elementor-panel-scheme-" + this.getUIType() + "-item");
      },
      className: function className() {
        return "elementor-panel-scheme-item";
      }
    }), t.exports = i;
  }, {}],
  99: [function (e, t, n) {
    var i;
    i = e("elementor-panel/pages/schemes/items/base").extend({
      getUIType: function getUIType() {
        return "color";
      },
      ui: {
        input: ".elementor-panel-scheme-color-value"
      },
      changeUIValue: function changeUIValue(e) {
        this.ui.input.wpColorPicker("color", e);
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.ui.input.wpColorPicker("instance") && this.ui.input.wpColorPicker("close");
      },
      onRender: function onRender() {
        var e = this;
        elementor.helpers.wpColorPicker(e.ui.input, {
          change: function change(t, n) {
            e.triggerMethod("value:change", n.color.toString());
          }
        });
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/schemes/items/base": 98
  }],
  100: [function (e, t, n) {
    var i,
        o = e("elementor-panel/pages/schemes/items/base");
    i = o.extend({
      getUIType: function getUIType() {
        return "typography";
      },
      className: function className() {
        return o.prototype.className.apply(this, arguments) + " elementor-panel-box";
      },
      ui: {
        heading: ".elementor-panel-heading",
        allFields: ".elementor-panel-scheme-typography-item-field",
        inputFields: "input.elementor-panel-scheme-typography-item-field",
        selectFields: "select.elementor-panel-scheme-typography-item-field",
        selectFamilyFields: 'select.elementor-panel-scheme-typography-item-field[name="font_family"]'
      },
      events: {
        "input @ui.inputFields": "onFieldChange",
        "change @ui.selectFields": "onFieldChange",
        "click @ui.heading": "toggleVisibility"
      },
      onRender: function onRender() {
        var e = this;
        this.ui.inputFields.add(this.ui.selectFields).each(function () {
          var t = jQuery(this),
              n = t.attr("name"),
              i = e.model.get("value")[n];
          t.val(i);
        }), this.ui.selectFamilyFields.select2({
          dir: elementor.config.is_rtl ? "rtl" : "ltr"
        });
      },
      toggleVisibility: function toggleVisibility() {
        this.ui.heading.toggleClass("elementor-open");
      },
      changeUIValue: function changeUIValue(e) {
        this.ui.allFields.each(function () {
          var t = jQuery(this),
              n = t.attr("name"),
              i = e[n];
          t.val(i).trigger("change");
        });
      },
      onFieldChange: function onFieldChange(e) {
        var t = this.$(e.currentTarget),
            n = elementor.schemes.getSchemeValue("typography", this.model.get("key")).value,
            i = t.attr("name");
        n[i] = t.val(), "font_family" !== i || _.isEmpty(n[i]) || elementor.helpers.enqueueFont(n[i]), this.triggerMethod("value:change", n);
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/schemes/items/base": 98
  }],
  101: [function (e, t, n) {
    var i;
    i = e("elementor-panel/pages/schemes/base").extend({
      getType: function getType() {
        return "typography";
      }
    }), t.exports = i;
  }, {
    "elementor-panel/pages/schemes/base": 94
  }],
  102: [function (e, t, n) {
    var i,
        o = e("elementor-layouts/edit-mode");
    i = Marionette.LayoutView.extend({
      template: "#tmpl-elementor-panel",
      id: "elementor-panel-inner",
      regions: {
        content: "#elementor-panel-content-wrapper",
        header: "#elementor-panel-header-wrapper",
        footer: "#elementor-panel-footer",
        modeSwitcher: "#elementor-mode-switcher"
      },
      pages: {},
      childEvents: {
        "click:add": function clickAdd() {
          this.setPage("elements");
        },
        "editor:destroy": function editorDestroy() {
          this.setPage("elements");
        }
      },
      currentPageName: null,
      currentPageView: null,
      _isScrollbarInitialized: !1,
      initialize: function initialize() {
        this.initPages();
      },
      buildPages: function buildPages() {
        var t = {
          elements: {
            view: e("elementor-panel/pages/elements/elements"),
            title: '<img src="' + elementor.config.assets_url + 'images/logo-panel.svg">'
          },
          editor: {
            view: e("elementor-panel/pages/editor")
          },
          menu: {
            view: elementor.modules.panel.Menu,
            title: '<img src="' + elementor.config.assets_url + 'images/logo-panel.svg">'
          },
          colorScheme: {
            view: e("elementor-panel/pages/schemes/colors")
          },
          typographyScheme: {
            view: e("elementor-panel/pages/schemes/typography")
          },
          colorPickerScheme: {
            view: e("elementor-panel/pages/schemes/color-picker")
          }
        },
            n = Object.keys(elementor.schemes.getSchemes()),
            i = _.difference(n, elementor.schemes.getEnabledSchemesTypes());

        return _.each(i, function (n) {
          var i = elementor.schemes.getScheme(n);
          t[n + "Scheme"].view = e("elementor-panel/pages/schemes/disabled").extend({
            disabledTitle: i.disabled_title
          });
        }), t;
      },
      initPages: function initPages() {
        var e;
        this.getPages = function (t) {
          return e || (e = this.buildPages()), t ? e[t] : e;
        }, this.addPage = function (t, n) {
          e || (e = this.buildPages()), e[t] = n;
        };
      },
      getHeaderView: function getHeaderView() {
        return this.getChildView("header");
      },
      getFooterView: function getFooterView() {
        return this.getChildView("footer");
      },
      getCurrentPageName: function getCurrentPageName() {
        return this.currentPageName;
      },
      getCurrentPageView: function getCurrentPageView() {
        return this.currentPageView;
      },
      setPage: function setPage(e, t, n) {
        var i = this.getPages(e);
        if (!i) throw new ReferenceError("Elementor panel doesn't have page named '" + e + "'");
        i.options && (n = _.extend(i.options, n));
        var o = i.view;
        i.getView && (o = i.getView()), this.currentPageView = new o(n), this.showChildView("content", this.currentPageView), this.getHeaderView().setTitle(t || i.title), this.currentPageName = e, this.trigger("set:page", this.currentPageView).trigger("set:page:" + e, this.currentPageView);
      },
      openEditor: function openEditor(e, t) {
        if ("editor" === this.getCurrentPageName() && this.getCurrentPageView().model === e) return;
        var n = elementor.getElementData(e);
        this.setPage("editor", elementor.translate("edit_element", [n.title]), {
          model: e,
          editedElementView: t
        });
        var i = "panel/open_editor/" + e.get("elType");
        elementor.hooks.doAction(i, this, e, t), elementor.hooks.doAction(i + "/" + e.get("widgetType"), this, e, t);
      },
      onBeforeShow: function onBeforeShow() {
        var t = e("elementor-layouts/panel/footer"),
            n = e("elementor-layouts/panel/header");
        this.showChildView("modeSwitcher", new o()), this.showChildView("header", new n()), this.showChildView("footer", new t()), this.updateScrollbar = _.throttle(this.updateScrollbar, 100), this.getRegion("content").on("before:show", this.onEditorBeforeShow.bind(this)).on("empty", this.onEditorEmpty.bind(this)).on("show", this.updateScrollbar.bind(this)), this.setPage("elements"), this.listenTo(elementor.channels.data, "scrollbar:update", this.updateScrollbar);
      },
      onEditorBeforeShow: function onEditorBeforeShow() {
        _.defer(this.updateScrollbar.bind(this));
      },
      onEditorEmpty: function onEditorEmpty() {
        this.updateScrollbar();
      },
      updateScrollbar: function updateScrollbar() {
        var e = this.content.$el;
        if (!this._isScrollbarInitialized) return e.perfectScrollbar(), void (this._isScrollbarInitialized = !0);
        e.perfectScrollbar("update");
      }
    }), t.exports = i;
  }, {
    "elementor-layouts/edit-mode": 77,
    "elementor-layouts/panel/footer": 78,
    "elementor-layouts/panel/header": 79,
    "elementor-panel/pages/editor": 80,
    "elementor-panel/pages/elements/elements": 83,
    "elementor-panel/pages/schemes/color-picker": 95,
    "elementor-panel/pages/schemes/colors": 96,
    "elementor-panel/pages/schemes/disabled": 97,
    "elementor-panel/pages/schemes/typography": 101
  }],
  103: [function (e, t, n) {
    var i;
    i = {
      config: {},
      initConfig: function initConfig() {
        this.config = {
          ajaxParams: {
            type: "POST",
            url: elementor.config.ajaxurl,
            data: {}
          },
          actionPrefix: "elementor_"
        };
      },
      init: function init() {
        this.initConfig();
      },
      send: function send(e, t) {
        var n = this,
            i = elementor.helpers.cloneObject(this.config.ajaxParams);
        t = t || {}, e = this.config.actionPrefix + e, jQuery.extend(i, t), i.data instanceof FormData ? (i.data.append("action", e), i.data.append("_nonce", elementor.config.nonce)) : (i.data.action = e, i.data._nonce = elementor.config.nonce);
        var o = i.success,
            r = i.error;
        return (o || r) && (i.success = function (e) {
          e.success && o && o(e.data), !e.success && r && r(e.data);
        }, i.error = r ? function (e) {
          r(e);
        } : function (e) {
          if (0 !== e.readyState || "abort" !== e.statusText) {
            var t = n.createErrorMessage(e);
            elementor.notifications.showToast({
              message: t
            });
          }
        }), jQuery.ajax(i);
      },
      createErrorMessage: function createErrorMessage(e) {
        var t;
        return 4 === e.readyState ? (t = elementor.translate("server_error"), 200 !== e.status && (t += " (" + e.status + " " + e.statusText + ")")) : t = 0 === e.readyState ? elementor.translate("server_connection_lost") : elementor.translate("unknown_error"), t + ".";
      }
    }, t.exports = i;
  }, {}],
  104: [function (e, t, n) {
    var i;
    i = function i() {
      var e = this;
      this.compare = function (e, t, n) {
        switch (n) {
          case "==":
            return e == t;

          case "!=":
            return e != t;

          case "!==":
            return e !== t;

          case "in":
            return -1 !== t.indexOf(e);

          case "!in":
            return -1 === t.indexOf(e);

          case "<":
            return e < t;

          case "<=":
            return e <= t;

          case ">":
            return e > t;

          case ">=":
            return e >= t;

          default:
            return e === t;
        }
      }, this.check = function (t, n) {
        var i = "or" === t.relation,
            o = !i;
        return jQuery.each(t.terms, function () {
          var t,
              r = this;
          if (r.terms) t = e.check(r, n);else {
            var s = r.name.match(/(\w+)(?:\[(\w+)])?/),
                l = n[s[1]];
            s[2] && (l = l[s[2]]), t = e.compare(l, r.value, r.operator);
          }
          return i ? (t && (o = !0), !t) : t ? void 0 : o = !1;
        }), o;
      };
    }, t.exports = new i();
  }, {}],
  105: [function (e, t, n) {
    var i,
        o = e("elementor-utils/view-module"),
        r = e("elementor-editor-utils/stylesheet");
    (i = o.extend({
      stylesheet: null,
      getDefaultSettings: function getDefaultSettings() {
        return {
          id: 0
        };
      },
      getDefaultElements: function getDefaultElements() {
        return {
          $stylesheetElement: jQuery("<style>", {
            id: "elementor-style-" + this.getSettings("id")
          })
        };
      },
      initStylesheet: function initStylesheet() {
        var e = elementor.config.viewportBreakpoints;
        this.stylesheet = new r(), this.stylesheet.addDevice("mobile", 0).addDevice("tablet", e.md).addDevice("desktop", e.lg);
      },
      addStyleRules: function addStyleRules(e, t, n, i, o) {
        var r = this;

        _.each(e, function (e) {
          e.styleFields && e.styleFields.length && t[e.name].each(function (t) {
            r.addStyleRules(e.styleFields, t.attributes, n, i.concat(["{{CURRENT_ITEM}}"]), o.concat([".elementor-repeater-item-" + t.get("_id")]));
          }), r.addControlStyleRules(e, t, n, i, o);
        });
      },
      addControlStyleRules: function addControlStyleRules(e, t, n, o, r) {
        var s = this;
        i.addControlStyleRules(s.stylesheet, e, n, function (e) {
          return s.getStyleControlValue(e, t);
        }, o, r);
      },
      getStyleControlValue: function getStyleControlValue(e, t) {
        var n = t[e.name];
        if (e.selectors_dictionary && (n = e.selectors_dictionary[n] || n), _.isNumber(n) || !_.isEmpty(n)) return n;
      },
      addStyleToDocument: function addStyleToDocument() {
        elementor.$previewContents.find("head").append(this.elements.$stylesheetElement), this.elements.$stylesheetElement.text(this.stylesheet);
      },
      removeStyleFromDocument: function removeStyleFromDocument() {
        this.elements.$stylesheetElement.remove();
      },
      onInit: function onInit() {
        o.prototype.onInit.apply(this, arguments), this.initStylesheet();
      }
    })).addControlStyleRules = function (e, t, n, i, o, r) {
      var s = i(t);
      void 0 !== s && _.each(t.selectors, function (l, a) {
        var c;

        try {
          c = l.replace(/{{(?:([^.}]+)\.)?([^}]*)}}/g, function (e, o, r) {
            var l = t,
                a = s;

            if (o) {
              if (!(l = _.findWhere(n, {
                name: o
              }))) return "";
              a = i(l);
            }

            var c = elementor.getControlView(l.type).getStyleValue(r.toLowerCase(), a);
            if ("" === c) throw "";
            return c;
          });
        } catch (e) {
          return;
        }

        if (!_.isEmpty(c)) {
          var d = /^(?:\([^)]+\)){1,2}/,
              m = a.match(d),
              u = {};

          if (m) {
            m = m[0], a = a.replace(d, "");

            for (var h, p = /\(([^)]+)\)/g, g = []; h = p.exec(m);) {
              g.push(h[1]);
            }

            _.each(g, function (e) {
              if ("desktop" !== e) {
                var t = e.replace(/\+$/, "");
                u[t === e ? "max" : "min"] = t;
              }
            });
          }

          _.each(o, function (e, t) {
            var n = e.source ? e.source : e,
                i = new RegExp(n, "g");
            a = a.replace(i, r[t]);
          }), !Object.keys(u).length && t.responsive && "desktop" === (u = _.pick(elementor.helpers.cloneObject(t.responsive), ["min", "max"])).max && delete u.max, e.addRules(a, c, u);
        }
      });
    }, t.exports = i;
  }, {
    "elementor-editor-utils/stylesheet": 115,
    "elementor-utils/view-module": 126
  }],
  106: [function (e, t, n) {
    t.exports = new function () {
      var e = this,
          t = [],
          n = {},
          i = {},
          o = function o(t) {
        var i = t.originalEvent,
            o = i.error;

        if (o) {
          var r = !1,
              s = n.urlsToWatch;
          jQuery.each(s, function () {
            if (-1 !== o.stack.indexOf(this)) return r = !0, !1;
          }), r && e.addError({
            type: o.name,
            message: o.message,
            url: i.filename,
            line: i.lineno,
            column: i.colno
          });
        }
      };

      this.addURLToWatch = function (e) {
        n.urlsToWatch.push(e);
      }, this.addCustomError = function (e, t, n) {
        var i = {
          type: e.name,
          message: e.message,
          url: e.fileName || e.sourceURL,
          line: e.lineNumber || e.line,
          column: e.columnNumber || e.column,
          customFields: {
            category: t || "general",
            tag: n
          }
        };

        if (!i.url) {
          var o = e.stack.match(/\n {4}at (.*?(?=:(\d+):(\d+)))/);
          o && (i.url = o[1], i.line = o[2], i.column = o[3]);
        }

        this.addError(i);
      }, this.addError = function (n) {
        var i = {
          type: "Error",
          timestamp: Math.floor(new Date().getTime() / 1e3),
          message: null,
          url: null,
          line: null,
          column: null,
          customFields: {}
        };
        t.push(jQuery.extend(!0, i, n)), e.sendErrors();
      }, this.sendErrors = function () {
        i.$window.off("error", o), jQuery.ajax({
          url: ElementorConfig.ajaxurl,
          method: "POST",
          data: {
            action: "elementor_debug_log",
            data: t
          },
          success: function success() {
            t = [], i.$window.on("error", o);
          }
        });
      }, n = {
        debounceDelay: 500,
        urlsToWatch: ["elementor/assets"]
      }, i.$window = jQuery(window), i.$window.on("error", o), e.sendErrors = _.debounce(e.sendErrors, n.debounceDelay);
    }();
  }, {}],
  107: [function (e, t, n) {
    var i;
    i = {
      init: function init() {
        var e;
        this.getModal = function () {
          return e || (e = this.initModal()), e;
        }, jQuery(document).on({
          "heartbeat-send": function heartbeatSend(e, t) {
            t.elementor_post_lock = {
              post_ID: elementor.config.post_id
            };
          },
          "heartbeat-tick": function heartbeatTick(e, t) {
            t.locked_user ? (elementor.saver.isEditorChanged() && elementor.saver.saveEditor({
              status: "autosave"
            }), i.showLockMessage(t.locked_user)) : i.getModal().hide(), elementor.config.nonce = t.elementorNonce;
          },
          "heartbeat-tick.wp-refresh-nonces": function heartbeatTickWpRefreshNonces(e, t) {
            var n = t["elementor-refresh-nonces"];
            n && (n.heartbeatNonce && (elementor.config.nonce = n.elementorNonce), n.heartbeatNonce && (window.heartbeatSettings.nonce = n.heartbeatNonce));
          }
        }), elementor.config.locked_user && i.showLockMessage(elementor.config.locked_user);
      },
      initModal: function initModal() {
        var e = elementor.dialogsManager.createWidget("lightbox", {
          headerMessage: elementor.translate("take_over")
        });
        return e.addButton({
          name: "go_back",
          text: elementor.translate("go_back"),
          callback: function callback() {
            parent.history.go(-1);
          }
        }), e.addButton({
          name: "take_over",
          text: elementor.translate("take_over"),
          callback: function callback() {
            wp.heartbeat.enqueue("elementor_force_post_lock", !0), wp.heartbeat.connectNow();
          }
        }), e;
      },
      showLockMessage: function showLockMessage(e) {
        i.getModal().setMessage(elementor.translate("dialog_user_taken_over", [e])).show();
      }
    }, t.exports = i;
  }, {}],
  108: [function (e, t, n) {
    var i;
    i = {
      _enqueuedFonts: [],
      elementsHierarchy: {
        section: {
          column: {
            widget: null,
            section: null
          }
        }
      },
      enqueueFont: function enqueueFont(e) {
        if (-1 === this._enqueuedFonts.indexOf(e)) {
          var t,
              n = elementor.config.controls.font.options[e],
              i = {
            ru_RU: "cyrillic",
            uk: "cyrillic",
            bg_BG: "cyrillic",
            vi: "vietnamese",
            el: "greek",
            he_IL: "hebrew"
          };

          switch (n) {
            case "googlefonts":
              t = "https://fonts.googleapis.com/css?family=" + e + ":100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic", i[elementor.config.locale] && (t += "&subset=" + i[elementor.config.locale]);
              break;

            case "earlyaccess":
              t = "https://fonts.googleapis.com/earlyaccess/" + e.replace(/\s+/g, "").toLowerCase() + ".css";
          }

          _.isEmpty(t) || elementor.$previewContents.find("link:last").after('<link href="' + t + '" rel="stylesheet" type="text/css">'), this._enqueuedFonts.push(e), elementor.channels.editor.trigger("font:insertion", n, e);
        }
      },
      getElementChildType: function getElementChildType(e, t) {
        if (t || (t = this.elementsHierarchy), void 0 !== t[e]) return jQuery.isPlainObject(t[e]) ? Object.keys(t[e]) : null;

        for (var n in t) {
          if (t.hasOwnProperty(n) && jQuery.isPlainObject(t[n])) {
            var i = this.getElementChildType(e, t[n]);
            if (i) return i;
          }
        }

        return null;
      },
      getUniqueID: function getUniqueID() {
        return Math.random().toString(16).substr(2, 7);
      },
      stringReplaceAll: function stringReplaceAll(e, t) {
        var n = new RegExp(Object.keys(t).join("|"), "gi");
        return e.replace(n, function (e) {
          return t[e];
        });
      },
      isActiveControl: function isActiveControl(e, t) {
        var n, i;
        if (_.isFunction(e.get) ? (n = e.get("condition"), i = e.get("conditions")) : (n = e.condition, i = e.conditions), i) return elementor.conditions.check(i, t);
        if (_.isEmpty(n)) return !0;

        var o = _.filter(n, function (e, n) {
          var i,
              o = n.match(/([a-z_0-9]+)(?:\[([a-z_]+)])?(!?)$/i),
              r = o[1],
              s = o[2],
              l = !!o[3],
              a = t[r];
          return void 0 === a || (s && (a = a[s]), i = _.isArray(e) && !_.isEmpty(e) ? _.contains(e, a) : _.isArray(a) && !_.isEmpty(a) ? _.contains(a, e) : _.isEqual(e, a), l ? i : !i);
        });

        return _.isEmpty(o);
      },
      cloneObject: function cloneObject(e) {
        return JSON.parse(JSON.stringify(e));
      },
      disableElementEvents: function disableElementEvents(e) {
        e.each(function () {
          var e = this.style.pointerEvents;
          "none" !== e && jQuery(this).data("backup-pointer-events", e).css("pointer-events", "none");
        });
      },
      enableElementEvents: function enableElementEvents(e) {
        e.each(function () {
          var e = jQuery(this),
              t = e.data("backup-pointer-events");
          void 0 !== t && e.removeData("backup-pointer-events").css("pointer-events", t);
        });
      },
      getColorPickerPaletteIndex: function getColorPickerPaletteIndex(e) {
        return ["7", "8", "1", "5", "2", "3", "6", "4"].indexOf(e);
      },
      wpColorPicker: function wpColorPicker(e, t) {
        var n = this,
            i = elementor.schemes.getScheme("color-picker"),
            o = _.sortBy(i.items, function (e) {
          return n.getColorPickerPaletteIndex(e.key);
        }),
            r = {
          width: window.innerWidth >= 1440 ? 271 : 251,
          palettes: _.pluck(o, "value")
        };

        return t && _.extend(r, t), e.wpColorPicker(r);
      },
      isInViewport: function isInViewport(e, t) {
        var n = e.getBoundingClientRect();
        return t = t || document.documentElement, n.top >= 0 && n.left >= 0 && n.bottom <= (window.innerHeight || t.clientHeight) && n.right <= (window.innerWidth || t.clientWidth);
      },
      scrollToView: function scrollToView(e) {
        setTimeout(function () {
          elementor.$previewContents.find("html, body").animate({
            scrollTop: e.$el.offset().top - elementor.$preview[0].contentWindow.innerHeight / 2
          });
        }, 500);
      }
    }, t.exports = i;
  }, {}],
  109: [function (e, t, n) {
    var i;
    i = function i() {
      var e = this,
          t = {},
          n = [],
          i = function i(e) {
        var t,
            n = e.size;

        if ("custom" === n) {
          var i = e.dimension;
          if (!i.width && !i.height) return "full";
          t = "custom_" + i.width + "x" + i.height;
        } else t = n;

        return t;
      };

      e.onceTriggerChange = _.once(function (e) {
        window.setTimeout(function () {
          e.get("settings").trigger("change", e.get("settings"));
        }, 700);
      }), e.getImageUrl = function (t) {
        e.registerItem(t);
        var n = e.getItem(t);

        if (!n) {
          if ("custom" === t.size) return void (elementor.getPanelView() && "editor" === elementor.getPanelView().currentPageName && t.model && e.onceTriggerChange(t.model));
          n = t.url;
        }

        return n;
      }, e.getItem = function (e) {
        var n = i(e),
            o = e.id;
        return !!n && !(!t[o] || !t[o][n]) && t[o][n];
      }, e.registerItem = function (t) {
        "" !== t.id && (e.getItem(t) || (n.push(t), e.debounceGetRemoteItems()));
      }, e.getRemoteItems = function () {
        var e,
            o,
            r = [],
            s = Object.keys(n).length;

        if (0 !== s) {
          if (1 === s) {
            for (o in n) {
              e = n[o];
              break;
            }

            if (e && e.model) return void e.model.renderRemoteServer();
          }

          for (o in n) {
            e = n[o];
            var l = i(e),
                a = e.id,
                c = !t[a] || 0 === Object.keys(t[a]).length;
            r.push({
              id: a,
              size: l,
              is_first_time: c
            });
          }

          window.elementor.ajax.send("get_images_details", {
            data: {
              items: r
            },
            success: function success(e) {
              var i, o;

              for (i in e) {
                for (o in t[i] || (t[i] = {}), e[i]) {
                  t[i][o] = e[i][o];
                }
              }

              n = [];
            }
          });
        }
      }, e.debounceGetRemoteItems = _.debounce(e.getRemoteItems, 300);
    }, t.exports = new i();
  }, {}],
  110: [function (e, t, n) {
    var i, o, r;
    i = jQuery, o = function o(e) {
      try {
        return e.originalEvent.dataTransfer.setData("test", "test"), e.originalEvent.dataTransfer.clearData("test"), !0;
      } catch (e) {
        return !1;
      }
    }, r = {
      html5Draggable: function html5Draggable(e) {
        var t = this,
            n = {},
            r = {},
            s = {
          element: "",
          groups: null,
          onDragStart: null,
          onDragEnd: null
        },
            l = function l(e) {
          i.isFunction(n.onDragEnd) && n.onDragEnd.call(r.$element, e, t);
        },
            a = function a(e) {
          var s = {
            groups: n.groups || []
          };
          o(e) && e.originalEvent.dataTransfer.setData(JSON.stringify(s), !0), i.isFunction(n.onDragStart) && n.onDragStart.call(r.$element, e, t);
        };

        this.destroy = function () {
          r.$element.off("dragstart", a), r.$element.removeAttr("draggable");
        }, i.extend(!0, n, s, e), r.$element = i(n.element), r.$element.attr("draggable", !0), r.$element.on("dragstart", a).on("dragend", l);
      },
      html5Droppable: function html5Droppable(e) {
        var t,
            n,
            r = this,
            s = {},
            l = {},
            a = {
          element: "",
          items: ">",
          horizontalSensitivity: "10%",
          axis: ["vertical", "horizontal"],
          placeholder: !0,
          currentElementClass: "html5dnd-current-element",
          placeholderClass: "html5dnd-placeholder",
          hasDraggingOnChildClass: "html5dnd-has-dragging-on-child",
          groups: null,
          isDroppingAllowed: null,
          onDragEnter: null,
          onDragging: null,
          onDropping: null,
          onDragLeave: null
        },
            c = function c() {
          return -1 !== s.axis.indexOf("vertical");
        },
            d = function d(e, t) {
          var n;
          return -1 !== s.axis.indexOf("horizontal") && (c() ? !!(n = s.horizontalSensitivity.match(/\d+/)) && (n = n[0], /%$/.test(s.horizontalSensitivity) && (n = t / n), e > t - n ? "right" : e < n && "left") : e > t / 2 ? "right" : "left");
        },
            m = function m(e) {
          var o = i(t),
              r = o.outerHeight() - l.$placeholder.outerHeight(),
              s = o.outerWidth();
          if (e = e.originalEvent, !(n = d(e.offsetX, s))) if (c()) {
            var a = t.getBoundingClientRect();
            n = e.clientY > a.top + r / 2 ? "bottom" : "top";
          } else n = null;
        },
            u = function u() {
          if (s.placeholder) {
            var e = "top" === n ? "prependTo" : "appendTo";
            l.$placeholder[e](t);
          }
        },
            h = function h(e) {
          var l, a, c;
          return !(s.groups && o(e) && (l = e.originalEvent.dataTransfer.types, c = !1, (l = Array.prototype.slice.apply(l)).forEach(function (e) {
            try {
              if (!(a = JSON.parse(e)).groups.slice) return;
              s.groups.forEach(function (e) {
                if (-1 !== a.groups.indexOf(e)) return c = !0, !1;
              });
            } catch (e) {}
          }), !c) || i.isFunction(s.isDroppingAllowed) && !s.isDroppingAllowed.call(t, n, e, r));
        },
            p = function p(e) {
          e.stopPropagation(), t || (t = this, l.$element.parents().each(function () {
            var e = i(this).data("html5Droppable");
            e && e.doDragLeave();
          }), m(e), h(e) && (u(), l.$element.addClass(s.hasDraggingOnChildClass), i(t).addClass(s.currentElementClass), i.isFunction(s.onDragEnter) && s.onDragEnter.call(t, n, e, r)));
        },
            g = function g(e) {
          e.stopPropagation(), t || p.call(this, e);
          var o = n;
          m(e), h(e) && (e.preventDefault(), o !== n && u(), i.isFunction(s.onDragging) && s.onDragging.call(this, n, e, r));
        },
            f = function f(e) {
          var n = this.getBoundingClientRect();
          ("dragleave" !== e.type || e.clientX < n.left || e.clientX >= n.right || e.clientY < n.top || e.clientY >= n.bottom) && (i(t).removeClass(s.currentElementClass), r.doDragLeave());
        },
            v = function v(e) {
          m(e), h(e) && (e.preventDefault(), i.isFunction(s.onDropping) && s.onDropping.call(this, n, e, r));
        };

        this.doDragLeave = function () {
          s.placeholder && l.$placeholder.remove(), l.$element.removeClass(s.hasDraggingOnChildClass), i.isFunction(s.onDragLeave) && s.onDragLeave.call(t, event, r), t = n = null;
        }, this.destroy = function () {
          l.$element.off("dragenter", s.items, p).off("dragover", s.items, g).off("drop", s.items, v).off("dragleave drop", s.items, f);
        }, i.extend(s, a, e), l.$element = i(s.element), l.$placeholder = i("<div>", {
          "class": s.placeholderClass
        }), l.$element.on("dragenter", s.items, p).on("dragover", s.items, g).on("drop", s.items, v).on("dragleave drop", s.items, f);
      }
    }, i.each(r, function (e, t) {
      i.fn[e] = function (n) {
        return n = n || {}, this.each(function () {
          var o = i.data(this, e);
          o instanceof t ? "destroy" === n && (o.destroy(), i.removeData(this, e)) : (n.element = this, i.data(this, e, new t(n)));
        }), this;
      };
    });
  }, {}],
  111: [function (e, t, n) {
    var i;

    (i = jQuery).fn.elementorSerializeObject = function () {
      var e = this.serializeArray(),
          t = {},
          n = function n(e, t, i) {
        var o = /^[^\[\]]+\[]/.test(t),
            r = /^[^\[\]]+\[[^\[\]]+]/.test(t),
            s = t.replace(/\[.*/, "");
        if (o) e[s] || (e[s] = []);else {
          if (!r) return void (e.push ? e.push(i) : e[s] = i);
          e[s] || (e[s] = {});
        }
        var l = t.match(/\[[^\[\]]*]/g);
        return l[0] = l[0].replace(/\[|]/g, ""), n(e[s], l.join(""), i);
      };

      return i.each(e, function () {
        n(t, this.name, this.value);
      }), t;
    };
  }, {}],
  112: [function (e, t, n) {
    var i = e("elementor-utils/module");
    t.exports = i.extend({
      initToast: function initToast() {
        var e = elementor.dialogsManager.createWidget("buttons", {
          id: "elementor-toast",
          position: {
            my: "center bottom",
            at: "center bottom-10",
            of: "#elementor-panel-content-wrapper",
            autoRefresh: !0
          },
          hide: {
            onClick: !0,
            auto: !0,
            autoDelay: 1e4
          },
          effects: {
            show: function show() {
              var t = e.getElements("widget");
              t.show(), e.refreshPosition();
              var n = parseInt(t.css("top"), 10);
              t.hide().css("top", n + 100), t.animate({
                opacity: "show",
                height: "show",
                paddingBottom: "show",
                paddingTop: "show",
                top: n
              }, {
                easing: "linear",
                duration: 300
              });
            },
            hide: function hide() {
              var t = e.getElements("widget"),
                  n = parseInt(t.css("top"), 10);
              t.animate({
                opacity: "hide",
                height: "hide",
                paddingBottom: "hide",
                paddingTop: "hide",
                top: n + 100
              }, {
                easing: "linear",
                duration: 300
              });
            }
          },
          buttonTag: "div"
        });

        this.getToast = function () {
          return e;
        };
      },
      showToast: function showToast(e) {
        var t = this.getToast();
        t.setMessage(e.message), t.getElements("buttonsWrapper").empty(), e.buttons && e.buttons.forEach(function (e) {
          t.addButton(e);
        }), t.show();
      },
      onInit: function onInit() {
        this.initToast();
      }
    });
  }, {
    "elementor-utils/module": 125
  }],
  113: [function (e, t, n) {
    var i;
    i = {
      getPresetsDictionary: function getPresetsDictionary() {
        return {
          11: 100 / 9,
          12: 12.5,
          14: 100 / 7,
          16: 100 / 6,
          33: 100 / 3,
          66: 2 / 3 * 100,
          83: 5 / 6 * 100
        };
      },
      getAbsolutePresetValues: function getAbsolutePresetValues(e) {
        var t = elementor.helpers.cloneObject(e),
            n = this.getPresetsDictionary();
        return _.each(t, function (e, i) {
          n[e] && (t[i] = n[e]);
        }), t;
      },
      getPresets: function getPresets(e, t) {
        var n = elementor.helpers.cloneObject(elementor.config.elements.section.presets);
        return e && (n = n[e]), t && (n = n[t]), n;
      },
      getPresetByStructure: function getPresetByStructure(e) {
        var t = this.getParsedStructure(e);
        return this.getPresets(t.columnsCount, t.presetIndex);
      },
      getParsedStructure: function getParsedStructure(e) {
        return {
          columnsCount: (e += "").slice(0, -1),
          presetIndex: e.substr(-1)
        };
      },
      getPresetSVG: function getPresetSVG(e, t, n, i) {
        t = t || 100, n = n || 50, i = i || 2;

        var o = this.getAbsolutePresetValues(e),
            r = this._generatePresetSVGPath(o, t, n, i);

        return this._createSVGPreset(r, t, n);
      },
      _createSVGPreset: function _createSVGPreset(e, t, n) {
        var i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        i.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), i.setAttribute("viewBox", "0 0 " + t + " " + n);
        var o = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return o.setAttribute("d", e), i.appendChild(o), i;
      },
      _generatePresetSVGPath: function _generatePresetSVGPath(e, t, n, i) {
        for (var o = t - i * (e.length - 1), r = 0, s = "", l = 0; l < e.length; l++) {
          l && (s += " ");
          var a = e[l] / 100 * o;
          s += "M" + +(r += a).toFixed(4) + ",0", s += "V" + n, s += "H" + +(r - a).toFixed(4), s += "V0Z", r += i;
        }

        return s;
      }
    }, t.exports = i;
  }, {}],
  114: [function (e, t, n) {
    var i,
        o = e("elementor-editor-utils/stylesheet"),
        r = e("elementor-editor-utils/controls-css-parser");
    i = function i() {
      var e = this,
          t = new o(),
          n = {},
          i = ".elementor-widget-",
          s = {},
          l = function l(n) {
        var o = e.getWidgetSchemeControls(n);

        _.each(o, function (s) {
          var l, a, c;
          l = s, a = o, c = n.widget_type, r.addControlStyleRules(t, l, a, function (t) {
            return e.getSchemeValue(t.scheme.type, t.scheme.value, t.scheme.key).value;
          }, ["{{WRAPPER}}"], [i + c]);
        });
      };

      this.init = function () {
        return s.$style = jQuery("<style>", {
          id: "elementor-style-scheme"
        }), s.$previewHead = elementor.$previewContents.find("head"), s.$previewHead.append(s.$style), n = elementor.helpers.cloneObject(elementor.config.schemes.items), e;
      }, this.getWidgetSchemeControls = function (e) {
        return _.filter(e.controls, function (e) {
          return _.isObject(e.scheme);
        });
      }, this.getSchemes = function () {
        return n;
      }, this.getEnabledSchemesTypes = function () {
        return elementor.config.schemes.enabled_schemes;
      }, this.getScheme = function (e) {
        return n[e];
      }, this.getSchemeValue = function (t, n, i) {
        if (this.getEnabledSchemesTypes().indexOf(t) < 0) return !1;
        var o = e.getScheme(t).items[n];

        if (i && _.isObject(o)) {
          var r = elementor.helpers.cloneObject(o);
          return r.value = o.value[i], r;
        }

        return o;
      }, this.printSchemesStyle = function () {
        t.empty(), _.each(elementor.config.widgets, function (e) {
          l(e);
        }), s.$style.text(t);
      }, this.resetSchemes = function (e) {
        n[e] = elementor.helpers.cloneObject(elementor.config.schemes.items[e]);
      }, this.saveScheme = function (e) {
        elementor.config.schemes.items[e].items = elementor.helpers.cloneObject(n[e].items);
        var t = {};
        _.each(n[e].items, function (e, n) {
          t[n] = e.value;
        }), NProgress.start(), elementor.ajax.send("apply_scheme", {
          data: {
            scheme_name: e,
            data: JSON.stringify(t)
          },
          success: function success() {
            NProgress.done();
          }
        });
      }, this.setSchemeValue = function (e, t, i) {
        n[e].items[t].value = i;
      };
    }, t.exports = new i();
  }, {
    "elementor-editor-utils/controls-css-parser": 105,
    "elementor-editor-utils/stylesheet": 115
  }],
  115: [function (e, t, n) {
    var i, _o;

    i = jQuery, (_o = function o() {
      var e = this,
          t = {},
          n = {},
          r = {},
          s = function s(e) {
        var t = {};
        return (e = e.split("-").filter(String)).forEach(function (e) {
          var n = e.split("_"),
              i = n[0],
              o = n[1];
          t[i] = "max" === i ? function (e) {
            var t = Object.keys(r),
                n = t.indexOf(e) + 1;
            if (n >= t.length) throw new RangeError("Max value for this device is out of range.");
            return r[t[n]] - 1;
          }(o) : r[o];
        }), t;
      };

      this.addDevice = function (t, n) {
        r[t] = n;
        var i = Object.keys(r);
        if (i.length < 2) return e;
        i.sort(function (e, t) {
          return r[e] - r[t];
        });
        var o = {};
        return i.forEach(function (e) {
          o[e] = r[e];
        }), r = o, e;
      }, this.addRawCSS = function (e, t) {
        n[e] = t;
      }, this.addRules = function (n, o, r) {
        var l,
            a,
            c = "all";

        if (_.isEmpty(r) || (l = r, a = [], i.each(l, function (e) {
          a.push(e + "_" + this);
        }), c = a.join("-")), t[c] || function (e) {
          t[e] = {};
          var n = Object.keys(t);

          if (!(n.length < 2)) {
            n.sort(function (e, t) {
              if ("all" === e) return -1;
              if ("all" === t) return 1;
              var n = s(e);
              return s(t).max - n.max;
            });
            var i = {};
            n.forEach(function (e) {
              i[e] = t[e];
            }), t = i;
          }
        }(c), o) {
          if (t[c][n] || (t[c][n] = {}), "string" == typeof o) {
            o = o.split(";").filter(String);
            var d = {};

            try {
              i.each(o, function () {
                var e = this.split(/:(.*)?/);
                d[e[0].trim()] = e[1].trim().replace(";", "");
              });
            } catch (e) {
              return;
            }

            o = d;
          }

          return i.extend(t[c][n], o), e;
        }

        var m = n.match(/[^{]+\{[^}]+}/g);
        i.each(m, function () {
          var t = this.match(/([^{]+)\{([^}]+)}/);
          t && e.addRules(t[1].trim(), t[2].trim(), r);
        });
      }, this.getRules = function () {
        return t;
      }, this.empty = function () {
        t = {}, n = {};
      }, this.toString = function () {
        var e = "";
        return i.each(t, function (t) {
          var n,
              r,
              l = _o.parseRules(this);

          "all" !== t && (n = s(t), r = [], i.each(n, function (e) {
            r.push("(" + e + "-width:" + this + "px)");
          }), l = "@media" + r.join(" and ") + "{" + l + "}"), e += l;
        }), i.each(n, function () {
          e += this;
        }), e;
      };
    }).parseRules = function (e) {
      var t = "";
      return i.each(e, function (e) {
        var n = _o.parseProperties(this);

        n && (t += e + "{" + n + "}");
      }), t;
    }, _o.parseProperties = function (e) {
      var t = "";
      return i.each(e, function (e) {
        this && (t += e + ":" + this + ";");
      }), t;
    }, t.exports = _o;
  }, {}],
  116: [function (e, t, n) {
    var i;
    i = Marionette.ItemView.extend({
      template: Marionette.TemplateCache.get("#tmpl-elementor-add-section"),
      attributes: {
        "data-view": "choose-action"
      },
      ui: {
        addNewSection: ".elementor-add-new-section",
        closeButton: ".elementor-add-section-close",
        addSectionButton: ".elementor-add-section-button",
        addTemplateButton: ".elementor-add-template-button",
        selectPreset: ".elementor-select-preset",
        presets: ".elementor-preset"
      },
      events: {
        "click @ui.addSectionButton": "onAddSectionButtonClick",
        "click @ui.addTemplateButton": "onAddTemplateButtonClick",
        "click @ui.closeButton": "onCloseButtonClick",
        "click @ui.presets": "onPresetSelected"
      },
      className: function className() {
        return "elementor-add-section elementor-visible-desktop";
      },
      addSection: function addSection(e, t) {
        return elementor.sections.currentView.addSection(e, t);
      },
      setView: function setView(e) {
        this.$el.attr("data-view", e);
      },
      showSelectPresets: function showSelectPresets() {
        this.setView("select-preset");
      },
      closeSelectPresets: function closeSelectPresets() {
        this.setView("choose-action");
      },
      getTemplatesModalOptions: function getTemplatesModalOptions() {
        return {
          onReady: function onReady() {
            elementor.templates.showTemplates();
          }
        };
      },
      onAddSectionButtonClick: function onAddSectionButtonClick() {
        this.showSelectPresets();
      },
      onAddTemplateButtonClick: function onAddTemplateButtonClick() {
        elementor.templates.startModal(this.getTemplatesModalOptions());
      },
      onRender: function onRender() {
        this.$el.html5Droppable({
          axis: ["vertical"],
          groups: ["elementor-element"],
          placeholder: !1,
          currentElementClass: "elementor-html5dnd-current-element",
          hasDraggingOnChildClass: "elementor-dragging-on-child",
          onDropping: this.onDropping.bind(this)
        });
      },
      onPresetSelected: function onPresetSelected(e) {
        this.closeSelectPresets();
        var t,
            n = e.currentTarget.dataset.structure,
            i = elementor.presetsFactory.getParsedStructure(n),
            o = [];

        for (t = 0; t < i.columnsCount; t++) {
          o.push({
            id: elementor.helpers.getUniqueID(),
            elType: "column",
            settings: {},
            elements: []
          });
        }

        elementor.channels.data.trigger("element:before:add", {
          elType: "section"
        }), this.addSection({
          elements: o
        }).setStructure(n), elementor.channels.data.trigger("element:after:add");
      },
      onDropping: function onDropping() {
        elementor.channels.data.trigger("section:before:drop"), this.addSection().addElementFromPanel(), elementor.channels.data.trigger("section:after:drop");
      }
    }), t.exports = i;
  }, {}],
  117: [function (e, t, n) {
    var i = e("elementor-views/add-section/base");
    t.exports = i.extend({
      id: "elementor-add-new-section",
      onCloseButtonClick: function onCloseButtonClick() {
        this.closeSelectPresets();
      }
    });
  }, {
    "elementor-views/add-section/base": 116
  }],
  118: [function (e, t, n) {
    var i = e("elementor-views/add-section/base");
    t.exports = i.extend({
      options: {
        atIndex: null
      },
      className: function className() {
        return i.prototype.className.apply(this, arguments) + " elementor-add-section-inline";
      },
      addSection: function addSection(e, t) {
        return (t = t || {}).at = this.getOption("atIndex"), i.prototype.addSection.call(this, e, t);
      },
      getTemplatesModalOptions: function getTemplatesModalOptions() {
        return _.extend(i.prototype.getTemplatesModalOptions.apply(this, arguments), {
          importOptions: {
            at: this.getOption("atIndex")
          }
        });
      },
      fadeToDeath: function fadeToDeath() {
        var e = this;
        e.$el.slideUp(function () {
          e.destroy();
        });
      },
      onCloseButtonClick: function onCloseButtonClick() {
        this.fadeToDeath();
      },
      onPresetSelected: function onPresetSelected() {
        i.prototype.onPresetSelected.apply(this, arguments), this.destroy();
      },
      onAddTemplateButtonClick: function onAddTemplateButtonClick() {
        i.prototype.onAddTemplateButtonClick.apply(this, arguments), this.destroy();
      },
      onDropping: function onDropping() {
        i.prototype.onDropping.apply(this, arguments), this.destroy();
      }
    });
  }, {
    "elementor-views/add-section/base": 116
  }],
  119: [function (e, t, n) {
    t.exports = Marionette.CompositeView.extend({
      templateHelpers: function templateHelpers() {
        return {
          view: this
        };
      },
      getBehavior: function getBehavior(e) {
        return this._behaviors[Object.keys(this.behaviors()).indexOf(e)];
      },
      addChildModel: function addChildModel(e, t) {
        return this.collection.add(e, t, !0);
      },
      addChildElement: function addChildElement(e, t) {
        t = t || {};
        var n = this.getChildType(),
            i = e.get ? e.get("elType") : e.elType;
        if (-1 === n.indexOf(i)) return delete t.at, this.children.last().addChildElement(e, t);
        var o = this.addChildModel(e, t),
            r = this.children.findByModel(o);
        return r.edit(), r;
      }
    });
  }, {}],
  120: [function (e, t, n) {
    var i,
        o = e("elementor-elements/views/section");
    i = e("elementor-views/base-container").extend({
      childView: o,
      behaviors: function behaviors() {
        var t = {
          Sortable: {
            behaviorClass: e("elementor-behaviors/sortable"),
            elChildType: "section"
          },
          HandleDuplicate: {
            behaviorClass: e("elementor-behaviors/handle-duplicate")
          },
          HandleAddMode: {
            behaviorClass: e("elementor-behaviors/duplicate")
          }
        };
        return elementor.hooks.applyFilters("elements/base-section-container/behaviors", t, this);
      },
      getSortableOptions: function getSortableOptions() {
        return {
          handle: "> .elementor-element-overlay .elementor-editor-section-settings .elementor-editor-element-trigger",
          items: "> .elementor-section"
        };
      },
      getChildType: function getChildType() {
        return ["section"];
      },
      isCollectionFilled: function isCollectionFilled() {
        return !1;
      },
      initialize: function initialize() {
        this.listenTo(this.collection, "add remove reset", this.onCollectionChanged).listenTo(elementor.channels.panelElements, "element:drag:start", this.onPanelElementDragStart).listenTo(elementor.channels.panelElements, "element:drag:end", this.onPanelElementDragEnd);
      },
      addSection: function addSection(e, t) {
        var n = {
          id: elementor.helpers.getUniqueID(),
          elType: "section",
          settings: {},
          elements: []
        };
        e && _.extend(n, e);
        var i = this.addChildModel(n, t);
        return this.children.findByModelCid(i.cid);
      },
      onCollectionChanged: function onCollectionChanged() {
        elementor.saver.setFlagEditorChange(!0);
      },
      onPanelElementDragStart: function onPanelElementDragStart() {
        elementor.helpers.disableElementEvents(this.$el.find("iframe"));
      },
      onPanelElementDragEnd: function onPanelElementDragEnd() {
        elementor.helpers.enableElementEvents(this.$el.find("iframe"));
      }
    }), t.exports = i;
  }, {
    "elementor-behaviors/duplicate": 67,
    "elementor-behaviors/handle-duplicate": 68,
    "elementor-behaviors/sortable": 72,
    "elementor-elements/views/section": 75,
    "elementor-views/base-container": 119
  }],
  121: [function (e, t, n) {
    var i;
    i = Marionette.CompositeView.extend({
      className: "elementor-panel-controls-stack",
      classes: {
        popover: "elementor-controls-popover"
      },
      activeTab: null,
      activeSection: null,
      templateHelpers: function templateHelpers() {
        return {
          elementData: elementor.getElementData(this.model)
        };
      },
      ui: function ui() {
        return {
          tabs: ".elementor-panel-navigation-tab",
          reloadButton: ".elementor-update-preview-button"
        };
      },
      events: function events() {
        return {
          "click @ui.tabs": "onClickTabControl",
          "click @ui.reloadButton": "onReloadButtonClick"
        };
      },
      modelEvents: {
        destroy: "onModelDestroy"
      },
      behaviors: {
        HandleInnerTabs: {
          behaviorClass: e("elementor-behaviors/inner-tabs")
        }
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.deviceMode, "change", this.onDeviceModeChange);
      },
      filter: function filter(e) {
        if (e.get("tab") !== this.activeTab) return !1;
        if ("section" === e.get("type")) return !0;
        var t = e.get("section");
        return !t || t === this.activeSection;
      },
      isVisibleSectionControl: function isVisibleSectionControl(e) {
        return this.activeTab === e.get("tab");
      },
      activateTab: function activateTab(e) {
        var t = this;
        this.activeTab = e.data("tab");
        this.ui.tabs.removeClass("active"), e.addClass("active");
        var n = this.collection.filter(function (e) {
          return "section" === e.get("type") && t.isVisibleSectionControl(e);
        });
        n[0] && this.activateSection(n[0].get("name"));
      },
      activateSection: function activateSection(e) {
        this.activeSection = e;
      },
      getChildView: function getChildView(e) {
        var t = e.get("type");
        return elementor.getControlView(t);
      },
      handlePopovers: function handlePopovers() {
        var e,
            t = this,
            n = !1;
        t.removePopovers(), t.children.each(function (i) {
          n && e.append(i.$el);
          var o = i.model.get("popover");
          o && (o.start && (n = !0, e = jQuery("<div>", {
            "class": t.classes.popover
          }), i.$el.before(e), e.append(i.$el)), o.end && (n = !1));
        });
      },
      removePopovers: function removePopovers() {
        this.$el.find("." + this.classes.popover).remove();
      },
      openActiveSection: function openActiveSection() {
        var e = this.activeSection,
            t = this.children.filter(function (t) {
          return e === t.model.get("name");
        });
        t[0] && t[0].ui.heading.addClass("elementor-open");
      },
      onRenderCollection: function onRenderCollection() {
        this.openActiveSection(), this.handlePopovers();
      },
      onRenderTemplate: function onRenderTemplate() {
        this.activateTab(this.ui.tabs.eq(0));
      },
      onModelDestroy: function onModelDestroy() {
        this.destroy();
      },
      onClickTabControl: function onClickTabControl(e) {
        e.preventDefault();
        var t = this.$(e.currentTarget);
        this.activeTab !== t.data("tab") && (this.activateTab(t), this._renderChildren());
      },
      onReloadButtonClick: function onReloadButtonClick() {
        elementor.reloadPreview();
      },
      onDeviceModeChange: function onDeviceModeChange() {
        this.$el.removeClass("elementor-responsive-switchers-open");
      },
      onChildviewControlSectionClicked: function onChildviewControlSectionClicked(e) {
        var t = e.ui.heading.hasClass("elementor-open");
        this.activateSection(t ? null : e.model.get("name")), this._renderChildren();
      },
      onChildviewResponsiveSwitcherClick: function onChildviewResponsiveSwitcherClick(e, t) {
        "desktop" === t && this.$el.toggleClass("elementor-responsive-switchers-open");
      }
    }), t.exports = i;
  }, {
    "elementor-behaviors/inner-tabs": 70
  }],
  122: [function (e, t, n) {
    var i,
        o = e("elementor-views/base-sections-container"),
        r = e("elementor-views/add-section/independent");
    i = o.extend({
      template: Marionette.TemplateCache.get("#tmpl-elementor-preview"),
      className: "elementor-inner",
      childViewContainer: ".elementor-section-wrap",
      onRender: function onRender() {
        var e = new r();
        e.render(), this.$el.append(e.$el);
      }
    }), t.exports = i;
  }, {
    "elementor-views/add-section/independent": 117,
    "elementor-views/base-sections-container": 120
  }],
  123: [function (e, t, n) {
    "use strict";

    t.exports = function () {
      var e,
          t = Array.prototype.slice,
          n = {
        actions: {},
        filters: {}
      };

      function i(e, t, i, o) {
        var r, s, l;
        if (n[e][t]) if (i) {
          if (r = n[e][t], o) for (l = r.length; l--;) {
            (s = r[l]).callback === i && s.context === o && r.splice(l, 1);
          } else for (l = r.length; l--;) {
            r[l].callback === i && r.splice(l, 1);
          }
        } else n[e][t] = [];
      }

      function o(e, t, i, o, r) {
        var s = {
          callback: i,
          priority: o,
          context: r
        },
            l = n[e][t];

        if (l) {
          var a = !1;
          if (jQuery.each(l, function () {
            if (this.callback === i) return a = !0, !1;
          }), a) return;
          l.push(s), l = function (e) {
            for (var t, n, i, o = 1, r = e.length; o < r; o++) {
              for (t = e[o], n = o; (i = e[n - 1]) && i.priority > t.priority;) {
                e[n] = e[n - 1], --n;
              }

              e[n] = t;
            }

            return e;
          }(l);
        } else l = [s];

        n[e][t] = l;
      }

      function r(e, t, i) {
        var o,
            r,
            s = n[e][t];
        if (!s) return "filters" === e && i[0];
        if (r = s.length, "filters" === e) for (o = 0; o < r; o++) {
          i[0] = s[o].callback.apply(s[o].context, i);
        } else for (o = 0; o < r; o++) {
          s[o].callback.apply(s[o].context, i);
        }
        return "filters" !== e || i[0];
      }

      return e = {
        removeFilter: function removeFilter(t, n) {
          return "string" == typeof t && i("filters", t, n), e;
        },
        applyFilters: function applyFilters() {
          var n = t.call(arguments),
              i = n.shift();
          return "string" == typeof i ? r("filters", i, n) : e;
        },
        addFilter: function addFilter(t, n, i, r) {
          return "string" == typeof t && "function" == typeof n && o("filters", t, n, i = parseInt(i || 10, 10), r), e;
        },
        removeAction: function removeAction(t, n) {
          return "string" == typeof t && i("actions", t, n), e;
        },
        doAction: function doAction() {
          var n = t.call(arguments),
              i = n.shift();
          return "string" == typeof i && r("actions", i, n), e;
        },
        addAction: function addAction(t, n, i, r) {
          return "string" == typeof t && "function" == typeof n && o("actions", t, n, i = parseInt(i || 10, 10), r), e;
        }
      };
    };
  }, {}],
  124: [function (e, t, n) {
    t.exports = new function () {
      var e = this.hotKeysHandlers = {},
          t = function t(_t) {
        var n = e[_t.which];
        n && jQuery.each(n, function () {
          this.isWorthHandling && !this.isWorthHandling(_t) || !this.allowAltKey && _t.altKey || (_t.preventDefault(), this.handle(_t));
        });
      };

      this.isControlEvent = function (e) {
        return e[-1 !== navigator.userAgent.indexOf("Mac OS X") ? "metaKey" : "ctrlKey"];
      }, this.addHotKeyHandler = function (t, n, i) {
        e[t] || (e[t] = {}), e[t][n] = i;
      }, this.bindListener = function (e) {
        e.on("keydown", t);
      };
    }();
  }, {}],
  125: [function (e, t, n) {
    var i = function i() {
      var e,
          t = jQuery,
          n = arguments,
          i = this,
          o = {};
      this.getItems = function (e, t) {
        if (t) {
          var n = t.split("."),
              i = n.splice(0, 1);
          if (!n.length) return e[i];
          if (!e[i]) return;
          return this.getItems(e[i], n.join("."));
        }

        return e;
      }, this.getSettings = function (t) {
        return this.getItems(e, t);
      }, this.setSettings = function (n, o, r) {
        if (r || (r = e), "object" == _typeof(n)) return t.extend(r, n), i;
        var s = n.split("."),
            l = s.splice(0, 1);
        return s.length ? (r[l] || (r[l] = {}), i.setSettings(s.join("."), o, r[l])) : (r[l] = o, i);
      }, this.forceMethodImplementation = function (e) {
        var t = e.callee.name;
        throw new ReferenceError("The method " + t + " must to be implemented in the inheritor child.");
      }, this.on = function (e, t) {
        return o[e] || (o[e] = []), o[e].push(t), i;
      }, this.off = function (e, t) {
        if (!o[e]) return i;
        if (!t) return delete o[e], i;
        var n = o[e].indexOf(t);
        return -1 !== n && delete o[e][n], i;
      }, this.trigger = function (e) {
        var n = "on" + e[0].toUpperCase() + e.slice(1),
            r = Array.prototype.slice.call(arguments, 1);
        i[n] && i[n].apply(i, r);
        var s = o[e];
        return s ? (t.each(s, function (e, t) {
          t.apply(i, r);
        }), i) : i;
      }, i.__construct.apply(i, n), t.each(i, function (e) {
        var t = i[e];
        "function" == typeof t && (i[e] = function () {
          return t.apply(i, arguments);
        });
      }), function () {
        e = i.getDefaultSettings();
        var o = n[0];
        o && t.extend(e, o);
      }(), i.trigger("init");
    };

    i.prototype.__construct = function () {}, i.prototype.getDefaultSettings = function () {
      return {};
    }, i.extendsCount = 0, i.extend = function (e) {
      var t = jQuery,
          n = this,
          o = function o() {
        return n.apply(this, arguments);
      };

      t.extend(o, n), (o.prototype = Object.create(t.extend({}, n.prototype, e))).constructor = o;
      var r = ++i.extendsCount;
      return o.prototype.getConstructorID = function () {
        return r;
      }, o.__super__ = n.prototype, o;
    }, t.exports = i;
  }, {}],
  126: [function (e, t, n) {
    var i;
    i = e("./module").extend({
      elements: null,
      getDefaultElements: function getDefaultElements() {
        return {};
      },
      bindEvents: function bindEvents() {},
      onInit: function onInit() {
        this.initElements(), this.bindEvents();
      },
      initElements: function initElements() {
        this.elements = this.getDefaultElements();
      }
    }), t.exports = i;
  }, {
    "./module": 125
  }],
  127: [function (e, t, n) {
    t.exports = Marionette.Behavior.extend({
      listenerAttached: !1,
      onBeforeRender: function onBeforeRender() {
        this.view.collection && !this.listenerAttached && (this.view.collection.on("update", this.saveCollectionHistory, this), this.listenerAttached = !0);
      },
      saveCollectionHistory: function saveCollectionHistory(e, t) {
        if (elementor.history.history.getActive()) {
          var n, i, o, r;
          t.add ? (o = (i = t.changes.added)[0], r = "add") : (o = (i = t.changes.removed)[0], r = "remove");
          var s = elementor.history.history.getModelLabel(o);

          if (s) {
            var l = [];
            _.each(i, function (e) {
              l.push(e.toJSON({
                copyHtmlCache: !0
              }));
            }), n = {
              type: r,
              elementType: o.get("elType"),
              elementID: o.get("id"),
              title: s,
              history: {
                behavior: this,
                collection: e,
                event: t,
                models: l
              }
            }, elementor.history.history.addItem(n);
          }
        }
      },
      add: function add(e, t, n) {
        "section" === e[0].elType && _.each(e, function (e) {
          e.dontFillEmpty = !0;
        }), t.addChildModel(e, {
          at: n,
          silent: 0
        });
      },
      remove: function remove(e, t) {
        t.remove(e, {
          silent: 0
        });
      },
      restore: function restore(e, t) {
        var n,
            i = e.get("type"),
            o = e.get("history"),
            r = !1;

        if (o.behavior.view.model) {
          var s = o.behavior.view.model.get("id"),
              l = elementor.history.history.findView(s);
          l && (n = l.getBehavior("CollectionHistory"));
        }

        switch (n || (n = o.behavior), n.view.collection.off("update", n.saveCollectionHistory), i) {
          case "add":
            t ? this.add(o.models, n.view, o.event.index) : this.remove(o.models, n.view.collection), r = !0;
            break;

          case "remove":
            t ? this.remove(o.models, n.view.collection) : this.add(o.models, n.view, o.event.index), r = !0;
        }

        return n.view.collection.on("update", n.saveCollectionHistory, o.behavior), r;
      }
    });
  }, {}],
  128: [function (e, t, n) {
    var i = e("./item");
    t.exports = Backbone.Collection.extend({
      model: i
    });
  }, {
    "./item": 131
  }],
  129: [function (e, t, n) {
    t.exports = Marionette.Behavior.extend({
      oldValues: [],
      listenerAttached: !1,
      initialize: function initialize() {
        this.lazySaveTextHistory = _.debounce(this.saveTextHistory.bind(this), 800);
      },
      onBeforeRender: function onBeforeRender() {
        this.listenerAttached || (this.listenTo(this.view.getEditModel().get("settings"), "change", this.saveHistory), this.listenerAttached = !0);
      },
      saveTextHistory: function saveTextHistory(e, t, n) {
        var i,
            o = {},
            r = e.get(n.name);
        i = r instanceof Backbone.Collection ? r.toJSON() : r, o[n.name] = {
          old: this.oldValues[n.name],
          "new": i
        };
        var s = {
          type: "change",
          elementType: "control",
          title: elementor.history.history.getModelLabel(e),
          subTitle: e.controls[t[0]].label,
          history: {
            behavior: this,
            changed: o,
            model: this.view.getEditModel().toJSON()
          }
        };
        elementor.history.history.addItem(s), delete this.oldValues[n.name];
      },
      saveHistory: function saveHistory(e) {
        if (elementor.history.history.getActive()) {
          var t = Object.keys(e.changed);

          if (t.length && e.controls[t[0]]) {
            if (1 === t.length) {
              var n = e.controls[t[0]];
              return _.isUndefined(this.oldValues[n.name]) && (this.oldValues[n.name] = e.previous(n.name)), void (elementor.history.history.isItemStarted() ? this.saveTextHistory(e, t, n) : this.lazySaveTextHistory(e, t, n));
            }

            var i = {};

            _.each(t, function (t) {
              i[t] = {
                old: e.previous(t),
                "new": e.get(t)
              };
            });

            var o = {
              type: "change",
              elementType: "control",
              title: elementor.history.history.getModelLabel(e),
              history: {
                behavior: this,
                changed: i,
                model: this.view.getEditModel().toJSON()
              }
            };
            1 === t.length && (o.subTitle = e.controls[t[0]].label), elementor.history.history.addItem(o);
          }
        }
      },
      restore: function restore(e, t) {
        var n = e.get("history"),
            i = n.model.id,
            o = elementor.history.history.findView(i);

        if (o) {
          var r = (o.getEditModel ? o.getEditModel() : o.model).get("settings"),
              s = o.getBehavior("ElementHistory");
          s.stopListening(r, "change", this.saveHistory);
          var l = {};
          _.each(n.changed, function (e, n) {
            l[n] = t ? e["new"] : e.old;
          }), r.set(l), _.each(n.changed, function (e, t) {
            r.trigger("change:external:" + t);
          }), e.set("status", t ? "not_applied" : "applied"), s.listenTo(r, "change", this.saveHistory);
        }
      }
    });
  }, {}],
  130: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-history-no-items",
      id: "elementor-panel-history-no-items",
      className: "elementor-panel-nerd-box"
    });
  }, {}],
  131: [function (e, t, n) {
    t.exports = Backbone.Model.extend({
      defaults: {
        id: 0,
        type: "",
        elementType: "",
        status: "not_applied",
        title: "",
        subTitle: "",
        action: "",
        history: {}
      },
      initialize: function initialize() {
        this.set("items", new Backbone.Collection());
      }
    });
  }, {}],
  132: [function (e, t, n) {
    var i = e("./collection"),
        o = e("./item"),
        r = e("./element-behavior"),
        s = e("./collection-behavior");
    t.exports = new function () {
      var e = this,
          t = null,
          n = new i(),
          l = !1,
          a = !0,
          c = {
        add: elementor.translate("added"),
        remove: elementor.translate("removed"),
        change: elementor.translate("edited"),
        move: elementor.translate("moved"),
        duplicate: elementor.translate("duplicated")
      },
          d = function d(e) {
        return e.ElementHistory = {
          behaviorClass: r
        }, e.CollectionHistory = {
          behaviorClass: s
        }, e;
      },
          m = function m(e) {
        return e.CollectionHistory = {
          behaviorClass: s
        }, e;
      },
          u = function u() {
        elementor.hotKeys.addHotKeyHandler(90, "historyNavigation", {
          isWorthHandling: function isWorthHandling(e) {
            return n.length && !jQuery(e.target).is("input, textarea, [contenteditable=true]");
          },
          handle: function handle(t) {
            var i, o, r, s;
            i = 90 === t.which && t.shiftKey, o = n.find(function (e) {
              return "not_applied" === e.get("status");
            }), r = n.indexOf(o), s = i ? r - 1 : r + 1, !i && !o || s < 0 || s >= n.length || e.doItem(s);
          }
        }), elementor.hotKeys.addHotKeyHandler(72, "showHistoryPage", {
          isWorthHandling: function isWorthHandling(e) {
            return elementor.hotKeys.isControlEvent(e) && e.shiftKey;
          },
          handle: function handle() {
            elementor.getPanelView().setPage("historyPage");
          }
        });
      },
          h = function h() {
        if (n.length >= 2) {
          var e = n.at(n.length - 2);
          l = "not_applied" === e.get("status");
        }
      };

      this.setActive = function (e) {
        a = e;
      }, this.getActive = function () {
        return a;
      }, this.getItems = function () {
        return n;
      }, this.startItem = function (e) {
        t = this.addItem(e);
      }, this.endItem = function () {
        t = null;
      }, this.isItemStarted = function () {
        return null !== t;
      }, this.addItem = function (i) {
        if (this.getActive()) {
          for (n.length || n.add({
            status: "not_applied",
            title: elementor.translate("editing_started"),
            subTitle: "",
            action: "",
            editing_started: !0
          }); n.length && "applied" === n.first().get("status");) {
            n.shift();
          }

          var r,
              s = t || new Date().getTime(),
              l = n.findWhere({
            id: s
          });
          l || (l = new o({
            id: s,
            title: i.title,
            subTitle: i.subTitle,
            action: (r = i, c[r.type] ? c[r.type] : r.type),
            type: i.type,
            elementType: i.elementType
          }), e.startItemTitle = "", e.startItemAction = "");
          var a = 0;
          "column" === i.elementType && "remove" === i.type && "column" === l.get("elementType") && (a = 1), l.get("items").add(i, {
            at: a
          }), n.add(l, {
            at: 0
          });
          var d = elementor.getPanelView();
          return "historyPage" === d.getCurrentPageName() && d.getCurrentPageView().render(), s;
        }
      }, this.doItem = function (t) {
        this.setActive(!1);
        var i = n.at(t);
        "not_applied" === i.get("status") ? this.undoItem(t) : this.redoItem(t), this.setActive(!0);
        var o,
            r = elementor.getPanelView(),
            s = r.getCurrentPageView();
        if ("editor" === r.getCurrentPageName()) s.getOption("editedElementView").isDestroyed ? r.setPage("historyPage") : o = s.getOption("editedElementView");else if ("historyPage" === r.getCurrentPageName() && s.render(), i instanceof Backbone.Model && i.get("items").length) {
          var a = i.get("items").first().get("history").behavior.view;
          a.model && (o = e.findView(a.model.get("id")));
        }
        o && !elementor.helpers.isInViewport(o.$el[0], elementor.$previewContents.find("html")[0]) && elementor.helpers.scrollToView(o), i.get("editing_started") && (l || elementor.saver.setFlagEditorChange(!1));
      }, this.undoItem = function (e) {
        for (var t, i = 0; i < e; i++) {
          "not_applied" === (t = n.at(i)).get("status") && (t.get("items").each(function (e) {
            var t = e.get("history");
            t && t.behavior.restore(e);
          }), t.set("status", "applied"));
        }
      }, this.redoItem = function (e) {
        for (var t = n.length - 1; t >= e; t--) {
          var i = n.at(t);

          if ("applied" === i.get("status")) {
            var o = _.toArray(i.get("items").models).reverse();

            _(o).each(function (e) {
              var t = e.get("history");
              t && t.behavior.restore(e, !0);
            }), i.set("status", "not_applied");
          }
        }
      }, this.getModelLabel = function (e) {
        return e instanceof Backbone.Model || (e = new Backbone.Model(e)), elementor.getElementData(e).title;
      }, this.findView = function (e, t) {
        var n = this,
            i = !1;
        return t || (t = elementor.sections.currentView.children), _.each(t._views, function (t) {
          if (!i) {
            var o = t.getEditModel ? t.getEditModel() : t.model;
            e === o.get("id") ? i = t : t.children && t.children.length && (i = n.findView(e, t.children));
          }
        }), i;
      }, this.startMovingItem = function (t) {
        elementor.history.history.startItem({
          type: "move",
          title: e.getModelLabel(t),
          elementType: t.get("elType")
        });
      }, this.startInsertTemplate = function (e) {
        elementor.history.history.startItem({
          type: "add",
          title: elementor.translate("template"),
          subTitle: e.get("title"),
          elementType: "template"
        });
      }, this.startDropElement = function () {
        var t = elementor.channels.panelElements.request("element:selected");
        elementor.history.history.startItem({
          type: "add",
          title: e.getModelLabel(t.model),
          elementType: t.model.get("widgetType") || t.model.get("elType")
        });
      }, this.startAddElement = function (t) {
        elementor.history.history.startItem({
          type: "add",
          title: e.getModelLabel(t),
          elementType: t.elType
        });
      }, this.startDuplicateElement = function (t) {
        elementor.history.history.startItem({
          type: "duplicate",
          title: e.getModelLabel(t),
          elementType: t.get("elType")
        });
      }, this.startRemoveElement = function (t) {
        elementor.history.history.startItem({
          type: "remove",
          title: e.getModelLabel(t),
          elementType: t.get("elType")
        });
      }, u(), elementor.hooks.addFilter("elements/base/behaviors", d), elementor.hooks.addFilter("elements/base-section-container/behaviors", m), elementor.channels.data.on("drag:before:update", e.startMovingItem).on("drag:after:update", e.endItem).on("element:before:add", e.startAddElement).on("element:after:add", e.endItem).on("element:before:remove", e.startRemoveElement).on("element:after:remove", e.endItem).on("element:before:duplicate", e.startDuplicateElement).on("element:after:duplicate", e.endItem).on("section:before:drop", e.startDropElement).on("section:after:drop", e.endItem).on("template:before:insert", e.startInsertTemplate).on("template:after:insert", e.endItem), elementor.channels.editor.on("saved", h);
    }();
  }, {
    "./collection": 128,
    "./collection-behavior": 127,
    "./element-behavior": 129,
    "./item": 131
  }],
  133: [function (e, t, n) {
    t.exports = Marionette.CompositeView.extend({
      id: "elementor-panel-history",
      template: "#tmpl-elementor-panel-history-tab",
      childView: Marionette.ItemView.extend({
        template: "#tmpl-elementor-panel-history-item",
        ui: {
          item: ".elementor-history-item"
        },
        triggers: {
          "click @ui.item": "item:click"
        }
      }),
      childViewContainer: "#elementor-history-list",
      currentItem: null,
      onRender: function onRender() {
        var e = this;

        _.defer(function () {
          if (e.children.length) {
            var t = e.collection.find(function (e) {
              return "not_applied" === e.get("status");
            }),
                n = e.children.findByModel(t);
            e.updateCurrentItem(n.$el);
          }
        });
      },
      updateCurrentItem: function updateCurrentItem(e) {
        var t = "elementor-history-item-current";
        this.currentItem && this.currentItem.removeClass(t), this.currentItem = e, this.currentItem.addClass(t);
      },
      onChildviewItemClick: function onChildviewItemClick(e, t) {
        if (e.$el !== this.currentItem) {
          var n = t.model.collection.findIndex(t.model);
          elementor.history.history.doItem(n), this.updateCurrentItem(e.$el), this.isDestroyed || this.render();
        }
      }
    });
  }, {}],
  134: [function (e, t, n) {
    var i,
        o = e("./panel-page");
    i = function i() {
      var t = this,
          n = function n() {
        elementor.getPanelView().addPage("historyPage", {
          view: o,
          title: elementor.translate("history")
        });
      };

      jQuery(window).on("elementor:init", function () {
        elementor.on("preview:loaded", n), t.history = e("./history/manager"), t.revisions = e("./revisions/manager"), t.revisions.init();
      });
    }, t.exports = new i();
  }, {
    "./history/manager": 132,
    "./panel-page": 135,
    "./revisions/manager": 138
  }],
  135: [function (e, t, n) {
    var i = e("./history/panel-tab"),
        o = e("./history/empty"),
        r = e("./revisions/panel-tab"),
        s = e("./revisions/empty");
    t.exports = Marionette.LayoutView.extend({
      template: "#tmpl-elementor-panel-history-page",
      regions: {
        content: "#elementor-panel-history-content"
      },
      ui: {
        tabs: ".elementor-panel-navigation-tab"
      },
      events: {
        "click @ui.tabs": "onTabClick"
      },
      regionViews: {},
      currentTab: null,
      initialize: function initialize() {
        this.initRegionViews();
      },
      initRegionViews: function initRegionViews() {
        var e = elementor.history.history.getItems(),
            t = elementor.history.revisions.getItems();
        this.regionViews = {
          history: {
            region: this.content,
            view: function view() {
              return e.length ? i : o;
            },
            options: {
              collection: e
            }
          },
          revisions: {
            region: this.content,
            view: function view() {
              return t.length ? r : s;
            },
            options: {
              collection: t
            }
          }
        };
      },
      activateTab: function activateTab(e) {
        this.ui.tabs.removeClass("active").filter('[data-view="' + e + '"]').addClass("active"), this.showView(e);
      },
      getCurrentTab: function getCurrentTab() {
        return this.currentTab;
      },
      showView: function showView(e) {
        var t = this.regionViews[e],
            n = t.options || {},
            i = t.view;
        "function" == typeof i && (i = t.view()), n.viewName = e, this.currentTab = new i(n), t.region.show(this.currentTab);
      },
      onRender: function onRender() {
        this.showView("history");
      },
      onTabClick: function onTabClick(e) {
        this.activateTab(e.currentTarget.dataset.view);
      },
      onDestroy: function onDestroy() {
        elementor.getPanelView().getFooterView().ui.history.removeClass("elementor-open");
      }
    });
  }, {
    "./history/empty": 130,
    "./history/panel-tab": 133,
    "./revisions/empty": 137,
    "./revisions/panel-tab": 140
  }],
  136: [function (e, t, n) {
    var i = e("./model");
    t.exports = Backbone.Collection.extend({
      model: i,
      comparator: function comparator(e) {
        return -e.get("timestamp");
      }
    });
  }, {
    "./model": 139
  }],
  137: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-revisions-no-revisions",
      id: "elementor-panel-revisions-no-revisions",
      className: "elementor-panel-nerd-box"
    });
  }, {}],
  138: [function (e, t, n) {
    var i,
        o = e("./collection");
    i = function i() {
      var e,
          t = this;

      this.getItems = function () {
        return e;
      };

      var n = function n(_n) {
        if (_n.latest_revisions && t.addRevisions(_n.latest_revisions), _n.revisions_ids) {
          var i = e.filter(function (e) {
            return -1 !== _n.revisions_ids.indexOf(e.get("id"));
          });
          e.reset(i);
        }
      };

      this.setEditorData = function (e) {
        elementor.getRegion("sections").currentView.collection.reset(e);
      }, this.getRevisionDataAsync = function (e, t) {
        return _.extend(t, {
          data: {
            id: e
          }
        }), elementor.ajax.send("get_revision_data", t);
      }, this.addRevisions = function (t) {
        t.forEach(function (t) {
          var n = e.findWhere({
            id: t.id
          });
          n && e.remove(n), e.add(t);
        });
      }, this.deleteRevision = function (t, n) {
        var i = {
          data: {
            id: t.get("id")
          },
          success: function success() {
            if (n.success && n.success(), t.destroy(), !e.length) {
              var i = elementor.getPanelView();
              "historyPage" === i.getCurrentPageName() && i.getCurrentPageView().activateTab("revisions");
            }
          }
        };
        n.error && (i.error = n.error), elementor.ajax.send("delete_revision", i);
      }, this.init = function () {
        var t;
        e = new o(elementor.config.revisions), elementor.channels.editor.on("saved", n), t = {
          isWorthHandling: function isWorthHandling() {
            var e = elementor.getPanelView();
            if ("historyPage" !== e.getCurrentPageName()) return !1;
            var t = e.getCurrentPageView().getCurrentTab();
            return t.currentPreviewId && t.currentPreviewItem && t.children.length > 1;
          },
          handle: function handle(e) {
            elementor.getPanelView().getCurrentPageView().getCurrentTab().navigate(38 === e.which);
          }
        }, elementor.hotKeys.addHotKeyHandler(38, "revisionNavigation", t), elementor.hotKeys.addHotKeyHandler(40, "revisionNavigation", t);
      };
    }, t.exports = new i();
  }, {
    "./collection": 136
  }],
  139: [function (e, t, n) {
    var i;
    (i = Backbone.Model.extend()).prototype.sync = function () {
      return null;
    }, t.exports = i;
  }, {}],
  140: [function (e, t, n) {
    t.exports = Marionette.CompositeView.extend({
      id: "elementor-panel-revisions",
      template: "#tmpl-elementor-panel-revisions",
      childView: e("./view"),
      childViewContainer: "#elementor-revisions-list",
      ui: {
        discard: ".elementor-panel-scheme-discard .elementor-button",
        apply: ".elementor-panel-scheme-save .elementor-button"
      },
      events: {
        "click @ui.discard": "onDiscardClick",
        "click @ui.apply": "onApplyClick"
      },
      isRevisionApplied: !1,
      jqueryXhr: null,
      currentPreviewId: null,
      currentPreviewItem: null,
      initialize: function initialize() {
        this.listenTo(elementor.channels.editor, "saved", this.onEditorSaved), this.currentPreviewId = elementor.config.current_revision_id;
      },
      getRevisionViewData: function getRevisionViewData(e) {
        var t = this;
        this.jqueryXhr = elementor.history.revisions.getRevisionDataAsync(e.model.get("id"), {
          success: function success(n) {
            elementor.history.revisions.setEditorData(n), t.setRevisionsButtonsActive(!0), t.jqueryXhr = null, e.$el.removeClass("elementor-revision-item-loading"), t.enterReviewMode();
          },
          error: function error() {
            e.$el.removeClass("elementor-revision-item-loading"), "abort" !== t.jqueryXhr.statusText && (t.currentPreviewItem = null, t.currentPreviewId = null, alert("An error occurred"));
          }
        });
      },
      setRevisionsButtonsActive: function setRevisionsButtonsActive(e) {
        this.ui.apply.add(this.ui.discard).prop("disabled", !e);
      },
      deleteRevision: function deleteRevision(e) {
        var t = this;
        e.$el.addClass("elementor-revision-item-loading"), elementor.history.revisions.deleteRevision(e.model, {
          success: function success() {
            e.model.get("id") === t.currentPreviewId && t.onDiscardClick(), t.currentPreviewId = null;
          },
          error: function error(t) {
            e.$el.removeClass("elementor-revision-item-loading"), alert("An error occurred");
          }
        });
      },
      enterReviewMode: function enterReviewMode() {
        elementor.changeEditMode("review");
      },
      exitReviewMode: function exitReviewMode() {
        elementor.changeEditMode("edit");
      },
      navigate: function navigate(e) {
        var t = this.collection.indexOf(this.currentPreviewItem.model),
            n = e ? t - 1 : t + 1;
        n < 0 && (n = this.collection.length - 1), n >= this.collection.length && (n = 0), this.children.findByIndex(n).ui.detailsArea.trigger("click");
      },
      onEditorSaved: function onEditorSaved() {
        this.exitReviewMode(), this.setRevisionsButtonsActive(!1), this.currentPreviewId = elementor.config.current_revision_id;
      },
      onApplyClick: function onApplyClick() {
        elementor.saver.setFlagEditorChange(!0), elementor.saver.saveAutoSave(), this.isRevisionApplied = !0, this.currentPreviewId = null;
      },
      onDiscardClick: function onDiscardClick() {
        elementor.history.revisions.setEditorData(elementor.config.data), elementor.saver.setFlagEditorChange(this.isRevisionApplied), this.isRevisionApplied = !1, this.setRevisionsButtonsActive(!1), this.currentPreviewId = null, this.exitReviewMode(), this.currentPreviewItem && this.currentPreviewItem.$el.removeClass("elementor-revision-current-preview");
      },
      onDestroy: function onDestroy() {
        this.currentPreviewId && this.currentPreviewId !== elementor.config.current_revision_id && this.onDiscardClick();
      },
      onRenderCollection: function onRenderCollection() {
        if (this.currentPreviewId) {
          var e = this.collection.findWhere({
            id: this.currentPreviewId
          });
          e && (this.currentPreviewItem = this.children.findByModelCid(e.cid), this.currentPreviewItem.$el.addClass("elementor-revision-current-preview"));
        }
      },
      onChildviewDetailsAreaClick: function onChildviewDetailsAreaClick(e) {
        var t = this,
            n = e.model.get("id");
        n !== t.currentPreviewId && (this.jqueryXhr && this.jqueryXhr.abort(), t.currentPreviewItem && t.currentPreviewItem.$el.removeClass("elementor-revision-current-preview"), e.$el.addClass("elementor-revision-current-preview elementor-revision-item-loading"), elementor.saver.isEditorChanged() && null === t.currentPreviewId ? elementor.saver.saveEditor({
          status: "autosave",
          onSuccess: function onSuccess() {
            t.getRevisionViewData(e);
          }
        }) : t.getRevisionViewData(e), t.currentPreviewItem = e, t.currentPreviewId = n);
      },
      onChildviewDeleteClick: function onChildviewDeleteClick(e) {
        var t = this,
            n = e.model.get("type");
        e.model.get("id");
        elementor.dialogsManager.createWidget("confirm", {
          message: elementor.translate("dialog_confirm_delete", [n]),
          headerMessage: elementor.translate("delete_element", [n]),
          strings: {
            confirm: elementor.translate("delete"),
            cancel: elementor.translate("cancel")
          },
          defaultOption: "confirm",
          onConfirm: function onConfirm() {
            t.deleteRevision(e);
          }
        }).show();
      }
    });
  }, {
    "./view": 141
  }],
  141: [function (e, t, n) {
    t.exports = Marionette.ItemView.extend({
      template: "#tmpl-elementor-panel-revisions-revision-item",
      className: "elementor-revision-item",
      ui: {
        detailsArea: ".elementor-revision-item__details",
        deleteButton: ".elementor-revision-item__tools-delete"
      },
      triggers: {
        "click @ui.detailsArea": "detailsArea:click",
        "click @ui.deleteButton": "delete:click"
      }
    });
  }, {}]
}, {}, [110, 111, 61]);