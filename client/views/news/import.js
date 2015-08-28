var parseNexNews = function(data) {
  return data.NexNews.Noticia.map(function(item) {
    console.log(item);
    var article = {};
    article.title = item.titulo['#text'];
    article.journalist = item.autor['#text'];
    article.subtitle = item.bajada['#text'];
    article.body = item.cuerpo['#text'];

    var mediumName = item.medio['#text'];

    return article;
  });
}

Template.newsImport.onCreated(function() {
  this.subscribe('demographics');
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
