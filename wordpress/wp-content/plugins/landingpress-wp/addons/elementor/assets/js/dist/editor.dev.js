"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }

  return s;
})({
  1: [function (require, module, exports) {
    module.exports = Marionette.Behavior.extend({
      previewWindow: null,
      ui: function ui() {
        return {
          buttonPreview: '#elementor-panel-saver-button-preview',
          buttonPublish: '#elementor-panel-saver-button-publish',
          buttonSaveOptions: '#elementor-panel-saver-button-save-options',
          buttonPublishLabel: '#elementor-panel-saver-button-publish-label',
          menuSaveDraft: '#elementor-panel-saver-menu-save-draft',
          lastEditedWrapper: '.elementor-last-edited-wrapper'
        };
      },
      events: function events() {
        return {
          'click @ui.buttonPreview': 'onClickButtonPreview',
          'click @ui.buttonPublish': 'onClickButtonPublish',
          'click @ui.menuSaveDraft': 'onClickMenuSaveDraft'
        };
      },
      initialize: function initialize() {
        elementor.saver.on('before:save', this.onBeforeSave.bind(this)).on('after:save', this.onAfterSave.bind(this)).on('after:saveError', this.onAfterSaveError.bind(this)).on('page:status:change', this.onPageStatusChange);
        elementor.settings.page.model.on('change', this.onPageSettingsChange.bind(this));
        elementor.channels.editor.on('status:change', this.activateSaveButtons.bind(this));
      },
      activateSaveButtons: function activateSaveButtons(hasChanges) {
        hasChanges = hasChanges || 'draft' === elementor.settings.page.model.get('post_status');
        this.ui.buttonPublish.add(this.ui.menuSaveDraft).toggleClass('elementor-saver-disabled', !hasChanges);
        this.ui.buttonSaveOptions.toggleClass('elementor-saver-disabled', !hasChanges);
      },
      onRender: function onRender() {
        this.setMenuItems(elementor.settings.page.model.get('post_status'));
        this.addTooltip();
      },
      onPageSettingsChange: function onPageSettingsChange(settings) {
        var changed = settings.changed;

        if (!_.isUndefined(changed.post_status)) {
          this.setMenuItems(changed.post_status);
          this.refreshWpPreview(); // Refresh page-settings post-status value.

          if ('page_settings' === elementor.getPanelView().getCurrentPageName()) {
            elementor.getPanelView().getCurrentPageView().render();
          }
        }
      },
      onPageStatusChange: function onPageStatusChange(newStatus) {
        if ('publish' === newStatus) {
          elementor.notifications.showToast({
            message: elementor.translate('publish_notification'),
            buttons: [{
              name: 'view_page',
              text: elementor.translate('have_a_look'),
              callback: function callback() {
                open(elementor.config.post_link);
              }
            }]
          });
        }
      },
      onBeforeSave: function onBeforeSave(options) {
        NProgress.start();

        if ('autosave' === options.status) {
          this.ui.lastEditedWrapper.addClass('elementor-state-active');
        } else {
          this.ui.buttonPublish.addClass('elementor-button-state');
        }
      },
      onAfterSave: function onAfterSave(data) {
        NProgress.done();
        this.ui.buttonPublish.removeClass('elementor-button-state');
        this.ui.lastEditedWrapper.removeClass('elementor-state-active');
        this.refreshWpPreview();
        this.setLastEdited(data);
      },
      setLastEdited: function setLastEdited(data) {
        this.ui.lastEditedWrapper.removeClass('elementor-button-state').find('.elementor-last-edited').html(data.config.last_edited);
      },
      onAfterSaveError: function onAfterSaveError() {
        NProgress.done();
        this.ui.buttonPublish.removeClass('elementor-button-state');
      },
      onClickButtonPreview: function onClickButtonPreview() {
        // Open immediately in order to avoid popup blockers.
        this.previewWindow = open(elementor.config.wp_preview.url, elementor.config.wp_preview.target);

        if (elementor.saver.isEditorChanged()) {
          if (elementor.saver.xhr) {
            elementor.saver.xhr.abort();
            elementor.saver.isSaving = false;
          }

          elementor.saver.doAutoSave();
        }
      },
      onClickButtonPublish: function onClickButtonPublish() {
        var postStatus = elementor.settings.page.model.get('post_status');

        if (this.ui.buttonPublish.hasClass('elementor-saver-disabled')) {
          return;
        }

        switch (postStatus) {
          case 'publish':
          case 'private':
            elementor.saver.update();
            break;

          case 'draft':
            if (elementor.config.current_user_can_publish) {
              elementor.saver.publish();
            } else {
              elementor.saver.savePending();
            }

            break;

          case 'pending': // User cannot change post status

          case undefined:
            // TODO: as a contributor it's undefined instead of 'pending'.
            if (elementor.config.current_user_can_publish) {
              elementor.saver.publish();
            } else {
              elementor.saver.update();
            }

            break;
        }
      },
      onClickMenuSaveDraft: function onClickMenuSaveDraft() {
        elementor.saver.saveDraft();
      },
      setMenuItems: function setMenuItems(postStatus) {
        var publishLabel = 'publish';

        switch (postStatus) {
          case 'publish':
          case 'private':
            publishLabel = 'update';

            if (elementor.config.current_revision_id !== elementor.config.post_id) {
              this.activateSaveButtons(true);
            }

            break;

          case 'draft':
            if (!elementor.config.current_user_can_publish) {
              publishLabel = 'submit';
            }

            this.activateSaveButtons(true);
            break;

          case 'pending': // User cannot change post status

          case undefined:
            // TODO: as a contributor it's undefined instead of 'pending'.
            if (!elementor.config.current_user_can_publish) {
              publishLabel = 'update';
            }

            break;
        }

        this.ui.buttonPublishLabel.html(elementor.translate(publishLabel));
      },
      addTooltip: function addTooltip() {
        // Create tooltip on controls
        this.$el.find('.tooltip-target').tipsy({
          // `n` for down, `s` for up
          gravity: 's',
          title: function title() {
            return this.getAttribute('data-tooltip');
          }
        });
      },
      refreshWpPreview: function refreshWpPreview() {
        if (this.previewWindow) {
          // Refresh URL form updated config.
          try {
            this.previewWindow.location = elementor.config.wp_preview.url;
          } catch (e) {// If the this.previewWindow is closed or it's domain was changed.
            // Do nothing.
          }
        }
      }
    });
  }, {}],
  2: [function (require, module, exports) {
    var Module = require('elementor-utils/module');

    module.exports = Module.extend({
      autoSaveTimer: null,
      autosaveInterval: elementor.config.autosave_interval * 1000,
      isSaving: false,
      isChangedDuringSave: false,
      __construct: function __construct() {
        this.setWorkSaver();
      },
      startTimer: function startTimer(hasChanges) {
        clearTimeout(this.autoSaveTimer);

        if (hasChanges) {
          this.autoSaveTimer = window.setTimeout(_.bind(this.doAutoSave, this), this.autosaveInterval);
        }
      },
      saveDraft: function saveDraft() {
        var postStatus = elementor.settings.page.model.get('post_status');

        if (!elementor.saver.isEditorChanged() && 'draft' !== postStatus) {
          return;
        }

        switch (postStatus) {
          case 'publish':
          case 'private':
            this.doAutoSave();
            break;

          default:
            // Update and create a revision
            this.update();
        }
      },
      doAutoSave: function doAutoSave() {
        var editorMode = elementor.channels.dataEditMode.request('activeMode'); // Avoid auto save for Revisions Preview changes.

        if ('edit' !== editorMode) {
          return;
        }

        this.saveAutoSave();
      },
      saveAutoSave: function saveAutoSave(options) {
        if (!this.isEditorChanged()) {
          return;
        }

        options = _.extend({
          status: 'autosave'
        }, options);
        this.saveEditor(options);
      },
      savePending: function savePending(options) {
        options = _.extend({
          status: 'pending'
        }, options);
        this.saveEditor(options);
      },
      discard: function discard() {
        var self = this;
        elementor.ajax.send('discard_changes', {
          data: {
            post_id: elementor.config.post_id
          },
          success: function success() {
            self.setFlagEditorChange(false);
            location.href = elementor.config.exit_to_dashboard_url;
          }
        });
      },
      update: function update(options) {
        options = _.extend({
          status: elementor.settings.page.model.get('post_status')
        }, options);
        this.saveEditor(options);
      },
      publish: function publish(options) {
        options = _.extend({
          status: 'publish'
        }, options);
        this.saveEditor(options);
      },
      setFlagEditorChange: function setFlagEditorChange(status) {
        if (status && this.isSaving) {
          this.isChangedDuringSave = true;
        }

        this.startTimer(status);
        elementor.channels.editor.reply('status', status).trigger('status:change', status);
      },
      isEditorChanged: function isEditorChanged() {
        return true === elementor.channels.editor.request('status');
      },
      setWorkSaver: function setWorkSaver() {
        var self = this;
        elementor.$window.on('beforeunload', function () {
          if (self.isEditorChanged()) {
            return elementor.translate('before_unload_alert');
          }
        });
      },
      saveEditor: function saveEditor(options) {
        if (this.isSaving) {
          return;
        }

        options = _.extend({
          status: 'draft',
          onSuccess: null
        }, options);
        var self = this,
            newData = elementor.elements.toJSON({
          removeDefault: true
        }),
            oldStatus = elementor.settings.page.model.get('post_status'),
            statusChanged = oldStatus !== options.status;
        self.trigger('before:save', options).trigger('before:save:' + options.status, options);
        self.isSaving = true;
        self.isChangedDuringSave = false;
        self.xhr = elementor.ajax.send('save_builder', {
          data: {
            post_id: elementor.config.post_id,
            status: options.status,
            data: JSON.stringify(newData)
          },
          success: function success(data) {
            self.afterAjax();

            if ('autosave' !== options.status) {
              if (statusChanged) {
                elementor.settings.page.model.set('post_status', options.status);
              } // Notice: Must be after update page.model.post_status to the new status.


              if (!self.isChangedDuringSave) {
                self.setFlagEditorChange(false);
              }
            }

            if (data.config) {
              jQuery.extend(true, elementor.config, data.config);
            }

            elementor.config.data = newData;
            elementor.channels.editor.trigger('saved', data);
            self.trigger('after:save', data).trigger('after:save:' + options.status, data);

            if (statusChanged) {
              self.trigger('page:status:change', options.status, oldStatus);
            }

            if (_.isFunction(options.onSuccess)) {
              options.onSuccess.call(this, data);
            }
          },
          error: function error(data) {
            self.afterAjax();
            self.trigger('after:saveError', data).trigger('after:saveError:' + options.status, data);
            var message;

            if (_.isString(data)) {
              message = data;
            } else if (data.statusText) {
              message = elementor.ajax.createErrorMessage(data);

              if (0 === data.readyState) {
                message += ' ' + elementor.translate('saving_disabled');
              }
            } else if (data[0] && data[0].code) {
              message = elementor.translate('server_error') + ' ' + data[0].code;
            }

            elementor.notifications.showToast({
              message: message
            });
          }
        });
        return self.xhr;
      },
      afterAjax: function afterAjax() {
        this.isSaving = false;
        this.xhr = null;
      }
    });
  }, {
    "elementor-utils/module": 125
  }],
  3: [function (require, module, exports) {
    var ViewModule = require('elementor-utils/view-module'),
        SettingsModel = require('elementor-elements/models/base-settings'),
        ControlsCSSParser = require('elementor-editor-utils/controls-css-parser');

    module.exports = ViewModule.extend({
      controlsCSS: null,
      model: null,
      hasChange: false,
      changeCallbacks: {},
      addChangeCallback: function addChangeCallback(attribute, callback) {
        this.changeCallbacks[attribute] = callback;
      },
      bindEvents: function bindEvents() {
        elementor.on('preview:loaded', this.onElementorPreviewLoaded);
        this.model.on('change', this.onModelChange);
      },
      addPanelPage: function addPanelPage() {
        var name = this.getSettings('name');
        elementor.getPanelView().addPage(name + '_settings', {
          view: elementor.settings.panelPages[name] || elementor.settings.panelPages.base,
          title: this.getSettings('panelPage.title'),
          options: {
            model: this.model,
            name: name
          }
        });
      },
      updateStylesheet: function updateStylesheet(keepOldEntries) {
        if (!keepOldEntries) {
          this.controlsCSS.stylesheet.empty();
        }

        this.controlsCSS.addStyleRules(this.model.getStyleControls(), this.model.attributes, this.model.controls, [/{{WRAPPER}}/g], [this.getSettings('cssWrapperSelector')]);
        this.controlsCSS.addStyleToDocument();
      },
      initModel: function initModel() {
        this.model = new SettingsModel(this.getSettings('settings'), {
          controls: this.getSettings('controls')
        });
      },
      initControlsCSSParser: function initControlsCSSParser() {
        this.controlsCSS = new ControlsCSSParser({
          id: this.getSettings('name')
        });
      },
      getDataToSave: function getDataToSave(data) {
        return data;
      },
      save: function save(callback) {
        var self = this;

        if (!self.hasChange) {
          return;
        }

        var settings = this.model.toJSON({
          removeDefault: true
        }),
            data = this.getDataToSave({
          data: JSON.stringify(settings)
        });
        NProgress.start();
        elementor.ajax.send('save_' + this.getSettings('name') + '_settings', {
          data: data,
          success: function success() {
            NProgress.done();
            self.setSettings('settings', settings);
            self.hasChange = false;

            if (callback) {
              callback.apply(self, arguments);
            }
          },
          error: function error() {
            alert('An error occurred');
          }
        });
      },
      addPanelMenuItem: function addPanelMenuItem() {
        var menuSettings = this.getSettings('panelPage.menu');

        if (!menuSettings) {
          return;
        }

        var menuItemOptions = {
          icon: menuSettings.icon,
          title: this.getSettings('panelPage.title'),
          type: 'page',
          pageName: this.getSettings('name') + '_settings'
        };
        elementor.modules.panel.Menu.addItem(menuItemOptions, 'settings', menuSettings.beforeItem);
      },
      onInit: function onInit() {
        this.initModel();
        this.initControlsCSSParser();
        this.addPanelMenuItem();
        this.debounceSave = _.debounce(this.save, 3000);
        ViewModule.prototype.onInit.apply(this, arguments);
      },
      onModelChange: function onModelChange(model) {
        var self = this;
        self.hasChange = true;
        this.controlsCSS.stylesheet.empty();

        _.each(model.changed, function (value, key) {
          if (self.changeCallbacks[key]) {
            self.changeCallbacks[key].call(self, value);
          }
        });

        self.updateStylesheet(true);
        self.debounceSave();
      },
      onElementorPreviewLoaded: function onElementorPreviewLoaded() {
        this.updateStylesheet();
        this.addPanelPage();
      }
    });
  }, {
    "elementor-editor-utils/controls-css-parser": 105,
    "elementor-elements/models/base-settings": 63,
    "elementor-utils/view-module": 126
  }],
  4: [function (require, module, exports) {
    var ControlsStack = require('elementor-views/controls-stack');

    module.exports = ControlsStack.extend({
      id: function id() {
        return 'elementor-panel-' + this.getOption('name') + '-settings';
      },
      getTemplate: function getTemplate() {
        return '#tmpl-elementor-panel-' + this.getOption('name') + '-settings';
      },
      childViewContainer: function childViewContainer() {
        return '#elementor-panel-' + this.getOption('name') + '-settings-controls';
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
  5: [function (require, module, exports) {
    var BaseSettings = require('elementor-editor/components/settings/base/manager');

    module.exports = BaseSettings.extend({
      changeCallbacks: {
        elementor_page_title_selector: function elementor_page_title_selector(newValue) {
          var newSelector = newValue || 'h1.entry-title',
              titleSelectors = elementor.settings.page.model.controls.hide_title.selectors = {};
          titleSelectors[newSelector] = 'display: none';
          elementor.settings.page.updateStylesheet();
        }
      }
    });
  }, {
    "elementor-editor/components/settings/base/manager": 3
  }],
  6: [function (require, module, exports) {
    var BaseSettings = require('elementor-editor/components/settings/base/manager');

    module.exports = BaseSettings.extend({
      changeCallbacks: {
        post_title: function post_title(newValue) {
          var $title = elementorFrontend.getElements('$document').find(elementor.config.page_title_selector);
          $title.text(newValue);
        },
        template: function template() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_sidebar: function _landingpress_hide_sidebar() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_header: function _landingpress_hide_header() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_menu: function _landingpress_hide_menu() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_footerwidgets: function _landingpress_hide_footerwidgets() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_footer: function _landingpress_hide_footer() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_breadcrumb: function _landingpress_hide_breadcrumb() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_title: function _landingpress_hide_title() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_hide_comments: function _landingpress_hide_comments() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_page_width: function _landingpress_page_width() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_page_header_custom: function _landingpress_page_header_custom() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_page_header_elementor: function _landingpress_page_header_elementor() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_page_footer_custom: function _landingpress_page_footer_custom() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        },
        _landingpress_page_footer_elementor: function _landingpress_page_footer_elementor() {
          this.save(function () {
            elementor.reloadPreview();
            elementor.once('preview:loaded', function () {
              elementor.getPanelView().setPage('page_settings');
            });
          });
        }
      },
      bindEvents: function bindEvents() {
        elementor.channels.editor.on('elementor:clearPage', function () {
          elementor.clearPage();
        });
        BaseSettings.prototype.bindEvents.apply(this, arguments);
      },
      getDataToSave: function getDataToSave(data) {
        data.id = elementor.config.post_id;
        return data;
      }
    });
  }, {
    "elementor-editor/components/settings/base/manager": 3
  }],
  7: [function (require, module, exports) {
    var Module = require('elementor-utils/module');

    module.exports = Module.extend({
      modules: {
        base: require('elementor-editor/components/settings/base/manager'),
        general: require('elementor-editor/components/settings/general/manager'),
        page: require('elementor-editor/components/settings/page/manager')
      },
      panelPages: {
        base: require('elementor-editor/components/settings/base/panel')
      },
      onInit: function onInit() {
        this.initSettings();
      },
      initSettings: function initSettings() {
        var self = this;

        _.each(elementor.config.settings, function (config, name) {
          var Manager = self.modules[name] || self.modules.base;
          self[name] = new Manager(config);
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
  8: [function (require, module, exports) {
    var InsertTemplateHandler;
    InsertTemplateHandler = Marionette.Behavior.extend({
      ui: {
        insertButton: '.elementor-template-library-template-insert'
      },
      events: {
        'click @ui.insertButton': 'onInsertButtonClick'
      },
      onInsertButtonClick: function onInsertButtonClick() {
        if (this.view.model.get('hasPageSettings')) {
          InsertTemplateHandler.showImportDialog(this.view.model);
          return;
        }

        elementor.templates.importTemplate(this.view.model);
      }
    }, {
      dialog: null,
      showImportDialog: function showImportDialog(model) {
        var dialog = InsertTemplateHandler.getDialog();

        dialog.onConfirm = function () {
          elementor.templates.importTemplate(model, {
            withPageSettings: true
          });
        };

        dialog.onCancel = function () {
          elementor.templates.importTemplate(model);
        };

        dialog.show();
      },
      initDialog: function initDialog() {
        InsertTemplateHandler.dialog = elementor.dialogsManager.createWidget('confirm', {
          id: 'elementor-insert-template-settings-dialog',
          headerMessage: elementor.translate('import_template_dialog_header'),
          message: elementor.translate('import_template_dialog_message') + '<br>' + elementor.translate('import_template_dialog_message_attention'),
          strings: {
            confirm: elementor.translate('yes'),
            cancel: elementor.translate('no')
          }
        });
      },
      getDialog: function getDialog() {
        if (!InsertTemplateHandler.dialog) {
          InsertTemplateHandler.initDialog();
        }

        return InsertTemplateHandler.dialog;
      }
    });
    module.exports = InsertTemplateHandler;
  }, {}],
  9: [function (require, module, exports) {
    var TemplateLibraryTemplateModel = require('elementor-templates/models/template'),
        TemplateLibraryCollection;

    TemplateLibraryCollection = Backbone.Collection.extend({
      model: TemplateLibraryTemplateModel
    });
    module.exports = TemplateLibraryCollection;
  }, {
    "elementor-templates/models/template": 11
  }],
  10: [function (require, module, exports) {
    var TemplateLibraryLayoutView = require('elementor-templates/views/layout'),
        TemplateLibraryCollection = require('elementor-templates/collections/templates'),
        TemplateLibraryManager;

    TemplateLibraryManager = function TemplateLibraryManager() {
      var self = this,
          modal,
          deleteDialog,
          errorDialog,
          layout,
          config = {},
          startIntent = {},
          templateTypes = {},
          filterTerms = {},
          templatesCollection;

      var initLayout = function initLayout() {
        layout = new TemplateLibraryLayoutView();
      };

      var registerDefaultTemplateTypes = function registerDefaultTemplateTypes() {
        var data = {
          saveDialog: {
            description: elementor.translate('save_your_template_description')
          },
          ajaxParams: {
            success: function success(data) {
              self.getTemplatesCollection().add(data);
              self.setTemplatesSource('local');
            },
            error: function error(data) {
              self.showErrorDialog(data);
            }
          }
        };

        _.each(['page', 'section'], function (type) {
          var safeData = jQuery.extend(true, {}, data, {
            saveDialog: {
              title: elementor.translate('save_your_template', [elementor.translate(type)])
            }
          });
          self.registerTemplateType(type, safeData);
        });
      };

      var registerDefaultFilterTerms = function registerDefaultFilterTerms() {
        filterTerms = {
          text: {
            callback: function callback(value) {
              value = value.toLowerCase();

              if (this.get('title').toLowerCase().indexOf(value) >= 0) {
                return true;
              }

              return _.any(this.get('tags'), function (tag) {
                return tag.toLowerCase().indexOf(value) >= 0;
              });
            }
          },
          favorite: {}
        };
        jQuery.each(startIntent.filters, function (filterName) {
          if (filterTerms[filterName]) {
            jQuery.extend(filterTerms[filterName], this);
          } else {
            filterTerms[filterName] = this;
          }
        });
      };

      this.init = function () {
        registerDefaultTemplateTypes();
        elementor.addBackgroundClickListener('libraryToggleMore', {
          element: '.elementor-template-library-template-more'
        });
      };

      this.getTemplateTypes = function (type) {
        if (type) {
          return templateTypes[type];
        }

        return templateTypes;
      };

      this.registerTemplateType = function (type, data) {
        templateTypes[type] = data;
      };

      this.deleteTemplate = function (templateModel, options) {
        var dialog = self.getDeleteDialog();

        dialog.onConfirm = function () {
          if (options.onConfirm) {
            options.onConfirm();
          }

          elementor.ajax.send('delete_template', {
            data: {
              source: templateModel.get('source'),
              template_id: templateModel.get('template_id')
            },
            success: function success(response) {
              templatesCollection.remove(templateModel, {
                silent: true
              });

              if (options.onSuccess) {
                options.onSuccess(response);
              }
            }
          });
        };

        dialog.show();
      };

      this.importTemplate = function (templateModel, options) {
        options = options || {};
        layout.showLoadingView();
        self.requestTemplateContent(templateModel.get('source'), templateModel.get('template_id'), {
          data: {
            page_settings: options.withPageSettings
          },
          success: function success(data) {
            self.closeModal();
            elementor.channels.data.trigger('template:before:insert', templateModel);
            elementor.sections.currentView.addChildModel(data.content, startIntent.importOptions || {});
            elementor.channels.data.trigger('template:after:insert', templateModel);

            if (options.withPageSettings) {
              elementor.settings.page.model.set(data.page_settings);
            }
          },
          error: function error(data) {
            self.showErrorDialog(data);
          }
        });
      };

      this.saveTemplate = function (type, data) {
        var templateType = templateTypes[type];

        _.extend(data, {
          source: 'local',
          type: type
        });

        if (templateType.prepareSavedData) {
          data = templateType.prepareSavedData(data);
        }

        data.content = JSON.stringify(data.content);
        var ajaxParams = {
          data: data
        };

        if (templateType.ajaxParams) {
          _.extend(ajaxParams, templateType.ajaxParams);
        }

        elementor.ajax.send('save_template', ajaxParams);
      };

      this.requestTemplateContent = function (source, id, ajaxOptions) {
        var options = {
          data: {
            source: source,
            edit_mode: true,
            display: true,
            template_id: id
          }
        };

        if (ajaxOptions) {
          jQuery.extend(true, options, ajaxOptions);
        }

        return elementor.ajax.send('get_template_data', options);
      };

      this.markAsFavorite = function (templateModel, favorite) {
        var options = {
          data: {
            source: templateModel.get('source'),
            template_id: templateModel.get('template_id'),
            favorite: favorite
          }
        };
        return elementor.ajax.send('mark_template_as_favorite', options);
      };

      this.getDeleteDialog = function () {
        if (!deleteDialog) {
          deleteDialog = elementor.dialogsManager.createWidget('confirm', {
            id: 'elementor-template-library-delete-dialog',
            headerMessage: elementor.translate('delete_template'),
            message: elementor.translate('delete_template_confirm'),
            strings: {
              confirm: elementor.translate('delete')
            }
          });
        }

        return deleteDialog;
      };

      this.getErrorDialog = function () {
        if (!errorDialog) {
          errorDialog = elementor.dialogsManager.createWidget('alert', {
            id: 'elementor-template-library-error-dialog',
            headerMessage: elementor.translate('an_error_occurred')
          });
        }

        return errorDialog;
      };

      this.getModal = function () {
        if (!modal) {
          modal = elementor.dialogsManager.createWidget('lightbox', {
            id: 'elementor-template-library-modal',
            closeButton: false,
            hide: {
              onOutsideClick: false
            }
          });
        }

        return modal;
      };

      this.getLayout = function () {
        return layout;
      };

      this.getTemplatesCollection = function () {
        return templatesCollection;
      };

      this.getConfig = function (item) {
        if (item) {
          return config[item];
        }

        return config;
      };

      this.requestLibraryData = function (callback, forceUpdate, forceSync) {
        if (templatesCollection && !forceUpdate) {
          if (callback) {
            callback();
          }

          return;
        }

        var options = {
          data: {},
          success: function success(data) {
            templatesCollection = new TemplateLibraryCollection(data.templates);
            config = data.config;

            if (callback) {
              callback();
            }
          }
        };

        if (forceSync) {
          options.data.sync = true;
        }

        elementor.ajax.send('get_library_data', options);
      };

      this.startModal = function (customStartIntent) {
        startIntent = customStartIntent || {};
        registerDefaultFilterTerms();
        self.getModal().show();
        self.setTemplatesSource('landingpresssections', true);

        if (!layout) {
          initLayout();
        }

        layout.showLoadingView();
        self.requestLibraryData(function () {
          if (startIntent.onReady) {
            startIntent.onReady();
          }
        });
      };

      this.closeModal = function () {
        self.getModal().hide();
      };

      this.getFilter = function (name) {
        return elementor.channels.templates.request('filter:' + name);
      };

      this.setFilter = function (name, value, silent) {
        elementor.channels.templates.reply('filter:' + name, value);

        if (!silent) {
          elementor.channels.templates.trigger('filter:change');
        }
      };

      this.getFilterTerms = function (termName) {
        if (termName) {
          return filterTerms[termName];
        }

        return filterTerms;
      };

      this.setTemplatesSource = function (source, silent) {
        elementor.channels.templates.stopReplying();
        self.setFilter('source', source);

        if (!silent) {
          self.showTemplates();
        }
      };

      this.showTemplates = function () {
        var activeSource = self.getFilter('source');
        var templatesToShow = templatesCollection.filter(function (model) {
          if (activeSource !== model.get('source')) {
            return false;
          }

          var typeInfo = templateTypes[model.get('type')];
          return !typeInfo || false !== typeInfo.showInLibrary;
        });
        layout.showTemplatesView(new TemplateLibraryCollection(templatesToShow));
      };

      this.showTemplatesModal = function () {
        self.startModal({
          onReady: self.showTemplates
        });
      };

      this.showErrorDialog = function (errorMessage) {
        if ('object' === _typeof(errorMessage)) {
          var message = '';

          _.each(errorMessage, function (error) {
            message += '<div>' + error.message + '.</div>';
          });

          errorMessage = message;
        } else if (errorMessage) {
          errorMessage += '.';
        } else {
          errorMessage = '<i>&#60;The error message is empty&#62;</i>';
        }

        self.getErrorDialog().setMessage(elementor.translate('templates_request_error') + '<div id="elementor-template-library-error-info">' + errorMessage + '</div>').show();
      };
    };

    module.exports = new TemplateLibraryManager();
  }, {
    "elementor-templates/collections/templates": 9,
    "elementor-templates/views/layout": 12
  }],
  11: [function (require, module, exports) {
    var TemplateLibraryTemplateModel;
    TemplateLibraryTemplateModel = Backbone.Model.extend({
      defaults: {
        template_id: 0,
        title: '',
        source: '',
        type: '',
        author: '',
        thumbnail: '',
        url: '',
        export_link: '',
        tags: []
      }
    });
    module.exports = TemplateLibraryTemplateModel;
  }, {}],
  12: [function (require, module, exports) {
    var TemplateLibraryHeaderView = require('elementor-templates/views/parts/header'),
        TemplateLibraryHeaderLogoView = require('elementor-templates/views/parts/header-parts/logo'),
        TemplateLibraryHeaderActionsView = require('elementor-templates/views/parts/header-parts/actions'),
        TemplateLibraryHeaderMenuView = require('elementor-templates/views/parts/header-parts/menu'),
        TemplateLibraryHeaderPreviewView = require('elementor-templates/views/parts/header-parts/preview'),
        TemplateLibraryHeaderBackView = require('elementor-templates/views/parts/header-parts/back'),
        TemplateLibraryLoadingView = require('elementor-templates/views/parts/loading'),
        TemplateLibraryCollectionView = require('elementor-templates/views/parts/templates'),
        TemplateLibrarySaveTemplateView = require('elementor-templates/views/parts/save-template'),
        TemplateLibraryImportView = require('elementor-templates/views/parts/import'),
        TemplateLibraryPreviewView = require('elementor-templates/views/parts/preview'),
        TemplateLibraryLayoutView;

    TemplateLibraryLayoutView = Marionette.LayoutView.extend({
      el: '#elementor-template-library-modal',
      regions: {
        modalContent: '.dialog-message',
        modalHeader: '.dialog-widget-header'
      },
      initialize: function initialize() {
        this.getRegion('modalHeader').show(new TemplateLibraryHeaderView());
      },
      getHeaderView: function getHeaderView() {
        return this.getRegion('modalHeader').currentView;
      },
      getTemplateActionButton: function getTemplateActionButton(templateData) {
        var viewId = '#tmpl-elementor-template-library-' + (templateData.isPro ? 'get-pro-button' : 'insert-button');
        viewId = elementor.hooks.applyFilters('elementor/editor/template-library/template/action-button', viewId, templateData);
        var template = Marionette.TemplateCache.get(viewId);
        return Marionette.Renderer.render(template);
      },
      showLoadingView: function showLoadingView() {
        this.modalContent.show(new TemplateLibraryLoadingView());
      },
      showTemplatesView: function showTemplatesView(templatesCollection) {
        this.modalContent.show(new TemplateLibraryCollectionView({
          collection: templatesCollection
        }));
        var headerView = this.getHeaderView();
        headerView.tools.show(new TemplateLibraryHeaderActionsView());
        headerView.menuArea.show(new TemplateLibraryHeaderMenuView());
        headerView.logoArea.show(new TemplateLibraryHeaderLogoView());
      },
      showImportView: function showImportView() {
        this.getHeaderView().menuArea.reset();
        this.modalContent.show(new TemplateLibraryImportView());
      },
      showSaveTemplateView: function showSaveTemplateView(elementModel) {
        this.getHeaderView().menuArea.reset();
        this.modalContent.show(new TemplateLibrarySaveTemplateView({
          model: elementModel
        }));
      },
      showPreviewView: function showPreviewView(templateModel) {
        this.modalContent.show(new TemplateLibraryPreviewView({
          url: templateModel.get('url')
        }));
        var headerView = this.getHeaderView();
        headerView.menuArea.reset();
        headerView.tools.show(new TemplateLibraryHeaderPreviewView({
          model: templateModel
        }));
        headerView.logoArea.show(new TemplateLibraryHeaderBackView());
      }
    });
    module.exports = TemplateLibraryLayoutView;
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
  13: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-template-library-header-actions',
      id: 'elementor-template-library-header-actions',
      ui: {
        'import': '#elementor-template-library-header-import i',
        sync: '#elementor-template-library-header-sync i',
        save: '#elementor-template-library-header-save i'
      },
      events: {
        'click @ui.import': 'onImportClick',
        'click @ui.sync': 'onSyncClick',
        'click @ui.save': 'onSaveClick'
      },
      onImportClick: function onImportClick() {
        elementor.templates.getLayout().showImportView();
      },
      onSyncClick: function onSyncClick() {
        var self = this;
        self.ui.sync.addClass('eicon-animation-spin');
        elementor.templates.requestLibraryData(function () {
          self.ui.sync.removeClass('eicon-animation-spin');
          elementor.templates.setTemplatesSource(elementor.templates.getFilter('source'));
        }, true, true);
      },
      onSaveClick: function onSaveClick() {
        elementor.templates.getLayout().showSaveTemplateView();
      }
    });
  }, {}],
  14: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-template-library-header-back',
      id: 'elementor-template-library-header-preview-back',
      events: {
        'click': 'onClick'
      },
      onClick: function onClick() {
        elementor.templates.showTemplates();
      }
    });
  }, {}],
  15: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-template-library-header-logo',
      id: 'elementor-template-library-header-logo',
      events: {
        'click': 'onClick'
      },
      onClick: function onClick() {
        elementor.templates.setTemplatesSource('remote');
      }
    });
  }, {}],
  16: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      options: {
        activeClass: 'elementor-active'
      },
      template: '#tmpl-elementor-template-library-header-menu',
      id: 'elementor-template-library-header-menu',
      ui: {
        menuItems: '.elementor-template-library-menu-item'
      },
      events: {
        'click @ui.menuItems': 'onMenuItemClick'
      },
      $activeItem: null,
      activateMenuItem: function activateMenuItem($item) {
        var activeClass = this.getOption('activeClass');

        if (this.$activeItem === $item) {
          return;
        }

        if (this.$activeItem) {
          this.$activeItem.removeClass(activeClass);
        }

        $item.addClass(activeClass);
        this.$activeItem = $item;
      },
      onRender: function onRender() {
        var currentSource = elementor.templates.getFilter('source'),
            $sourceItem = this.ui.menuItems.filter('[data-template-source="' + currentSource + '"]');
        this.activateMenuItem($sourceItem);
      },
      onMenuItemClick: function onMenuItemClick(event) {
        var item = event.currentTarget;
        this.activateMenuItem(jQuery(item));
        elementor.templates.setTemplatesSource(item.dataset.templateSource);
      }
    });
  }, {}],
  17: [function (require, module, exports) {
    var TemplateLibraryInsertTemplateBehavior = require('elementor-templates/behaviors/insert-template');

    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-template-library-header-preview',
      id: 'elementor-template-library-header-preview',
      behaviors: {
        insertTemplate: {
          behaviorClass: TemplateLibraryInsertTemplateBehavior
        }
      }
    });
  }, {
    "elementor-templates/behaviors/insert-template": 8
  }],
  18: [function (require, module, exports) {
    var TemplateLibraryHeaderView;
    TemplateLibraryHeaderView = Marionette.LayoutView.extend({
      id: 'elementor-template-library-header',
      template: '#tmpl-elementor-template-library-header',
      regions: {
        logoArea: '#elementor-template-library-header-logo-area',
        tools: '#elementor-template-library-header-tools',
        menuArea: '#elementor-template-library-header-menu-area'
      },
      ui: {
        closeModal: '#elementor-template-library-header-close-modal'
      },
      events: {
        'click @ui.closeModal': 'onCloseModalClick'
      },
      onCloseModalClick: function onCloseModalClick() {
        elementor.templates.closeModal();
      }
    });
    module.exports = TemplateLibraryHeaderView;
  }, {}],
  19: [function (require, module, exports) {
    var TemplateLibraryImportView;
    TemplateLibraryImportView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-template-library-import',
      id: 'elementor-template-library-import',
      ui: {
        uploadForm: '#elementor-template-library-import-form',
        fileInput: '#elementor-template-library-import-form-input'
      },
      events: {
        'change @ui.fileInput': 'onFileInputChange'
      },
      droppedFiles: null,
      submitForm: function submitForm() {
        var layout = elementor.templates.getLayout(),
            data = new FormData();

        if (this.droppedFiles) {
          data.append('file', this.droppedFiles[0]);
          this.droppedFiles = null;
        } else {
          data.append('file', this.ui.fileInput[0].files[0]);
          this.ui.uploadForm[0].reset();
        }

        var options = {
          data: data,
          processData: false,
          contentType: false,
          success: function success(data) {
            elementor.templates.getTemplatesCollection().add(data);
            elementor.templates.setTemplatesSource('local');
          },
          error: function error(data) {
            elementor.templates.showErrorDialog(data);
            layout.showImportView();
          }
        };
        elementor.ajax.send('import_template', options);
        layout.showLoadingView();
      },
      onRender: function onRender() {
        this.ui.uploadForm.on({
          'drag dragstart dragend dragover dragenter dragleave drop': this.onFormActions.bind(this),
          dragenter: this.onFormDragEnter.bind(this),
          'dragleave drop': this.onFormDragLeave.bind(this),
          drop: this.onFormDrop.bind(this)
        });
      },
      onFormActions: function onFormActions(event) {
        event.preventDefault();
        event.stopPropagation();
      },
      onFormDragEnter: function onFormDragEnter() {
        this.ui.uploadForm.addClass('elementor-drag-over');
      },
      onFormDragLeave: function onFormDragLeave(event) {
        if (jQuery(event.relatedTarget).closest(this.ui.uploadForm).length) {
          return;
        }

        this.ui.uploadForm.removeClass('elementor-drag-over');
      },
      onFormDrop: function onFormDrop(event) {
        this.droppedFiles = event.originalEvent.dataTransfer.files;
        this.submitForm();
      },
      onFileInputChange: function onFileInputChange() {
        this.submitForm();
      }
    });
    module.exports = TemplateLibraryImportView;
  }, {}],
  20: [function (require, module, exports) {
    var TemplateLibraryLoadingView;
    TemplateLibraryLoadingView = Marionette.ItemView.extend({
      id: 'elementor-template-library-loading',
      template: '#tmpl-elementor-template-library-loading'
    });
    module.exports = TemplateLibraryLoadingView;
  }, {}],
  21: [function (require, module, exports) {
    var TemplateLibraryPreviewView;
    TemplateLibraryPreviewView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-template-library-preview',
      id: 'elementor-template-library-preview',
      ui: {
        iframe: '> iframe'
      },
      onRender: function onRender() {
        this.ui.iframe.attr('src', this.getOption('url'));
      }
    });
    module.exports = TemplateLibraryPreviewView;
  }, {}],
  22: [function (require, module, exports) {
    var TemplateLibrarySaveTemplateView;
    TemplateLibrarySaveTemplateView = Marionette.ItemView.extend({
      id: 'elementor-template-library-save-template',
      template: '#tmpl-elementor-template-library-save-template',
      ui: {
        form: '#elementor-template-library-save-template-form',
        submitButton: '#elementor-template-library-save-template-submit'
      },
      events: {
        'submit @ui.form': 'onFormSubmit'
      },
      getSaveType: function getSaveType() {
        return this.model ? this.model.get('elType') : 'page';
      },
      templateHelpers: function templateHelpers() {
        var saveType = this.getSaveType(),
            templateType = elementor.templates.getTemplateTypes(saveType);
        return templateType.saveDialog;
      },
      onFormSubmit: function onFormSubmit(event) {
        event.preventDefault();
        var formData = this.ui.form.elementorSerializeObject(),
            saveType = this.model ? this.model.get('elType') : 'page',
            JSONParams = {
          removeDefault: true
        };
        formData.content = this.model ? [this.model.toJSON(JSONParams)] : elementor.elements.toJSON(JSONParams);
        this.ui.submitButton.addClass('elementor-button-state');
        elementor.templates.saveTemplate(saveType, formData);
      }
    });
    module.exports = TemplateLibrarySaveTemplateView;
  }, {}],
  23: [function (require, module, exports) {
    var TemplateLibraryTemplatesEmptyView;
    TemplateLibraryTemplatesEmptyView = Marionette.ItemView.extend({
      id: 'elementor-template-library-templates-empty',
      template: '#tmpl-elementor-template-library-templates-empty',
      ui: {
        title: '.elementor-template-library-blank-title',
        message: '.elementor-template-library-blank-message'
      },
      modesStrings: {
        empty: {
          title: elementor.translate('templates_empty_title'),
          message: elementor.translate('templates_empty_message')
        },
        noResults: {
          title: elementor.translate('templates_no_results_title'),
          message: elementor.translate('templates_no_results_message')
        },
        noFavorites: {
          title: elementor.translate('templates_no_favorites_title'),
          message: elementor.translate('templates_no_favorites_message')
        }
      },
      getCurrentMode: function getCurrentMode() {
        if (elementor.templates.getFilter('text')) {
          return 'noResults';
        }

        if (elementor.templates.getFilter('favorite')) {
          return 'noFavorites';
        }

        return 'empty';
      },
      onRender: function onRender() {
        var modeStrings = this.modesStrings[this.getCurrentMode()];
        this.ui.title.html(modeStrings.title);
        this.ui.message.html(modeStrings.message);
      }
    });
    module.exports = TemplateLibraryTemplatesEmptyView;
  }, {}],
  24: [function (require, module, exports) {
    var TemplateLibraryTemplateLocalView = require('elementor-templates/views/template/local'),
        TemplateLibraryTemplateRemoteView = require('elementor-templates/views/template/remote'),
        TemplateLibraryTemplateLandingPressTemplatesView = require('elementor-templates/views/template/landingpresstemplates'),
        TemplateLibraryTemplateLandingPressSectionsView = require('elementor-templates/views/template/landingpresssections'),
        TemplateLibraryCollectionView;

    TemplateLibraryCollectionView = Marionette.CompositeView.extend({
      template: '#tmpl-elementor-template-library-templates',
      id: 'elementor-template-library-templates',
      childViewContainer: '#elementor-template-library-templates-container',
      reorderOnSort: true,
      emptyView: function emptyView() {
        var EmptyView = require('elementor-templates/views/parts/templates-empty');

        return new EmptyView();
      },
      ui: {
        filterText: '#elementor-template-library-filter-text',
        myFavoritesFilter: '#elementor-template-library-filter-my-favorites',
        orderInputs: '.elementor-template-library-order-input',
        orderLabels: '.elementor-template-library-order-label'
      },
      events: {
        'input @ui.filterText': 'onFilterTextInput',
        'change @ui.myFavoritesFilter': 'onMyFavoritesFilterChange',
        'mousedown @ui.orderLabels': 'onOrderLabelsClick'
      },
      comparators: {
        title: function title(model) {
          return model.get('title').toLowerCase();
        },
        popularityIndex: function popularityIndex(model) {
          var popularityIndex = model.get('popularityIndex');

          if (!popularityIndex) {
            popularityIndex = model.get('date');
          }

          return -popularityIndex;
        },
        trendIndex: function trendIndex(model) {
          var trendIndex = model.get('trendIndex');

          if (!trendIndex) {
            trendIndex = model.get('date');
          }

          return -trendIndex;
        }
      },
      getChildView: function getChildView(childModel) {
        if ('remote' === childModel.get('source')) {
          return TemplateLibraryTemplateRemoteView;
        } else if ('landingpresstemplates' === childModel.get('source')) {
          return TemplateLibraryTemplateLandingPressTemplatesView;
        } else if ('landingpresssections' === childModel.get('source')) {
          return TemplateLibraryTemplateLandingPressSectionsView;
        }

        return TemplateLibraryTemplateLocalView;
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.templates, 'filter:change', this._renderChildren);
      },
      filter: function filter(childModel) {
        var filterTerms = elementor.templates.getFilterTerms(),
            passingFilter = true;
        jQuery.each(filterTerms, function (filterTermName) {
          var filterValue = this.value || elementor.templates.getFilter(filterTermName);

          if (!filterValue) {
            return;
          }

          if (this.callback) {
            var callbackResult = this.callback.call(childModel, filterValue);

            if (!callbackResult) {
              passingFilter = false;
            }

            return callbackResult;
          }

          var filterResult = filterValue === childModel.get(filterTermName);

          if (!filterResult) {
            passingFilter = false;
          }

          return filterResult;
        });
        return passingFilter;
      },
      order: function order(by, reverseOrder) {
        var comparator = this.comparators[by] || by;

        if (reverseOrder) {
          comparator = this.reverseOrder(comparator);
        }

        this.collection.comparator = comparator;
        this.collection.sort();
      },
      reverseOrder: function reverseOrder(comparator) {
        if ('function' !== typeof comparator) {
          var comparatorValue = comparator;

          comparator = function comparator(model) {
            return model.get(comparatorValue);
          };
        }

        return function (left, right) {
          var l = comparator(left),
              r = comparator(right);

          if (undefined === l) {
            return -1;
          }

          if (undefined === r) {
            return 1;
          }

          return l < r ? 1 : l > r ? -1 : 0;
        };
      },
      addSourceData: function addSourceData() {
        var isEmpty = this.children.isEmpty();
        this.$el.attr('data-template-source', isEmpty ? 'empty' : elementor.templates.getFilter('source'));
      },
      toggleFilterClass: function toggleFilterClass() {
        this.$el.toggleClass('elementor-templates-filter-active', !!(elementor.templates.getFilter('text') || elementor.templates.getFilter('favorite')));
      },
      onRenderCollection: function onRenderCollection() {
        this.addSourceData();
        this.toggleFilterClass();
      },
      onBeforeRenderEmpty: function onBeforeRenderEmpty() {
        this.addSourceData();
      },
      onFilterTextInput: function onFilterTextInput() {
        elementor.templates.setFilter('text', this.ui.filterText.val());
      },
      onMyFavoritesFilterChange: function onMyFavoritesFilterChange() {
        elementor.templates.setFilter('favorite', this.ui.myFavoritesFilter[0].checked);
      },
      onOrderLabelsClick: function onOrderLabelsClick(event) {
        var $clickedInput = jQuery(event.currentTarget.control),
            toggle;

        if (!$clickedInput[0].checked) {
          toggle = 'asc' !== $clickedInput.data('default-ordering-direction');
        }

        $clickedInput.toggleClass('elementor-template-library-order-reverse', toggle);
        this.order($clickedInput.val(), $clickedInput.hasClass('elementor-template-library-order-reverse'));
      }
    });
    module.exports = TemplateLibraryCollectionView;
  }, {
    "elementor-templates/views/parts/templates-empty": 23,
    "elementor-templates/views/template/landingpresssections": 26,
    "elementor-templates/views/template/landingpresstemplates": 27,
    "elementor-templates/views/template/local": 28,
    "elementor-templates/views/template/remote": 29
  }],
  25: [function (require, module, exports) {
    var TemplateLibraryInsertTemplateBehavior = require('elementor-templates/behaviors/insert-template'),
        TemplateLibraryTemplateView;

    TemplateLibraryTemplateView = Marionette.ItemView.extend({
      className: function className() {
        var classes = 'elementor-template-library-template elementor-template-library-template-' + this.model.get('source');

        if (this.model.get('isPro')) {
          classes += ' elementor-template-library-pro-template';
        }

        return classes;
      },
      ui: function ui() {
        return {
          previewButton: '.elementor-template-library-template-preview'
        };
      },
      events: function events() {
        return {
          'click @ui.previewButton': 'onPreviewButtonClick'
        };
      },
      behaviors: {
        insertTemplate: {
          behaviorClass: TemplateLibraryInsertTemplateBehavior
        }
      }
    });
    module.exports = TemplateLibraryTemplateView;
  }, {
    "elementor-templates/behaviors/insert-template": 8
  }],
  26: [function (require, module, exports) {
    var TemplateLibraryTemplateView = require('elementor-templates/views/template/base'),
        TemplateLibraryTemplateLandingPressSectionsView;

    TemplateLibraryTemplateLandingPressSectionsView = TemplateLibraryTemplateView.extend({
      template: '#tmpl-elementor-template-library-template-landingpresssections',
      ui: function ui() {
        return jQuery.extend(TemplateLibraryTemplateView.prototype.ui.apply(this, arguments), {
          favoriteCheckbox: '.elementor-template-library-template-favorite-input'
        });
      },
      events: function events() {
        return jQuery.extend(TemplateLibraryTemplateView.prototype.events.apply(this, arguments), {
          'change @ui.favoriteCheckbox': 'onFavoriteCheckboxChange'
        });
      },
      onPreviewButtonClick: function onPreviewButtonClick() {
        elementor.templates.getLayout().showPreviewView(this.model);
      },
      onFavoriteCheckboxChange: function onFavoriteCheckboxChange() {
        var isFavorite = this.ui.favoriteCheckbox[0].checked;
        this.model.set('favorite', isFavorite);
        elementor.templates.markAsFavorite(this.model, isFavorite);

        if (!isFavorite && elementor.templates.getFilter('favorite')) {
          elementor.channels.templates.trigger('filter:change');
        }
      }
    });
    module.exports = TemplateLibraryTemplateLandingPressSectionsView;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  27: [function (require, module, exports) {
    var TemplateLibraryTemplateView = require('elementor-templates/views/template/base'),
        TemplateLibraryTemplateLandingPressTemplatesView;

    TemplateLibraryTemplateLandingPressTemplatesView = TemplateLibraryTemplateView.extend({
      template: '#tmpl-elementor-template-library-template-landingpresstemplates',
      ui: function ui() {
        return jQuery.extend(TemplateLibraryTemplateView.prototype.ui.apply(this, arguments), {
          favoriteCheckbox: '.elementor-template-library-template-favorite-input'
        });
      },
      events: function events() {
        return jQuery.extend(TemplateLibraryTemplateView.prototype.events.apply(this, arguments), {
          'change @ui.favoriteCheckbox': 'onFavoriteCheckboxChange'
        });
      },
      onPreviewButtonClick: function onPreviewButtonClick() {
        elementor.templates.getLayout().showPreviewView(this.model);
      },
      onFavoriteCheckboxChange: function onFavoriteCheckboxChange() {
        var isFavorite = this.ui.favoriteCheckbox[0].checked;
        this.model.set('favorite', isFavorite);
        elementor.templates.markAsFavorite(this.model, isFavorite);

        if (!isFavorite && elementor.templates.getFilter('favorite')) {
          elementor.channels.templates.trigger('filter:change');
        }
      }
    });
    module.exports = TemplateLibraryTemplateLandingPressTemplatesView;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  28: [function (require, module, exports) {
    var TemplateLibraryTemplateView = require('elementor-templates/views/template/base'),
        TemplateLibraryTemplateLocalView;

    TemplateLibraryTemplateLocalView = TemplateLibraryTemplateView.extend({
      template: '#tmpl-elementor-template-library-template-local',
      ui: function ui() {
        return _.extend(TemplateLibraryTemplateView.prototype.ui.apply(this, arguments), {
          deleteButton: '.elementor-template-library-template-delete',
          morePopup: '.elementor-template-library-template-more',
          toggleMore: '.elementor-template-library-template-more-toggle',
          toggleMoreIcon: '.elementor-template-library-template-more-toggle i'
        });
      },
      events: function events() {
        return _.extend(TemplateLibraryTemplateView.prototype.events.apply(this, arguments), {
          'click @ui.deleteButton': 'onDeleteButtonClick',
          'click @ui.toggleMore': 'onToggleMoreClick'
        });
      },
      onDeleteButtonClick: function onDeleteButtonClick() {
        var toggleMoreIcon = this.ui.toggleMoreIcon;
        elementor.templates.deleteTemplate(this.model, {
          onConfirm: function onConfirm() {
            toggleMoreIcon.removeClass('eicon-ellipsis-h').addClass('fa fa-circle-o-notch fa-spin');
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
        open(this.model.get('url'), '_blank');
      }
    });
    module.exports = TemplateLibraryTemplateLocalView;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  29: [function (require, module, exports) {
    var TemplateLibraryTemplateView = require('elementor-templates/views/template/base'),
        TemplateLibraryTemplateRemoteView;

    TemplateLibraryTemplateRemoteView = TemplateLibraryTemplateView.extend({
      template: '#tmpl-elementor-template-library-template-remote',
      ui: function ui() {
        return jQuery.extend(TemplateLibraryTemplateView.prototype.ui.apply(this, arguments), {
          favoriteCheckbox: '.elementor-template-library-template-favorite-input'
        });
      },
      events: function events() {
        return jQuery.extend(TemplateLibraryTemplateView.prototype.events.apply(this, arguments), {
          'change @ui.favoriteCheckbox': 'onFavoriteCheckboxChange'
        });
      },
      onPreviewButtonClick: function onPreviewButtonClick() {
        elementor.templates.getLayout().showPreviewView(this.model);
      },
      onFavoriteCheckboxChange: function onFavoriteCheckboxChange() {
        var isFavorite = this.ui.favoriteCheckbox[0].checked;
        this.model.set('favorite', isFavorite);
        elementor.templates.markAsFavorite(this.model, isFavorite);

        if (!isFavorite && elementor.templates.getFilter('favorite')) {
          elementor.channels.templates.trigger('filter:change');
        }
      }
    });
    module.exports = TemplateLibraryTemplateRemoteView;
  }, {
    "elementor-templates/views/template/base": 25
  }],
  30: [function (require, module, exports) {
    var Module = require('elementor-utils/module'),
        Validator;

    Validator = Module.extend({
      errors: [],
      __construct: function __construct(settings) {
        var customValidationMethod = settings.customValidationMethod;

        if (customValidationMethod) {
          this.validationMethod = customValidationMethod;
        }
      },
      getDefaultSettings: function getDefaultSettings() {
        return {
          validationTerms: {}
        };
      },
      isValid: function isValid() {
        var validationErrors = this.validationMethod.apply(this, arguments);

        if (validationErrors.length) {
          this.errors = validationErrors;
          return false;
        }

        return true;
      },
      validationMethod: function validationMethod(newValue) {
        var validationTerms = this.getSettings('validationTerms'),
            errors = [];

        if (validationTerms.required) {
          if (!('' + newValue).length) {
            errors.push('Required value is empty');
          }
        }

        return errors;
      }
    });
    module.exports = Validator;
  }, {
    "elementor-utils/module": 125
  }],
  31: [function (require, module, exports) {
    var Validator = require('elementor-validator/base');

    module.exports = Validator.extend({
      validationMethod: function validationMethod(newValue) {
        var validationTerms = this.getSettings('validationTerms'),
            errors = [];

        if (_.isFinite(newValue)) {
          if (undefined !== validationTerms.min && newValue < validationTerms.min) {
            errors.push('Value is less than minimum');
          }

          if (undefined !== validationTerms.max && newValue > validationTerms.max) {
            errors.push('Value is greater than maximum');
          }
        }

        return errors;
      }
    });
  }, {
    "elementor-validator/base": 30
  }],
  32: [function (require, module, exports) {
    var ControlBaseView = require('elementor-controls/base'),
        Validator = require('elementor-validator/base'),
        ControlBaseDataView;

    ControlBaseDataView = ControlBaseView.extend({
      ui: function ui() {
        var ui = ControlBaseView.prototype.ui.apply(this, arguments);

        _.extend(ui, {
          input: 'input[data-setting][type!="checkbox"][type!="radio"]',
          checkbox: 'input[data-setting][type="checkbox"]',
          radio: 'input[data-setting][type="radio"]',
          select: 'select[data-setting]',
          textarea: 'textarea[data-setting]',
          responsiveSwitchers: '.elementor-responsive-switcher'
        });

        return ui;
      },
      templateHelpers: function templateHelpers() {
        var controlData = ControlBaseView.prototype.templateHelpers.apply(this, arguments);
        controlData.data.controlValue = this.getControlValue();
        return controlData;
      },
      events: function events() {
        return {
          'input @ui.input': 'onBaseInputChange',
          'change @ui.checkbox': 'onBaseInputChange',
          'change @ui.radio': 'onBaseInputChange',
          'input @ui.textarea': 'onBaseInputChange',
          'change @ui.select': 'onBaseInputChange',
          'click @ui.responsiveSwitchers': 'onSwitcherClick'
        };
      },
      initialize: function initialize(options) {
        ControlBaseView.prototype.initialize.apply(this, arguments);
        this.registerValidators();
        this.listenTo(this.elementSettingsModel, 'change:external:' + this.model.get('name'), this.onSettingsExternalChange);
      },
      getControlValue: function getControlValue() {
        return this.elementSettingsModel.get(this.model.get('name'));
      },
      setValue: function setValue(value) {
        this.setSettingsModel(value);
      },
      setSettingsModel: function setSettingsModel(value) {
        this.elementSettingsModel.set(this.model.get('name'), value);
        this.triggerMethod('settings:change');
      },
      applySavedValue: function applySavedValue() {
        this.setInputValue('[data-setting="' + this.model.get('name') + '"]', this.getControlValue());
      },
      getEditSettings: function getEditSettings(setting) {
        var settings = this.getOption('elementEditSettings').toJSON();

        if (setting) {
          return settings[setting];
        }

        return settings;
      },
      setEditSetting: function setEditSetting(settingKey, settingValue) {
        var settings = this.getOption('elementEditSettings');
        settings.set(settingKey, settingValue);
      },
      getInputValue: function getInputValue(input) {
        var $input = this.$(input),
            inputValue = $input.val(),
            inputType = $input.attr('type');

        if (-1 !== ['radio', 'checkbox'].indexOf(inputType)) {
          return $input.prop('checked') ? inputValue : '';
        }

        if ('number' === inputType && _.isFinite(inputValue)) {
          return +inputValue;
        } // Temp fix for jQuery (< 3.0) that return null instead of empty array


        if ('SELECT' === input.tagName && $input.prop('multiple') && null === inputValue) {
          inputValue = [];
        }

        return inputValue;
      },
      setInputValue: function setInputValue(input, value) {
        var $input = this.$(input),
            inputType = $input.attr('type');

        if ('checkbox' === inputType) {
          $input.prop('checked', !!value);
        } else if ('radio' === inputType) {
          $input.filter('[value="' + value + '"]').prop('checked', true);
        } else {
          $input.val(value);
        }
      },
      addValidator: function addValidator(validator) {
        this.validators.push(validator);
      },
      registerValidators: function registerValidators() {
        this.validators = [];
        var validationTerms = {};

        if (this.model.get('required')) {
          validationTerms.required = true;
        }

        if (!jQuery.isEmptyObject(validationTerms)) {
          this.addValidator(new Validator({
            validationTerms: validationTerms
          }));
        }
      },
      onSettingsError: function onSettingsError() {
        this.$el.addClass('elementor-error');
      },
      onSettingsChange: function onSettingsChange() {
        this.$el.removeClass('elementor-error');
      },
      onRender: function onRender() {
        ControlBaseView.prototype.onRender.apply(this, arguments);
        this.applySavedValue();
        this.renderResponsiveSwitchers();
        this.triggerMethod('ready');
        this.toggleControlVisibility();
        this.addTooltip();
      },
      onBaseInputChange: function onBaseInputChange(event) {
        clearTimeout(this.correctionTimeout);
        var input = event.currentTarget,
            value = this.getInputValue(input),
            validators = this.validators.slice(0),
            settingsValidators = this.elementSettingsModel.validators[this.model.get('name')];

        if (settingsValidators) {
          validators = validators.concat(settingsValidators);
        }

        if (validators) {
          var oldValue = this.getControlValue(input.dataset.setting);
          var isValidValue = validators.every(function (validator) {
            return validator.isValid(value, oldValue);
          });

          if (!isValidValue) {
            this.correctionTimeout = setTimeout(this.setInputValue.bind(this, input, oldValue), 1200);
            return;
          }
        }

        this.updateElementModel(value, input);
        this.triggerMethod('input:change', event);
      },
      onSwitcherClick: function onSwitcherClick(event) {
        var device = jQuery(event.currentTarget).data('device');
        elementor.changeDeviceMode(device);
        this.triggerMethod('responsive:switcher:click', device);
      },
      onSettingsExternalChange: function onSettingsExternalChange() {
        this.applySavedValue();
        this.triggerMethod('after:external:change');
      },
      renderResponsiveSwitchers: function renderResponsiveSwitchers() {
        if (_.isEmpty(this.model.get('responsive'))) {
          return;
        }

        var templateHtml = Marionette.Renderer.render('#tmpl-elementor-control-responsive-switchers', this.model.attributes);
        this.ui.controlTitle.after(templateHtml);
      },
      onAfterExternalChange: function onAfterExternalChange() {
        this.hideTooltip();
        this.render();
      },
      addTooltip: function addTooltip() {
        // Create tooltip on controls
        this.$('.tooltip-target').tipsy({
          gravity: function gravity() {
            // `n` for down, `s` for up
            var gravity = jQuery(this).data('tooltip-pos');

            if (undefined !== gravity) {
              return gravity;
            } else {
              return 'n';
            }
          },
          title: function title() {
            return this.getAttribute('data-tooltip');
          }
        });
      },
      hideTooltip: function hideTooltip() {
        jQuery('.tipsy').hide();
      },
      updateElementModel: function updateElementModel(value) {
        this.setValue(value);
      }
    }, {
      // Static methods
      getStyleValue: function getStyleValue(placeholder, controlValue) {
        return controlValue;
      }
    });
    module.exports = ControlBaseDataView;
  }, {
    "elementor-controls/base": 35,
    "elementor-validator/base": 30
  }],
  33: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlBaseMultipleItemView;

    ControlBaseMultipleItemView = ControlBaseDataView.extend({
      applySavedValue: function applySavedValue() {
        var values = this.getControlValue(),
            $inputs = this.$('[data-setting]'),
            self = this;

        _.each(values, function (value, key) {
          var $input = $inputs.filter(function () {
            return key === this.dataset.setting;
          });
          self.setInputValue($input, value);
        });
      },
      getControlValue: function getControlValue(key) {
        var values = this.elementSettingsModel.get(this.model.get('name'));

        if (!jQuery.isPlainObject(values)) {
          return {};
        }

        if (key) {
          var value = values[key];

          if (undefined === value) {
            value = '';
          }

          return value;
        }

        return elementor.helpers.cloneObject(values);
      },
      setValue: function setValue(key, value) {
        var values = this.getControlValue();

        if ('object' === _typeof(key)) {
          _.each(key, function (internalValue, internalKey) {
            values[internalKey] = internalValue;
          });
        } else {
          values[key] = value;
        }

        this.setSettingsModel(values);
      },
      updateElementModel: function updateElementModel(value, input) {
        var key = input.dataset.setting;
        this.setValue(key, value);
      }
    }, {
      // Static methods
      getStyleValue: function getStyleValue(placeholder, controlValue) {
        if (!_.isObject(controlValue)) {
          return ''; // invalid
        }

        return controlValue[placeholder];
      }
    });
    module.exports = ControlBaseMultipleItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  34: [function (require, module, exports) {
    var ControlBaseMultipleItemView = require('elementor-controls/base-multiple'),
        ControlBaseUnitsItemView;

    ControlBaseUnitsItemView = ControlBaseMultipleItemView.extend({
      getCurrentRange: function getCurrentRange() {
        return this.getUnitRange(this.getControlValue('unit'));
      },
      getUnitRange: function getUnitRange(unit) {
        var ranges = this.model.get('range');

        if (!ranges || !ranges[unit]) {
          return false;
        }

        return ranges[unit];
      }
    });
    module.exports = ControlBaseUnitsItemView;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  35: [function (require, module, exports) {
    var ControlBaseView;
    ControlBaseView = Marionette.CompositeView.extend({
      ui: function ui() {
        return {
          controlTitle: '.elementor-control-title'
        };
      },
      behaviors: function behaviors() {
        var behaviors = {};
        return elementor.hooks.applyFilters('controls/base/behaviors', behaviors, this);
      },
      getBehavior: function getBehavior(name) {
        return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
      },
      className: function className() {
        // TODO: Any better classes for that?
        var classes = 'elementor-control elementor-control-' + this.model.get('name') + ' elementor-control-type-' + this.model.get('type'),
            modelClasses = this.model.get('classes'),
            responsive = this.model.get('responsive');

        if (!_.isEmpty(modelClasses)) {
          classes += ' ' + modelClasses;
        }

        if (!_.isEmpty(responsive)) {
          classes += ' elementor-control-responsive-' + responsive.max;
        }

        return classes;
      },
      templateHelpers: function templateHelpers() {
        var controlData = {
          _cid: this.model.cid
        };
        return {
          data: _.extend({}, this.model.toJSON(), controlData)
        };
      },
      getTemplate: function getTemplate() {
        return Marionette.TemplateCache.get('#tmpl-elementor-control-' + this.model.get('type') + '-content');
      },
      initialize: function initialize(options) {
        this.elementSettingsModel = options.elementSettingsModel;
        var controlType = this.model.get('type'),
            controlSettings = jQuery.extend(true, {}, elementor.config.controls[controlType], this.model.attributes);
        this.model.set(controlSettings);
        this.listenTo(this.elementSettingsModel, 'change', this.toggleControlVisibility);
      },
      toggleControlVisibility: function toggleControlVisibility() {
        var isVisible = elementor.helpers.isActiveControl(this.model, this.elementSettingsModel.attributes);
        this.$el.toggleClass('elementor-hidden-control', !isVisible);
        elementor.channels.data.trigger('scrollbar:update');
      },
      onRender: function onRender() {
        var layoutType = this.model.get('label_block') ? 'block' : 'inline',
            showLabel = this.model.get('show_label'),
            elClasses = 'elementor-label-' + layoutType;
        elClasses += ' elementor-control-separator-' + this.model.get('separator');

        if (!showLabel) {
          elClasses += ' elementor-control-hidden-label';
        }

        this.$el.addClass(elClasses);
        this.toggleControlVisibility();
      }
    });
    module.exports = ControlBaseView;
  }, {}],
  36: [function (require, module, exports) {
    var ControlMultipleBaseItemView = require('elementor-controls/base-multiple'),
        ControlBoxShadowItemView;

    ControlBoxShadowItemView = ControlMultipleBaseItemView.extend({
      ui: function ui() {
        var ui = ControlMultipleBaseItemView.prototype.ui.apply(this, arguments);
        ui.sliders = '.elementor-slider';
        ui.colors = '.elementor-shadow-color-picker';
        return ui;
      },
      events: function events() {
        return _.extend(ControlMultipleBaseItemView.prototype.events.apply(this, arguments), {
          'slide @ui.sliders': 'onSlideChange'
        });
      },
      initSliders: function initSliders() {
        var value = this.getControlValue();
        this.ui.sliders.each(function () {
          var $slider = jQuery(this),
              $input = $slider.next('.elementor-slider-input').find('input');
          $slider.slider({
            value: value[this.dataset.input],
            min: +$input.attr('min'),
            max: +$input.attr('max')
          });
        });
      },
      initColors: function initColors() {
        var self = this;
        elementor.helpers.wpColorPicker(this.ui.colors, {
          change: function change() {
            var $this = jQuery(this),
                type = $this.data('setting');
            self.setValue(type, $this.wpColorPicker('color'));
          },
          clear: function clear() {
            self.setValue(this.dataset.setting, '');
          }
        });
      },
      onInputChange: function onInputChange(event) {
        var type = event.currentTarget.dataset.setting,
            $slider = this.ui.sliders.filter('[data-input="' + type + '"]');
        $slider.slider('value', this.getControlValue(type));
      },
      onReady: function onReady() {
        this.initSliders();
        this.initColors();
      },
      onSlideChange: function onSlideChange(event, ui) {
        var type = event.currentTarget.dataset.input,
            $input = this.ui.input.filter('[data-setting="' + type + '"]');
        $input.val(ui.value);
        this.setValue(type, ui.value);
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.ui.colors.each(function () {
          var $color = jQuery(this);

          if ($color.wpColorPicker('instance')) {
            $color.wpColorPicker('close');
          }
        });
        this.$el.remove();
      }
    });
    module.exports = ControlBoxShadowItemView;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  37: [function (require, module, exports) {
    var ControlBaseView = require('elementor-controls/base');

    module.exports = ControlBaseView.extend({
      ui: function ui() {
        var ui = ControlBaseView.prototype.ui.apply(this, arguments);
        ui.button = 'button';
        return ui;
      },
      events: {
        'click @ui.button': 'onButtonClick'
      },
      onButtonClick: function onButtonClick() {
        var eventName = this.model.get('event');
        elementor.channels.editor.trigger(eventName, this);
      }
    });
  }, {
    "elementor-controls/base": 35
  }],
  38: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlChooseItemView;

    ControlChooseItemView = ControlBaseDataView.extend({
      ui: function ui() {
        var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);
        ui.inputs = '[type="radio"]';
        return ui;
      },
      events: function events() {
        return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
          'mousedown label': 'onMouseDownLabel',
          'click @ui.inputs': 'onClickInput',
          'change @ui.inputs': 'onBaseInputChange'
        });
      },
      onMouseDownLabel: function onMouseDownLabel(event) {
        var $clickedLabel = this.$(event.currentTarget),
            $selectedInput = this.$('#' + $clickedLabel.attr('for'));
        $selectedInput.data('checked', $selectedInput.prop('checked'));
      },
      onClickInput: function onClickInput(event) {
        if (!this.model.get('toggle')) {
          return;
        }

        var $selectedInput = this.$(event.currentTarget);

        if ($selectedInput.data('checked')) {
          $selectedInput.prop('checked', false).trigger('change');
        }
      },
      onRender: function onRender() {
        ControlBaseDataView.prototype.onRender.apply(this, arguments);
        var currentValue = this.getControlValue();

        if (currentValue) {
          this.ui.inputs.filter('[value="' + currentValue + '"]').prop('checked', true);
        }
      }
    });
    module.exports = ControlChooseItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  39: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlCodeEditorItemView;

    ControlCodeEditorItemView = ControlBaseDataView.extend({
      ui: function ui() {
        var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);
        ui.editor = '.elementor-code-editor';
        return ui;
      },
      onReady: function onReady() {
        var self = this;

        if ('undefined' === typeof ace) {
          return;
        }

        var langTools = ace.require('ace/ext/language_tools');

        self.editor = ace.edit(this.ui.editor[0]);
        jQuery(self.editor.container).addClass('elementor-input-style elementor-code-editor');
        self.editor.setOptions({
          mode: 'ace/mode/' + self.model.attributes.language,
          minLines: 10,
          maxLines: Infinity,
          showGutter: true,
          useWorker: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
        });
        self.editor.getSession().setUseWrapMode(true);
        elementor.panel.$el.on('resize.aceEditor', self.onResize.bind(this));

        if ('css' === self.model.attributes.language) {
          var selectorCompleter = {
            getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
              var list = [],
                  token = session.getTokenAt(pos.row, pos.column);

              if (0 < prefix.length && 'selector'.match(prefix) && 'constant' === token.type) {
                list = [{
                  name: 'selector',
                  value: 'selector',
                  score: 1,
                  meta: 'Elementor'
                }];
              }

              callback(null, list);
            }
          };
          langTools.addCompleter(selectorCompleter);
        }

        self.editor.setValue(self.getControlValue(), -1); // -1 =  move cursor to the start

        self.editor.on('change', function () {
          self.setValue(self.editor.getValue());
        });

        if ('html' === self.model.attributes.language) {
          // Remove the `doctype` annotation
          var session = self.editor.getSession();
          session.on('changeAnnotation', function () {
            var annotations = session.getAnnotations() || [],
                annotationsLength = annotations.length,
                index = annotations.length;

            while (index--) {
              if (/doctype first\. Expected/.test(annotations[index].text)) {
                annotations.splice(index, 1);
              }
            }

            if (annotationsLength > annotations.length) {
              session.setAnnotations(annotations);
            }
          });
        }
      },
      onResize: function onResize() {
        this.editor.resize();
      },
      onDestroy: function onDestroy() {
        elementor.panel.$el.off('resize.aceEditor');
      }
    });
    module.exports = ControlCodeEditorItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  40: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlColorItemView;

    ControlColorItemView = ControlBaseDataView.extend({
      onReady: function onReady() {
        var self = this;
        elementor.helpers.wpColorPicker(self.ui.input, {
          change: function change() {
            self.ui.input.val(self.ui.input.wpColorPicker('color')).trigger('input');
          },
          clear: function clear() {
            self.setValue('');
          }
        });
      },
      onBeforeDestroy: function onBeforeDestroy() {
        if (this.ui.input.wpColorPicker('instance')) {
          this.ui.input.wpColorPicker('close');
        }

        this.$el.remove();
      }
    });
    module.exports = ControlColorItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  41: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlDateTimePickerItemView;

    ControlDateTimePickerItemView = ControlBaseDataView.extend({
      onReady: function onReady() {
        var self = this;

        var options = _.extend({
          onClose: function onClose() {
            self.saveValue();
          },
          enableTime: true,
          minuteIncrement: 1
        }, this.model.get('picker_options'));

        this.ui.input.flatpickr(options);
      },
      saveValue: function saveValue() {
        this.setValue(this.ui.input.val());
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.saveValue();
        this.ui.input.flatpickr().destroy();
      }
    });
    module.exports = ControlDateTimePickerItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  42: [function (require, module, exports) {
    var ControlBaseUnitsItemView = require('elementor-controls/base-units'),
        ControlDimensionsItemView;

    ControlDimensionsItemView = ControlBaseUnitsItemView.extend({
      ui: function ui() {
        var ui = ControlBaseUnitsItemView.prototype.ui.apply(this, arguments);
        ui.controls = '.elementor-control-dimension > input:enabled';
        ui.link = 'button.elementor-link-dimensions';
        return ui;
      },
      events: function events() {
        return _.extend(ControlBaseUnitsItemView.prototype.events.apply(this, arguments), {
          'click @ui.link': 'onLinkDimensionsClicked'
        });
      },
      defaultDimensionValue: 0,
      initialize: function initialize() {
        ControlBaseUnitsItemView.prototype.initialize.apply(this, arguments); // TODO: Need to be in helpers, and not in variable

        this.model.set('allowed_dimensions', this.filterDimensions(this.model.get('allowed_dimensions')));
      },
      getPossibleDimensions: function getPossibleDimensions() {
        return ['top', 'right', 'bottom', 'left'];
      },
      filterDimensions: function filterDimensions(filter) {
        filter = filter || 'all';
        var dimensions = this.getPossibleDimensions();

        if ('all' === filter) {
          return dimensions;
        }

        if (!_.isArray(filter)) {
          if ('horizontal' === filter) {
            filter = ['right', 'left'];
          } else if ('vertical' === filter) {
            filter = ['top', 'bottom'];
          }
        }

        return filter;
      },
      onReady: function onReady() {
        var self = this,
            currentValue = self.getControlValue();

        if (!self.isLinkedDimensions()) {
          self.ui.link.addClass('unlinked');
          self.ui.controls.each(function (index, element) {
            var value = currentValue[element.dataset.setting];

            if (_.isEmpty(value)) {
              value = self.defaultDimensionValue;
            }

            self.$(element).val(value);
          });
        }

        self.fillEmptyDimensions();
      },
      updateDimensionsValue: function updateDimensionsValue() {
        var currentValue = {},
            dimensions = this.getPossibleDimensions(),
            $controls = this.ui.controls,
            defaultDimensionValue = this.defaultDimensionValue;
        dimensions.forEach(function (dimension) {
          var $element = $controls.filter('[data-setting="' + dimension + '"]');
          currentValue[dimension] = $element.length ? $element.val() : defaultDimensionValue;
        });
        this.setValue(currentValue);
      },
      fillEmptyDimensions: function fillEmptyDimensions() {
        var dimensions = this.getPossibleDimensions(),
            allowedDimensions = this.model.get('allowed_dimensions'),
            $controls = this.ui.controls,
            defaultDimensionValue = this.defaultDimensionValue;

        if (this.isLinkedDimensions()) {
          return;
        }

        dimensions.forEach(function (dimension) {
          var $element = $controls.filter('[data-setting="' + dimension + '"]'),
              isAllowedDimension = -1 !== _.indexOf(allowedDimensions, dimension);

          if (isAllowedDimension && $element.length && _.isEmpty($element.val())) {
            $element.val(defaultDimensionValue);
          }
        });
      },
      updateDimensions: function updateDimensions() {
        this.fillEmptyDimensions();
        this.updateDimensionsValue();
      },
      resetDimensions: function resetDimensions() {
        this.ui.controls.val('');
        this.updateDimensionsValue();
      },
      onInputChange: function onInputChange(event) {
        var inputSetting = event.target.dataset.setting;

        if ('unit' === inputSetting) {
          this.resetDimensions();
        }

        if (!_.contains(this.getPossibleDimensions(), inputSetting)) {
          return;
        }

        if (this.isLinkedDimensions()) {
          var $thisControl = this.$(event.target);
          this.ui.controls.val($thisControl.val());
        }

        this.updateDimensions();
      },
      onLinkDimensionsClicked: function onLinkDimensionsClicked(event) {
        event.preventDefault();
        event.stopPropagation();
        this.ui.link.toggleClass('unlinked');
        this.setValue('isLinked', !this.ui.link.hasClass('unlinked'));

        if (this.isLinkedDimensions()) {
          // Set all controls value from the first control.
          this.ui.controls.val(this.ui.controls.eq(0).val());
        }

        this.updateDimensions();
      },
      isLinkedDimensions: function isLinkedDimensions() {
        return this.getControlValue('isLinked');
      }
    });
    module.exports = ControlDimensionsItemView;
  }, {
    "elementor-controls/base-units": 34
  }],
  43: [function (require, module, exports) {
    var ControlSelect2View = require('elementor-controls/select2');

    module.exports = ControlSelect2View.extend({
      getSelect2Options: function getSelect2Options() {
        return {
          dir: elementor.config.is_rtl ? 'rtl' : 'ltr'
        };
      },
      templateHelpers: function templateHelpers() {
        var helpers = ControlSelect2View.prototype.templateHelpers.apply(this, arguments),
            fonts = this.model.get('options');

        helpers.getFontsByGroups = function (groups) {
          var filteredFonts = {};

          _.each(fonts, function (fontType, fontName) {
            if (_.isArray(groups) && _.contains(groups, fontType) || fontType === groups) {
              filteredFonts[fontName] = fontName;
            }
          });

          return filteredFonts;
        };

        return helpers;
      }
    });
  }, {
    "elementor-controls/select2": 54
  }],
  44: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlMediaItemView;

    ControlMediaItemView = ControlBaseDataView.extend({
      ui: function ui() {
        var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);
        ui.addImages = '.elementor-control-gallery-add';
        ui.clearGallery = '.elementor-control-gallery-clear';
        ui.galleryThumbnails = '.elementor-control-gallery-thumbnails';
        return ui;
      },
      events: function events() {
        return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
          'click @ui.addImages': 'onAddImagesClick',
          'click @ui.clearGallery': 'onClearGalleryClick',
          'click @ui.galleryThumbnails': 'onGalleryThumbnailsClick'
        });
      },
      onReady: function onReady() {
        var hasImages = this.hasImages();
        this.$el.toggleClass('elementor-gallery-has-images', hasImages).toggleClass('elementor-gallery-empty', !hasImages);
        this.initRemoveDialog();
      },
      hasImages: function hasImages() {
        return !!this.getControlValue().length;
      },
      openFrame: function openFrame(action) {
        this.initFrame(action);
        this.frame.open();
      },
      initFrame: function initFrame(action) {
        var frameStates = {
          create: 'gallery',
          add: 'gallery-library',
          edit: 'gallery-edit'
        };
        var options = {
          frame: 'post',
          multiple: true,
          state: frameStates[action],
          button: {
            text: elementor.translate('insert_media')
          }
        };

        if (this.hasImages()) {
          options.selection = this.fetchSelection();
        }

        this.frame = wp.media(options); // When a file is selected, run a callback.

        this.frame.on({
          'update': this.select,
          'menu:render:default': this.menuRender,
          'content:render:browse': this.gallerySettings
        }, this);
      },
      menuRender: function menuRender(view) {
        view.unset('insert');
        view.unset('featured-image');
      },
      gallerySettings: function gallerySettings(browser) {
        browser.sidebar.on('ready', function () {
          browser.sidebar.unset('gallery');
        });
      },
      fetchSelection: function fetchSelection() {
        var attachments = wp.media.query({
          orderby: 'post__in',
          order: 'ASC',
          type: 'image',
          perPage: -1,
          post__in: _.pluck(this.getControlValue(), 'id')
        });
        return new wp.media.model.Selection(attachments.models, {
          props: attachments.props.toJSON(),
          multiple: true
        });
      },

      /**
       * Callback handler for when an attachment is selected in the media modal.
       * Gets the selected image information, and sets it within the control.
       */
      select: function select(selection) {
        var images = [];
        selection.each(function (image) {
          images.push({
            id: image.get('id'),
            url: image.get('url')
          });
        });
        this.setValue(images);
        this.render();
      },
      onBeforeDestroy: function onBeforeDestroy() {
        if (this.frame) {
          this.frame.off();
        }

        this.$el.remove();
      },
      resetGallery: function resetGallery() {
        this.setValue('');
        this.render();
      },
      initRemoveDialog: function initRemoveDialog() {
        var removeDialog;

        this.getRemoveDialog = function () {
          if (!removeDialog) {
            removeDialog = elementor.dialogsManager.createWidget('confirm', {
              message: elementor.translate('dialog_confirm_gallery_delete'),
              headerMessage: elementor.translate('delete_gallery'),
              strings: {
                confirm: elementor.translate('delete'),
                cancel: elementor.translate('cancel')
              },
              defaultOption: 'confirm',
              onConfirm: this.resetGallery.bind(this)
            });
          }

          return removeDialog;
        };
      },
      onAddImagesClick: function onAddImagesClick() {
        this.openFrame(this.hasImages() ? 'add' : 'create');
      },
      onClearGalleryClick: function onClearGalleryClick() {
        this.getRemoveDialog().show();
      },
      onGalleryThumbnailsClick: function onGalleryThumbnailsClick() {
        this.openFrame('edit');
      }
    });
    module.exports = ControlMediaItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  45: [function (require, module, exports) {
    var ControlSelect2View = require('elementor-controls/select2'),
        ControlIconView;

    ControlIconView = ControlSelect2View.extend({
      initialize: function initialize() {
        ControlSelect2View.prototype.initialize.apply(this, arguments);
        this.filterIcons();
      },
      filterIcons: function filterIcons() {
        var icons = this.model.get('options'),
            include = this.model.get('include'),
            exclude = this.model.get('exclude');

        if (include) {
          var filteredIcons = {};

          _.each(include, function (iconKey) {
            filteredIcons[iconKey] = icons[iconKey];
          });

          this.model.set('options', filteredIcons);
          return;
        }

        if (exclude) {
          _.each(exclude, function (iconKey) {
            delete icons[iconKey];
          });
        }
      },
      iconsList: function iconsList(icon) {
        if (!icon.id) {
          return icon.text;
        }

        return jQuery('<span><i class="' + icon.id + '"></i> ' + icon.text + '</span>');
      },
      getSelect2Options: function getSelect2Options() {
        return {
          allowClear: true,
          templateResult: this.iconsList.bind(this),
          templateSelection: this.iconsList.bind(this)
        };
      }
    });
    module.exports = ControlIconView;
  }, {
    "elementor-controls/select2": 54
  }],
  46: [function (require, module, exports) {
    var ControlMultipleBaseItemView = require('elementor-controls/base-multiple'),
        ControlImageDimensionsItemView;

    ControlImageDimensionsItemView = ControlMultipleBaseItemView.extend({
      ui: function ui() {
        return {
          inputWidth: 'input[data-setting="width"]',
          inputHeight: 'input[data-setting="height"]',
          btnApply: 'button.elementor-image-dimensions-apply-button'
        };
      },
      // Override the base events
      events: function events() {
        return {
          'click @ui.btnApply': 'onApplyClicked'
        };
      },
      onApplyClicked: function onApplyClicked(event) {
        event.preventDefault();
        this.setValue({
          width: this.ui.inputWidth.val(),
          height: this.ui.inputHeight.val()
        });
      }
    });
    module.exports = ControlImageDimensionsItemView;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  47: [function (require, module, exports) {
    var ControlMultipleBaseItemView = require('elementor-controls/base-multiple'),
        ControlMediaItemView;

    ControlMediaItemView = ControlMultipleBaseItemView.extend({
      ui: function ui() {
        var ui = ControlMultipleBaseItemView.prototype.ui.apply(this, arguments);
        ui.controlMedia = '.elementor-control-media';
        ui.frameOpeners = '.elementor-control-media-upload-button, .elementor-control-media-image';
        ui.deleteButton = '.elementor-control-media-delete';
        return ui;
      },
      events: function events() {
        return _.extend(ControlMultipleBaseItemView.prototype.events.apply(this, arguments), {
          'click @ui.frameOpeners': 'openFrame',
          'click @ui.deleteButton': 'deleteImage'
        });
      },
      onReady: function onReady() {
        if (_.isEmpty(this.getControlValue('url'))) {
          this.ui.controlMedia.addClass('media-empty');
        }
      },
      openFrame: function openFrame() {
        if (!this.frame) {
          this.initFrame();
        }

        this.frame.open();
      },
      deleteImage: function deleteImage() {
        this.setValue({
          url: '',
          id: ''
        });
        this.render();
      },

      /**
       * Create a media modal select frame, and store it so the instance can be reused when needed.
       */
      initFrame: function initFrame() {
        this.frame = wp.media({
          button: {
            text: elementor.translate('insert_media')
          },
          states: [new wp.media.controller.Library({
            title: elementor.translate('insert_media'),
            library: wp.media.query({
              type: 'image'
            }),
            multiple: false,
            date: false
          })]
        }); // When a file is selected, run a callback.

        this.frame.on('insert select', this.select.bind(this));
      },

      /**
       * Callback handler for when an attachment is selected in the media modal.
       * Gets the selected image information, and sets it within the control.
       */
      select: function select() {
        this.trigger('before:select'); // Get the attachment from the modal frame.

        var attachment = this.frame.state().get('selection').first().toJSON();

        if (attachment.url) {
          this.setValue({
            url: attachment.url,
            id: attachment.id
          });
          this.render();
        }

        this.trigger('after:select');
      },
      onBeforeDestroy: function onBeforeDestroy() {
        this.$el.remove();
      }
    });
    module.exports = ControlMediaItemView;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  48: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        NumberValidator = require('elementor-validator/number'),
        ControlNumberItemView;

    ControlNumberItemView = ControlBaseDataView.extend({
      registerValidators: function registerValidators() {
        ControlBaseDataView.prototype.registerValidators.apply(this, arguments);
        var validationTerms = {},
            model = this.model;
        ['min', 'max'].forEach(function (term) {
          var termValue = model.get(term);

          if (_.isFinite(termValue)) {
            validationTerms[term] = termValue;
          }
        });

        if (!jQuery.isEmptyObject(validationTerms)) {
          this.addValidator(new NumberValidator({
            validationTerms: validationTerms
          }));
        }
      }
    });
    module.exports = ControlNumberItemView;
  }, {
    "elementor-controls/base-data": 32,
    "elementor-validator/number": 31
  }],
  49: [function (require, module, exports) {
    var ControlMultipleBaseItemView = require('elementor-controls/base-multiple'),
        ControlOrderItemView;

    ControlOrderItemView = ControlMultipleBaseItemView.extend({
      ui: function ui() {
        var ui = ControlMultipleBaseItemView.prototype.ui.apply(this, arguments);
        ui.reverseOrderLabel = '.elementor-control-order-label';
        return ui;
      },
      changeLabelTitle: function changeLabelTitle() {
        var reverseOrder = this.getControlValue('reverse_order');
        this.ui.reverseOrderLabel.attr('title', elementor.translate(reverseOrder ? 'asc' : 'desc'));
      },
      onRender: function onRender() {
        ControlMultipleBaseItemView.prototype.onRender.apply(this, arguments);
        this.changeLabelTitle();
      },
      onInputChange: function onInputChange() {
        this.changeLabelTitle();
      }
    });
    module.exports = ControlOrderItemView;
  }, {
    "elementor-controls/base-multiple": 33
  }],
  50: [function (require, module, exports) {
    var ControlChooseView = require('elementor-controls/choose'),
        ControlPopoverStarterView;

    ControlPopoverStarterView = ControlChooseView.extend({
      ui: function ui() {
        var ui = ControlChooseView.prototype.ui.apply(this, arguments);
        ui.popoverToggle = '.elementor-control-popover-toggle-toggle';
        return ui;
      },
      events: function events() {
        return _.extend(ControlChooseView.prototype.events.apply(this, arguments), {
          'click @ui.popoverToggle': 'onPopoverToggleClick'
        });
      },
      onPopoverToggleClick: function onPopoverToggleClick() {
        this.$el.next('.elementor-controls-popover').toggle();
      }
    });
    module.exports = ControlPopoverStarterView;
  }, {
    "elementor-controls/choose": 38
  }],
  51: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        RepeaterRowView;

    RepeaterRowView = Marionette.CompositeView.extend({
      template: Marionette.TemplateCache.get('#tmpl-elementor-repeater-row'),
      className: 'repeater-fields',
      ui: {
        duplicateButton: '.elementor-repeater-tool-duplicate',
        editButton: '.elementor-repeater-tool-edit',
        removeButton: '.elementor-repeater-tool-remove',
        itemTitle: '.elementor-repeater-row-item-title'
      },
      behaviors: {
        HandleInnerTabs: {
          behaviorClass: require('elementor-behaviors/inner-tabs')
        }
      },
      triggers: {
        'click @ui.removeButton': 'click:remove',
        'click @ui.duplicateButton': 'click:duplicate',
        'click @ui.itemTitle': 'click:edit'
      },
      templateHelpers: function templateHelpers() {
        return {
          itemIndex: this.getOption('itemIndex')
        };
      },
      childViewContainer: '.elementor-repeater-row-controls',
      getChildView: function getChildView(item) {
        var controlType = item.get('type');
        return elementor.getControlView(controlType);
      },
      childViewOptions: function childViewOptions() {
        return {
          elementSettingsModel: this.model
        };
      },
      checkConditions: function checkConditions() {
        var self = this;
        self.collection.each(function (model) {
          var conditions = model.get('conditions'),
              parentConditions = model.get('parent_conditions'),
              isVisible = true;

          if (conditions) {
            isVisible = elementor.conditions.check(conditions, self.model.attributes);
          }

          if (parentConditions) {
            isVisible = elementor.conditions.check(parentConditions, self.getOption('parentModel').attributes);
          }

          var child = self.children.findByModelCid(model.cid);
          child.$el.toggleClass('elementor-panel-hide', !isVisible);
        });
      },
      updateIndex: function updateIndex(newIndex) {
        this.itemIndex = newIndex;
        this.setTitle();
      },
      setTitle: function setTitle() {
        var self = this,
            titleField = self.getOption('titleField'),
            title = '';

        if (titleField) {
          var values = {};
          self.children.each(function (child) {
            if (!(child instanceof ControlBaseDataView)) {
              return;
            }

            values[child.model.get('name')] = child.getControlValue();
          });
          title = Marionette.TemplateCache.prototype.compileTemplate(titleField)(values);
        }

        if (!title) {
          title = elementor.translate('Item #{0}', [self.getOption('itemIndex')]);
        }

        self.ui.itemTitle.html(title);
      },
      initialize: function initialize(options) {
        var self = this;
        self.elementSettingsModel = options.elementSettingsModel;
        self.itemIndex = 0; // Collection for Controls list

        self.collection = new Backbone.Collection(options.controlFields);
        self.listenTo(self.model, 'change', self.checkConditions);
        self.listenTo(self.getOption('parentModel'), 'change', self.checkConditions);

        if (options.titleField) {
          self.listenTo(self.model, 'change', self.setTitle);
        }
      },
      onRender: function onRender() {
        this.setTitle();
        this.checkConditions();
      },
      onChildviewResponsiveSwitcherClick: function onChildviewResponsiveSwitcherClick(childView, device) {
        if ('desktop' === device) {
          elementor.getPanelView().getCurrentPageView().$el.toggleClass('elementor-responsive-switchers-open');
        }
      }
    });
    module.exports = RepeaterRowView;
  }, {
    "elementor-behaviors/inner-tabs": 70,
    "elementor-controls/base-data": 32
  }],
  52: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        RepeaterRowView = require('elementor-controls/repeater-row'),
        BaseSettingsModel = require('elementor-elements/models/base-settings'),
        ControlRepeaterItemView;

    ControlRepeaterItemView = ControlBaseDataView.extend({
      ui: {
        btnAddRow: '.elementor-repeater-add',
        fieldContainer: '.elementor-repeater-fields'
      },
      events: function events() {
        return {
          'click @ui.btnAddRow': 'onButtonAddRowClick',
          'sortstart @ui.fieldContainer': 'onSortStart',
          'sortupdate @ui.fieldContainer': 'onSortUpdate',
          'sortstop @ui.fieldContainer': 'onSortStop'
        };
      },
      childView: RepeaterRowView,
      childViewContainer: '.elementor-repeater-fields',
      templateHelpers: function templateHelpers() {
        return {
          data: _.extend({}, this.model.toJSON(), {
            controlValue: []
          })
        };
      },
      childViewOptions: function childViewOptions() {
        return {
          controlFields: this.model.get('fields'),
          titleField: this.model.get('title_field'),
          parentModel: this.elementSettingsModel // For parentConditions in repeaterRow

        };
      },
      createItemModel: function createItemModel(attrs, options, controlView) {
        options = options || {};
        options.controls = controlView.model.get('fields');

        if (!attrs._id) {
          attrs._id = elementor.helpers.getUniqueID();
        }

        return new BaseSettingsModel(attrs, options);
      },
      fillCollection: function fillCollection() {
        var controlName = this.model.get('name');
        this.collection = this.elementSettingsModel.get(controlName);

        if (!(this.collection instanceof Backbone.Collection)) {
          this.collection = new Backbone.Collection(this.collection, {
            // Use `partial` to supply the `this` as an argument, but not as context
            // the `_` i sa place holder for original arguments: `attrs` & `options`
            model: _.partial(this.createItemModel, _, _, this)
          }); // Set the value silent

          this.elementSettingsModel.set(controlName, this.collection, {
            silent: true
          });
          this.listenTo(this.collection, 'change', this.onRowControlChange);
          this.listenTo(this.collection, 'update', this.onRowUpdate, this);
        }
      },
      initialize: function initialize(options) {
        ControlBaseDataView.prototype.initialize.apply(this, arguments);
        this.fillCollection();
        this.listenTo(this.collection, 'change', this.onRowControlChange);
        this.listenTo(this.collection, 'update', this.onRowUpdate, this);
      },
      addRow: function addRow(data, options) {
        var id = elementor.helpers.getUniqueID();

        if (data instanceof Backbone.Model) {
          data.set('_id', id);
        } else {
          data._id = id;
        }

        return this.collection.add(data, options);
      },
      editRow: function editRow(rowView) {
        if (this.currentEditableChild) {
          var currentEditable = this.currentEditableChild.getChildViewContainer(this.currentEditableChild);
          currentEditable.removeClass('editable'); // If the repeater contains TinyMCE editors, fire the `hide` trigger to hide floated toolbars

          currentEditable.find('.elementor-wp-editor').each(function () {
            tinymce.get(this.id).fire('hide');
          });
        }

        if (this.currentEditableChild === rowView) {
          delete this.currentEditableChild;
          return;
        }

        rowView.getChildViewContainer(rowView).addClass('editable');
        this.currentEditableChild = rowView;
        this.updateActiveRow();
      },
      toggleMinRowsClass: function toggleMinRowsClass() {
        if (!this.model.get('prevent_empty')) {
          return;
        }

        this.$el.toggleClass('elementor-repeater-has-minimum-rows', 1 >= this.collection.length);
      },
      updateActiveRow: function updateActiveRow() {
        var activeItemIndex = 0;

        if (this.currentEditableChild) {
          activeItemIndex = this.currentEditableChild.itemIndex;
        }

        this.setEditSetting('activeItemIndex', activeItemIndex);
      },
      updateChildIndexes: function updateChildIndexes() {
        var collection = this.collection;
        this.children.each(function (view) {
          view.updateIndex(collection.indexOf(view.model) + 1);
        });
      },
      onRender: function onRender() {
        ControlBaseDataView.prototype.onRender.apply(this, arguments);
        this.ui.fieldContainer.sortable({
          axis: 'y',
          handle: '.elementor-repeater-row-tools'
        });
        this.toggleMinRowsClass();
      },
      onSortStart: function onSortStart(event, ui) {
        ui.item.data('oldIndex', ui.item.index());
      },
      onSortStop: function onSortStop(event, ui) {
        // Reload TinyMCE editors (if exist), it's a bug that TinyMCE content is missing after stop dragging
        var self = this,
            sortedIndex = ui.item.index();

        if (-1 === sortedIndex) {
          return;
        }

        var sortedRowView = self.children.findByIndex(ui.item.index()),
            rowControls = sortedRowView.children._views;
        jQuery.each(rowControls, function () {
          if ('wysiwyg' === this.model.get('type')) {
            sortedRowView.render();
            delete self.currentEditableChild;
            return false;
          }
        });
      },
      onSortUpdate: function onSortUpdate(event, ui) {
        var oldIndex = ui.item.data('oldIndex'),
            model = this.collection.at(oldIndex),
            newIndex = ui.item.index();
        this.collection.remove(model);
        this.addRow(model, {
          at: newIndex
        });
      },
      onAddChild: function onAddChild() {
        this.updateChildIndexes();
        this.updateActiveRow();
      },
      onRemoveChild: function onRemoveChild(childView) {
        if (childView === this.currentEditableChild) {
          delete this.currentEditableChild;
        }

        this.updateChildIndexes();
        this.updateActiveRow();
      },
      onRowUpdate: function onRowUpdate(collection, event) {
        // Simulate `changed` and `_previousAttributes` values
        var settings = this.elementSettingsModel,
            collectionCloned = collection.clone(),
            controlName = this.model.get('name');

        if (event.add) {
          collectionCloned.remove(event.changes.added[0]);
        } else {
          collectionCloned.add(event.changes.removed[0], {
            at: event.index
          });
        }

        settings.changed = {};
        settings.changed[controlName] = collection;
        settings._previousAttributes = {};
        settings._previousAttributes[controlName] = collectionCloned.toJSON();
        settings.trigger('change', settings, settings._pending);
        delete settings.changed;
        delete settings._previousAttributes;
        this.toggleMinRowsClass();
      },
      onRowControlChange: function onRowControlChange(model) {
        // Simulate `changed` and `_previousAttributes` values
        var changed = Object.keys(model.changed);

        if (!changed.length) {
          return;
        }

        var collectionCloned = model.collection.toJSON(),
            modelIndex = model.collection.findIndex(model),
            element = this._parent.model,
            settings = element.get('settings'),
            controlName = this.model.get('name'); // Save it with old values

        collectionCloned[modelIndex] = model._previousAttributes;
        settings.changed = {};
        settings.changed[controlName] = model.collection;
        settings._previousAttributes = {};
        settings._previousAttributes[controlName] = collectionCloned;
        settings.trigger('change', settings);
        delete settings.changed;
        delete settings._previousAttributes;
      },
      onButtonAddRowClick: function onButtonAddRowClick() {
        var defaults = {};

        _.each(this.model.get('fields'), function (field) {
          defaults[field.name] = field['default'];
        });

        var newModel = this.addRow(defaults),
            newChildView = this.children.findByModel(newModel);
        this.editRow(newChildView);
        this.render();
      },
      onChildviewClickRemove: function onChildviewClickRemove(childView) {
        childView.model.destroy();
        this.render();
      },
      onChildviewClickDuplicate: function onChildviewClickDuplicate(childView) {
        var newModel = this.createItemModel(childView.model.toJSON(), {}, this);
        this.addRow(newModel, {
          at: childView.itemIndex
        });
        this.render();
      },
      onChildviewClickEdit: function onChildviewClickEdit(childView) {
        this.editRow(childView);
      },
      onAfterExternalChange: function onAfterExternalChange() {
        // Update the collection with current value
        this.fillCollection();
        ControlBaseDataView.prototype.onAfterExternalChange.apply(this, arguments);
      }
    });
    module.exports = ControlRepeaterItemView;
  }, {
    "elementor-controls/base-data": 32,
    "elementor-controls/repeater-row": 51,
    "elementor-elements/models/base-settings": 63
  }],
  53: [function (require, module, exports) {
    var ControlBaseView = require('elementor-controls/base'),
        ControlSectionItemView;

    ControlSectionItemView = ControlBaseView.extend({
      ui: function ui() {
        var ui = ControlBaseView.prototype.ui.apply(this, arguments);
        ui.heading = '.elementor-panel-heading';
        return ui;
      },
      triggers: {
        'click': 'control:section:clicked'
      }
    });
    module.exports = ControlSectionItemView;
  }, {
    "elementor-controls/base": 35
  }],
  54: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlSelect2ItemView;

    ControlSelect2ItemView = ControlBaseDataView.extend({
      getSelect2Options: function getSelect2Options() {
        var placeholder = this.ui.select.children('option:first[value=""]').text();
        return {
          allowClear: true,
          placeholder: placeholder
        };
      },
      onReady: function onReady() {
        this.ui.select.select2(this.getSelect2Options());
      },
      onBeforeDestroy: function onBeforeDestroy() {
        if (this.ui.select.data('select2')) {
          this.ui.select.select2('destroy');
        }

        this.$el.remove();
      }
    });
    module.exports = ControlSelect2ItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  55: [function (require, module, exports) {
    var ControlBaseUnitsItemView = require('elementor-controls/base-units'),
        ControlSliderItemView;

    ControlSliderItemView = ControlBaseUnitsItemView.extend({
      ui: function ui() {
        var ui = ControlBaseUnitsItemView.prototype.ui.apply(this, arguments);
        ui.slider = '.elementor-slider';
        return ui;
      },
      events: function events() {
        return _.extend(ControlBaseUnitsItemView.prototype.events.apply(this, arguments), {
          'slide @ui.slider': 'onSlideChange'
        });
      },
      initSlider: function initSlider() {
        var size = this.getControlValue('size'),
            unitRange = this.getCurrentRange();
        this.ui.input.attr(unitRange).val(size);
        this.ui.slider.slider(_.extend({}, unitRange, {
          value: size
        }));
      },
      resetSize: function resetSize() {
        this.setValue('size', '');
        this.initSlider();
      },
      onReady: function onReady() {
        this.initSlider();
      },
      onSlideChange: function onSlideChange(event, ui) {
        this.setValue('size', ui.value);
        this.ui.input.val(ui.value);
      },
      onInputChange: function onInputChange(event) {
        var dataChanged = event.currentTarget.dataset.setting;

        if ('size' === dataChanged) {
          this.ui.slider.slider('value', this.getControlValue('size'));
        } else if ('unit' === dataChanged) {
          this.resetSize();
        }
      },
      onBeforeDestroy: function onBeforeDestroy() {
        if (this.ui.slider.data('uiSlider')) {
          this.ui.slider.slider('destroy');
        }

        this.$el.remove();
      }
    });
    module.exports = ControlSliderItemView;
  }, {
    "elementor-controls/base-units": 34
  }],
  56: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlStructureItemView;

    ControlStructureItemView = ControlBaseDataView.extend({
      ui: function ui() {
        var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);
        ui.resetStructure = '.elementor-control-structure-reset';
        return ui;
      },
      events: function events() {
        return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
          'click @ui.resetStructure': 'onResetStructureClick'
        });
      },
      templateHelpers: function templateHelpers() {
        var helpers = ControlBaseDataView.prototype.templateHelpers.apply(this, arguments);
        helpers.getMorePresets = this.getMorePresets.bind(this);
        return helpers;
      },
      getCurrentEditedSection: function getCurrentEditedSection() {
        var editor = elementor.getPanelView().getCurrentPageView();
        return editor.getOption('editedElementView');
      },
      getMorePresets: function getMorePresets() {
        var parsedStructure = elementor.presetsFactory.getParsedStructure(this.getControlValue());
        return elementor.presetsFactory.getPresets(parsedStructure.columnsCount);
      },
      onInputChange: function onInputChange() {
        this.getCurrentEditedSection().redefineLayout();
        this.render();
      },
      onResetStructureClick: function onResetStructureClick() {
        this.getCurrentEditedSection().resetColumnsCustomSize();
      }
    });
    module.exports = ControlStructureItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  57: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data');

    module.exports = ControlBaseDataView.extend({
      setInputValue: function setInputValue(input, value) {
        // Make sure is string value
        // TODO: Remove in v1.6
        value = '' + value;
        this.$(input).prop('checked', this.model.get('return_value') === value);
      }
    });
  }, {
    "elementor-controls/base-data": 32
  }],
  58: [function (require, module, exports) {
    var ControlBaseView = require('elementor-controls/base'),
        ControlTabItemView;

    ControlTabItemView = ControlBaseView.extend({
      triggers: {
        'click': {
          event: 'control:tab:clicked',
          stopPropagation: false
        }
      }
    });
    module.exports = ControlTabItemView;
  }, {
    "elementor-controls/base": 35
  }],
  59: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlWPWidgetItemView;

    ControlWPWidgetItemView = ControlBaseDataView.extend({
      ui: function ui() {
        var ui = ControlBaseDataView.prototype.ui.apply(this, arguments);
        ui.form = 'form';
        ui.loading = '.wp-widget-form-loading';
        return ui;
      },
      events: function events() {
        return {
          'keyup @ui.form :input': 'onFormChanged',
          'change @ui.form :input': 'onFormChanged'
        };
      },
      onFormChanged: function onFormChanged() {
        var idBase = 'widget-' + this.model.get('id_base'),
            settings = this.ui.form.elementorSerializeObject()[idBase].REPLACE_TO_ID;
        this.setValue(settings);
      },
      onReady: function onReady() {
        var self = this;
        elementor.ajax.send('editor_get_wp_widget_form', {
          data: {
            // Fake Widget ID
            id: self.model.cid,
            widget_type: self.model.get('widget'),
            data: JSON.stringify(self.elementSettingsModel.toJSON())
          },
          success: function success(data) {
            self.ui.form.html(data); // WP >= 4.8

            if (wp.textWidgets) {
              self.ui.form.addClass('open');
              var event = new jQuery.Event('widget-added');
              wp.textWidgets.handleWidgetAdded(event, self.ui.form);
              wp.mediaWidgets.handleWidgetAdded(event, self.ui.form); // WP >= 4.9

              if (wp.customHtmlWidgets) {
                wp.customHtmlWidgets.handleWidgetAdded(event, self.ui.form);
              }
            }

            elementor.hooks.doAction('panel/widgets/' + self.model.get('widget') + '/controls/wp_widget/loaded', self);
          }
        });
      }
    });
    module.exports = ControlWPWidgetItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  60: [function (require, module, exports) {
    var ControlBaseDataView = require('elementor-controls/base-data'),
        ControlWysiwygItemView;

    ControlWysiwygItemView = ControlBaseDataView.extend({
      events: function events() {
        return _.extend(ControlBaseDataView.prototype.events.apply(this, arguments), {
          'keyup textarea.elementor-wp-editor': 'onBaseInputChange'
        });
      },
      // List of buttons to move {buttonToMove: afterButton}
      buttons: {
        addToBasic: {
          underline: 'italic'
        },
        addToAdvanced: {},
        moveToAdvanced: {
          blockquote: 'removeformat',
          alignleft: 'blockquote',
          aligncenter: 'alignleft',
          alignright: 'aligncenter'
        },
        moveToBasic: {},
        removeFromBasic: ['unlink', 'wp_more'],
        removeFromAdvanced: []
      },
      initialize: function initialize() {
        ControlBaseDataView.prototype.initialize.apply(this, arguments);
        var self = this;
        self.editorID = 'elementorwpeditor' + self.cid; // Wait a cycle before initializing the editors.

        _.defer(function () {
          // Initialize QuickTags, and set as the default mode.
          quicktags({
            buttons: 'strong,em,del,link,img,close',
            id: self.editorID
          });

          if (elementor.config.rich_editing_enabled) {
            switchEditors.go(self.editorID, 'tmce');
          }

          delete QTags.instances[0];
        });

        if (!elementor.config.rich_editing_enabled) {
          self.$el.addClass('elementor-rich-editing-disabled');
          return;
        }

        var editorConfig = {
          id: self.editorID,
          selector: '#' + self.editorID,
          setup: function setup(editor) {
            // Save the bind callback to allow overwrite it externally
            self.saveEditor = self.saveEditor.bind(self, editor);
            editor.on('keyup change undo redo SetContent', self.saveEditor);
          }
        };
        tinyMCEPreInit.mceInit[self.editorID] = _.extend(_.clone(tinyMCEPreInit.mceInit.elementorwpeditor), editorConfig);

        if (!elementor.config.tinymceHasCustomConfig) {
          self.rearrangeButtons();
        }
      },
      saveEditor: function saveEditor(editor) {
        editor.save();
        this.setValue(editor.getContent());
      },
      attachElContent: function attachElContent() {
        var editorTemplate = elementor.config.wp_editor.replace(/elementorwpeditor/g, this.editorID).replace('%%EDITORCONTENT%%', this.getControlValue());
        this.$el.html(editorTemplate);
        return this;
      },
      moveButtons: function moveButtons(buttonsToMove, from, to) {
        if (!to) {
          to = from;
          from = null;
        }

        _.each(buttonsToMove, function (afterButton, button) {
          var afterButtonIndex = to.indexOf(afterButton);

          if (from) {
            var buttonIndex = from.indexOf(button);

            if (-1 === buttonIndex) {
              throw new ReferenceError('Trying to move non-existing button `' + button + '`');
            }

            from.splice(buttonIndex, 1);
          }

          if (-1 === afterButtonIndex) {
            throw new ReferenceError('Trying to move button after non-existing button `' + afterButton + '`');
          }

          to.splice(afterButtonIndex + 1, 0, button);
        });
      },
      rearrangeButtons: function rearrangeButtons() {
        var editorProps = tinyMCEPreInit.mceInit[this.editorID],
            editorBasicToolbarButtons = editorProps.toolbar1.split(','),
            editorAdvancedToolbarButtons = editorProps.toolbar2.split(',');
        editorBasicToolbarButtons = _.difference(editorBasicToolbarButtons, this.buttons.removeFromBasic);
        editorAdvancedToolbarButtons = _.difference(editorAdvancedToolbarButtons, this.buttons.removeFromAdvanced);
        this.moveButtons(this.buttons.moveToBasic, editorAdvancedToolbarButtons, editorBasicToolbarButtons);
        this.moveButtons(this.buttons.moveToAdvanced, editorBasicToolbarButtons, editorAdvancedToolbarButtons);
        this.moveButtons(this.buttons.addToBasic, editorBasicToolbarButtons);
        this.moveButtons(this.buttons.addToAdvanced, editorAdvancedToolbarButtons);
        editorProps.toolbar1 = editorBasicToolbarButtons.join(',');
        editorProps.toolbar2 = editorAdvancedToolbarButtons.join(',');
      },
      onAfterExternalChange: function onAfterExternalChange() {
        var controlValue = this.getControlValue();
        tinymce.get(this.editorID).setContent(controlValue); // Update also the plain textarea

        jQuery('#' + this.editorID).val(controlValue);
      },
      onBeforeDestroy: function onBeforeDestroy() {
        // Remove TinyMCE and QuickTags instances
        delete QTags.instances[this.editorID];

        if (!elementor.config.rich_editing_enabled) {
          return;
        }

        tinymce.EditorManager.execCommand('mceRemoveEditor', true, this.editorID); // Cleanup PreInit data

        delete tinyMCEPreInit.mceInit[this.editorID];
        delete tinyMCEPreInit.qtInit[this.editorID];
      }
    });
    module.exports = ControlWysiwygItemView;
  }, {
    "elementor-controls/base-data": 32
  }],
  61: [function (require, module, exports) {
    /* global ElementorConfig */
    var App;

    Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate, options) {
      options = {
        evaluate: /<#([\s\S]+?)#>/g,
        interpolate: /{{{([\s\S]+?)}}}/g,
        escape: /{{([^}]+?)}}(?!})/g
      };
      return _.template(rawTemplate, options);
    };

    App = Marionette.Application.extend({
      helpers: require('elementor-editor-utils/helpers'),
      heartbeat: require('elementor-editor-utils/heartbeat'),
      imagesManager: require('elementor-editor-utils/images-manager'),
      debug: require('elementor-editor-utils/debug'),
      schemes: require('elementor-editor-utils/schemes'),
      presetsFactory: require('elementor-editor-utils/presets-factory'),
      templates: require('elementor-templates/manager'),
      ajax: require('elementor-editor-utils/ajax'),
      conditions: require('elementor-editor-utils/conditions'),
      hotKeys: require('elementor-utils/hot-keys'),
      history: require('modules/history/assets/js/module'),
      channels: {
        editor: Backbone.Radio.channel('ELEMENTOR:editor'),
        data: Backbone.Radio.channel('ELEMENTOR:data'),
        panelElements: Backbone.Radio.channel('ELEMENTOR:panelElements'),
        dataEditMode: Backbone.Radio.channel('ELEMENTOR:editmode'),
        deviceMode: Backbone.Radio.channel('ELEMENTOR:deviceMode'),
        templates: Backbone.Radio.channel('ELEMENTOR:templates')
      },
      // Exporting modules that can be used externally
      modules: {
        element: {
          Model: require('elementor-elements/models/element')
        },
        ControlsStack: require('elementor-views/controls-stack'),
        Module: require('elementor-utils/module'),
        RepeaterRowView: require('elementor-controls/repeater-row'),
        SettingsModel: require('elementor-elements/models/base-settings'),
        WidgetView: require('elementor-elements/views/widget'),
        panel: {
          Menu: require('elementor-panel/pages/menu/menu')
        },
        controls: {
          Base: require('elementor-controls/base'),
          BaseData: require('elementor-controls/base-data'),
          BaseMultiple: require('elementor-controls/base-multiple'),
          Button: require('elementor-controls/button'),
          Color: require('elementor-controls/color'),
          Dimensions: require('elementor-controls/dimensions'),
          Image_dimensions: require('elementor-controls/image-dimensions'),
          Media: require('elementor-controls/media'),
          Slider: require('elementor-controls/slider'),
          Wysiwyg: require('elementor-controls/wysiwyg'),
          Choose: require('elementor-controls/choose'),
          Url: require('elementor-controls/base-multiple'),
          Font: require('elementor-controls/font'),
          Section: require('elementor-controls/section'),
          Tab: require('elementor-controls/tab'),
          Repeater: require('elementor-controls/repeater'),
          Wp_widget: require('elementor-controls/wp_widget'),
          Icon: require('elementor-controls/icon'),
          Gallery: require('elementor-controls/gallery'),
          Select2: require('elementor-controls/select2'),
          Date_time: require('elementor-controls/date-time'),
          Code: require('elementor-controls/code'),
          Box_shadow: require('elementor-controls/box-shadow'),
          Text_shadow: require('elementor-controls/box-shadow'),
          Structure: require('elementor-controls/structure'),
          Animation: require('elementor-controls/select2'),
          Hover_animation: require('elementor-controls/select2'),
          Order: require('elementor-controls/order'),
          Switcher: require('elementor-controls/switcher'),
          Number: require('elementor-controls/number'),
          Popover_toggle: require('elementor-controls/popover-toggle')
        },
        saver: {
          footerBehavior: require('./components/saver/behaviors/footer-saver')
        },
        templateLibrary: {
          ElementsCollectionView: require('elementor-panel/pages/elements/views/elements')
        }
      },
      backgroundClickListeners: {
        popover: {
          element: '.elementor-controls-popover',
          ignore: '.elementor-control-popover-toggle-toggle, .elementor-control-popover-toggle-toggle-label'
        }
      },
      _defaultDeviceMode: 'desktop',
      addControlView: function addControlView(controlID, ControlView) {
        this.modules.controls[controlID[0].toUpperCase() + controlID.slice(1)] = ControlView;
      },
      checkEnvCompatibility: function checkEnvCompatibility() {
        return this.envData.gecko || this.envData.webkit;
      },
      getElementData: function getElementData(modelElement) {
        var elType = modelElement.get('elType');

        if ('widget' === elType) {
          var widgetType = modelElement.get('widgetType');

          if (!this.config.widgets[widgetType]) {
            return false;
          }

          return this.config.widgets[widgetType];
        }

        if (!this.config.elements[elType]) {
          return false;
        }

        return this.config.elements[elType];
      },
      getElementControls: function getElementControls(modelElement) {
        var self = this,
            elementData = self.getElementData(modelElement);

        if (!elementData) {
          return false;
        }

        var isInner = modelElement.get('isInner'),
            controls = {};

        _.each(elementData.controls, function (controlData, controlKey) {
          if (isInner && controlData.hide_in_inner || !isInner && controlData.hide_in_top) {
            return;
          }

          controls[controlKey] = _.extend({}, self.config.controls[controlData.type], controlData);
        });

        return controls;
      },
      getControlView: function getControlView(controlID) {
        var capitalizedControlName = controlID[0].toUpperCase() + controlID.slice(1),
            View = this.modules.controls[capitalizedControlName];

        if (!View) {
          var controlData = this.config.controls[controlID],
              isUIControl = -1 !== controlData.features.indexOf('ui');
          View = this.modules.controls[isUIControl ? 'Base' : 'BaseData'];
        }

        return View;
      },
      getPanelView: function getPanelView() {
        return this.getRegion('panel').currentView;
      },
      initEnvData: function initEnvData() {
        this.envData = _.pick(tinymce.EditorManager.Env, ['desktop', 'webkit', 'gecko', 'ie', 'opera']);
      },
      initComponents: function initComponents() {
        var EventManager = require('elementor-utils/hooks'),
            Settings = require('elementor-editor/components/settings/settings'),
            Saver = require('elementor-editor/components/saver/manager'),
            Notifications = require('elementor-editor-utils/notifications');

        this.hooks = new EventManager();
        this.saver = new Saver();
        this.settings = new Settings();
        /**
         * @deprecated - use `this.settings.page` instead
         */

        this.pageSettings = this.settings.page;
        this.templates.init();
        this.initDialogsManager();
        this.notifications = new Notifications();
        this.ajax.init();
      },
      initDialogsManager: function initDialogsManager() {
        this.dialogsManager = new DialogsManager.Instance();
      },
      initElements: function initElements() {
        var ElementCollection = require('elementor-elements/collections/elements'),
            config = this.config.data; // If it's an reload, use the not-saved data


        if (this.elements) {
          config = this.elements.toJSON();
        }

        this.elements = new ElementCollection(config);
      },
      initPreview: function initPreview() {
        var $ = jQuery;
        this.$previewWrapper = $('#elementor-preview');
        this.$previewResponsiveWrapper = $('#elementor-preview-responsive-wrapper');
        var previewIframeId = 'elementor-preview-iframe'; // Make sure the iFrame does not exist.

        if (!this.$preview) {
          this.$preview = $('<iframe>', {
            id: previewIframeId,
            src: this.config.preview_link + '&' + new Date().getTime(),
            allowfullscreen: 1
          });
          this.$previewResponsiveWrapper.append(this.$preview);
        }

        this.$preview.on('load', this.onPreviewLoaded.bind(this)).one('load', this.checkPageStatus.bind(this));
      },
      initFrontend: function initFrontend() {
        var frontendWindow = this.$preview[0].contentWindow;
        window.elementorFrontend = frontendWindow.elementorFrontend;
        frontendWindow.elementor = this;
        elementorFrontend.init();
        elementorFrontend.elementsHandler.initHandlers();
        this.trigger('frontend:init');
      },
      initClearPageDialog: function initClearPageDialog() {
        var self = this,
            dialog;

        self.getClearPageDialog = function () {
          if (dialog) {
            return dialog;
          }

          dialog = this.dialogsManager.createWidget('confirm', {
            id: 'elementor-clear-page-dialog',
            headerMessage: elementor.translate('clear_page'),
            message: elementor.translate('dialog_confirm_clear_page'),
            position: {
              my: 'center center',
              at: 'center center'
            },
            strings: {
              confirm: elementor.translate('delete'),
              cancel: elementor.translate('cancel')
            },
            onConfirm: function onConfirm() {
              self.getRegion('sections').currentView.collection.reset();
            }
          });
          return dialog;
        };
      },
      initHotKeys: function initHotKeys() {
        var keysDictionary = {
          del: 46,
          d: 68,
          l: 76,
          m: 77,
          p: 80,
          s: 83
        };
        var $ = jQuery,
            hotKeysHandlers = {},
            hotKeysManager = this.hotKeys;
        hotKeysHandlers[keysDictionary.del] = {
          deleteElement: {
            isWorthHandling: function isWorthHandling(event) {
              var isEditorOpen = 'editor' === elementor.getPanelView().getCurrentPageName();

              if (!isEditorOpen) {
                return false;
              }

              var $target = $(event.target);

              if ($target.is(':input, .elementor-input')) {
                return false;
              }

              return !$target.closest('.elementor-inline-editing').length;
            },
            handle: function handle() {
              elementor.getPanelView().getCurrentPageView().getOption('editedElementView').removeElement();
            }
          }
        };
        hotKeysHandlers[keysDictionary.d] = {
          duplicateElement: {
            isWorthHandling: function isWorthHandling(event) {
              return hotKeysManager.isControlEvent(event);
            },
            handle: function handle() {
              var panel = elementor.getPanelView();

              if ('editor' !== panel.getCurrentPageName()) {
                return;
              }

              panel.getCurrentPageView().getOption('editedElementView').duplicate();
            }
          }
        };
        hotKeysHandlers[keysDictionary.l] = {
          showTemplateLibrary: {
            isWorthHandling: function isWorthHandling(event) {
              return hotKeysManager.isControlEvent(event) && event.shiftKey;
            },
            handle: function handle() {
              elementor.templates.showTemplatesModal();
            }
          }
        };
        hotKeysHandlers[keysDictionary.m] = {
          changeDeviceMode: {
            devices: ['desktop', 'tablet', 'mobile'],
            isWorthHandling: function isWorthHandling(event) {
              return hotKeysManager.isControlEvent(event) && event.shiftKey;
            },
            handle: function handle() {
              var currentDeviceMode = elementor.channels.deviceMode.request('currentMode'),
                  modeIndex = this.devices.indexOf(currentDeviceMode);
              modeIndex++;

              if (modeIndex >= this.devices.length) {
                modeIndex = 0;
              }

              elementor.changeDeviceMode(this.devices[modeIndex]);
            }
          }
        };
        hotKeysHandlers[keysDictionary.p] = {
          changeEditMode: {
            isWorthHandling: function isWorthHandling(event) {
              return hotKeysManager.isControlEvent(event);
            },
            handle: function handle() {
              elementor.getPanelView().modeSwitcher.currentView.toggleMode();
            }
          }
        };
        hotKeysHandlers[keysDictionary.s] = {
          saveEditor: {
            isWorthHandling: function isWorthHandling(event) {
              return hotKeysManager.isControlEvent(event);
            },
            handle: function handle() {
              elementor.saver.saveDraft();
            }
          }
        };

        _.each(hotKeysHandlers, function (handlers, keyCode) {
          _.each(handlers, function (handler, handlerName) {
            hotKeysManager.addHotKeyHandler(keyCode, handlerName, handler);
          });
        });

        hotKeysManager.bindListener(this.$window.add(elementorFrontend.getElements('$window')));
      },
      preventClicksInsideEditor: function preventClicksInsideEditor() {
        this.$previewContents.on('click', function (event) {
          var $target = jQuery(event.target),
              editMode = elementor.channels.dataEditMode.request('activeMode'),
              isClickInsideElementor = !!$target.closest('#elementor, .pen-menu').length,
              isTargetInsideDocument = this.contains($target[0]);

          if (isClickInsideElementor && 'edit' === editMode || !isTargetInsideDocument) {
            return;
          }

          if ($target.closest('a:not(.elementor-clickable)').length) {
            event.preventDefault();
          }

          if (!isClickInsideElementor) {
            var panelView = elementor.getPanelView();

            if ('elements' !== panelView.getCurrentPageName()) {
              panelView.setPage('elements');
            }
          }
        });
      },
      addBackgroundClickArea: function addBackgroundClickArea(element) {
        element.addEventListener('click', this.onBackgroundClick.bind(this), true);
      },
      addBackgroundClickListener: function addBackgroundClickListener(key, listener) {
        this.backgroundClickListeners[key] = listener;
      },
      showFatalErrorDialog: function showFatalErrorDialog(options) {
        var defaultOptions = {
          id: 'elementor-fatal-error-dialog',
          headerMessage: '',
          message: '',
          position: {
            my: 'center center',
            at: 'center center'
          },
          strings: {
            confirm: elementor.translate('learn_more'),
            cancel: elementor.translate('go_back')
          },
          onConfirm: null,
          onCancel: function onCancel() {
            parent.history.go(-1);
          },
          hide: {
            onBackgroundClick: false,
            onButtonClick: false
          }
        };
        options = jQuery.extend(true, defaultOptions, options);
        this.dialogsManager.createWidget('confirm', options).show();
      },
      checkPageStatus: function checkPageStatus() {
        if (elementor.config.current_revision_id !== elementor.config.post_id) {
          this.notifications.showToast({
            message: this.translate('working_on_draft_notification'),
            buttons: [{
              name: 'view_revisions',
              text: elementor.translate('view_all_revisions'),
              callback: function callback() {
                var panel = elementor.getPanelView();
                panel.setPage('historyPage');
                panel.getCurrentPageView().activateTab('revisions');
              }
            }]
          });
        }
      },
      onStart: function onStart() {
        this.$window = jQuery(window);
        NProgress.start();
        NProgress.inc(0.2);
        this.config = ElementorConfig;
        Backbone.Radio.DEBUG = false;
        Backbone.Radio.tuneIn('ELEMENTOR');
        this.initComponents();
        this.initEnvData();

        if (!this.checkEnvCompatibility()) {
          this.onEnvNotCompatible();
        }

        this.channels.dataEditMode.reply('activeMode', 'edit');
        this.listenTo(this.channels.dataEditMode, 'switch', this.onEditModeSwitched);
        this.initClearPageDialog();
        this.addBackgroundClickArea(document);
        this.$window.trigger('elementor:init');
        this.initPreview();
        this.logSite();
      },
      onPreviewLoaded: function onPreviewLoaded() {
        NProgress.done();
        var previewWindow = this.$preview[0].contentWindow;

        if (!previewWindow.elementorFrontend) {
          this.onPreviewLoadingError();
          return;
        }

        this.$previewContents = this.$preview.contents();
        var $previewElementorEl = this.$previewContents.find('#elementor');

        if (!$previewElementorEl.length) {
          this.onPreviewElNotFound();
          return;
        }

        this.initFrontend();
        this.initElements();
        this.initHotKeys();
        this.heartbeat.init();
        var iframeRegion = new Marionette.Region({
          // Make sure you get the DOM object out of the jQuery object
          el: $previewElementorEl[0]
        });
        this.schemes.init();
        this.schemes.printSchemesStyle();
        this.preventClicksInsideEditor();
        this.addBackgroundClickArea(elementorFrontend.getElements('$document')[0]);

        var Preview = require('elementor-views/preview'),
            PanelLayoutView = require('elementor-layouts/panel/panel');

        this.addRegions({
          sections: iframeRegion,
          panel: '#elementor-panel'
        });
        this.getRegion('sections').show(new Preview({
          collection: this.elements
        }));
        this.getRegion('panel').show(new PanelLayoutView());
        this.$previewContents.children() // <html>
        .addClass('elementor-html').children('body').addClass('elementor-editor-active');
        this.setResizablePanel();
        this.changeDeviceMode(this._defaultDeviceMode);
        jQuery('#elementor-loading, #elementor-preview-loading').fadeOut(600);

        _.defer(function () {
          elementorFrontend.getElements('window').jQuery.holdReady(false);
        });

        this.enqueueTypographyFonts();
        this.onEditModeSwitched();
        this.trigger('preview:loaded');
      },
      onEditModeSwitched: function onEditModeSwitched() {
        var activeMode = this.channels.dataEditMode.request('activeMode');

        if ('edit' === activeMode) {
          this.exitPreviewMode();
        } else {
          this.enterPreviewMode('preview' === activeMode);
        }
      },
      onEnvNotCompatible: function onEnvNotCompatible() {
        this.showFatalErrorDialog({
          headerMessage: this.translate('device_incompatible_header'),
          message: this.translate('device_incompatible_message'),
          strings: {
            confirm: elementor.translate('proceed_anyway')
          },
          hide: {
            onButtonClick: true
          },
          onConfirm: function onConfirm() {
            this.hide();
          }
        });
      },
      onPreviewLoadingError: function onPreviewLoadingError() {
        this.showFatalErrorDialog({
          headerMessage: this.translate('preview_not_loading_header'),
          message: this.translate('preview_not_loading_message'),
          onConfirm: function onConfirm() {
            open(elementor.config.help_preview_error_url, '_blank');
          }
        });
      },
      onPreviewElNotFound: function onPreviewElNotFound() {
        this.showFatalErrorDialog({
          headerMessage: this.translate('preview_el_not_found_header'),
          message: this.translate('preview_el_not_found_message'),
          onConfirm: function onConfirm() {
            open(elementor.config.help_the_content_url, '_blank');
          }
        });
      },
      onBackgroundClick: function onBackgroundClick(event) {
        jQuery.each(this.backgroundClickListeners, function () {
          var elementToHide = this.element,
              $clickedTarget = jQuery(event.target); // If it's a label that associated with an input

          if ($clickedTarget[0].control) {
            $clickedTarget = $clickedTarget.add($clickedTarget[0].control);
          }

          if (this.ignore && $clickedTarget.closest(this.ignore).length) {
            return;
          }

          var $clickedTargetClosestElement = $clickedTarget.closest(elementToHide);
          jQuery(elementToHide).not($clickedTargetClosestElement).hide();
        });
      },
      setResizablePanel: function setResizablePanel() {
        var self = this,
            side = elementor.config.is_rtl ? 'right' : 'left';
        self.panel.$el.resizable({
          handles: elementor.config.is_rtl ? 'w' : 'e',
          minWidth: 200,
          maxWidth: 680,
          start: function start() {
            self.$previewWrapper.addClass('ui-resizable-resizing').css('pointer-events', 'none');
          },
          stop: function stop() {
            self.$previewWrapper.removeClass('ui-resizable-resizing').css('pointer-events', '');
            elementor.channels.data.trigger('scrollbar:update');
          },
          resize: function resize(event, ui) {
            self.$previewWrapper.css(side, ui.size.width);
          }
        });
      },
      enterPreviewMode: function enterPreviewMode(hidePanel) {
        var $elements = this.$previewContents.find('body');

        if (hidePanel) {
          $elements = $elements.add('body');
        }

        $elements.removeClass('elementor-editor-active').addClass('elementor-editor-preview');

        if (hidePanel) {
          // Handle panel resize
          this.$previewWrapper.css(elementor.config.is_rtl ? 'right' : 'left', '');
          this.panel.$el.css('width', '');
        }
      },
      exitPreviewMode: function exitPreviewMode() {
        this.$previewContents.find('body').add('body').removeClass('elementor-editor-preview').addClass('elementor-editor-active');
      },
      changeEditMode: function changeEditMode(newMode) {
        var dataEditMode = elementor.channels.dataEditMode,
            oldEditMode = dataEditMode.request('activeMode');
        dataEditMode.reply('activeMode', newMode);

        if (newMode !== oldEditMode) {
          dataEditMode.trigger('switch', newMode);
        }
      },
      reloadPreview: function reloadPreview() {
        jQuery('#elementor-preview-loading').show();
        this.$preview[0].contentWindow.location.reload(true);
      },
      clearPage: function clearPage() {
        this.getClearPageDialog().show();
      },
      changeDeviceMode: function changeDeviceMode(newDeviceMode) {
        var oldDeviceMode = this.channels.deviceMode.request('currentMode');

        if (oldDeviceMode === newDeviceMode) {
          return;
        }

        jQuery('body').removeClass('elementor-device-' + oldDeviceMode).addClass('elementor-device-' + newDeviceMode);
        this.channels.deviceMode.reply('previousMode', oldDeviceMode).reply('currentMode', newDeviceMode).trigger('change');
      },
      enqueueTypographyFonts: function enqueueTypographyFonts() {
        var self = this,
            typographyScheme = this.schemes.getScheme('typography');

        _.each(typographyScheme.items, function (item) {
          self.helpers.enqueueFont(item.value.font_family);
        });
      },
      translate: function translate(stringKey, templateArgs, i18nStack) {
        if (!i18nStack) {
          i18nStack = this.config.i18n;
        }

        var string = i18nStack[stringKey];

        if (undefined === string) {
          string = stringKey;
        }

        if (templateArgs) {
          string = string.replace(/{(\d+)}/g, function (match, number) {
            return undefined !== templateArgs[number] ? templateArgs[number] : match;
          });
        }

        return string;
      },
      compareVersions: function compareVersions(versionA, versionB, operator) {
        var prepareVersion = function prepareVersion(version) {
          version = version + '';
          return version.replace(/[^\d.]+/, '.-1.');
        };

        versionA = prepareVersion(versionA);
        versionB = prepareVersion(versionB);

        if (versionA === versionB) {
          return !operator || /^={2,3}$/.test(operator);
        }

        var versionAParts = versionA.split('.').map(Number),
            versionBParts = versionB.split('.').map(Number),
            longestVersionParts = Math.max(versionAParts.length, versionBParts.length);

        for (var i = 0; i < longestVersionParts; i++) {
          var valueA = versionAParts[i] || 0,
              valueB = versionBParts[i] || 0;

          if (valueA !== valueB) {
            return this.conditions.compare(valueA, valueB, operator);
          }
        }
      },
      logSite: function logSite() {
        var text = '',
            style = '';

        if (this.envData.gecko) {
          var asciiText = [' ;;;;;;;;;;;;;;; ', ';;;  ;;       ;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;       ;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;;;;;;;;;;;', ';;;  ;;       ;;;', ' ;;;;;;;;;;;;;;; '];
          text += '%c' + asciiText.join('\n') + '\n';
          style = 'color: #C42961';
        } else {
          text += '%c00';
          style = 'line-height: 1.6; font-size: 20px; background-image: url("' + elementor.config.assets_url + 'images/logo-icon.png"); color: transparent; background-repeat: no-repeat; background-size: cover';
        }

        text += '%c\nLove using Elementor? Join our growing community of Elementor developers: %chttps://github.com/pojome/elementor';
        setTimeout(console.log.bind(console, text, style, 'color: #9B0A46', ''));
      }
    });
    module.exports = (window.elementor = new App()).start();
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
  62: [function (require, module, exports) {
    var ElementModel = require('elementor-elements/models/element');

    var ElementsCollection = Backbone.Collection.extend({
      add: function add(models, options, isCorrectSet) {
        if ((!options || !options.silent) && !isCorrectSet) {
          throw 'Call Error: Adding model to element collection is allowed only by the dedicated addChildModel() method.';
        }

        return Backbone.Collection.prototype.add.call(this, models, options);
      },
      model: function model(attrs, options) {
        var ModelClass = Backbone.Model;

        if (attrs.elType) {
          ModelClass = elementor.hooks.applyFilters('element/model', ElementModel, attrs);
        }

        return new ModelClass(attrs, options);
      },
      clone: function clone() {
        var tempCollection = Backbone.Collection.prototype.clone.apply(this, arguments),
            newCollection = new ElementsCollection();
        tempCollection.forEach(function (model) {
          newCollection.add(model.clone(), null, true);
        });
        return newCollection;
      }
    });
    ElementsCollection.prototype.sync = ElementsCollection.prototype.fetch = ElementsCollection.prototype.save = _.noop;
    module.exports = ElementsCollection;
  }, {
    "elementor-elements/models/element": 65
  }],
  63: [function (require, module, exports) {
    var BaseSettingsModel;
    BaseSettingsModel = Backbone.Model.extend({
      options: {},
      initialize: function initialize(data, options) {
        var self = this;

        if (options) {
          // Keep the options for cloning
          self.options = options;
        }

        self.controls = options && options.controls ? options.controls : elementor.getElementControls(self);
        self.validators = {};

        if (!self.controls) {
          return;
        }

        var attrs = data || {},
            defaults = {};

        _.each(self.controls, function (field) {
          var control = elementor.config.controls[field.type],
              isUIControl = -1 !== control.features.indexOf('ui');

          if (isUIControl) {
            return;
          } // Check if the value is a plain object ( and not an array )


          var isMultipleControl = jQuery.isPlainObject(control.default_value);

          if (isMultipleControl) {
            defaults[field.name] = _.extend({}, control.default_value, field['default'] || {});
          } else {
            defaults[field.name] = field['default'] || control.default_value;
          }

          if (undefined !== attrs[field.name]) {
            if (isMultipleControl && !_.isObject(attrs[field.name])) {
              elementor.debug.addCustomError(new TypeError('An invalid argument supplied as multiple control value'), 'InvalidElementData', 'Element `' + (self.get('widgetType') || self.get('elType')) + '` got <' + attrs[field.name] + '> as `' + field.name + '` value. Expected array or object.');
              delete attrs[field.name];
            }
          }

          if (undefined === attrs[field.name]) {
            attrs[field.name] = defaults[field.name];
          }
        });

        self.defaults = defaults;
        self.handleRepeaterData(attrs);
        self.set(attrs);
      },
      handleRepeaterData: function handleRepeaterData(attrs) {
        _.each(this.controls, function (field) {
          if (field.is_repeater) {
            // TODO: Apply defaults on each field in repeater fields
            if (!(attrs[field.name] instanceof Backbone.Collection)) {
              attrs[field.name] = new Backbone.Collection(attrs[field.name], {
                model: function model(attrs, options) {
                  options = options || {};
                  options.controls = field.fields;

                  if (!attrs._id) {
                    attrs._id = elementor.helpers.getUniqueID();
                  }

                  return new BaseSettingsModel(attrs, options);
                }
              });
            }
          }
        });
      },
      getFontControls: function getFontControls() {
        return _.filter(this.getActiveControls(), function (control) {
          return 'font' === control.type;
        });
      },
      getStyleControls: function getStyleControls(controls) {
        var self = this;
        controls = controls || self.getActiveControls();
        return _.filter(controls, function (control) {
          if (control.fields) {
            control.styleFields = self.getStyleControls(control.fields);
            return true;
          }

          return self.isStyleControl(control.name, controls);
        });
      },
      isStyleControl: function isStyleControl(attribute, controls) {
        controls = controls || this.controls;

        var currentControl = _.find(controls, function (control) {
          return attribute === control.name;
        });

        return currentControl && !_.isEmpty(currentControl.selectors);
      },
      getClassControls: function getClassControls(controls) {
        controls = controls || this.controls;
        return _.filter(controls, function (control) {
          return !_.isUndefined(control.prefix_class);
        });
      },
      isClassControl: function isClassControl(attribute) {
        var currentControl = _.find(this.controls, function (control) {
          return attribute === control.name;
        });

        return currentControl && !_.isUndefined(currentControl.prefix_class);
      },
      getControl: function getControl(id) {
        return _.find(this.controls, function (control) {
          return id === control.name;
        });
      },
      getActiveControls: function getActiveControls() {
        var self = this,
            controls = {};

        _.each(self.controls, function (control, controlKey) {
          if (elementor.helpers.isActiveControl(control, self.attributes)) {
            controls[controlKey] = control;
          }
        });

        return controls;
      },
      clone: function clone() {
        return new BaseSettingsModel(elementor.helpers.cloneObject(this.attributes), elementor.helpers.cloneObject(this.options));
      },
      setExternalChange: function setExternalChange(key, value) {
        this.set(key, value);
        this.trigger('change:external', key, value).trigger('change:external:' + key, value);
      },
      toJSON: function toJSON(options) {
        var data = Backbone.Model.prototype.toJSON.call(this);
        options = options || {};
        delete data.widgetType;
        delete data.elType;
        delete data.isInner;

        _.each(data, function (attribute, key) {
          if (attribute && attribute.toJSON) {
            data[key] = attribute.toJSON();
          }
        });

        if (options.removeDefault) {
          var controls = this.controls;

          _.each(data, function (value, key) {
            var control = controls[key];

            if (control) {
              if (('text' === control.type || 'textarea' === control.type) && data[key]) {
                return;
              }

              if (data[key] && 'object' === _typeof(data[key])) {
                // First check length difference
                if (Object.keys(data[key]).length !== Object.keys(control['default']).length) {
                  return;
                } // If it's equal length, loop over value


                var isEqual = true;

                _.each(data[key], function (propertyValue, propertyKey) {
                  if (data[key][propertyKey] !== control['default'][propertyKey]) {
                    return isEqual = false;
                  }
                });

                if (isEqual) {
                  delete data[key];
                }
              } else {
                if (data[key] === control['default']) {
                  delete data[key];
                }
              }
            }
          });
        }

        return data;
      }
    });
    module.exports = BaseSettingsModel;
  }, {}],
  64: [function (require, module, exports) {
    var BaseSettingsModel = require('elementor-elements/models/base-settings'),
        ColumnSettingsModel;

    ColumnSettingsModel = BaseSettingsModel.extend({
      defaults: {
        _column_size: 100
      }
    });
    module.exports = ColumnSettingsModel;
  }, {
    "elementor-elements/models/base-settings": 63
  }],
  65: [function (require, module, exports) {
    var BaseSettingsModel = require('elementor-elements/models/base-settings'),
        ColumnSettingsModel = require('elementor-elements/models/column-settings'),
        ElementModel;

    ElementModel = Backbone.Model.extend({
      defaults: {
        id: '',
        elType: '',
        isInner: false,
        settings: {},
        defaultEditSettings: {}
      },
      remoteRender: false,
      _htmlCache: null,
      _jqueryXhr: null,
      renderOnLeave: false,
      initialize: function initialize(options) {
        var elType = this.get('elType'),
            elements = this.get('elements');

        if (undefined !== elements) {
          var ElementsCollection = require('elementor-elements/collections/elements');

          this.set('elements', new ElementsCollection(elements));
        }

        if ('widget' === elType) {
          this.remoteRender = true;
          this.setHtmlCache(options.htmlCache || '');
        } // No need this variable anymore


        delete options.htmlCache; // Make call to remote server as throttle function

        this.renderRemoteServer = _.throttle(this.renderRemoteServer, 1000);
        this.initSettings();
        this.initEditSettings();
        this.on({
          destroy: this.onDestroy,
          'editor:close': this.onCloseEditor
        });
      },
      initSettings: function initSettings() {
        var elType = this.get('elType'),
            settings = this.get('settings'),
            settingModels = {
          column: ColumnSettingsModel
        },
            SettingsModel = settingModels[elType] || BaseSettingsModel;

        if (jQuery.isEmptyObject(settings)) {
          settings = elementor.helpers.cloneObject(settings);
        }

        if ('widget' === elType) {
          settings.widgetType = this.get('widgetType');
        }

        settings.elType = elType;
        settings.isInner = this.get('isInner');
        settings = new SettingsModel(settings);
        this.set('settings', settings);
        elementorFrontend.config.elements.data[this.cid] = settings;
      },
      initEditSettings: function initEditSettings() {
        var editSettings = new Backbone.Model(this.get('defaultEditSettings'));
        this.set('editSettings', editSettings);
        elementorFrontend.config.elements.editSettings[this.cid] = editSettings;
      },
      onDestroy: function onDestroy() {
        // Clean the memory for all use instances
        var settings = this.get('settings'),
            elements = this.get('elements');

        if (undefined !== elements) {
          _.each(_.clone(elements.models), function (model) {
            model.destroy();
          });
        }

        if (settings instanceof BaseSettingsModel) {
          settings.destroy();
        }
      },
      onCloseEditor: function onCloseEditor() {
        this.initEditSettings();

        if (this.renderOnLeave) {
          this.renderRemoteServer();
        }
      },
      setSetting: function setSetting(key, value) {
        var keyParts = key.split('.'),
            isRepeaterKey = 3 === keyParts.length,
            settings = this.get('settings');
        key = keyParts[0];

        if (isRepeaterKey) {
          settings = settings.get(key).models[keyParts[1]];
          key = keyParts[2];
        }

        settings.setExternalChange(key, value);
      },
      getSetting: function getSetting(key) {
        var keyParts = key.split('.'),
            isRepeaterKey = 3 === keyParts.length,
            settings = this.get('settings');
        key = keyParts[0];
        var value = settings.get(key);

        if (undefined === value) {
          return '';
        }

        if (isRepeaterKey) {
          value = value.models[keyParts[1]].get(keyParts[2]);
        }

        return value;
      },
      setHtmlCache: function setHtmlCache(htmlCache) {
        this._htmlCache = htmlCache;
      },
      getHtmlCache: function getHtmlCache() {
        return this._htmlCache;
      },
      getTitle: function getTitle() {
        var elementData = elementor.getElementData(this);
        return elementData ? elementData.title : 'Unknown';
      },
      getIcon: function getIcon() {
        var elementData = elementor.getElementData(this);
        return elementData ? elementData.icon : 'unknown';
      },
      createRemoteRenderRequest: function createRemoteRenderRequest() {
        var data = this.toJSON();
        return elementor.ajax.send('render_widget', {
          data: {
            post_id: elementor.config.post_id,
            data: JSON.stringify(data),
            _nonce: elementor.config.nonce
          },
          success: this.onRemoteGetHtml.bind(this)
        });
      },
      renderRemoteServer: function renderRemoteServer() {
        if (!this.remoteRender) {
          return;
        }

        this.renderOnLeave = false;
        this.trigger('before:remote:render');

        if (this.isRemoteRequestActive()) {
          this._jqueryXhr.abort();
        }

        this._jqueryXhr = this.createRemoteRenderRequest();
      },
      isRemoteRequestActive: function isRemoteRequestActive() {
        return this._jqueryXhr && 4 !== this._jqueryXhr.readyState;
      },
      onRemoteGetHtml: function onRemoteGetHtml(data) {
        this.setHtmlCache(data.render);
        this.trigger('remote:render');
      },
      clone: function clone() {
        var newModel = new this.constructor(elementor.helpers.cloneObject(this.attributes));
        newModel.set('id', elementor.helpers.getUniqueID());
        newModel.setHtmlCache(this.getHtmlCache());
        var elements = this.get('elements');

        if (!_.isEmpty(elements)) {
          newModel.set('elements', elements.clone());
        }

        return newModel;
      },
      toJSON: function toJSON(options) {
        options = _.extend({
          copyHtmlCache: false
        }, options); // Call parent's toJSON method

        var data = Backbone.Model.prototype.toJSON.call(this);

        _.each(data, function (attribute, key) {
          if (attribute && attribute.toJSON) {
            data[key] = attribute.toJSON(options);
          }
        });

        if (options.copyHtmlCache) {
          data.htmlCache = this.getHtmlCache();
        } else {
          delete data.htmlCache;
        }

        return data;
      }
    });
    ElementModel.prototype.sync = ElementModel.prototype.fetch = ElementModel.prototype.save = _.noop;
    module.exports = ElementModel;
  }, {
    "elementor-elements/collections/elements": 62,
    "elementor-elements/models/base-settings": 63,
    "elementor-elements/models/column-settings": 64
  }],
  66: [function (require, module, exports) {
    var BaseSettingsModel = require('elementor-elements/models/base-settings'),
        ControlsCSSParser = require('elementor-editor-utils/controls-css-parser'),
        Validator = require('elementor-validator/base'),
        BaseContainer = require('elementor-views/base-container'),
        BaseElementView;

    BaseElementView = BaseContainer.extend({
      tagName: 'div',
      controlsCSSParser: null,
      toggleEditTools: true,
      allowRender: true,
      renderAttributes: {},
      className: function className() {
        return 'elementor-element elementor-element-edit-mode ' + this.getElementUniqueID();
      },
      attributes: function attributes() {
        var type = this.model.get('elType');

        if ('widget' === type) {
          type = this.model.get('widgetType');
        }

        return {
          'data-id': this.getID(),
          'data-element_type': type
        };
      },
      ui: function ui() {
        return {
          triggerButton: '> .elementor-element-overlay .elementor-editor-element-trigger',
          duplicateButton: '> .elementor-element-overlay .elementor-editor-element-duplicate',
          removeButton: '> .elementor-element-overlay .elementor-editor-element-remove',
          saveButton: '> .elementor-element-overlay .elementor-editor-element-save',
          settingsList: '> .elementor-element-overlay .elementor-editor-element-settings',
          addButton: '> .elementor-element-overlay .elementor-editor-element-add'
        };
      },
      behaviors: function behaviors() {
        var behaviors = {};
        return elementor.hooks.applyFilters('elements/base/behaviors', behaviors, this);
      },
      getBehavior: function getBehavior(name) {
        return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
      },
      events: function events() {
        return {
          'click @ui.removeButton': 'onClickRemove',
          'click @ui.saveButton': 'onClickSave',
          'click @ui.duplicateButton': 'onClickDuplicate',
          'click @ui.triggerButton': 'onClickEdit'
        };
      },
      getElementType: function getElementType() {
        return this.model.get('elType');
      },
      getIDInt: function getIDInt() {
        return parseInt(this.getID(), 16);
      },
      getChildType: function getChildType() {
        return elementor.helpers.getElementChildType(this.getElementType());
      },
      getChildView: function getChildView(model) {
        var ChildView,
            elType = model.get('elType');

        if ('section' === elType) {
          ChildView = require('elementor-elements/views/section');
        } else if ('column' === elType) {
          ChildView = require('elementor-elements/views/column');
        } else {
          ChildView = elementor.modules.WidgetView;
        }

        return elementor.hooks.applyFilters('element/view', ChildView, model, this);
      },
      // TODO: backward compatibility method since 1.8.0
      templateHelpers: function templateHelpers() {
        var templateHelpers = BaseContainer.prototype.templateHelpers.apply(this, arguments);
        return jQuery.extend(templateHelpers, {
          editModel: this.getEditModel() // @deprecated. Use view.getEditModel() instead.

        });
      },
      getTemplateType: function getTemplateType() {
        return 'js';
      },
      getEditModel: function getEditModel() {
        return this.model;
      },
      initialize: function initialize() {
        // grab the child collection from the parent model
        // so that we can render the collection as children
        // of this parent element
        this.collection = this.model.get('elements');

        if (this.collection) {
          this.listenTo(this.collection, 'add remove reset', this.onCollectionChanged, this);
        }

        var editModel = this.getEditModel();
        this.listenTo(editModel.get('settings'), 'change', this.onSettingsChanged, this);
        this.listenTo(editModel.get('editSettings'), 'change', this.onEditSettingsChanged, this);
        this.initControlsCSSParser();
      },
      edit: function edit() {
        elementor.getPanelView().openEditor(this.getEditModel(), this);
      },
      addElementFromPanel: function addElementFromPanel(options) {
        var elementView = elementor.channels.panelElements.request('element:selected');
        var itemData = {
          id: elementor.helpers.getUniqueID(),
          elType: elementView.model.get('elType')
        };

        if ('widget' === itemData.elType) {
          itemData.widgetType = elementView.model.get('widgetType');
        } else if ('section' === itemData.elType) {
          itemData.elements = [];
          itemData.isInner = true;
        } else {
          return;
        }

        var customData = elementView.model.get('custom');

        if (customData) {
          _.extend(itemData, customData);
        }

        elementor.channels.data.trigger('element:before:add', itemData);
        var newView = this.addChildElement(itemData, options);

        if ('section' === newView.getElementType() && newView.isInner()) {
          newView.addEmptyColumn();
        }

        elementor.channels.data.trigger('element:after:add', itemData);
      },
      addControlValidator: function addControlValidator(controlName, validationCallback) {
        validationCallback = validationCallback.bind(this);
        var validator = new Validator({
          customValidationMethod: validationCallback
        }),
            validators = this.getEditModel().get('settings').validators;

        if (!validators[controlName]) {
          validators[controlName] = [];
        }

        validators[controlName].push(validator);
      },
      addRenderAttribute: function addRenderAttribute(element, key, value, overwrite) {
        var self = this;

        if ('object' === _typeof(element)) {
          jQuery.each(element, function (elementKey) {
            self.addRenderAttribute(elementKey, this, null, overwrite);
          });
          return self;
        }

        if ('object' === _typeof(key)) {
          jQuery.each(key, function (attributeKey) {
            self.addRenderAttribute(element, attributeKey, this, overwrite);
          });
          return self;
        }

        if (!self.renderAttributes[element]) {
          self.renderAttributes[element] = {};
        }

        if (!self.renderAttributes[element][key]) {
          self.renderAttributes[element][key] = [];
        }

        if (!Array.isArray(value)) {
          value = [value];
        }

        if (overwrite) {
          self.renderAttributes[element][key] = value;
        } else {
          self.renderAttributes[element][key] = self.renderAttributes[element][key].concat(value);
        }
      },
      getRenderAttributeString: function getRenderAttributeString(element) {
        if (!this.renderAttributes[element]) {
          return '';
        }

        var renderAttributes = this.renderAttributes[element],
            attributes = [];
        jQuery.each(renderAttributes, function (attributeKey) {
          attributes.push(attributeKey + '="' + _.escape(this.join(' ')) + '"');
        });
        return attributes.join(' ');
      },
      isCollectionFilled: function isCollectionFilled() {
        return false;
      },
      isInner: function isInner() {
        return !!this.model.get('isInner');
      },
      initControlsCSSParser: function initControlsCSSParser() {
        this.controlsCSSParser = new ControlsCSSParser({
          id: this.model.cid
        });
      },
      enqueueFonts: function enqueueFonts() {
        var editModel = this.getEditModel(),
            settings = editModel.get('settings');

        _.each(settings.getFontControls(), function (control) {
          var fontFamilyName = editModel.getSetting(control.name);

          if (_.isEmpty(fontFamilyName)) {
            return;
          }

          elementor.helpers.enqueueFont(fontFamilyName);
        });
      },
      renderStyles: function renderStyles(settings) {
        if (!settings) {
          settings = this.getEditModel().get('settings');
        }

        this.controlsCSSParser.stylesheet.empty();
        this.controlsCSSParser.addStyleRules(settings.getStyleControls(), settings.attributes, this.getEditModel().get('settings').controls, [/{{ID}}/g, /{{WRAPPER}}/g], [this.getID(), '#elementor .' + this.getElementUniqueID()]);
        this.controlsCSSParser.addStyleToDocument();
        var extraCSS = elementor.hooks.applyFilters('editor/style/styleText', '', this);

        if (extraCSS) {
          this.controlsCSSParser.elements.$stylesheetElement.append(extraCSS);
        }
      },
      renderCustomClasses: function renderCustomClasses() {
        var self = this;
        var settings = self.getEditModel().get('settings'),
            classControls = settings.getClassControls(); // Remove all previous classes

        _.each(classControls, function (control) {
          var previousClassValue = settings.previous(control.name);

          if (control.classes_dictionary) {
            if (undefined !== control.classes_dictionary[previousClassValue]) {
              previousClassValue = control.classes_dictionary[previousClassValue];
            }
          }

          self.$el.removeClass(control.prefix_class + previousClassValue);
        }); // Add new classes


        _.each(classControls, function (control) {
          var value = settings.attributes[control.name],
              classValue = value;

          if (control.classes_dictionary) {
            if (undefined !== control.classes_dictionary[value]) {
              classValue = control.classes_dictionary[value];
            }
          }

          var isVisible = elementor.helpers.isActiveControl(control, settings.attributes);

          if (isVisible && !_.isEmpty(classValue)) {
            self.$el.addClass(control.prefix_class + classValue).addClass(_.result(self, 'className'));
          }
        });
      },
      renderCustomElementID: function renderCustomElementID() {
        var customElementID = this.getEditModel().get('settings').get('_element_id');
        this.$el.attr('id', customElementID);
      },
      getModelForRender: function getModelForRender() {
        return elementor.hooks.applyFilters('element/templateHelpers/editModel', this.getEditModel(), this);
      },
      renderUIOnly: function renderUIOnly() {
        var editModel = this.getModelForRender();
        this.renderStyles(editModel.get('settings'));
        this.renderCustomClasses();
        this.renderCustomElementID();
        this.enqueueFonts();
      },
      renderUI: function renderUI() {
        this.renderStyles();
        this.renderCustomClasses();
        this.renderCustomElementID();
        this.enqueueFonts();
      },
      runReadyTrigger: function runReadyTrigger() {
        var self = this;

        _.defer(function () {
          elementorFrontend.elementsHandler.runReadyTrigger(self.$el);
        });
      },
      getID: function getID() {
        return this.model.get('id');
      },
      getElementUniqueID: function getElementUniqueID() {
        return 'elementor-element-' + this.getID();
      },
      duplicate: function duplicate() {
        this.trigger('request:duplicate');
      },
      renderOnChange: function renderOnChange(settings) {
        if (!this.allowRender) {
          return;
        } // Make sure is correct model


        if (settings instanceof BaseSettingsModel) {
          var hasChanged = settings.hasChanged(),
              isContentChanged = !hasChanged,
              isRenderRequired = !hasChanged;

          _.each(settings.changedAttributes(), function (settingValue, settingKey) {
            var control = settings.getControl(settingKey);

            if ('_column_size' === settingKey) {
              isRenderRequired = true;
              return;
            }

            if (!control) {
              isRenderRequired = true;
              isContentChanged = true;
              return;
            }

            if ('none' !== control.render_type) {
              isRenderRequired = true;
            }

            if (-1 !== ['none', 'ui'].indexOf(control.render_type)) {
              return;
            }

            if ('template' === control.render_type || !settings.isStyleControl(settingKey) && !settings.isClassControl(settingKey) && '_element_id' !== settingKey) {
              isContentChanged = true;
            }
          });

          if (!isRenderRequired) {
            return;
          }

          if (!isContentChanged) {
            this.renderUIOnly();
            return;
          }
        } // Re-render the template


        var templateType = this.getTemplateType(),
            editModel = this.getEditModel();

        if ('js' === templateType) {
          this.getEditModel().setHtmlCache();
          this.render();
          editModel.renderOnLeave = true;
        } else {
          editModel.renderRemoteServer();
        }
      },
      onBeforeRender: function onBeforeRender() {
        this.renderAttributes = {};
      },
      onRender: function onRender() {
        var self = this;
        self.renderUI();
        self.runReadyTrigger();

        if (self.toggleEditTools) {
          var triggerButton = self.ui.triggerButton;
          self.ui.settingsList.hoverIntent(function () {
            triggerButton.addClass('elementor-active');
          }, function () {
            triggerButton.removeClass('elementor-active');
          }, {
            timeout: 500
          });
        }
      },
      onCollectionChanged: function onCollectionChanged() {
        elementor.saver.setFlagEditorChange(true);
      },
      onEditSettingsChanged: function onEditSettingsChanged(changedModel) {
        elementor.channels.editor.trigger('change:editSettings', changedModel, this);
      },
      onSettingsChanged: function onSettingsChanged(changedModel) {
        elementor.saver.setFlagEditorChange(true);
        this.renderOnChange(changedModel);
      },
      onClickEdit: function onClickEdit(event) {
        if (!jQuery(event.target).closest('.elementor-clickable').length) {
          event.preventDefault();
          event.stopPropagation();
        }

        var activeMode = elementor.channels.dataEditMode.request('activeMode');

        if ('edit' !== activeMode) {
          return;
        }

        this.edit();
      },
      onClickDuplicate: function onClickDuplicate(event) {
        event.preventDefault();
        event.stopPropagation();
        this.duplicate();
      },
      removeElement: function removeElement() {
        elementor.channels.data.trigger('element:before:remove', this.model);
        var parent = this._parent;
        parent.isManualRemoving = true;
        this.model.destroy();
        parent.isManualRemoving = false;
        elementor.channels.data.trigger('element:after:remove', this.model);
      },
      onClickRemove: function onClickRemove(event) {
        event.preventDefault();
        event.stopPropagation();
        this.removeElement();
      },
      onClickSave: function onClickSave(event) {
        event.preventDefault();
        var model = this.model;
        elementor.templates.startModal({
          onReady: function onReady() {
            elementor.templates.getLayout().showSaveTemplateView(model);
          }
        });
      },
      onDestroy: function onDestroy() {
        this.controlsCSSParser.removeStyleFromDocument();
      }
    });
    module.exports = BaseElementView;
  }, {
    "elementor-editor-utils/controls-css-parser": 105,
    "elementor-elements/models/base-settings": 63,
    "elementor-elements/views/column": 74,
    "elementor-elements/views/section": 75,
    "elementor-validator/base": 30,
    "elementor-views/base-container": 119
  }],
  67: [function (require, module, exports) {
    var HandleAddDuplicateBehavior;
    HandleAddDuplicateBehavior = Marionette.Behavior.extend({
      onChildviewClickNew: function onChildviewClickNew(childView) {
        var currentIndex = childView.$el.index() + 1;
        this.addChild({
          at: currentIndex
        });
      },
      onRequestNew: function onRequestNew() {
        this.addChild();
      },
      addChild: function addChild(options) {
        if (this.view.isCollectionFilled()) {
          return;
        }

        options = options || {};
        var newItem = {
          id: elementor.helpers.getUniqueID(),
          elType: this.view.getChildType()[0],
          settings: {},
          elements: []
        };
        elementor.channels.data.trigger('element:before:add', newItem);
        this.view.addChildModel(newItem, options);
        elementor.channels.data.trigger('element:after:add', newItem);
      }
    });
    module.exports = HandleAddDuplicateBehavior;
  }, {}],
  68: [function (require, module, exports) {
    var HandleDuplicateBehavior;
    HandleDuplicateBehavior = Marionette.Behavior.extend({
      onChildviewRequestDuplicate: function onChildviewRequestDuplicate(childView) {
        if (this.view.isCollectionFilled()) {
          return;
        }

        var currentIndex = this.view.collection.indexOf(childView.model),
            newModel = childView.model.clone();
        elementor.channels.data.trigger('element:before:duplicate', newModel);
        this.view.addChildModel(newModel, {
          at: currentIndex + 1
        });
        elementor.channels.data.trigger('element:after:duplicate', newModel);
      }
    });
    module.exports = HandleDuplicateBehavior;
  }, {}],
  69: [function (require, module, exports) {
    var InlineEditingBehavior;
    InlineEditingBehavior = Marionette.Behavior.extend({
      editing: false,
      $currentEditingArea: null,
      ui: function ui() {
        return {
          inlineEditingArea: '.' + this.getOption('inlineEditingClass')
        };
      },
      events: function events() {
        return {
          'click @ui.inlineEditingArea': 'onInlineEditingClick',
          'input @ui.inlineEditingArea': 'onInlineEditingUpdate'
        };
      },
      getEditingSettingKey: function getEditingSettingKey() {
        return this.$currentEditingArea.data().elementorSettingKey;
      },
      startEditing: function startEditing($element) {
        if (this.editing || 'edit' !== elementor.channels.dataEditMode.request('activeMode') || this.view.model.isRemoteRequestActive()) {
          return;
        }

        this.$currentEditingArea = $element;
        var elementData = this.$currentEditingArea.data(),
            elementDataToolbar = elementData.elementorInlineEditingToolbar,
            mode = 'advanced' === elementDataToolbar ? 'advanced' : 'basic',
            editModel = this.view.getEditModel(),
            inlineEditingConfig = elementor.config.inlineEditing,
            contentHTML = editModel.getSetting(this.getEditingSettingKey());

        if ('advanced' === mode) {
          contentHTML = wp.editor.autop(contentHTML);
        }
        /**
         *  Replace rendered content with unrendered content.
         *  This way the user can edit the original content, before shortcodes and oEmbeds are fired.
         */


        this.$currentEditingArea.html(contentHTML);
        var ElementorInlineEditor = elementorFrontend.getElements('window').ElementorInlineEditor;
        this.editing = true;
        this.view.allowRender = false; // Avoid retrieving of old content (e.g. in case of sorting)

        this.view.model.setHtmlCache('');
        this.editor = new ElementorInlineEditor({
          linksInNewWindow: true,
          stay: false,
          editor: this.$currentEditingArea[0],
          mode: mode,
          list: 'none' === elementDataToolbar ? [] : inlineEditingConfig.toolbar[elementDataToolbar || 'basic'],
          cleanAttrs: ['id', 'class', 'name'],
          placeholder: elementor.translate('type_here') + '...',
          toolbarIconsPrefix: 'eicon-editor-',
          toolbarIconsDictionary: {
            externalLink: {
              className: 'eicon-editor-external-link'
            },
            list: {
              className: 'eicon-editor-list-ul'
            },
            insertOrderedList: {
              className: 'eicon-editor-list-ol'
            },
            insertUnorderedList: {
              className: 'eicon-editor-list-ul'
            },
            createlink: {
              className: 'eicon-editor-link'
            },
            unlink: {
              className: 'eicon-editor-unlink'
            },
            blockquote: {
              className: 'eicon-editor-quote'
            },
            p: {
              className: 'eicon-editor-paragraph'
            },
            pre: {
              className: 'eicon-editor-code'
            }
          }
        });
        var $menuItems = jQuery(this.editor._menu).children();
        /**
         * When the edit area is not focused (on blur) the inline editing is stopped.
         * In order to prevent blur event when the user clicks on toolbar buttons while editing the
         * content, we need the prevent their mousedown event. This also prevents the blur event.
         */

        $menuItems.on('mousedown', function (event) {
          event.preventDefault();
        });
        this.$currentEditingArea.on('blur', this.onInlineEditingBlur.bind(this));
      },
      stopEditing: function stopEditing() {
        this.editing = false;
        this.editor.destroy();
        this.view.allowRender = true;
        /**
         * Inline editing has several toolbar types (advanced, basic and none). When editing is stopped,
         * we need to rerender the area. To prevent multiple renderings, we will render only areas that
         * use advanced toolbars.
         */

        if ('advanced' === this.$currentEditingArea.data().elementorInlineEditingToolbar) {
          this.view.getEditModel().renderRemoteServer();
        }
      },
      onInlineEditingClick: function onInlineEditingClick(event) {
        var self = this,
            $targetElement = jQuery(event.currentTarget);
        /**
         * When starting inline editing we need to set timeout, this allows other inline items to finish
         * their operations before focusing new editing area.
         */

        setTimeout(function () {
          self.startEditing($targetElement);
        }, 30);
      },
      onInlineEditingBlur: function onInlineEditingBlur() {
        var self = this;
        /**
         * When exiting inline editing we need to set timeout, to make sure there is no focus on internal
         * toolbar action. This prevent the blur and allows the user to continue the inline editing.
         */

        setTimeout(function () {
          var selection = elementorFrontend.getElements('window').getSelection(),
              $focusNode = jQuery(selection.focusNode);

          if ($focusNode.closest('.pen-input-wrapper').length) {
            return;
          }

          self.stopEditing();
        }, 20);
      },
      onInlineEditingUpdate: function onInlineEditingUpdate() {
        this.view.getEditModel().setSetting(this.getEditingSettingKey(), this.editor.getContent());
      }
    });
    module.exports = InlineEditingBehavior;
  }, {}],
  70: [function (require, module, exports) {
    var InnerTabsBehavior;
    InnerTabsBehavior = Marionette.Behavior.extend({
      onRenderCollection: function onRenderCollection() {
        this.handleInnerTabs(this.view);
      },
      handleInnerTabs: function handleInnerTabs(parent) {
        var closedClass = 'elementor-tab-close',
            activeClass = 'elementor-tab-active',
            tabsWrappers = parent.children.filter(function (view) {
          return 'tabs' === view.model.get('type');
        });

        _.each(tabsWrappers, function (view) {
          view.$el.find('.elementor-control-content').remove();
          var tabsId = view.model.get('name'),
              tabs = parent.children.filter(function (childView) {
            return 'tab' === childView.model.get('type') && childView.model.get('tabs_wrapper') === tabsId;
          });

          _.each(tabs, function (childView, index) {
            view._addChildView(childView);

            var tabId = childView.model.get('name'),
                controlsUnderTab = parent.children.filter(function (view) {
              return tabId === view.model.get('inner_tab');
            });

            if (0 === index) {
              childView.$el.addClass(activeClass);
            } else {
              _.each(controlsUnderTab, function (view) {
                view.$el.addClass(closedClass);
              });
            }
          });
        });
      },
      onChildviewControlTabClicked: function onChildviewControlTabClicked(childView) {
        var closedClass = 'elementor-tab-close',
            activeClass = 'elementor-tab-active',
            tabClicked = childView.model.get('name'),
            childrenUnderTab = this.view.children.filter(function (view) {
          return 'tab' !== view.model.get('type') && childView.model.get('tabs_wrapper') === view.model.get('tabs_wrapper');
        }),
            siblingTabs = this.view.children.filter(function (view) {
          return 'tab' === view.model.get('type') && childView.model.get('tabs_wrapper') === view.model.get('tabs_wrapper');
        });

        _.each(siblingTabs, function (view) {
          view.$el.removeClass(activeClass);
        });

        childView.$el.addClass(activeClass);

        _.each(childrenUnderTab, function (view) {
          if (view.model.get('inner_tab') === tabClicked) {
            view.$el.removeClass(closedClass);
          } else {
            view.$el.addClass(closedClass);
          }
        });

        elementor.channels.data.trigger('scrollbar:update');
      }
    });
    module.exports = InnerTabsBehavior;
  }, {}],
  71: [function (require, module, exports) {
    var ResizableBehavior;
    ResizableBehavior = Marionette.Behavior.extend({
      defaults: {
        handles: elementor.config.is_rtl ? 'w' : 'e'
      },
      events: {
        resizestart: 'onResizeStart',
        resizestop: 'onResizeStop',
        resize: 'onResize'
      },
      initialize: function initialize() {
        Marionette.Behavior.prototype.initialize.apply(this, arguments);
        this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeSwitched);
      },
      active: function active() {
        this.deactivate();

        var options = _.clone(this.options);

        delete options.behaviorClass;

        var $childViewContainer = this.getChildViewContainer(),
            defaultResizableOptions = {},
            resizableOptions = _.extend(defaultResizableOptions, options);

        $childViewContainer.resizable(resizableOptions);
      },
      deactivate: function deactivate() {
        if (this.getChildViewContainer().resizable('instance')) {
          this.getChildViewContainer().resizable('destroy');
        }
      },
      onEditModeSwitched: function onEditModeSwitched(activeMode) {
        if ('edit' === activeMode) {
          this.active();
        } else {
          this.deactivate();
        }
      },
      onRender: function onRender() {
        var self = this;

        _.defer(function () {
          self.onEditModeSwitched(elementor.channels.dataEditMode.request('activeMode'));
        });
      },
      onDestroy: function onDestroy() {
        this.deactivate();
      },
      onResizeStart: function onResizeStart(event) {
        event.stopPropagation();
        this.view.$el.data('originalWidth', this.view.el.getBoundingClientRect().width);
        this.view.triggerMethod('request:resize:start', event);
      },
      onResizeStop: function onResizeStop(event) {
        event.stopPropagation();
        this.view.triggerMethod('request:resize:stop');
      },
      onResize: function onResize(event, ui) {
        event.stopPropagation();
        this.view.triggerMethod('request:resize', ui, event);
      },
      getChildViewContainer: function getChildViewContainer() {
        return this.$el;
      }
    });
    module.exports = ResizableBehavior;
  }, {}],
  72: [function (require, module, exports) {
    var SortableBehavior;
    SortableBehavior = Marionette.Behavior.extend({
      defaults: {
        elChildType: 'widget'
      },
      events: {
        'sortstart': 'onSortStart',
        'sortreceive': 'onSortReceive',
        'sortupdate': 'onSortUpdate',
        'sortover': 'onSortOver',
        'sortout': 'onSortOut'
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeSwitched).listenTo(elementor.channels.deviceMode, 'change', this.onDeviceModeChange);
      },
      onEditModeSwitched: function onEditModeSwitched(activeMode) {
        if ('edit' === activeMode) {
          this.activate();
        } else {
          this.deactivate();
        }
      },
      onDeviceModeChange: function onDeviceModeChange() {
        var deviceMode = elementor.channels.deviceMode.request('currentMode');

        if ('desktop' === deviceMode) {
          this.activate();
        } else {
          this.deactivate();
        }
      },
      onRender: function onRender() {
        var self = this;

        _.defer(function () {
          self.onEditModeSwitched(elementor.channels.dataEditMode.request('activeMode'));
        });
      },
      onDestroy: function onDestroy() {
        this.deactivate();
      },
      activate: function activate() {
        if (this.getChildViewContainer().sortable('instance')) {
          return;
        }

        var $childViewContainer = this.getChildViewContainer(),
            defaultSortableOptions = {
          connectWith: $childViewContainer.selector,
          placeholder: 'elementor-sortable-placeholder elementor-' + this.getOption('elChildType') + '-placeholder',
          cursorAt: {
            top: 20,
            left: 25
          },
          helper: this._getSortableHelper.bind(this),
          cancel: 'input, textarea, button, select, option, .elementor-inline-editing, .elementor-tab-title'
        },
            sortableOptions = _.extend(defaultSortableOptions, this.view.getSortableOptions());

        $childViewContainer.sortable(sortableOptions);
      },
      _getSortableHelper: function _getSortableHelper(event, $item) {
        var model = this.view.collection.get({
          cid: $item.data('model-cid')
        });
        return '<div style="height: 84px; width: 125px;" class="elementor-sortable-helper elementor-sortable-helper-' + model.get('elType') + '"><div class="icon"><i class="' + model.getIcon() + '"></i></div><div class="elementor-element-title-wrapper"><div class="title">' + model.getTitle() + '</div></div></div>';
      },
      getChildViewContainer: function getChildViewContainer() {
        return this.view.getChildViewContainer(this.view);
      },
      deactivate: function deactivate() {
        if (this.getChildViewContainer().sortable('instance')) {
          this.getChildViewContainer().sortable('destroy');
        }
      },
      onSortStart: function onSortStart(event, ui) {
        event.stopPropagation();
        var model = this.view.collection.get({
          cid: ui.item.data('model-cid')
        });

        if ('column' === this.options.elChildType) {
          var uiData = ui.item.data('sortableItem'),
              uiItems = uiData.items,
              itemHeight = 0;
          uiItems.forEach(function (item) {
            if (item.item[0] === ui.item[0]) {
              itemHeight = item.height;
              return false;
            }
          });
          ui.placeholder.height(itemHeight);
        }

        elementor.channels.data.reply('dragging:model', model).reply('dragging:parent:view', this.view).trigger('drag:start', model).trigger(model.get('elType') + ':drag:start');
      },
      onSortOver: function onSortOver(event) {
        event.stopPropagation();
        var model = elementor.channels.data.request('dragging:model');
        jQuery(event.target).addClass('elementor-draggable-over').attr({
          'data-dragged-element': model.get('elType'),
          'data-dragged-is-inner': model.get('isInner')
        });
        this.$el.addClass('elementor-dragging-on-child');
      },
      onSortOut: function onSortOut(event) {
        event.stopPropagation();
        jQuery(event.target).removeClass('elementor-draggable-over').removeAttr('data-dragged-element data-dragged-is-inner');
        this.$el.removeClass('elementor-dragging-on-child');
      },
      onSortReceive: function onSortReceive(event, ui) {
        event.stopPropagation();

        if (this.view.isCollectionFilled()) {
          jQuery(ui.sender).sortable('cancel');
          return;
        }

        var model = elementor.channels.data.request('dragging:model'),
            draggedElType = model.get('elType'),
            draggedIsInnerSection = 'section' === draggedElType && model.get('isInner'),
            targetIsInnerColumn = 'column' === this.view.getElementType() && this.view.isInner();

        if (draggedIsInnerSection && targetIsInnerColumn) {
          jQuery(ui.sender).sortable('cancel');
          return;
        }

        elementor.channels.data.trigger('drag:before:update', model);
        var newIndex = ui.item.parent().children().index(ui.item),
            modelJSON = model.toJSON({
          copyHtmlCache: true
        });
        var senderSection = elementor.channels.data.request('dragging:parent:view');
        senderSection.isManualRemoving = true;
        model.destroy();
        senderSection.isManualRemoving = false;
        this.view.addChildElement(modelJSON, {
          at: newIndex
        });
        elementor.channels.data.trigger('drag:after:update', model);
      },
      onSortUpdate: function onSortUpdate(event, ui) {
        event.stopPropagation();

        if (this.getChildViewContainer()[0] === ui.item.parent()[0]) {
          var model = elementor.channels.data.request('dragging:model'),
              $childElement = ui.item,
              collection = this.view.collection,
              newIndex = $childElement.parent().children().index($childElement);
          elementor.channels.data.trigger('drag:before:update', model);
          var child = this.view.children.findByModelCid(model.cid);
          child._isRendering = true;
          collection.remove(model);
          this.view.addChildElement(model, {
            at: newIndex
          });
          elementor.saver.setFlagEditorChange(true);
          elementor.channels.data.trigger('drag:after:update', model);
        }
      },
      onAddChild: function onAddChild(view) {
        view.$el.attr('data-model-cid', view.model.cid);
      }
    });
    module.exports = SortableBehavior;
  }, {}],
  73: [function (require, module, exports) {
    var ElementEmptyView;
    ElementEmptyView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-empty-preview',
      className: 'elementor-empty-view',
      events: {
        'click': 'onClickAdd'
      },
      onClickAdd: function onClickAdd() {
        elementor.getPanelView().setPage('elements');
      }
    });
    module.exports = ElementEmptyView;
  }, {}],
  74: [function (require, module, exports) {
    var BaseElementView = require('elementor-elements/views/base'),
        ColumnEmptyView = require('elementor-elements/views/column-empty'),
        ColumnView;

    ColumnView = BaseElementView.extend({
      template: Marionette.TemplateCache.get('#tmpl-elementor-element-column-content'),
      emptyView: ColumnEmptyView,
      childViewContainer: '> .elementor-column-wrap > .elementor-widget-wrap',
      behaviors: function behaviors() {
        var behaviors = BaseElementView.prototype.behaviors.apply(this, arguments);

        _.extend(behaviors, {
          Sortable: {
            behaviorClass: require('elementor-behaviors/sortable'),
            elChildType: 'widget'
          },
          Resizable: {
            behaviorClass: require('elementor-behaviors/resizable')
          },
          HandleDuplicate: {
            behaviorClass: require('elementor-behaviors/handle-duplicate')
          },
          HandleAddMode: {
            behaviorClass: require('elementor-behaviors/duplicate')
          }
        });

        return elementor.hooks.applyFilters('elements/column/behaviors', behaviors, this);
      },
      className: function className() {
        var classes = BaseElementView.prototype.className.apply(this, arguments),
            type = this.isInner() ? 'inner' : 'top';
        return classes + ' elementor-column elementor-' + type + '-column';
      },
      tagName: function tagName() {
        return this.model.getSetting('html_tag') || 'div';
      },
      ui: function ui() {
        var ui = BaseElementView.prototype.ui.apply(this, arguments);
        ui.columnInner = '> .elementor-column-wrap';
        ui.percentsTooltip = '> .elementor-element-overlay .elementor-column-percents-tooltip';
        return ui;
      },
      triggers: {
        'click @ui.addButton': 'click:new'
      },
      initialize: function initialize() {
        BaseElementView.prototype.initialize.apply(this, arguments);
        this.addControlValidator('_inline_size', this.onEditorInlineSizeInputChange);
      },
      isDroppingAllowed: function isDroppingAllowed() {
        var elementView = elementor.channels.panelElements.request('element:selected');

        if (!elementView) {
          return false;
        }

        var elType = elementView.model.get('elType');

        if ('section' === elType) {
          return !this.isInner();
        }

        return 'widget' === elType;
      },
      getPercentsForDisplay: function getPercentsForDisplay() {
        var inlineSize = +this.model.getSetting('_inline_size') || this.getPercentSize();
        return inlineSize.toFixed(1) + '%';
      },
      changeSizeUI: function changeSizeUI() {
        var self = this,
            columnSize = self.model.getSetting('_column_size');
        self.$el.attr('data-col', columnSize);

        _.defer(function () {
          // Wait for the column size to be applied
          if (self.ui.percentsTooltip) {
            self.ui.percentsTooltip.text(self.getPercentsForDisplay());
          }
        });
      },
      getPercentSize: function getPercentSize(size) {
        if (!size) {
          size = this.el.getBoundingClientRect().width;
        }

        return +(size / this.$el.parent().width() * 100).toFixed(3);
      },
      getSortableOptions: function getSortableOptions() {
        return {
          connectWith: '.elementor-widget-wrap',
          items: '> .elementor-element'
        };
      },
      changeChildContainerClasses: function changeChildContainerClasses() {
        var emptyClass = 'elementor-element-empty',
            populatedClass = 'elementor-element-populated';

        if (this.collection.isEmpty()) {
          this.ui.columnInner.removeClass(populatedClass).addClass(emptyClass);
        } else {
          this.ui.columnInner.removeClass(emptyClass).addClass(populatedClass);
        }
      },
      // Events
      onCollectionChanged: function onCollectionChanged() {
        BaseElementView.prototype.onCollectionChanged.apply(this, arguments);
        this.changeChildContainerClasses();
      },
      onRender: function onRender() {
        var self = this;
        BaseElementView.prototype.onRender.apply(self, arguments);
        self.changeChildContainerClasses();
        self.changeSizeUI();
        self.$el.html5Droppable({
          items: ' > .elementor-column-wrap > .elementor-widget-wrap > .elementor-element, >.elementor-column-wrap > .elementor-widget-wrap > .elementor-empty-view > .elementor-first-add',
          axis: ['vertical'],
          groups: ['elementor-element'],
          isDroppingAllowed: self.isDroppingAllowed.bind(self),
          currentElementClass: 'elementor-html5dnd-current-element',
          placeholderClass: 'elementor-sortable-placeholder elementor-widget-placeholder',
          hasDraggingOnChildClass: 'elementor-dragging-on-child',
          onDropping: function onDropping(side, event) {
            event.stopPropagation();
            var newIndex = jQuery(this).index();

            if ('bottom' === side) {
              newIndex++;
            }

            self.addElementFromPanel({
              at: newIndex
            });
          }
        });
      },
      onSettingsChanged: function onSettingsChanged(settings) {
        BaseElementView.prototype.onSettingsChanged.apply(this, arguments);
        var changedAttributes = settings.changedAttributes();

        if ('_column_size' in changedAttributes || '_inline_size' in changedAttributes) {
          this.changeSizeUI();
        }
      },
      onEditorInlineSizeInputChange: function onEditorInlineSizeInputChange(newValue, oldValue) {
        var errors = [],
            columnSize = this.model.getSetting('_column_size'); // If there's only one column

        if (100 === columnSize) {
          errors.push('Could not resize one column');
          return errors;
        }

        if (!oldValue) {
          oldValue = columnSize;
        }

        try {
          this._parent.resizeChild(this, +oldValue, +newValue);
        } catch (e) {
          if (e.message === this._parent.errors.columnWidthTooLarge) {
            errors.push(e.message);
          }
        }

        return errors;
      }
    });
    module.exports = ColumnView;
  }, {
    "elementor-behaviors/duplicate": 67,
    "elementor-behaviors/handle-duplicate": 68,
    "elementor-behaviors/resizable": 71,
    "elementor-behaviors/sortable": 72,
    "elementor-elements/views/base": 66,
    "elementor-elements/views/column-empty": 73
  }],
  75: [function (require, module, exports) {
    var BaseElementView = require('elementor-elements/views/base'),
        AddSectionView = require('elementor-views/add-section/inline'),
        SectionView;

    SectionView = BaseElementView.extend({
      template: Marionette.TemplateCache.get('#tmpl-elementor-element-section-content'),
      addSectionView: null,
      toggleEditTools: false,
      className: function className() {
        var classes = BaseElementView.prototype.className.apply(this, arguments),
            type = this.isInner() ? 'inner' : 'top';
        return classes + ' elementor-section elementor-' + type + '-section';
      },
      tagName: function tagName() {
        return this.model.getSetting('html_tag') || 'section';
      },
      childViewContainer: '> .elementor-container > .elementor-row',
      behaviors: function behaviors() {
        var behaviors = BaseElementView.prototype.behaviors.apply(this, arguments);

        _.extend(behaviors, {
          Sortable: {
            behaviorClass: require('elementor-behaviors/sortable'),
            elChildType: 'column'
          },
          HandleDuplicate: {
            behaviorClass: require('elementor-behaviors/handle-duplicate')
          },
          HandleAddMode: {
            behaviorClass: require('elementor-behaviors/duplicate')
          }
        });

        return elementor.hooks.applyFilters('elements/section/behaviors', behaviors, this);
      },
      errors: {
        columnWidthTooLarge: 'New column width is too large',
        columnWidthTooSmall: 'New column width is too small'
      },
      events: function events() {
        var events = BaseElementView.prototype.events.apply(this, arguments);
        events['click @ui.addButton'] = 'onClickAdd';
        return events;
      },
      initialize: function initialize() {
        BaseElementView.prototype.initialize.apply(this, arguments);
        this.listenTo(this.collection, 'add remove reset', this._checkIsFull);

        this._checkIsEmpty();
      },
      addEmptyColumn: function addEmptyColumn() {
        this.addChildModel({
          id: elementor.helpers.getUniqueID(),
          elType: 'column',
          settings: {},
          elements: []
        });
      },
      addChildModel: function addChildModel(model, options) {
        var isModelInstance = model instanceof Backbone.Model,
            isInner = this.isInner();

        if (isModelInstance) {
          model.set('isInner', isInner);
        } else {
          model.isInner = isInner;
        }

        return BaseElementView.prototype.addChildModel.apply(this, arguments);
      },
      getSortableOptions: function getSortableOptions() {
        var sectionConnectClass = this.isInner() ? '.elementor-inner-section' : '.elementor-top-section';
        return {
          connectWith: sectionConnectClass + ' > .elementor-container > .elementor-row',
          handle: '> .elementor-element-overlay .elementor-editor-column-settings .elementor-editor-element-trigger',
          items: '> .elementor-column',
          forcePlaceholderSize: true,
          tolerance: 'pointer'
        };
      },
      onSettingsChanged: function onSettingsChanged(settingsModel) {
        BaseElementView.prototype.onSettingsChanged.apply(this, arguments);

        if (settingsModel.changed.structure) {
          this.redefineLayout();
        }
      },
      getColumnPercentSize: function getColumnPercentSize(element, size) {
        return +(size / element.parent().width() * 100).toFixed(3);
      },
      getDefaultStructure: function getDefaultStructure() {
        return this.collection.length + '0';
      },
      getStructure: function getStructure() {
        return this.model.getSetting('structure');
      },
      setStructure: function setStructure(structure) {
        var parsedStructure = elementor.presetsFactory.getParsedStructure(structure);

        if (+parsedStructure.columnsCount !== this.collection.length) {
          throw new TypeError('The provided structure doesn\'t match the columns count.');
        }

        this.model.setSetting('structure', structure);
      },
      redefineLayout: function redefineLayout() {
        var preset = elementor.presetsFactory.getPresetByStructure(this.getStructure());
        this.collection.each(function (model, index) {
          model.setSetting('_column_size', preset.preset[index]);
          model.setSetting('_inline_size', null);
        });
      },
      resetLayout: function resetLayout() {
        this.setStructure(this.getDefaultStructure());
      },
      resetColumnsCustomSize: function resetColumnsCustomSize() {
        this.collection.each(function (model) {
          model.setSetting('_inline_size', null);
        });
      },
      isCollectionFilled: function isCollectionFilled() {
        var MAX_SIZE = 10,
            columnsCount = this.collection.length;
        return MAX_SIZE <= columnsCount;
      },
      _checkIsFull: function _checkIsFull() {
        this.$el.toggleClass('elementor-section-filled', this.isCollectionFilled());
      },
      _checkIsEmpty: function _checkIsEmpty() {
        if (!this.collection.length && !this.model.get('dontFillEmpty')) {
          this.addEmptyColumn();
        }
      },
      getColumnAt: function getColumnAt(index) {
        var model = this.collection.at(index);
        return model ? this.children.findByModelCid(model.cid) : null;
      },
      getNextColumn: function getNextColumn(columnView) {
        return this.getColumnAt(this.collection.indexOf(columnView.model) + 1);
      },
      getPreviousColumn: function getPreviousColumn(columnView) {
        return this.getColumnAt(this.collection.indexOf(columnView.model) - 1);
      },
      showChildrenPercentsTooltip: function showChildrenPercentsTooltip(columnView, nextColumnView) {
        columnView.ui.percentsTooltip.show();
        columnView.ui.percentsTooltip.attr('data-side', elementor.config.is_rtl ? 'right' : 'left');
        nextColumnView.ui.percentsTooltip.show();
        nextColumnView.ui.percentsTooltip.attr('data-side', elementor.config.is_rtl ? 'left' : 'right');
      },
      hideChildrenPercentsTooltip: function hideChildrenPercentsTooltip(columnView, nextColumnView) {
        columnView.ui.percentsTooltip.hide();
        nextColumnView.ui.percentsTooltip.hide();
      },
      resizeChild: function resizeChild(childView, currentSize, newSize) {
        var nextChildView = this.getNextColumn(childView) || this.getPreviousColumn(childView);

        if (!nextChildView) {
          throw new ReferenceError('There is not any next column');
        }

        var minColumnSize = 10,
            $nextElement = nextChildView.$el,
            nextElementCurrentSize = +nextChildView.model.getSetting('_inline_size') || this.getColumnPercentSize($nextElement, $nextElement[0].getBoundingClientRect().width),
            nextElementNewSize = +(currentSize + nextElementCurrentSize - newSize).toFixed(3);

        if (nextElementNewSize < minColumnSize) {
          throw new RangeError(this.errors.columnWidthTooLarge);
        }

        if (newSize < minColumnSize) {
          throw new RangeError(this.errors.columnWidthTooSmall);
        }

        nextChildView.model.setSetting('_inline_size', nextElementNewSize);
        return true;
      },
      destroyAddSectionView: function destroyAddSectionView() {
        if (this.addSectionView && !this.addSectionView.isDestroyed) {
          this.addSectionView.destroy();
        }
      },
      onRender: function onRender() {
        BaseElementView.prototype.onRender.apply(this, arguments);

        this._checkIsFull();
      },
      onClickAdd: function onClickAdd() {
        if (this.addSectionView && !this.addSectionView.isDestroyed) {
          this.addSectionView.fadeToDeath();
          return;
        }

        var myIndex = this.model.collection.indexOf(this.model),
            addSectionView = new AddSectionView({
          atIndex: myIndex
        });
        addSectionView.render();
        this.$el.before(addSectionView.$el);
        addSectionView.$el.hide(); // Delaying the slide down for slow-render browsers (such as FF)

        setTimeout(function () {
          addSectionView.$el.slideDown();
        });
        this.addSectionView = addSectionView;
      },
      onAddChild: function onAddChild() {
        if (!this.isBuffering && !this.model.get('dontFillEmpty')) {
          // Reset the layout just when we have really add/remove element.
          this.resetLayout();
        }
      },
      onRemoveChild: function onRemoveChild() {
        if (!this.isManualRemoving) {
          return;
        } // If it's the last column, please create new one.


        this._checkIsEmpty();

        this.resetLayout();
      },
      onChildviewRequestResizeStart: function onChildviewRequestResizeStart(columnView) {
        var nextColumnView = this.getNextColumn(columnView);

        if (!nextColumnView) {
          return;
        }

        this.showChildrenPercentsTooltip(columnView, nextColumnView);
        var $iframes = columnView.$el.find('iframe').add(nextColumnView.$el.find('iframe'));
        elementor.helpers.disableElementEvents($iframes);
      },
      onChildviewRequestResizeStop: function onChildviewRequestResizeStop(columnView) {
        var nextColumnView = this.getNextColumn(columnView);

        if (!nextColumnView) {
          return;
        }

        this.hideChildrenPercentsTooltip(columnView, nextColumnView);
        var $iframes = columnView.$el.find('iframe').add(nextColumnView.$el.find('iframe'));
        elementor.helpers.enableElementEvents($iframes);
      },
      onChildviewRequestResize: function onChildviewRequestResize(columnView, ui, event) {
        // Get current column details
        var currentSize = +columnView.model.getSetting('_inline_size') || this.getColumnPercentSize(columnView.$el, columnView.$el.data('originalWidth'));
        ui.element.css({
          width: '',
          left: 'initial' // Fix for RTL resizing

        });
        var newSize = this.getColumnPercentSize(ui.element, ui.size.width);

        try {
          this.resizeChild(columnView, currentSize, newSize);
        } catch (e) {
          return;
        }

        columnView.model.setSetting('_inline_size', newSize);
      },
      onDestroy: function onDestroy() {
        BaseElementView.prototype.onDestroy.apply(this, arguments);
        this.destroyAddSectionView();
      }
    });
    module.exports = SectionView;
  }, {
    "elementor-behaviors/duplicate": 67,
    "elementor-behaviors/handle-duplicate": 68,
    "elementor-behaviors/sortable": 72,
    "elementor-elements/views/base": 66,
    "elementor-views/add-section/inline": 118
  }],
  76: [function (require, module, exports) {
    var BaseElementView = require('elementor-elements/views/base'),
        WidgetView;

    WidgetView = BaseElementView.extend({
      _templateType: null,
      getTemplate: function getTemplate() {
        var editModel = this.getEditModel();

        if ('remote' !== this.getTemplateType()) {
          return Marionette.TemplateCache.get('#tmpl-elementor-' + editModel.get('elType') + '-' + editModel.get('widgetType') + '-content');
        } else {
          return _.template('');
        }
      },
      className: function className() {
        return BaseElementView.prototype.className.apply(this, arguments) + ' elementor-widget';
      },
      events: function events() {
        var events = BaseElementView.prototype.events.apply(this, arguments);
        events.click = 'onClickEdit';
        return events;
      },
      behaviors: function behaviors() {
        var behaviors = BaseElementView.prototype.behaviors.apply(this, arguments);

        _.extend(behaviors, {
          InlineEditing: {
            behaviorClass: require('elementor-behaviors/inline-editing'),
            inlineEditingClass: 'elementor-inline-editing'
          }
        });

        return elementor.hooks.applyFilters('elements/widget/behaviors', behaviors, this);
      },
      initialize: function initialize() {
        BaseElementView.prototype.initialize.apply(this, arguments);
        var editModel = this.getEditModel();
        editModel.on({
          'before:remote:render': this.onModelBeforeRemoteRender.bind(this),
          'remote:render': this.onModelRemoteRender.bind(this)
        });

        if ('remote' === this.getTemplateType() && !this.getEditModel().getHtmlCache()) {
          editModel.renderRemoteServer();
        }

        var onRenderMethod = this.onRender;
        this.render = _.throttle(this.render, 300);

        this.onRender = function () {
          _.defer(onRenderMethod.bind(this));
        };
      },
      render: function render() {
        if (this.model.isRemoteRequestActive()) {
          this.handleEmptyWidget();
          this.$el.addClass('elementor-element');
          return;
        }

        Marionette.CompositeView.prototype.render.apply(this, arguments);
      },
      handleEmptyWidget: function handleEmptyWidget() {
        // TODO: REMOVE THIS !!
        // TEMP CODING !!
        this.$el.addClass('elementor-widget-empty').append('<i class="elementor-widget-empty-icon ' + this.getEditModel().getIcon() + '"></i>');
      },
      getTemplateType: function getTemplateType() {
        if (null === this._templateType) {
          var editModel = this.getEditModel(),
              $template = jQuery('#tmpl-elementor-' + editModel.get('elType') + '-' + editModel.get('widgetType') + '-content');
          this._templateType = $template.length ? 'js' : 'remote';
        }

        return this._templateType;
      },
      getHTMLContent: function getHTMLContent(html) {
        var htmlCache = this.getEditModel().getHtmlCache();
        return htmlCache || html;
      },
      attachElContent: function attachElContent(html) {
        var self = this,
            htmlContent = self.getHTMLContent(html);

        _.defer(function () {
          elementorFrontend.getElements('window').jQuery(self.el).html(htmlContent);
          self.bindUIElements(); // Build again the UI elements since the content attached just now
        });

        return this;
      },
      addInlineEditingAttributes: function addInlineEditingAttributes(key, toolbar) {
        this.addRenderAttribute(key, {
          'class': 'elementor-inline-editing',
          'data-elementor-setting-key': key
        });

        if (toolbar) {
          this.addRenderAttribute(key, {
            'data-elementor-inline-editing-toolbar': toolbar
          });
        }
      },
      getRepeaterSettingKey: function getRepeaterSettingKey(settingKey, repeaterKey, repeaterItemIndex) {
        return [repeaterKey, repeaterItemIndex, settingKey].join('.');
      },
      onModelBeforeRemoteRender: function onModelBeforeRemoteRender() {
        this.$el.addClass('elementor-loading');
      },
      onBeforeDestroy: function onBeforeDestroy() {
        // Remove old style from the DOM.
        elementor.$previewContents.find('#elementor-style-' + this.model.cid).remove();
      },
      onModelRemoteRender: function onModelRemoteRender() {
        if (this.isDestroyed) {
          return;
        }

        this.$el.removeClass('elementor-loading');
        this.render();
      },
      onRender: function onRender() {
        var self = this;
        BaseElementView.prototype.onRender.apply(self, arguments);
        var editModel = self.getEditModel(),
            skinType = editModel.getSetting('_skin') || 'default';
        self.$el.attr('data-element_type', editModel.get('widgetType') + '.' + skinType).removeClass('elementor-widget-empty').addClass('elementor-widget-' + editModel.get('widgetType') + ' elementor-widget-can-edit').children('.elementor-widget-empty-icon').remove(); // TODO: Find better way to detect if all images are loaded

        self.$el.imagesLoaded().always(function () {
          setTimeout(function () {
            if (1 > self.$el.height()) {
              self.handleEmptyWidget();
            }
          }, 200); // Is element empty?
        });
      }
    });
    module.exports = WidgetView;
  }, {
    "elementor-behaviors/inline-editing": 69,
    "elementor-elements/views/base": 66
  }],
  77: [function (require, module, exports) {
    var EditModeItemView;
    EditModeItemView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-mode-switcher-content',
      id: 'elementor-mode-switcher-inner',
      ui: {
        previewButton: '#elementor-mode-switcher-preview-input',
        previewLabel: '#elementor-mode-switcher-preview',
        previewLabelA11y: '#elementor-mode-switcher-preview .elementor-screen-only'
      },
      events: {
        'change @ui.previewButton': 'onPreviewButtonChange'
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.dataEditMode, 'switch', this.onEditModeChanged);
      },
      getCurrentMode: function getCurrentMode() {
        return this.ui.previewButton.is(':checked') ? 'preview' : 'edit';
      },
      setMode: function setMode(mode) {
        this.ui.previewButton.prop('checked', 'preview' === mode).trigger('change');
      },
      toggleMode: function toggleMode() {
        this.setMode(this.ui.previewButton.prop('checked') ? 'edit' : 'preview');
      },
      onRender: function onRender() {
        this.onEditModeChanged();
      },
      onPreviewButtonChange: function onPreviewButtonChange() {
        elementor.changeEditMode(this.getCurrentMode());
      },
      onEditModeChanged: function onEditModeChanged() {
        var activeMode = elementor.channels.dataEditMode.request('activeMode'),
            title = elementor.translate('preview' === activeMode ? 'back_to_editor' : 'preview');
        this.ui.previewLabel.attr('title', title);
        this.ui.previewLabelA11y.text(title);
      }
    });
    module.exports = EditModeItemView;
  }, {}],
  78: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-footer-content',
      tagName: 'nav',
      id: 'elementor-panel-footer-tools',
      possibleRotateModes: ['portrait', 'landscape'],
      ui: {
        buttonSave: '#elementor-panel-saver-button-publish, #elementor-panel-saver-menu-save-draft',
        // Compatibility for Pro <= 1.9.5
        menuButtons: '.elementor-panel-footer-tool',
        settings: '#elementor-panel-footer-settings',
        deviceModeIcon: '#elementor-panel-footer-responsive > i',
        deviceModeButtons: '#elementor-panel-footer-responsive .elementor-panel-footer-sub-menu-item',
        saveTemplate: '#elementor-panel-saver-menu-save-template',
        history: '#elementor-panel-footer-history'
      },
      events: {
        'click @ui.settings': 'onClickSettings',
        'click @ui.deviceModeButtons': 'onClickResponsiveButtons',
        'click @ui.saveTemplate': 'onClickSaveTemplate',
        'click @ui.history': 'onClickHistory'
      },
      behaviors: function behaviors() {
        var behaviors = {
          saver: {
            behaviorClass: elementor.modules.saver.footerBehavior
          }
        };
        return elementor.hooks.applyFilters('panel/footer/behaviors', behaviors, this);
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.deviceMode, 'change', this.onDeviceModeChange);
      },
      getDeviceModeButton: function getDeviceModeButton(deviceMode) {
        return this.ui.deviceModeButtons.filter('[data-device-mode="' + deviceMode + '"]');
      },
      onPanelClick: function onPanelClick(event) {
        var $target = jQuery(event.target),
            isClickInsideOfTool = $target.closest('.elementor-panel-footer-sub-menu-wrapper').length;

        if (isClickInsideOfTool) {
          return;
        }

        var $tool = $target.closest('.elementor-panel-footer-tool'),
            isClosedTool = $tool.length && !$tool.hasClass('elementor-open');
        this.ui.menuButtons.filter(':not(.elementor-leave-open)').removeClass('elementor-open');

        if (isClosedTool) {
          $tool.addClass('elementor-open');
        }
      },
      onClickSettings: function onClickSettings() {
        var self = this;

        if ('page_settings' !== elementor.getPanelView().getCurrentPageName()) {
          elementor.getPanelView().setPage('page_settings');
          elementor.getPanelView().getCurrentPageView().once('destroy', function () {
            self.ui.settings.removeClass('elementor-open');
          });
        }
      },
      onDeviceModeChange: function onDeviceModeChange() {
        var previousDeviceMode = elementor.channels.deviceMode.request('previousMode'),
            currentDeviceMode = elementor.channels.deviceMode.request('currentMode');
        this.getDeviceModeButton(previousDeviceMode).removeClass('active');
        this.getDeviceModeButton(currentDeviceMode).addClass('active'); // Change the footer icon

        this.ui.deviceModeIcon.removeClass('eicon-device-' + previousDeviceMode).addClass('eicon-device-' + currentDeviceMode);
      },
      onClickResponsiveButtons: function onClickResponsiveButtons(event) {
        var $clickedButton = this.$(event.currentTarget),
            newDeviceMode = $clickedButton.data('device-mode');
        elementor.changeDeviceMode(newDeviceMode);
      },
      onClickSaveTemplate: function onClickSaveTemplate() {
        elementor.templates.startModal({
          onReady: function onReady() {
            elementor.templates.getLayout().showSaveTemplateView();
          }
        });
      },
      onClickHistory: function onClickHistory() {
        if ('historyPage' !== elementor.getPanelView().getCurrentPageName()) {
          elementor.getPanelView().setPage('historyPage');
        }
      },
      onRender: function onRender() {
        var self = this;

        _.defer(function () {
          elementor.getPanelView().$el.on('click', self.onPanelClick.bind(self));
        });
      }
    });
  }, {}],
  79: [function (require, module, exports) {
    var PanelHeaderItemView;
    PanelHeaderItemView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-header',
      id: 'elementor-panel-header',
      ui: {
        menuButton: '#elementor-panel-header-menu-button',
        menuIcon: '#elementor-panel-header-menu-button i',
        title: '#elementor-panel-header-title',
        addButton: '#elementor-panel-header-add-button'
      },
      events: {
        'click @ui.addButton': 'onClickAdd',
        'click @ui.menuButton': 'onClickMenu'
      },
      setTitle: function setTitle(title) {
        this.ui.title.html(title);
      },
      onClickAdd: function onClickAdd() {
        elementor.getPanelView().setPage('elements');
      },
      onClickMenu: function onClickMenu() {
        var panel = elementor.getPanelView(),
            currentPanelPageName = panel.getCurrentPageName(),
            nextPage = 'menu' === currentPanelPageName ? 'elements' : 'menu';

        if ('menu' === nextPage) {
          var arrowClass = 'eicon-arrow-' + (elementor.config.is_rtl ? 'right' : 'left');
          this.ui.menuIcon.removeClass('eicon-menu-bar').addClass(arrowClass);
        }

        panel.setPage(nextPage);
      }
    });
    module.exports = PanelHeaderItemView;
  }, {}],
  80: [function (require, module, exports) {
    var ControlsStack = require('elementor-views/controls-stack'),
        EditorView;

    EditorView = ControlsStack.extend({
      template: Marionette.TemplateCache.get('#tmpl-editor-content'),
      id: 'elementor-panel-page-editor',
      childViewContainer: '#elementor-controls',
      childViewOptions: function childViewOptions() {
        return {
          elementSettingsModel: this.model.get('settings'),
          elementEditSettings: this.model.get('editSettings')
        };
      },
      openActiveSection: function openActiveSection() {
        ControlsStack.prototype.openActiveSection.apply(this, arguments);
        elementor.channels.editor.trigger('section:activated', this.activeSection, this);
      },
      isVisibleSectionControl: function isVisibleSectionControl(sectionControlModel) {
        return ControlsStack.prototype.isVisibleSectionControl.apply(this, arguments) && elementor.helpers.isActiveControl(sectionControlModel, this.model.get('settings').attributes);
      },
      scrollToEditedElement: function scrollToEditedElement() {
        elementor.helpers.scrollToView(this.getOption('editedElementView'));
      },
      onBeforeRender: function onBeforeRender() {
        var controls = elementor.getElementControls(this.model);

        if (!controls) {
          throw new Error('Editor controls not found');
        } // Create new instance of that collection


        this.collection = new Backbone.Collection(_.values(controls));
      },
      onDestroy: function onDestroy() {
        var editedElementView = this.getOption('editedElementView');

        if (editedElementView) {
          editedElementView.$el.removeClass('elementor-element-editable');
        }

        this.model.trigger('editor:close');
        this.triggerMethod('editor:destroy');
      },
      onRender: function onRender() {
        var editedElementView = this.getOption('editedElementView');

        if (editedElementView) {
          editedElementView.$el.addClass('elementor-element-editable');
        }
      },
      onDeviceModeChange: function onDeviceModeChange() {
        ControlsStack.prototype.onDeviceModeChange.apply(this, arguments);
        this.scrollToEditedElement();
      },
      onChildviewSettingsChange: function onChildviewSettingsChange(childView) {
        var editedElementView = this.getOption('editedElementView'),
            editedElementType = editedElementView.model.get('elType');

        if ('widget' === editedElementType) {
          editedElementType = editedElementView.model.get('widgetType');
        }

        elementor.channels.editor.trigger('change', childView, editedElementView).trigger('change:' + editedElementType, childView, editedElementView).trigger('change:' + editedElementType + ':' + childView.model.get('name'), childView, editedElementView);
      }
    });
    module.exports = EditorView;
  }, {
    "elementor-views/controls-stack": 121
  }],
  81: [function (require, module, exports) {
    var PanelElementsCategory = require('../models/element'),
        PanelElementsCategoriesCollection;

    PanelElementsCategoriesCollection = Backbone.Collection.extend({
      model: PanelElementsCategory
    });
    module.exports = PanelElementsCategoriesCollection;
  }, {
    "../models/element": 84
  }],
  82: [function (require, module, exports) {
    var PanelElementsElementModel = require('../models/element'),
        PanelElementsElementsCollection;

    PanelElementsElementsCollection = Backbone.Collection.extend({
      model: PanelElementsElementModel
      /*,
      comparator: 'title'*/

    });
    module.exports = PanelElementsElementsCollection;
  }, {
    "../models/element": 84
  }],
  83: [function (require, module, exports) {
    var PanelElementsCategoriesCollection = require('./collections/categories'),
        PanelElementsElementsCollection = require('./collections/elements'),
        PanelElementsCategoriesView = require('./views/categories'),
        PanelElementsElementsView = elementor.modules.templateLibrary.ElementsCollectionView,
        PanelElementsSearchView = require('./views/search'),
        PanelElementsGlobalView = require('./views/global'),
        PanelElementsLayoutView;

    PanelElementsLayoutView = Marionette.LayoutView.extend({
      template: '#tmpl-elementor-panel-elements',
      regions: {
        elements: '#elementor-panel-elements-wrapper',
        search: '#elementor-panel-elements-search-area'
      },
      ui: {
        tabs: '.elementor-panel-navigation-tab'
      },
      events: {
        'click @ui.tabs': 'onTabClick'
      },
      regionViews: {},
      elementsCollection: null,
      categoriesCollection: null,
      initialize: function initialize() {
        this.listenTo(elementor.channels.panelElements, 'element:selected', this.destroy);
        this.initElementsCollection();
        this.initCategoriesCollection();
        this.initRegionViews();
      },
      initRegionViews: function initRegionViews() {
        var regionViews = {
          elements: {
            region: this.elements,
            view: PanelElementsElementsView,
            options: {
              collection: this.elementsCollection
            }
          },
          categories: {
            region: this.elements,
            view: PanelElementsCategoriesView,
            options: {
              collection: this.categoriesCollection
            }
          },
          search: {
            region: this.search,
            view: PanelElementsSearchView
          },
          global: {
            region: this.elements,
            view: PanelElementsGlobalView
          }
        };
        this.regionViews = elementor.hooks.applyFilters('panel/elements/regionViews', regionViews);
      },
      initElementsCollection: function initElementsCollection() {
        var elementsCollection = new PanelElementsElementsCollection(),
            sectionConfig = elementor.config.elements.section;
        elementsCollection.add({
          title: elementor.translate('inner_section'),
          elType: 'section',
          categories: ['basic'],
          icon: sectionConfig.icon
        }); // TODO: Change the array from server syntax, and no need each loop for initialize

        _.each(elementor.config.widgets, function (element) {
          elementsCollection.add({
            title: element.title,
            elType: element.elType,
            categories: element.categories,
            keywords: element.keywords,
            icon: element.icon,
            widgetType: element.widget_type,
            custom: element.custom
          });
        });

        this.elementsCollection = elementsCollection;
      },
      initCategoriesCollection: function initCategoriesCollection() {
        var categories = {};
        this.elementsCollection.each(function (element) {
          _.each(element.get('categories'), function (category) {
            if (!categories[category]) {
              categories[category] = [];
            }

            categories[category].push(element);
          });
        });
        var categoriesCollection = new PanelElementsCategoriesCollection();

        _.each(elementor.config.elements_categories, function (categoryConfig, categoryName) {
          if (!categories[categoryName]) {
            return;
          }

          categoriesCollection.add({
            name: categoryName,
            title: categoryConfig.title,
            icon: categoryConfig.icon,
            items: categories[categoryName]
          });
        });

        this.categoriesCollection = categoriesCollection;
      },
      activateTab: function activateTab(tabName) {
        this.ui.tabs.removeClass('active').filter('[data-view="' + tabName + '"]').addClass('active');
        this.showView(tabName);
      },
      showView: function showView(viewName) {
        var viewDetails = this.regionViews[viewName],
            options = viewDetails.options || {};
        viewDetails.region.show(new viewDetails.view(options));
      },
      clearSearchInput: function clearSearchInput() {
        this.getChildView('search').clearInput();
      },
      changeFilter: function changeFilter(filterValue) {
        elementor.channels.panelElements.reply('filter:value', filterValue).trigger('filter:change');
      },
      clearFilters: function clearFilters() {
        this.changeFilter(null);
        this.clearSearchInput();
      },
      onChildviewChildrenRender: function onChildviewChildrenRender() {
        this.updateElementsScrollbar();
      },
      onChildviewSearchChangeInput: function onChildviewSearchChangeInput(child) {
        this.changeFilter(child.ui.input.val(), 'search');
      },
      onDestroy: function onDestroy() {
        elementor.channels.panelElements.reply('filter:value', null);
      },
      onShow: function onShow() {
        this.showView('categories');
        this.showView('search');
      },
      onTabClick: function onTabClick(event) {
        this.activateTab(event.currentTarget.dataset.view);
      },
      updateElementsScrollbar: function updateElementsScrollbar() {
        elementor.channels.data.trigger('scrollbar:update');
      }
    });
    module.exports = PanelElementsLayoutView;
  }, {
    "./collections/categories": 81,
    "./collections/elements": 82,
    "./views/categories": 85,
    "./views/global": 89,
    "./views/search": 90
  }],
  84: [function (require, module, exports) {
    var PanelElementsElementModel;
    PanelElementsElementModel = Backbone.Model.extend({
      defaults: {
        title: '',
        categories: [],
        keywords: [],
        icon: '',
        elType: 'widget',
        widgetType: ''
      }
    });
    module.exports = PanelElementsElementModel;
  }, {}],
  85: [function (require, module, exports) {
    var PanelElementsCategoryView = require('./category'),
        PanelElementsCategoriesView;

    PanelElementsCategoriesView = Marionette.CompositeView.extend({
      template: '#tmpl-elementor-panel-categories',
      childView: PanelElementsCategoryView,
      childViewContainer: '#elementor-panel-categories',
      id: 'elementor-panel-elements-categories',
      initialize: function initialize() {
        this.listenTo(elementor.channels.panelElements, 'filter:change', this.onPanelElementsFilterChange);
      },
      onPanelElementsFilterChange: function onPanelElementsFilterChange() {
        if (elementor.channels.panelElements.request('filter:value')) {
          elementor.getPanelView().getCurrentPageView().showView('elements');
        }
      }
    });
    module.exports = PanelElementsCategoriesView;
  }, {
    "./category": 86
  }],
  86: [function (require, module, exports) {
    var PanelElementsElementsCollection = require('../collections/elements'),
        PanelElementsCategoryView;

    PanelElementsCategoryView = Marionette.CompositeView.extend({
      template: '#tmpl-elementor-panel-elements-category',
      className: 'elementor-panel-category',
      childView: require('elementor-panel/pages/elements/views/element'),
      childViewContainer: '.panel-elements-category-items',
      initialize: function initialize() {
        this.collection = new PanelElementsElementsCollection(this.model.get('items'));
      }
    });
    module.exports = PanelElementsCategoryView;
  }, {
    "../collections/elements": 82,
    "elementor-panel/pages/elements/views/element": 87
  }],
  87: [function (require, module, exports) {
    var PanelElementsElementView;
    PanelElementsElementView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-element-library-element',
      className: 'elementor-element-wrapper',
      onRender: function onRender() {
        var self = this;
        this.$el.html5Draggable({
          onDragStart: function onDragStart() {
            elementor.channels.panelElements.reply('element:selected', self).trigger('element:drag:start');
          },
          onDragEnd: function onDragEnd() {
            elementor.channels.panelElements.trigger('element:drag:end');
          },
          groups: ['elementor-element']
        });
      }
    });
    module.exports = PanelElementsElementView;
  }, {}],
  88: [function (require, module, exports) {
    var PanelElementsElementsView;
    PanelElementsElementsView = Marionette.CollectionView.extend({
      childView: require('elementor-panel/pages/elements/views/element'),
      id: 'elementor-panel-elements',
      initialize: function initialize() {
        this.listenTo(elementor.channels.panelElements, 'filter:change', this.onFilterChanged);
      },
      filter: function filter(childModel) {
        var filterValue = elementor.channels.panelElements.request('filter:value');

        if (!filterValue) {
          return true;
        }

        if (-1 !== childModel.get('title').toLowerCase().indexOf(filterValue.toLowerCase())) {
          return true;
        }

        return _.any(childModel.get('keywords'), function (keyword) {
          return -1 !== keyword.toLowerCase().indexOf(filterValue.toLowerCase());
        });
      },
      onFilterChanged: function onFilterChanged() {
        var filterValue = elementor.channels.panelElements.request('filter:value');

        if (!filterValue) {
          this.onFilterEmpty();
        }

        this._renderChildren();

        this.triggerMethod('children:render');
      },
      onFilterEmpty: function onFilterEmpty() {
        elementor.getPanelView().getCurrentPageView().showView('categories');
      }
    });
    module.exports = PanelElementsElementsView;
  }, {
    "elementor-panel/pages/elements/views/element": 87
  }],
  89: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-global',
      id: 'elementor-panel-global',
      initialize: function initialize() {
        elementor.getPanelView().getCurrentPageView().search.reset();
      },
      onDestroy: function onDestroy() {
        elementor.getPanelView().getCurrentPageView().showView('search');
      }
    });
  }, {}],
  90: [function (require, module, exports) {
    var PanelElementsSearchView;
    PanelElementsSearchView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-element-search',
      id: 'elementor-panel-elements-search-wrapper',
      ui: {
        input: 'input'
      },
      events: {
        'keyup @ui.input': 'onInputChanged'
      },
      clearInput: function clearInput() {
        this.ui.input.val('');
      },
      onInputChanged: function onInputChanged(event) {
        var ESC_KEY = 27;

        if (ESC_KEY === event.keyCode) {
          this.clearInput();
        }

        this.triggerMethod('search:change:input');
      },
      onRender: function onRender() {
        var input = this.ui.input;
        setTimeout(function () {
          input.focus();
        });
      }
    });
    module.exports = PanelElementsSearchView;
  }, {}],
  91: [function (require, module, exports) {
    var PanelMenuGroupView = require('elementor-panel/pages/menu/views/group'),
        PanelMenuPageView;

    PanelMenuPageView = Marionette.CompositeView.extend({
      id: 'elementor-panel-page-menu',
      template: '#tmpl-elementor-panel-menu',
      childView: PanelMenuGroupView,
      childViewContainer: '#elementor-panel-page-menu-content',
      initialize: function initialize() {
        this.collection = PanelMenuPageView.getGroups();
      },
      onDestroy: function onDestroy() {
        var arrowClass = 'eicon-arrow-' + (elementor.config.is_rtl ? 'right' : 'left');
        elementor.panel.currentView.getHeaderView().ui.menuIcon.removeClass(arrowClass).addClass('eicon-menu-bar');
      }
    }, {
      groups: null,
      initGroups: function initGroups() {
        this.groups = new Backbone.Collection([{
          name: 'style',
          title: elementor.translate('global_style'),
          items: [{
            name: 'global-colors',
            icon: 'fa fa-paint-brush',
            title: elementor.translate('global_colors'),
            type: 'page',
            pageName: 'colorScheme'
          }, {
            name: 'global-fonts',
            icon: 'fa fa-font',
            title: elementor.translate('global_fonts'),
            type: 'page',
            pageName: 'typographyScheme'
          }, {
            name: 'color-picker',
            icon: 'fa fa-eyedropper',
            title: elementor.translate('color_picker'),
            type: 'page',
            pageName: 'colorPickerScheme'
          }]
        }, {
          name: 'settings',
          title: elementor.translate('settings'),
          items: [{
            name: 'elementor-settings',
            icon: 'fa fa-external-link',
            title: elementor.translate('elementor_settings'),
            type: 'link',
            link: elementor.config.settings_page_link,
            newTab: true
          }, {
            name: 'about-elementor',
            icon: 'fa fa-info-circle',
            title: elementor.translate('about_elementor'),
            type: 'link',
            link: elementor.config.elementor_site,
            newTab: true
          }]
        }]);
      },
      getGroups: function getGroups() {
        if (!this.groups) {
          this.initGroups();
        }

        return this.groups;
      },
      addItem: function addItem(itemData, groupName, before) {
        var group = this.getGroups().findWhere({
          name: groupName
        });

        if (!group) {
          return;
        }

        var items = group.get('items'),
            beforeItem;

        if (before) {
          beforeItem = _.findWhere(items, {
            name: before
          });
        }

        if (beforeItem) {
          items.splice(items.indexOf(beforeItem), 0, itemData);
        } else {
          items.push(itemData);
        }
      }
    });
    module.exports = PanelMenuPageView;
  }, {
    "elementor-panel/pages/menu/views/group": 92
  }],
  92: [function (require, module, exports) {
    var PanelMenuItemView = require('elementor-panel/pages/menu/views/item');

    module.exports = Marionette.CompositeView.extend({
      template: '#tmpl-elementor-panel-menu-group',
      className: 'elementor-panel-menu-group',
      childView: PanelMenuItemView,
      childViewContainer: '.elementor-panel-menu-items',
      initialize: function initialize() {
        this.collection = new Backbone.Collection(this.model.get('items'));
      },
      onChildviewClick: function onChildviewClick(childView) {
        var menuItemType = childView.model.get('type');

        switch (menuItemType) {
          case 'page':
            var pageName = childView.model.get('pageName'),
                pageTitle = childView.model.get('title');
            elementor.getPanelView().setPage(pageName, pageTitle);
            break;

          case 'link':
            var link = childView.model.get('link'),
                isNewTab = childView.model.get('newTab');

            if (isNewTab) {
              open(link, '_blank');
            } else {
              location.href = childView.model.get('link');
            }

            break;

          default:
            var callback = childView.model.get('callback');

            if (_.isFunction(callback)) {
              callback.call(childView);
            }

        }
      }
    });
  }, {
    "elementor-panel/pages/menu/views/item": 93
  }],
  93: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-menu-item',
      className: 'elementor-panel-menu-item',
      triggers: {
        click: 'click'
      }
    });
  }, {}],
  94: [function (require, module, exports) {
    var childViewTypes = {
      color: require('elementor-panel/pages/schemes/items/color'),
      typography: require('elementor-panel/pages/schemes/items/typography')
    },
        PanelSchemeBaseView;
    PanelSchemeBaseView = Marionette.CompositeView.extend({
      id: function id() {
        return 'elementor-panel-scheme-' + this.getType();
      },
      className: function className() {
        return 'elementor-panel-scheme elementor-panel-scheme-' + this.getUIType();
      },
      childViewContainer: '.elementor-panel-scheme-items',
      getTemplate: function getTemplate() {
        return Marionette.TemplateCache.get('#tmpl-elementor-panel-schemes-' + this.getType());
      },
      getChildView: function getChildView() {
        return childViewTypes[this.getUIType()];
      },
      getUIType: function getUIType() {
        return this.getType();
      },
      ui: function ui() {
        return {
          saveButton: '.elementor-panel-scheme-save .elementor-button',
          discardButton: '.elementor-panel-scheme-discard .elementor-button',
          resetButton: '.elementor-panel-scheme-reset .elementor-button'
        };
      },
      events: function events() {
        return {
          'click @ui.saveButton': 'saveScheme',
          'click @ui.discardButton': 'discardScheme',
          'click @ui.resetButton': 'setDefaultScheme'
        };
      },
      initialize: function initialize() {
        this.model = new Backbone.Model();
        this.resetScheme();
      },
      getType: function getType() {},
      getScheme: function getScheme() {
        return elementor.schemes.getScheme(this.getType());
      },
      changeChildrenUIValues: function changeChildrenUIValues(schemeItems) {
        var self = this;

        _.each(schemeItems, function (value, key) {
          var model = self.collection.findWhere({
            key: key
          }),
              childView = self.children.findByModelCid(model.cid);
          childView.changeUIValue(value);
        });
      },
      discardScheme: function discardScheme() {
        elementor.schemes.resetSchemes(this.getType());
        this.onSchemeChange();
        this.ui.saveButton.prop('disabled', true);

        this._renderChildren();
      },
      setSchemeValue: function setSchemeValue(key, value) {
        elementor.schemes.setSchemeValue(this.getType(), key, value);
        this.onSchemeChange();
      },
      saveScheme: function saveScheme() {
        elementor.schemes.saveScheme(this.getType());
        this.ui.saveButton.prop('disabled', true);
        this.resetScheme();

        this._renderChildren();
      },
      setDefaultScheme: function setDefaultScheme() {
        var defaultScheme = elementor.config.default_schemes[this.getType()].items;
        this.changeChildrenUIValues(defaultScheme);
      },
      resetItems: function resetItems() {
        this.model.set('items', this.getScheme().items);
      },
      resetCollection: function resetCollection() {
        var self = this,
            items = self.model.get('items');
        self.collection = new Backbone.Collection();

        _.each(items, function (item, key) {
          item.type = self.getType();
          item.key = key;
          self.collection.add(item);
        });
      },
      resetScheme: function resetScheme() {
        this.resetItems();
        this.resetCollection();
      },
      onSchemeChange: function onSchemeChange() {
        elementor.schemes.printSchemesStyle();
      },
      onChildviewValueChange: function onChildviewValueChange(childView, newValue) {
        this.ui.saveButton.removeProp('disabled');
        this.setSchemeValue(childView.model.get('key'), newValue);
      }
    });
    module.exports = PanelSchemeBaseView;
  }, {
    "elementor-panel/pages/schemes/items/color": 99,
    "elementor-panel/pages/schemes/items/typography": 100
  }],
  95: [function (require, module, exports) {
    var PanelSchemeColorsView = require('elementor-panel/pages/schemes/colors'),
        PanelSchemeColorPickerView;

    PanelSchemeColorPickerView = PanelSchemeColorsView.extend({
      getType: function getType() {
        return 'color-picker';
      },
      getUIType: function getUIType() {
        return 'color';
      },
      onSchemeChange: function onSchemeChange() {},
      getViewComparator: function getViewComparator() {
        return this.orderView;
      },
      orderView: function orderView(model) {
        return elementor.helpers.getColorPickerPaletteIndex(model.get('key'));
      }
    });
    module.exports = PanelSchemeColorPickerView;
  }, {
    "elementor-panel/pages/schemes/colors": 96
  }],
  96: [function (require, module, exports) {
    var PanelSchemeBaseView = require('elementor-panel/pages/schemes/base'),
        PanelSchemeColorsView;

    PanelSchemeColorsView = PanelSchemeBaseView.extend({
      ui: function ui() {
        var ui = PanelSchemeBaseView.prototype.ui.apply(this, arguments);
        ui.systemSchemes = '.elementor-panel-scheme-color-system-scheme';
        return ui;
      },
      events: function events() {
        var events = PanelSchemeBaseView.prototype.events.apply(this, arguments);
        events['click @ui.systemSchemes'] = 'onSystemSchemeClick';
        return events;
      },
      getType: function getType() {
        return 'color';
      },
      onSystemSchemeClick: function onSystemSchemeClick(event) {
        var $schemeClicked = jQuery(event.currentTarget),
            schemeName = $schemeClicked.data('schemeName'),
            scheme = elementor.config.system_schemes[this.getType()][schemeName].items;
        this.changeChildrenUIValues(scheme);
      }
    });
    module.exports = PanelSchemeColorsView;
  }, {
    "elementor-panel/pages/schemes/base": 94
  }],
  97: [function (require, module, exports) {
    var PanelSchemeDisabledView;
    PanelSchemeDisabledView = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-schemes-disabled',
      id: 'elementor-panel-schemes-disabled',
      className: 'elementor-panel-nerd-box',
      disabledTitle: '',
      templateHelpers: function templateHelpers() {
        return {
          disabledTitle: this.disabledTitle
        };
      }
    });
    module.exports = PanelSchemeDisabledView;
  }, {}],
  98: [function (require, module, exports) {
    var PanelSchemeItemView;
    PanelSchemeItemView = Marionette.ItemView.extend({
      getTemplate: function getTemplate() {
        return Marionette.TemplateCache.get('#tmpl-elementor-panel-scheme-' + this.getUIType() + '-item');
      },
      className: function className() {
        return 'elementor-panel-scheme-item';
      }
    });
    module.exports = PanelSchemeItemView;
  }, {}],
  99: [function (require, module, exports) {
    var PanelSchemeItemView = require('elementor-panel/pages/schemes/items/base'),
        PanelSchemeColorView;

    PanelSchemeColorView = PanelSchemeItemView.extend({
      getUIType: function getUIType() {
        return 'color';
      },
      ui: {
        input: '.elementor-panel-scheme-color-value'
      },
      changeUIValue: function changeUIValue(newValue) {
        this.ui.input.wpColorPicker('color', newValue);
      },
      onBeforeDestroy: function onBeforeDestroy() {
        if (this.ui.input.wpColorPicker('instance')) {
          this.ui.input.wpColorPicker('close');
        }
      },
      onRender: function onRender() {
        var self = this;
        elementor.helpers.wpColorPicker(self.ui.input, {
          change: function change(event, ui) {
            self.triggerMethod('value:change', ui.color.toString());
          }
        });
      }
    });
    module.exports = PanelSchemeColorView;
  }, {
    "elementor-panel/pages/schemes/items/base": 98
  }],
  100: [function (require, module, exports) {
    var PanelSchemeItemView = require('elementor-panel/pages/schemes/items/base'),
        PanelSchemeTypographyView;

    PanelSchemeTypographyView = PanelSchemeItemView.extend({
      getUIType: function getUIType() {
        return 'typography';
      },
      className: function className() {
        var classes = PanelSchemeItemView.prototype.className.apply(this, arguments);
        return classes + ' elementor-panel-box';
      },
      ui: {
        heading: '.elementor-panel-heading',
        allFields: '.elementor-panel-scheme-typography-item-field',
        inputFields: 'input.elementor-panel-scheme-typography-item-field',
        selectFields: 'select.elementor-panel-scheme-typography-item-field',
        selectFamilyFields: 'select.elementor-panel-scheme-typography-item-field[name="font_family"]'
      },
      events: {
        'input @ui.inputFields': 'onFieldChange',
        'change @ui.selectFields': 'onFieldChange',
        'click @ui.heading': 'toggleVisibility'
      },
      onRender: function onRender() {
        var self = this;
        this.ui.inputFields.add(this.ui.selectFields).each(function () {
          var $this = jQuery(this),
              name = $this.attr('name'),
              value = self.model.get('value')[name];
          $this.val(value);
        });
        this.ui.selectFamilyFields.select2({
          dir: elementor.config.is_rtl ? 'rtl' : 'ltr'
        });
      },
      toggleVisibility: function toggleVisibility() {
        this.ui.heading.toggleClass('elementor-open');
      },
      changeUIValue: function changeUIValue(newValue) {
        this.ui.allFields.each(function () {
          var $this = jQuery(this),
              thisName = $this.attr('name'),
              newFieldValue = newValue[thisName];
          $this.val(newFieldValue).trigger('change');
        });
      },
      onFieldChange: function onFieldChange(event) {
        var $select = this.$(event.currentTarget),
            currentValue = elementor.schemes.getSchemeValue('typography', this.model.get('key')).value,
            fieldKey = $select.attr('name');
        currentValue[fieldKey] = $select.val();

        if ('font_family' === fieldKey && !_.isEmpty(currentValue[fieldKey])) {
          elementor.helpers.enqueueFont(currentValue[fieldKey]);
        }

        this.triggerMethod('value:change', currentValue);
      }
    });
    module.exports = PanelSchemeTypographyView;
  }, {
    "elementor-panel/pages/schemes/items/base": 98
  }],
  101: [function (require, module, exports) {
    var PanelSchemeBaseView = require('elementor-panel/pages/schemes/base'),
        PanelSchemeTypographyView;

    PanelSchemeTypographyView = PanelSchemeBaseView.extend({
      getType: function getType() {
        return 'typography';
      }
    });
    module.exports = PanelSchemeTypographyView;
  }, {
    "elementor-panel/pages/schemes/base": 94
  }],
  102: [function (require, module, exports) {
    var EditModeItemView = require('elementor-layouts/edit-mode'),
        PanelLayoutView;

    PanelLayoutView = Marionette.LayoutView.extend({
      template: '#tmpl-elementor-panel',
      id: 'elementor-panel-inner',
      regions: {
        content: '#elementor-panel-content-wrapper',
        header: '#elementor-panel-header-wrapper',
        footer: '#elementor-panel-footer',
        modeSwitcher: '#elementor-mode-switcher'
      },
      pages: {},
      childEvents: {
        'click:add': function clickAdd() {
          this.setPage('elements');
        },
        'editor:destroy': function editorDestroy() {
          this.setPage('elements');
        }
      },
      currentPageName: null,
      currentPageView: null,
      _isScrollbarInitialized: false,
      initialize: function initialize() {
        this.initPages();
      },
      buildPages: function buildPages() {
        var pages = {
          elements: {
            view: require('elementor-panel/pages/elements/elements'),
            title: '<img src="' + elementor.config.assets_url + 'images/logo-panel.svg">'
          },
          editor: {
            view: require('elementor-panel/pages/editor')
          },
          menu: {
            view: elementor.modules.panel.Menu,
            title: '<img src="' + elementor.config.assets_url + 'images/logo-panel.svg">'
          },
          colorScheme: {
            view: require('elementor-panel/pages/schemes/colors')
          },
          typographyScheme: {
            view: require('elementor-panel/pages/schemes/typography')
          },
          colorPickerScheme: {
            view: require('elementor-panel/pages/schemes/color-picker')
          }
        };

        var schemesTypes = Object.keys(elementor.schemes.getSchemes()),
            disabledSchemes = _.difference(schemesTypes, elementor.schemes.getEnabledSchemesTypes());

        _.each(disabledSchemes, function (schemeType) {
          var scheme = elementor.schemes.getScheme(schemeType);
          pages[schemeType + 'Scheme'].view = require('elementor-panel/pages/schemes/disabled').extend({
            disabledTitle: scheme.disabled_title
          });
        });

        return pages;
      },
      initPages: function initPages() {
        var pages;

        this.getPages = function (page) {
          if (!pages) {
            pages = this.buildPages();
          }

          return page ? pages[page] : pages;
        };

        this.addPage = function (pageName, pageData) {
          if (!pages) {
            pages = this.buildPages();
          }

          pages[pageName] = pageData;
        };
      },
      getHeaderView: function getHeaderView() {
        return this.getChildView('header');
      },
      getFooterView: function getFooterView() {
        return this.getChildView('footer');
      },
      getCurrentPageName: function getCurrentPageName() {
        return this.currentPageName;
      },
      getCurrentPageView: function getCurrentPageView() {
        return this.currentPageView;
      },
      setPage: function setPage(page, title, viewOptions) {
        var pageData = this.getPages(page);

        if (!pageData) {
          throw new ReferenceError('Elementor panel doesn\'t have page named \'' + page + '\'');
        }

        if (pageData.options) {
          viewOptions = _.extend(pageData.options, viewOptions);
        }

        var View = pageData.view;

        if (pageData.getView) {
          View = pageData.getView();
        }

        this.currentPageView = new View(viewOptions);
        this.showChildView('content', this.currentPageView);
        this.getHeaderView().setTitle(title || pageData.title);
        this.currentPageName = page;
        this.trigger('set:page', this.currentPageView).trigger('set:page:' + page, this.currentPageView);
      },
      openEditor: function openEditor(model, view) {
        var currentPageName = this.getCurrentPageName();

        if ('editor' === currentPageName) {
          var currentPageView = this.getCurrentPageView(),
              currentEditableModel = currentPageView.model;

          if (currentEditableModel === model) {
            return;
          }
        }

        var elementData = elementor.getElementData(model);
        this.setPage('editor', elementor.translate('edit_element', [elementData.title]), {
          model: model,
          editedElementView: view
        });
        var action = 'panel/open_editor/' + model.get('elType'); // Example: panel/open_editor/widget

        elementor.hooks.doAction(action, this, model, view); // Example: panel/open_editor/widget/heading

        elementor.hooks.doAction(action + '/' + model.get('widgetType'), this, model, view);
      },
      onBeforeShow: function onBeforeShow() {
        var PanelFooterItemView = require('elementor-layouts/panel/footer'),
            PanelHeaderItemView = require('elementor-layouts/panel/header'); // Edit Mode


        this.showChildView('modeSwitcher', new EditModeItemView()); // Header

        this.showChildView('header', new PanelHeaderItemView()); // Footer

        this.showChildView('footer', new PanelFooterItemView()); // Added Editor events

        this.updateScrollbar = _.throttle(this.updateScrollbar, 100);
        this.getRegion('content').on('before:show', this.onEditorBeforeShow.bind(this)).on('empty', this.onEditorEmpty.bind(this)).on('show', this.updateScrollbar.bind(this)); // Set default page to elements

        this.setPage('elements');
        this.listenTo(elementor.channels.data, 'scrollbar:update', this.updateScrollbar);
      },
      onEditorBeforeShow: function onEditorBeforeShow() {
        _.defer(this.updateScrollbar.bind(this));
      },
      onEditorEmpty: function onEditorEmpty() {
        this.updateScrollbar();
      },
      updateScrollbar: function updateScrollbar() {
        var $panel = this.content.$el;

        if (!this._isScrollbarInitialized) {
          $panel.perfectScrollbar();
          this._isScrollbarInitialized = true;
          return;
        }

        $panel.perfectScrollbar('update');
      }
    });
    module.exports = PanelLayoutView;
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
  103: [function (require, module, exports) {
    var Ajax;
    Ajax = {
      config: {},
      initConfig: function initConfig() {
        this.config = {
          ajaxParams: {
            type: 'POST',
            url: elementor.config.ajaxurl,
            data: {}
          },
          actionPrefix: 'elementor_'
        };
      },
      init: function init() {
        this.initConfig();
      },
      send: function send(action, options) {
        var self = this,
            ajaxParams = elementor.helpers.cloneObject(this.config.ajaxParams);
        options = options || {};
        action = this.config.actionPrefix + action;
        jQuery.extend(ajaxParams, options);

        if (ajaxParams.data instanceof FormData) {
          ajaxParams.data.append('action', action);
          ajaxParams.data.append('_nonce', elementor.config.nonce);
        } else {
          ajaxParams.data.action = action;
          ajaxParams.data._nonce = elementor.config.nonce;
        }

        var successCallback = ajaxParams.success,
            errorCallback = ajaxParams.error;

        if (successCallback || errorCallback) {
          ajaxParams.success = function (response) {
            if (response.success && successCallback) {
              successCallback(response.data);
            }

            if (!response.success && errorCallback) {
              errorCallback(response.data);
            }
          };

          if (errorCallback) {
            ajaxParams.error = function (data) {
              errorCallback(data);
            };
          } else {
            ajaxParams.error = function (XMLHttpRequest) {
              if (0 === XMLHttpRequest.readyState && 'abort' === XMLHttpRequest.statusText) {
                return;
              }

              var message = self.createErrorMessage(XMLHttpRequest);
              elementor.notifications.showToast({
                message: message
              });
            };
          }
        }

        return jQuery.ajax(ajaxParams);
      },
      createErrorMessage: function createErrorMessage(XMLHttpRequest) {
        var message;

        if (4 === XMLHttpRequest.readyState) {
          message = elementor.translate('server_error');

          if (200 !== XMLHttpRequest.status) {
            message += ' (' + XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText + ')';
          }
        } else if (0 === XMLHttpRequest.readyState) {
          message = elementor.translate('server_connection_lost');
        } else {
          message = elementor.translate('unknown_error');
        }

        return message + '.';
      }
    };
    module.exports = Ajax;
  }, {}],
  104: [function (require, module, exports) {
    var Conditions;

    Conditions = function Conditions() {
      var self = this;

      this.compare = function (leftValue, rightValue, operator) {
        switch (operator) {
          /* jshint ignore:start */
          case '==':
            return leftValue == rightValue;

          case '!=':
            return leftValue != rightValue;

          /* jshint ignore:end */

          case '!==':
            return leftValue !== rightValue;

          case 'in':
            return -1 !== rightValue.indexOf(leftValue);

          case '!in':
            return -1 === rightValue.indexOf(leftValue);

          case '<':
            return leftValue < rightValue;

          case '<=':
            return leftValue <= rightValue;

          case '>':
            return leftValue > rightValue;

          case '>=':
            return leftValue >= rightValue;

          default:
            return leftValue === rightValue;
        }
      };

      this.check = function (conditions, comparisonObject) {
        var isOrCondition = 'or' === conditions.relation,
            conditionSucceed = !isOrCondition;
        jQuery.each(conditions.terms, function () {
          var term = this,
              comparisonResult;

          if (term.terms) {
            comparisonResult = self.check(term, comparisonObject);
          } else {
            var parsedName = term.name.match(/(\w+)(?:\[(\w+)])?/),
                value = comparisonObject[parsedName[1]];

            if (parsedName[2]) {
              value = value[parsedName[2]];
            }

            comparisonResult = self.compare(value, term.value, term.operator);
          }

          if (isOrCondition) {
            if (comparisonResult) {
              conditionSucceed = true;
            }

            return !comparisonResult;
          }

          if (!comparisonResult) {
            return conditionSucceed = false;
          }
        });
        return conditionSucceed;
      };
    };

    module.exports = new Conditions();
  }, {}],
  105: [function (require, module, exports) {
    var ViewModule = require('elementor-utils/view-module'),
        Stylesheet = require('elementor-editor-utils/stylesheet'),
        ControlsCSSParser;

    ControlsCSSParser = ViewModule.extend({
      stylesheet: null,
      getDefaultSettings: function getDefaultSettings() {
        return {
          id: 0
        };
      },
      getDefaultElements: function getDefaultElements() {
        return {
          $stylesheetElement: jQuery('<style>', {
            id: 'elementor-style-' + this.getSettings('id')
          })
        };
      },
      initStylesheet: function initStylesheet() {
        var viewportBreakpoints = elementor.config.viewportBreakpoints;
        this.stylesheet = new Stylesheet();
        this.stylesheet.addDevice('mobile', 0).addDevice('tablet', viewportBreakpoints.md).addDevice('desktop', viewportBreakpoints.lg);
      },
      addStyleRules: function addStyleRules(controls, values, controlsStack, placeholders, replacements) {
        var self = this;

        _.each(controls, function (control) {
          if (control.styleFields && control.styleFields.length) {
            values[control.name].each(function (itemModel) {
              self.addStyleRules(control.styleFields, itemModel.attributes, controlsStack, placeholders.concat(['{{CURRENT_ITEM}}']), replacements.concat(['.elementor-repeater-item-' + itemModel.get('_id')]));
            });
          }

          self.addControlStyleRules(control, values, controlsStack, placeholders, replacements);
        });
      },
      addControlStyleRules: function addControlStyleRules(control, values, controlsStack, placeholders, replacements) {
        var self = this;
        ControlsCSSParser.addControlStyleRules(self.stylesheet, control, controlsStack, function (control) {
          return self.getStyleControlValue(control, values);
        }, placeholders, replacements);
      },
      getStyleControlValue: function getStyleControlValue(control, values) {
        var value = values[control.name];

        if (control.selectors_dictionary) {
          value = control.selectors_dictionary[value] || value;
        }

        if (!_.isNumber(value) && _.isEmpty(value)) {
          return;
        }

        return value;
      },
      addStyleToDocument: function addStyleToDocument() {
        elementor.$previewContents.find('head').append(this.elements.$stylesheetElement);
        this.elements.$stylesheetElement.text(this.stylesheet);
      },
      removeStyleFromDocument: function removeStyleFromDocument() {
        this.elements.$stylesheetElement.remove();
      },
      onInit: function onInit() {
        ViewModule.prototype.onInit.apply(this, arguments);
        this.initStylesheet();
      }
    });

    ControlsCSSParser.addControlStyleRules = function (stylesheet, control, controlsStack, valueCallback, placeholders, replacements) {
      var value = valueCallback(control);

      if (undefined === value) {
        return;
      }

      _.each(control.selectors, function (cssProperty, selector) {
        var outputCssProperty;

        try {
          outputCssProperty = cssProperty.replace(/{{(?:([^.}]+)\.)?([^}]*)}}/g, function (originalPhrase, controlName, placeholder) {
            var parserControl = control,
                valueToInsert = value;

            if (controlName) {
              parserControl = _.findWhere(controlsStack, {
                name: controlName
              });

              if (!parserControl) {
                return '';
              }

              valueToInsert = valueCallback(parserControl);
            }

            var parsedValue = elementor.getControlView(parserControl.type).getStyleValue(placeholder.toLowerCase(), valueToInsert);

            if ('' === parsedValue) {
              throw '';
            }

            return parsedValue;
          });
        } catch (e) {
          return;
        }

        if (_.isEmpty(outputCssProperty)) {
          return;
        }

        var devicePattern = /^(?:\([^)]+\)){1,2}/,
            deviceRules = selector.match(devicePattern),
            query = {};

        if (deviceRules) {
          deviceRules = deviceRules[0];
          selector = selector.replace(devicePattern, '');
          var pureDevicePattern = /\(([^)]+)\)/g,
              pureDeviceRules = [],
              matches;

          while (matches = pureDevicePattern.exec(deviceRules)) {
            pureDeviceRules.push(matches[1]);
          }

          _.each(pureDeviceRules, function (deviceRule) {
            if ('desktop' === deviceRule) {
              return;
            }

            var device = deviceRule.replace(/\+$/, ''),
                endPoint = device === deviceRule ? 'max' : 'min';
            query[endPoint] = device;
          });
        }

        _.each(placeholders, function (placeholder, index) {
          // Check if it's a RegExp
          var regexp = placeholder.source ? placeholder.source : placeholder,
              placeholderPattern = new RegExp(regexp, 'g');
          selector = selector.replace(placeholderPattern, replacements[index]);
        });

        if (!Object.keys(query).length && control.responsive) {
          query = _.pick(elementor.helpers.cloneObject(control.responsive), ['min', 'max']);

          if ('desktop' === query.max) {
            delete query.max;
          }
        }

        stylesheet.addRules(selector, outputCssProperty, query);
      });
    };

    module.exports = ControlsCSSParser;
  }, {
    "elementor-editor-utils/stylesheet": 115,
    "elementor-utils/view-module": 126
  }],
  106: [function (require, module, exports) {
    var Debug = function Debug() {
      var self = this,
          errorStack = [],
          settings = {},
          elements = {};

      var initSettings = function initSettings() {
        settings = {
          debounceDelay: 500,
          urlsToWatch: ['elementor/assets']
        };
      };

      var initElements = function initElements() {
        elements.$window = jQuery(window);
      };

      var onError = function onError(event) {
        var originalEvent = event.originalEvent,
            error = originalEvent.error;

        if (!error) {
          return;
        }

        var isInWatchList = false,
            urlsToWatch = settings.urlsToWatch;
        jQuery.each(urlsToWatch, function () {
          if (-1 !== error.stack.indexOf(this)) {
            isInWatchList = true;
            return false;
          }
        });

        if (!isInWatchList) {
          return;
        }

        self.addError({
          type: error.name,
          message: error.message,
          url: originalEvent.filename,
          line: originalEvent.lineno,
          column: originalEvent.colno
        });
      };

      var bindEvents = function bindEvents() {
        elements.$window.on('error', onError);
      };

      var init = function init() {
        initSettings();
        initElements();
        bindEvents();
        self.sendErrors = _.debounce(self.sendErrors, settings.debounceDelay);
      };

      this.addURLToWatch = function (url) {
        settings.urlsToWatch.push(url);
      };

      this.addCustomError = function (error, category, tag) {
        var errorInfo = {
          type: error.name,
          message: error.message,
          url: error.fileName || error.sourceURL,
          line: error.lineNumber || error.line,
          column: error.columnNumber || error.column,
          customFields: {
            category: category || 'general',
            tag: tag
          }
        };

        if (!errorInfo.url) {
          var stackInfo = error.stack.match(/\n {4}at (.*?(?=:(\d+):(\d+)))/);

          if (stackInfo) {
            errorInfo.url = stackInfo[1];
            errorInfo.line = stackInfo[2];
            errorInfo.column = stackInfo[3];
          }
        }

        this.addError(errorInfo);
      };

      this.addError = function (errorParams) {
        var defaultParams = {
          type: 'Error',
          timestamp: Math.floor(new Date().getTime() / 1000),
          message: null,
          url: null,
          line: null,
          column: null,
          customFields: {}
        };
        errorStack.push(jQuery.extend(true, defaultParams, errorParams));
        self.sendErrors();
      };

      this.sendErrors = function () {
        // Avoid recursions on errors in ajax
        elements.$window.off('error', onError);
        jQuery.ajax({
          url: ElementorConfig.ajaxurl,
          method: 'POST',
          data: {
            action: 'elementor_debug_log',
            data: errorStack
          },
          success: function success() {
            errorStack = []; // Restore error handler

            elements.$window.on('error', onError);
          }
        });
      };

      init();
    };

    module.exports = new Debug();
  }, {}],
  107: [function (require, module, exports) {
    var heartbeat;
    heartbeat = {
      init: function init() {
        var modal;

        this.getModal = function () {
          if (!modal) {
            modal = this.initModal();
          }

          return modal;
        };

        jQuery(document).on({
          'heartbeat-send': function heartbeatSend(event, data) {
            data.elementor_post_lock = {
              post_ID: elementor.config.post_id
            };
          },
          'heartbeat-tick': function heartbeatTick(event, response) {
            if (response.locked_user) {
              if (elementor.saver.isEditorChanged()) {
                elementor.saver.saveEditor({
                  status: 'autosave'
                });
              }

              heartbeat.showLockMessage(response.locked_user);
            } else {
              heartbeat.getModal().hide();
            }

            elementor.config.nonce = response.elementorNonce;
          },
          'heartbeat-tick.wp-refresh-nonces': function heartbeatTickWpRefreshNonces(event, response) {
            var nonces = response['elementor-refresh-nonces'];

            if (nonces) {
              if (nonces.heartbeatNonce) {
                elementor.config.nonce = nonces.elementorNonce;
              }

              if (nonces.heartbeatNonce) {
                window.heartbeatSettings.nonce = nonces.heartbeatNonce;
              }
            }
          }
        });

        if (elementor.config.locked_user) {
          heartbeat.showLockMessage(elementor.config.locked_user);
        }
      },
      initModal: function initModal() {
        var modal = elementor.dialogsManager.createWidget('lightbox', {
          headerMessage: elementor.translate('take_over')
        });
        modal.addButton({
          name: 'go_back',
          text: elementor.translate('go_back'),
          callback: function callback() {
            parent.history.go(-1);
          }
        });
        modal.addButton({
          name: 'take_over',
          text: elementor.translate('take_over'),
          callback: function callback() {
            wp.heartbeat.enqueue('elementor_force_post_lock', true);
            wp.heartbeat.connectNow();
          }
        });
        return modal;
      },
      showLockMessage: function showLockMessage(lockedUser) {
        var modal = heartbeat.getModal();
        modal.setMessage(elementor.translate('dialog_user_taken_over', [lockedUser])).show();
      }
    };
    module.exports = heartbeat;
  }, {}],
  108: [function (require, module, exports) {
    var helpers;
    helpers = {
      _enqueuedFonts: [],
      elementsHierarchy: {
        section: {
          column: {
            widget: null,
            section: null
          }
        }
      },
      enqueueFont: function enqueueFont(font) {
        if (-1 !== this._enqueuedFonts.indexOf(font)) {
          return;
        }

        var fontType = elementor.config.controls.font.options[font],
            fontUrl,
            subsets = {
          'ru_RU': 'cyrillic',
          'uk': 'cyrillic',
          'bg_BG': 'cyrillic',
          'vi': 'vietnamese',
          'el': 'greek',
          'he_IL': 'hebrew'
        };

        switch (fontType) {
          case 'googlefonts':
            fontUrl = 'https://fonts.googleapis.com/css?family=' + font + ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

            if (subsets[elementor.config.locale]) {
              fontUrl += '&subset=' + subsets[elementor.config.locale];
            }

            break;

          case 'earlyaccess':
            var fontLowerString = font.replace(/\s+/g, '').toLowerCase();
            fontUrl = 'https://fonts.googleapis.com/earlyaccess/' + fontLowerString + '.css';
            break;
        }

        if (!_.isEmpty(fontUrl)) {
          elementor.$previewContents.find('link:last').after('<link href="' + fontUrl + '" rel="stylesheet" type="text/css">');
        }

        this._enqueuedFonts.push(font);

        elementor.channels.editor.trigger('font:insertion', fontType, font);
      },
      getElementChildType: function getElementChildType(elementType, container) {
        if (!container) {
          container = this.elementsHierarchy;
        }

        if (undefined !== container[elementType]) {
          if (jQuery.isPlainObject(container[elementType])) {
            return Object.keys(container[elementType]);
          }

          return null;
        }

        for (var type in container) {
          if (!container.hasOwnProperty(type)) {
            continue;
          }

          if (!jQuery.isPlainObject(container[type])) {
            continue;
          }

          var result = this.getElementChildType(elementType, container[type]);

          if (result) {
            return result;
          }
        }

        return null;
      },
      getUniqueID: function getUniqueID() {
        return Math.random().toString(16).substr(2, 7);
      },
      stringReplaceAll: function stringReplaceAll(string, replaces) {
        var re = new RegExp(Object.keys(replaces).join('|'), 'gi');
        return string.replace(re, function (matched) {
          return replaces[matched];
        });
      },
      isActiveControl: function isActiveControl(controlModel, values) {
        var condition, conditions; // TODO: Better way to get this?

        if (_.isFunction(controlModel.get)) {
          condition = controlModel.get('condition');
          conditions = controlModel.get('conditions');
        } else {
          condition = controlModel.condition;
          conditions = controlModel.conditions;
        } // Multiple conditions with relations.


        if (conditions) {
          return elementor.conditions.check(conditions, values);
        }

        if (_.isEmpty(condition)) {
          return true;
        }

        var hasFields = _.filter(condition, function (conditionValue, conditionName) {
          var conditionNameParts = conditionName.match(/([a-z_0-9]+)(?:\[([a-z_]+)])?(!?)$/i),
              conditionRealName = conditionNameParts[1],
              conditionSubKey = conditionNameParts[2],
              isNegativeCondition = !!conditionNameParts[3],
              controlValue = values[conditionRealName];

          if (undefined === controlValue) {
            return true;
          }

          if (conditionSubKey) {
            controlValue = controlValue[conditionSubKey];
          } // If it's a non empty array - check if the conditionValue contains the controlValue,
          // If the controlValue is a non empty array - check if the controlValue contains the conditionValue
          // otherwise check if they are equal. ( and give the ability to check if the value is an empty array )


          var isContains;

          if (_.isArray(conditionValue) && !_.isEmpty(conditionValue)) {
            isContains = _.contains(conditionValue, controlValue);
          } else if (_.isArray(controlValue) && !_.isEmpty(controlValue)) {
            isContains = _.contains(controlValue, conditionValue);
          } else {
            isContains = _.isEqual(conditionValue, controlValue);
          }

          return isNegativeCondition ? isContains : !isContains;
        });

        return _.isEmpty(hasFields);
      },
      cloneObject: function cloneObject(object) {
        return JSON.parse(JSON.stringify(object));
      },
      disableElementEvents: function disableElementEvents($element) {
        $element.each(function () {
          var currentPointerEvents = this.style.pointerEvents;

          if ('none' === currentPointerEvents) {
            return;
          }

          jQuery(this).data('backup-pointer-events', currentPointerEvents).css('pointer-events', 'none');
        });
      },
      enableElementEvents: function enableElementEvents($element) {
        $element.each(function () {
          var $this = jQuery(this),
              backupPointerEvents = $this.data('backup-pointer-events');

          if (undefined === backupPointerEvents) {
            return;
          }

          $this.removeData('backup-pointer-events').css('pointer-events', backupPointerEvents);
        });
      },
      getColorPickerPaletteIndex: function getColorPickerPaletteIndex(paletteKey) {
        return ['7', '8', '1', '5', '2', '3', '6', '4'].indexOf(paletteKey);
      },
      wpColorPicker: function wpColorPicker($element, options) {
        var self = this,
            colorPickerScheme = elementor.schemes.getScheme('color-picker'),
            items = _.sortBy(colorPickerScheme.items, function (item) {
          return self.getColorPickerPaletteIndex(item.key);
        }),
            defaultOptions = {
          width: window.innerWidth >= 1440 ? 271 : 251,
          palettes: _.pluck(items, 'value')
        };

        if (options) {
          _.extend(defaultOptions, options);
        }

        return $element.wpColorPicker(defaultOptions);
      },
      isInViewport: function isInViewport(element, html) {
        var rect = element.getBoundingClientRect();
        html = html || document.documentElement;
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || html.clientHeight) && rect.right <= (window.innerWidth || html.clientWidth);
      },
      scrollToView: function scrollToView(view) {
        // Timeout according to preview resize css animation duration
        setTimeout(function () {
          elementor.$previewContents.find('html, body').animate({
            scrollTop: view.$el.offset().top - elementor.$preview[0].contentWindow.innerHeight / 2
          });
        }, 500);
      }
    };
    module.exports = helpers;
  }, {}],
  109: [function (require, module, exports) {
    var ImagesManager;

    ImagesManager = function ImagesManager() {
      var self = this;
      var cache = {};
      var debounceDelay = 300;
      var registeredItems = [];

      var getNormalizedSize = function getNormalizedSize(image) {
        var size,
            imageSize = image.size;

        if ('custom' === imageSize) {
          var customDimension = image.dimension;

          if (customDimension.width || customDimension.height) {
            size = 'custom_' + customDimension.width + 'x' + customDimension.height;
          } else {
            return 'full';
          }
        } else {
          size = imageSize;
        }

        return size;
      };

      self.onceTriggerChange = _.once(function (model) {
        window.setTimeout(function () {
          model.get('settings').trigger('change', model.get('settings'));
        }, 700);
      });

      self.getImageUrl = function (image) {
        // Register for AJAX checking
        self.registerItem(image);
        var imageUrl = self.getItem(image); // If it's not in cache, like a new dropped widget or a custom size - get from settings

        if (!imageUrl) {
          if ('custom' === image.size) {
            if (elementor.getPanelView() && 'editor' === elementor.getPanelView().currentPageName && image.model) {
              // Trigger change again, so it's will load from the cache
              self.onceTriggerChange(image.model);
            }

            return;
          } // If it's a new dropped widget


          imageUrl = image.url;
        }

        return imageUrl;
      };

      self.getItem = function (image) {
        var size = getNormalizedSize(image),
            id = image.id;

        if (!size) {
          return false;
        }

        if (cache[id] && cache[id][size]) {
          return cache[id][size];
        }

        return false;
      };

      self.registerItem = function (image) {
        if ('' === image.id) {
          // It's a new dropped widget
          return;
        }

        if (self.getItem(image)) {
          // It's already in cache
          return;
        }

        registeredItems.push(image);
        self.debounceGetRemoteItems();
      };

      self.getRemoteItems = function () {
        var requestedItems = [],
            registeredItemsLength = Object.keys(registeredItems).length,
            image,
            index; // It's one item, so we can render it from remote server

        if (0 === registeredItemsLength) {
          return;
        } else if (1 === registeredItemsLength) {
          for (index in registeredItems) {
            image = registeredItems[index];
            break;
          }

          if (image && image.model) {
            image.model.renderRemoteServer();
            return;
          }
        }

        for (index in registeredItems) {
          image = registeredItems[index];
          var size = getNormalizedSize(image),
              id = image.id,
              isFirstTime = !cache[id] || 0 === Object.keys(cache[id]).length;
          requestedItems.push({
            id: id,
            size: size,
            is_first_time: isFirstTime
          });
        }

        window.elementor.ajax.send('get_images_details', {
          data: {
            items: requestedItems
          },
          success: function success(data) {
            var id, size;

            for (id in data) {
              if (!cache[id]) {
                cache[id] = {};
              }

              for (size in data[id]) {
                cache[id][size] = data[id][size];
              }
            }

            registeredItems = [];
          }
        });
      };

      self.debounceGetRemoteItems = _.debounce(self.getRemoteItems, debounceDelay);
    };

    module.exports = new ImagesManager();
  }, {}],
  110: [function (require, module, exports) {
    /**
     * HTML5 - Drag and Drop
     */
    ;

    (function ($) {
      var hasFullDataTransferSupport = function hasFullDataTransferSupport(event) {
        try {
          event.originalEvent.dataTransfer.setData('test', 'test');
          event.originalEvent.dataTransfer.clearData('test');
          return true;
        } catch (e) {
          return false;
        }
      };

      var Draggable = function Draggable(userSettings) {
        var self = this,
            settings = {},
            elementsCache = {},
            defaultSettings = {
          element: '',
          groups: null,
          onDragStart: null,
          onDragEnd: null
        };

        var initSettings = function initSettings() {
          $.extend(true, settings, defaultSettings, userSettings);
        };

        var initElementsCache = function initElementsCache() {
          elementsCache.$element = $(settings.element);
        };

        var buildElements = function buildElements() {
          elementsCache.$element.attr('draggable', true);
        };

        var onDragEnd = function onDragEnd(event) {
          if ($.isFunction(settings.onDragEnd)) {
            settings.onDragEnd.call(elementsCache.$element, event, self);
          }
        };

        var onDragStart = function onDragStart(event) {
          var groups = settings.groups || [],
              dataContainer = {
            groups: groups
          };

          if (hasFullDataTransferSupport(event)) {
            event.originalEvent.dataTransfer.setData(JSON.stringify(dataContainer), true);
          }

          if ($.isFunction(settings.onDragStart)) {
            settings.onDragStart.call(elementsCache.$element, event, self);
          }
        };

        var attachEvents = function attachEvents() {
          elementsCache.$element.on('dragstart', onDragStart).on('dragend', onDragEnd);
        };

        var init = function init() {
          initSettings();
          initElementsCache();
          buildElements();
          attachEvents();
        };

        this.destroy = function () {
          elementsCache.$element.off('dragstart', onDragStart);
          elementsCache.$element.removeAttr('draggable');
        };

        init();
      };

      var Droppable = function Droppable(userSettings) {
        var self = this,
            settings = {},
            elementsCache = {},
            currentElement,
            currentSide,
            defaultSettings = {
          element: '',
          items: '>',
          horizontalSensitivity: '10%',
          axis: ['vertical', 'horizontal'],
          placeholder: true,
          currentElementClass: 'html5dnd-current-element',
          placeholderClass: 'html5dnd-placeholder',
          hasDraggingOnChildClass: 'html5dnd-has-dragging-on-child',
          groups: null,
          isDroppingAllowed: null,
          onDragEnter: null,
          onDragging: null,
          onDropping: null,
          onDragLeave: null
        };

        var initSettings = function initSettings() {
          $.extend(settings, defaultSettings, userSettings);
        };

        var initElementsCache = function initElementsCache() {
          elementsCache.$element = $(settings.element);
          elementsCache.$placeholder = $('<div>', {
            'class': settings.placeholderClass
          });
        };

        var hasHorizontalDetection = function hasHorizontalDetection() {
          return -1 !== settings.axis.indexOf('horizontal');
        };

        var hasVerticalDetection = function hasVerticalDetection() {
          return -1 !== settings.axis.indexOf('vertical');
        };

        var checkHorizontal = function checkHorizontal(offsetX, elementWidth) {
          var isPercentValue, sensitivity;

          if (!hasHorizontalDetection()) {
            return false;
          }

          if (!hasVerticalDetection()) {
            return offsetX > elementWidth / 2 ? 'right' : 'left';
          }

          sensitivity = settings.horizontalSensitivity.match(/\d+/);

          if (!sensitivity) {
            return false;
          }

          sensitivity = sensitivity[0];
          isPercentValue = /%$/.test(settings.horizontalSensitivity);

          if (isPercentValue) {
            sensitivity = elementWidth / sensitivity;
          }

          if (offsetX > elementWidth - sensitivity) {
            return 'right';
          } else if (offsetX < sensitivity) {
            return 'left';
          }

          return false;
        };

        var setSide = function setSide(event) {
          var $element = $(currentElement),
              elementHeight = $element.outerHeight() - elementsCache.$placeholder.outerHeight(),
              elementWidth = $element.outerWidth();
          event = event.originalEvent;

          if (currentSide = checkHorizontal(event.offsetX, elementWidth)) {
            return;
          }

          if (!hasVerticalDetection()) {
            currentSide = null;
            return;
          }

          var elementPosition = currentElement.getBoundingClientRect();
          currentSide = event.clientY > elementPosition.top + elementHeight / 2 ? 'bottom' : 'top';
        };

        var insertPlaceholder = function insertPlaceholder() {
          if (!settings.placeholder) {
            return;
          }

          var insertMethod = 'top' === currentSide ? 'prependTo' : 'appendTo';
          elementsCache.$placeholder[insertMethod](currentElement);
        };

        var isDroppingAllowed = function isDroppingAllowed(event) {
          var dataTransferTypes, draggableGroups, isGroupMatch, isDroppingAllowed;

          if (settings.groups && hasFullDataTransferSupport(event)) {
            dataTransferTypes = event.originalEvent.dataTransfer.types;
            isGroupMatch = false;
            dataTransferTypes = Array.prototype.slice.apply(dataTransferTypes); // Convert to array, since Firefox hold it as DOMStringList

            dataTransferTypes.forEach(function (type) {
              try {
                draggableGroups = JSON.parse(type);

                if (!draggableGroups.groups.slice) {
                  return;
                }

                settings.groups.forEach(function (groupName) {
                  if (-1 !== draggableGroups.groups.indexOf(groupName)) {
                    isGroupMatch = true;
                    return false; // stops the forEach from extra loops
                  }
                });
              } catch (e) {}
            });

            if (!isGroupMatch) {
              return false;
            }
          }

          if ($.isFunction(settings.isDroppingAllowed)) {
            isDroppingAllowed = settings.isDroppingAllowed.call(currentElement, currentSide, event, self);

            if (!isDroppingAllowed) {
              return false;
            }
          }

          return true;
        };

        var onDragEnter = function onDragEnter(event) {
          event.stopPropagation();

          if (currentElement) {
            return;
          }

          currentElement = this;
          elementsCache.$element.parents().each(function () {
            var droppableInstance = $(this).data('html5Droppable');

            if (!droppableInstance) {
              return;
            }

            droppableInstance.doDragLeave();
          });
          setSide(event);

          if (!isDroppingAllowed(event)) {
            return;
          }

          insertPlaceholder();
          elementsCache.$element.addClass(settings.hasDraggingOnChildClass);
          $(currentElement).addClass(settings.currentElementClass);

          if ($.isFunction(settings.onDragEnter)) {
            settings.onDragEnter.call(currentElement, currentSide, event, self);
          }
        };

        var onDragOver = function onDragOver(event) {
          event.stopPropagation();

          if (!currentElement) {
            onDragEnter.call(this, event);
          }

          var oldSide = currentSide;
          setSide(event);

          if (!isDroppingAllowed(event)) {
            return;
          }

          event.preventDefault();

          if (oldSide !== currentSide) {
            insertPlaceholder();
          }

          if ($.isFunction(settings.onDragging)) {
            settings.onDragging.call(this, currentSide, event, self);
          }
        };

        var onDragLeave = function onDragLeave(event) {
          var elementPosition = this.getBoundingClientRect();

          if ('dragleave' === event.type && !(event.clientX < elementPosition.left || event.clientX >= elementPosition.right || event.clientY < elementPosition.top || event.clientY >= elementPosition.bottom)) {
            return;
          }

          $(currentElement).removeClass(settings.currentElementClass);
          self.doDragLeave();
        };

        var onDrop = function onDrop(event) {
          setSide(event);

          if (!isDroppingAllowed(event)) {
            return;
          }

          event.preventDefault();

          if ($.isFunction(settings.onDropping)) {
            settings.onDropping.call(this, currentSide, event, self);
          }
        };

        var attachEvents = function attachEvents() {
          elementsCache.$element.on('dragenter', settings.items, onDragEnter).on('dragover', settings.items, onDragOver).on('drop', settings.items, onDrop).on('dragleave drop', settings.items, onDragLeave);
        };

        var init = function init() {
          initSettings();
          initElementsCache();
          attachEvents();
        };

        this.doDragLeave = function () {
          if (settings.placeholder) {
            elementsCache.$placeholder.remove();
          }

          elementsCache.$element.removeClass(settings.hasDraggingOnChildClass);

          if ($.isFunction(settings.onDragLeave)) {
            settings.onDragLeave.call(currentElement, event, self);
          }

          currentElement = currentSide = null;
        };

        this.destroy = function () {
          elementsCache.$element.off('dragenter', settings.items, onDragEnter).off('dragover', settings.items, onDragOver).off('drop', settings.items, onDrop).off('dragleave drop', settings.items, onDragLeave);
        };

        init();
      };

      var plugins = {
        html5Draggable: Draggable,
        html5Droppable: Droppable
      };
      $.each(plugins, function (pluginName, Plugin) {
        $.fn[pluginName] = function (options) {
          options = options || {};
          this.each(function () {
            var instance = $.data(this, pluginName),
                hasInstance = instance instanceof Plugin;

            if (hasInstance) {
              if ('destroy' === options) {
                instance.destroy();
                $.removeData(this, pluginName);
              }

              return;
            }

            options.element = this;
            $.data(this, pluginName, new Plugin(options));
          });
          return this;
        };
      });
    })(jQuery);
  }, {}],
  111: [function (require, module, exports) {
    /*!
     * jQuery Serialize Object v1.0.1
     */
    (function ($) {
      $.fn.elementorSerializeObject = function () {
        var serializedArray = this.serializeArray(),
            data = {};

        var parseObject = function parseObject(dataContainer, key, value) {
          var isArrayKey = /^[^\[\]]+\[]/.test(key),
              isObjectKey = /^[^\[\]]+\[[^\[\]]+]/.test(key),
              keyName = key.replace(/\[.*/, '');

          if (isArrayKey) {
            if (!dataContainer[keyName]) {
              dataContainer[keyName] = [];
            }
          } else {
            if (!isObjectKey) {
              if (dataContainer.push) {
                dataContainer.push(value);
              } else {
                dataContainer[keyName] = value;
              }

              return;
            }

            if (!dataContainer[keyName]) {
              dataContainer[keyName] = {};
            }
          }

          var nextKeys = key.match(/\[[^\[\]]*]/g);
          nextKeys[0] = nextKeys[0].replace(/\[|]/g, '');
          return parseObject(dataContainer[keyName], nextKeys.join(''), value);
        };

        $.each(serializedArray, function () {
          parseObject(data, this.name, this.value);
        });
        return data;
      };
    })(jQuery);
  }, {}],
  112: [function (require, module, exports) {
    var Module = require('elementor-utils/module');

    module.exports = Module.extend({
      initToast: function initToast() {
        var toast = elementor.dialogsManager.createWidget('buttons', {
          id: 'elementor-toast',
          position: {
            my: 'center bottom',
            at: 'center bottom-10',
            of: '#elementor-panel-content-wrapper',
            autoRefresh: true
          },
          hide: {
            onClick: true,
            auto: true,
            autoDelay: 10000
          },
          effects: {
            show: function show() {
              var $widget = toast.getElements('widget');
              $widget.show();
              toast.refreshPosition();
              var top = parseInt($widget.css('top'), 10);
              $widget.hide().css('top', top + 100);
              $widget.animate({
                opacity: 'show',
                height: 'show',
                paddingBottom: 'show',
                paddingTop: 'show',
                top: top
              }, {
                easing: 'linear',
                duration: 300
              });
            },
            hide: function hide() {
              var $widget = toast.getElements('widget'),
                  top = parseInt($widget.css('top'), 10);
              $widget.animate({
                opacity: 'hide',
                height: 'hide',
                paddingBottom: 'hide',
                paddingTop: 'hide',
                top: top + 100
              }, {
                easing: 'linear',
                duration: 300
              });
            }
          },
          buttonTag: 'div'
        });

        this.getToast = function () {
          return toast;
        };
      },
      showToast: function showToast(options) {
        var toast = this.getToast();
        toast.setMessage(options.message);
        toast.getElements('buttonsWrapper').empty();

        if (options.buttons) {
          options.buttons.forEach(function (button) {
            toast.addButton(button);
          });
        }

        toast.show();
      },
      onInit: function onInit() {
        this.initToast();
      }
    });
  }, {
    "elementor-utils/module": 125
  }],
  113: [function (require, module, exports) {
    var presetsFactory;
    presetsFactory = {
      getPresetsDictionary: function getPresetsDictionary() {
        return {
          11: 100 / 9,
          12: 100 / 8,
          14: 100 / 7,
          16: 100 / 6,
          33: 100 / 3,
          66: 2 / 3 * 100,
          83: 5 / 6 * 100
        };
      },
      getAbsolutePresetValues: function getAbsolutePresetValues(preset) {
        var clonedPreset = elementor.helpers.cloneObject(preset),
            presetDictionary = this.getPresetsDictionary();

        _.each(clonedPreset, function (unitValue, unitIndex) {
          if (presetDictionary[unitValue]) {
            clonedPreset[unitIndex] = presetDictionary[unitValue];
          }
        });

        return clonedPreset;
      },
      getPresets: function getPresets(columnsCount, presetIndex) {
        var presets = elementor.helpers.cloneObject(elementor.config.elements.section.presets);

        if (columnsCount) {
          presets = presets[columnsCount];
        }

        if (presetIndex) {
          presets = presets[presetIndex];
        }

        return presets;
      },
      getPresetByStructure: function getPresetByStructure(structure) {
        var parsedStructure = this.getParsedStructure(structure);
        return this.getPresets(parsedStructure.columnsCount, parsedStructure.presetIndex);
      },
      getParsedStructure: function getParsedStructure(structure) {
        structure += ''; // Make sure this is a string

        return {
          columnsCount: structure.slice(0, -1),
          presetIndex: structure.substr(-1)
        };
      },
      getPresetSVG: function getPresetSVG(preset, svgWidth, svgHeight, separatorWidth) {
        svgWidth = svgWidth || 100;
        svgHeight = svgHeight || 50;
        separatorWidth = separatorWidth || 2;

        var absolutePresetValues = this.getAbsolutePresetValues(preset),
            presetSVGPath = this._generatePresetSVGPath(absolutePresetValues, svgWidth, svgHeight, separatorWidth);

        return this._createSVGPreset(presetSVGPath, svgWidth, svgHeight);
      },
      _createSVGPreset: function _createSVGPreset(presetPath, svgWidth, svgHeight) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svg.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', presetPath);
        svg.appendChild(path);
        return svg;
      },
      _generatePresetSVGPath: function _generatePresetSVGPath(preset, svgWidth, svgHeight, separatorWidth) {
        var DRAW_SIZE = svgWidth - separatorWidth * (preset.length - 1);
        var xPointer = 0,
            dOutput = '';

        for (var i = 0; i < preset.length; i++) {
          if (i) {
            dOutput += ' ';
          }

          var increment = preset[i] / 100 * DRAW_SIZE;
          xPointer += increment;
          dOutput += 'M' + +xPointer.toFixed(4) + ',0';
          dOutput += 'V' + svgHeight;
          dOutput += 'H' + +(xPointer - increment).toFixed(4);
          dOutput += 'V0Z';
          xPointer += separatorWidth;
        }

        return dOutput;
      }
    };
    module.exports = presetsFactory;
  }, {}],
  114: [function (require, module, exports) {
    var Schemes,
        Stylesheet = require('elementor-editor-utils/stylesheet'),
        ControlsCSSParser = require('elementor-editor-utils/controls-css-parser');

    Schemes = function Schemes() {
      var self = this,
          stylesheet = new Stylesheet(),
          schemes = {},
          settings = {
        selectorWrapperPrefix: '.elementor-widget-'
      },
          elements = {};

      var buildUI = function buildUI() {
        elements.$previewHead.append(elements.$style);
      };

      var initElements = function initElements() {
        elements.$style = jQuery('<style>', {
          id: 'elementor-style-scheme'
        });
        elements.$previewHead = elementor.$previewContents.find('head');
      };

      var initSchemes = function initSchemes() {
        schemes = elementor.helpers.cloneObject(elementor.config.schemes.items);
      };

      var fetchControlStyles = function fetchControlStyles(control, controlsStack, widgetType) {
        ControlsCSSParser.addControlStyleRules(stylesheet, control, controlsStack, function (control) {
          return self.getSchemeValue(control.scheme.type, control.scheme.value, control.scheme.key).value;
        }, ['{{WRAPPER}}'], [settings.selectorWrapperPrefix + widgetType]);
      };

      var fetchWidgetControlsStyles = function fetchWidgetControlsStyles(widget) {
        var widgetSchemeControls = self.getWidgetSchemeControls(widget);

        _.each(widgetSchemeControls, function (control) {
          fetchControlStyles(control, widgetSchemeControls, widget.widget_type);
        });
      };

      var fetchAllWidgetsSchemesStyle = function fetchAllWidgetsSchemesStyle() {
        _.each(elementor.config.widgets, function (widget) {
          fetchWidgetControlsStyles(widget);
        });
      };

      this.init = function () {
        initElements();
        buildUI();
        initSchemes();
        return self;
      };

      this.getWidgetSchemeControls = function (widget) {
        return _.filter(widget.controls, function (control) {
          return _.isObject(control.scheme);
        });
      };

      this.getSchemes = function () {
        return schemes;
      };

      this.getEnabledSchemesTypes = function () {
        return elementor.config.schemes.enabled_schemes;
      };

      this.getScheme = function (schemeType) {
        return schemes[schemeType];
      };

      this.getSchemeValue = function (schemeType, value, key) {
        if (this.getEnabledSchemesTypes().indexOf(schemeType) < 0) {
          return false;
        }

        var scheme = self.getScheme(schemeType),
            schemeValue = scheme.items[value];

        if (key && _.isObject(schemeValue)) {
          var clonedSchemeValue = elementor.helpers.cloneObject(schemeValue);
          clonedSchemeValue.value = schemeValue.value[key];
          return clonedSchemeValue;
        }

        return schemeValue;
      };

      this.printSchemesStyle = function () {
        stylesheet.empty();
        fetchAllWidgetsSchemesStyle();
        elements.$style.text(stylesheet);
      };

      this.resetSchemes = function (schemeName) {
        schemes[schemeName] = elementor.helpers.cloneObject(elementor.config.schemes.items[schemeName]);
      };

      this.saveScheme = function (schemeName) {
        elementor.config.schemes.items[schemeName].items = elementor.helpers.cloneObject(schemes[schemeName].items);
        var itemsToSave = {};

        _.each(schemes[schemeName].items, function (item, key) {
          itemsToSave[key] = item.value;
        });

        NProgress.start();
        elementor.ajax.send('apply_scheme', {
          data: {
            scheme_name: schemeName,
            data: JSON.stringify(itemsToSave)
          },
          success: function success() {
            NProgress.done();
          }
        });
      };

      this.setSchemeValue = function (schemeName, itemKey, value) {
        schemes[schemeName].items[itemKey].value = value;
      };
    };

    module.exports = new Schemes();
  }, {
    "elementor-editor-utils/controls-css-parser": 105,
    "elementor-editor-utils/stylesheet": 115
  }],
  115: [function (require, module, exports) {
    (function ($) {
      var Stylesheet = function Stylesheet() {
        var self = this,
            rules = {},
            rawCSS = {},
            devices = {};

        var getDeviceMaxValue = function getDeviceMaxValue(deviceName) {
          var deviceNames = Object.keys(devices),
              deviceNameIndex = deviceNames.indexOf(deviceName),
              nextIndex = deviceNameIndex + 1;

          if (nextIndex >= deviceNames.length) {
            throw new RangeError('Max value for this device is out of range.');
          }

          return devices[deviceNames[nextIndex]] - 1;
        };

        var queryToHash = function queryToHash(query) {
          var hash = [];
          $.each(query, function (endPoint) {
            hash.push(endPoint + '_' + this);
          });
          return hash.join('-');
        };

        var hashToQuery = function hashToQuery(hash) {
          var query = {};
          hash = hash.split('-').filter(String);
          hash.forEach(function (singleQuery) {
            var queryParts = singleQuery.split('_'),
                endPoint = queryParts[0],
                deviceName = queryParts[1];
            query[endPoint] = 'max' === endPoint ? getDeviceMaxValue(deviceName) : devices[deviceName];
          });
          return query;
        };

        var addQueryHash = function addQueryHash(queryHash) {
          rules[queryHash] = {};
          var hashes = Object.keys(rules);

          if (hashes.length < 2) {
            return;
          } // Sort the devices from narrowest to widest


          hashes.sort(function (a, b) {
            if ('all' === a) {
              return -1;
            }

            if ('all' === b) {
              return 1;
            }

            var aQuery = hashToQuery(a),
                bQuery = hashToQuery(b);
            return bQuery.max - aQuery.max;
          });
          var sortedRules = {};
          hashes.forEach(function (deviceName) {
            sortedRules[deviceName] = rules[deviceName];
          });
          rules = sortedRules;
        };

        var getQueryHashStyleFormat = function getQueryHashStyleFormat(queryHash) {
          var query = hashToQuery(queryHash),
              styleFormat = [];
          $.each(query, function (endPoint) {
            styleFormat.push('(' + endPoint + '-width:' + this + 'px)');
          });
          return '@media' + styleFormat.join(' and ');
        };

        this.addDevice = function (deviceName, deviceValue) {
          devices[deviceName] = deviceValue;
          var deviceNames = Object.keys(devices);

          if (deviceNames.length < 2) {
            return self;
          } // Sort the devices from narrowest to widest


          deviceNames.sort(function (a, b) {
            return devices[a] - devices[b];
          });
          var sortedDevices = {};
          deviceNames.forEach(function (deviceName) {
            sortedDevices[deviceName] = devices[deviceName];
          });
          devices = sortedDevices;
          return self;
        };

        this.addRawCSS = function (key, css) {
          rawCSS[key] = css;
        };

        this.addRules = function (selector, styleRules, query) {
          var queryHash = 'all';

          if (!_.isEmpty(query)) {
            queryHash = queryToHash(query);
          }

          if (!rules[queryHash]) {
            addQueryHash(queryHash);
          }

          if (!styleRules) {
            var parsedRules = selector.match(/[^{]+\{[^}]+}/g);
            $.each(parsedRules, function () {
              var parsedRule = this.match(/([^{]+)\{([^}]+)}/);

              if (parsedRule) {
                self.addRules(parsedRule[1].trim(), parsedRule[2].trim(), query);
              }
            });
            return;
          }

          if (!rules[queryHash][selector]) {
            rules[queryHash][selector] = {};
          }

          if ('string' === typeof styleRules) {
            styleRules = styleRules.split(';').filter(String);
            var orderedRules = {};

            try {
              $.each(styleRules, function () {
                var property = this.split(/:(.*)?/);
                orderedRules[property[0].trim()] = property[1].trim().replace(';', '');
              });
            } catch (error) {
              // At least one of the properties is incorrect
              return;
            }

            styleRules = orderedRules;
          }

          $.extend(rules[queryHash][selector], styleRules);
          return self;
        };

        this.getRules = function () {
          return rules;
        };

        this.empty = function () {
          rules = {};
          rawCSS = {};
        };

        this.toString = function () {
          var styleText = '';
          $.each(rules, function (queryHash) {
            var deviceText = Stylesheet.parseRules(this);

            if ('all' !== queryHash) {
              deviceText = getQueryHashStyleFormat(queryHash) + '{' + deviceText + '}';
            }

            styleText += deviceText;
          });
          $.each(rawCSS, function () {
            styleText += this;
          });
          return styleText;
        };
      };

      Stylesheet.parseRules = function (rules) {
        var parsedRules = '';
        $.each(rules, function (selector) {
          var selectorContent = Stylesheet.parseProperties(this);

          if (selectorContent) {
            parsedRules += selector + '{' + selectorContent + '}';
          }
        });
        return parsedRules;
      };

      Stylesheet.parseProperties = function (properties) {
        var parsedProperties = '';
        $.each(properties, function (propertyKey) {
          if (this) {
            parsedProperties += propertyKey + ':' + this + ';';
          }
        });
        return parsedProperties;
      };

      module.exports = Stylesheet;
    })(jQuery);
  }, {}],
  116: [function (require, module, exports) {
    var AddSectionView;
    AddSectionView = Marionette.ItemView.extend({
      template: Marionette.TemplateCache.get('#tmpl-elementor-add-section'),
      attributes: {
        'data-view': 'choose-action'
      },
      ui: {
        addNewSection: '.elementor-add-new-section',
        closeButton: '.elementor-add-section-close',
        addSectionButton: '.elementor-add-section-button',
        addTemplateButton: '.elementor-add-template-button',
        selectPreset: '.elementor-select-preset',
        presets: '.elementor-preset'
      },
      events: {
        'click @ui.addSectionButton': 'onAddSectionButtonClick',
        'click @ui.addTemplateButton': 'onAddTemplateButtonClick',
        'click @ui.closeButton': 'onCloseButtonClick',
        'click @ui.presets': 'onPresetSelected'
      },
      className: function className() {
        return 'elementor-add-section elementor-visible-desktop';
      },
      addSection: function addSection(properties, options) {
        return elementor.sections.currentView.addSection(properties, options);
      },
      setView: function setView(view) {
        this.$el.attr('data-view', view);
      },
      showSelectPresets: function showSelectPresets() {
        this.setView('select-preset');
      },
      closeSelectPresets: function closeSelectPresets() {
        this.setView('choose-action');
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
          axis: ['vertical'],
          groups: ['elementor-element'],
          placeholder: false,
          currentElementClass: 'elementor-html5dnd-current-element',
          hasDraggingOnChildClass: 'elementor-dragging-on-child',
          onDropping: this.onDropping.bind(this)
        });
      },
      onPresetSelected: function onPresetSelected(event) {
        this.closeSelectPresets();
        var selectedStructure = event.currentTarget.dataset.structure,
            parsedStructure = elementor.presetsFactory.getParsedStructure(selectedStructure),
            elements = [],
            loopIndex;

        for (loopIndex = 0; loopIndex < parsedStructure.columnsCount; loopIndex++) {
          elements.push({
            id: elementor.helpers.getUniqueID(),
            elType: 'column',
            settings: {},
            elements: []
          });
        }

        elementor.channels.data.trigger('element:before:add', {
          elType: 'section'
        });
        var newSection = this.addSection({
          elements: elements
        });
        newSection.setStructure(selectedStructure);
        elementor.channels.data.trigger('element:after:add');
      },
      onDropping: function onDropping() {
        elementor.channels.data.trigger('section:before:drop');
        this.addSection().addElementFromPanel();
        elementor.channels.data.trigger('section:after:drop');
      }
    });
    module.exports = AddSectionView;
  }, {}],
  117: [function (require, module, exports) {
    var BaseAddSectionView = require('elementor-views/add-section/base');

    module.exports = BaseAddSectionView.extend({
      id: 'elementor-add-new-section',
      onCloseButtonClick: function onCloseButtonClick() {
        this.closeSelectPresets();
      }
    });
  }, {
    "elementor-views/add-section/base": 116
  }],
  118: [function (require, module, exports) {
    var BaseAddSectionView = require('elementor-views/add-section/base');

    module.exports = BaseAddSectionView.extend({
      options: {
        atIndex: null
      },
      className: function className() {
        return BaseAddSectionView.prototype.className.apply(this, arguments) + ' elementor-add-section-inline';
      },
      addSection: function addSection(properties, options) {
        options = options || {};
        options.at = this.getOption('atIndex');
        return BaseAddSectionView.prototype.addSection.call(this, properties, options);
      },
      getTemplatesModalOptions: function getTemplatesModalOptions() {
        return _.extend(BaseAddSectionView.prototype.getTemplatesModalOptions.apply(this, arguments), {
          importOptions: {
            at: this.getOption('atIndex')
          }
        });
      },
      fadeToDeath: function fadeToDeath() {
        var self = this;
        self.$el.slideUp(function () {
          self.destroy();
        });
      },
      onCloseButtonClick: function onCloseButtonClick() {
        this.fadeToDeath();
      },
      onPresetSelected: function onPresetSelected() {
        BaseAddSectionView.prototype.onPresetSelected.apply(this, arguments);
        this.destroy();
      },
      onAddTemplateButtonClick: function onAddTemplateButtonClick() {
        BaseAddSectionView.prototype.onAddTemplateButtonClick.apply(this, arguments);
        this.destroy();
      },
      onDropping: function onDropping() {
        BaseAddSectionView.prototype.onDropping.apply(this, arguments);
        this.destroy();
      }
    });
  }, {
    "elementor-views/add-section/base": 116
  }],
  119: [function (require, module, exports) {
    module.exports = Marionette.CompositeView.extend({
      templateHelpers: function templateHelpers() {
        return {
          view: this
        };
      },
      getBehavior: function getBehavior(name) {
        return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
      },
      addChildModel: function addChildModel(model, options) {
        return this.collection.add(model, options, true);
      },
      addChildElement: function addChildElement(itemData, options) {
        options = options || {};
        var myChildType = this.getChildType(),
            elType = itemData.get ? itemData.get('elType') : itemData.elType;

        if (-1 === myChildType.indexOf(elType)) {
          delete options.at;
          return this.children.last().addChildElement(itemData, options);
        }

        var newModel = this.addChildModel(itemData, options),
            newView = this.children.findByModel(newModel);
        newView.edit();
        return newView;
      }
    });
  }, {}],
  120: [function (require, module, exports) {
    var SectionView = require('elementor-elements/views/section'),
        BaseContainer = require('elementor-views/base-container'),
        BaseSectionsContainerView;

    BaseSectionsContainerView = BaseContainer.extend({
      childView: SectionView,
      behaviors: function behaviors() {
        var behaviors = {
          Sortable: {
            behaviorClass: require('elementor-behaviors/sortable'),
            elChildType: 'section'
          },
          HandleDuplicate: {
            behaviorClass: require('elementor-behaviors/handle-duplicate')
          },
          HandleAddMode: {
            behaviorClass: require('elementor-behaviors/duplicate')
          }
        };
        return elementor.hooks.applyFilters('elements/base-section-container/behaviors', behaviors, this);
      },
      getSortableOptions: function getSortableOptions() {
        return {
          handle: '> .elementor-element-overlay .elementor-editor-section-settings .elementor-editor-element-trigger',
          items: '> .elementor-section'
        };
      },
      getChildType: function getChildType() {
        return ['section'];
      },
      isCollectionFilled: function isCollectionFilled() {
        return false;
      },
      initialize: function initialize() {
        this.listenTo(this.collection, 'add remove reset', this.onCollectionChanged).listenTo(elementor.channels.panelElements, 'element:drag:start', this.onPanelElementDragStart).listenTo(elementor.channels.panelElements, 'element:drag:end', this.onPanelElementDragEnd);
      },
      addSection: function addSection(properties, options) {
        var newSection = {
          id: elementor.helpers.getUniqueID(),
          elType: 'section',
          settings: {},
          elements: []
        };

        if (properties) {
          _.extend(newSection, properties);
        }

        var newModel = this.addChildModel(newSection, options);
        return this.children.findByModelCid(newModel.cid);
      },
      onCollectionChanged: function onCollectionChanged() {
        elementor.saver.setFlagEditorChange(true);
      },
      onPanelElementDragStart: function onPanelElementDragStart() {
        elementor.helpers.disableElementEvents(this.$el.find('iframe'));
      },
      onPanelElementDragEnd: function onPanelElementDragEnd() {
        elementor.helpers.enableElementEvents(this.$el.find('iframe'));
      }
    });
    module.exports = BaseSectionsContainerView;
  }, {
    "elementor-behaviors/duplicate": 67,
    "elementor-behaviors/handle-duplicate": 68,
    "elementor-behaviors/sortable": 72,
    "elementor-elements/views/section": 75,
    "elementor-views/base-container": 119
  }],
  121: [function (require, module, exports) {
    var ControlsStack;
    ControlsStack = Marionette.CompositeView.extend({
      className: 'elementor-panel-controls-stack',
      classes: {
        popover: 'elementor-controls-popover'
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
          tabs: '.elementor-panel-navigation-tab',
          reloadButton: '.elementor-update-preview-button'
        };
      },
      events: function events() {
        return {
          'click @ui.tabs': 'onClickTabControl',
          'click @ui.reloadButton': 'onReloadButtonClick'
        };
      },
      modelEvents: {
        'destroy': 'onModelDestroy'
      },
      behaviors: {
        HandleInnerTabs: {
          behaviorClass: require('elementor-behaviors/inner-tabs')
        }
      },
      initialize: function initialize() {
        this.listenTo(elementor.channels.deviceMode, 'change', this.onDeviceModeChange);
      },
      filter: function filter(controlModel) {
        if (controlModel.get('tab') !== this.activeTab) {
          return false;
        }

        if ('section' === controlModel.get('type')) {
          return true;
        }

        var section = controlModel.get('section');
        return !section || section === this.activeSection;
      },
      isVisibleSectionControl: function isVisibleSectionControl(sectionControlModel) {
        return this.activeTab === sectionControlModel.get('tab');
      },
      activateTab: function activateTab($tab) {
        var self = this,
            activeTab = this.activeTab = $tab.data('tab');
        this.ui.tabs.removeClass('active');
        $tab.addClass('active');
        var sectionControls = this.collection.filter(function (controlModel) {
          return 'section' === controlModel.get('type') && self.isVisibleSectionControl(controlModel);
        });

        if (sectionControls[0]) {
          this.activateSection(sectionControls[0].get('name'));
        }
      },
      activateSection: function activateSection(sectionName) {
        this.activeSection = sectionName;
      },
      getChildView: function getChildView(item) {
        var controlType = item.get('type');
        return elementor.getControlView(controlType);
      },
      handlePopovers: function handlePopovers() {
        var self = this,
            popoverStarted = false,
            $popover;
        self.removePopovers();
        self.children.each(function (child) {
          if (popoverStarted) {
            $popover.append(child.$el);
          }

          var popover = child.model.get('popover');

          if (!popover) {
            return;
          }

          if (popover.start) {
            popoverStarted = true;
            $popover = jQuery('<div>', {
              'class': self.classes.popover
            });
            child.$el.before($popover);
            $popover.append(child.$el);
          }

          if (popover.end) {
            popoverStarted = false;
          }
        });
      },
      removePopovers: function removePopovers() {
        this.$el.find('.' + this.classes.popover).remove();
      },
      openActiveSection: function openActiveSection() {
        var activeSection = this.activeSection,
            activeSectionView = this.children.filter(function (view) {
          return activeSection === view.model.get('name');
        });

        if (activeSectionView[0]) {
          activeSectionView[0].ui.heading.addClass('elementor-open');
        }
      },
      onRenderCollection: function onRenderCollection() {
        this.openActiveSection();
        this.handlePopovers();
      },
      onRenderTemplate: function onRenderTemplate() {
        this.activateTab(this.ui.tabs.eq(0));
      },
      onModelDestroy: function onModelDestroy() {
        this.destroy();
      },
      onClickTabControl: function onClickTabControl(event) {
        event.preventDefault();
        var $tab = this.$(event.currentTarget);

        if (this.activeTab === $tab.data('tab')) {
          return;
        }

        this.activateTab($tab);

        this._renderChildren();
      },
      onReloadButtonClick: function onReloadButtonClick() {
        elementor.reloadPreview();
      },
      onDeviceModeChange: function onDeviceModeChange() {
        this.$el.removeClass('elementor-responsive-switchers-open');
      },
      onChildviewControlSectionClicked: function onChildviewControlSectionClicked(childView) {
        var isSectionOpen = childView.ui.heading.hasClass('elementor-open');
        this.activateSection(isSectionOpen ? null : childView.model.get('name'));

        this._renderChildren();
      },
      onChildviewResponsiveSwitcherClick: function onChildviewResponsiveSwitcherClick(childView, device) {
        if ('desktop' === device) {
          this.$el.toggleClass('elementor-responsive-switchers-open');
        }
      }
    });
    module.exports = ControlsStack;
  }, {
    "elementor-behaviors/inner-tabs": 70
  }],
  122: [function (require, module, exports) {
    var BaseSectionsContainerView = require('elementor-views/base-sections-container'),
        AddSectionView = require('elementor-views/add-section/independent'),
        Preview;

    Preview = BaseSectionsContainerView.extend({
      template: Marionette.TemplateCache.get('#tmpl-elementor-preview'),
      className: 'elementor-inner',
      childViewContainer: '.elementor-section-wrap',
      onRender: function onRender() {
        var addNewSectionView = new AddSectionView();
        addNewSectionView.render();
        this.$el.append(addNewSectionView.$el);
      }
    });
    module.exports = Preview;
  }, {
    "elementor-views/add-section/independent": 117,
    "elementor-views/base-sections-container": 120
  }],
  123: [function (require, module, exports) {
    'use strict';
    /**
     * Handles managing all events for whatever you plug it into. Priorities for hooks are based on lowest to highest in
     * that, lowest priority hooks are fired first.
     */

    var EventManager = function EventManager() {
      var slice = Array.prototype.slice,
          MethodsAvailable;
      /**
       * Contains the hooks that get registered with this EventManager. The array for storage utilizes a "flat"
       * object literal such that looking up the hook utilizes the native object literal hash.
       */

      var STORAGE = {
        actions: {},
        filters: {}
      };
      /**
       * Removes the specified hook by resetting the value of it.
       *
       * @param type Type of hook, either 'actions' or 'filters'
       * @param hook The hook (namespace.identifier) to remove
       *
       * @private
       */

      function _removeHook(type, hook, callback, context) {
        var handlers, handler, i;

        if (!STORAGE[type][hook]) {
          return;
        }

        if (!callback) {
          STORAGE[type][hook] = [];
        } else {
          handlers = STORAGE[type][hook];

          if (!context) {
            for (i = handlers.length; i--;) {
              if (handlers[i].callback === callback) {
                handlers.splice(i, 1);
              }
            }
          } else {
            for (i = handlers.length; i--;) {
              handler = handlers[i];

              if (handler.callback === callback && handler.context === context) {
                handlers.splice(i, 1);
              }
            }
          }
        }
      }
      /**
       * Use an insert sort for keeping our hooks organized based on priority. This function is ridiculously faster
       * than bubble sort, etc: http://jsperf.com/javascript-sort
       *
       * @param hooks The custom array containing all of the appropriate hooks to perform an insert sort on.
       * @private
       */


      function _hookInsertSort(hooks) {
        var tmpHook, j, prevHook;

        for (var i = 1, len = hooks.length; i < len; i++) {
          tmpHook = hooks[i];
          j = i;

          while ((prevHook = hooks[j - 1]) && prevHook.priority > tmpHook.priority) {
            hooks[j] = hooks[j - 1];
            --j;
          }

          hooks[j] = tmpHook;
        }

        return hooks;
      }
      /**
       * Adds the hook to the appropriate storage container
       *
       * @param type 'actions' or 'filters'
       * @param hook The hook (namespace.identifier) to add to our event manager
       * @param callback The function that will be called when the hook is executed.
       * @param priority The priority of this hook. Must be an integer.
       * @param [context] A value to be used for this
       * @private
       */


      function _addHook(type, hook, callback, priority, context) {
        var hookObject = {
          callback: callback,
          priority: priority,
          context: context
        }; // Utilize 'prop itself' : http://jsperf.com/hasownproperty-vs-in-vs-undefined/19

        var hooks = STORAGE[type][hook];

        if (hooks) {
          // TEMP FIX BUG
          var hasSameCallback = false;
          jQuery.each(hooks, function () {
            if (this.callback === callback) {
              hasSameCallback = true;
              return false;
            }
          });

          if (hasSameCallback) {
            return;
          } // END TEMP FIX BUG


          hooks.push(hookObject);
          hooks = _hookInsertSort(hooks);
        } else {
          hooks = [hookObject];
        }

        STORAGE[type][hook] = hooks;
      }
      /**
       * Runs the specified hook. If it is an action, the value is not modified but if it is a filter, it is.
       *
       * @param type 'actions' or 'filters'
       * @param hook The hook ( namespace.identifier ) to be ran.
       * @param args Arguments to pass to the action/filter. If it's a filter, args is actually a single parameter.
       * @private
       */


      function _runHook(type, hook, args) {
        var handlers = STORAGE[type][hook],
            i,
            len;

        if (!handlers) {
          return 'filters' === type ? args[0] : false;
        }

        len = handlers.length;

        if ('filters' === type) {
          for (i = 0; i < len; i++) {
            args[0] = handlers[i].callback.apply(handlers[i].context, args);
          }
        } else {
          for (i = 0; i < len; i++) {
            handlers[i].callback.apply(handlers[i].context, args);
          }
        }

        return 'filters' === type ? args[0] : true;
      }
      /**
       * Adds an action to the event manager.
       *
       * @param action Must contain namespace.identifier
       * @param callback Must be a valid callback function before this action is added
       * @param [priority=10] Used to control when the function is executed in relation to other callbacks bound to the same hook
       * @param [context] Supply a value to be used for this
       */


      function addAction(action, callback, priority, context) {
        if ('string' === typeof action && 'function' === typeof callback) {
          priority = parseInt(priority || 10, 10);

          _addHook('actions', action, callback, priority, context);
        }

        return MethodsAvailable;
      }
      /**
       * Performs an action if it exists. You can pass as many arguments as you want to this function; the only rule is
       * that the first argument must always be the action.
       */


      function doAction()
      /* action, arg1, arg2, ... */
      {
        var args = slice.call(arguments);
        var action = args.shift();

        if ('string' === typeof action) {
          _runHook('actions', action, args);
        }

        return MethodsAvailable;
      }
      /**
       * Removes the specified action if it contains a namespace.identifier & exists.
       *
       * @param action The action to remove
       * @param [callback] Callback function to remove
       */


      function removeAction(action, callback) {
        if ('string' === typeof action) {
          _removeHook('actions', action, callback);
        }

        return MethodsAvailable;
      }
      /**
       * Adds a filter to the event manager.
       *
       * @param filter Must contain namespace.identifier
       * @param callback Must be a valid callback function before this action is added
       * @param [priority=10] Used to control when the function is executed in relation to other callbacks bound to the same hook
       * @param [context] Supply a value to be used for this
       */


      function addFilter(filter, callback, priority, context) {
        if ('string' === typeof filter && 'function' === typeof callback) {
          priority = parseInt(priority || 10, 10);

          _addHook('filters', filter, callback, priority, context);
        }

        return MethodsAvailable;
      }
      /**
       * Performs a filter if it exists. You should only ever pass 1 argument to be filtered. The only rule is that
       * the first argument must always be the filter.
       */


      function applyFilters()
      /* filter, filtered arg, arg2, ... */
      {
        var args = slice.call(arguments);
        var filter = args.shift();

        if ('string' === typeof filter) {
          return _runHook('filters', filter, args);
        }

        return MethodsAvailable;
      }
      /**
       * Removes the specified filter if it contains a namespace.identifier & exists.
       *
       * @param filter The action to remove
       * @param [callback] Callback function to remove
       */


      function removeFilter(filter, callback) {
        if ('string' === typeof filter) {
          _removeHook('filters', filter, callback);
        }

        return MethodsAvailable;
      }
      /**
       * Maintain a reference to the object scope so our public methods never get confusing.
       */


      MethodsAvailable = {
        removeFilter: removeFilter,
        applyFilters: applyFilters,
        addFilter: addFilter,
        removeAction: removeAction,
        doAction: doAction,
        addAction: addAction
      }; // return all of the publicly available methods

      return MethodsAvailable;
    };

    module.exports = EventManager;
  }, {}],
  124: [function (require, module, exports) {
    var HotKeys = function HotKeys() {
      var hotKeysHandlers = this.hotKeysHandlers = {};

      var isMac = function isMac() {
        return -1 !== navigator.userAgent.indexOf('Mac OS X');
      };

      var applyHotKey = function applyHotKey(event) {
        var handlers = hotKeysHandlers[event.which];

        if (!handlers) {
          return;
        }

        jQuery.each(handlers, function () {
          var handler = this;

          if (handler.isWorthHandling && !handler.isWorthHandling(event)) {
            return;
          } // Fix for some keyboard sources that consider alt key as ctrl key


          if (!handler.allowAltKey && event.altKey) {
            return;
          }

          event.preventDefault();
          handler.handle(event);
        });
      };

      this.isControlEvent = function (event) {
        return event[isMac() ? 'metaKey' : 'ctrlKey'];
      };

      this.addHotKeyHandler = function (keyCode, handlerName, handler) {
        if (!hotKeysHandlers[keyCode]) {
          hotKeysHandlers[keyCode] = {};
        }

        hotKeysHandlers[keyCode][handlerName] = handler;
      };

      this.bindListener = function ($listener) {
        $listener.on('keydown', applyHotKey);
      };
    };

    module.exports = new HotKeys();
  }, {}],
  125: [function (require, module, exports) {
    var Module = function Module() {
      var $ = jQuery,
          instanceParams = arguments,
          self = this,
          settings,
          events = {};

      var ensureClosureMethods = function ensureClosureMethods() {
        $.each(self, function (methodName) {
          var oldMethod = self[methodName];

          if ('function' !== typeof oldMethod) {
            return;
          }

          self[methodName] = function () {
            return oldMethod.apply(self, arguments);
          };
        });
      };

      var initSettings = function initSettings() {
        settings = self.getDefaultSettings();
        var instanceSettings = instanceParams[0];

        if (instanceSettings) {
          $.extend(settings, instanceSettings);
        }
      };

      var init = function init() {
        self.__construct.apply(self, instanceParams);

        ensureClosureMethods();
        initSettings();
        self.trigger('init');
      };

      this.getItems = function (items, itemKey) {
        if (itemKey) {
          var keyStack = itemKey.split('.'),
              currentKey = keyStack.splice(0, 1);

          if (!keyStack.length) {
            return items[currentKey];
          }

          if (!items[currentKey]) {
            return;
          }

          return this.getItems(items[currentKey], keyStack.join('.'));
        }

        return items;
      };

      this.getSettings = function (setting) {
        return this.getItems(settings, setting);
      };

      this.setSettings = function (settingKey, value, settingsContainer) {
        if (!settingsContainer) {
          settingsContainer = settings;
        }

        if ('object' === _typeof(settingKey)) {
          $.extend(settingsContainer, settingKey);
          return self;
        }

        var keyStack = settingKey.split('.'),
            currentKey = keyStack.splice(0, 1);

        if (!keyStack.length) {
          settingsContainer[currentKey] = value;
          return self;
        }

        if (!settingsContainer[currentKey]) {
          settingsContainer[currentKey] = {};
        }

        return self.setSettings(keyStack.join('.'), value, settingsContainer[currentKey]);
      };

      this.forceMethodImplementation = function (methodArguments) {
        var functionName = methodArguments.callee.name;
        throw new ReferenceError('The method ' + functionName + ' must to be implemented in the inheritor child.');
      };

      this.on = function (eventName, callback) {
        if (!events[eventName]) {
          events[eventName] = [];
        }

        events[eventName].push(callback);
        return self;
      };

      this.off = function (eventName, callback) {
        if (!events[eventName]) {
          return self;
        }

        if (!callback) {
          delete events[eventName];
          return self;
        }

        var callbackIndex = events[eventName].indexOf(callback);

        if (-1 !== callbackIndex) {
          delete events[eventName][callbackIndex];
        }

        return self;
      };

      this.trigger = function (eventName) {
        var methodName = 'on' + eventName[0].toUpperCase() + eventName.slice(1),
            params = Array.prototype.slice.call(arguments, 1);

        if (self[methodName]) {
          self[methodName].apply(self, params);
        }

        var callbacks = events[eventName];

        if (!callbacks) {
          return self;
        }

        $.each(callbacks, function (index, callback) {
          callback.apply(self, params);
        });
        return self;
      };

      init();
    };

    Module.prototype.__construct = function () {};

    Module.prototype.getDefaultSettings = function () {
      return {};
    };

    Module.extendsCount = 0;

    Module.extend = function (properties) {
      var $ = jQuery,
          parent = this;

      var child = function child() {
        return parent.apply(this, arguments);
      };

      $.extend(child, parent);
      child.prototype = Object.create($.extend({}, parent.prototype, properties));
      child.prototype.constructor = child;
      /*
       * Constructor ID is used to set an unique ID
          * to every extend of the Module.
          *
       * It's useful in some cases such as unique
       * listener for frontend handlers.
       */

      var constructorID = ++Module.extendsCount;

      child.prototype.getConstructorID = function () {
        return constructorID;
      };

      child.__super__ = parent.prototype;
      return child;
    };

    module.exports = Module;
  }, {}],
  126: [function (require, module, exports) {
    var Module = require('./module'),
        ViewModule;

    ViewModule = Module.extend({
      elements: null,
      getDefaultElements: function getDefaultElements() {
        return {};
      },
      bindEvents: function bindEvents() {},
      onInit: function onInit() {
        this.initElements();
        this.bindEvents();
      },
      initElements: function initElements() {
        this.elements = this.getDefaultElements();
      }
    });
    module.exports = ViewModule;
  }, {
    "./module": 125
  }],
  127: [function (require, module, exports) {
    module.exports = Marionette.Behavior.extend({
      listenerAttached: false,
      // use beforeRender that runs after the collection is exist
      onBeforeRender: function onBeforeRender() {
        if (this.view.collection && !this.listenerAttached) {
          this.view.collection.on('update', this.saveCollectionHistory, this);
          this.listenerAttached = true;
        }
      },
      saveCollectionHistory: function saveCollectionHistory(collection, event) {
        if (!elementor.history.history.getActive()) {
          return;
        }

        var historyItem, models, firstModel, type;

        if (event.add) {
          models = event.changes.added;
          firstModel = models[0];
          type = 'add';
        } else {
          models = event.changes.removed;
          firstModel = models[0];
          type = 'remove';
        }

        var title = elementor.history.history.getModelLabel(firstModel); // If it's an unknown model - don't save

        if (!title) {
          return;
        }

        var modelsJSON = [];

        _.each(models, function (model) {
          modelsJSON.push(model.toJSON({
            copyHtmlCache: true
          }));
        });

        historyItem = {
          type: type,
          elementType: firstModel.get('elType'),
          elementID: firstModel.get('id'),
          title: title,
          history: {
            behavior: this,
            collection: collection,
            event: event,
            models: modelsJSON
          }
        };
        elementor.history.history.addItem(historyItem);
      },
      add: function add(models, toView, position) {
        if ('section' === models[0].elType) {
          _.each(models, function (model) {
            model.dontFillEmpty = true;
          });
        }

        toView.addChildModel(models, {
          at: position,
          silent: 0
        });
      },
      remove: function remove(models, fromCollection) {
        fromCollection.remove(models, {
          silent: 0
        });
      },
      restore: function restore(historyItem, isRedo) {
        var type = historyItem.get('type'),
            history = historyItem.get('history'),
            didAction = false,
            behavior; // Find the new behavior and work with him

        if (history.behavior.view.model) {
          var modelID = history.behavior.view.model.get('id'),
              view = elementor.history.history.findView(modelID);

          if (view) {
            behavior = view.getBehavior('CollectionHistory');
          }
        } // Container or new Elements - Doesn't have a new behavior


        if (!behavior) {
          behavior = history.behavior;
        } // Stop listen to undo actions


        behavior.view.collection.off('update', behavior.saveCollectionHistory);

        switch (type) {
          case 'add':
            if (isRedo) {
              this.add(history.models, behavior.view, history.event.index);
            } else {
              this.remove(history.models, behavior.view.collection);
            }

            didAction = true;
            break;

          case 'remove':
            if (isRedo) {
              this.remove(history.models, behavior.view.collection);
            } else {
              this.add(history.models, behavior.view, history.event.index);
            }

            didAction = true;
            break;
        } // Listen again


        behavior.view.collection.on('update', behavior.saveCollectionHistory, history.behavior);
        return didAction;
      }
    });
  }, {}],
  128: [function (require, module, exports) {
    var ItemModel = require('./item');

    module.exports = Backbone.Collection.extend({
      model: ItemModel
    });
  }, {
    "./item": 131
  }],
  129: [function (require, module, exports) {
    module.exports = Marionette.Behavior.extend({
      oldValues: [],
      listenerAttached: false,
      initialize: function initialize() {
        this.lazySaveTextHistory = _.debounce(this.saveTextHistory.bind(this), 800);
      },
      // use beforeRender that runs after the settingsModel is exist
      onBeforeRender: function onBeforeRender() {
        if (!this.listenerAttached) {
          this.listenTo(this.view.getEditModel().get('settings'), 'change', this.saveHistory);
          this.listenerAttached = true;
        }
      },
      saveTextHistory: function saveTextHistory(model, changed, control) {
        var changedAttributes = {},
            currentValue = model.get(control.name),
            newValue;

        if (currentValue instanceof Backbone.Collection) {
          // Deep clone.
          newValue = currentValue.toJSON();
        } else {
          newValue = currentValue;
        }

        changedAttributes[control.name] = {
          old: this.oldValues[control.name],
          'new': newValue
        };
        var historyItem = {
          type: 'change',
          elementType: 'control',
          title: elementor.history.history.getModelLabel(model),
          subTitle: model.controls[changed[0]].label,
          history: {
            behavior: this,
            changed: changedAttributes,
            model: this.view.getEditModel().toJSON()
          }
        };
        elementor.history.history.addItem(historyItem);
        delete this.oldValues[control.name];
      },
      saveHistory: function saveHistory(model) {
        if (!elementor.history.history.getActive()) {
          return;
        }

        var self = this,
            changed = Object.keys(model.changed);

        if (!changed.length || !model.controls[changed[0]]) {
          return;
        }

        if (1 === changed.length) {
          var control = model.controls[changed[0]];

          if (_.isUndefined(self.oldValues[control.name])) {
            self.oldValues[control.name] = model.previous(control.name);
          }

          if (elementor.history.history.isItemStarted()) {
            // Do not delay the execution
            self.saveTextHistory(model, changed, control);
          } else {
            self.lazySaveTextHistory(model, changed, control);
          }

          return;
        }

        var changedAttributes = {};

        _.each(changed, function (controlName) {
          changedAttributes[controlName] = {
            old: model.previous(controlName),
            'new': model.get(controlName)
          };
        });

        var historyItem = {
          type: 'change',
          elementType: 'control',
          title: elementor.history.history.getModelLabel(model),
          history: {
            behavior: this,
            changed: changedAttributes,
            model: this.view.getEditModel().toJSON()
          }
        };

        if (1 === changed.length) {
          historyItem.subTitle = model.controls[changed[0]].label;
        }

        elementor.history.history.addItem(historyItem);
      },
      restore: function restore(historyItem, isRedo) {
        var history = historyItem.get('history'),
            modelID = history.model.id,
            view = elementor.history.history.findView(modelID);

        if (!view) {
          return;
        }

        var model = view.getEditModel ? view.getEditModel() : view.model,
            settings = model.get('settings'),
            behavior = view.getBehavior('ElementHistory'); // Stop listen to restore actions

        behavior.stopListening(settings, 'change', this.saveHistory);
        var restoredValues = {};

        _.each(history.changed, function (values, key) {
          if (isRedo) {
            restoredValues[key] = values['new'];
          } else {
            restoredValues[key] = values.old;
          }
        }); // Set at once.


        settings.set(restoredValues); // Trigger each field for `baseControl.onSettingsExternalChange`

        _.each(history.changed, function (values, key) {
          settings.trigger('change:external:' + key);
        });

        historyItem.set('status', isRedo ? 'not_applied' : 'applied'); // Listen again

        behavior.listenTo(settings, 'change', this.saveHistory);
      }
    });
  }, {}],
  130: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-history-no-items',
      id: 'elementor-panel-history-no-items',
      className: 'elementor-panel-nerd-box'
    });
  }, {}],
  131: [function (require, module, exports) {
    module.exports = Backbone.Model.extend({
      defaults: {
        id: 0,
        type: '',
        elementType: '',
        status: 'not_applied',
        title: '',
        subTitle: '',
        action: '',
        history: {}
      },
      initialize: function initialize() {
        this.set('items', new Backbone.Collection());
      }
    });
  }, {}],
  132: [function (require, module, exports) {
    var HistoryCollection = require('./collection'),
        HistoryItem = require('./item'),
        ElementHistoryBehavior = require('./element-behavior'),
        CollectionHistoryBehavior = require('./collection-behavior');

    var Manager = function Manager() {
      var self = this,
          currentItemID = null,
          items = new HistoryCollection(),
          editorSaved = false,
          active = true;
      var translations = {
        add: elementor.translate('added'),
        remove: elementor.translate('removed'),
        change: elementor.translate('edited'),
        move: elementor.translate('moved'),
        duplicate: elementor.translate('duplicated')
      };

      var addBehaviors = function addBehaviors(behaviors) {
        behaviors.ElementHistory = {
          behaviorClass: ElementHistoryBehavior
        };
        behaviors.CollectionHistory = {
          behaviorClass: CollectionHistoryBehavior
        };
        return behaviors;
      };

      var addCollectionBehavior = function addCollectionBehavior(behaviors) {
        behaviors.CollectionHistory = {
          behaviorClass: CollectionHistoryBehavior
        };
        return behaviors;
      };

      var getActionLabel = function getActionLabel(itemData) {
        if (translations[itemData.type]) {
          return translations[itemData.type];
        }

        return itemData.type;
      };

      var navigate = function navigate(isRedo) {
        var currentItem = items.find(function (model) {
          return 'not_applied' === model.get('status');
        }),
            currentItemIndex = items.indexOf(currentItem),
            requiredIndex = isRedo ? currentItemIndex - 1 : currentItemIndex + 1;

        if (!isRedo && !currentItem || requiredIndex < 0 || requiredIndex >= items.length) {
          return;
        }

        self.doItem(requiredIndex);
      };

      var addHotKeys = function addHotKeys() {
        var H_KEY = 72,
            Z_KEY = 90;
        elementor.hotKeys.addHotKeyHandler(Z_KEY, 'historyNavigation', {
          isWorthHandling: function isWorthHandling(event) {
            return items.length && !jQuery(event.target).is('input, textarea, [contenteditable=true]');
          },
          handle: function handle(event) {
            navigate(Z_KEY === event.which && event.shiftKey);
          }
        });
        elementor.hotKeys.addHotKeyHandler(H_KEY, 'showHistoryPage', {
          isWorthHandling: function isWorthHandling(event) {
            return elementor.hotKeys.isControlEvent(event) && event.shiftKey;
          },
          handle: function handle() {
            elementor.getPanelView().setPage('historyPage');
          }
        });
      };

      var onPanelSave = function onPanelSave() {
        if (items.length >= 2) {
          // Check if it's a save after made changes, `items.length - 1` is the `Editing Started Item
          var firstEditItem = items.at(items.length - 2);
          editorSaved = 'not_applied' === firstEditItem.get('status');
        }
      };

      var init = function init() {
        addHotKeys();
        elementor.hooks.addFilter('elements/base/behaviors', addBehaviors);
        elementor.hooks.addFilter('elements/base-section-container/behaviors', addCollectionBehavior);
        elementor.channels.data.on('drag:before:update', self.startMovingItem).on('drag:after:update', self.endItem).on('element:before:add', self.startAddElement).on('element:after:add', self.endItem).on('element:before:remove', self.startRemoveElement).on('element:after:remove', self.endItem).on('element:before:duplicate', self.startDuplicateElement).on('element:after:duplicate', self.endItem).on('section:before:drop', self.startDropElement).on('section:after:drop', self.endItem).on('template:before:insert', self.startInsertTemplate).on('template:after:insert', self.endItem);
        elementor.channels.editor.on('saved', onPanelSave);
      };

      this.setActive = function (value) {
        active = value;
      };

      this.getActive = function () {
        return active;
      };

      this.getItems = function () {
        return items;
      };

      this.startItem = function (itemData) {
        currentItemID = this.addItem(itemData);
      };

      this.endItem = function () {
        currentItemID = null;
      };

      this.isItemStarted = function () {
        return null !== currentItemID;
      };

      this.addItem = function (itemData) {
        if (!this.getActive()) {
          return;
        }

        if (!items.length) {
          items.add({
            status: 'not_applied',
            title: elementor.translate('editing_started'),
            subTitle: '',
            action: '',
            editing_started: true
          });
        } // Remove old applied items from top of list


        while (items.length && 'applied' === items.first().get('status')) {
          items.shift();
        }

        var id = currentItemID ? currentItemID : new Date().getTime();
        var currentItem = items.findWhere({
          id: id
        });

        if (!currentItem) {
          currentItem = new HistoryItem({
            id: id,
            title: itemData.title,
            subTitle: itemData.subTitle,
            action: getActionLabel(itemData),
            type: itemData.type,
            elementType: itemData.elementType
          });
          self.startItemTitle = '';
          self.startItemAction = '';
        }

        var position = 0; // Temp fix. On move a column - insert the `remove` subItem before the section changes subItem.
        // In a multi columns section - the structure has been changed,
        // In a one column section - it's filled with an empty column,
        // The order is important for the `redoItem`, that needed to change the section first
        // and only after that - to remove the column.

        if ('column' === itemData.elementType && 'remove' === itemData.type && 'column' === currentItem.get('elementType')) {
          position = 1;
        }

        currentItem.get('items').add(itemData, {
          at: position
        });
        items.add(currentItem, {
          at: 0
        });
        var panel = elementor.getPanelView();

        if ('historyPage' === panel.getCurrentPageName()) {
          panel.getCurrentPageView().render();
        }

        return id;
      };

      this.doItem = function (index) {
        // Don't track while restore the item
        this.setActive(false);
        var item = items.at(index);

        if ('not_applied' === item.get('status')) {
          this.undoItem(index);
        } else {
          this.redoItem(index);
        }

        this.setActive(true);
        var panel = elementor.getPanelView(),
            panelPage = panel.getCurrentPageView(),
            viewToScroll;

        if ('editor' === panel.getCurrentPageName()) {
          if (panelPage.getOption('editedElementView').isDestroyed) {
            // If the the element isn't exist - show the history panel
            panel.setPage('historyPage');
          } else {
            // If element exist - render again, maybe the settings has been changed
            viewToScroll = panelPage.getOption('editedElementView');
          }
        } else {
          if ('historyPage' === panel.getCurrentPageName()) {
            panelPage.render();
          } // Try scroll to affected element.


          if (item instanceof Backbone.Model && item.get('items').length) {
            var oldView = item.get('items').first().get('history').behavior.view;

            if (oldView.model) {
              viewToScroll = self.findView(oldView.model.get('id'));
            }
          }
        }

        if (viewToScroll && !elementor.helpers.isInViewport(viewToScroll.$el[0], elementor.$previewContents.find('html')[0])) {
          elementor.helpers.scrollToView(viewToScroll);
        }

        if (item.get('editing_started')) {
          if (!editorSaved) {
            elementor.saver.setFlagEditorChange(false);
          }
        }
      };

      this.undoItem = function (index) {
        var item;

        for (var stepNum = 0; stepNum < index; stepNum++) {
          item = items.at(stepNum);

          if ('not_applied' === item.get('status')) {
            item.get('items').each(function (subItem) {
              var history = subItem.get('history');

              if (history) {
                /* type duplicate first items hasn't history */
                history.behavior.restore(subItem);
              }
            });
            item.set('status', 'applied');
          }
        }
      };

      this.redoItem = function (index) {
        for (var stepNum = items.length - 1; stepNum >= index; stepNum--) {
          var item = items.at(stepNum);

          if ('applied' === item.get('status')) {
            var reversedSubItems = _.toArray(item.get('items').models).reverse();

            _(reversedSubItems).each(function (subItem) {
              var history = subItem.get('history');

              if (history) {
                /* type duplicate first items hasn't history */
                history.behavior.restore(subItem, true);
              }
            });

            item.set('status', 'not_applied');
          }
        }
      };

      this.getModelLabel = function (model) {
        if (!(model instanceof Backbone.Model)) {
          model = new Backbone.Model(model);
        }

        return elementor.getElementData(model).title;
      };

      this.findView = function (modelID, views) {
        var self = this,
            founded = false;

        if (!views) {
          views = elementor.sections.currentView.children;
        }

        _.each(views._views, function (view) {
          if (founded) {
            return;
          } // Widget global used getEditModel


          var model = view.getEditModel ? view.getEditModel() : view.model;

          if (modelID === model.get('id')) {
            founded = view;
          } else if (view.children && view.children.length) {
            founded = self.findView(modelID, view.children);
          }
        });

        return founded;
      };

      this.startMovingItem = function (model) {
        elementor.history.history.startItem({
          type: 'move',
          title: self.getModelLabel(model),
          elementType: model.get('elType')
        });
      };

      this.startInsertTemplate = function (model) {
        elementor.history.history.startItem({
          type: 'add',
          title: elementor.translate('template'),
          subTitle: model.get('title'),
          elementType: 'template'
        });
      };

      this.startDropElement = function () {
        var elementView = elementor.channels.panelElements.request('element:selected');
        elementor.history.history.startItem({
          type: 'add',
          title: self.getModelLabel(elementView.model),
          elementType: elementView.model.get('widgetType') || elementView.model.get('elType')
        });
      };

      this.startAddElement = function (model) {
        elementor.history.history.startItem({
          type: 'add',
          title: self.getModelLabel(model),
          elementType: model.elType
        });
      };

      this.startDuplicateElement = function (model) {
        elementor.history.history.startItem({
          type: 'duplicate',
          title: self.getModelLabel(model),
          elementType: model.get('elType')
        });
      };

      this.startRemoveElement = function (model) {
        elementor.history.history.startItem({
          type: 'remove',
          title: self.getModelLabel(model),
          elementType: model.get('elType')
        });
      };

      init();
    };

    module.exports = new Manager();
  }, {
    "./collection": 128,
    "./collection-behavior": 127,
    "./element-behavior": 129,
    "./item": 131
  }],
  133: [function (require, module, exports) {
    module.exports = Marionette.CompositeView.extend({
      id: 'elementor-panel-history',
      template: '#tmpl-elementor-panel-history-tab',
      childView: Marionette.ItemView.extend({
        template: '#tmpl-elementor-panel-history-item',
        ui: {
          item: '.elementor-history-item'
        },
        triggers: {
          'click @ui.item': 'item:click'
        }
      }),
      childViewContainer: '#elementor-history-list',
      currentItem: null,
      onRender: function onRender() {
        var self = this;

        _.defer(function () {
          // Set current item - the first not applied item
          if (self.children.length) {
            var currentItem = self.collection.find(function (model) {
              return 'not_applied' === model.get('status');
            }),
                currentView = self.children.findByModel(currentItem);
            self.updateCurrentItem(currentView.$el);
          }
        });
      },
      updateCurrentItem: function updateCurrentItem(element) {
        var currentItemClass = 'elementor-history-item-current';

        if (this.currentItem) {
          this.currentItem.removeClass(currentItemClass);
        }

        this.currentItem = element;
        this.currentItem.addClass(currentItemClass);
      },
      onChildviewItemClick: function onChildviewItemClick(childView, event) {
        if (childView.$el === this.currentItem) {
          return;
        }

        var collection = event.model.collection,
            itemIndex = collection.findIndex(event.model);
        elementor.history.history.doItem(itemIndex);
        this.updateCurrentItem(childView.$el);

        if (!this.isDestroyed) {
          this.render();
        }
      }
    });
  }, {}],
  134: [function (require, module, exports) {
    var HistoryPageView = require('./panel-page'),
        Manager;

    Manager = function Manager() {
      var self = this;

      var addPanelPage = function addPanelPage() {
        elementor.getPanelView().addPage('historyPage', {
          view: HistoryPageView,
          title: elementor.translate('history')
        });
      };

      var init = function init() {
        elementor.on('preview:loaded', addPanelPage);
        self.history = require('./history/manager');
        self.revisions = require('./revisions/manager');
        self.revisions.init();
      };

      jQuery(window).on('elementor:init', init);
    };

    module.exports = new Manager();
  }, {
    "./history/manager": 132,
    "./panel-page": 135,
    "./revisions/manager": 138
  }],
  135: [function (require, module, exports) {
    var TabHistoryView = require('./history/panel-tab'),
        TabHistoryEmpty = require('./history/empty'),
        TabRevisionsView = require('./revisions/panel-tab'),
        TabRevisionsEmpty = require('./revisions/empty');

    module.exports = Marionette.LayoutView.extend({
      template: '#tmpl-elementor-panel-history-page',
      regions: {
        content: '#elementor-panel-history-content'
      },
      ui: {
        tabs: '.elementor-panel-navigation-tab'
      },
      events: {
        'click @ui.tabs': 'onTabClick'
      },
      regionViews: {},
      currentTab: null,
      initialize: function initialize() {
        this.initRegionViews();
      },
      initRegionViews: function initRegionViews() {
        var historyItems = elementor.history.history.getItems(),
            revisionsItems = elementor.history.revisions.getItems();
        this.regionViews = {
          history: {
            region: this.content,
            view: function view() {
              if (historyItems.length) {
                return TabHistoryView;
              }

              return TabHistoryEmpty;
            },
            options: {
              collection: historyItems
            }
          },
          revisions: {
            region: this.content,
            view: function view() {
              if (revisionsItems.length) {
                return TabRevisionsView;
              }

              return TabRevisionsEmpty;
            },
            options: {
              collection: revisionsItems
            }
          }
        };
      },
      activateTab: function activateTab(tabName) {
        this.ui.tabs.removeClass('active').filter('[data-view="' + tabName + '"]').addClass('active');
        this.showView(tabName);
      },
      getCurrentTab: function getCurrentTab() {
        return this.currentTab;
      },
      showView: function showView(viewName) {
        var viewDetails = this.regionViews[viewName],
            options = viewDetails.options || {},
            View = viewDetails.view;

        if ('function' === typeof View) {
          View = viewDetails.view();
        }

        options.viewName = viewName;
        this.currentTab = new View(options);
        viewDetails.region.show(this.currentTab);
      },
      onRender: function onRender() {
        this.showView('history');
      },
      onTabClick: function onTabClick(event) {
        this.activateTab(event.currentTarget.dataset.view);
      },
      onDestroy: function onDestroy() {
        elementor.getPanelView().getFooterView().ui.history.removeClass('elementor-open');
      }
    });
  }, {
    "./history/empty": 130,
    "./history/panel-tab": 133,
    "./revisions/empty": 137,
    "./revisions/panel-tab": 140
  }],
  136: [function (require, module, exports) {
    var RevisionModel = require('./model');

    module.exports = Backbone.Collection.extend({
      model: RevisionModel,
      comparator: function comparator(model) {
        return -model.get('timestamp');
      }
    });
  }, {
    "./model": 139
  }],
  137: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-revisions-no-revisions',
      id: 'elementor-panel-revisions-no-revisions',
      className: 'elementor-panel-nerd-box'
    });
  }, {}],
  138: [function (require, module, exports) {
    var RevisionsCollection = require('./collection'),
        RevisionsManager;

    RevisionsManager = function RevisionsManager() {
      var self = this,
          revisions;

      this.getItems = function () {
        return revisions;
      };

      var onEditorSaved = function onEditorSaved(data) {
        if (data.latest_revisions) {
          self.addRevisions(data.latest_revisions);
        }

        if (data.revisions_ids) {
          var revisionsToKeep = revisions.filter(function (revision) {
            return -1 !== data.revisions_ids.indexOf(revision.get('id'));
          });
          revisions.reset(revisionsToKeep);
        }
      };

      var attachEvents = function attachEvents() {
        elementor.channels.editor.on('saved', onEditorSaved);
      };

      var addHotKeys = function addHotKeys() {
        var UP_ARROW_KEY = 38,
            DOWN_ARROW_KEY = 40;
        var navigationHandler = {
          isWorthHandling: function isWorthHandling() {
            var panel = elementor.getPanelView();

            if ('historyPage' !== panel.getCurrentPageName()) {
              return false;
            }

            var revisionsTab = panel.getCurrentPageView().getCurrentTab();
            return revisionsTab.currentPreviewId && revisionsTab.currentPreviewItem && revisionsTab.children.length > 1;
          },
          handle: function handle(event) {
            elementor.getPanelView().getCurrentPageView().getCurrentTab().navigate(UP_ARROW_KEY === event.which);
          }
        };
        elementor.hotKeys.addHotKeyHandler(UP_ARROW_KEY, 'revisionNavigation', navigationHandler);
        elementor.hotKeys.addHotKeyHandler(DOWN_ARROW_KEY, 'revisionNavigation', navigationHandler);
      };

      this.setEditorData = function (data) {
        var collection = elementor.getRegion('sections').currentView.collection;
        collection.reset(data);
      };

      this.getRevisionDataAsync = function (id, options) {
        _.extend(options, {
          data: {
            id: id
          }
        });

        return elementor.ajax.send('get_revision_data', options);
      };

      this.addRevisions = function (items) {
        items.forEach(function (item) {
          var existedModel = revisions.findWhere({
            id: item.id
          });

          if (existedModel) {
            revisions.remove(existedModel);
          }

          revisions.add(item);
        });
      };

      this.deleteRevision = function (revisionModel, options) {
        var params = {
          data: {
            id: revisionModel.get('id')
          },
          success: function success() {
            if (options.success) {
              options.success();
            }

            revisionModel.destroy();

            if (!revisions.length) {
              var panel = elementor.getPanelView();

              if ('historyPage' === panel.getCurrentPageName()) {
                panel.getCurrentPageView().activateTab('revisions');
              }
            }
          }
        };

        if (options.error) {
          params.error = options.error;
        }

        elementor.ajax.send('delete_revision', params);
      };

      this.init = function () {
        revisions = new RevisionsCollection(elementor.config.revisions);
        attachEvents();
        addHotKeys();
      };
    };

    module.exports = new RevisionsManager();
  }, {
    "./collection": 136
  }],
  139: [function (require, module, exports) {
    var RevisionModel;
    RevisionModel = Backbone.Model.extend();

    RevisionModel.prototype.sync = function () {
      return null;
    };

    module.exports = RevisionModel;
  }, {}],
  140: [function (require, module, exports) {
    module.exports = Marionette.CompositeView.extend({
      id: 'elementor-panel-revisions',
      template: '#tmpl-elementor-panel-revisions',
      childView: require('./view'),
      childViewContainer: '#elementor-revisions-list',
      ui: {
        discard: '.elementor-panel-scheme-discard .elementor-button',
        apply: '.elementor-panel-scheme-save .elementor-button'
      },
      events: {
        'click @ui.discard': 'onDiscardClick',
        'click @ui.apply': 'onApplyClick'
      },
      isRevisionApplied: false,
      jqueryXhr: null,
      currentPreviewId: null,
      currentPreviewItem: null,
      initialize: function initialize() {
        this.listenTo(elementor.channels.editor, 'saved', this.onEditorSaved);
        this.currentPreviewId = elementor.config.current_revision_id;
      },
      getRevisionViewData: function getRevisionViewData(revisionView) {
        var self = this;
        this.jqueryXhr = elementor.history.revisions.getRevisionDataAsync(revisionView.model.get('id'), {
          success: function success(data) {
            elementor.history.revisions.setEditorData(data);
            self.setRevisionsButtonsActive(true);
            self.jqueryXhr = null;
            revisionView.$el.removeClass('elementor-revision-item-loading');
            self.enterReviewMode();
          },
          error: function error() {
            revisionView.$el.removeClass('elementor-revision-item-loading');

            if ('abort' === self.jqueryXhr.statusText) {
              return;
            }

            self.currentPreviewItem = null;
            self.currentPreviewId = null;
            alert('An error occurred');
          }
        });
      },
      setRevisionsButtonsActive: function setRevisionsButtonsActive(active) {
        this.ui.apply.add(this.ui.discard).prop('disabled', !active);
      },
      deleteRevision: function deleteRevision(revisionView) {
        var self = this;
        revisionView.$el.addClass('elementor-revision-item-loading');
        elementor.history.revisions.deleteRevision(revisionView.model, {
          success: function success() {
            if (revisionView.model.get('id') === self.currentPreviewId) {
              self.onDiscardClick();
            }

            self.currentPreviewId = null;
          },
          error: function error(data) {
            revisionView.$el.removeClass('elementor-revision-item-loading');
            alert('An error occurred');
          }
        });
      },
      enterReviewMode: function enterReviewMode() {
        elementor.changeEditMode('review');
      },
      exitReviewMode: function exitReviewMode() {
        elementor.changeEditMode('edit');
      },
      navigate: function navigate(reverse) {
        var currentPreviewItemIndex = this.collection.indexOf(this.currentPreviewItem.model),
            requiredIndex = reverse ? currentPreviewItemIndex - 1 : currentPreviewItemIndex + 1;

        if (requiredIndex < 0) {
          requiredIndex = this.collection.length - 1;
        }

        if (requiredIndex >= this.collection.length) {
          requiredIndex = 0;
        }

        this.children.findByIndex(requiredIndex).ui.detailsArea.trigger('click');
      },
      onEditorSaved: function onEditorSaved() {
        this.exitReviewMode();
        this.setRevisionsButtonsActive(false);
        this.currentPreviewId = elementor.config.current_revision_id;
      },
      onApplyClick: function onApplyClick() {
        elementor.saver.setFlagEditorChange(true);
        elementor.saver.saveAutoSave();
        this.isRevisionApplied = true;
        this.currentPreviewId = null;
      },
      onDiscardClick: function onDiscardClick() {
        elementor.history.revisions.setEditorData(elementor.config.data);
        elementor.saver.setFlagEditorChange(this.isRevisionApplied);
        this.isRevisionApplied = false;
        this.setRevisionsButtonsActive(false);
        this.currentPreviewId = null;
        this.exitReviewMode();

        if (this.currentPreviewItem) {
          this.currentPreviewItem.$el.removeClass('elementor-revision-current-preview');
        }
      },
      onDestroy: function onDestroy() {
        if (this.currentPreviewId && this.currentPreviewId !== elementor.config.current_revision_id) {
          this.onDiscardClick();
        }
      },
      onRenderCollection: function onRenderCollection() {
        if (!this.currentPreviewId) {
          return;
        }

        var currentPreviewModel = this.collection.findWhere({
          id: this.currentPreviewId
        }); // Ensure the model is exist and not deleted during a save.

        if (currentPreviewModel) {
          this.currentPreviewItem = this.children.findByModelCid(currentPreviewModel.cid);
          this.currentPreviewItem.$el.addClass('elementor-revision-current-preview');
        }
      },
      onChildviewDetailsAreaClick: function onChildviewDetailsAreaClick(childView) {
        var self = this,
            revisionID = childView.model.get('id');

        if (revisionID === self.currentPreviewId) {
          return;
        }

        if (this.jqueryXhr) {
          this.jqueryXhr.abort();
        }

        if (self.currentPreviewItem) {
          self.currentPreviewItem.$el.removeClass('elementor-revision-current-preview');
        }

        childView.$el.addClass('elementor-revision-current-preview elementor-revision-item-loading');

        if (elementor.saver.isEditorChanged() && null === self.currentPreviewId) {
          elementor.saver.saveEditor({
            status: 'autosave',
            onSuccess: function onSuccess() {
              self.getRevisionViewData(childView);
            }
          });
        } else {
          self.getRevisionViewData(childView);
        }

        self.currentPreviewItem = childView;
        self.currentPreviewId = revisionID;
      },
      onChildviewDeleteClick: function onChildviewDeleteClick(childView) {
        var self = this,
            type = childView.model.get('type'),
            id = childView.model.get('id');
        var removeDialog = elementor.dialogsManager.createWidget('confirm', {
          message: elementor.translate('dialog_confirm_delete', [type]),
          headerMessage: elementor.translate('delete_element', [type]),
          strings: {
            confirm: elementor.translate('delete'),
            cancel: elementor.translate('cancel')
          },
          defaultOption: 'confirm',
          onConfirm: function onConfirm() {
            self.deleteRevision(childView);
          }
        });
        removeDialog.show();
      }
    });
  }, {
    "./view": 141
  }],
  141: [function (require, module, exports) {
    module.exports = Marionette.ItemView.extend({
      template: '#tmpl-elementor-panel-revisions-revision-item',
      className: 'elementor-revision-item',
      ui: {
        detailsArea: '.elementor-revision-item__details',
        deleteButton: '.elementor-revision-item__tools-delete'
      },
      triggers: {
        'click @ui.detailsArea': 'detailsArea:click',
        'click @ui.deleteButton': 'delete:click'
      }
    });
  }, {}]
}, {}, [110, 111, 61]);