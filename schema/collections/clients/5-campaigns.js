Campaigns = new orion.collection('campaigns', {
  pluralName: 'Campañas',
  singularName: 'Campaña',
  title: 'Campañas',
  link: {
    title: 'Campañas',
    parent: 'clients'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
      orion.attributeColumn('hasOne', 'industryId', 'Industria'),
      orion.attributeColumn('hasOne', 'categoryId', 'Categoría'),
      orion.attributeColumn('hasOne', 'groupId', 'Grupo'),
      orion.attributeColumn('hasOne', 'brandId', 'Marca'),
      {data: 'products', title: 'productos'}
    ]
  }
});

Campaigns.attachSchema({
  name: {
    type: String,
    label: 'Nombre'
  },
  industryId: orion.attribute('hasOne', {
    label: 'Industria',
    optional: true
  }, {
    collection: Industries,
    titleField: 'name',
    publicationName: 'campaigns_industryId_schema',
  }),
  categoryId: orion.attribute('hasOne', {
    label: 'Categoría',
    optional: true
  }, {
    collection: Categories,
    titleField: 'name',
    publicationName: 'campaigns_categoryId_schema',
    additionalFields: ['industryId'],
    filter: function(userId) {
      if (Meteor.isServer) {
        return {};
      } else {
        var industryId = AutoForm.getFieldValue('industryId');
        return industryId ? { industryId: industryId } : {};
      }
    }
  }),
  groupId: orion.attribute('hasOne', {
    label: 'Grupo',
    optional: true
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'campaigns_groupId_schema',
  }),
  brandId: orion.attribute('hasOne', {
    label: 'Marca',
    optional: true
  }, {
    collection: Brands,
    titleField: 'name',
    publicationName: 'campaigns_brandId_schema',
  }),
  products: {
    type: [String],
    label: 'Productos',
    optional: true
  }


});