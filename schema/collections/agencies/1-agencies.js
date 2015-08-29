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
      orion.attributeColumn('image', 'logo', 'Logo'),
      orion.attributeColumn('hasMany', 'executivesIds', 'Ejecutivos')
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
    label: 'Administradores',
    optional: true
  }, {
    publicationName: 'agencies_adminsIds_schema'
  }),
  executivesIds: orion.attribute('users', {
    label: 'Ejecutivos',
    optional: true
  }, {
    publicationName: 'agencies_executivesIds_schema'
  }),
  createdAt: orion.attribute('createdAt')
});
