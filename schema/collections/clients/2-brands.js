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
  })
});
