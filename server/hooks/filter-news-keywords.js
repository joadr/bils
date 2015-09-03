var filterArticle = function(article) {
  var brands = [];
  var groups = [];
  Brands.find({}).forEach(function(brand) {
    var matches = false;
    _.each(brand.keywords, function(keyword) {
      if (!keyword) return;
      if ((new RegExp('\\b' + keyword + '\\b', 'gi')).test(article.title)) matches = true;
      if ((new RegExp('\\b' + keyword + '\\b', 'gi')).test(article.subtitle)) matches = true;
      if ((new RegExp('\\b' + keyword + '\\b', 'gi')).test(article.body)) matches = true;
    });

    if (matches) {
      brands.push(brand._id);
      groups.push(brand.groupId);
    }
  });

  News.update({ _id: article._id }, { $set: { brandsIds: brands, groupsIds: groups } });
}

var filterNewsForBrand = function(brand) {
  News.update({ brandsIds: brand._id }, { $pull: { brandsIds: brand._id, groupsIds: brand.groupId } }, { multi: true });

  var newsIds = [];
  _.each(brand.keywords, function(keyword) {
    if (!keyword) return;
    newsIds = _.union(newsIds, _.pluck(News.find({
      $or: [
        { title: { $regex: '\\b' + keyword + '\\b', $options: 'gi' } },
        { subtitle: { $regex: '\\b' + keyword + '\\b', $options: 'gi' } },
        { body: { $regex: '\\b' + keyword + '\\b', $options: 'gi' } }
      ]
    }).fetch(), '_id'));
  });

  News.update({ _id: { $in: newsIds } }, { $addToSet: { brandsIds: brand._id, groupsIds: brand.groupId } }, { multi: true });
}

News.after.insert(function(userId, doc) {
  filterArticle(doc);
});

News.after.update(function (userId, doc, fieldNames, modifier, options) {
  if (!_.isEqual(this.previous.title, doc.title) || !_.isEqual(this.previous.subtitle, doc.subtitle) || !_.isEqual(this.previous.body, doc.body)) {
    filterArticle(doc);
  }
});

Brands.after.insert(function(userId, doc) {
  if (doc.keywords) {
    filterNewsForBrand(doc);
  }
});

Brands.after.update(function (userId, doc, fieldNames, modifier, options) {
  if (!_.isEqual(this.previous.keywords, doc.keywords)) {
    filterNewsForBrand(doc);
  }
});
