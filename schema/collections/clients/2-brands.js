Brands = new orion.collection('brands', {
  pluralName: 'Marcas',
  singularName: 'Marca',
  title: 'Marcas',
  link: {
    title: 'Marcas',
    parent: 'clients'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
      orion.attributeColumn('hasOne', 'groupId', 'Grupo')
    ]
  }
});

Brands.attachSchema({
  name: {
    type: String
  },
  groupId: orion.attribute('hasOne', {
    label: 'Grupo'
  }, {
    collection: Groups,
    titleField: 'name',
    publicationName: 'brands_groupId_schema',
    additionalFields: ['agencyId'],
    filter: function(userId) {
      var selectors = Roles.helper(userId, 'clients.myGroups') || [];
      return { $or: selectors };
    }
  }),
  clientsIds: orion.attribute('users-roles', {
    label: 'Clientes'
  }, {
    publicationName: 'brands_clientsIds_schema',
    roles: ['cliente']
  })
});
