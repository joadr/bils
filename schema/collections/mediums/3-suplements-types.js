SuplementsTypes = new orion.collection('suplements_types', {
  pluralName: 'Tipos de Suplementos',
  singularName: 'Tipo de Suplementos',
  title: 'Tipos de Suplementos',
  link: {
    title: 'Tipos de Suplementos',
    parent: 'mediums-admin'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
    ]
  }
});

SuplementsTypes.attachSchema({
  name: {
    type: String
  }
});
