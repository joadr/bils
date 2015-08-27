Mediums = new orion.collection('mediums', {
  pluralName: 'Medios',
  singularName: 'Medio',
  tabular: {
    columns: [
      { data: 'name', title: 'Nombre' },
      // orion.attributeColumn('hasOne', 'categoryId', 'Tipo'),
      // orion.attributeColumn('hasOne', 'zoneId', 'Zona'),
      // orion.attributeColumn('hasOne', 'styleId', 'Estilo'),
      // orion.attributeColumn('hasOne', 'color', 'Color'),

    ]
  }
});
