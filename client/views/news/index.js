ReactiveTemplates.set('collections.news.index', 'collectionsNewsIndex');
var formDep = new Tracker.Dependency();

Template.collectionsNewsIndex.onCreated(function() {
  var self = this;
  Session.set('collectionsNewsIndexLimit', 20);

  self.autorun(function() {
    formDep.depend();
    var data = AutoForm.getFormValues('collectionsNewsIndexSearchForm');
    Session.set('collectionsNewsIndexValues', data && data.insertDoc);
  })

  self.autorun(function() {
    var limit = Session.get('collectionsNewsIndexLimit');
    var values = Session.get('collectionsNewsIndexValues');
    self.subscribe('news.search', values, limit);
    Meteor.call('countForSearch', values, function(error, response) {
      if (!error) {
        Session.set('collectionsNewsIndexCount', response);
      }
    });
  })
});

Template.collectionsNewsIndex.helpers({
  news: function() {
    var values = Session.get('collectionsNewsIndexValues');
    return News.find(filterForSearchObject(values));
  },
  localCount: function() {
    var values = Session.get('collectionsNewsIndexValues');
    return News.find(filterForSearchObject(values)).count();
  },
  totalCount: function() {
    return Session.get('collectionsNewsIndexCount');
  },
  canLoadMore: function() {
    var values = Session.get('collectionsNewsIndexValues');
    var localCount = News.find(filterForSearchObject(values)).count();
    return Session.get('collectionsNewsIndexCount') != localCount;
  }
})

Template.collectionsNewsIndex.events({
  'change select': function(event, template) {
    formDep.changed();
  },
  'blur input': function(event, template) {
    formDep.changed();
  },
  'click .load-more-btn': function(event, template) {
    Session.set('collectionsNewsIndexLimit', Session.get('collectionsNewsIndexLimit') + 20);
  }
});
