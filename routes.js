function getName(collection, id){
  return this[collection].findOne(id).name;
}


Router.route('/admin/export/news/:exportable', function () {
  var row = ExportNews.findOne(this.params.exportable);
  exportable = row;
  var news = News.find({groupId: {$in: exportable.groupsIds }, brandId: {$in: exportable.brandsIds} }).fetch();

  if(exportable.fileType == 'pdf'){
    var doc = new PDFDocument({size: 'A4', margin: 50});
    doc.fontSize(12);

    news.forEach(function(element, index, array){
      // we add a page per news
      if(index != 0){
        doc.addPage();
      }

      // Logo is inserted on every page
      var result = request.getSync('http://whizzy.azurewebsites.net/files/whizzy-logo-text.png', {
          encoding: null
      });
      var buffer = result.body;

      doc.image(buffer, 400, 10, { width: 100 });

      // we put the news photo
      var result = request.getSync(element.media[0].url, {
        encoding: null
      });
      var buffer = result.body;

      doc.image(buffer, 10, 60, { width: 580, height: 580 });


      // the news data
      doc.text("TITULO: " + element.title, 10, 650);
      doc.text("SUPLEMENTO: " + getName('Suplements', element.suplementId));
      //doc.text("SUPLEMENTO: " + element.suplementId);
      doc.text("FECHA: " + moment(element.date).format('LL'));
      doc.text("CENTIMETRAJE: " + element.size);
      doc.text("VALOR APROX: " + element.title);
    });

    this.response.writeHead(200, {
      'Content-type': 'application/pdf',
      'Content-Disposition': "attachment; filename=exportable.pdf"
    });
    this.response.end( doc.outputSync() );

  } else if (exportable.fileType == 'excel') {
    var fields = [
      { key: '_id', title: 'ID' },
      {
        key: 'createdBy',
        title: 'Usuario',
        transform: function(createdBy) {
          return Meteor.users.findOne(createdBy).profile.name;
        }
      },
      {
        key: 'mediumId',
        title: 'Medio',
        transform: function(id) {
          return Mediums.findOne(id).name;
        }
      },
      {
        key: 'suplementId',
        title: 'Suplemento',
        transform: function(id) {
          return Suplements.findOne(id).name;
        }
      },
      { key: 'section', title: 'Sección' },
      // { key: 'size', title: 'Tamaño' },
      { key: 'colorType', title: 'Color' },
      {
        key: 'groupId',
        title: 'Grupo',
        transform: function(id) {
          return Groups.findOne(id).name;
        }
      },
      //{ key: 'size', title: 'Producto' },
      // { key: 'size', title: 'Campaña' },
      { key: 'sentiment', title: 'Sentimiento' },
      { key: 'relevance', title: 'Relevancia' },
      { key: 'typeOfNote', title: 'Tipo de nota' },
      { key: 'opinion', title: 'Opinion' },
      { key: 'topic', title: 'Tema' },
      { key: 'size', title: 'Centimetraje' },
      { key: 'page', title: 'Páginas' },
      { key: 'title', title: 'Título' },
      { key: 'body', title: 'Cuerpo' },
      { key: 'date', title: 'Fecha' },
      { key: 'duration', title: 'Duración' },
      { key: 'journalist', title: 'Periodista' },
      // { key: 'agency', title: 'Agencia' },
      { key: 'mentionsTheBrandInTheTitle', title: 'Mención Título' },
      { key: 'mentionsTheBrandInTheBody', title: 'Mención Cuerpo' },
      // { key: 'size', title: 'Foto' },
      { key: 'secretMessage0Exists', title: 'Clave' },
      { key: 'secretMessage1Exists', title: 'Clave 1' },
      { key: 'secretMessage2Exists', title: 'Clave 2' },
      { key: 'secretMessage3Exists', title: 'Clave 3' },
      { key: 'secretMessage4Exists', title: 'Clave 4' },
      { key: 'secretMessage5Exists', title: 'Clave 5' },
      // { key: 'spokesmans[0]', title: 'Vocero' },
      {
        key: 'suplementId',
        title: 'Suplemento',
        transform: function(id) {
          return Suplements.findOne(id).name;
        }
      },
      { key: 'url', title: 'Link' }
    ];

    var title = "exportableExcel";
    file = exportToExcel(title, fields, news);
    var headers = {
      'Content-type': 'application/vnd.openxmlformats',
      'Content-Disposition': 'attachment; filename=' + title + '.xlsx'
    };

    this.response.writeHead(200, headers);
    this.response.end(file, 'binary');

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
