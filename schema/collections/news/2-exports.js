ExportNews = new Mongo.Collection("exportNews");

ExportNewsSchema = new SimpleSchema({
  groupId: orion.attribute('hasMany', {
    label: 'Grupo'
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'export_news_groupId_schema',
  }),
  brandId: orion.attribute('hasMany', {
    label: 'Marca'
  }, {
    collection: Brands,
    titleField: 'name',
    additionalFields: ['groupId'],
    publicationName: 'export_news_brandId_schema',
    filter: function(userId) {
      if (Meteor.isServer) {
        return {};
      } else {
        var groupsIds = AutoForm.getFieldValue('groupId');
        return groupsIds ? { groupId: { $in: groupsIds } } : {};
      }
    }
  }),
  fromDate: {
    type: Date,
    label: 'Desde Fecha',
    autoform: {
      type: 'bootstrap-datetimepicker'
    }
  },
  toDate: {
    type: Date,
    label: 'Hasta Fecha',
    autoform: {
      type: 'bootstrap-datetimepicker'
    }
  },
  fileType: {
    type: String,
    label: 'Formato de exportable',
    allowedValues: ['excel', 'pdf', 'pptx'],
    autoform: {
      options: {
        excel: 'Excel',
        pdf: 'Pdf',
        pptx: 'Power Point'
      }
    }
  }
});

ExportNews.attachSchema(ExportNewsSchema);

ExportNews.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});
