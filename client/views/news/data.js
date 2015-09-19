Template.collectionsNewsData.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var articleId = Router.current().params._id;
    self.subscribe('newsData.forUser', articleId);
    self.subscribe('mediums', articleId);
    self.subscribe('news.article', articleId);
  });

  self.autorun(function() {
    var articleId = Router.current().params._id;
    var userId = Meteor.userId();
    var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    var newsData = agency && NewsData.findOne({ articleId: articleId, agencyId: agency._id });
    if (newsData && !Session.get('currentNewsDataType')) {
      Session.set('currentNewsDataType', newsData.typeId);
    }
  });
});

Template.collectionsNewsData.helpers({
  agency: function() {
    var userId = Meteor.userId();
    return Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
  },
  newsData: function() {
    var articleId = Router.current().params._id;
    var userId = Meteor.userId();
    var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    var newsData = agency && NewsData.findOne({ articleId: articleId, agencyId: agency._id });
    return newsData;
  },
  getSchema: function() {
    var typeId = Session.get('currentNewsDataType');
    var type = SuplementsTypes.findOne(typeId);
    if (!type || !type.attributes) return NewsDataSchema;

    var attributes = {};
    _.each(type.attributes, function(attribute) {
      attributes[attribute.key] = {};

      if (attribute.type == 'number') {
        attributes[attribute.key].type = Number;
      } else if (attribute.type == 'date') {
        attributes[attribute.key].type = Date;
        attributes[attribute.key].autoform = {
          type: 'bootstrap-datetimepicker'
        };
      } else if (attribute.type == 'file') {
        attributes[attribute.key] = orion.attribute('file');
      } else if (attribute.type == 'boolean') {
        attributes[attribute.key].type = Boolean;
        attributes[attribute.key].autoform = {
          type: 'boolean-select',
          trueLabel: 'Si',
          falseLabel: 'No'
        }
      } else {
        attributes[attribute.key].type = String;
      }

      attributes[attribute.key].label = attribute.title;
      attributes[attribute.key].optional = attribute.optional;
    });

    var schema = new SimpleSchema(attributes);
    var parentAttributes = _.clone(NewsDataSchemaAttributes);
    parentAttributes.data = {
      type: schema,
      label: 'Categorización'
    }

    return new SimpleSchema(parentAttributes);
  }
});

Template.collectionsNewsData.events({
  'change select[name="typeId"]': function(event, template) {
    Session.set('currentNewsDataType', event.currentTarget.value);
  },
  'click .save-btn': function(event, template) {
    $('#collectionsNewsDataForm').submit();
  }
});

AutoForm.addHooks('collectionsNewsDataForm', {
  onSuccess: function() {
    Router.go('collections.news.index');
  }
});

Template.noticiaACategorizar.helpers({
  article: function() {
    return News.findOne(Router.current().params._id);
  },
  medium: function() {
    var article = News.findOne(Router.current().params._id).dataForUser(Meteor.userId());
    return Mediums.findOne({ _id: article.mediumId });
  },
  suplement: function() {
    var article = News.findOne(Router.current().params._id).dataForUser(Meteor.userId());
    return Suplements.findOne({ _id: article.suplementId });
  },
  type: function() {
    var article = News.findOne(Router.current().params._id).dataForUser(Meteor.userId());
    return SuplementsTypes.findOne(article.typeId).name;
  },
  data: function() {
    return News.findOne(Router.current().params._id).dataForUser(Meteor.userId());
  }
});
