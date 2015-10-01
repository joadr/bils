if (Meteor.settings.agurePath) {
  FileWatch.listen(Meteor.settings.agurePath, 'iso-8859-1', function(contents) {
    console.log('Importing agure file...');
    var data = xml2js.parseStringSync(contents);
    if (!data) {
      console.log('Error parsing xml - Format error');
      return;
    }

    var news = data.imentenoticias.articulo.map(function(item) {
      var article = {};

      article.agureId = item['$'].id;
      article.url = item.url && item.url[0];
      article.title = item.titular_texto && item.titular_texto[0];
      article.body = item.indexacion && item.indexacion[0];

      if (item.dia && item.mes && item['año']) {
        var fecha = item['año'] + '-' + item.mes + '-' + item.dia;
        article.date = moment(fecha).toDate();
        //article.date = moment().day(item.dia[0]).month(item.mes[0]).year(item['año'][0]).toDate();
      }

      return article;
    });

    _.each(news, function(article) {
      News.upsert({ agureId: article.agureId }, { $set: article });
    });

    console.log('agure file imported');
    return true;
  });
}
