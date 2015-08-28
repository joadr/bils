<<<<<<< HEAD
=======
Router.route('/admin/export/news/:filename', function () {
  var doc = ExportNews.findOne(this.params.filename);
  return doc.fileType;
  //this.response.end(this.params.filename+'\n');
}, {name: 'news.export.file', where: 'server'});

>>>>>>> b3a047091f4731572dbaa3e2f3390e40903a9ea4
Router.route('/admin/export/news',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'news.export'
});

Router.route('/admin/import/news',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'news.import'
});
