Meteor.publish(null, function() {
  return Agencies.find({ $or: [{ adminsIds: this.userId }, { executivesIds: this.userId }] });
})
