"use strict";

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