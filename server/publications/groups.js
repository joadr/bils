Meteor.publish(null, function() {
  var agenciesIds = _.pluck(Agencies.find({ $or: [{ adminsIds: this.userId }, { executivesIds: this.userId }] }).fetch(), '_id');
  return Groups.find({ agencyId: { $in: agenciesIds } });
})
