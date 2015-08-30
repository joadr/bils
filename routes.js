Router.route('/admin/export/news/:exportable', function () {
  var row = ExportNews.findOne(this.params.exportable);
  exportable = row;

  var doc = new PDFDocument({size: 'A4', margin: 50});
  doc.fontSize(12);


  var news = News.find({groupId: {$in: exportable.groupsIds }, brandId: {$in: exportable.brandsIds} }).fetch();

  var a = 400;
  news.forEach(function(element, index, array){
    // Logo is inserted on every page
    var result = request.getSync('http://whizzy.azurewebsites.net/files/whizzy-logo-text.png', {
        encoding: null
    });
    var buffer = result.body;

    doc.image(buffer, 400, 10, { width: 100 });

    // we add a page per new
    if(index != 0){
      doc.addPage();
    }

    // we put the new photo
    var result = request.getSync(element.media[0].url, {
      encoding: null
    });
    var buffer = result.body;

    doc.image(buffer, 10, 60, { width: 580, height: 580 });

    // the new data
    doc.text("TITULO: "+element.title, 10, 650);
    doc.text("SUPLEMENTO: "+element.suplement);
    doc.text("FECHA: "+element.date);
    doc.text("CENTIMETRAJE: "+element.size);
    doc.text("VALOR APROX: "+element.title);
  });

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
