FileWatch.listen('/Users/nicolaslopezj/xmls/agure', 'iso-8859-1', function(contents) {
  var data = xml2js.parseStringSync(contents);

  var news = data.imentenoticias.articulo.map(function(item) {
    var article = {};

    article.agureId = item['$'].id;
    article.url = item.url && item.url[0];
    article.title = item.titular_texto && item.titular_texto[0];
    article.body = item.indexacion && item.indexacion[0];

    if (item.fuente_seccion) {
      var suplementName = item.fuente_seccion[0];
      var suplement = Suplements.findOne({ name: suplementName });
      if (suplement) {
        article.suplementId = suplement._id;
        article.mediumId = suplement.mediumId;
      }
    }


    if (item.dia && item.mes && item['año']) {
      article.date = moment().day(item.dia[0]).month(item.mes[0]).year(item['año'][0]).toDate();
    }

    return article;
  });

  _.each(news, function(article) {
    News.upsert({ agureId: article.agureId }, { $set: article });
  });

  return false;
});
