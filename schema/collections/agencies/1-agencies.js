Agencies = new orion.collection('agencies', {
  pluralName: 'Agencias',
  singularName: 'Agencia',
  title: 'Agencia',
  link: {
    title: 'Agencias',
    parent: 'agencies'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
      orion.attributeColumn('image', 'logo', 'Logo')
    ]
  }
});

Agencies.attachSchema({
  name: {
    type: String
  },
  logo: orion.attribute('image', {
    label: 'Logo',
    optional: true
  }),
  adminsIds: orion.attribute('users', {
    label: 'Administradores'
  }, {
    publicationName: 'agencies_adminsIds_schema'
  }),
  createdAt: orion.attribute('createdAt')
});
