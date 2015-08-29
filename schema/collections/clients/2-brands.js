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
  }),
  usersIds: orion.attribute('users', {
    label: 'Usuarios'
  }, {
    publicationName: 'brands_usersIds_schema'
  })
});
