Agencies = new orion.collection('agencies', {
  pluralName: 'Agencias',
  singularName: 'Agencia',
  title: 'Agencia',
  link: {
    title: 'Agencias',
    index: 1
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
  adminsIds: orion.attribute('users-roles', {
    label: 'Administradores',
    optional: true
  }, {
    publicationName: 'agencies_adminsIds_schema',
    roles: ['agencia']
  }),
  executivesIds: orion.attribute('users-roles', {
    label: 'Ejecutivos',
    optional: true
  }, {
    publicationName: 'agencies_executivesIds_schema',
    roles: ['ejecutivo']
  }),
  createdAt: orion.attribute('createdAt')
});
