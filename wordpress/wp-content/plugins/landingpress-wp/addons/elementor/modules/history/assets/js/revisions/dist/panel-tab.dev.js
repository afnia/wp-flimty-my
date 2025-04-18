"use strict";

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