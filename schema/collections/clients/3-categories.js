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

Categories.attachSchema({
  name: {
    type: String
  }
});
