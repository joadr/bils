var parseNexNews = function(data) {
  return data.NexNews.Noticia.map(function(item) {
    console.log(item);
    var article = {};
    article.title = item.titulo['#text'];
    article.journalist = item.autor && item.autor['#text'];
    article.subtitle = item.bajada && item.bajada['#text'];
    article.body = item.cuerpo && item.cuerpo['#text'];

    if (item.medio) {
      var suplementName = item.medio['#text'];
      var suplement = Suplements.findOne({ name: suplementName });
      if (suplement) {
        article.suplementId = suplement._id;
        article.mediumId = suplement.mediumId;
      }
    }

    if (item.multimedia) {
      var items = item.multimedia['#text'].split('|').map(function(item) {
        return {
          url: item
        };
      });
      article.media = items;
    }

    article.date = item.nefecha && moment(item.nefecha['#text']).toDate();

    return article;
  });
}

Template.newsImport.onCreated(function() {
  this.subscribe('demographics');
  this.subscribe('mediums');
});

Template.newsImport.events({
  'change input': function(event, template) {
    var files = event.currentTarget.files;
    if (files.length != 1) return;

    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      var xml = parseXml(contents);
      var data = xmlToJson(xml);

      console.log(parseNexNews(data));
    }
    reader.readAsText(files[0]);
  }
});
