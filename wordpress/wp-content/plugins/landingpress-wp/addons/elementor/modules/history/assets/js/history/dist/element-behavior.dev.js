"use strict";

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