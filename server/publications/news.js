Meteor.publish('news.article', function(articleId) {
  check(articleId, String);
  var article = News.findOne({ _id: articleId });
  return [News.find({ _id: article._id }), Mediums.find({ _id: article.mediumId }), Suplements.find({ _id: article.suplementId })];
});

Meteor.methods({
  countForSearch: function(search) {
    var filter = filterForSearchObject(search, this.userId);
    return News.find(filter).count();
  }
});

Meteor.publish(null, function () {
  return SuplementsTypes.find();
});

Meteor.publishComposite('news.search', function(search, limit) {
  check(limit, Match.Optional(Number));
  var filter = filterForSearchObject(search, this.userId);
  limit = limit || 20;
  return {
    find: function() {
      return News.find(filter, { limit: limit, fields: { title: 1, groupsIds: 1, brandsIds: 1, date: 1, categorizedBy: 1, prevAprove: 1, media: 1, mediumId: 1 }, sort: { date: -1 } });
    },
    children: [{
      find: function(article) {
        var ids = article.groupsIds || [];
        return Groups.find({ _id: { $in: ids } }, { fields: { name: 1 } });
      }
    },
    {
      find: function(article) {
        var ids = article.mediumId;
        return Mediums.find({ _id: ids }, { fields: { name: 1 } });
      }
    },  
    {
      find: function(article) {
        var ids = article.brandsIds || [];
        return Brands.find({ _id: { $in: ids } }, { fields: { name: 1 } });
      }
    }]
  }
});
