"use strict";

var RevisionModel = require('./model');

module.exports = Backbone.Collection.extend({
  model: RevisionModel,
  comparator: function comparator(model) {
    return -model.get('timestamp');
  }
});