Suplements = new orion.collection('suplements', {
  pluralName: 'Suplementos',
  singularName: 'Suplemento',
  title: 'Suplementos',
  link: {
    title: 'Suplemento',
    parent: 'mediums'
  },
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


Suplements.attachSchema({
  mediumId: orion.attribute('hasOne', {
    label: 'Medio'
  }, {
    collection: Mediums,
    titleField: 'name',
    publicationName: 'suplements_mediumId_schema',
  }),
  // typeId: orion.attribute('hasOne', {
  //   label: 'Categoría'
  // }, {
  //   collection: Categories,
  //   titleField: 'name',
  //   publicationName: 'mediumsCategory',
  // }),
  //
  // subTypeId: orion.attribute('hasOne', {
  //   label: 'Subtipo'
  // }, {
  //   collection: SubCategories,
  //   titleField: 'name',
  //   publicationName: 'mediumsSubCategory',
  // }),
  //
  // styleId: orion.attribute('hasOne', {
  //   label: 'Estilo'
  // }, {
  //   collection: Styles,
  //   titleField: 'name',
  //   publicationName: 'mediumsStyle',
  // }),
  //
  // zoneId: orion.attribute('hasOne', {
  //   label: 'Zona'
  // }, {
  //   collection: Zones,
  //   titleField: 'name',
  //   publicationName: 'mediumsZones',
  // }),
  //
  // cityId: orion.attribute('hasOne', {
  //   label: 'Ciudad'
  // }, {
  //   collection: Cities,
  //   titleField: 'name',
  //   publicationName: 'mediumsCity',
  // }),
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  relevance: {
    type: Number,
    label: 'Relevancia',
    allowedValues: [1,2,3,4,5],
    optional: true
  },
  siteViews: {
    type: Number,
    label: "Tiraje",
    optional: true
  },
  dailyViews: {
    type: Number,
    label: "Lectoría / Diaria",
    optional: true
  },
  weekendViewsFactor: {
    type: Number,
    decimal: true,
    label: "Factor lectoría fin de semana"
  },
  // frecuencyId: orion.attribute('hasOne', {
  //   label: 'Frecuencia'
  // }, {
  //   collection: Frecuencies,
  //   titleField: 'name',
  //   publicationName: 'mediumsfrecuencies',
  // }),
  targetMarket: {
    type: String,
    label: 'Publico objetivo',
    optional: true
  },
  monthlyViews: {
    type: Number,
    label: 'Visitas mensuales (solo web)',
    optional: true
  },
  value: {
    type: String,
    label: 'Valor',
    optional: true
  },
  valueMondayThursdayColor: {
    type: String,
    label: 'Valor Lunes-Jueves color',
    optional: true,
  },
  valueFridayColor: {
    type: String,
    label: 'Valor Viernes color',
    optional: true,
  },
  valueSaturdayColor: {
    type: String,
    label: 'Valor Sábado color',
    optional: true,
  },
  valueSundayColor: {
    type: String,
    label: 'Valor Domingo color',
    optional: true,
  },
  valueMondayThursday: {
    type: String,
    label: 'Valor Lunes-Jueves',
    optional: true,
  },
  valueFriday: {
    type: String,
    label: 'Valor Viernes',
    optional: true,
  },
  valueSaturday: {
    type: String,
    label: 'Valor Sábado',
    optional: true,
  },
  valueSunday: {
    type: String,
    label: 'Valor Domingo',
    optional: true,
  },
  valueFullPage: {
    type: String,
    label: 'Valor página entera',
    optional: true
  },
  'value34Page': {
    type: String,
    label: 'Valor 3/4 página',
    optional: true
  },
  valueNarrowHalfPage: {
    type: String,
    label: 'Valor media página alto',
    optional: true
  },
  valueWideHalfPage: {
    type: String,
    label: 'Valor media página tradicional',
    optional: true
  },
  'value14Page': {
    type: String,
    label: 'Valor 1/4 página',
    optional: true
  },
  valueMediumSpot: {
    type: String,
    label: 'Valor caluga mediana',
    optional: true
  },
  valueSmallSpot: {
    type: String,
    label: 'Valor caluga pequeña',
    optional: true
  },
  valueHorizontalBanner: {
    type: String,
    label: 'Valor banner horizontal',
    optional: true
  },
  valueVerticalBanner: {
    type: String,
    label: 'Valor banner vertical',
    optional: true
  }
});
