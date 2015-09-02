Template.collectionsNewsData.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var articleId = Router.current().params._id;
    self.subscribe('newsData.forUser', articleId);
  })
});

Template.collectionsNewsData.helpers({
  newsData: function() {
    var articleId = Router.current().params._id;
    var userId = Meteor.userId();
    var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    return agency && NewsData.findOne({ articleId: articleId, agencyId: agency._id });
  },
  getSchema: function() {
    var typeId = Session.get('currentNewsDataType');
    var type = SuplementsTypes.findOne(typeId);
    if (!type || !type.attributes) return NewsDataSchema;

    var attributes = {};
    _.each(type.attributes, function(attribute) {
      attributes[attribute.key] = {
        label: attribute.title
      };

      if (attribute.type == 'number') {
        attributes[attribute.key].type = Number;
      } else if (attribute.type == 'date') {
        attributes[attribute.key].type = Date;
        attributes[attribute.key].autoform = {
          type: 'bootstrap-datetimepicker'
        };
      } else if (attribute.type == 'file') {
        attributes[attribute.key] = orion.attribute('file', {
          label: attribute.title
        });
      } else if (attribute.type == 'boolean') {
        attributes[attribute.key].type = Boolean;
        attributes[attribute.key].autoform = {
          type: 'boolean-select'
        }
      } else {
        attributes[attribute.key].type = String;
      }
    });

    var schema = new SimpleSchema(attributes);
    var parentAttributes = _.clone(NewsDataSchemaAttributes);
    parentAttributes.data = {
      type: schema,
      optional: true
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
