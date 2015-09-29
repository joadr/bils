SuplementsSubTypes = new orion.collection('suplements_sub_types', {
  pluralName: 'Subtipos de Suplementos',
  singularName: 'Subtipo de Suplementos',
  title: 'Subtipos de Suplementos',
  link: {
    title: 'Subtipos de Suplementos',
    parent: 'mediums-admin'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
    ]
  }
});

SuplementsSubTypes.attachSchema({
  typeId: orion.attribute('hasOne', {
    label: 'Tipo'
  }, {
    collection: SuplementsTypes,
    titleField: 'name',
    publicationName: 'suplementsType',
  }),
  name: {
    type: String,
    label: "Nombre"
  }
});
