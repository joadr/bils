Router.route('/admin/export/news/:exportable', function () {
  var row = ExportNews.findOne(this.params.exportable);
  var exportable = row;
  ExportNews.remove(this.params.exportable);
  // this.response.end(doc.fileType+'\n');
  if(exportable.fileType == 'pdf'){
    var result = Meteor.call("exportPDF", exportable);

    this.response.writeHead(200, {
      'Content-type': 'application/pdf',
      'Content-Disposition': "attachment; filename=test.pdf"
    });
    this.response.end(result);
  } else if(exportable.fileType == 'xls'){
    // para excel
  } else if(exportable.fileType == 'ppt'){
    // para powerpoint
  }



}, {name: 'news.export.file', where: 'server'});

Router.route('/admin/export/news',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'news.export'
});

orion.accounts.addProtectedRoute('news.export');

Router.route('/admin/news-show/:_id',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'collections.news.show'
});

orion.accounts.addProtectedRoute('collections.news.show');
