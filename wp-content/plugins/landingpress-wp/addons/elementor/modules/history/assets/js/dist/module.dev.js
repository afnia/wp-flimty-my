"use strict";

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