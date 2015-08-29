Meteor.publish('news.article', function(articleId) {
  check(articleId, String);
  var article = News.findOne({ _id: articleId });
  return [News.find({ _id: article._id }), Mediums.find({ _id: article.mediumId }), Suplements.find({ _id: article.suplementId })];
});
