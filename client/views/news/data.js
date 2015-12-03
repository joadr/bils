Template.collectionsNewsData.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var articleId = Router.current().params._id;
    self.subscribe('newsData.forUser', articleId);
    self.subscribe('newsBrands.forUser', articleId);
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
   newsDataMedium: function() {
    var articleId = Router.current().params._id;
    var userId = Meteor.userId();
    var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    var newsData = NewsData.findOne({ articleId: articleId });
    return newsData.data.medio;
  },
   newsDataType: function() {
    var articleId = Router.current().params._id;
    var userId = Meteor.userId();
    var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    var newsData = NewsData.findOne({ articleId: articleId });
    return newsData.data.tiponot;
  },
    newsBrands: function() {
    var articleId = Router.current().params._id;
    var userId = Meteor.userId();
    var agency = Agencies.findOne({ $or: [ { adminsIds: userId }, { executivesIds: userId } ] });
    // var newsBrands = NewsBrands.findOne({ articleId: articleId, agencyId: agency._id });
    var newsBrands = NewsBrands.findOne({ articleId: articleId, agencyId: agency._id });

    return newsBrands;
  },

  getNewsBrandsSchema:function(){
    var articleId = Router.current().params._id;
    var news = News.findOne({_id:articleId});
    var brands = Brands.find({ _id: { $in: news.brandsIds }}).fetch();

    // var brand = Brands.findOne({ _id: { $in: news.brandsIds }});


    var attributes = {};

    _.each(brands,function(brand){

      attributes[brand.name] = { 
        type: new SimpleSchema({
          feeling: {
            type: String,
            label: "Sentimiento",
            optional: true,
            allowedValues: ['negative', 'neutral', 'positive'],
            autoform: {
              options: {
                negative: "Negativo",
                neutral: "Neutro",
                positive: "Positivo"
              }
            }
          }, 
          relevance:{
            type: String,
            label: 'Relevancia',
            optional: true,
            allowedValues: ['main', 'shared', 'referential','comparative'],
            autoform: {
              options: {
                main: "Principal",
                shared: "Compartida",
                referential: "Referencial",
                comparative: "Comparativo"
              }
            }
          },
          brandInTitle:{
            type:Boolean,
            optional: true,
            label: "Mencion Marca en Titulo"
          },
          brandInBody:{
            type:Boolean,
            optional: true,
            label: "Mencion Marca en Cuerpo"
          },
          shownInPicture:{
            type:Boolean,
            optional: true,
            label: "Aparicion Visual"
          },
          keyMessage:{
            type:Boolean,
            optional: true,
            label: "Mensaje Clave"
          },
          agencyManagement:{
            type:Boolean,
            optional: true,
            label: "Gestion de Agencia"
          },
          campaign:{
            type: String,
            optional: true,
            label: 'Campaña',
            allowedValues: function() {
              return _.pluck(Campaigns.find().fetch(), '_id');
            },
            autoform: {
              options: function() {
                return Campaigns  .find().map(function(type) {
                  return {
                    value: type._id,
                    label: type.name
                  }
                });
              }
            }
          },
        }),
        label: brand.name,
        // label:'test',
        optional: true,
      }

    });

    // var schema = new SimpleSchema(attributes);

    var schema = new SimpleSchema(attributes);
    var parentAttributes = _.clone(NewsBrandsSchemaAttributes);
    parentAttributes.data = {
      type: schema,
      label: 'Marcas',
      optional:true,
    }

    return new SimpleSchema(parentAttributes);

    // return schema;

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
  },
   'click .save-brands-btn': function(event, template) {
    $('#collectionsNewsBrandsForm').submit();
  }
});

AutoForm.addHooks('collectionsNewsDataForm', {
  onSuccess: function() {
    Router.go('collections.news.index');
  }
});

AutoForm.addHooks('collectionsNewsBrandsForm', {
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
