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
    ]
  }
});

Campaigns.attachSchema({
  name: {
    type: String
  },
  // industryId: orion.attribute('hasOne', {
  //   label: 'Industria',
  //   optional: true
  // }, {
  //   collection: Industries,
  //   titleField: 'name',
  //   publicationName: 'campaigns_industryId_schema',
  // }),
  categoryId: orion.attribute('hasOne', {
    label: 'categoría',
    optional: true
  }, {
    collection: Categories,
    titleField: 'name',
    publicationName: 'campaigns_categoryId_schema',
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
