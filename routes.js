Router.route('/files/:filename', function () {
  this.response.end('hi from the server\n');
}, {where: 'server'});

Router.route('/admin/export/news',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'news.export'
});

Router.route('/admin/import/news',  {
  layoutTemplate: 'orionBootstrapLayout',
  name: 'news.import'
});
