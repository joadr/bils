Products = new orion.collection('products', {
  pluralName: 'Productos',
  singularName: 'Ciudad',
  title: 'Productos',
  link: {
    title: 'Productos',
    parent: 'clients'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
      orion.attributeColumn('hasOne', 'brandId', 'Marca'),
      orion.attributeColumn('hasOne', 'groupId', 'Grupo')
    ]
  }
});

Products.attachSchema({
  name: {
    type: String
  },
  groupId: orion.attribute('hasOne', {
    label: 'Grupo'
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'products_groupId_schema',
  }),
  brandId: orion.attribute('hasOne', {
    label: 'Marca'
  }, {
    collection: Brands,
    titleField: 'name',
    publicationName: 'products_brandId_schema',
    additionalFields: ['groupId'],
    filter: function(userId) {
      if (Meteor.isServer) {
        return {};
      } else {
        var groupId = AutoForm.getFieldValue('groupId');
        return groupId ? { groupId: groupId } : {};
      }
    }
  })
});
