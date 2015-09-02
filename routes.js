function getName(collection, id){
  var doc = this[collection].findOne(id);
  return doc && doc.name;
}


Router.route('/admin/export/news/:exportable', function () {
  var row = ExportNews.findOne(this.params.exportable);
  exportable = row;
  var news = News.find({groupId: {$in: exportable.groupsIds }, brandId: {$in: exportable.brandsIds} }).fetch();

  if(exportable.fileType == 'pdf'){
    var doc = new PDFDocument({size: [961, 539], layout: 'portrait'/*, margin: 50*/});
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

      doc.image(buffer, 10, 10, { width: 200 });

      // we put the news photo
      var result = request.getSync(element.media[0].url, {
        encoding: null
      });
      var buffer = result.body;

      doc.image(buffer, 350, 40, { width: 580, height: 580 });


      // the news data
      data = [
        { title: 'TITULO', data: element.title },
        { title: 'MEDIO', data: getName('Mediums', element.mediumId) },
        // { title: 'SUPLEMENTO', data: element.title },
        { title: 'FECHA', data: moment(element.date).format('LL') },
        { title: 'CENTIMETRAJE', data: element.size },
        { title: 'Ad Value', data: 'Test' },
      ];
      options = {
        columns: [
          { id: 'title', width: 35, name: '' },
          { id: 'data', width: 65, name: '' }
        ],
        margins: {
          left: 20,
          top: 40,
          right: 20,
          bottom: 0
        },
        padding: {
          left: 10,
          top: 10,
          right: 10,
          bottom: 10
        }
      };

      //doc.table(data, options)


      doc.text("TITULO: " + element.title, 10, 350);
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
          var user = Meteor.users.findOne(createdBy);
          return user && user.profile.name;
        }
      },
      {
        key: 'mediumId',
        title: 'Medio',
        transform: function(id) {
          var medium = Mediums.findOne(id);
          return medium && medium.name;
        }
      },
      {
        key: 'suplementId',
        title: 'Suplemento',
        transform: function(id) {
          var suplement = Suplements.findOne(id);
          return suplement && suplement.name;
        }
      },
      { key: 'section', title: 'Sección' },
      // { key: 'size', title: 'Tamaño' },
      { key: 'colorType', title: 'Color' },
      {
        key: 'groupId',
        title: 'Grupo',
        transform: function(id) {
          var group = Groups.findOne(id);
          return group && group.name;
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
          var suplement = Suplements.findOne(id);
          return suplement && suplement.name;
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

  } else if(exportable.fileType == 'pptx'){
    var pptx = officegen ( 'pptx' );

    var title = "exportablePPTX";
    var headers = {
      'Content-type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': 'attachment; filename=' + title + '.pptx'
    };
    news.forEach(function(element, index, array){
      // we create a slide per each news
      slide = pptx.makeNewSlide();

      // we add the company's logo on each slide
      var result = request.getSync('http://whizzy.azurewebsites.net/files/whizzy-logo-text.png', {
          encoding: null
      });
      var buffer = result.body;
      slide.addImage ( buffer, {x: 25, y: 25} );

      // we add the new image



    });

    this.response.writeHead(200, headers);
    pptx.generate(this.response);

  }
}, {name: 'news.export.file', where: 'server'});

Router.route('/', function() {
  this.router.go(Options.get('adminHomeRoute'), {}, { replaceState: true });
});

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
