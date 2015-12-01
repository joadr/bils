Meteor.settings.nexPath = "/Users/cristianojeda/Desktop/xmls/nex"

if (Meteor.settings.nexPath) {
  FileWatch.listen(Meteor.settings.nexPath, 'utf8', function(contents) {
    console.log('Importing nex file...');
    var data = xml2js.parseStringSync(contents);
    if (!data) {
      console.log('Error parsing xml - Format error');
      return;
    }

    var news = data.NexNews.Noticia.map(function(item) {
      var article = {};

      if (!item.idx) return;

      article.idx = item.idx[0];
      article.title = item.titulo && item.titulo[0];
      article.subtitle = item.bajada && item.bajada[0];
      article.body = item.cuerpo && item.cuerpo[0];

      // console.log(item)

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
      News.upsert({ idx: article.idx }, { $set: article });
    });

    var newsData = data.NexNews.Noticia.map(function(item) {
      var article = {};

      if (!item.idx) return;

      // console.log(News.findOne({'idx':item.idx[0]}));

      article.articleId = News.findOne({'idx':item.idx[0]})._id;

      if(item.typeId) article.typeId = item.typeId && item.typeId[0];

      article.data = {};

      if(item.pag){
        article.data.page =  item.pag && item.pag[0];
      } 
      
      return article;
    });

    _.each(newsData, function(article) {
      NewsData.upsert({ articleId: article.articleId }, { $set: article });
    });

    console.log('nex file imported');
    return true;
  });
}