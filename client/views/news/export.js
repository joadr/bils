Template.newsExport.events({
  'click .create-btn': function () {
    $('#newsExportForm').submit();
  }
});

AutoForm.addHooks('newsExport', {
  onSuccess: function() {
    RouterLayer.go(this.collection.indexPath());
  }
});
