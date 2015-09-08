Template.dashboard.onCreated(function() {
  this.subscribe('dashboard');
});

Template.dashboard.helpers({
  users: function() {
    var agency = Agencies.findOne({ adminsIds: Meteor.userId() });
    return Meteor.users.find({ _id: { $in: agency.executivesIds } });
  },
  brandsCount: function() {
    return Brands.find().count();
  },
  newsCount: function() {
    return News.find().count();
  },
  newsToCategorize: function() {
    return News.find().count() - NewsData.find().count();
  },
  newspercentcategorize: function() {
    return (Math.round(NewsData.find().count())/News.find().count())*100;
  },
  userBrands: function() {
    var user = this;
    return Brands.find({ executivesIds: user._id }).fetch();
  },
  userToCategorize: function() {
    var user = this;
    var brandsIds = _.pluck(Brands.find({ executivesIds: user._id }).fetch(), '_id');
    var newsIds = brandsIds && _.pluck(News.find({ brandsIds: { $in: brandsIds } }).fetch(), '_id');
    var categorizedCount = (newsIds && NewsData.find({ articleId: { $in: newsIds } }).count()) || 0;
    return newsIds.length - categorizedCount;
  },
  userCategorized: function() {
    var user = this;
    var brandsIds = _.pluck(Brands.find({ executivesIds: user._id }).fetch(), '_id');
    var newsIds = brandsIds && _.pluck(News.find({ brandsIds: { $in: brandsIds } }).fetch(), '_id');
    var categorizedCount = (newsIds && NewsData.find({ articleId: { $in: newsIds } }).count()) || 0;
    return categorizedCount;
  },
  userCategorizedPercentage: function() {
    var user = this;
    var brandsIds = _.pluck(Brands.find({ executivesIds: user._id }).fetch(), '_id');
    var newsIds = brandsIds && _.pluck(News.find({ brandsIds: { $in: brandsIds } }).fetch(), '_id');
    var categorizedCount = (newsIds && NewsData.find({ articleId: { $in: newsIds } }).count()) || 0;
    return newsIds ? (Math.round(categorizedCount / newsIds.length) * 100) + '%' : '0%';
  }
})
