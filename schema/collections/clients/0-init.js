if (Meteor.isClient) {
  orion.links.add({
    identifier: 'clients',
    title: 'Clientes',
    index: 11
  });
}


Categories = new orion.collection('categories', {
  pluralName: 'Categorías',
  singularName: 'Categoría',
  title: 'Categorías',
  link: {
    title: 'Categorías',
    parent: 'clients'
  },
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
    ]
  }
});
