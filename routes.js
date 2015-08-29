Router.route('/admin/export/news/:filename', function () {
  var doc = ExportNews.findOne(this.params.filename);
  return doc.fileType;
  //this.response.end(this.params.filename+'\n');
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
