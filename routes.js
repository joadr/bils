Router.route('/admin/export/news/:filename', function () {
  var row = ExportNews.findOne(this.params.filename);
  ExportNews.remove(this.params.filename);
  // this.response.end(doc.fileType+'\n');
  var doc = new PDFDocument({size: 'A4', margin: 50});
  doc.fontSize(12);
  doc.text('Hola mundo', 10, 30, {align: 'center', width: 200});
  http.get('http://whizzy.azurewebsites.net/files/whizzy-logo-text.png').on('response', function(res){
      res.setEncoding('binary');
      res.on('data', function(chunk){
         buffer += chunk;
      });
      res.on('end', function(){
        doc.image(buffer, 0, 15, { width: 300 }).text('Proprotional to width', 0, 0);
       //After file is download and was write into the HD will use it

     }).end(); //EO Downloading the file
  });


  // doc.image('http://whizzy.azurewebsites.net/files/whizzy-logo-text.png', 0, 15, { width: 300 }).text('Proprotional to width', 0, 0);

  this.response.writeHead(200, {
    'Content-type': 'application/pdf',
    'Content-Disposition': "attachment; filename=test.pdf"
  });
  this.response.end( doc.outputSync() );
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
