FileWatch.listen('/Users/nicolaslopezj/xmls/nex', 'utf8', function(contents) {
  var data = xml2js.parseStringSync(contents);
  var news = data.NexNews.Noticia.map(function(item) {
    var article = {};

    article.idx = item.titulo && item.idx[0];
    article.title = item.titulo && item.titulo[0];
    article.journalist = item.autor && item.autor[0];
    article.title = item.titulo && item.titulo[0];
    article.subtitle = item.bajada && item.bajada[0];
    article.body = item.cuerpo && item.cuerpo[0];

    if (item.medio) {
      var suplementName = item.medio[0];
      var suplement = Suplements.findOne({ name: suplementName });
      if (suplement) {
        article.suplementId = suplement._id;
        article.mediumId = suplement.mediumId;
      }
    }

    if (item.multimedia) {
      var items = item.multimedia[0].split('|').map(function(item) {
        return {
          url: item,
          fileId: 'none'
        };
      });
      article.media = items;
    }

    article.date = item.nefecha && moment(item.nefecha[0]).toDate();

    return article;
  });

  _.each(news, function(article) {
    if (News.find({ idx: article.idx }).count() != 0) return;
    News.insert(article);
  });

  return true;
});
