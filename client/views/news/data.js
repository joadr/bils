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
  newsDoc: function(){
    var articleId = Router.current().params._id;
    return News.findOne({_id:articleId});
  },
  newsData: function() {
    var articleId = Router.current().params._id;
    var userId = Meteor.userId();
    var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    var newsData = NewsData.findOne({ articleId: articleId });
    return newsData;
  },
  getNewsSchema:function(){

    NewsEditSchema = new SimpleSchema({
      title: {
        type: String,
        label: "Titulo",
      },
      subtitle: {
        type: String,
        label: "Bajada",
      },
      body: {
        type: String,
        label: "Cuerpo",
        autoform: {
          type: 'textarea'
        }
      },

      date: {
        type: Date,
        label: 'Fecha',
        autoform: {
          type: 'bootstrap-datetimepicker'
        }
      },
      url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
      },

      mediumId: orion.attribute('hasOne', {
        label: 'Medio',
        optional: true
      }, {
        collection: Mediums,
        titleField: 'name',
        publicationName: 'news_mediumId_schema',
      }),



    });

    return NewsEditSchema;

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
      } else if (attribute.type == 'list') {
        attributes[attribute.key].type = String;

        var articleId = Router.current().params._id;
        var userId = Meteor.userId();
        var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
        var newsData = agency && NewsData.findOne({ articleId: articleId, agencyId: agency._id });

        var options = [];
        attribute.list.forEach(function(element, index, array){
          if(newsData[attribute.key] == element){
            options.push({label: element, value: element, selected: true})
          } else {
            options.push({label: element, value: element})
          }

        });
        attributes[attribute.key].autoform = {
          type: 'select',
          trueLabel: 'Si',
          falseLabel: 'No',
          options: options
        }
        //console.log(options);
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
  },
  'click .save-news-btn': function(event, template) {
    $('#collectionsNewsForm').submit();
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
