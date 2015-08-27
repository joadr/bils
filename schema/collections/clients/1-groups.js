Groups = new orion.collection('groups', {
  pluralName: 'Grupos',
  singularName: 'Grupo',
  title: 'Grupos',
  link: {
    title: 'Grupos',
    parent: 'clients'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
    ]
  }
});

Groups.attachSchema({
  name: {
    type: String
  }
});
