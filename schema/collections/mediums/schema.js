Mediums.attachSchema({
  // categoryId: orion.attribute('hasOne', {
  //   label: 'Categoría'
  // }, {
  //   collection: Categories,
  //   titleField: 'name',
  //   publicationName: 'mediumsCategory',
  // }),
  //
  // subCategoryId: orion.attribute('hasOne', {
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

  frecuency: {
    type: String,
    label: "Frecuencia",
    optional: true
  },

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
