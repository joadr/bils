Template.newsExport.events({
  'click .create-btn': function () {
    $('#newsExportForm').submit();
  }
});

AutoForm.addHooks('newsExport', {
  onSuccess: function() {
    console.log(this.collection);
    //Router.go('');
    //RouterLayer.go(this.collection.indexPath());
  }
});
