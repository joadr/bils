// Router.route('/admin/export/news/:filename', function () {
//   var doc = ExportNewsSchema.findOne(this.params.filename);
//   return doc.fileType;
//   //this.response.end(this.params.filename+'\n');
// }, {where: 'server'});

Router.route('/admin/export/news',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'news.export'
});

Router.route('/admin/import/news',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'news.import'
});
