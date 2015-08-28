ExportNewsSchema = new SimpleSchema({
  groupId: orion.attribute('hasOne', {
    label: 'Grupo'
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'export_news_groupId_schema',
  }),
  brandId: orion.attribute('hasOne', {
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
        var groupId = AutoForm.getFieldValue('groupId');
        return groupId ? { groupId: groupId } : {};
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
