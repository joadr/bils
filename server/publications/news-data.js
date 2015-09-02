Meteor.publish('newsData.forUser', function(articleId) {
  check(articleId, String);
  var agency = Agencies.findOne({ $or: [ { adminsIds: this.userId }, { executivesIds: this.userId } ] });

  if (!agency) {
    return [];
  }

  if (NewsData.find({ articleId: articleId, agencyId: agency._id }).count() == 0) {
    console.log('creating news data');
    NewsData.insert({ articleId: articleId, agencyId: agency._id });
  }

  return [NewsData.find({ articleId: articleId, agencyId: agency._id }), SuplementsTypes.find()];
});
