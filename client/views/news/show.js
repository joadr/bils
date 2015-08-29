Template.collectionsNewsShow.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('news.article', Router.current().params._id);
  })
});

Template.collectionsNewsShow.helpers({
  article: function() {
    return News.findOne(Router.current().params._id);
  },
  medium: function() {
    var article = News.findOne(Router.current().params._id);
    return Mediums.findOne({ _id: article.mediumId });
  },
  sumplement: function() {
    var article = News.findOne(Router.current().params._id);
    return Suplements.findOne({ _id: article.suplementId });
  }
});
