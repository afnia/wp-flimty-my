"use strict";

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